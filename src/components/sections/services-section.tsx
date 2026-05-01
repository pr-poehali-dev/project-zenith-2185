import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const moods = [
  {
    emoji: "🌿",
    title: "Для тишины",
    description: "Неспешная проза, медитативные эссе, поэзия — книги, с которыми хочется замедлиться и побыть наедине с собой.",
    count: "48 книг",
    direction: "top",
  },
  {
    emoji: "🔥",
    title: "Изменить взгляд",
    description: "Нонфикшн и философия, которые переворачивают привычные представления о жизни и заставляют думать иначе.",
    count: "63 книги",
    direction: "right",
  },
  {
    emoji: "🌙",
    title: "На одну ночь",
    description: "Захватывающие романы и детективы — невозможно остановиться, пока не перевернёшь последнюю страницу.",
    count: "71 книга",
    direction: "left",
  },
  {
    emoji: "🌱",
    title: "Расти и развиваться",
    description: "Психология, нейронаука и саморазвитие без мотивационных клише — только честные знания и реальные практики.",
    count: "55 книг",
    direction: "bottom",
  },
  {
    emoji: "🌍",
    title: "Другие голоса",
    description: "Литература со всего мира в переводах наших редакторов. Африка, Латинская Америка, Азия — неизведанные авторы.",
    count: "37 книг",
    direction: "top",
  },
  {
    emoji: "👶",
    title: "Детям с умом",
    description: "Книги для детей, которые развивают воображение и эмпатию. Отобраны педагогами и детскими психологами.",
    count: "92 книги",
    direction: "bottom",
  },
]

export function MoodsSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-6 pt-20 md:px-12 md:pt-0 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
          <h2 className="mb-1 font-serif text-5xl font-light tracking-tight text-foreground md:text-6xl">
            По настроению
          </h2>
          <p className="font-mono text-sm text-foreground/45">/ Найди свою книгу прямо сейчас</p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-14 md:gap-y-7">
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
  const revealClass = !isVisible
    ? mood.direction === "left" ? "-translate-x-12 opacity-0"
      : mood.direction === "right" ? "translate-x-12 opacity-0"
      : mood.direction === "top" ? "-translate-y-10 opacity-0"
      : "translate-y-10 opacity-0"
    : "translate-x-0 translate-y-0 opacity-100"

  return (
    <div
      className={`group transition-all duration-700 ${revealClass}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="mb-2 flex items-center gap-2.5">
        <div className="h-px w-6 bg-foreground/20 transition-all duration-300 group-hover:w-10 group-hover:bg-accent/50" />
        <span className="text-sm">{mood.emoji}</span>
        <span className="font-mono text-[10px] text-foreground/40">{mood.count}</span>
      </div>
      <h3 className="mb-1.5 font-serif text-xl font-light text-foreground md:text-2xl">{mood.title}</h3>
      <p className="mb-2 text-[13px] leading-relaxed text-foreground/55 md:text-sm">{mood.description}</p>
      <button
        onClick={() => scrollToSection?.(1)}
        className="font-mono text-[11px] text-accent/65 underline-offset-3 transition-colors hover:text-accent hover:underline"
      >
        Смотреть подборку →
      </button>
    </div>
  )
}
