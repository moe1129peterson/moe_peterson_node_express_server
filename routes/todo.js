const express = require('express'); 
const router = express.Router();
const uuid = require('uuid');
const todos = require('../todo.json')

let router = express.Router();

router.get('/', (req, res) => {
    res.send('todoList')
})

//get all todos including categories
router.get ('/', (req, res) => {
    res.send(todos); 
}); 

//creating unique id for todos
router.post('/', (req, res) =>{
    const todo = req.body;
    todos.push ({ ...todo, id: uuid.v4()});
    res.send (`User with the name ${todo.id}, ${todo.taskName}, ${todo.completed}, ${todo.category} added to the todo list`);
});

//adding todos
router.get ('/todo', (req, res) => {
    const {id} = req.params;
    const foundId = todos.find ((todo) => todo.id === id); 
    res.send(foundId);
});

//adding categories
router.get ('/category', (req, res) => {
    const {category} = req.params;
    const foundCategory = todos.find ((todo) => todo.category === category); 
    res.send(foundCategory);
});

//deleting todo
router.delete('/todo/:id', (req, res) => {
    try {
        const {id} = req.params
        let index = todos.findIndex(todo => todo.id === parseInt(id));
        if (index) {
            todos.splice(index, 1)
            res.send (`${id} Sucessfully deleted from the database.`);
        }else{
            res.send(`Todo with id ${id} does not exist`)
        }
    }catch(error){
        res.status(500).send(error.message)
    }
})

//deleteing categories 
router.delete('/category/:id', (req, res) => {
    try {
        const {id} = req.params
        let index = todos.findIndex(todo => todo.id === parseInt(id));
        if (index) {
            todos.splice(index, 1)
            res.send (`${id} Sucessfully deleted from the database.`);
        }else{
            res.send(`Todo with id ${id} does not exist`)
        }
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const {taskName, category} = req.body; 
    const todo =todos.find((todo) => todos.id ===id);

    if(taskName){
        todos.taskName = taskName;
    }

    if(category){
        todos.category = category; 
    }

    res.send('Todo with the id ${id} has been updated.')

})

module.exports = router; 
