import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { CatalogSection } from "@/components/sections/work-section"
import { MoodsSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import Icon from "@/components/ui/icon"

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex items-center gap-2.5 transition-opacity hover:opacity-75">
      {/* Знак — открытая книга с засечкой */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        {/* Левая страница */}
        <path
          d="M16 8 C13 7 9 7.5 6 9 L6 24 C9 22.5 13 22 16 23 L16 8Z"
          fill="currentColor"
          fillOpacity="0.13"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Правая страница */}
        <path
          d="M16 8 C19 7 23 7.5 26 9 L26 24 C23 22.5 19 22 16 23 L16 8Z"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeOpacity="0.38"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Корешок */}
        <line x1="16" y1="8" x2="16" y2="23" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2"/>
        {/* Строки на левой */}
        <line x1="8.5" y1="13" x2="14" y2="12.2" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="8.5" y1="16" x2="14" y2="15.3" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="8.5" y1="19" x2="12.5" y2="18.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.9" strokeLinecap="round"/>
        {/* Акцентный штрих — закладка */}
        <path d="M22 7.5 L22 13 L20 11.5 L18 13 L18 7.5Z" fill="currentColor" fillOpacity="0.45"/>
      </svg>

      {/* Текст */}
      <div className="flex flex-col leading-none">
        <span className="font-serif text-[15px] font-medium tracking-[0.01em] text-foreground">
          Смысл в Строках
        </span>
        <span className="mt-[2px] font-mono text-[9px] tracking-[0.22em] text-foreground/42 uppercase">
          Книжный магазин
        </span>
      </div>
    </button>
  )
}

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount] = useState(0)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }
    if (checkShaderReady()) return
    const intervalId = setInterval(() => { if (checkShaderReady()) clearInterval(intervalId) }, 100)
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)
    return () => { clearInterval(intervalId); clearTimeout(fallbackTimer) }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: scrollContainerRef.current.offsetWidth * index, behavior: "smooth" })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; touchStartX.current = e.touches[0].clientX }
    const handleTouchMove = (e: TouchEvent) => { if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) e.preventDefault() }
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 5) scrollToSection(currentSection + 1)
        else if (deltaY < 0 && currentSection > 0) scrollToSection(currentSection - 1)
      }
    }
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        if (!scrollContainerRef.current) return
        scrollContainerRef.current.scrollBy({ left: e.deltaY, behavior: "instant" })
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.offsetWidth)
        if (newSection !== currentSection) setCurrentSection(newSection)
      }
    }
    const container = scrollContainerRef.current
    if (container) container.addEventListener("wheel", handleWheel, { passive: false })
    return () => { if (container) container.removeEventListener("wheel", handleWheel) }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return
      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) { scrollThrottleRef.current = undefined; return }
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.offsetWidth)
        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) setCurrentSection(newSection)
        scrollThrottleRef.current = undefined
      })
    }
    const container = scrollContainerRef.current
    if (container) container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll)
      if (scrollThrottleRef.current) cancelAnimationFrame(scrollThrottleRef.current)
    }
  }, [currentSection])

  const navItems = ["Главная", "Каталог", "Подборки", "Команда", "О нас", "Контакты"]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#d4c5a9"
            colorB="#2d5a3d"
            speed={0.35}
            detail={0.55}
            blend={65}
            coarseX={28}
            coarseY={28}
            mediumX={32}
            mediumY={32}
            fineX={22}
            fineY={22}
          />
          <ChromaFlow
            baseColor="#ede4d0"
            upColor="#c8b89a"
            downColor="#2d5a3d"
            leftColor="#e8dcc8"
            rightColor="#b5a88a"
            intensity={0.65}
            radius={1.5}
            momentum={18}
            maskType="alpha"
            opacity={0.90}
          />
        </Shader>
        <div className="absolute inset-0 bg-background/28" />
      </div>

      {/* NAV */}
      <nav className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Logo onClick={() => scrollToSection(0)} />

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/65 hover:text-foreground"}`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-8 w-8 items-center justify-center text-foreground/60 transition-all hover:text-foreground"
          >
            <Icon name="Search" size={16} />
          </button>
          <button
            onClick={() => scrollToSection(5)}
            className="relative flex h-8 w-8 items-center justify-center text-foreground/60 transition-all hover:text-foreground"
          >
            <Icon name="ShoppingBag" size={16} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <div className="ml-1 hidden md:block">
            <MagneticButton variant="primary" size="sm" onClick={() => scrollToSection(1)}>
              Каталог
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* SEARCH */}
      <div className={`fixed left-0 right-0 top-[60px] z-40 px-6 transition-all duration-300 md:px-12 ${searchOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-3 rounded-sm border border-foreground/15 bg-background/95 px-4 py-2.5 backdrop-blur-md shadow-sm">
            <Icon name="Search" size={14} className="shrink-0 text-foreground/40" />
            <input
              autoFocus={searchOpen}
              type="text"
              placeholder="Поиск книг, авторов, жанров..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/35 focus:outline-none"
            />
            <button onClick={() => setSearchOpen(false)}>
              <Icon name="X" size={13} className="text-foreground/40 hover:text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollContainerRef}
        data-scroll-container
        className="flex h-screen w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* ── SECTION 0: HERO ── */}
        <section className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-20">
          <div className={`mx-auto w-full max-w-7xl transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="max-w-3xl">
              <p className="mb-5 font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/45">
                Пространство осознанного чтения
              </p>
              <h1 className="mb-6 font-serif text-[clamp(3rem,8vw,6rem)] font-light leading-[1.06] tracking-tight text-foreground">
                Книги,
                <br />
                которые
                <br />
                <em className="not-italic text-foreground/35">остаются с вами</em>
              </h1>
              <p className="mb-10 max-w-lg text-base leading-relaxed text-foreground/65 md:text-lg">
                Мы отбираем только то, что достойно вашего времени — литература, открывающая новые горизонты мышления, чувства и понимания мира.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection(1)}>
                  Смотреть каталог
                </MagneticButton>
                <MagneticButton variant="secondary" size="lg" onClick={() => scrollToSection(2)}>
                  Подборки по настроению
                </MagneticButton>
              </div>
            </div>

            <div className={`mt-14 flex gap-10 md:gap-16 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              {[
                { value: "4 200+", label: "книг в каталоге" },
                { value: "320", label: "новинок в месяц" },
                { value: "с 2016", label: "на книжном рынке" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-accent/30 pl-4">
                  <div className="font-serif text-2xl font-light text-foreground md:text-3xl">{s.value}</div>
                  <div className="font-mono text-[11px] text-foreground/45">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 1: CATALOG ── */}
        <CatalogSection scrollToSection={scrollToSection} />

        {/* ── SECTION 2: MOODS ── */}
        <MoodsSection scrollToSection={scrollToSection} />

        {/* ── SECTION 3: TEAM ── */}
        <TeamSection scrollToSection={scrollToSection} />

        {/* ── SECTION 4: ABOUT ── */}
        <AboutSection scrollToSection={scrollToSection} />

        {/* ── SECTION 5: CONTACTS ── */}
        <ContactSection />
      </div>

      {/* DOTS NAV */}
      <div className={`fixed bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {navItems.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`rounded-full transition-all duration-300 ${currentSection === index ? "h-1.5 w-6 bg-foreground" : "h-1.5 w-1.5 bg-foreground/30 hover:bg-foreground/55"}`}
          />
        ))}
      </div>
    </main>
  )
}

function TeamSection({ scrollToSection }: { scrollToSection?: (i: number) => void }) {
  const team = [
    {
      name: "Анна Соколова",
      role: "Основатель & Главный редактор",
      bio: "Литературовед, 15 лет в издательском деле. Читает 80 книг в год и лично отбирает каждую новинку.",
      initials: "АС",
      color: "bg-accent/15",
      direction: "top",
    },
    {
      name: "Михаил Орлов",
      role: "Куратор нонфикшн",
      bio: "Философ и популяризатор науки. Ведёт книжный клуб «Глубина» по средам. Специалист по когнитивным наукам.",
      initials: "МО",
      color: "bg-primary/10",
      direction: "bottom",
    },
    {
      name: "Елена Крюкова",
      role: "Куратор художественной литературы",
      bio: "Переводчик с французского и испанского. Открывает российскому читателю малоизвестных авторов со всего мира.",
      initials: "ЕК",
      color: "bg-foreground/8",
      direction: "top",
    },
    {
      name: "Дмитрий Лесной",
      role: "Советник по детской литературе",
      bio: "Педагог и детский психолог. Формирует подборки для детей от 3 до 16 лет с учётом возрастного развития.",
      initials: "ДЛ",
      color: "bg-accent/10",
      direction: "bottom",
    },
  ]

  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className={`mb-8 flex items-end justify-between transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}>
          <div>
            <h2 className="mb-1 font-serif text-5xl font-light tracking-tight text-foreground md:text-6xl">Команда</h2>
            <p className="font-mono text-sm text-foreground/45">/ Люди, которые читают за вас</p>
          </div>
          <button onClick={() => scrollToSection?.(5)} className="hidden font-mono text-xs text-accent/70 underline-offset-4 hover:underline hover:text-accent transition-colors md:block">
            Написать нам →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className={`group transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : (member.direction === "top" ? "-translate-y-12 opacity-0" : "translate-y-12 opacity-0")}`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-sm ${member.color} border border-foreground/10 transition-all duration-300 group-hover:scale-105`}>
                <span className="font-serif text-xl font-light text-foreground/70">{member.initials}</span>
              </div>
              <div className="mb-1 h-px w-6 bg-accent/40 transition-all duration-300 group-hover:w-10" />
              <h3 className="mb-0.5 font-serif text-base font-medium text-foreground leading-snug">{member.name}</h3>
              <p className="mb-2 font-mono text-[10px] text-accent/75 uppercase tracking-wide">{member.role}</p>
              <p className="text-[13px] leading-relaxed text-foreground/55">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}