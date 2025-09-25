"use client";

import { FC, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface Props {
  messageId: string;
  orderId: string;
}

export const GiftMessageQR = ({ messageId, orderId }: Props) => {
  const qrRef = useRef<HTMLCanvasElement>(null);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/gift/message/${messageId}`;

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    // convert canvas to data url (png)
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    // create temporary link and force download
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `order-${orderId}-gift-message-${messageId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <QRCodeCanvas
        id="pbb-gift-message-qr"
        value={url}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        marginSize={4}
        ref={qrRef}
      />
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-text-secondary text-center break-all max-w-xs">
          Scan the QR code to view your gift message
        </p>
        <button className="btn-primary" onClick={handleDownload}>
          Download QR Code
        </button>
      </div>
    </div>
  );
};
