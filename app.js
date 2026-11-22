
const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Métodos de la API
// ============================================================

// POST - Crear un nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body

    // Validar que todos los campos sean obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'El nombre, la descripcion y el precio son obligatorios'
        })
    }

    // Generar un nuevo ID
    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1

    // Crear el producto
    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: parseFloat(precio)
    }

    // Agregar el producto al arreglo
    productos.push(nuevoProducto)

    res.status(201).json(nuevoProducto)
})


// PUT - Actualizar un producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Buscar la posición del producto
    const indice = productos.findIndex(p => p.id === id)

    // Verificar si existe
    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    const { nombre, descripcion, precio } = req.body

    // Validar los campos obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'El nombre, la descripcion y el precio son obligatorios'
        })
    }

    // Actualizar el producto conservando su ID
    const productoActualizado = {
        id: id,
        nombre,
        descripcion,
        precio: parseFloat(precio)
    }

    productos[indice] = productoActualizado

    res.status(200).json(productoActualizado)
})


// DELETE - Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Buscar la posición del producto
    const indice = productos.findIndex(p => p.id === id)

    // Verificar si existe
    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    // Eliminar el producto del arreglo
    const productoEliminado = productos.splice(indice, 1)[0]

    res.status(200).json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado
    })
})


// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
