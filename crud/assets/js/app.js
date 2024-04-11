const listUsers = document.getElementById("users");
const listTasks = document.getElementById("taskTable")
const btnSave = document.getElementById("btnSave");
const title = document.getElementById("title");
const completed = document.getElementById("form-checkbox");
import {getAllUsers} from "./petitions.js";
import { getAllTasks } from "./petitions.js";
import { createTask } from "./petitions.js";
let createPermission=false;


document.addEventListener('DOMContentLoaded', async()=>{
    
    const users = await getAllUsers();
    let template = listUsers.innerHTML;


    for(const user of users){
        template += `
            <option value="${user.id}">${user.fullname}</option>
        `;
    }

    listUsers.innerHTML=template;

    const tasks= await getAllTasks();
    template="";
    for(const task of tasks){

        template += `
        <tr>
            <td>${task.id}</td>
            <td>${task.user}</td>
            <td>${task.title}</td>
            <td>
                <input type="checkbox" id="checkbox" ${(task.completed==1)?"checked":""}>
                <label for="checkbox">Completed</label>
            </td>
            <td>
            <button class="btn btn-secondary btn-sm">
                <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm">
                <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
            </td>
        </tr>
        `;
    }
    listTasks.innerHTML=template;

});


listUsers.addEventListener("change",async (e)=>{
    createPermission=true;
    const tasks= await getAllTasks();
    let template="";
    for(const task of tasks){
        if(task.userId==e.target.value){
            template += `
            <tr>
                <td>${task.id}</td>
                <td>${task.user}</td>
                <td>${task.title}</td>
                <td>
                    <input type="checkbox" id="checkbox" ${(task.completed==1)?"checked":""}>
                    <label for="checkbox">Completed</label>
                </td>
                <td>
                <button class="btn btn-secondary btn-sm">
                    <span>Update</span> <i class="nf nf-md-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm">
                    <span>Delete</span> <i class="nf nf-cod-trash"></i>
                </button>
                </td>
            </tr>
            `;
        }
    }
    listTasks.innerHTML=template;
});

btnSave.addEventListener("commit",async(e)=>{
    e.preventDefault();
  
    if(title.value!="" && createPermission){
        const task={
            Title:title.value,
            uid:listUsers.value,
            complete:completed.checked
        };
        console.log(task);
        const res=await createTask(task);
        console.log(res);
    }
    else{
        console.log("jala");
    }
    
})

