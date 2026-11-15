const modelos = new Set([
    'Yamaha YZF-R1 (2024)',
    'Honda CBR 1000RR',
    'Kawasaki Ninja ZX-10R'
]);

// Catálogo de demostración compartido por los modelos del prototipo.
const catalogo = {
    motor: [
        { id: 'motor-1', pieza: 'Pistón de Alta Compresión', precio: 145 },
        { id: 'motor-2', pieza: 'Anillos de Pistón (Set)', precio: 45 },
        { id: 'motor-3', pieza: 'Perno de Biela Reforzado', precio: 28.5 }
    ],
    frenos: [
        { id: 'frenos-1', pieza: 'Disco de freno delantero', precio: 95 },
        { id: 'frenos-2', pieza: 'Pastillas de freno (set)', precio: 35 },
        { id: 'frenos-3', pieza: 'Sensor ABS delantero', precio: 48 }
    ],
    suspension: [
        { id: 'suspension-1', pieza: 'Retén de horquilla', precio: 22 },
        { id: 'suspension-2', pieza: 'Resorte de horquilla', precio: 65 },
        { id: 'suspension-3', pieza: 'Tubo de horquilla', precio: 110 }
    ],
    transmision: [
        { id: 'transmision-1', pieza: 'Piñón de salida', precio: 32 },
        { id: 'transmision-2', pieza: 'Corona trasera', precio: 59 },
        { id: 'transmision-3', pieza: 'Cadena de transmisión', precio: 85 }
    ]
};

function listarPiezas(modelo, sistema) {
    if (!modelos.has(modelo)) return [];

    const piezas = sistema === undefined
        ? Object.values(catalogo).flat()
        : Object.hasOwn(catalogo, sistema) ? catalogo[sistema] : [];
    return piezas.map(pieza => ({ ...pieza, modelo_moto: modelo }));
}

module.exports = { modelos, listarPiezas };
