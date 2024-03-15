// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');

// Codígo nesesario para mostrar información
const userInformation=userContainer.children[1];
let usersList=[];


userSelect.innerText="";

getAllUsers()
.then((response)=>{
  
  for(let i=0;i<response.length;i++){
    userSelect.innerHTML+="<option value="+i+">"+response[i].firstname+"</option>";
    usersList[i]=response[i];
  }

  showUserInformation(response[0].firstname,response[0].lastname,response[0].email);
})

userSelect.addEventListener("change",()=>{
  const userNumber=userSelect.value
  showUserInformation(usersList[userNumber].firstname,usersList[userNumber].lastname,usersList[userNumber].email);
})
// Fin de codígo 

// Funciones

function showUserInformation(firstname,lastname,email){
  userInformation.innerText="";

  userInformation.innerHTML+="<li>Nombre completo: "+firstname+" "+lastname+"</li>";
  userInformation.innerHTML+="<li>Email: "+email+"</li>";
}


/**
 * Optiene una lista de todos los usuarios que pueden existir
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
  return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

/**
 * Optiene una lista de todas las tareas que hay de todos los usuarios
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
  return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

/**
 * @typedef User Definición de un usuario
 * @property {number} id Identificador unico del usuario
 * @property {string} firtsname Primer nombre del usuario
 * @property {string} lastname Apellido del usuario
 * @property {string} email Correo electronico del usuario
  */

/**
 * @typedef Task Definición de una tarea de usuario
 * @property {number} id Identificador unico de la tarea
 * @property {number} userId IDentificador del uaurio a quien corresponde la tarea
 * @property {string} title Titulo de la tarea
 * @property {boolean} completed Estado de la tarea si esta completada o no
 */