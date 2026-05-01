import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">

          {/* Left — contacts */}
          <div className="flex flex-col justify-center">
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-serif text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Напишите
                <br />
                нам
              </h2>
              <p className="font-mono text-xs text-foreground/50">/ Мы читаем каждое письмо</p>
            </div>

            <div className="space-y-5 md:space-y-7">
              <a
                href="mailto:hello@smysl-v-strokah.ru"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon name="Mail" size={12} className="text-foreground/50" />
                  <span className="font-mono text-xs text-foreground/50">Email</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-accent md:text-xl">
                  hello@smysl-v-strokah.ru
                </p>
              </a>

              <a
                href="tel:+74951234567"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon name="Phone" size={12} className="text-foreground/50" />
                  <span className="font-mono text-xs text-foreground/50">Телефон</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-accent md:text-xl">
                  +7 (495) 123-45-67
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon name="MapPin" size={12} className="text-foreground/50" />
                  <span className="font-mono text-xs text-foreground/50">Адрес</span>
                </div>
                <p className="text-base text-foreground md:text-xl">Москва, ул. Арбат, 12</p>
                <p className="font-mono text-xs text-foreground/45">Пн–Вс, 10:00–21:00</p>
              </div>

              <div
                className={`flex gap-3 pt-2 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {["Telegram", "VK", "Instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-foreground/50 transition-all hover:border-accent/60 hover:text-accent/80"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {[
                { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
                { key: "email", label: "Email", placeholder: "your@email.com", type: "email" },
              ].map((field, i) => (
                <div
                  key={field.key}
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 150}ms` }}
                >
                  <label className="mb-1 block font-mono text-xs text-foreground/50">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                    className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none transition-colors md:text-base"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50">Сообщение</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/20 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none transition-colors md:text-base"
                  placeholder="Вопрос, пожелание или рекомендация..."
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                <MagneticButton variant="primary" size="lg" className="w-full disabled:opacity-50">
                  {isSubmitting ? "Отправляем..." : "Отправить"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-foreground/70">
                    Спасибо! Мы ответим в течение дня.
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
