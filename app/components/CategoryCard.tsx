import Link from "next/link";
import {
  Beef,
  IceCreamCone,
  CupSoda,
  Flame,
} from "lucide-react";

type Props = {
  titulo: string;
  emoji: string;
  href: string;
};

export default function CategoryCard({
  titulo,
  href,
}: Props) {

  function Icon() {
    switch (titulo) {
      case "Hambúrgueres":
        return <Beef size={32} />;

      case "Sorvetes":
        return <IceCreamCone size={32} />;

      case "Bebidas":
        return <CupSoda size={32} />;

      default:
        return <Flame size={32} />;
    }
  }

  return (
    <Link
      href={href}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition"
    >
      <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-lg">
        <Icon />
      </div>

      <h3 className="mt-4 font-bold text-center">
        {titulo}
      </h3>
    </Link>
  );
}