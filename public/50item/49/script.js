const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))


if (todos) {
    todos.forEach(todo => {
            addTodo(todo)

        }

    )
}

form.addEventListener('submit', (e) => {

    // 阻止默认事件
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    console.log(todo);
    let todoText = input.value


    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li');

        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText
        todosUL.appendChild(todoEl)

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        })

        input.value = ''
        updateLS()

    }
}

function updateLS() {

    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {

        todos.push({
            text: todoEl.innerText,
            //contains  如果A元素包含B元素，则返回true，否则false。唯一不支持这个方法的是IE的死对头firefox。
            completed: todoEl.classList.contains('completed')
        })
    });
    // ,localStorage只能存储字符，存入时将对象转为json字符串,读取时也要解析
    localStorage.setItem('todos', JSON.stringify(todos))

}123456789