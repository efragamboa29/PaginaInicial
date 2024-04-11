var ulrparcial ="https://pruebalibreria20240411122131.azurewebsites.net/";

function cerrarsesion()
{
    document.cookie = "usuario=";
    window.location.href = "inicio.html";     
}

function ConsultarUsuarioExite()
{
    debugger
    var arraryUsuario = document.cookie.split('=')
    var usuario;
    if(arraryUsuario.length > 1)
    {
        usuario = arraryUsuario[1];
    }
    else
    {
        document.cookie = "usuario=";
        window.location.href = "inicio.html"; 
    }

    var dataToSend = {
    nombre: usuario,
    contrasena: ''
    };
    // URL de la API
    var apiUrl = ulrparcial+'api/libreria/consultarUsuario';

    var requestOptions = {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
        },
        body: JSON.stringify(dataToSend) // Convertir el objeto a formato JSON y enviarlo en el cuerpo de la solicitud
    };

    // Hacer la solicitud GET utilizando fetch()
    fetch(apiUrl, requestOptions,{mode:'cors'})
    .then(response => {
        // Verificar si la respuesta está en el rango de 200 a 299 (éxito)
        if (response.ok) {
        // Convertir la respuesta a formato JSON
        return response.json();
        }
        // En caso de error, lanzar una excepción
        throw new Error('Error en la solicitud');
    })
    .then(data => {
            if(data != 1)
            {
                window.location.href = "inicio.html"; 
                document.cookie = "usuario=" + "";
            }
    })
    .catch(error => {
        // Capturar y manejar cualquier error que ocurra durante la solicitud
        console.error('Error de solicitud:', error);
    });
}
