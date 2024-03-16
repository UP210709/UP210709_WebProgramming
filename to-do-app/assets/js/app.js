// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const showTasksButton=document.getElementById('show-tasks-button');

// Codígo nesesario para mostrar información
const userTasks=taskContainer.children[1];
const userInformation=userContainer.children[1];
let usersList=[];

userTasks.innerText="";
userSelect.innerText="";

getAllUsers()
.then((response)=>{
  for(let i=0;i<response.length;i++){
    userSelect.innerHTML+="<option value="+i+">"+response[i].firstname+"</option>";
    usersList[i]=response[i];
  }

  userInformation.innerText="";

  userInformation.innerHTML+="<li>ID: "+response[0].id+"</li>";
  userInformation.innerHTML+="<li>Nombre completo: "+response[0].firstname+" "+response[0].lastname+"</li>";
  userInformation.innerHTML+="<li>Email: "+response[0].email+"</li>";
});


userSelect.addEventListener("change",()=>{
  const userNumber=userSelect.value;
  userInformation.innerText="";
  userTasks.innerText="";

  userInformation.innerHTML+="<li>ID: "+usersList[userNumber].id+"</li>";
  userInformation.innerHTML+="<li>Nombre completo: "+usersList[userNumber].firstname+" "+usersList[userNumber].lastname+"</li>";
  userInformation.innerHTML+="<li>Email: "+usersList[userNumber].email+"</li>";

});

showTasksButton.addEventListener("click",()=>{
  if(userTasks.innerText==""){
    userTasks.innerText="";
    const user_ID=usersList[userSelect.value].id;
    let checkboxState="";

    getAllTasks()
    .then((response)=>{
      for(let i=0;i<response.length;i++){
        if(response[i].userId===user_ID){
          checkboxState="";
          if(response[i].completed)
            checkboxState="checked";

          userTasks.innerHTML+="<li><input type='checkbox'"+checkboxState+"><span>"+response[i].title+"</span></li>";
          
        }
      }
    });
  }
});
// Fin de codígo 

// Funciones

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
  return fetch('/data/tareas.json')
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