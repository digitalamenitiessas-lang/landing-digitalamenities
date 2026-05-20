import { Resend } from "resend";
import type { NextRequest } from "next/server";

const FROM = process.env.FROM_EMAIL ?? "Digital Amenities <onboarding@resend.dev>";
const DA_EMAIL = process.env.DA_EMAIL ?? "hola@digitalamenities.com.ar";

type ContactBody = {
  nombre: string;
  email: string;
  whatsapp?: string;
  descripcion: string;
  presupuesto?: string;
  variant: "amenity" | "charla";
};

function teamEmailHtml(data: ContactBody): string {
  const { nombre, email, whatsapp, descripcion, presupuesto, variant } = data;
  const isCharla = variant === "charla";

  const rows: [string, string][] = [
    ["Nombre y empresa", nombre],
    ["Email", `<a href="mailto:${email}" style="color:#000;">${email}</a>`],
    ...(whatsapp ? [["WhatsApp", whatsapp] as [string, string]] : []),
    ...(presupuesto ? [["Presupuesto", presupuesto] as [string, string]] : []),
    ["Tipo de contacto", isCharla ? "Charla (hasta 15 min)" : "Consulta amenity digital"],
  ];

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>${isCharla ? "Solicitud de charla" : "Nueva consulta"}</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <tr><td style="background:#000;padding:28px 32px;">
          <p style="margin:0;color:rgba(255,255,255,0.55);font-size:0.78rem;text-transform:uppercase;letter-spacing:0.12em;">${isCharla ? "Solicitud de charla" : "Nueva consulta"}</p>
          <h1 style="margin:6px 0 0;color:#fff;font-size:1.4rem;font-weight:700;">${nombre}</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${rows.map(([label, value]) => `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;width:38%;font-size:0.86rem;vertical-align:top;color:#000;">${label}</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:0.86rem;color:#3f3f3f;">${value}</td>
            </tr>`).join("")}
            <tr>
              <td style="padding:14px 0 0;font-weight:600;font-size:0.86rem;vertical-align:top;color:#000;">Descripción</td>
              <td style="padding:14px 0 0;font-size:0.86rem;color:#3f3f3f;line-height:1.65;">${descripcion.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <div style="margin-top:28px;">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;border-radius:999px;text-decoration:none;font-weight:600;font-size:0.88rem;">Responder a ${nombre}</a>
          </div>
        </td></tr>
        <tr><td style="padding:14px 32px;border-top:1px solid #f0f0f0;background:#fafafa;">
          <p style="margin:0;color:#bbb;font-size:0.76rem;">Digital Amenities · Formulario de contacto</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function userEmailHtml(data: Pick<ContactBody, "nombre" | "email" | "variant">): string {
  const { nombre, variant } = data;
  const isCharla = variant === "charla";

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Recibimos tu mensaje</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <tr><td style="background:#000;padding:28px 32px;">
          <p style="margin:0;color:rgba(255,255,255,0.55);font-size:0.78rem;text-transform:uppercase;letter-spacing:0.12em;">Digital Amenities</p>
          <h1 style="margin:6px 0 0;color:#fff;font-size:1.4rem;font-weight:700;">¡Hola, ${nombre}!</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="color:#3f3f3f;line-height:1.7;margin:0 0 16px;">Recibimos tu ${isCharla ? "solicitud de charla" : "consulta"} y nos pondremos en contacto en las próximas horas.</p>
          ${isCharla ? `<p style="color:#3f3f3f;line-height:1.7;margin:0 0 16px;">Nuestras charlas son de hasta <strong>15 minutos</strong>, pensadas para conocernos y entender tu proyecto sin compromisos.</p>` : ""}
          <p style="color:#3f3f3f;line-height:1.7;margin:0;">Mientras tanto, podés conocer más sobre nuestros productos en digitalamenities.com.ar</p>
          <div style="margin-top:28px;">
            <a href="https://digitalamenities.com.ar" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;border-radius:999px;text-decoration:none;font-weight:600;font-size:0.88rem;">Ver nuestros productos</a>
          </div>
        </td></tr>
        <tr><td style="padding:14px 32px;border-top:1px solid #f0f0f0;background:#fafafa;">
          <p style="margin:0;color:#bbb;font-size:0.76rem;">Digital Amenities · El confort también es digital</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service not configured" }, { status: 503 });
  }

  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { nombre, email, descripcion, variant } = body;
  if (!nombre?.trim() || !email?.trim() || !descripcion?.trim()) {
    return Response.json({ error: "Required fields missing" }, { status: 400 });
  }

  const isCharla = variant === "charla";
  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: DA_EMAIL,
        subject: isCharla
          ? `Solicitud de charla — ${nombre}`
          : `Nueva consulta — ${nombre}`,
        html: teamEmailHtml(body),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: isCharla
          ? `Recibimos tu solicitud de charla, ${nombre}`
          : `Recibimos tu consulta, ${nombre}`,
        html: userEmailHtml({ nombre, email, variant }),
      }),
    ]);

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
