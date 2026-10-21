import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"

type MediaItem = {
  src: string
  alt: string
  caption: string
  type?: "video"
  videoSrc?: string
}
type Album = {
  slug: string
  name: string
  filter: string
  cover: string
  items: MediaItem[]
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=88`

const localXV = (number: number) =>
  `/assets/gallery/mis-xv-${String(number).padStart(2, "0")}.webp`

// Reemplaza estas URLs por las fotografías finales del estudio.
const albums: Album[] = [
  {
    slug: "mis-xv",
    name: "Mis XV",
    filter: "XV",
    cover: localXV(1),
    items: Array.from({ length: 10 }, (_, index) => ({
      src: localXV(index + 1),
      alt: `Sesión de quince años fotografiada por Edinson Castillo, imagen ${index + 1}`,
      caption: `Lorem ipsum dolor sit amet — Fotografía ${String(index + 1).padStart(2, "0")}`,
    })),
  },
  {
    slug: "bodas",
    name: "Bodas",
    filter: "Bodas",
    cover: img("photo-1519741497674-611481863552"),
    items: [
      [
        "photo-1519741497674-611481863552",
        "Novios durante su ceremonia",
        "Laura + Mateo — Cali",
      ],
      [
        "photo-1606216794079-73f85bbd57d5",
        "Novia en luz natural",
        "Antes del sí",
      ],
      [
        "photo-1604017011826-d3b4c23f8914",
        "Pareja abrazada en un campo",
        "Un instante para siempre",
      ],
      [
        "photo-1591604442449-ecc9943efabf",
        "Novia con bouquet",
        "Flores y promesas",
      ],
      [
        "photo-1607357910286-1ff94ac13c24",
        "Pareja entre vegetación",
        "Retratos al atardecer",
      ],
      [
        "photo-1519741196428-6a2175fa2557",
        "Detalle de pareja recién casada",
        "Cerca, siempre",
      ],
      ["photo-1580824456266-c578703e13da", "Novios besándose", "El comienzo"],
      [
        "photo-1735052712464-9d24b69be5f5",
        "Novios caminando en el bosque",
        "Camino juntos",
      ],
    ].map(([id, alt, caption]) => ({ src: img(id), alt, caption })),
  },
  {
    slug: "bebes",
    name: "Bebés",
    filter: "Bebés",
    cover: img("photo-1636830621251-8df7f6d34a02"),
    items: [
      [
        "photo-1636830621251-8df7f6d34a02",
        "Bebé recostado sobre una manta azul",
        "Lorem ipsum — Sesión de bebé",
      ],
      [
        "photo-1636830632657-1dcda9360a3a",
        "Familia sosteniendo a su bebé",
        "Lorem ipsum — Retrato familiar",
      ],
      [
        "photo-1583086762675-5a88bcc72548",
        "Madre y bebé en una sesión de luz natural",
        "Lorem ipsum — Luz natural",
      ],
      [
        "photo-1765956807683-ad558e88f23d",
        "Padres sosteniendo a su recién nacido",
        "Lorem ipsum — Primeros días",
      ],
      [
        "photo-1715433493371-fa3fb6ce50b7",
        "Familia reunida con su bebé",
        "Lorem ipsum — En familia",
      ],
      [
        "photo-1715433493569-984127f55eee",
        "Retrato vertical de padres con su bebé",
        "Lorem ipsum — Recuerdos",
      ],
      [
        "photo-1623743636081-a15662dbdc75",
        "Padre sosteniendo a una niña",
        "Lorem ipsum — Momentos juntos",
      ],
      [
        "photo-1715433493525-17549aa6442c",
        "Familia sonriendo con su bebé",
        "Lorem ipsum — Retrato de familia",
      ],
    ].map(([id, alt, caption]) => ({ src: img(id), alt, caption })),
  },
  {
    slug: "eventos",
    name: "Eventos",
    filter: "Eventos",
    cover: img("photo-1492684223066-81342ee5ff30"),
    items: [
      [
        "photo-1492684223066-81342ee5ff30",
        "Celebración con confeti",
        "La energía de una noche inolvidable",
      ],
      [
        "photo-1459749411175-04bf5292ceea",
        "Público durante un concierto",
        "Música en vivo",
      ],
      [
        "photo-1470229722913-7c0e2dbbafd3",
        "Luces sobre el público",
        "Entre luces",
      ],
      [
        "photo-1533174072545-7a4b6ad7a6c3",
        "Festival al aire libre",
        "Celebrar juntos",
      ],
      [
        "photo-1514525253161-7a46d19cd819",
        "Escenario y multitud",
        "Una noche vibrante",
      ],
      [
        "photo-1540039155733-5bb30b53aa14",
        "Público frente al escenario",
        "El momento cumbre",
      ],
      [
        "photo-1603910234616-3b5f4a6be2b4",
        "Confeti violeta en concierto",
        "Color y emoción",
      ],
    ].map(([id, alt, caption]) => ({ src: img(id), alt, caption })),
  },
  {
    slug: "video",
    name: "Video",
    filter: "Video",
    cover: img("photo-1625690303837-654c9666d2d0"),
    items: [
      [
        "photo-1625690303837-654c9666d2d0",
        "Camarógrafo en set iluminado",
        "Historias en movimiento",
      ],
      [
        "photo-1553166272-e69910ab5ae1",
        "Cámara de cine profesional",
        "Producción cinematográfica",
      ],
      [
        "photo-1632187981988-40f3cbaeef5e",
        "Equipo trabajando en una producción",
        "Detrás de cámaras",
      ],
      [
        "photo-1611784728558-6c7d9b409cdf",
        "Videógrafo operando cámara",
        "Cada plano cuenta",
      ],
      [
        "photo-1594394489098-74ac04c0fc2e",
        "Cámara grabando una sesión musical",
        "Sesión en vivo",
      ],
      [
        "photo-1632187989763-c9c620420b4d",
        "Rodaje profesional",
        "Creando la escena",
      ],
    ].map(([id, alt, caption], i) => ({
      src: img(id),
      alt,
      caption,
      type: "video" as const,
      videoSrc:
        i % 2
          ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          : "https://www.w3schools.com/html/mov_bbb.mp4",
    })),
  },
]

// El hero usa exclusivamente fotografías horizontales.
const heroImages = [
  localXV(2),
  localXV(3),
  localXV(5),
  albums[1].items[2].src,
  albums[3].items[0].src,
]

function go(path: string) {
  history.pushState({}, "", path)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function Icon({ name, size = 20 }: { name: string size?: number }) {
  const paths: Record<string, ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-4.7A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8.2 7.7c.3-.5.6-.5.9-.5h.5l.8 2c.1.3 0 .5-.2.7l-.6.7c.8 1.7 2.1 2.8 3.9 3.4l.6-.8c.2-.3.5-.3.8-.2l2 .9c.3.1.4.4.3.7-.3 1.5-1.4 2.2-2.6 2.2-3.1 0-7.5-3.6-7.5-7.2 0-.8.4-1.6 1.1-1.9Z" />
      </>
    ),
    tiktok: (
      <>
        <path d="M14 4v10.2a4.2 4.2 0 1 1-3.5-4.1" />
        <path d="M14 4c.7 2.6 2.2 4 5 4.2" />
      </>
    ),
    menu: (
      <>
        <path d="M3 7h18M3 17h18" />
      </>
    ),
    close: (
      <>
        <path d="m5 5 14 14M19 5 5 19" />
      </>
    ),
    arrow: <path d="m9 18 6-6-6-6" />,
    back: <path d="m15 18-6-6 6-6" />,
    fullscreen: (
      <>
        <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5V7Z" />,
    share: (
      <>
        <circle cx="18" cy="5" r="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="19" r="2" />
        <path d="m8 11 8-5M8 13l8 5" />
      </>
    ),
    chevronDown: <path d="m7 9 5 5 5-5" />,
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Link({
  to,
  children,
  className = "",
  onClick,
}: {
  to: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        go(to)
      }}
    >
      {children}
    </a>
  )
}

function Logo({
  light = true,
  large = false,
}: {
  light?: boolean
  large?: boolean
}) {
  return (
    <Link
      to="/"
      className={`logo ${large ? "logo-large" : ""} ${
        light ? "logo-light" : "logo-dark"
      }`}
    >
      <img
        src="/assets/delcastillo-logo.png"
        alt="DelCastillo fotografía más video"
      />
    </Link>
  )
}

const socials = [
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://instagram.com/delcastillo",
  },
  { name: "WhatsApp", icon: "whatsapp", href: "https://wa.me/57XXXXXXXXXX" },
  { name: "TikTok", icon: "tiktok", href: "https://tiktok.com/@delcastillo" },
]

function Header({ path }: { path: string }) {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 30)
    addEventListener("scroll", fn)
    fn()
    return () => removeEventListener("scroll", fn)
  }, [])
  useEffect(() => setMenu(false), [path])
  const nav = [
    { label: "Inicio", to: "/" },
    { label: "Sobre mí", to: "/sobre-mi" },
    { label: "Galería", to: "/galeria" },
    { label: "Contacto", to: "/contacto" },
  ]
  return (
    <>
      <header
        className={`header ${scrolled || path !== "/" ? "header-solid" : ""}`}
      >
        <Logo />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {nav.map((n) =>
            n.label === "Galería" ? (
              <div className="nav-gallery" key={n.to}>
                <Link
                  to={n.to}
                  className={path.startsWith(n.to) ? "active" : ""}
                >
                  {n.label}
                  <Icon name="chevronDown" size={13} />
                </Link>
                <div className="dropdown">
                  {albums.map((a) => (
                    <Link key={a.slug} to={`/galeria/${a.slug}`}>
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className={
                  (n.to === "/" ? path === "/" : path.startsWith(n.to))
                    ? "active"
                    : ""
                }
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="header-socials">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              aria-label={s.name}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name={s.icon} />
            </a>
          ))}
        </div>
        <button
          className="menu-button"
          aria-label="Abrir menú"
          onClick={() => setMenu(true)}
        >
          <Icon name="menu" size={26} />
        </button>
      </header>
      <div className={`mobile-menu ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <button
          className="menu-close"
          onClick={() => setMenu(false)}
          aria-label="Cerrar menú"
        >
          <Icon name="close" size={30} />
        </button>
        <Logo large />
        <nav>
          {nav.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-socials">
          {socials.map((s) => (
            <a key={s.name} href={s.href} aria-label={s.name}>
              <Icon name={s.icon} size={24} />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <Logo />
        <p>
          Fotografía con intención.
          <br />
          Historias que permanecen.
        </p>
        <div className="footer-nav">
          <Link to="/sobre-mi">Sobre mí</Link>
          <Link to="/galeria">Galería</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div className="footer-socials">
          {socials.map((s) => (
            <a key={s.name} href={s.href}>
              <Icon name={s.icon} />
              {s.name}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 DelCastillo fotografía + video</span>
        <span>Cali, Colombia</span>
      </div>
    </footer>
  )
}
function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href="https://wa.me/57XXXXXXXXXX"
      aria-label="Conversar por WhatsApp"
    >
      <Icon name="whatsapp" size={25} />
    </a>
  )
}
function PageShell({
  path,
  children,
  noFooter = false,
}: {
  path: string
  children: ReactNode
  noFooter?: boolean
}) {
  return (
    <div className="page-fade">
      <Header path={path} />
      {children}
      {!noFooter && <Footer />}
      <WhatsAppFloat />
    </div>
  )
}

function Home({ path }: { path: string }) {
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % heroImages.length),
      5600,
    )
    return () => clearInterval(timer)
  }, [])
  return (
    <PageShell path={path}>
      <main>
        <section className="hero">
          {heroImages.map((src, i) => (
            <img
              key={src}
              className={`hero-img ${i === slide ? "visible" : ""}`}
              src={src}
              alt=""
              aria-hidden={i !== slide}
            />
          ))}
          <div className="hero-shade" />
          <div className="hero-content">
            <div
              className="hero-logo"
              aria-label="DelCastillo fotografía más video"
            >
              <img
                src="/assets/delcastillo-logo.png"
                alt="DelCastillo fotografía más video"
              />
            </div>
            <h1>
              Momentos
              <br />
              <em>que permanecen.</em>
            </h1>
            <p>
              Fotografía y video de historias reales,
              <br className="desktop-only" /> contadas con luz y emoción.
            </p>
            <div className="hero-actions">
              <Link to="/galeria" className="button primary">
                Ver galería <span>↗</span>
              </Link>
              <Link to="/contacto" className="button ghost">
                Contáctame
              </Link>
            </div>
          </div>
          <div className="slide-count">
            <span>0{slide + 1}</span>
            <i />
            <span>0{heroImages.length}</span>
          </div>
          <a href="#destacados" className="scroll-cue">
            <span>Explorar</span>
            <i />
          </a>
        </section>
        <section id="destacados" className="featured section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Selección</span>
              <h2>Trabajos destacados</h2>
            </div>
            <Link to="/galeria" className="text-link">
              Ver todo el portafolio <span>→</span>
            </Link>
          </div>
          <div className="featured-grid">
            {[albums[0], albums[2], albums[3]].map((a, i) => (
              <Link
                key={a.slug}
                to={`/galeria/${a.slug}`}
                className={`feature-card card-${i + 1}`}
              >
                <img
                  src={a.cover}
                  alt={`Portada de ${a.name}`}
                  loading="lazy"
                />
                <div className="card-overlay" />
                <span className="card-number">0{i + 1}</span>
                <div className="card-title">
                  <small>Colección</small>
                  <h3>{a.name}</h3>
                  <span>Ver álbum →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="manifesto section">
          <span className="eyebrow">Nuestra mirada</span>
          <p>
            No buscamos la pose perfecta.
            <br />
            Buscamos <em>lo que se siente real.</em>
          </p>
          <div className="manifesto-meta">
            <span>Luz natural</span>
            <span>Emoción honesta</span>
            <span>Color con carácter</span>
          </div>
        </section>
        <section className="cta">
          <span className="eyebrow">Tu historia empieza aquí</span>
          <h2>¿Listo para tu sesión?</h2>
          <p>Hablemos de lo que imaginas y hagámoslo inolvidable.</p>
          <a href="https://wa.me/57XXXXXXXXXX" className="button primary">
            <Icon name="whatsapp" /> Escribir por WhatsApp
          </a>
        </section>
      </main>
    </PageShell>
  )
}

function About({ path }: { path: string }) {
  return (
    <PageShell path={path}>
      <main className="light-page">
        <section className="about-intro section">
          <div className="about-photo">
            <img
              src="/assets/edinson-castillo.webp"
              alt="Edinson Castillo fotografiando con su cámara"
            />
            <span className="vertical-note">Detrás de cada imagen</span>
          </div>
          <div className="about-copy">
            <span className="eyebrow dark">Sobre mí</span>
            <h1>
              Hola, soy <em>Edinson Castillo,</em> fotógrafo y videógrafo en
              Cali.
            </h1>
            <div className="about-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
                Nullam varius, turpis et commodo pharetra.
              </p>
            </div>
            <Link to="/contacto" className="button primary">
              Hablemos <span>→</span>
            </Link>
          </div>
        </section>
        <section className="behind section">
          <div>
            <span className="eyebrow dark">El proceso</span>
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          </div>
          <img
            src={img("photo-1611784728558-6c7d9b409cdf")}
            alt="Fotógrafo trabajando detrás de cámaras"
            loading="lazy"
          />
        </section>
        <section className="stats">
          <div>
            <strong>+X</strong>
            <span>Lorem ipsum</span>
          </div>
          <div>
            <strong>+X</strong>
            <span>Dolor sit amet</span>
          </div>
          <div>
            <strong>CO</strong>
            <span>Cali y toda Colombia</span>
          </div>
        </section>
        <section className="about-social section">
          <h2>Lorem ipsum dolor sit amet.</h2>
          <div>
            {socials.map((s) => (
              <a href={s.href} key={s.name}>
                <Icon name={s.icon} />
                {s.name}
                <span>↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  )
}

function Gallery({ path }: { path: string }) {
  const [filter, setFilter] = useState("Todos")
  const filters = ["Todos", "XV", "Bodas", "Bebés", "Eventos", "Video"]
  const shown =
    filter === "Todos" ? albums : albums.filter((a) => a.filter === filter)
  return (
    <PageShell path={path}>
      <main className="gallery-page">
        <section className="gallery-header section">
          <span className="eyebrow">Portafolio</span>
          <div>
            <h1>Historias en imágenes.</h1>
            <p>
              Una selección de momentos reales,
              <br />
              luz honesta y emociones que perduran.
            </p>
          </div>
          <div className="filters" role="tablist">
            {filters.map((f) => (
              <button
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
                key={f}
              >
                {f}
              </button>
            ))}
          </div>
        </section>
        <section className="album-grid section">
          {shown.map((a, i) => (
            <Link to={`/galeria/${a.slug}`} className="album-card" key={a.slug}>
              <div className="album-image">
                <img
                  src={a.cover}
                  alt={`Portada del álbum ${a.name}`}
                  loading="lazy"
                />
                {a.slug === "video" && (
                  <span className="play-badge">
                    <Icon name="play" size={26} />
                  </span>
                )}
                <span className="view-album">Abrir colección ↗</span>
              </div>
              <div className="album-meta">
                <span>0{i + 1}</span>
                <h2>{a.name}</h2>
                <small>
                  {a.items.length} {a.slug === "video" ? "videos" : "fotos"}
                </small>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </PageShell>
  )
}

function AlbumView({ path, album }: { path: string album: Album }) {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(false)
  const [canFullscreen, setCanFullscreen] = useState(
    () => document.fullscreenEnabled,
  )
  const thumbs = useRef<HTMLDivElement>(null)
  const touch = useRef(0)
  const current = album.items[index]
  const select = (next: number) => {
    setFade(true)
    setTimeout(() => {
      setIndex((next + album.items.length) % album.items.length)
      setFade(false)
    }, 160)
  }
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") select(index + 1)
      if (e.key === "ArrowLeft") select(index - 1)
      if (e.key === "Escape") go("/galeria")
    }
    addEventListener("keydown", key)
    return () => removeEventListener("keydown", key)
  }, [index])
  useEffect(() => {
    thumbs.current?.children[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
    const next = album.items[(index + 1) % album.items.length]
    if (!next.type) {
      const preload = new Image()
      preload.src = next.src
    }
  }, [index, album])
  const fullscreen = async () => {
    const viewer = document.querySelector<HTMLElement>(".viewer-media")
    if (!viewer?.requestFullscreen || !document.fullscreenEnabled) {
      setCanFullscreen(false)
      return
    }

    try {
      await viewer.requestFullscreen()
    } catch {
      // Figma Make renders previews inside an iframe that may block fullscreen.
      setCanFullscreen(false)
    }
  }
  return (
    <PageShell path={path} noFooter>
      <main className="album-view">
        <div className="album-top">
          <div>
            <span className="eyebrow">Colección</span>
            <h1>{album.name}</h1>
          </div>
          <div className="album-actions">
            <span>
              <b>{String(index + 1).padStart(2, "0")}</b> /{" "}
              {String(album.items.length).padStart(2, "0")}
            </span>
            <Link to="/galeria">
              <Icon name="back" /> Volver a galería
            </Link>
          </div>
        </div>
        <div
          className="viewer"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const d = touch.current - e.changedTouches[0].clientX
            if (Math.abs(d) > 45) select(index + (d > 0 ? 1 : -1))
          }}
        >
          <button
            className="viewer-arrow prev"
            onClick={() => select(index - 1)}
            aria-label="Foto anterior"
          >
            <Icon name="back" size={30} />
          </button>
          <div className={`viewer-media ${fade ? "fade" : ""}`}>
            {current.type === "video" ? (
              <video
                key={current.videoSrc}
                controls
                autoPlay
                poster={current.src}
              >
                <source src={current.videoSrc} type="video/mp4" />
              </video>
            ) : (
              <img key={current.src} src={current.src} alt={current.alt} />
            )}{" "}
            {current.type === "video" && (
              <span className="video-label">VIDEO</span>
            )}
          </div>
          <button
            className="viewer-arrow next"
            onClick={() => select(index + 1)}
            aria-label="Foto siguiente"
          >
            <Icon name="arrow" size={30} />
          </button>
          {canFullscreen && (
            <button
              className="fullscreen"
              onClick={fullscreen}
              aria-label="Ver en pantalla completa"
            >
              <Icon name="fullscreen" />
            </button>
          )}
        </div>
        <div className="caption-row">
          <p>{current.caption}</p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Mira esta imagen de DelCastillo: ${location.href}`)}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="share" /> Compartir por WhatsApp
          </a>
        </div>
        <div className="thumbs-wrap">
          <button
            onClick={() =>
              thumbs.current?.scrollBy({ left: -400, behavior: "smooth" })
            }
            aria-label="Desplazar miniaturas"
          >
            <Icon name="back" />
          </button>
          <div className="thumbs" ref={thumbs}>
            {album.items.map((item, i) => (
              <button
                key={item.src}
                className={i === index ? "active" : ""}
                onClick={() => select(i)}
                aria-label={`Ver ${item.caption}`}
              >
                <img src={item.src} alt="" loading="lazy" />
                {item.type === "video" && (
                  <span>
                    <Icon name="play" size={18} />
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              thumbs.current?.scrollBy({ left: 400, behavior: "smooth" })
            }
            aria-label="Desplazar miniaturas"
          >
            <Icon name="arrow" />
          </button>
        </div>
      </main>
    </PageShell>
  )
}

function Contact({ path }: { path: string }) {
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const bad: Record<string, boolean> = {}
    ;["nombre", "correo", "telefono", "servicio", "mensaje"].forEach((k) => {
      if (!data.get(k)) bad[k] = true
    })
    setErrors(bad)
    if (!Object.keys(bad).length) {
      setSuccess(true)
      e.currentTarget.reset()
    }
  }
  const field = (name: string) => (errors[name] ? "field error" : "field")
  return (
    <PageShell path={path}>
      <main className="contact-page">
        <section className="contact-head section">
          <span className="eyebrow">Contacto</span>
          <h1>Hablemos.</h1>
          <p>
            Cuéntame sobre tu evento o sesión
            <br />y creamos algo único.
          </p>
        </section>
        <section className="contact-grid section">
          <form onSubmit={submit} noValidate>
            <div className={field("nombre")}>
              <label htmlFor="nombre">Nombre completo *</label>
              <input id="nombre" name="nombre" placeholder="¿Cómo te llamas?" />
              <small>Este campo es necesario</small>
            </div>
            <div className="form-row">
              <div className={field("correo")}>
                <label htmlFor="correo">Correo *</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tu@correo.com"
                />
                <small>Ingresa tu correo</small>
              </div>
              <div className={field("telefono")}>
                <label htmlFor="telefono">WhatsApp / teléfono *</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+57 300 000 0000"
                />
                <small>Ingresa tu teléfono</small>
              </div>
            </div>
            <div className="form-row">
              <div className={field("servicio")}>
                <label htmlFor="servicio">Tipo de servicio *</label>
                <select id="servicio" name="servicio" defaultValue="">
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {["Mis XV", "Boda", "Retrato", "Evento", "Video", "Otro"].map(
                    (x) => (
                      <option key={x}>{x}</option>
                    ),
                  )}
                </select>
                <small>Selecciona un servicio</small>
              </div>
              <div className="field">
                <label htmlFor="fecha">Fecha del evento</label>
                <input id="fecha" name="fecha" type="date" />
              </div>
            </div>
            <div className={field("mensaje")}>
              <label htmlFor="mensaje">Cuéntame un poco *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                placeholder="¿Qué tienes en mente?"
              />
              <small>Cuéntame sobre tu proyecto</small>
            </div>
            <button className="button primary" type="submit">
              Enviar mensaje <span>→</span>
            </button>
            {success && (
              <div className="success" role="status">
                <b>Mensaje listo.</b> Gracias por escribir. Te responderé muy
                pronto.
              </div>
            )}
          </form>
          <aside className="contact-info">
            <div>
              <span className="eyebrow">Estoy en</span>
              <h2>
                Cali,
                <br />
                Valle del Cauca
              </h2>
              <p>
                Disponible para proyectos
                <br />
                en toda Colombia.
              </p>
            </div>
            <dl>
              <div>
                <dt>Correo</dt>
                <dd>
                  <a href="mailto:hola@delcastillo.co">hola@delcastillo.co</a>
                </dd>
              </div>
              <div>
                <dt>Teléfono</dt>
                <dd>
                  <a href="tel:+573000000000">+57 300 000 0000</a>
                </dd>
              </div>
            </dl>
            <div className="contact-social">
              {socials.map((s) => (
                <a href={s.href} key={s.name}>
                  <Icon name={s.icon} />
                  <span>{s.name}</span>
                  <b>↗</b>
                </a>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </PageShell>
  )
}

function NotFound({ path }: { path: string }) {
  return (
    <PageShell path={path}>
      <main className="not-found">
        <span>404</span>
        <h1>Esta página no existe.</h1>
        <Link to="/" className="button primary">
          Volver al inicio
        </Link>
      </main>
    </PageShell>
  )
}

export default function App() {
  const [path, setPath] = useState(location.pathname.replace(/\/$/, "") || "/")
  useEffect(() => {
    const update = () => setPath(location.pathname.replace(/\/$/, "") || "/")
    addEventListener("popstate", update)
    return () => removeEventListener("popstate", update)
  }, [])
  useEffect(() => {
    const section =
      path === "/"
        ? "Inicio"
        : albums.find((item) => path.endsWith(item.slug))?.name ||
          (path === "/sobre-mi"
            ? "Sobre mí"
            : path === "/galeria"
              ? "Galería"
              : path === "/contacto"
                ? "Contacto"
                : "Portafolio")
    document.title = `${section} | DelCastillo fotografía + video`
  }, [path])
  const slug = path.startsWith("/galeria/") ? path.split("/")[2] : ""
  const album = albums.find((a) => a.slug === slug)
  if (path === "/") return <Home path={path} />
  if (path === "/sobre-mi") return <About path={path} />
  if (path === "/galeria") return <Gallery path={path} />
  if (album) return <AlbumView path={path} album={album} />
  if (path === "/contacto") return <Contact path={path} />
  return <NotFound path={path} />
}
