import { useEffect, useState } from "react";
import "./App.css";

// Définition de l'interface TypeScript pour ton modèle
interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  // État pour stocker les utilisateurs récupérés du backend
  const [users, setUsers] = useState<User[]>([]);

  // Hook pour déclencher l'appel API au montage du composant
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
      })
      .catch((err) => console.error("Erreur lors du fetch :", err));
  }, []); // [] assure que l'appel ne se fait qu'une seule fois

  return (
    <div className="container">
      <header>
        <h1>Gestion des Utilisateurs</h1>
        <p>Interface de récupération des données Backend</p>
      </header>

      <main>
        <section className="user-list">
          <h2>Liste des membres</h2>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user.id} className="user-card">
                  <span className="user-info">
                    <strong>{user.nom.toUpperCase()}</strong> {user.prenom}
                  </span>
                  <span className="user-id"># {user.id}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-msg">Aucun utilisateur trouvé dans la base de données.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;