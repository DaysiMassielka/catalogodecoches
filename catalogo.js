const modelos = new Set([
    'Citroën C3',
    'Dacia Sandero',
    'Renault Clio'
]);

// Catálogo de demostración compartido por los modelos del prototipo.
const catalogo = {
    motor: [
        { id: 'motor-1', pieza: 'Filtro de aceite', detalle: 'Cartucho con junta incluida', precio: 14.90 },
        { id: 'motor-2', pieza: 'Bujías de encendido', detalle: 'Juego de 3 bujías de iridio', precio: 36.50 },
        { id: 'motor-3', pieza: 'Bomba de agua', detalle: 'Bomba mecánica con junta', precio: 64.90 }
    ],
    frenos: [
        { id: 'frenos-1', pieza: 'Disco de freno delantero', detalle: 'Disco ventilado de 260 mm', precio: 58.90 },
        { id: 'frenos-2', pieza: 'Pastillas de freno delanteras', detalle: 'Juego de 4 pastillas', precio: 42.50 },
        { id: 'frenos-3', pieza: 'Sensor ABS delantero', detalle: 'Sensor de velocidad de rueda', precio: 37.90 }
    ],
    suspension: [
        { id: 'suspension-1', pieza: 'Amortiguador delantero', detalle: 'Amortiguador de gas tipo McPherson', precio: 89.90 },
        { id: 'suspension-2', pieza: 'Muelle helicoidal delantero', detalle: 'Acero con recubrimiento anticorrosión', precio: 49.50 },
        { id: 'suspension-3', pieza: 'Copela del amortiguador', detalle: 'Soporte superior con rodamiento', precio: 31.90 }
    ],
    transmision: [
        { id: 'transmision-1', pieza: 'Kit de embrague', detalle: 'Disco, plato de presión y cojinete', precio: 169.90 },
        { id: 'transmision-2', pieza: 'Semieje delantero', detalle: 'Con juntas homocinéticas y fuelles', precio: 119.50 },
        { id: 'transmision-3', pieza: 'Aceite para caja manual', detalle: 'Envase de 1 L, viscosidad 75W-80', precio: 17.90 }
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
