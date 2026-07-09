type Props = {
  titulo: string;
  emoji: string;
  href: string;
};

export default function CategoryCard({
  titulo,
  emoji,
  href,
}: Props) {
  return (
    <a
      href={href}
      className="bg-zinc-900 rounded-3xl p-6 text-center hover:bg-zinc-800 transition active:scale-95"
    >
      <div className="text-4xl">{emoji}</div>
      <h3 className="mt-3 font-bold text-white">{titulo}</h3>
    </a>
  );
}