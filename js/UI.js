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
        let infoWindowActivo;           // Para controlar la visualización del infoWindow en el Mapa

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

            // Crea infoWindow para el Pin
            let infoWindow = this .crearInfoWindow( calle, regular, premium );

            // Evento 'click' para mostrar InfoWindow al hacer click
            // Google usa 'addListener' a cambio de 'addEventListener'
            marker .addListener( 'click', () => {

                // Valida que si existe el infoWindowActivo (Desplegado en el Mapa) se cierre 
                if( infoWindowActivo ) {
                    infoWindowActivo .close();
                }
                
                infoWindow .open( this .map, marker );          // Muestra infoWindow
                infoWindowActivo = infoWindow;                  // Asignamos el infoWindow
            });

        });
    }

    /* Método para crear el infoWindow (Globo mensaje sobre el Pin en el Mapa de Google Maps) */
    crearInfoWindow( calle, regular, premium ) {
        // Crea un template para los datos que se desean desplegar en el InfoWindow del Marker
        let infoMarker = `
            <p>
                <b>Domicilio:</b> ${ calle }<br />
                <b>Precio Regular:</b>$${ regular }<br />
                <b>Precio Premium:</b>$${ premium }<br />
            </p>
        `;

        // Crea infoWindow 
        let infoWindow = new google .maps .InfoWindow({
            content: infoMarker
        });

        return infoWindow;          
    }

    /* Método que mediante la 'búsqueda' obtiene sugerencias para la búsqueda */
    obtenerSugerencias( busqueda ) {
        this .api .obtenerDatos()
            .then( datos => {
                const resultados = datos .respuesta .results;

                // Enviar el JSON y la búsqueda al filtro
                this .filtrarSugerencias( busqueda, resultados );
            });
    }

    /* Método para filtrar las sugerencias de búsqueda */
    filtrarSugerencias( busqueda, resultados ) {
        
        // Filtra los datos usando el método 'filter' y un CallBack
        const datoFiltrado = resultados .filter( dato => dato .calle .indexOf( busqueda ) !== -1 );     // 'indexOf' determinará si la búsqueda se encuentra en la cadena del resultado

        console .log( 'datoFiltrado ', datoFiltrado )
    }

}