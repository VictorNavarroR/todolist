//vanila todo list
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.btn-add');
const todoList = document.querySelector('.li-container__ul');
const messages = document.querySelector('.empty');

let todos = [];

if(!todos.length) {
    messages.innerHTML = '<p></M>No pending todos.<p>';
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let ids = Math.random().toString(36).substr(2, 9);
    if(searchInput.value) {
        todos.push({
            id:`${ids}-${todos.length}`,
            name: searchInput.value
        });
        drawTodoList();
    } else {
        messages.innerHTML = '<p style="color:red">No se pueden insertar todos vacíos</p>';
    }
});

function drawTodoList() {
    todoList.innerHTML = '';
    searchInput.value = '';
    if(todos) {
        todos.forEach(elem => {
            const listElem = document.createElement('li');
            const listp = document.createElement('p');
            listp.classList.add('container__p');
            const listText = document.createTextNode(elem.name);
            listp.appendChild(listText);
            const closeBtn = document.createElement('button');
            const closeBtnText = document.createTextNode('X');
            closeBtn.appendChild(closeBtnText);
            listElem.appendChild(listp);
            listElem.appendChild(closeBtn);
            listElem.setAttribute('id', elem.id)
            todoList.appendChild(listElem);

            //events
            closeBtn.addEventListener('click', (e) => {
                removeElemFromList(e);
            });
            listp.addEventListener('click', (e) => {
                completeTodo(e);
            });

            if(elem.done) {        
                listElem.style.background = '#BAFFB4';
                listElem.style.textDecoration = 'line-through';
            }

            messages.innerHTML = '<p>You have pending todos to be completed.<p>';

        });
        if(todos.length && todos.every( elem => elem.done === true)) {
               messages.innerHTML = '<p>All todos are completed!<p>';
        }
    }
}

function completeTodo(e) {
    const elemToComplete = e.target.parentNode.getAttribute('id');
    const todo = todos.find( todo => todo.id == elemToComplete);
    const listToGreen = document.getElementById(todo?.id);
    if(!todo?.done) {
        todo.done = true;
    
        listToGreen.style.background = '#BAFFB4';
        listToGreen.style.textDecoration = 'line-through';
    
        if(todos.every( elem => elem.done === true)) {
            messages.innerHTML = '<p>All todos are completed!<p>';
        }
    } else {
        todo.done = false;
        listToGreen.style.background = 'lightgray';
        listToGreen.style.textDecoration = 'none';
        messages.innerHTML = '<p>You have pending todos to be completed.<p>';
    }

}

function removeElemFromList(e) {
    const elemToRemove = e.target.parentNode.getAttribute('id');
    todos = todos.filter( elem => elem.id != elemToRemove);
    if(!todos.length) {
        messages.innerHTML = '<p>No pending todos.<p>';
    }
    drawTodoList();
}
