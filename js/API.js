/* Clase API */
class API {

    /* Método asíncrono para obtener los datos de la API */
    async obtenerDatos() {

        // FecthAPI usando Promises (Se conecta a los datos)
        this. datos = await fetch( 'https://api.datos.gob.mx/v1/precio.gasolina.publico' );

        // Respuesta JSON de todas las categorias (Convierte JSON en un 'Array')
        const respuesta = await this .datos .json();

        // Retorna un Objeto con un 'Array' de todas las categorías 
        return {                                                                                                
            respuesta
        }
    }

}