const OCCASIONS = [
  {
    id: 1,
    title: "День рождения",
    phrase: "Чтобы человек почувствовал, что о нём думали",
    emoji: "🎂",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/69e91d4e-45ad-4902-a193-58456ff2ec79.jpg",
  },
  {
    id: 2,
    title: "Свадьба",
    phrase: "Букеты, которые запомнятся на фотографиях и в памяти",
    emoji: "🤍",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/3ff34b40-cd0a-4649-97c9-ecf124154b10.jpg",
  },
  {
    id: 3,
    title: "Для неё",
    phrase: "Нежные, живые, без лишних слов",
    emoji: "🌸",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/de04b345-d5d2-4ab7-84e8-e8618f8cbb52.jpg",
  },
  {
    id: 4,
    title: "Для него",
    phrase: "Лаконичные, сдержанные, с характером",
    emoji: "🌿",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/1894bbc2-8d8e-4bbd-916f-c2cca9f60a9d.jpg",
  },
  {
    id: 5,
    title: "Благодарность",
    phrase: "Когда слов недостаточно, но цветы скажут всё",
    emoji: "💛",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/ee16ba9c-2868-4408-9c98-eb8382fc29d3.jpg",
  },
  {
    id: 6,
    title: "Для дома",
    phrase: "Живая атмосфера, которая меняет пространство",
    emoji: "🏡",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/386d69f1-5398-451f-b8b8-5ec1e4ff2fbf.jpg",
  },
];

export function OccasionsSection() {
  return (
    <section id="occasions" className="section-padding bg-secondary/40">
      <div className="container-wide">
        <div className="mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">Повод</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            По какому случаю?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Расскажите нам о поводе — мы подберём цветы, которые будут уместны и запомнятся.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {OCCASIONS.map((o) => (
            <a
              key={o.id}
              href="#products"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
            >
              <img
                src={o.img}
                alt={o.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-lg mb-0.5">{o.emoji}</div>
                <h3 className="font-display text-xl font-medium leading-tight">{o.title}</h3>
                <p className="text-xs text-white/75 mt-1 leading-snug line-clamp-2">{o.phrase}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
