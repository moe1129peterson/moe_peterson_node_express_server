const express = require('express'); 
const cors = require ('cors'); 
const bodyParser = require ('body-parser'); 

const app = express();
const PORT = 5000;

app.use (cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(express.static('public'))

let todos = [
    {
        id: 1,
        taskName: 'Wake Moe Up at 6am',
        completed: false
    },
    {
        id: 2,
        taskName: 'Stop by post office',
        completed: false
    }
];
app.get ('/api/todos', (req, res) =>{
    res.json (todos)
}); 

app.post('/api/todos', (req, res)=> {
    console.log('Post', req.body)

    let todoAdd = {
        id: todos.length+1, 
        taskName: req.body.taskName, 
        completed: false
    }

    todos.push (todoAdd) 
    console.log (todoAdd)
    res.json (todoAdd)
})



app.get ('/', (req, res) =>{
    res.send ('Hello from Homepage');
}); 

app.put('/api/todos', (req, res) => {
    res.json(todos)

})

app.delete ('/api/todos', (req, res) => {
    res.json(todos)
})

app.listen(PORT, () => {
    console.log(`Sever running on port: http://localhost:${PORT}`)
})
