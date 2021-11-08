const express = require('express'); 

const bodyParser = require ('body-parser'); 
const mongoose = require ('mongoose'); 
const {mongoUser,mongoPass} = require('./config')
const cors = require ('cors'); 
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const uri = 'mongodb+srv://moe_user:0MkotR5x2GCsdDEq@cluster0.riadj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Routes 
const postsRoutes = require ('./routes/api/posts');
const app = express(); 

//Body Parser Middleware 
app.use (express.json()); 

//connect to MongoDB
mongoose.connect (uri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})

.then(() => console.log ('Connected MongoDB Sucessfully'))

.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send ('Hello from the other side')
}); 

//User routes

app.use('/api/posts', postsRoutes); 
const PORT = process.env.PORT || 5000; 
app.listen (PORT, () => console.log (`Server runs at ${PORT}`))

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

app.get ('/api/posts', (req, res) =>{
    res.json (todos)
}); 

app.post('/api/posts', (req, res)=> {

    let todoAdd = {
        id: todos.length+1, 
        taskName: req.body.taskName, 
        completed: false
    }

    todos.push (todoAdd) 
    console.log (todoAdd)
    res.json (todoAdd)
})




app.put('/api/todos', (req, res) => {
    res.json(todos)

})

app.delete ('/api/todos', (req, res) => {
    res.json(todos)
})


