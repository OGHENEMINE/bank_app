import Image from 'next/image';
import React from 'react';

const QrCodeComponent = ({ data }: { data: string }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    data
  )}&size=150x150`;

  return (
    <Image
      src={qrCodeUrl}
      height={100}
      width={100}
      alt="Wallet address QR Code"
      className="" // Optional, remove if not needed
    />
  );
};

export default QrCodeComponent;
