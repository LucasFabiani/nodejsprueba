window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    data = {}

    if (localStorage.getItem("data")){
        data = loadData();
        for (const [key, task] of Object.entries(data)) {
            if (task.text != ""){
                addTask(task.text, key)
            } else {
                delete data[key]
            }
        }
    } else {
        saveData(data)
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        input.value = "";

        addTask(task);
        saveData(data);
        
    })

    function saveData(data){
        localStorage.setItem("data", JSON.stringify(data));
    }

    function loadData(){
        d = JSON.parse(localStorage.getItem("data"));
        return d;
    }

    function clearData(){
        return localStorage.clear("data");
    }
    
    function addTask(task, id){
        // set the id to identifier after
        if (!id){
            date = new Date()
            id = parseInt(date.getTime());
            console.log(id)
            data[id] = {
                "text":task
            }
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");
        task_el.id = ("task"+id);

        const content_el = document.createElement("div");
        content_el.classList.add("content");
        task_el.appendChild(content_el);

        const input_el = document.createElement("input");
        input_el.type = "text";
        input_el.classList.add("text");
        input_el.value = task;
        input_el.setAttribute("readonly", "readonly");
        content_el.appendChild(input_el);

        const actions_el = document.createElement("div");
        actions_el.classList.add("actions");
        task_el.appendChild(actions_el);
        

        const edit_el = document.createElement("button");
        edit_el.classList.add("edit")
        edit_el.innerHTML = "edit"
        actions_el.appendChild(edit_el);

        edit_el.addEventListener('click', () => {
            if (edit_el.innerHTML.toLowerCase() == "edit") {
                input_el.removeAttribute('readonly');
                input_el.focus();
                edit_el.innerHTML = "save";
            } else {
                input_el.setAttribute("readonly", "readonly");
                edit_el.innerHTML = "edit";
                console.log("save");
                data[id].text = input_el.value
                saveData(data)
            }
        })

        const delete_el = document.createElement("button");
        delete_el.classList.add("delete")
        delete_el.innerHTML = "delete"
        actions_el.appendChild(delete_el);

        delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            data[id].text = "";
            console.log(data);
            console.log(loadData())
            console.log(id)
            saveData(data);
            console.log(loadData())
        })

        list_el.appendChild(task_el);
}
})
