import { useState } from "react";
import Icon from "@/components/ui/icon";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", occasion: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacts" className="section-padding bg-background">
      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact info */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-[1.1]">
              Давайте поговорим<br />о букете
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Расскажите нам о поводе, предпочтениях, бюджете — мы подберём что-то подходящее или поможем собрать с нуля.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
              { icon: "Mail", label: "Email", value: "hello@smysl-v-tsvetah.ru" },
              { icon: "MapPin", label: "Адрес", value: "Москва, ул. Пречистенка, 12" },
              { icon: "Clock", label: "Часы работы", value: "Пн–Вс, 9:00–21:00" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name={c.icon as "Phone"} size={15} className="text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">{c.label}</span>
                  <span className="text-sm text-foreground font-medium">{c.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {[
              { icon: "Instagram", label: "Instagram", href: "#" },
              { icon: "MessageCircle", label: "Telegram", href: "#" },
              { icon: "MessageSquare", label: "WhatsApp", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label={s.label}
              >
                <Icon name={s.icon as "MessageCircle"} size={16} />
              </a>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="rounded-xl overflow-hidden border border-border aspect-video mt-2">
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=37.598896%2C55.738740&z=15&pt=37.598896,55.738740,pm2rdl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-display text-2xl font-medium text-foreground">Оставить заявку</h3>
            <p className="text-sm text-muted-foreground mt-1">Ответим в течение часа в рабочее время.</p>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center bg-secondary/40 rounded-xl">
              <span className="text-4xl">🌸</span>
              <h4 className="font-display text-2xl font-medium text-foreground">Спасибо!</h4>
              <p className="text-muted-foreground text-sm max-w-xs">
                Мы получили вашу заявку и скоро напишем или позвоним.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", phone: "", occasion: "", message: "" }); }}
                className="text-sm text-accent hover:underline mt-2"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground">Ваше имя *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Как вас зовут?"
                    className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground">Телефон *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Повод</label>
                <select
                  value={form.occasion}
                  onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="">Выберите повод</option>
                  <option>День рождения</option>
                  <option>Свадьба</option>
                  <option>Для дома</option>
                  <option>Для неё</option>
                  <option>Для него</option>
                  <option>Благодарность</option>
                  <option>Свидание</option>
                  <option>Другое</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Пожелания или текст для открытки</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Расскажите о поводе, цветовых предпочтениях, бюджете или напишите текст для открытки..."
                  className="bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex flex-col gap-3 pt-1">
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="#" className="underline hover:text-foreground">политикой конфиденциальности</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
