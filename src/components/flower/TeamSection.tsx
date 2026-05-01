const TEAM = [
  {
    id: 1,
    name: "Анна Серова",
    role: "Старший флорист · основатель",
    bio: "Флористикой занимается 8 лет. Прошла обучение в Москве и Амстердаме. Любит объёмные садовые композиции и сухоцветы.",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/f8332a4d-b6da-431d-bc33-9233c2eae0d3.jpg",
  },
  {
    id: 2,
    name: "Мария Климова",
    role: "Флорист",
    bio: "Специализируется на свадебных букетах и эвент-оформлении. Ценит лаконичность и работает с нетипичными материалами.",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/cc6f8617-276d-4803-922a-63e64ea116f5.jpg",
  },
  {
    id: 3,
    name: "Алексей Борисов",
    role: "Флорист · декоратор",
    bio: "Пришёл в флористику из ландшафтного дизайна. Создаёт нестандартные пространственные композиции для интерьеров.",
    img: "https://cdn.poehali.dev/projects/8a534957-7167-4774-95d7-f107da00a0e4/files/8428ed50-f0fe-406b-b050-b73088a8560a.jpg",
  },
];

export function TeamSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-3">Команда</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Люди, которые собирают ваши букеты
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {TEAM.map((member) => (
            <div key={member.id} className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-secondary">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-1.5 px-1">
                <h3 className="font-display text-xl font-medium text-foreground">{member.name}</h3>
                <p className="text-xs text-accent font-medium tracking-wide">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
