export function FlowerHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-wide grid lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[88vh] py-16 lg:py-0">
        {/* Text */}
        <div className="flex flex-col gap-6 lg:pr-16">
          <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
            Цветочная мастерская · Москва
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.08]">
            Цветы,<br />
            <em className="not-italic text-primary">за которыми</em><br />
            стоят чувства
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Создаём букеты, в которых важны и цветы, и отношение.
            Каждая композиция — вдумчивый разговор о том, кому и почему.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#products"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Выбрать букет
            </a>
            <a
              href="#contacts"
              className="inline-flex items-center justify-center border border-border text-foreground px-7 py-3.5 rounded text-sm hover:bg-secondary transition-colors"
            >
              Собрать свой
            </a>
          </div>

          <div className="flex gap-8 pt-4 border-t border-border mt-2">
            {[
              { num: "1200+", label: "собранных букетов" },
              { num: "4 года", label: "в цветочном деле" },
              { num: "2–4 ч", label: "доставка по Москве" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-medium text-foreground">{s.num}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[480px] lg:h-full lg:min-h-screen">
          <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-8">
            <img
              src="https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/791552e5-78a9-4dd6-8db9-8a61244276b7.jpg"
              alt="Букет пионов"
              className="w-full h-full object-cover rounded-lg lg:rounded-l-2xl lg:rounded-r-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-lg lg:rounded-l-2xl lg:rounded-r-none" />
          </div>

          {/* Floating badge */}
          <div className="absolute bottom-8 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-border">
            <p className="text-xs text-muted-foreground">Сегодня собираем</p>
            <p className="text-sm font-medium text-foreground mt-0.5">Пионы · Ранункулюсы · Эвкалипт</p>
          </div>
        </div>
      </div>
    </section>
  );
}
