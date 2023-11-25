

const CalcularDistanciaCoordenadas = (coord1, coord2) => {
    const raioTerra = 6371; // Raio médio da Terra em quilômetros

    const paraRadianos = (valor) => {
        return (Math.PI / 180) * valor;  // Converter graus para radianos
    }

    const lat1 = paraRadianos(coord1.latitude);
    const lon1 = paraRadianos(coord1.longitude);
    const lat2 = paraRadianos(coord2.latitude);
    const lon2 = paraRadianos(coord2.longitude);

    // Diferença entre as coordenadas
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    // Fórmula de Haversine
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distância em quilômetros
    const distancia = raioTerra * c;

    return distancia;
}

export default CalcularDistanciaCoordenadas;