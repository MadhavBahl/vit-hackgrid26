// Generates a QR PNG using macOS CoreImage, then verifies it by decoding it
// back with Vision. Run it again whenever you change a URL.
//   swift tools/make-qr.swift "<url>" assets/img/qr-questions.png
import Foundation
import CoreImage
import AppKit
import Vision

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: make-qr <text> <out.png> [scale]\n".data(using: .utf8)!)
    exit(2)
}
let text = args[1]
let outPath = args[2]
let scale = CGFloat(args.count > 3 ? (Double(args[3]) ?? 14) : 14)

guard let payload = text.data(using: .utf8),
      let filter = CIFilter(name: "CIQRCodeGenerator") else { exit(1) }
filter.setValue(payload, forKey: "inputMessage")
filter.setValue("H", forKey: "inputCorrectionLevel")   // high ECC: survives a projector
guard let ci = filter.outputImage?.transformed(by: CGAffineTransform(scaleX: scale, y: scale)) else { exit(1) }

let rep = NSCIImageRep(ciImage: ci)
let image = NSImage(size: rep.size)
image.addRepresentation(rep)
guard let tiff = image.tiffRepresentation,
      let bmp = NSBitmapImageRep(data: tiff),
      let png = bmp.representation(using: .png, properties: [:]) else { exit(1) }
try png.write(to: URL(fileURLWithPath: outPath))

// --- verify: decode the file we just wrote -------------------------------
var decoded: [String] = []
let req = VNDetectBarcodesRequest { request, _ in
    for r in (request.results as? [VNBarcodeObservation]) ?? [] {
        if let v = r.payloadStringValue { decoded.append(v) }
    }
}
req.symbologies = [.qr]
let handler = VNImageRequestHandler(data: png, options: [:])
try handler.perform([req])

if decoded.contains(text) {
    print("OK  \(outPath)  (\(Int(rep.size.width))px)  verified -> \(text)")
} else {
    FileHandle.standardError.write("VERIFY FAILED: decoded \(decoded)\n".data(using: .utf8)!)
    exit(1)
}
