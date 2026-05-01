import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.25)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 6000)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 pt-20 md:px-12 md:pt-0 lg:px-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className={`mb-6 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}>
          <h2 className="mb-1 font-serif text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Контакты
          </h2>
          <p className="font-mono text-sm text-foreground/45">/ Мы читаем каждое письмо</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">

          {/* ── COL 1: Contacts ── */}
          <div className={`flex flex-col gap-5 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`} style={{ transitionDelay: "100ms" }}>
            <ContactItem icon="Mail" label="Email" delay={150} isVisible={isVisible}>
              <a href="mailto:hello@smysl-v-strokah.ru" className="text-sm text-foreground transition-colors hover:text-accent md:text-base">
                hello@smysl-v-strokah.ru
              </a>
            </ContactItem>

            <ContactItem icon="Phone" label="Телефон" delay={220} isVisible={isVisible}>
              <a href="tel:+74951234567" className="text-sm text-foreground transition-colors hover:text-accent md:text-base">
                +7 (495) 123-45-67
              </a>
            </ContactItem>

            <ContactItem icon="MapPin" label="Адрес" delay={290} isVisible={isVisible}>
              <p className="text-sm text-foreground md:text-base">Москва, ул. Арбат, 12</p>
              <p className="font-mono text-[11px] text-foreground/40">Пн–Вс, 10:00–21:00</p>
            </ContactItem>

            <ContactItem icon="Clock" label="Доставка" delay={360} isVisible={isVisible}>
              <p className="text-sm text-foreground/70">По Москве — 1–2 дня</p>
              <p className="text-sm text-foreground/70">По России — 3–7 дней</p>
            </ContactItem>

            <div className={`flex gap-3 pt-1 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "430ms" }}>
              {["Telegram", "VK", "Instagram"].map((s) => (
                <a key={s} href="#" className="border-b border-transparent font-mono text-xs text-foreground/45 transition-all hover:border-accent/50 hover:text-accent/80">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* ── COL 2: Map ── */}
          <div className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: "200ms" }}>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground/40">Мы на карте</p>
            <div className="relative overflow-hidden rounded-sm border border-foreground/12" style={{ height: "calc(100% - 28px)", minHeight: "240px" }}>
              <iframe
                title="Карта магазина"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.573%2C55.745%2C37.607%2C55.762&layer=mapnik&marker=55.7522%2C37.5900"
                className="h-full w-full"
                style={{ border: 0, filter: "sepia(0.35) contrast(0.9) brightness(1.05)" }}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-foreground/8" />
            </div>
          </div>

          {/* ── COL 3: Form ── */}
          <div className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`} style={{ transitionDelay: "300ms" }}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">Написать нам</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text", delay: 350 },
                { key: "email", label: "Email", placeholder: "your@email.com", type: "email", delay: 420 },
                { key: "phone", label: "Телефон (необязательно)", placeholder: "+7 (___) ___-__-__", type: "tel", delay: 490 },
              ].map((field) => (
                <div
                  key={field.key}
                  className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${field.delay}ms` }}
                >
                  <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-foreground/40">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required={field.key !== "phone"}
                    className="w-full border-b border-foreground/18 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/28 focus:border-accent/45 focus:outline-none transition-colors"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "560ms" }}>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-foreground/40">Сообщение</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/18 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/28 focus:border-accent/45 focus:outline-none transition-colors resize-none"
                  placeholder="Вопрос, пожелание или рекомендация книги..."
                />
              </div>

              <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "630ms" }}>
                <MagneticButton variant="primary" size="lg" className="w-full">
                  {isSubmitting ? "Отправляем..." : "Отправить сообщение"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-xs text-foreground/60">
                    ✓ Спасибо! Ответим в течение дня.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({
  icon,
  label,
  delay,
  isVisible,
  children,
}: {
  icon: string
  label: string
  delay: number
  isVisible: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <Icon name={icon as "Mail"} size={11} className="text-foreground/40" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">{label}</span>
      </div>
      {children}
    </div>
  )
}
