function toggleForms() {
  document.getElementById("loginFormDiv").classList.toggle("hidden");
  document.getElementById("registerFormDiv").classList.toggle("hidden");
}

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Login exitoso");
      window.location.href = "index.html";
    } else {
      alert("⚠️ " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error al iniciar sesión");
  }
});

// Registro
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Usuario registrado con éxito");
      toggleForms(); // Volver al login automáticamente
    } else {
      alert("⚠️ " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error al registrar");
  }
});
