/* Atlassian
Given an API returning a list of todos, we want to display the list in a performant way.

Here are the functional requirements:
- Initially, display the first 20 todos. 
- On the top of the page, display the total number of loaded todos.
- Display a "Load More" button, and every time the user clicks on it, fetch and display 20 more todos.
- When the total number of loaded todos reaches 100, the "Load More" button should be hidden.

Use this endpoint URL to get the todos: https://dummyjson.com/todos?limit=20&skip=0.

You may change the skip and limit query params to load new todos. The endpoint will return the following structure with a total of 20 todos:
{
  "todos": [
    {
      "id": 1,
      "todo": "Do something nice for someone I care about",
      "completed": true,
      "userId": 26
    },
  ],
}
*/

// // 1) Using Promise and then chaining
// const getToDos = () => {
//     return fetch(URL).then((response)  => {
//         return response.json()
//     }).catch((err) => {
//         console.error(err);
//     })
// }

// getToDos().then((data) => {
//     console.log(data)
// });

// 2) Using async and await

let todos = [];
let total = 0;
const LIMIT = 20;
let skip = 0;

const getData = async () => {
    
    const URL = `https://dummyjson.com/todos?limit=${LIMIT}&skip=${skip*LIMIT}`;

    try {
        const response = await fetch(URL);
        const data = await response.json(); //jsonify the response
        const todos = data.todos; // manipulate data here
        return todos;
    }
    catch (err) {
        console.error(err);
    }
}

const toDosContainer = document.querySelector(".todoContainers");
const totalContainer = document.querySelector('.numofTodo');
const loadMoreBtn = document.querySelector('button');

const displayTodos = async () => {
    todos = await getData(); // it can keep appending (different from ReactJS)
    
    // go through each of todos and add todo item to the parent container
    // <ul>
    //    <li>item 1</li>
    // </ul>
    for (const { todo } of todos) {
        const listItem = document.createElement("li");
        listItem.innerText = todo;
        toDosContainer.append(listItem);
    }
    skip++;
    total = skip *LIMIT
    totalContainer.textContent = `${total} todos`;
    if (total >= 100) {
        loadMoreBtn.style.visibility = 'hidden';
    }

}

displayTodos();
loadMoreBtn.addEventListener('click', displayTodos);


