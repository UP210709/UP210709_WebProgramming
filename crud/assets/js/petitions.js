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

export async function createTask(newTask){
    const resp = await fetch("/api/createTask.php",{
        method: 'POST',
        body:newTask
    });
    console.log(await resp.text());
}