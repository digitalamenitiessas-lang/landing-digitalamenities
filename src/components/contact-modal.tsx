"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Variant = "amenity" | "charla";

type FormData = {
  nombre: string;
  email: string;
  whatsapp: string;
  descripcion: string;
  presupuesto: string;
  /** Campo trampa: los humanos no lo ven, los bots lo completan. */
  sitio: string;
};

type FieldErrors = Partial<Record<"nombre" | "email" | "descripcion", string>>;

const INITIAL_FORM: FormData = {
  nombre: "",
  email: "",
  whatsapp: "",
  descripcion: "",
  presupuesto: "",
  sitio: ""
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function validate(form: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.nombre.trim()) {
    errors.nombre = "Contanos cómo te llamás.";
  }

  if (!form.email.trim()) {
    errors.email = "Necesitamos un email para responderte.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "Revisá el email: parece incompleto.";
  }

  if (form.descripcion.trim().length < 10) {
    errors.descripcion = "Contanos un poco más (al menos una frase).";
  }

  return errors;
}

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>("amenity");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const panelRef = useRef<HTMLDivElement>(null);
  const backdropMouseDown = useRef(false);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ variant?: Variant }>).detail;
      lastFocused.current = document.activeElement as HTMLElement | null;
      setVariant(detail?.variant ?? "amenity");
      setForm(INITIAL_FORM);
      setErrors({});
      setStatus("idle");
      setIsOpen(true);
    };

    window.addEventListener("open-contact-modal", handler);

    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, status]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, variant })
      });

      if (!response.ok) {
        throw new Error("response not ok");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!isOpen) {
    return null;
  }

  const isCharla = variant === "charla";

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        backdropMouseDown.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        // Solo cerramos si el gesto empezó y terminó en el fondo: arrastrar
        // desde el textarea hacia afuera ya no borra el formulario.
        if (event.target === event.currentTarget && backdropMouseDown.current) {
          close();
        }
        backdropMouseDown.current = false;
      }}
    >
      <div
        className="modal-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button type="button" className="modal-close" onClick={close} aria-label="Cerrar">
          ×
        </button>

        {status === "success" ? (
          <div className="modal-success">
            <span className="modal-success-icon" aria-hidden="true">
              ✓
            </span>
            <h2 id="modal-title">¡Recibimos tu mensaje!</h2>
            <p>
              Te escribimos a <strong>{form.email}</strong> apenas lo veamos.
            </p>
            <button type="button" className="button button-primary modal-submit" onClick={close}>
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
                <p className="modal-subtitle">Sin compromiso: solo para entender qué necesitás.</p>
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
                    autoComplete="name"
                    placeholder="Ej: Juan García / Mi Empresa"
                    value={form.nombre}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.nombre)}
                    aria-describedby={errors.nombre ? "error-nombre" : undefined}
                  />
                  {errors.nombre && (
                    <span className="field-error" id="error-nombre">
                      {errors.nombre}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="juan@empresa.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "error-email" : undefined}
                  />
                  {errors.email && (
                    <span className="field-error" id="error-email">
                      {errors.email}
                    </span>
                  )}
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
                    placeholder="+54 9 381 123 4567"
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
                    <option value="Todavía no lo tengo claro">Todavía no lo tengo claro</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="descripcion">¿Qué necesitás? *</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={4}
                  placeholder={
                    isCharla
                      ? "Contanos brevemente de qué se trata tu proyecto."
                      : "Describí tu idea o el problema que querés resolver."
                  }
                  value={form.descripcion}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.descripcion)}
                  aria-describedby={errors.descripcion ? "error-descripcion" : undefined}
                />
                {errors.descripcion && (
                  <span className="field-error" id="error-descripcion">
                    {errors.descripcion}
                  </span>
                )}
              </div>

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="sitio">No completes este campo</label>
                <input
                  id="sitio"
                  name="sitio"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.sitio}
                  onChange={handleChange}
                />
              </div>

              {status === "error" && (
                <p className="form-error" role="alert">
                  No pudimos enviar el mensaje. Probá de nuevo en un momento.
                </p>
              )}

              <button
                type="submit"
                className="button button-primary modal-submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Enviando…"
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
