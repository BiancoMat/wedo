import { useState } from "react";

const defaultUser = {
  username: "Bianco",
  crediti: 5,
  favoriFatti: ["Portare un pacco"],
  favoriRicevuti: ["Riparazione PC"],
  richieste: [
    { titolo: "Traduzione inglese", stato: "in attesa" }
  ]
};

const favoriPubblici = [
  { id: 1, tipo: "richiesta", titolo: "Aiuto con trasloco", descrizione: "Spostare scatoloni", posizione: "Milano" },
  { id: 2, tipo: "offerta", titolo: "Lezione di chitarra", descrizione: "Online, 30 min", posizione: "Remoto" }
];

export default function App() {
  const [page, setPage] = useState("profilo");
  const [user] = useState(defaultUser);
  const [favori, setFavori] = useState(favoriPubblici);
  const [formData, setFormData] = useState({ tipo: "richiesta", titolo: "", descrizione: "", posizione: "" });

  const handleSubmit = () => {
    setFavori([...favori, { id: Date.now(), ...formData }]);
    if (formData.tipo === "richiesta") {
      user.richieste.push({ titolo: formData.titolo, stato: "in attesa" });
    }
    setFormData({ tipo: "richiesta", titolo: "", descrizione: "", posizione: "" });
    alert("Favorito registrato!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="bg-black text-white text-center p-4 font-bold text-xl">WeDo Beta</nav>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-4 space-x-4">
          <button onClick={() => setPage("profilo")} className="bg-blue-500 px-4 py-2 rounded text-white">Profilo</button>
          <button onClick={() => setPage("favori")} className="bg-green-600 px-4 py-2 rounded text-white">Favori</button>
        </div>

        {page === "profilo" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Profilo di {user.username}</h2>
            <p>Crediti disponibili: {user.crediti}</p>

            <div className="mt-4">
              <h3 className="font-bold">Favori fatti:</h3>
              <ul className="list-disc list-inside">{user.favoriFatti.map((f, i) => <li key={i}>{f}</li>)}</ul>

              <h3 className="font-bold mt-4">Favori ricevuti:</h3>
              <ul className="list-disc list-inside">{user.favoriRicevuti.map((f, i) => <li key={i}>{f}</li>)}</ul>

              <h3 className="font-bold mt-4">Richieste attive:</h3>
              <ul className="list-disc list-inside">{user.richieste.map((r, i) => <li key={i}>{r.titolo} – {r.stato}</li>)}</ul>
            </div>
          </div>
        )}

        {page === "favori" && (
          <div>
            <div className="space-x-2 mb-4">
              <button onClick={() => setPage("ricerca")} className="px-3 py-1 bg-gray-200 rounded">Ricerca</button>
              <button onClick={() => setPage("richiedi")} className="px-3 py-1 bg-gray-200 rounded">Richiedi</button>
              <button onClick={() => setPage("proponi")} className="px-3 py-1 bg-gray-200 rounded">Proponi</button>
            </div>
          </div>
        )}

        {page === "ricerca" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Favori disponibili</h2>
            <ul className="space-y-2">
              {favori.map(f => (
                <li key={f.id} className="border p-4 rounded shadow-sm">
                  <span className="text-sm uppercase text-gray-600">{f.tipo}</span><br />
                  <strong>{f.titolo}</strong> – {f.descrizione}<br />
                  <span className="text-sm">📍 {f.posizione}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(page === "richiedi" || page === "proponi") && (
          <div>
            <h2 className="text-xl font-bold mb-4">{page === "richiedi" ? "Richiedi un favore" : "Proponi un favore"}</h2>
            <div className="space-y-2">
              <input type="text" placeholder="Titolo" value={formData.titolo} onChange={e => setFormData({ ...formData, titolo: e.target.value })} className="w-full border p-2 rounded" />
              <textarea placeholder="Descrizione" value={formData.descrizione} onChange={e => setFormData({ ...formData, descrizione: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Posizione (Remoto o luogo)" value={formData.posizione} onChange={e => setFormData({ ...formData, posizione: e.target.value })} className="w-full border p-2 rounded" />
              <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">Pubblica favore</button>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-sm text-gray-500 p-4">© WeDo 2025</footer>
    </div>
  );
}