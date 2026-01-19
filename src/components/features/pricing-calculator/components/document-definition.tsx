import { Info } from "lucide-react";

export const DocumentDefinition = () => {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden font-sans">
      {/* Header - Compact */}
      <div className="bg-slate-50 flex gap-3 px-4 py-3 border-b border-gray-100">
        <Info />
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          Definicja Dokumentu
        </h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <section>
            <h3 className="text-[11px] font-bold text-blue-600 uppercase mb-1.5 tracking-wider">
              Handlowe
            </h3>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Faktury (ZAK/SPR)</li>
              <li>• Noty księgowe</li>
              <li>• Polisy i kompensaty</li>
              <li>• Dok. magazynowe</li>
            </ul>
          </section>

          <section>
            <h3 className="text-[11px] font-bold text-blue-600 uppercase mb-1.5 tracking-wider">
              PK / Płace
            </h3>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Listy płac / Umowy</li>
              <li>• Deklaracje ZUS</li>
              <li>• Amortyzacja i RMK</li>
              <li>• Dowody wewnętrzne</li>
            </ul>
          </section>

          <section className="col-span-2 bg-gray-50 p-3 rounded-md border border-gray-100">
            <h3 className="text-[11px] font-bold text-gray-600 uppercase mb-2">
              Wyciągi i Raporty
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">
                  Bank / Kasa (operacje)
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold italic">
                  co 10 = 1 dok.
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">
                  Wyciąg rachunku VAT
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold italic">
                  zawsze 1 dok.
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-[10px] leading-relaxed text-gray-400 italic border-t pt-2">
          Pozostałe polecenia księgowania, w tym różnice kursowe, traktowane są
          jako odrębne pozycje rozliczeniowe.
        </div>
      </div>
    </div>
  );
};
