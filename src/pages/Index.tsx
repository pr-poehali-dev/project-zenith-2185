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

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
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

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
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

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  const navItems = ["Главная", "Каталог", "Настроение", "О магазине", "Контакты"]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* WebGL background — warm paper tones */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#d4c5a9"
            colorB="#2d5a3d"
            speed={0.4}
            detail={0.6}
            blend={60}
            coarseX={30}
            coarseY={30}
            mediumX={35}
            mediumY={35}
            fineX={25}
            fineY={25}
          />
          <ChromaFlow
            baseColor="#e8dcc8"
            upColor="#c8b89a"
            downColor="#2d5a3d"
            leftColor="#e8dcc8"
            rightColor="#b5a88a"
            intensity={0.7}
            radius={1.6}
            momentum={20}
            maskType="alpha"
            opacity={0.92}
          />
        </Shader>
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-foreground/10 backdrop-blur-md border border-foreground/15 transition-all duration-300 hover:bg-foreground/20">
            <span className="font-serif text-lg font-semibold text-foreground">С</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base font-medium tracking-wide text-foreground">Смысл в Строках</span>
            <span className="font-mono text-[10px] text-foreground/50 tracking-widest uppercase">Книжный магазин</span>
          </div>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-sm bg-foreground/10 backdrop-blur-md border border-foreground/15 transition-all hover:bg-foreground/20"
          >
            <Icon name="Search" size={15} />
          </button>
          <MagneticButton variant="primary" onClick={() => scrollToSection(1)}>
            Каталог
          </MagneticButton>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div className="fixed left-0 right-0 top-[72px] z-40 px-6 md:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3 rounded-sm border border-foreground/20 bg-background/90 backdrop-blur-md px-4 py-3">
              <Icon name="Search" size={16} className="text-foreground/50" />
              <input
                autoFocus
                type="text"
                placeholder="Поиск книг, авторов, жанров..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)}>
                <Icon name="X" size={14} className="text-foreground/50 hover:text-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal scroll sections */}
      <div
        ref={scrollContainerRef}
        data-scroll-container
        className="flex h-screen w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* HERO SECTION */}
        <section className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-24 md:px-12 md:pt-0 lg:px-16">
          <div
            className={`mx-auto w-full max-w-7xl transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-xs tracking-[0.25em] uppercase text-foreground/50">
                Пространство осознанного чтения
              </p>
              <h1 className="mb-6 font-serif text-5xl font-light leading-[1.08] tracking-tight text-foreground md:text-7xl lg:text-8xl">
                Книги,
                <br />
                которые
                <br />
                <span className="italic text-foreground/40">меняют</span>
              </h1>
              <p className="mb-10 max-w-lg text-base leading-relaxed text-foreground/70 md:text-lg">
                Мы собираем только то, что стоит вашего времени — литература, которая открывает новые горизонты мышления, чувства и понимания мира.
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

            {/* Floating book stats */}
            <div
              className={`mt-12 flex gap-8 md:mt-16 md:gap-16 transition-all duration-1000 delay-300 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {[
                { value: "4 200+", label: "книг в каталоге" },
                { value: "320", label: "новинок в месяц" },
                { value: "12", label: "жанров и категорий" },
              ].map((s) => (
                <div key={s.label} className="border-l border-foreground/20 pl-4">
                  <div className="font-serif text-2xl font-light text-foreground md:text-3xl">{s.value}</div>
                  <div className="font-mono text-xs text-foreground/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATALOG SECTION */}
        <CatalogSection scrollToSection={scrollToSection} />

        {/* MOODS SECTION */}
        <MoodsSection scrollToSection={scrollToSection} />

        {/* ABOUT SECTION */}
        <AboutSection scrollToSection={scrollToSection} />

        {/* CONTACT SECTION */}
        <ContactSection />
      </div>

      {/* Section dots */}
      <div
        className={`fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {navItems.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSection === index
                ? "w-6 h-1.5 bg-foreground"
                : "w-1.5 h-1.5 bg-foreground/30 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>

      {/* Cart icon */}
      <button className="fixed bottom-8 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-sm bg-foreground/10 backdrop-blur-md border border-foreground/15 transition-all hover:bg-foreground/20 md:right-12">
        <Icon name="ShoppingBag" size={16} />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground font-medium">0</span>
      </button>
    </main>
  )
}
