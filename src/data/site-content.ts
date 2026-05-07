export type NavItem = {
  label: string;
  href: string;
};

export type OptionalLink = {
  label: string;
  href?: string;
};

export type Product = {
  name: string;
  logo: string;
  alt: string;
  description: string;
  eyebrow: string;
  cta: OptionalLink;
};

export type Benefit = {
  title: string;
  description: string;
};

export type AmenityPoint = {
  title: string;
  description: string;
};

export type CaseStudy = {
  name: string;
  logo: string;
  alt: string;
  category: string;
  summary: string;
  outcome: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type SocialLink = OptionalLink & {
  handle: string;
};

export type ClientHighlight = {
  name: string;
  logo: string;
  alt: string;
};

export const navItems: NavItem[] = [
  { label: "Productos", href: "#productos" },
  { label: "Amenity digital", href: "#amenity-digital" },
  { label: "Casos reales", href: "#casos" },
  { label: "Contacto", href: "#contacto" }
];

export const featuredProducts: Product[] = [
  {
    name: "Citify",
    logo: "/assets/products/citify-logo.png",
    alt: "Logo de Citify",
    eyebrow: "Activo digital destacado",
    description:
      "Plataforma integral que conecta a los residentes de edificios con negocios locales, mientras optimiza y simplifica toda la administración del consorcio en un entorno digital elegante.",
    cta: {
      label: "Conocer Citify"
    }
  },
  {
    name: "Contrify",
    logo: "/assets/products/contrify-logo.jpg",
    alt: "Logo de Contrify",
    eyebrow: "Activo digital destacado",
    description:
      "La solución definitiva para barrios privados. Conecta a los vecinos con comercios de la zona y agiliza la administración del country, elevando la experiencia de convivencia.",
    cta: {
      label: "Conocer Contrify"
    }
  }
];

export const amenityPoints: AmenityPoint[] = [
  {
    title: "Experiencias memorables",
    description:
      "Un amenity digital amplía el valor percibido de tu marca con una capa tecnológica que mejora la experiencia antes, durante y después del servicio."
  },
  {
    title: "Operación más simple",
    description:
      "Centralizamos procesos, automatizamos tareas repetitivas y ordenamos la información para que tu equipo gane tiempo y claridad."
  },
  {
    title: "Diferenciación real",
    description:
      "No se trata de sumar una app por moda, sino de construir una herramienta propia que te haga más competitivo y difícil de reemplazar."
  }
];

export const benefits: Benefit[] = [
  {
    title: "Desarrollo a medida",
    description:
      "Diseñamos productos que responden a la lógica real de tu negocio, no a una plantilla genérica."
  },
  {
    title: "Automatización útil",
    description:
      "Integramos IA, notificaciones, dashboards y flujos internos cuando generan impacto concreto."
  },
  {
    title: "Conexión con tu operación",
    description:
      "Stock, turnos, datos, ventas, clientes o gestión interna: el producto conversa con el día a día de tu equipo."
  },
  {
    title: "Escalabilidad con criterio",
    description:
      "Construimos una base sólida para evolucionar el producto por etapas, sin perder consistencia ni control."
  }
];

export const clientHighlights: ClientHighlight[] = [
  {
    name: "La Vieja Escuela",
    logo: "/assets/clients/la-vieja-escuela.jpg",
    alt: "Logo de La Vieja Escuela"
  },
  {
    name: "Bonivibe",
    logo: "/assets/clients/bonivibe-logo.png",
    alt: "Logo de Bonivibe"
  },
  {
    name: "Malala",
    logo: "/assets/clients/malala-logo.jpg",
    alt: "Logo de Malala"
  },
  {
    name: "Marco Rossi",
    logo: "/assets/clients/marco-rossi-logo.png",
    alt: "Logo del estudio jurídico Marco Rossi"
  },
  {
    name: "Sisso",
    logo: "/assets/clients/sisso-logo.png",
    alt: "Logo de Sisso"
  }
];

export const caseStudies: CaseStudy[] = [
  {
    name: "La Vieja Escuela",
    logo: "/assets/clients/la-vieja-escuela.jpg",
    alt: "Logo de La Vieja Escuela",
    category: "Bar café",
    summary:
      "Desarrollamos un sistema a medida con IA para agilizar la carga de datos y simplificar tareas operativas.",
    outcome: "Más velocidad, menos fricción y un equipo muy conforme con la herramienta."
  },
  {
    name: "Bonivibe",
    logo: "/assets/clients/bonivibe-logo.png",
    alt: "Logo de Bonivibe",
    category: "Marca de ropa",
    summary:
      "Construimos una tienda online conectada al sistema central para unificar stock y mejorar la operación comercial.",
    outcome: "Una experiencia de venta más prolija, sincronizada y lista para crecer."
  },
  {
    name: "Malala",
    logo: "/assets/clients/malala-logo.jpg",
    alt: "Logo de Malala",
    category: "Salón de belleza",
    summary:
      "Implementamos un sistema integral con WhatsApp, turnos, stock, empleados y procesos internos.",
    outcome: "Más orden, seguimiento y una gestión diaria mucho más fluida."
  },
  {
    name: "Marco Rossi",
    logo: "/assets/clients/marco-rossi-logo.png",
    alt: "Logo del estudio jurídico Marco Rossi",
    category: "Estudio jurídico",
    summary:
      "Desarrollamos una presencia web profesional para reforzar posicionamiento y claridad institucional.",
    outcome: "Una imagen digital más sólida y alineada con el perfil del estudio."
  },
  {
    name: "Sisso",
    logo: "/assets/clients/sisso-logo.png",
    alt: "Logo de Sisso",
    category: "SaaS para peluquerías",
    summary:
      "Acompañamos el desarrollo de una solución de turnos pensada para negocios de belleza y operación distribuida.",
    outcome: "Una plataforma especializada, clara y preparada para crecer con el negocio."
  }
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Digital Amenities entiende el negocio antes de escribir una sola línea. Eso hace que cada producto se sienta propio desde el primer día.",
    author: "Equipos que buscan orden y crecimiento",
    role: "Clientes con operación real"
  },
  {
    quote:
      "Cuando la tecnología acompaña la experiencia y además mejora la gestión interna, el resultado se nota rápido en todo el equipo.",
    author: "Marcas que querían diferenciarse",
    role: "Proyectos desarrollados a medida"
  },
  {
    quote:
      "El valor no está solo en la interfaz: está en tener una herramienta pensada para tu lógica, tus tiempos y tu forma de trabajar.",
    author: "Negocios en expansión",
    role: "Implementaciones personalizadas"
  }
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", handle: "@digitalamenities", href: undefined },
  { label: "LinkedIn", handle: "Digital Amenities", href: undefined },
  { label: "WhatsApp", handle: "Contacto directo", href: undefined }
];

export const ctaLinks: {
  primary: OptionalLink;
  secondary: OptionalLink;
} = {
  primary: {
    label: "Quiero mi amenity digital",
    href: undefined
  },
  secondary: {
    label: "Ver casos reales",
    href: "#casos"
  }
};
