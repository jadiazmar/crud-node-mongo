const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const session = require("express-session"); // 👈 importa aquí solo una vez

const config = require("./config/config.json");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Inicializar app
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 📌 Middleware de sesiones
app.use(session({
  secret: "mi_clave_secreta_super_segura", // 🔑 cámbialo por algo más fuerte
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // ⚠️ usa true si tu app va con HTTPS
}));

// 📌 Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API con Node + Mongo",
      version: "1.0.0",
      description: "Documentación de la API CRUD con Express y MongoDB",
    },
    servers: [
      { url: config.api.baseUrl },
    ],
  },
  apis: ["./routes/*.js"], // 👈 Aquí Swagger buscará comentarios en tus rutas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Conexión a MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error en MongoDB:", err));

// Importar rutas
const authRoutes = require("./routes/authRoutes"); 
const itemRoutes = require("./routes/itemRoutes");

// Usar rutas
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en ${config.api.baseUrl}`);
  console.log(`📖 Documentación en ${config.api.docs}`);
});
