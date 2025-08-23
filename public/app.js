console.log("✅ app.js cargado correctamente");

const itemForm = document.getElementById("itemForm");
const itemsTable = document.getElementById("itemsTable");

// Crear item
itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });

  if (res.ok) {
    alert("Item agregado ✅");
    loadItems();
    itemForm.reset();
  } else {
    alert("Error al agregar item ❌");
  }
});

// Cargar items
async function loadItems() {
  const res = await fetch("/api/items");
  const data = await res.json();

  itemsTable.innerHTML = "";
  data.forEach((item) => {
    const row = `
  <tr>
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td>
      <button class="editBtn" onclick="editItem('${item._id}', '${item.name}', '${item.description}')">Editar</button>
      <button class="deleteBtn" onclick="deleteItem('${item._id}')">Eliminar</button>
    </td>
  </tr>`;

    itemsTable.innerHTML += row;
  });
}

async function deleteItem(id) {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Item eliminado ✅");
    loadItems();
  } else {
    alert("Error al eliminar ❌");
  }
}

// Cargar al inicio
loadItems();

async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
  // 👉 Después de cerrar sesión, vuelve al login
  window.location.href = "login.html";
}

let editingItemId = null; // 👈 Guardamos el ID del item que se edita

function editItem(id, name, description) {
  editingItemId = id;
  document.getElementById("editName").value = name;
  document.getElementById("editDescription").value = description;
  document.getElementById("editForm").style.display = "block";
}

async function updateItem() {
  const name = document.getElementById("editName").value;
  const description = document.getElementById("editDescription").value;

  const res = await fetch(`/api/items/${editingItemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });

  if (res.ok) {
    alert("Item actualizado ✅");
    document.getElementById("editForm").style.display = "none";
    loadItems();
  } else {
    alert("Error al actualizar ❌");
  }
}

function cancelEdit() {
  editingItemId = null;
  document.getElementById("editForm").style.display = "none";
}


