import express from 'express';
import cors from 'cors';

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

const datos = {
    lista: []
}

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la REST API con Node.js y import!');
});

app.get('/api/items', (req, res) => {    
    res.json(datos.lista);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    console.log(`Llega ${newItem.name}`);
    newItem.id = Date.now();
    datos.lista.push(newItem);
    res.status(201).json(newItem);
});


// Actualizamos el estado de una válvula
app.put('/api/items/:name', (req, res) => {
    const { name } = req.params;
    const { state } = req.body;

    const item = datos.lista.find(item => item.name === name);
    if (item) {
        item.state = state;
        console.log(`Estado de ${name} actualizado a ${state}`);
        res.json(item);
    } else {
        res.status(404).json({ error: 'Válvula no encontrada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
