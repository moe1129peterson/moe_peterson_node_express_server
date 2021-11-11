const express = require('express'); 
const bodyParser = require ('body-parser'); 
const mongoose = require ('mongoose'); 
const {mongoUser,mongoPass} = require('./config')
const cors = require ('cors'); 

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.riadj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//Routes 
const postsRoutes = require ('./routes/api/posts');
const app = express(); 

//Body Parser Middleware 
app.use (express.json()); 
app.use(cors());

//connect to MongoDB
mongoose.connect (process.env.MONGO_URI,{
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
app.listen(process.env.PORT || 5000) 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(express.static('public'))


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


