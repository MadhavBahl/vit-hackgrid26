// Removes a flat light background from an image, leaving transparency.
//
// Flood-fills inward from the border rather than keying every light pixel, so
// light areas *inside* the subject (a white shirt, a bright highlight) are kept.
// Edge pixels get a soft alpha so the cutout doesn't look jagged.
//
//   swift tools/cutout.swift <in.png> <out.png> [tolerance 0-255, default 28]
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 3 else { print("usage: cutout <in> <out> [tolerance]"); exit(2) }
let tol = args.count > 3 ? (Int(args[3]) ?? 28) : 28

guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: args[1]) as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { print("cannot read"); exit(1) }

let w = img.width, h = img.height
var px = [UInt8](repeating: 0, count: w * h * 4)
guard let ctx = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8,
                          bytesPerRow: w * 4, space: CGColorSpaceCreateDeviceRGB(),
                          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))

// Sample the corners to learn what the background actually is.
func rgb(_ i: Int) -> (Int, Int, Int) { (Int(px[i*4]), Int(px[i*4+1]), Int(px[i*4+2])) }
let corners = [0, w-1, (h-1)*w, h*w-1].map(rgb)
let bg = (corners.map{$0.0}.reduce(0,+)/4, corners.map{$0.1}.reduce(0,+)/4, corners.map{$0.2}.reduce(0,+)/4)

func matches(_ i: Int) -> Bool {
    let (r, g, b) = rgb(i)
    return abs(r-bg.0) <= tol && abs(g-bg.1) <= tol && abs(b-bg.2) <= tol
}

// Flood fill from every border pixel that looks like the background.
var isBG = [Bool](repeating: false, count: w * h)
var stack: [Int] = []
for x in 0..<w { for y in [0, h-1] { let i = y*w + x; if !isBG[i] && matches(i) { isBG[i] = true; stack.append(i) } } }
for y in 0..<h { for x in [0, w-1] { let i = y*w + x; if !isBG[i] && matches(i) { isBG[i] = true; stack.append(i) } } }

while let i = stack.popLast() {
    let x = i % w, y = i / w
    for (dx, dy) in [(1,0),(-1,0),(0,1),(0,-1)] {
        let nx = x + dx, ny = y + dy
        guard nx >= 0, nx < w, ny >= 0, ny < h else { continue }
        let j = ny*w + nx
        if !isBG[j] && matches(j) { isBG[j] = true; stack.append(j) }
    }
}

// Background -> fully transparent. Kept pixels touching it get partial alpha
// based on how close to the background colour they are, which feathers the edge.
var out = px
for i in 0..<(w*h) {
    if isBG[i] { out[i*4+3] = 0; continue }
    let x = i % w, y = i / w
    var touches = false
    for (dx, dy) in [(1,0),(-1,0),(0,1),(0,-1)] {
        let nx = x+dx, ny = y+dy
        if nx >= 0, nx < w, ny >= 0, ny < h, isBG[ny*w + nx] { touches = true; break }
    }
    if touches {
        let (r, g, b) = rgb(i)
        let d = max(abs(r-bg.0), max(abs(g-bg.1), abs(b-bg.2)))
        out[i*4+3] = UInt8(max(0, min(255, d * 255 / max(1, tol * 2))))
    }
}

guard let outCtx = CGContext(data: &out, width: w, height: h, bitsPerComponent: 8,
                             bytesPerRow: w*4, space: CGColorSpaceCreateDeviceRGB(),
                             bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue),
      let result = outCtx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: args[2]) as CFURL,
                                                 UTType.png.identifier as CFString, 1, nil)
else { exit(1) }
CGImageDestinationAddImage(dest, result, nil)
CGImageDestinationFinalize(dest)

let removed = isBG.filter { $0 }.count
print("OK  \(args[2])  bg rgb(\(bg.0),\(bg.1),\(bg.2))  removed \(removed * 100 / (w*h))% of pixels")
