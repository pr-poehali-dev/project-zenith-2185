export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <img
            src="https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/59f03223-5248-4919-bf67-aa15b8e92c06.jpg"
            alt="Наша мастерская"
            className="w-full aspect-[4/5] object-cover rounded-2xl"
          />
          <div className="absolute -bottom-5 -right-5 hidden lg:flex flex-col gap-1 bg-background rounded-xl px-5 py-4 shadow-sm border border-border">
            <span className="font-display text-3xl font-medium text-foreground">2020</span>
            <span className="text-xs text-muted-foreground">год основания мастерской</span>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-7">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">О нас</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1]">
              Цветочная мастерская<br />
              <em>с намерением</em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            <p>
              Мы верим, что цветы — это не просто жест, а способ сказать то, что словам иногда трудно.
              Поэтому мы собираем букеты вдумчиво: смотрим на повод, настроение, человека, для которого они предназначены.
            </p>
            <p>
              «Смысл в Цветах» — небольшая мастерская в центре Москвы. Мы работаем с сезонными цветами,
              предпочитаем природные формы и приглушённые оттенки. Никаких пластиковых упаковок, только крафт, лён и хлопок.
            </p>
            <p>
              Каждый букет собирается в день доставки — это принципиально. Свежесть важнее запаса.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { icon: "🌱", text: "Сезонные цветы из надёжных хозяйств" },
              { icon: "♻️", text: "Экологичная упаковка без пластика" },
              { icon: "✍️", text: "Рукописные открытки к каждому заказу" },
              { icon: "📍", text: "Работаем в Москве и ближнем Подмосковье" },
            ].map((f) => (
              <div key={f.text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="text-base mt-0.5 shrink-0">{f.icon}</span>
                <span className="leading-snug">{f.text}</span>
              </div>
            ))}
          </div>

          <a
            href="#contacts"
            className="self-start inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded text-sm hover:bg-primary/90 transition-colors"
          >
            Написать нам
          </a>
        </div>
      </div>
    </section>
  );
}
