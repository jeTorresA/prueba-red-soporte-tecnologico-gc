import { ApiRequest } from "../../assets/js/request.js";

/** Clase que representa al componente computador */
class Computador {
 
  constructor() { }

  /** Actualiza el listado de computadores en la tabla */
  static get() {
    ApiRequest.get('Caracteristicas', 'getAll').then(response => {
      /** Referencia del cuerpo de la tabla */
      const tbody = document.querySelector('#list-table tbody');
      tbody.innerHTML = ''; // Limpia la tabla

      response.data.forEach(item => {
        tbody.innerHTML += `<tr class="${Number(item.gce_estado) === 0 ? 'pc-inactive' : ''}">
          <td>${item.gce_nombre_equipo}</td>
          <td>${item.gce_board}</td>
          <td>${item.gce_case}</td>
          <td>${item.gce_procesador}</td>
          <td>${item.gce_grafica}</td>
          <td>${item.gce_ram}</td>
          <td>${item.gce_disco_duro}</td>
          <td>${item.gce_teclado}</td>
          <td>${item.gce_mouse}</td>
          <td>${item.gce_pantalla}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" ${Number(item.gce_estado) === 1 ? 'checked' : ''}
                onchange="Computador.updateStatus(${item.gce_id}, event.target.checked)">
            </div>
          </td>
          <td>
            <i class="bi bi-pencil-square edit-icon" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="Computador.editModal(${item.gce_id})" id="icon-edit"></i>
            <i class="bi bi-trash delete-icon" onclick="Computador.delete(${item.gce_id})"></i>
          </td>
        </tr>`; // Añade la fila a la tabla
      });
    }).catch(error => console.log('Ha ocurrido un error', error));
  }

  /** Registra un computador en la base de datos */
  static add = (event) => {
    event.preventDefault(); // Cancela el restablecimiento de la página

    /** Formulario de registro */
    const registerForm = event.target;

    const parameters = {
      gce_nombre_equipo: registerForm.querySelector('[name="gce_nombre_equipo"]').value,
      gce_board: registerForm.querySelector('[name="gce_board"]').value,
      gce_case: registerForm.querySelector('[name="gce_case"]').value,
      gce_procesador: registerForm.querySelector('[name="gce_procesador"]').value,
      gce_grafica: registerForm.querySelector('[name="gce_grafica"]').value,
      gce_ram: registerForm.querySelector('[name="gce_ram"]').value,
      gce_disco_duro: registerForm.querySelector('[name="gce_disco_duro"]').value,
      gce_teclado: registerForm.querySelector('[name="gce_teclado"]').value,
      gce_mouse: registerForm.querySelector('[name="gce_mouse"]').value,
      gce_pantalla: registerForm.querySelector('[name="gce_pantalla"]').value,
      gce_estado: registerForm.querySelector('[name="gce_estado"]').value,
    };

    /**Limpiar los campos del formulario de resgistro */
      registerForm.querySelector('[name="gce_nombre_equipo"]').value = '',
      registerForm.querySelector('[name="gce_board"]').value = '',
      registerForm.querySelector('[name="gce_case"]').value = '',
      registerForm.querySelector('[name="gce_procesador"]').value = '',
      registerForm.querySelector('[name="gce_grafica"]').value = '',
      registerForm.querySelector('[name="gce_ram"]').value = '',
      registerForm.querySelector('[name="gce_disco_duro"]').value = '',
      registerForm.querySelector('[name="gce_teclado"]').value = '',
      registerForm.querySelector('[name="gce_mouse"]').value = '',
      registerForm.querySelector('[name="gce_pantalla"]').value = '',      

    ApiRequest.post('Caracteristicas', 'addOne', parameters).then((response) => {
      console.log('Añadir', response, response.data);
      Computador.get();
    }).catch(error => console.log('Ha ocurrido un error', error));    
  };

  /**
   * Actualiza el estado de un computador
   * @param {number} id Identificador del computador
   * @param {status} boolean Nuevo estado
   */
  static updateStatus = (id, status) => {
    //alert(`${id} - ${status}`);    
    const parameters = {
      gce_id : id,
      gce_estado : status ? 1 : 0,
    };
   
    ApiRequest.post('Caracteristicas', 'putStatus', parameters).then((response) => {
      console.log('Actualizar', response, response.data);
      Computador.get();
    }).catch(error => console.log('Ha ocurrido un error: ', error));    
  }


  /**Actualiza los datos  */
  static update = (event) => {
    event.preventDefault();

    const editForm = event.target;

    const parameters = {
      gce_nombre_equipo : editForm.querySelector('[name="gce_nombre_equipo_edit"]').value,
      gce_board : editForm.querySelector('[name="gce_board_edit"]').value,
      gce_case : editForm.querySelector('[name="gce_case_edit"]').value,
      gce_procesador : editForm.querySelector('[name="gce_procesador_edit"]').value,
      gce_grafica : editForm.querySelector('[name="gce_grafica_edit"]').value,
      gce_ram : editForm.querySelector('[name="gce_ram_edit"]').value,
      gce_disco_duro : editForm.querySelector('[name="gce_disco_duro_edit"]').value,
      gce_teclado : editForm.querySelector('[name="gce_teclado_edit"]').value,
      gce_mouse: editForm.querySelector('[name="gce_mouse_edit"]').value,
      gce_pantalla : editForm.querySelector('[name="gce_pantalla_edit"]').value,
      gce_estado : editForm.querySelector('[name="gce_estado_edit"]').value,

      gce_id : editForm.querySelector('[name="gce_id_edit"]').value,
    }

    ApiRequest.post('Caracteristicas', 'updateOne', parameters).then(response => {
      console.log('Actualizar', response, response.data);
      Computador.get();
    }).catch(error => console.log('Ha ocurrido un error: ', error));
        
  }

  static editModal = (id) => {   
    
    const parameters = `?gce_id=${id}`;

    const editForm = document.getElementById("edit-form");

    ApiRequest.get('Caracteristicas', 'getOne', parameters).then(response => {   
      
        const item = response.data[0];
    
        editForm.querySelector('[name="gce_nombre_equipo_edit"]').value = item.gce_nombre_equipo;
        editForm.querySelector('[name="gce_board_edit"]').value = item.gce_board;
        editForm.querySelector('[name="gce_case_edit"]').value = item.gce_case;
        editForm.querySelector('[name="gce_procesador_edit"]').value = item.gce_procesador;
        editForm.querySelector('[name="gce_grafica_edit"]').value = item.gce_grafica;
        editForm.querySelector('[name="gce_ram_edit"]').value = item.gce_ram;
        editForm.querySelector('[name="gce_disco_duro_edit"]').value = item.gce_disco_duro;
        editForm.querySelector('[name="gce_teclado_edit"]').value = item.gce_teclado;
        editForm.querySelector('[name="gce_mouse_edit"]').value = item.gce_mouse;
        editForm.querySelector('[name="gce_pantalla_edit"]').value = item.gce_pantalla; 
        editForm.querySelector('[name="gce_estado_edit"]').value = item.gce_estado;

        editForm.querySelector('[name="gce_id_edit"]').value = item.gce_id;
      
    });   
  
  }

  static delete = (id) => {
    const parameters = {
      gce_id : id
    }

    ApiRequest.post('Caracteristicas', 'deleteOne', parameters).then(response => {
      console.log('Eliminar', response, response.data);
      Computador.get();
    }).catch(error => console.log('Ha ocurrido un error : ', error));
  }

}

// Evento que espera a que cargue el contenido HTML 
document.addEventListener('DOMContentLoaded', () => {
  Computador.get(); // Actualiza la tabla de computadores
});


(function () { // Habilita el uso de las clases en el archivo HTML
  this.Computador = Computador;
  this.ApiRequest = ApiRequest;
}).apply(window);
