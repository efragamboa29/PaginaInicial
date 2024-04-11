document.addEventListener('DOMContentLoaded', () => {
    const url = ulrparcial+'api/libreria/buscarLibros'; // Reemplazar con la URL de tu API
  
    // Función para obtener datos de la API
    const obtenerDatosDeAPI = async () => {
      try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        mostrarDatosEnTabla(datos);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };
  
    // Función para mostrar los datos en la tabla
    const mostrarDatosEnTabla = (datos) => {
      const tabla = document.getElementById('tablaDatos');
      const tbody = tabla.querySelector('tbody');
  
      // Limpiar contenido previo de la tabla
      tbody.innerHTML = '';
  
      // Iterar sobre los datos y crear filas en la tabla
      datos.forEach((fila) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><input type="button" value="ver" onclick="buscarLibro(${fila.id})"></td>
          <td>${fila.nombre}</td>
          <td>${fila.autor}</td>
          <td>${fila.categoria}</td>
          <td>${fila.resumen}</td>
        `;
        tbody.appendChild(tr);
      });
    };
  
    // Llamar a la función para obtener datos de la API cuando la página esté lista
    obtenerDatosDeAPI();
  });

  function buscarLibro(idLibro)
  {
    window.location.href = "libro.html?idlibro=" + idLibro; 
  }
  

  function consultarLibros()
  {
    var dataToSend = {
      id: 0,
      nombre: document.getElementById('tnombre').value,
      autor: document.getElementById('tautor').value,
      categoria: document.getElementById('tcategoria').value,
      resumen: document.getElementById('tresumen').value
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
    const tabla = document.getElementById('tablaDatos');
    const tbody = tabla.querySelector('tbody');

    // Limpiar contenido previo de la tabla
    tbody.innerHTML = '';

    // Iterar sobre los datos y crear filas en la tabla
    data.forEach((fila) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="button" value="ver" onclick="buscarLibro(${fila.id})"></td>
        <td>${fila.nombre}</td>
        <td>${fila.autor}</td>
        <td>${fila.categoria}</td>
        <td>${fila.resumen}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(error => {
      // Capturar y manejar cualquier error que ocurra durante la solicitud
      console.error('Error de solicitud:', error);
  });
  }