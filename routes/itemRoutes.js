const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre del ítem
 *         description:
 *           type: string
 *           description: Descripción del ítem
 *       example:
 *         _id: 64c5a3eaf34d5f0012345678
 *         name: "Producto A"
 *         description: "Este es un producto de ejemplo"
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Obtener todos los items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista de items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Crear un nuevo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item creado exitosamente
 */
router.post("/", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
});

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Actualizar un item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item actualizado
 */
router.put("/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Eliminar un item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item
 *     responses:
 *       200:
 *         description: Item eliminado
 */
router.delete("/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item eliminado" });
});

module.exports = router;
