import Icon from "@/components/ui/icon";

const FOOTER_LINKS = [
  {
    title: "Магазин",
    links: [
      { label: "Каталог", href: "#catalog" },
      { label: "Готовые букеты", href: "#products" },
      { label: "По поводу", href: "#occasions" },
      { label: "Собрать букет", href: "#contacts" },
    ],
  },
  {
    title: "Информация",
    links: [
      { label: "О нас", href: "#about" },
      { label: "Доставка и оплата", href: "#delivery" },
      { label: "Возврат", href: "#" },
      { label: "Политика конфиденциальности", href: "#" },
    ],
  },
];

export function FlowerFooter() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl font-medium text-background">Смысл в Цветах</span>
              <span className="text-xs tracking-[0.15em] uppercase text-background/40">
                Пространство осознанных букетов
              </span>
            </div>
            <p className="text-sm leading-relaxed text-background/60 max-w-xs">
              Цветочная мастерская в Москве. Собираем букеты вдумчиво — с вниманием к поводу и человеку.
            </p>
            <div className="flex gap-2 mt-1">
              {[
                { icon: "Instagram", label: "Instagram" },
                { icon: "MessageCircle", label: "Telegram" },
                { icon: "MessageSquare", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:text-background hover:border-background/50 transition-colors"
                >
                  <Icon name={s.icon as "MessageCircle"} size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-background/40">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-background/40">Контакты</h4>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+74951234567" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
                <Icon name="Phone" size={13} />
                +7 (495) 123-45-67
              </a>
              <a href="mailto:hello@smysl-v-tsvetah.ru" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
                <Icon name="Mail" size={13} />
                hello@smysl-v-tsvetah.ru
              </a>
              <div className="flex items-start gap-2 text-sm text-background/60">
                <Icon name="MapPin" size={13} className="mt-0.5 shrink-0" />
                <span>Москва, ул. Пречистенка, 12</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/60">
                <Icon name="Clock" size={13} />
                Пн–Вс, 9:00–21:00
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/35">© 2024 Смысл в Цветах. Все права защищены.</p>
          <p className="text-xs text-background/25">Москва и ближнее Подмосковье</p>
        </div>
      </div>
    </footer>
  );
}
