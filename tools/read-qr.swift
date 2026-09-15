// Decodes a QR image so we can confirm what it actually points to.
//   swift tools/read-qr.swift <image>
import Foundation
import Vision

let args = CommandLine.arguments
guard args.count >= 2 else { print("usage: read-qr <image>"); exit(2) }
let data = try Data(contentsOf: URL(fileURLWithPath: args[1]))

var found: [String] = []
let req = VNDetectBarcodesRequest { request, _ in
    for r in (request.results as? [VNBarcodeObservation]) ?? [] {
        if let v = r.payloadStringValue { found.append(v) }
    }
}
req.symbologies = [.qr]
try VNImageRequestHandler(data: data, options: [:]).perform([req])
print(found.isEmpty ? "NO QR DETECTED" : found.joined(separator: "\n"))
