const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/productos.json');

const leerProductos = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

const escribirProductos = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getProductos = (req, res) => {
  const productos = leerProductos();
  res.json(productos);
};

const getProductoById = (req, res) => {
  const productos = leerProductos();
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
};

const crearProducto = (req, res) => {
  const productos = leerProductos();
  const nuevo = { id: Date.now(), ...req.body };
  productos.push(nuevo);
  escribirProductos(productos);
  res.status(201).json(nuevo);
};

const actualizarProducto = (req, res) => {
  const productos = leerProductos();
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  productos[index] = { ...productos[index], ...req.body };
  escribirProductos(productos);
  res.json(productos[index]);
};

const eliminarProducto = (req, res) => {
  let productos = leerProductos();
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  const eliminado = productos.splice(index, 1);
  escribirProductos(productos);
  res.json(eliminado[0]);
};

module.exports = {
  getProductos,
  getProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};