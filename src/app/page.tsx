import Image from "next/image";

import { ContactModal } from "@/components/contact-modal";
import { ContactTrigger } from "@/components/contact-trigger";
import { HeroLottie } from "@/components/hero-lottie";
import { OptionalLink } from "@/components/optional-link";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { brandAssets } from "@/data/brand-assets";
import {
  amenityPoints,
  capabilities,
  caseStudies,
  ctaLinks,
  featuredProducts,
  heroMetrics,
  instagramUrl,
  socialLinks
} from "@/data/site-content";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>

      <SiteHeader />
      <ContactModal />

      <main className="page-shell" id="contenido">
        <section className="hero-section" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <Reveal className="hero-eyebrow">
              <span className="eyebrow">El confort también es digital</span>
            </Reveal>

            <Reveal className="hero-head" delay={40}>
              <h1 id="hero-title">Creamos amenities digitales.</h1>
            </Reveal>

            <Reveal className="hero-visual" delay={80}>
              <span className="ambient-orb ambient-orb-one" aria-hidden="true" />
              <span className="ambient-orb ambient-orb-two" aria-hidden="true" />
              <HeroLottie label="Documentos en papel convirtiéndose en registros digitales" />
            </Reveal>

            <Reveal className="hero-body" delay={140}>
              <p className="hero-text">
                Desarrollamos el software que ordena tu operación y que tus clientes notan.
              </p>

              <div className="hero-actions">
                <ContactTrigger className="button button-primary" variant="amenity">
                  {ctaLinks.primary.label}
                </ContactTrigger>
                <OptionalLink className="button button-secondary" href={ctaLinks.secondary.href}>
                  {ctaLinks.secondary.label}
                </OptionalLink>
              </div>
            </Reveal>

            <Reveal className="hero-metrics-wrapper" delay={200}>
              <dl className="hero-metrics">
                {heroMetrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.value}</dt>
                    <dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="section surface" id="productos" aria-labelledby="productos-title">
          <Reveal>
            <div className="section-heading">
              <span className="eyebrow">Productos propios</span>
              <h2 id="productos-title">Dos plataformas que ya están funcionando.</h2>
            </div>
          </Reveal>

          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <Reveal className="product-card" key={product.name} delay={index * 100}>
                <span className="card-kicker">{product.eyebrow}</span>
                <span className="logo-box product-logo-box">
                  <Image
                    src={product.logo}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 900px) 60vw, 240px"
                    className="contain-logo"
                  />
                </span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <OptionalLink className="button button-inline" href={product.cta.href}>
                  {product.cta.label}
                </OptionalLink>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section" id="amenity-digital" aria-labelledby="amenity-title">
          <Reveal>
            <div className="section-heading">
              <span className="eyebrow">Qué es un amenity digital</span>
              <h2 id="amenity-title">
                Una herramienta propia que mejora la experiencia y ordena la operación.
              </h2>
              <p>Como ese detalle que hace mejor a un lugar, pero en digital.</p>
            </div>
          </Reveal>

          <div className="amenity-grid">
            {amenityPoints.map((point, index) => (
              <Reveal className="amenity-card" key={point.title} delay={index * 90}>
                <span className="amenity-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="capacidades-title">
          <Reveal>
            <div className="section-heading">
              <span className="eyebrow">Cómo trabajamos</span>
              <h2 id="capacidades-title">
                Primero entendemos el negocio. Después escribimos código.
              </h2>
            </div>
          </Reveal>

          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <Reveal className="capability" key={capability.title} delay={index * 80}>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section" id="casos" aria-labelledby="casos-title">
          <Reveal>
            <div className="section-heading">
              <span className="eyebrow">Casos</span>
              <h2 id="casos-title">Negocios que ya tienen el suyo.</h2>
            </div>
          </Reveal>

          <div className="cases-panel">
            <div className="case-grid">
              {caseStudies.map((caseStudy, index) => (
                <Reveal
                  as="article"
                  className="case-card"
                  key={caseStudy.name}
                  delay={Math.min(index, 4) * 70}
                >
                  <span className="logo-box case-logo-box">
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.alt}
                      fill
                      sizes="(max-width: 620px) 42vw, 200px"
                      className="contain-logo"
                    />
                  </span>
                  <h3>{caseStudy.name}</h3>
                  <span className="case-category">{caseStudy.category}</span>
                  <p>{caseStudy.result}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-cta" id="contacto" aria-labelledby="contacto-title">
          <Reveal className="contact-panel">
            <span className="eyebrow">Empecemos</span>
            <h2 id="contacto-title">Tu próximo diferencial puede ser un sistema propio.</h2>
            <p>Contanos qué necesitás y te decimos por dónde empezar.</p>

            <div className="hero-actions">
              <ContactTrigger className="button button-invert" variant="charla">
                Coordinar una charla
              </ContactTrigger>
              <OptionalLink className="button button-ghost" href={instagramUrl}>
                Escribinos por Instagram
              </OptionalLink>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Image
              src={brandAssets.footerPrimary.src}
              alt={brandAssets.footerPrimary.alt}
              width={1165}
              height={440}
            />
            <p>El confort también es digital.</p>
          </div>

          <ul className="footer-links">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <OptionalLink className="social-pill" href={social.href}>
                  <span>{social.label}</span>
                  <small>{social.handle}</small>
                </OptionalLink>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
