import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const moods = [
  {
    emoji: "🌿",
    title: "Для тишины",
    description: "Книги, с которыми хочется замедлиться. Неспешная проза, медитативные эссе, поэзия.",
    count: "48 книг",
    direction: "top",
  },
  {
    emoji: "🔥",
    title: "Изменить взгляд",
    description: "Нонфикшн и философия, которые переворачивают привычные представления о жизни.",
    count: "63 книги",
    direction: "right",
  },
  {
    emoji: "🌙",
    title: "На одну ночь",
    description: "Захватывающие романы — невозможно остановиться, пока не перевернёшь последнюю страницу.",
    count: "71 книга",
    direction: "left",
  },
  {
    emoji: "🌱",
    title: "Расти и развиваться",
    description: "Психология, нейронаука и саморазвитие без мотивационных клише.",
    count: "55 книг",
    direction: "bottom",
  },
]

export function MoodsSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-serif text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            По настроению
          </h2>
          <p className="font-mono text-sm text-foreground/50">/ Найди свою книгу</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-8 lg:gap-x-24">
          {moods.map((mood, i) => (
            <MoodCard key={i} mood={mood} index={i} isVisible={isVisible} scrollToSection={scrollToSection} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MoodCard({
  mood,
  index,
  isVisible,
  scrollToSection,
}: {
  mood: typeof moods[0]
  index: number
  isVisible: boolean
  scrollToSection?: (index: number) => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (mood.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/25 transition-all duration-300 group-hover:w-12 group-hover:bg-accent/60" />
        <span className="text-base">{mood.emoji}</span>
        <span className="font-mono text-xs text-foreground/45">{mood.count}</span>
      </div>
      <h3 className="mb-2 font-serif text-2xl font-light text-foreground md:text-3xl">{mood.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/65 md:text-base">{mood.description}</p>
      <button
        onClick={() => scrollToSection?.(1)}
        className="mt-3 font-mono text-xs text-accent/70 underline-offset-4 hover:text-accent hover:underline transition-colors"
      >
        Смотреть подборку →
      </button>
    </div>
  )
}
