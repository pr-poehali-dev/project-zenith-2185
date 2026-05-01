import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const books = [
  {
    number: "01",
    title: "Быть и иметь",
    author: "Эрих Фромм",
    category: "Психология · Философия",
    price: "890 ₽",
    tag: "Бестселлер",
    direction: "left",
  },
  {
    number: "02",
    title: "Путь к себе",
    author: "Ирвин Ялом",
    category: "Психотерапия · Проза",
    price: "760 ₽",
    tag: "Новинка",
    direction: "right",
  },
  {
    number: "03",
    title: "Думай медленно... решай быстро",
    author: "Даниэль Канеман",
    category: "Нейронаука · Поведение",
    price: "1 120 ₽",
    tag: "Выбор редакции",
    direction: "left",
  },
  {
    number: "04",
    title: "Сто лет одиночества",
    author: "Габриэль Гарсиа Маркес",
    category: "Классика · Магический реализм",
    price: "820 ₽",
    tag: "",
    direction: "right",
  },
]

export function CatalogSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 flex items-end justify-between transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-1 font-serif text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Каталог
            </h2>
            <p className="font-mono text-sm text-foreground/50">/ Избранные книги</p>
          </div>
          <MagneticButton variant="secondary" size="sm" onClick={() => scrollToSection?.(1)}>
            Все книги
          </MagneticButton>
        </div>

        <div className="space-y-2 md:space-y-3">
          {books.map((book, i) => (
            <BookRow key={i} book={book} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BookRow({
  book,
  index,
  isVisible,
}: {
  book: typeof books[0]
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return book.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/25 md:py-5 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4 md:gap-8">
        <span className="hidden font-mono text-sm text-foreground/25 md:block">{book.number}</span>
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-xl font-light text-foreground transition-all duration-300 group-hover:translate-x-1 md:text-2xl">
              {book.title}
            </h3>
            {book.tag && (
              <span className="hidden rounded-sm border border-accent/40 px-2 py-0.5 font-mono text-[10px] text-accent/80 md:inline">
                {book.tag}
              </span>
            )}
          </div>
          <p className="font-sans text-sm text-foreground/50">
            {book.author} · <span className="text-foreground/35">{book.category}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <span className="font-serif text-base text-foreground md:text-lg">{book.price}</span>
        <button className="flex h-8 w-8 items-center justify-center rounded-sm border border-foreground/20 text-foreground/60 opacity-0 transition-all group-hover:opacity-100 hover:border-foreground/40 hover:text-foreground">
          <Icon name="Plus" size={14} />
        </button>
      </div>
    </div>
  )
}
