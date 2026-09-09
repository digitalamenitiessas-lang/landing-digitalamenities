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
  eyebrow: string;
  description: string;
  cta: OptionalLink;
};

export type ValuePoint = {
  title: string;
  description: string;
};

export type Capability = {
  title: string;
  description: string;
};

export type CaseStudy = {
  name: string;
  logo: string;
  alt: string;
  category: string;
  result: string;
};

export type SocialLink = OptionalLink & {
  handle: string;
};

export const siteUrl = "https://digitalamenities.com.ar";

export const instagramUrl = "https://www.instagram.com/digital.amenities/";

export const navItems: NavItem[] = [
  { label: "Productos", href: "#productos" },
  { label: "Amenity digital", href: "#amenity-digital" },
  { label: "Casos", href: "#casos" },
  { label: "Contacto", href: "#contacto" }
];

export const heroMetrics: { value: string; label: string }[] = [
  { value: "7", label: "negocios con sistema propio" },
  { value: "2", label: "plataformas propias" },
  { value: "24/7", label: "atención que no se frena" }
];

export const featuredProducts: Product[] = [
  {
    name: "Citify",
    logo: "/assets/products/citify-logo.png",
    alt: "Logo de Citify",
    eyebrow: "Edificios y consorcios",
    description:
      "Los vecinos del edificio, los comercios del barrio y la administración del consorcio en un mismo lugar.",
    cta: {
      label: "Conocer Citify",
      href: "https://citify.com.ar"
    }
  },
  {
    name: "Countrify",
    logo: "/assets/products/countrify-logo.png",
    alt: "Logo de Countrify",
    eyebrow: "Barrios privados y countries",
    description:
      "Beneficios de comercios cercanos, comunicación interna y gestión del barrio, en una sola app.",
    cta: {
      label: "Conocer Countrify",
      href: "https://countrify.com.ar"
    }
  }
];

export const amenityPoints: ValuePoint[] = [
  {
    title: "Experiencia",
    description: "Una capa digital propia que tu cliente usa, disfruta y recuerda."
  },
  {
    title: "Operación",
    description: "Procesos centralizados, tareas automatizadas e información en un solo lugar."
  },
  {
    title: "Diferencia",
    description: "No es una app de moda: es una herramienta difícil de reemplazar."
  }
];

export const capabilities: Capability[] = [
  {
    title: "A medida",
    description: "Construido sobre la lógica de tu negocio, no sobre una plantilla."
  },
  {
    title: "Con IA donde sirve",
    description: "Bots, asistentes y automatizaciones cuando resuelven algo concreto."
  },
  {
    title: "Conectado",
    description: "Stock, turnos, ventas y equipo hablando entre sí."
  },
  {
    title: "Escalable",
    description: "Una base sólida para crecer por etapas, sin rehacer todo."
  }
];

export const caseStudies: CaseStudy[] = [
  {
    name: "Miska Muska",
    logo: "/assets/clients/miskamuska-logo.png",
    alt: "Logo de Miska Muska",
    category: "Pastelería",
    result: "Sistema de pedidos con un bot de IA que atiende por WhatsApp las 24 horas."
  },
  {
    name: "Hotel Mediterráneo",
    logo: "/assets/clients/hotel-mediterraneo-logo.png",
    alt: "Logo del Hotel Mediterráneo de Tucumán",
    category: "Hotelería",
    result: "Gestión interna con IA: habitaciones, huéspedes y el día a día del equipo en un panel."
  },
  {
    name: "Malala",
    logo: "/assets/clients/malala-logo.jpg",
    alt: "Logo de Malala",
    category: "Belleza",
    result: "Turnos, stock, empleados y WhatsApp en un solo sistema."
  },
  {
    name: "Bonivibe",
    logo: "/assets/clients/bonivibe-logo.png",
    alt: "Logo de Bonivibe",
    category: "Indumentaria",
    result: "Tienda online sincronizada con el stock del sistema central."
  },
  {
    name: "La Vieja Escuela",
    logo: "/assets/clients/la-vieja-escuela.jpg",
    alt: "Logo de La Vieja Escuela",
    category: "Bar café",
    result: "IA para cargar datos y sacarse de encima las tareas repetitivas."
  },
  {
    name: "Sisso",
    logo: "/assets/clients/sisso-logo.png",
    alt: "Logo de Sisso",
    category: "SaaS de turnos",
    result: "Plataforma de turnos para peluquerías, pensada para varios locales."
  },
  {
    name: "Marco Rossi",
    logo: "/assets/clients/marco-rossi-logo.png",
    alt: "Logo del estudio jurídico Marco Rossi",
    category: "Legal",
    result: "Presencia web institucional, sobria y clara."
  }
];

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    handle: "@digital.amenities",
    href: instagramUrl
  },
  {
    label: "Citify",
    handle: "citify.com.ar",
    href: "https://citify.com.ar"
  },
  {
    label: "Countrify",
    handle: "countrify.com.ar",
    href: "https://countrify.com.ar"
  }
];

export const ctaLinks: {
  primary: OptionalLink;
  secondary: OptionalLink;
} = {
  primary: {
    label: "Contanos tu proyecto",
    href: undefined
  },
  secondary: {
    label: "Ver casos",
    href: "#casos"
  }
};
