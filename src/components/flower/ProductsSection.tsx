import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "Пионовое облако",
    desc: "Мягкий, пышный букет из пионов — для тех, кто ценит нежность. Подходит для дня рождения и свидания.",
    price: 4800,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/791552e5-78a9-4dd6-8db9-8a61244276b7.jpg",
    tag: "Хит",
  },
  {
    id: 2,
    name: "Весенняя акварель",
    desc: "Смешение ранункулюсов, фрезии и нежной зелени — букет, похожий на утро.",
    price: 3600,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/de04b345-d5d2-4ab7-84e8-e8618f8cbb52.jpg",
    tag: null,
  },
  {
    id: 3,
    name: "Белая свадьба",
    desc: "Классика в чистом виде: кремовые пионы, эвкалипт, белые розы. Для самого важного дня.",
    price: 7200,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/3ff34b40-cd0a-4649-97c9-ecf124154b10.jpg",
    tag: "Свадьба",
  },
  {
    id: 4,
    name: "Тёплая пампа",
    desc: "Сухоцветы с пампасной травой — долгая красота без воды и суеты.",
    price: 2900,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/1894bbc2-8d8e-4bbd-916f-c2cca9f60a9d.jpg",
    tag: null,
  },
  {
    id: 5,
    name: "Розовый сад",
    desc: "Букет из розовых роз разных оттенков — прямой и тёплый жест.",
    price: 3200,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/69e91d4e-45ad-4902-a193-58456ff2ec79.jpg",
    tag: null,
  },
  {
    id: 6,
    name: "Коробка с историей",
    desc: "Мини-сад в шляпной коробке — розы, гортензии, веточки эвкалипта.",
    price: 5400,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/2ca8ad54-736a-47a7-bbd4-30e3fa7d2dbc.jpg",
    tag: "Подарок",
  },
  {
    id: 7,
    name: "Тюльпанная монография",
    desc: "Один сорт, один цвет — монобукет из тюльпанов, который говорит за себя.",
    price: 2400,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/ee16ba9c-2868-4408-9c98-eb8382fc29d3.jpg",
    tag: null,
  },
  {
    id: 8,
    name: "Зелёный ритм",
    desc: "Комнатные растения в лаконичном горшке — для тех, кто хочет живое, но надолго.",
    price: 3100,
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/386d69f1-5398-451f-b8b8-5ec1e4ff2fbf.jpg",
    tag: null,
  },
];

function formatPrice(p: number) {
  return p.toLocaleString("ru-RU") + " ₽";
}

export function ProductsSection() {
  const [added, setAdded] = useState<number[]>([]);

  function handleAdd(id: number) {
    setAdded((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTimeout(() => setAdded((prev) => prev.filter((x) => x !== id)), 1800);
  }

  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">Букеты</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              Популярные букеты
            </h2>
          </div>
          <a href="#catalog" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors whitespace-nowrap">
            Весь каталог →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="group flex flex-col bg-background rounded-xl overflow-hidden">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-background/90 text-foreground text-[11px] px-2 py-1 rounded tracking-wide">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 p-4 flex-1">
                <h3 className="font-display text-lg font-medium text-foreground leading-tight">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-snug line-clamp-2 flex-1">{p.desc}</p>
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-border">
                  <span className="font-display text-xl font-medium text-foreground">{formatPrice(p.price)}</span>
                  <button
                    onClick={() => handleAdd(p.id)}
                    className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded transition-all ${
                      added.includes(p.id)
                        ? "bg-primary/10 text-primary"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    <Icon name={added.includes(p.id) ? "Check" : "ShoppingBag"} size={14} />
                    {added.includes(p.id) ? "Добавлено" : "В корзину"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
