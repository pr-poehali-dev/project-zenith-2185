import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 pt-20 md:px-12 md:pt-0 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">

          {/* Left — story */}
          <div>
            <div className={`mb-7 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
              <h2 className="mb-2 font-serif text-4xl font-light leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                О магазине
                <br />
                <em className="not-italic text-foreground/35">и нашей идее</em>
              </h2>
            </div>

            <div
              className={`space-y-4 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "180ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">
                «Смысл в Строках» — пространство для тех, кто читает вдумчиво: не для галочки, а ради подлинного понимания себя и мира вокруг.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">
                Каждая книга в нашем каталоге отобрана вручную редакторами и кураторами — мы читаем, обсуждаем и выбираем только то, что действительно стоит вашего времени.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/55">
                Подарочная упаковка · Доставка по всей России · Книжный клуб по средам
              </p>
            </div>

            <div
              className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: "360ms" }}
            >
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(5)}>
                Написать нам
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)}>
                В каталог
              </MagneticButton>
            </div>
          </div>

          {/* Right — stats */}
          <div className="flex flex-col justify-center space-y-7 md:space-y-9">
            {[
              { value: "2016", label: "Год основания", sublabel: "Начинали с 200 книг на полках", direction: "right" },
              { value: "4 200+", label: "Наименований", sublabel: "В постоянном каталоге", direction: "left" },
              { value: "98%", label: "Довольных читателей", sublabel: "По оценкам покупателей", direction: "right" },
              { value: "12", label: "Жанров и подборок", sublabel: "Для любого настроения", direction: "left" },
            ].map((stat, i) => {
              const revealClass = !isVisible
                ? stat.direction === "left" ? "-translate-x-14 opacity-0" : "translate-x-14 opacity-0"
                : "translate-x-0 opacity-100"

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-5 border-l-2 border-accent/25 pl-5 transition-all duration-700 md:gap-7 ${revealClass}`}
                  style={{
                    transitionDelay: `${300 + i * 120}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "88%",
                  }}
                >
                  <div className="font-serif text-3xl font-light text-foreground md:text-4xl lg:text-5xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-sm font-medium text-foreground md:text-base">{stat.label}</div>
                    <div className="font-mono text-[11px] text-foreground/40">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
