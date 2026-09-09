import Image from "next/image";

type MarqueeItem = {
  name: string;
  logo: string;
  alt: string;
};

type LogoMarqueeProps = {
  items: MarqueeItem[];
  label: string;
};

/**
 * Tira de logos en movimiento continuo, 100% CSS: no hay rAF ni listeners, se
 * pausa al pasar el mouse o con foco de teclado y queda quieta si el usuario
 * pidio menos movimiento. El segundo grupo es una copia decorativa que existe
 * solo para que el loop no tenga corte.
 */
export function LogoMarquee({ items, label }: LogoMarqueeProps) {
  return (
    <div className="marquee" role="group" aria-label={label}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul className="marquee-group" key={copy} aria-hidden={copy === 1 || undefined}>
            {items.map((item) => (
              <li key={item.name}>
                <span className="marquee-logo">
                  <Image
                    src={item.logo}
                    alt={copy === 0 ? item.alt : ""}
                    fill
                    sizes="160px"
                    className="contain-logo"
                  />
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
