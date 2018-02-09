/* Mostrar establecimientos en Google Maps API */
const ui = new UI();

// Evento 'DOMContentLoaded' para mostrar los establecimientos cuando carga la página totalmente 
document .addEventListener( 'DOMContentLoaded', () => {
    ui .mostrarEstablecimientos();
});

// Habilitar la búsqueda en Vivo
const buscador = document .querySelector( '#buscar input' );        // Obtenemos el elemento del buscador en el DOM

// Evento 'input' al elemento del buscador en el DOM
buscador .addEventListener( 'input', () => {
    console .log( buscador .value );

    // Valida que al menos existan más de 3 caracteres para realizar la búsqueda
    if( buscador .value .length > 3 ) {
        // Obtener sugerencias que sean parte de la búsqueda
        ui .obtenerSugerencias( buscador .value );
    }
    else {
        console .log( 'Todavía no...' );
    }
});