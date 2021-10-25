const todolist = document.querySelector('.todolist'); 
const addTaskButton = document.getElementById('addTaskButton');
const newTaskName = document.getElementById('newTaskName');
let output = '';

const renderPosts = (posts) =>{
    posts.forEach(post =>{
        output += `
            <div class= "card mt-4 col-md-6 bg-light">
                <div class="card-body">
                    <h5 class="card-title">${post.taskName}</h5>
                    <p class="card-text">Category would be here. </p>
                    <a href="#" class="card-link">Edit</a>
                    <a href="#" class="card-link">Delete</a>
                </div>              
            </div>
            `;
    });

    todolist.innerHTML = output; 
}

const url = 'http://localhost:5000/api/todos'; 

//GET: Read posts 
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts (data))

//POST: Create posts 
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch (url, {
        method: 'POST', 
        headers: {
                'Content-type': 'application/json; charset=UTF-8',
        }, 
        body: JSON.stringify({
            taskName: newTaskName.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr =[];
            dataArr.push(data); 
            renderPosts(dataArr);
        })
})