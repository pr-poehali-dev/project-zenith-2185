const STEPS = [
  {
    num: "01",
    title: "Выбираете букет",
    desc: "Из готовых подборок или составляете сами — мы поможем разобраться с поводом и предпочтениями.",
    icon: "🌷",
  },
  {
    num: "02",
    title: "Мы собираем",
    desc: "Флорист собирает свежую композицию в день доставки — никаких заготовок со вчера.",
    icon: "✂️",
  },
  {
    num: "03",
    title: "Доставляем бережно",
    desc: "Курьер доставит в нужное время. Упаковка сохраняет форму и свежесть цветов.",
    icon: "🚚",
  },
  {
    num: "04",
    title: "Прикладываем открытку",
    desc: "Напишите текст при оформлении — мы аккуратно оформим открытку от руки.",
    icon: "💌",
  },
];

export function HowWeWorkSection() {
  return (
    <section id="delivery" className="section-padding bg-background">
      <div className="container-wide">
        <div className="mb-14">
          <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">Процесс</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Как мы работаем
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col gap-4 relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%+0px)] w-full h-px bg-border" style={{ width: "calc(100% - 2.5rem)", left: "calc(2.5rem)" }} />
              )}
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl">
                {step.icon}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground font-mono">{step.num}</span>
                <h3 className="font-display text-xl font-medium text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery info */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Доставка по Москве", value: "от 350 ₽ · 2–4 часа" },
            { label: "Самовывоз", value: "Бесплатно · ул. Пречистенка, 12" },
            { label: "Экспресс-доставка", value: "от 600 ₽ · 1–2 часа" },
          ].map((d) => (
            <div key={d.label} className="bg-secondary/50 rounded-lg px-5 py-4 flex flex-col gap-1">
              <span className="text-xs text-muted-foreground tracking-wide">{d.label}</span>
              <span className="text-sm font-medium text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
