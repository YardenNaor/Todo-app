
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    console.log('todes:',todos)
    if (Array.isArray(todos)){
    const strHTMLs = todos.map(todo => `
    
    <li 
         onclick="onToggleTodo('${todo.id}')">
         <div class="li-container"> <div class="text-container ${(todo.isDone) ? "done" : ""}"" >${todo.txt}</div>
         <div class="importance-container">${todo.importance}</div>
        <div class="button-container">
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
        </div>
        </div>
         </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    } else {
        document.querySelector('.todo-list').innerHTML = todos 
    }
    document.querySelector('.total-todos').innerText = `    ${getTotalTodos()}`
    document.querySelector('.active-todos').innerText = `   ${getActiveTodos()}`
}

// • Add validation that the todo text is not empty before
// creating the todo

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const elSelect = document.querySelector('.options')
    // console.log('importance:',elSelect)
    const txt = elTxt.value
    const importance = elSelect.value
    // console.log('txt', txt)
    if (txt) {
        addTodo(txt, importance)
        elTxt.value = ''
        renderTodos()
    }
}

// • When delete is clicked, use confirm() and only if user
// approves – delete the todo

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)
    const isConfirmed= confirm('Are you sure?')
    if (isConfirmed){
    removeTodo(todoId)
    renderTodos()
    }
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSortTodoes(sortBy){
    setSort(sortBy)
    renderTodos()
}

// Support sorting the todos by: txt / created / importance
// use a dropdown <select>

