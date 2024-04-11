export async function getAllUsers(){
    const resp = await fetch("/api/getUsers.php");
    const json = await resp.json();
    return json;
}

export async function getAllTasks(){
    const resp = await fetch("/api/getTasks.php");
    const json = await resp.json();
    return json;
}

export async function getTask(data){
    const resp = await fetch("/api/getTask.php", {
        method: "POST",
        body: data
    });
    const json = await resp.json();
    return json;
}

export async function updateTask(data){
    const resp= await fetch("/api/updateTask.php", {
        method: "POST",
        body: data
    });
    console.log(await resp.text());
}

export async function createTask(data){
    const resp= await fetch("/api/createTask.php", {
        method: "POST",
        body: data
    });
    console.log(await resp.text());
}

export async function deleteTask(data){
    const resp= await fetch("/api/deleteTask.php", {
        method: "POST",
        body: data
    });
    console.log(await resp.text());
}