/* Clase Interface de Usuario */
class UI {

    /* Constructor */
    constructor() {

        // Instancia la API
        this .api = new API();

        let latLng = { lat: 19.390519, lng: -99.3739778 }

        // Instancia y obtiene propiedad del mapa (Google Maps API)
        this .map = new google .maps .Map( 
            document .getElementById( 'mapa' ), 
            {
                center: latLng,
                zoom: 6
            }
        );
    }

    /* Método para mostrar los establecimientos de la API */
    mostrarEstablecimientos() {
        this .api .obtenerDatos() 
            .then( datos => { 
                const resultados = datos .respuesta .results;
                console .log( resultados );
            });
    }
        
}