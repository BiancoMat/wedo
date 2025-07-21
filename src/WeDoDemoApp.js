
// WeDo Beta 0.1 – Sito semplificato con crediti e favori (con ricerca, profili pubblici e utente admin)

import { useState } from "react";

const fakeUsers = [
  { id: 1, name: "Luca", crediti: 3, favoriFatti: ["Aiuto con la spesa"], favoriRicevuti: ["Passaggio in macchina"], isAdmin: false },
  { id: 2, name: "Marta", crediti: 7, favoriFatti: ["Sedia da campeggio"], favoriRicevuti: ["Aiuto con la spesa"], isAdmin: false },
  { id: 3, name: "Ali", crediti: 0, favoriFatti: ["Libro di poesie"], favoriRicevuti: [], isAdmin: false },
  { id: 99, name: "Admin", crediti: Infinity, favoriFatti: ["Test Favori"], favoriRicevuti: [], isAdmin: true },
];

const fakeFavori = [
  { id: 1, from: "Marta", to: "Chiunque", descrizione: "Aiuto con la spesa" },
  { id: 2, from: "Luca", to: "Chiunque", descrizione: "Passaggio in macchina" },
  { id: 3, from: "Ali", to: "Chiunque", descrizione: "Spiegazione matematica" },
  { id: 4, from: "Admin", to: "Chiunque", descrizione: "Esempio admin" },
];

function Home({ onNavigate }) {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold">🌱 Benvenuto su WeDo</h1>
      <p className="text-lg">La piattaforma per scambiare favori tramite crediti. Versione Beta 0.1</p>
      <div className="space-x-4">
        <button onClick={() => onNavigate("users")} className="px-4 py-2 bg-black text-white rounded-xl">Profili</button>
        <button onClick={() => onNavigate("favori")} className="px-4 py-2 bg-green-700 text-white rounded-xl">Cerca Favori</button>
      </div>
    </div>
  );
}

function Profili() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Profili pubblici</h2>
      <ul className="space-y-4">
        {fakeUsers.map((u) => (
          <li key={u.id} className="border p-4 rounded-xl shadow-md">
            <strong className="text-lg">{u.name}</strong> {u.isAdmin && <span className="text-xs text-white bg-black px-2 py-1 rounded ml-2">Admin</span>}<br />
            <span className="text-sm text-gray-700">Crediti: {u.crediti === Infinity ? "∞" : u.crediti}</span>
            <div className="mt-2">
              <p className="text-sm font-bold">Favori fatti:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {u.favoriFatti.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <p className="text-sm font-bold mt-2">Favori ricevuti:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {u.favoriRicevuti.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Favori() {
  const [query, setQuery] = useState("");
  const favoriFiltrati = fakeFavori.filter(f => f.descrizione.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Cerca favori pubblici</h2>
      <input
        type="text"
        placeholder="Es. spesa, macchina..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4 rounded-xl"
      />
      <ul className="space-y-2">
        {favoriFiltrati.map((f) => (
          <li key={f.id} className="border p-4 rounded-xl shadow-sm">
            {f.from} → {f.to}: {f.descrizione}
          </li>
        ))}
        {favoriFiltrati.length === 0 && <p className="text-gray-500">Nessun favore trovato.</p>}
      </ul>
    </div>
  );
}

export default function WeDoDemoApp() {
  const [page, setPage] = useState("home");

  return (
    <div className="font-sans bg-white min-h-screen">
      <nav className="bg-black text-white p-4 text-center font-bold">WeDo Beta 0.1</nav>
      {page === "home" && <Home onNavigate={setPage} />}
      {page === "users" && <Profili />}
      {page === "favori" && <Favori />}
      <footer className="text-center p-6 text-sm text-gray-500">© WeDo 2025 – Tutto è finto, ma il sogno è reale.</footer>
    </div>
  );
}
