import { Resend } from "resend";
import type { NextRequest } from "next/server";

const FROM = process.env.FROM_EMAIL ?? "Digital Amenities <onboarding@resend.dev>";
const DA_EMAIL = process.env.DA_EMAIL ?? "hola@digitalamenities.com.ar";

const MAX_LENGTHS = {
  nombre: 160,
  email: 254,
  whatsapp: 40,
  presupuesto: 60,
  descripcion: 4000
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Ventana simple en memoria. En serverless es por instancia: frena el spam
 *  torpe, no reemplaza un rate limit real (Upstash, Vercel KV, WAF). */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const recentRequests = new Map<string, number[]>();

type ContactBody = {
  nombre: string;
  email: string;
  whatsapp?: string;
  descripcion: string;
  presupuesto?: string;
  variant: "amenity" | "charla";
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recentRequests.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (hits.length >= RATE_LIMIT_MAX) {
    recentRequests.set(key, hits);
    return true;
  }

  hits.push(now);
  recentRequests.set(key, hits);

  if (recentRequests.size > 500) {
    recentRequests.clear();
  }

  return false;
}

function teamEmailHtml(data: ContactBody): string {
  const { nombre, email, whatsapp, descripcion, presupuesto, variant } = data;
  const isCharla = variant === "charla";
  const safeName = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);

  const rows: [string, string][] = [
    ["Nombre y empresa", safeName],
    ["Email", `<a href="mailto:${encodeURI(email)}" style="color:#000;">${safeEmail}</a>`],
    ...(whatsapp ? [["WhatsApp", escapeHtml(whatsapp)] as [string, string]] : []),
    ...(presupuesto ? [["Presupuesto", escapeHtml(presupuesto)] as [string, string]] : []),
    ["Tipo de contacto", isCharla ? "Charla (hasta 15 min)" : "Consulta amenity digital"]
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
          <h1 style="margin:6px 0 0;color:#fff;font-size:1.4rem;font-weight:700;">${safeName}</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${rows
              .map(
                ([label, value]) => `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;width:38%;font-size:0.86rem;vertical-align:top;color:#000;">${label}</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:0.86rem;color:#3f3f3f;">${value}</td>
            </tr>`
              )
              .join("")}
            <tr>
              <td style="padding:14px 0 0;font-weight:600;font-size:0.86rem;vertical-align:top;color:#000;">Descripción</td>
              <td style="padding:14px 0 0;font-size:0.86rem;color:#3f3f3f;line-height:1.65;">${escapeHtml(descripcion).replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <div style="margin-top:28px;">
            <a href="mailto:${encodeURI(email)}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;border-radius:999px;text-decoration:none;font-weight:600;font-size:0.88rem;">Responder a ${safeName}</a>
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

function userEmailHtml(data: Pick<ContactBody, "nombre" | "variant">): string {
  const { nombre, variant } = data;
  const isCharla = variant === "charla";
  const safeName = escapeHtml(nombre);

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Recibimos tu mensaje</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <tr><td style="background:#000;padding:28px 32px;">
          <p style="margin:0;color:rgba(255,255,255,0.55);font-size:0.78rem;text-transform:uppercase;letter-spacing:0.12em;">Digital Amenities</p>
          <h1 style="margin:6px 0 0;color:#fff;font-size:1.4rem;font-weight:700;">¡Hola, ${safeName}!</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="color:#3f3f3f;line-height:1.7;margin:0 0 16px;">Recibimos tu ${isCharla ? "solicitud de charla" : "consulta"} y te vamos a responder a la brevedad.</p>
          ${isCharla ? `<p style="color:#3f3f3f;line-height:1.7;margin:0 0 16px;">Nuestras charlas son de hasta <strong>15 minutos</strong>, para conocernos y entender tu proyecto sin compromiso.</p>` : ""}
          <p style="color:#3f3f3f;line-height:1.7;margin:0;">Mientras tanto podés ver nuestros productos en digitalamenities.com.ar</p>
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

  const clientKey =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientKey)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let raw: Record<string, unknown>;

  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Campo trampa: si viene completo es un bot. Devolvemos éxito sin enviar nada
  // para no darle señal de que fue detectado.
  if (typeof raw.sitio === "string" && raw.sitio.trim() !== "") {
    return Response.json({ success: true });
  }

  const body: ContactBody = {
    nombre: clamp(raw.nombre, MAX_LENGTHS.nombre),
    email: clamp(raw.email, MAX_LENGTHS.email),
    whatsapp: clamp(raw.whatsapp, MAX_LENGTHS.whatsapp),
    presupuesto: clamp(raw.presupuesto, MAX_LENGTHS.presupuesto),
    descripcion: clamp(raw.descripcion, MAX_LENGTHS.descripcion),
    variant: raw.variant === "charla" ? "charla" : "amenity"
  };

  if (!body.nombre || !body.descripcion || !EMAIL_PATTERN.test(body.email)) {
    return Response.json({ error: "Required fields missing or invalid" }, { status: 400 });
  }

  const isCharla = body.variant === "charla";
  const resend = new Resend(apiKey);

  try {
    // El aviso al equipo es el que no puede fallar: si el acuse al visitante
    // rebota, la consulta igual llegó y respondemos con éxito.
    const teamEmail = await resend.emails.send({
      from: FROM,
      to: DA_EMAIL,
      replyTo: body.email,
      subject: isCharla
        ? `Solicitud de charla — ${body.nombre}`
        : `Nueva consulta — ${body.nombre}`,
      html: teamEmailHtml(body)
    });

    if (teamEmail.error) {
      throw new Error(teamEmail.error.message);
    }
  } catch (error) {
    console.error("[contact] no se pudo avisar al equipo:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: body.email,
      subject: isCharla
        ? `Recibimos tu solicitud de charla, ${body.nombre}`
        : `Recibimos tu consulta, ${body.nombre}`,
      html: userEmailHtml(body)
    });
  } catch (error) {
    console.error("[contact] acuse al visitante fallido:", error);
  }

  return Response.json({ success: true });
}
