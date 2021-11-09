const todolist = document.querySelector('.todolist');
const addTaskButton = document.getElementById('addTaskButton');
const newTaskName = document.getElementById('newTaskName');
const btnSubmit = document.querySelector('.btn')
let output = '';

const renderPosts = (posts) =>{
    posts.forEach(post =>{
        output += `
            <div class= "card mt-4 col-md-6 bg-light">
                <div class="card-body" data-id=${post._id}>
                    <h5 class="card-title">${post.body}</h5>
                    <p class="card-text">Category would be here. </p>
                    <a href="#" class="card-link" id="edit-post">Edit</a>
                    <a href="#" class="card-link" id="delete-post">Delete</a>
                </div>              
            </div>
            `;
    });

    todolist.innerHTML = output; 
}

const url = 'http://localhost:5000/api/posts'; 

//GET: Read posts 
fetch(url,)
    .then(res => res.json())
    .then(data => renderPosts (data))

todolist.addEventListener('click', (e) =>{
    e.preventDefault();
    let deleteBtnPressed = e.target.id == 'delete-post';
    let editBtnPressed = e.target.id == 'edit-post';

    let id = e.target.parentElement.dataset.id

    //DELETE: 
    if(deleteBtnPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })

        .then(res => res.json())
        .then(() => location .reload())
        
    }

    if(editBtnPressed) {
        const parent = e.target.parentElement;
        let todoContent = parent.querySelector('.card-title').textContent;

        newTaskName.value = todoContent;
    }

    //UPDATE
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method:'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                body: newTaskName.value,
            }) 
        })
        .then(res => res.json())
        .then(() => location.reload())
    })

});

//POST: Create posts 
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST', 
        headers: {
                'Content-type': 'application/json; charset=UTF-8',
        }, 
        body: JSON.stringify({
            body: newTaskName.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr =[];
            dataArr.push(data); 
            renderPosts(dataArr);
        })


    newTaskName.value = '';
})
