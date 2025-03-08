import QRCode from 'qrcode';

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const text = url.searchParams.get('text');

  if (!text) {
    return new Response('Missing text parameter', { status: 400 });
  }

  try {
    const qrCode = await QRCode.toBuffer(text, { type: 'png' });
    return new Response(qrCode, {
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (error) {
    return new Response('Failed to generate QR code', { status: 500 });
  }
}