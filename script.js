var title = document.querySelector("title");
var list = document.querySelector(".list-group");
setInterval(setTime,5000);
function setTime(){
    if(title.innerHTML=="My Task List"){
        title.innerHTML = "Stay Home";
    }
    else{
        title.innerHTML = "My Task List";
    }
}
function task_counter(){
    document.getElementById("task_count").innerHTML = list.childElementCount;
}
task_counter();
//Bildirim elementi oluşturma
const todo_li = document.createElement('li');
const todo_a = document.createElement('a');
todo_li.className = "list-group-item list-group-item-secondary";
todo_a.className = "delete-item float-right";
todo_a.innerHTML = '<i class="fas fa-times"></i>';
todo_a.href = '#';
todo_li.appendChild(todo_a);

//tüm bildirimleri silme
function delete_task(){
    document.querySelector('#task-list').innerHTML = "";
    localStorage.removeItem('items');
    task_counter();
}

//bildirim silme
document.querySelector("#task-list").addEventListener('click',function(e){
    if(e.target.className ==='fas fa-times'){
        e.target.parentElement.parentElement.remove();
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        e.preventDefault();
        task_counter();
    }
})

//form event

const input = document.querySelector('#txtTaskName');
let items;

loadItems();

function loadItems(){
    items = getItemFromLS();
    items.forEach(function(item){
        CreateItem(item);
    })
}

function getItemFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function deleteItemFromLS(text){
    items = getItemFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    })
    localStorage.setItem('items',JSON.stringify(items));
}

function setItemToLS(text){
    items = getItemFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function addNewItem(){
    if(input.value==""){
        input_area = "empty";
    }
    else{
        input_area = input.value;
    }
    CreateItem(input_area);
    setItemToLS(input_area);
    input.value = "";
}

function CreateItem(text){
    const todo_li = document.createElement('li');
    todo_li.className = "list-group-item list-group-item-secondary";
    const todo_a = document.createElement('a');
    todo_a.className = "delete-item float-right";
    todo_a.innerHTML = '<i class="fas fa-times"></i>';
    todo_a.href = '#';
    todo_li.innerHTML = `${text}`;
    todo_li.appendChild(todo_a);
    document.querySelector("#task-list").appendChild(todo_li);
    task_counter();
}