const inputRollo = document.getElementById('idRollo');
const mtsTotalesInput = document.getElementById('mtsTotales');
const mtsDefectoInput = document.getElementById('mtsDefecto');
const btnAuditar = document.getElementById('btnAuditar'); // <-- Corregido el ':' por ';'
const tablaMermas = document.getElementById('tablaMermas');

let listaMermas = JSON.parse(localStorage.getItem('mermas')) || [];

function RenderizarTabla() {
    tablaMermas.innerHTML = '';
    listaMermas.forEach(item => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.idRollo}</td>
            <td>${item.mtsTotales}</td>
            <td>${item.porcentajeMerma.toFixed(2)}%</td>
            <td><span class="badge ${item.estado === 'Aceptado' ? 'bg-success' : 'bg-danger'}">${item.estado}</span></td>
        `;
        tablaMermas.appendChild(fila);
    });
}

btnAuditar.addEventListener('click', () => {
    const idRollo = inputRollo.value.trim();
    const mtsTotales = parseFloat(mtsTotalesInput.value);
    const mtsDefecto = parseFloat(mtsDefectoInput.value);

    if (!idRollo || isNaN(mtsTotales) || isNaN(mtsDefecto)){
        alert('Por favor no la cague plox');
        return;
    }

    const porcentajeMerma = (mtsDefecto / mtsTotales) * 100;
    const estado = porcentajeMerma > 5 ? 'Rechazado' : 'Aceptado'; // <-- Coincide con la validación de la tabla
    
    const nuevoRegistro = {
        idRollo,
        mtsTotales,
        mtsDefecto,
        porcentajeMerma,
        estado
    };

    listaMermas.push(nuevoRegistro);
    localStorage.setItem('mermas', JSON.stringify(listaMermas));

    RenderizarTabla();
    
    // Limpiar inputs
    inputRollo.value = '';
    mtsTotalesInput.value = '';
    mtsDefectoInput.value = '';
});

RenderizarTabla();