"use client";

import { useEffect, useState } from "react";

type Variant = "amenity" | "charla";

type FormData = {
  nombre: string;
  email: string;
  whatsapp: string;
  descripcion: string;
  presupuesto: string;
};

const INITIAL_FORM: FormData = {
  nombre: "",
  email: "",
  whatsapp: "",
  descripcion: "",
  presupuesto: "",
};

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>("amenity");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const handler = (e: Event) => {
      const v = (e as CustomEvent<{ variant?: Variant }>).detail?.variant ?? "amenity";
      setVariant(v);
      setForm(INITIAL_FORM);
      setStatus("idle");
      setIsOpen(true);
    };
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, variant }),
      });
      if (!res.ok) throw new Error("response not ok");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!isOpen) return null;

  const isCharla = variant === "charla";

  return (
    <div className="modal-backdrop" onClick={close} role="presentation">
      <div
        className="modal-panel"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={close} aria-label="Cerrar">
          ×
        </button>

        {status === "success" ? (
          <div className="modal-success">
            <span className="modal-success-icon" aria-hidden="true">✓</span>
            <h2 id="modal-title">¡Recibimos tu mensaje!</h2>
            <p>
              Te vamos a responder a <strong>{form.email}</strong> en las
              próximas horas.
            </p>
            <button className="button button-primary modal-submit" onClick={close}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="eyebrow">
                {isCharla ? "Agendá una reunión" : "Contanos tu proyecto"}
              </span>
              <h2 id="modal-title">
                {isCharla
                  ? "Coordinemos una charla de 15 minutos."
                  : "Empecemos a construir tu amenity digital."}
              </h2>
              {isCharla && (
                <p className="modal-subtitle">
                  Sin compromisos. En 15 minutos te contamos cómo podemos
                  ayudarte con tu proyecto.
                </p>
              )}
            </div>

            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="nombre">Nombre y empresa *</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ej: Juan García / Mi Empresa"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="juan@empresa.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="whatsapp">
                    WhatsApp <span>(opcional)</span>
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+54 9 11 1234 5678"
                    value={form.whatsapp}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="presupuesto">
                    Presupuesto estimado <span>(opcional)</span>
                  </label>
                  <select
                    id="presupuesto"
                    name="presupuesto"
                    value={form.presupuesto}
                    onChange={handleChange}
                  >
                    <option value="">Seleccioná una opción</option>
                    <option value="Menos de USD 2.000">Menos de USD 2.000</option>
                    <option value="USD 2.000 – 5.000">USD 2.000 – 5.000</option>
                    <option value="USD 5.000 – 15.000">USD 5.000 – 15.000</option>
                    <option value="Más de USD 15.000">Más de USD 15.000</option>
                    <option value="Todavía no lo tengo claro">
                      Todavía no lo tengo claro
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="descripcion">¿Qué necesitás? *</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  required
                  rows={4}
                  placeholder={
                    isCharla
                      ? "Contanos brevemente de qué se trata tu proyecto o la idea que tenés."
                      : "Describí brevemente tu idea, el problema que querés resolver o el producto que imaginás."
                  }
                  value={form.descripcion}
                  onChange={handleChange}
                />
              </div>

              {status === "error" && (
                <p className="form-error" role="alert">
                  Hubo un error al enviar el mensaje. Por favor intentá de nuevo.
                </p>
              )}

              <button
                type="submit"
                className="button button-primary modal-submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Enviando..."
                  : isCharla
                  ? "Solicitar charla"
                  : "Enviar consulta"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
