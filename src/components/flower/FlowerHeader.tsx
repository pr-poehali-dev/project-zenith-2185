import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Каталог", href: "#catalog" },
  { label: "Готовые букеты", href: "#products" },
  { label: "Повод", href: "#occasions" },
  { label: "О нас", href: "#about" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакты", href: "#contacts" },
];

export function FlowerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-wide flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <img
            src="https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/bucket/4dd3986f-e7c3-4af7-96f8-5efc048817a8.png"
            alt="Смысл в Цветах"
            className="h-9 w-auto object-contain"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[17px] font-medium text-foreground tracking-tight">
              Смысл в Цветах
            </span>
            <span className="text-[10px] text-muted-foreground tracking-[0.18em] uppercase mt-0.5">
              Пространство осознанных букетов
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors p-2">
            <Icon name="Search" size={16} />
          </button>

          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ShoppingBag" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="#contacts"
            className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Заказать букет
          </a>

          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-foreground py-1.5 border-b border-border/50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacts"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex justify-center items-center bg-primary text-primary-foreground text-sm px-4 py-2.5 rounded"
          >
            Заказать букет
          </a>
        </div>
      )}
    </header>
  );
}
