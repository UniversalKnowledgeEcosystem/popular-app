    import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 rounded-b-3xl p-6">

      <div className="flex items-center gap-4">

        <Image
          src="/logo.jpg"
          alt="Popular"
          width={70}
          height={70}
          className="rounded-full"
        />

        <div>

          <h1 className="text-2xl font-black text-white">
            Popular
          </h1>

          <p className="text-red-100">
            Hambúrgueria & Sorveteria
          </p>

        </div>

      </div>

    </header>
  );
}