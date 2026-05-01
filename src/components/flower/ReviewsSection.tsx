const REVIEWS = [
  {
    id: 1,
    name: "Елена К.",
    occasion: "День рождения",
    text: "Заказывала маме на 60-летие. Букет пришёл свежим, упаковка аккуратная, открытка с рукописным текстом — мама была растрогана. Спасибо, что отнеслись внимательно к пожеланиям.",
    stars: 5,
  },
  {
    id: 2,
    name: "Дмитрий В.",
    occasion: "Свидание",
    text: "Первый раз заказывал онлайн. Описал, что хочу что-то «нежное, но не приторное». Получилось именно так. Девушка была в восторге. Буду заказывать снова.",
    stars: 5,
  },
  {
    id: 3,
    name: "Ольга М.",
    occasion: "Для дома",
    text: "Взяла коробку с пионами и эвкалиптом. Стоят уже 10 дней, ещё живые. Атмосфера в доме совсем другая. Очень нравится, что здесь нет той дешёвой яркости, которая обычно в цветочных.",
    stars: 5,
  },
  {
    id: 4,
    name: "Михаил Р.",
    occasion: "Благодарность коллеге",
    text: "Нужен был нейтральный, красивый букет — не слишком романтичный, но тёплый. Флорист сразу понял. Доставка точно в срок.",
    stars: 5,
  },
];

export function ReviewsSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">Отзывы</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Что говорят клиенты
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className="bg-background rounded-xl px-6 py-5 flex flex-col gap-3"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">«{r.text}»</p>
              <div className="flex items-center gap-2 mt-1 pt-3 border-t border-border">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
