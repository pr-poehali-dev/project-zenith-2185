import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"
import { useState } from "react"

const categories = ["Все", "Психология", "Классика", "Нонфикшн", "Философия", "Поэзия"]

const books = [
  {
    number: "01",
    title: "Быть и иметь",
    author: "Эрих Фромм",
    category: "Психология",
    price: "890 ₽",
    oldPrice: "",
    tag: "Бестселлер",
    direction: "left",
  },
  {
    number: "02",
    title: "Путь к себе",
    author: "Ирвин Ялом",
    category: "Психология",
    price: "760 ₽",
    oldPrice: "",
    tag: "Новинка",
    direction: "right",
  },
  {
    number: "03",
    title: "Думай медленно... решай быстро",
    author: "Даниэль Канеман",
    category: "Нонфикшн",
    price: "1 120 ₽",
    oldPrice: "1 390 ₽",
    tag: "Выбор редакции",
    direction: "left",
  },
  {
    number: "04",
    title: "Сто лет одиночества",
    author: "Г. Г. Маркес",
    category: "Классика",
    price: "820 ₽",
    oldPrice: "",
    tag: "",
    direction: "right",
  },
  {
    number: "05",
    title: "Философские исследования",
    author: "Людвиг Витгенштейн",
    category: "Философия",
    price: "680 ₽",
    oldPrice: "",
    tag: "Редкость",
    direction: "left",
  },
  {
    number: "06",
    title: "Реквием",
    author: "Анна Ахматова",
    category: "Поэзия",
    price: "490 ₽",
    oldPrice: "590 ₽",
    tag: "",
    direction: "right",
  },
]

export function CatalogSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)
  const [activeCategory, setActiveCategory] = useState("Все")

  const filtered = activeCategory === "Все" ? books : books.filter((b) => b.category === activeCategory)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-6 pt-20 md:px-12 md:pt-0 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className={`mb-5 flex flex-col gap-3 transition-all duration-700 md:flex-row md:items-end md:justify-between ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
          <div>
            <h2 className="mb-1 font-serif text-5xl font-light tracking-tight text-foreground md:text-6xl">Каталог</h2>
            <p className="font-mono text-sm text-foreground/45">/ Избранные книги</p>
          </div>
          <MagneticButton variant="secondary" size="sm" onClick={() => scrollToSection?.(1)}>
            Все книги →
          </MagneticButton>
        </div>

        {/* Categories */}
        <div className={`mb-5 flex flex-wrap gap-2 transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-sm border px-3 py-1 font-mono text-xs transition-all ${activeCategory === cat ? "border-foreground/40 bg-foreground/8 text-foreground" : "border-foreground/15 text-foreground/45 hover:border-foreground/30 hover:text-foreground/70"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Book list */}
        <div className="space-y-0">
          {filtered.slice(0, 5).map((book, i) => (
            <BookRow key={book.number} book={book} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BookRow({ book, index, isVisible }: { book: typeof books[0]; index: number; isVisible: boolean }) {
  const revealClass = !isVisible
    ? book.direction === "left" ? "-translate-x-12 opacity-0" : "translate-x-12 opacity-0"
    : "translate-x-0 opacity-100"

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-3.5 transition-all duration-600 hover:border-foreground/25 md:py-4 ${revealClass}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-4 md:gap-7">
        <span className="hidden w-6 font-mono text-xs text-foreground/25 md:block">{book.number}</span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-lg font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
              {book.title}
            </h3>
            {book.tag && (
              <span className="rounded-sm border border-accent/35 px-1.5 py-0.5 font-mono text-[9px] text-accent/70">
                {book.tag}
              </span>
            )}
          </div>
          <p className="font-sans text-[13px] text-foreground/45">
            {book.author}
            <span className="mx-1.5 opacity-40">·</span>
            <span className="text-foreground/30">{book.category}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        <div className="text-right">
          <div className="font-serif text-base text-foreground">{book.price}</div>
          {book.oldPrice && <div className="font-mono text-[11px] text-foreground/30 line-through">{book.oldPrice}</div>}
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-sm border border-foreground/15 text-foreground/50 opacity-0 transition-all group-hover:opacity-100 hover:border-accent/50 hover:text-accent">
          <Icon name="Plus" size={13} />
        </button>
      </div>
    </div>
  )
}
