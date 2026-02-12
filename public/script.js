document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();

    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            addUser();
        });
    }
});


async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
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