import Image from "next/image";

import { ClientsCarousel } from "@/components/clients-carousel";
import { HeroLottie } from "@/components/hero-lottie";
import { OptionalLink } from "@/components/optional-link";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { brandAssets } from "@/data/brand-assets";
import {
  amenityPoints,
  benefits,
  caseStudies,
  clientHighlights,
  ctaLinks,
  featuredProducts,
  navItems,
  socialLinks,
  testimonials
} from "@/data/site-content";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-section" id="top">
        <SiteHeader />

        <div className="hero-grid">
          <Reveal className="hero-copy">
            <span className="eyebrow">El confort también es digital</span>
            <h1>
              Creamos amenities digitales.
            </h1>
            <p className="hero-text">
              Diseñamos productos propios y desarrollos a medida para marcas que
              quieren diferenciarse con tecnología elegante, útil y pensada para su
              negocio real.
            </p>

            <div className="hero-actions">
              <OptionalLink className="button button-primary" href={ctaLinks.primary.href}>
                {ctaLinks.primary.label}
              </OptionalLink>
              <OptionalLink className="button button-secondary" href={ctaLinks.secondary.href}>
                {ctaLinks.secondary.label}
              </OptionalLink>
            </div>
          </Reveal>

          <Reveal className="hero-metrics-wrapper" delay={60}>
            <div className="hero-metrics">
              <div>
                <strong>2</strong>
                <span>activos digitales propios destacados</span>
              </div>
              <div>
                <strong>5</strong>
                <span>casos reales para mostrar impacto</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>soluciones pensadas a medida del negocio</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-visual" delay={120}>
            <div className="ambient-orb ambient-orb-one" />
            <div className="ambient-orb ambient-orb-two" />
            <HeroLottie />
          </Reveal>
        </div>
      </section>

      <section className="section surface" id="productos">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Activos principales</span>
            <h2>Citify y Contrify tienen que verse primero, fuerte y claro.</h2>
            <p>
              Estos productos muestran el tipo de ecosistema digital que Digital
              Amenities puede construir: marca, experiencia y funcionalidad en una
              misma pieza.
            </p>
          </div>
        </Reveal>

        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <Reveal className="product-card" key={product.name} delay={index * 120}>
              <span className="card-kicker">{product.eyebrow}</span>
              <div className="product-logo-wrap">
                <Image
                  src={product.logo}
                  alt={product.alt}
                  width={180}
                  height={80}
                  className="product-logo"
                />
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <OptionalLink className="button button-inline" href={product.cta.href}>
                {product.cta.label}
              </OptionalLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="amenity-digital">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Qué es un amenity digital</span>
            <h2>Una herramienta propia que mejora percepción, servicio y gestión.</h2>
            <p>
              Así como un espacio físico cuida detalles para hacer sentir mejor a sus
              clientes, un amenity digital agrega valor con una experiencia
              tecnológica diseñada para acompañar y diferenciar.
            </p>
          </div>
        </Reveal>

        <div className="amenity-grid">
          {amenityPoints.map((point, index) => (
            <Reveal className="amenity-card" key={point.title} delay={index * 100}>
              <div className="amenity-index">0{index + 1}</div>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section benefit-section surface">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Por qué funciona</span>
            <h2>Tecnología pensada desde la experiencia, no desde la planilla.</h2>
          </div>
        </Reveal>

        <div className="benefit-grid">
          {benefits.map((benefit, index) => (
            <Reveal className="benefit-card" key={benefit.title} delay={index * 90}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="casos">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Confían en nosotros</span>
            <h2>Clientes destacados en movimiento, con casos reales detrás.</h2>
            <p>
              Primero aparece la marca, después el contexto. Así la sección gana
              presencia visual sin perder el valor comercial de contar qué se hizo.
            </p>
          </div>
        </Reveal>

        <Reveal className="clients-showcase" delay={90}>
          <ClientsCarousel items={caseStudies} />
        </Reveal>
      </section>

      <section className="section testimonial-section surface">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Resultados que se sienten</span>
            <h2>Cuando el desarrollo está bien pensado, se nota en la experiencia diaria.</h2>
          </div>
        </Reveal>

        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <Reveal className="testimonial-card" key={testimonial.author} delay={index * 110}>
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section contact-cta" id="contacto">
        <Reveal className="contact-panel">
          <span className="eyebrow">Construyamos el tuyo</span>
          <h2>Tu próximo diferencial puede ser un amenity digital propio.</h2>
          <p>
            Si querés una herramienta que mejore la experiencia del cliente y al mismo
            tiempo ordene la operación interna, ya hay una base desde donde empezar.
          </p>

          <div className="hero-actions">
            <OptionalLink className="button button-primary" href={ctaLinks.primary.href}>
              Coordinar una charla
            </OptionalLink>
            <OptionalLink className="button button-secondary" href="#productos">
              Volver a productos
            </OptionalLink>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div>
          <Image
            src={brandAssets.footerPrimary.src}
            alt={brandAssets.footerPrimary.alt}
            width={184}
            height={86}
          />
          <p>El confort también es digital.</p>
        </div>

        <div className="footer-links">
          {socialLinks.map((social) => (
            <OptionalLink key={social.label} className="social-pill" href={social.href}>
              <span>{social.label}</span>
              <small>{social.handle}</small>
            </OptionalLink>
          ))}
        </div>
      </footer>
    </main>
  );
}
