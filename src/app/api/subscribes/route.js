export async function POST(request) {
  const { email, captcha_token } = await request.json()

  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha_token}`

  const googleResponse = await fetch(verificationUrl, { method: 'POST' })
  const data = await googleResponse.json()

  if (!data.success || data.score < 0.5) {
    return new Response(JSON.stringify({ success: false, message: 'Verifikasi robot gagal.' }), { status: 400 })
  }

  return new Response(JSON.stringify({ success: true, message: 'Langganan berhasil!' }), { status: 200 })
}
