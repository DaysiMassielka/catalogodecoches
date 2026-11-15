import { randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import catalogo from '../../catalogo.js';

export const config = {
    path: ['/api/piezas', '/api/cotizaciones']
};

export default async function handler(request) {
    const { pathname, searchParams } = new URL(request.url);

    if (pathname === '/api/piezas' && request.method === 'GET') {
        const modelo = searchParams.get('modelo');
        const sistema = searchParams.get('sistema') ?? undefined;
        return Response.json(catalogo.listarPiezas(modelo, sistema));
    }

    if (pathname !== '/api/cotizaciones' || request.method !== 'POST') {
        const allow = pathname === '/api/piezas' ? 'GET' : 'POST';
        return new Response(null, { status: 405, headers: { Allow: allow } });
    }

    const solicitud = await request.json().catch(() => null);
    const modelo = solicitud?.modelo_moto;
    const pieza = catalogo.listarPiezas(modelo).find(item => item.pieza === solicitud?.pieza);
    if (!pieza) return Response.json({ error: 'Elige una pieza y un modelo del catálogo.' }, { status: 400 });

    const id = randomUUID();
    const data = {
        pieza: pieza.pieza,
        precio: pieza.precio,
        modelo_moto: modelo,
        fecha: new Date().toISOString()
    };

    try {
        await getStore('cotizaciones').setJSON(id, data);
        return Response.json({ id_cotizacion: id, data }, { status: 201 });
    } catch (error) {
        console.error('Error al guardar la cotización:', error.message);
        return Response.json({ error: 'No se pudo guardar la cotización.' }, { status: 500 });
    }
}
