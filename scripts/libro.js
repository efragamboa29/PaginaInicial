
 // Función para obtener parámetros GET de la URL
function getParams() {
    debugger
    var params = {};
    var paramString = window.location.search.substring(1);
    var paramArray = paramString.split("&");
    for (var i = 0; i < paramArray.length; i++) {
        var pair = paramArray[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        params[key] = value;
    }
    cargarDatos(params[key]);
    return params;
}

function cargarDatos(llave)
{
var dataToSend = {
    id: llave,
    nombre: '',
    autor: '',
    categoria: '',
    resumen: ''
};
// URL de la API
var apiUrl = ulrparcial+'api/libreria/buscarLibrosFiltros';

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

    document.getElementById("titulo").value = data[0].nombre;
    document.getElementById("autor").value = data[0].autor;
    document.getElementById("resumen").value = data[0].resumen;
    document.getElementById("categoria").value = data[0].categoria;
    document.getElementById("id").value = data[0].id;

})
.catch(error => {
    // Capturar y manejar cualquier error que ocurra durante la solicitud
    console.error('Error de solicitud:', error);
});
}
// Obtener los parámetros GET
getParams();

function buscarResenas()
{
var dataToSend = {
    idLibro: document.getElementById("id").value,
};
// URL de la API
var apiUrl = ulrparcial+'api/libreria/ConsultarResena';

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

    const tabla = document.getElementById('tablaDatos');
    const tbody = tabla.querySelector('tbody');

    // Limpiar contenido previo de la tabla
    tbody.innerHTML = '';
    data.forEach((fila) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${fila.usuario}</td>
          <td>${fila.comentario}</td>
          <td>${fila.calificacion}</td>
        `;
        tbody.appendChild(tr);
      });
      document.getElementById("tablaDatos").style.display = '';

})
.catch(error => {
    // Capturar y manejar cualquier error que ocurra durante la solicitud
    console.error('Error de solicitud:', error);
});
}


function insertarResena()
{
    var arraryUsuario = document.cookie.split('=')

var dataToSend = {
    idLibro: document.getElementById("id").value,
    usuario: arraryUsuario[1], 
    comentario: document.getElementById("review").value,
    calificacion:document.getElementById("calificacion").value
};
// URL de la API
var apiUrl = ulrparcial+'api/libreria/insertarResena';

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
    if(data==1)
    {
        document.getElementById("MensajeError").style.display = 'none';
        document.getElementById("MensajeExitoso").style.display = 'block';
    }
    else
    {
        document.getElementById("MensajeError").style.display = 'block';
        document.getElementById("MensajeExitoso").style.display = 'none';
    }

})
.catch(error => {
    // Capturar y manejar cualquier error que ocurra durante la solicitud
    console.error('Error de solicitud:', error);
});
}