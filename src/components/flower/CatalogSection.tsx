const CATEGORIES = [
  {
    id: 1,
    title: "Готовые букеты",
    desc: "Собраны флористом — берёте и дарите",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/de04b345-d5d2-4ab7-84e8-e8618f8cbb52.jpg",
  },
  {
    id: 2,
    title: "Монобукеты",
    desc: "Один цветок во множестве — минимализм в лучшем смысле",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/ee16ba9c-2868-4408-9c98-eb8382fc29d3.jpg",
  },
  {
    id: 3,
    title: "Композиции в коробках",
    desc: "Цветочный подарок в фирменной упаковке",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/2ca8ad54-736a-47a7-bbd4-30e3fa7d2dbc.jpg",
  },
  {
    id: 4,
    title: "Комнатные растения",
    desc: "Зелень, которая живёт долго и меняет пространство",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/386d69f1-5398-451f-b8b8-5ec1e4ff2fbf.jpg",
  },
  {
    id: 5,
    title: "Сухоцветы",
    desc: "Спокойная красота — не вянут, остаются надолго",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/1894bbc2-8d8e-4bbd-916f-c2cca9f60a9d.jpg",
  },
  {
    id: 6,
    title: "Мини-букеты",
    desc: "Небольшие, но ёмкие — когда важен жест",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/69e91d4e-45ad-4902-a193-58456ff2ec79.jpg",
  },
];

export function CatalogSection() {
  return (
    <section id="catalog" className="section-padding bg-background">
      <div className="container-wide">
        <div className="mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">Каталог</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Что мы делаем
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href="#products"
              className="group flex flex-col gap-3 hover:opacity-90 transition-opacity"
            >
              <div className="overflow-hidden rounded-lg aspect-[4/3] bg-secondary">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl font-medium text-foreground leading-tight">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-snug">{cat.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
