export default function DeliveryBar() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 mx-6 mt-6 flex justify-between items-center">
      <div>
        <p className="text-xs text-zinc-400">
          Entregar em
        </p>

        <h2 className="font-bold">
          Praça Dr. Miguel Rosa, 82
        </h2>
      </div>

      <button className="text-yellow-400 font-bold">
        Alterar
      </button>
    </div>
  );
}