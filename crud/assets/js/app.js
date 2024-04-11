const listUsers = document.getElementById("users");
const listTasks = document.getElementById("taskTable")
const btnSave = document.getElementById("btnSave");
const title = document.getElementById("title");
const completed = document.getElementById("form-checkbox");
import {getAllUsers} from "./petitions.js";
import { getAllTasks } from "./petitions.js";
import { createTask } from "./petitions.js";
import { deleteTask } from "./petitions.js";
import { getTask } from "./petitions.js";
import { updateTask } from "./petitions.js";
let createPermission=false;
let taskID;


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
            <button class="btn btn-secondary btn-sm update" value="${task.id}">
                <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm delete" value="${task.id}">
                <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
            </td>
        </tr>
        `;
    }
    listTasks.innerHTML=template;
    await getBtns();
});


listUsers.addEventListener("change",async (e)=>{
    createPermission=true;
    await showTasks();
    await getBtns();
});

btnSave.addEventListener("click",async(e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("Title", title.value);
    data.append("userId", listUsers.value);
    data.append("completed", completed.checked);
    
    if(btnSave.value=='update'){
        data.append("id", taskID);
        await updateTask(data); 
        await showTasks();
        btnSave.value="";
    }
    else if(title.value!="" && createPermission){
        
        await createTask(data);
        await showTasks();
    }

    title.innerText = 'Insert task';
    completed.checked = 0;
    title.value = '';
    await getBtns();
})

async function getBtns() {
    const deleteBtns = document.querySelectorAll('.delete');

    deleteBtns.forEach(button => {

        button.addEventListener('click', async () => {
            const data = new FormData();
            data.append("id", button.value);
            await deleteTask(data);
            await showTasks();
        })
    });

    const updateBtns = document.querySelectorAll('.update');
    updateBtns.forEach(button => {
        button.addEventListener('click', async () => {
            const data = new FormData();
            data.append("id", button.value);
            const task = await getTask(data);

            title.value = task[0].title;
            completed.checked = (task[0].completed == 1) ? true : false;
            taskID = task[0].id;

            btnSave.value = 'update';

        })
    });
}


async function showTasks(){
    const tasks= await getAllTasks();
    let template="";
    for(const task of tasks){
        if(task.userId==listUsers.value){
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
                <button class="btn btn-secondary btn-sm update" value="${task.id}">
                    <span>Update</span> <i class="nf nf-md-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm delete" value="${task.id}">
                    <span>Delete</span> <i class="nf nf-cod-trash"></i>
                </button>
                </td>
            </tr>
            `;
        }
    }
    listTasks.innerHTML=template;
    await getBtns();
}