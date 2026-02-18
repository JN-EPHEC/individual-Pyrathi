document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();

    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            addUser();
        });
    }
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchText = e.target.value;
            searchUsers(searchText);
        });
    }
    
   
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function fetchUsers() {
    try {
        const response = await fetch(`/api/users`);
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        
        const users = await response.json();
        displayUsers(users); 
    } catch (error) {
        console.error("Erreur fetch :", error);
    }
}


function displayUsers(users) {
    const listContainer = document.getElementById('user-list');
    if (!listContainer) return;

    listContainer.innerHTML = ''; 

    users.forEach(user => {
        const item = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><strong>${user.nom}</strong> ${user.prenom}</span>
                <span class="badge bg-secondary rounded-pill">ID: ${user.id}</span>
                <button class="btn btn-sm btn-primary me-2" onclick="updateUser(${user.id})">Modifier</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Supprimer</button>
            </li>
        `;
        listContainer.insertAdjacentHTML('beforeend', item);
    });
}


async function addUser() {
    const nomInput = document.getElementById('nom');
    const prenomInput = document.getElementById('prenom');

    const data = {
        nom: nomInput.value,
        prenom: prenomInput.value
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            nomInput.value = '';
            prenomInput.value = '';
            fetchUsers(); 
        } else {
            alert("Erreur lors de l'ajout de l'utilisateur");
        }
    } catch (error) {
        console.error("Erreur lors du POST :", error);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            });
        
        if (response.ok) {
            fetchUsers();
            
        } else {
            alert("Erreur lors de la suppression de l'utilisateur");
        }
    } catch (error) {
        console.error("Erreur lors du DELETE :", error);
    }
}

async function searchUsers(query) {
    if (query.length < 1) {
        fetchUsers(); 
        return;
    }

    try {
        const response = await fetch(`/api/users/search?q=${query}`);
        if (!response.ok) throw new Error("Erreur de recherche");
        
        const users = await response.json();
        displayUsers(users); 
    } catch (error) {
        console.error("Erreur de recherche :", error);
    }
}
async function updateUser(id) {
    const nouveauNom = prompt("Entrez le nouveau nom :");
    const nouveauPrenom = prompt("Entrez le nouveau prénom :");

    if (!nouveauNom || !nouveauPrenom) return;

    const data = { nom: nouveauNom, prenom: nouveauPrenom };

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Utilisateur mis à jour !");
            fetchUsers();
        } else {
            alert("Erreur lors de la mise à jour");
        }
    } catch (error) {
        console.error("Erreur lors du PUT :", error);
    }
}