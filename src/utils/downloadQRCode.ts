
const downloadQRCode = (QRCodeId: string) => {
  const canvas = document.getElementById(QRCodeId)?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};


export default downloadQRCode;
