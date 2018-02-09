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
                
                // Muestra los pines en Google Maps
                this .mostrarPinesEnElMapa( resultados );
            });
    }

    /* Método para mostrar los pines en Google Maps */
    mostrarPinesEnElMapa( datos ) {
        console .log( 'Pines', datos );

        // Recorrer 'Array' de establecimientos
        datos .forEach( dato => {
            console .log( dato );
            // Extraemos los datos que nos interesa usando Destructuring
            let { latitude, longitude, calle, regular, premium } = dato;

            // Crea Objeto ubicación (Latitud y Longitud)
            let latLng = {
                lat: Number( latitude ),
                lng: Number( longitude )
            }

            // Agrega los Pines a Google Maps
            let marker = new google .maps .Marker({
                position: latLng,
                map: this .map
            });

        });
    }
        
}