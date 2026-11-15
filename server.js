const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('node:path');
const { modelos, listarPiezas } = require('./catalogo.js');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.RENDER === 'true' ? '0.0.0.0' : 'localhost';

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Conexión a la Base de Datos SQLite (Local y Gratuita)
const db = new sqlite3.Database(path.join(__dirname, 'repuestos.db'), (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite con éxito.');
    }
});

// Crear tabla de cotizaciones si no existe
db.run(`CREATE TABLE IF NOT EXISTS cotizaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pieza TEXT,
    precio REAL,
    modelo_moto TEXT,
    fecha TEXT
)`, (error) => {
    if (error) {
        console.error('Error al preparar las cotizaciones:', error.message);
        process.exitCode = 1;
        db.close();
        return;
    }

    app.listen(PORT, HOST, (listenError) => {
        if (listenError) {
            console.error('No se pudo iniciar el servidor:', listenError.message);
            process.exitCode = 1;
            db.close();
            return;
        }

        console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
    });
});

// 2. Ruta API para Guardar Cotización en SQLite (POST)
app.post('/api/cotizaciones', (req, res) => {
    const { pieza, precio, modelo_moto } = req.body ?? {};
    if (typeof pieza !== 'string' || !pieza.trim() || !Number.isFinite(precio) ||
        precio < 0 || !modelos.has(modelo_moto)) {
        return res.status(400).json({ error: 'Indica una pieza, un precio válido y un modelo del catálogo.' });
    }
    const fecha = new Date().toISOString();

    const query = `INSERT INTO cotizaciones (pieza, precio, modelo_moto, fecha) VALUES (?, ?, ?, ?)`;

    db.run(query, [pieza, precio, modelo_moto, fecha], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            mensaje: "Cotización guardada exitosamente en la base de datos",
            id_cotizacion: this.lastID,
            data: { pieza, precio, modelo_moto, fecha }
        });
    });
});

// 3. Ruta API para VER los resultados guardados en SQLite (GET)
app.get('/api/cotizaciones', (req, res) => {
    db.all(`SELECT * FROM cotizaciones`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            total: rows.length,
            registros: rows
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/piezas', (req, res) => {
    const { modelo, sistema } = req.query;
    res.json(listarPiezas(modelo, sistema));
});

app.delete('/api/limpiar', (req, res) => {
    const query = 'DELETE FROM cotizaciones WHERE rowid NOT IN (SELECT MIN(rowid) FROM cotizaciones GROUP BY pieza, precio, modelo_moto, fecha)';
    db.run(query, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Duplicados eliminados' });
    });
});
