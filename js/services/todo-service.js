const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
// var gSortby = 'created'

_createTodos()


// • When there are no todos to display show:
// No todos / No Active Todos, No Done Todos

function getTodosForDisplay() {
    if (gFilterBy === 'all'){
    if (!gTodos.length) return 'No todos'
    else return gTodos
    }
    else if (gFilterBy === 'done'){
    const doneTodos= gTodos.filter(todo =>todo.isDone)
        if (!doneTodos.length) return 'No Done Todos'
       else return doneTodos
    }
     else if (gFilterBy === 'active'){
        const activeTodos= gTodos.filter(todo =>!todo.isDone)
        if (!activeTodos.length) return 'No Active Todos'
        else return activeTodos
     }        
}



function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    // console.log('sortby:',sortBy)
     if (sortBy==='created') {
        gTodos.sort(function(a, b){
            if(a.createdAt < b.createdAt) { return -1; }
            if(a.createdAt > b.createdAt) { return 1; }
            return 0;
        }) 
        
     }else if (sortBy==='text'){
       gTodos.sort(function (a, b) {
        return a.txt.toLowerCase().localeCompare(b.txt.toLowerCase());
    });
       
     }else if (sortBy==='importance'){
       gTodos.sort( function( a , b){
            if(a.importance > b.importance) return 1;
            if(a.importance < b.importance) return -1;
            return 0;
        });
   
     }
console.log('gtodoes:',gTodos)
}

function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML', '3'),
            _createTodo('Study CSS', '1'),
            _createTodo('Master JS', '2'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

// • Add the following properties to the todo:
// o createdAt = (timestamp)
// o importance = (number: 1-3)
// (use another input)



function _createTodo(txt, importance) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt:Date.now(),
        importance
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

// console.log('time:',Date.now())
// function _getTime() {
//     return new Date().toString().split(' ')[4];
   
// }

// function setImpotence(importance){
// return importance
// }

