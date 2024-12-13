import express from 'express';
import cors from 'cors';

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

//En este punto he intentado crear un array que contenga los
//identificadores de las válvulas asociadas a un grupo, apartir del código aportado
//pero no me ha dado tiempo a implementarlo 

const datos = {
    grupos: [
        {
            id: "group1",
            valvulas: ["riego1", "riego2"]
        },
        {
            id: "group2",
            valvulas: ["riego1", "riego2"]
        },
        {
            id: "group3",
            valvulas: ["riego1", "riego2"]
        },
        {
            id: "group",
            valvulas: ["riego1", "riego2"]
        },
        {
            id: "group5",
            valvulas: ["riego1", "riego2"]
        },
        {
            id: "group6",
            valvulas: ["riego1", "riego2"]
        }
    ],
    lista: []
};



// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la REST API con Node.js y import!');
});

app.get('/api/items', (req, res) => {    
    res.json(datos.lista);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    // Buscar si ya existe el item
    const index = datos.lista.findIndex(item => item.name === newItem.name);
    if (index !== -1) {
        // Actualizamos el item existente
        datos.lista[index].state = newItem.state;
        res.status(200).json(datos.lista[index]);
    } else {
        // Agregamos el nuevo item
        newItem.id = Date.now();
        datos.lista.push(newItem);
        res.status(201).json(newItem);
    }
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
