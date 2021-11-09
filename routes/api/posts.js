const express = require ('express');
const router = express.Router(); 

const Todos  = require ('../../models/Todos'); 

router.get('/', async (req, res) => {
    try{
        const post = await Todos.find(); 
        if(!post) throw Error ('No todos'); 
        res.status(200).json(post)
    } catch (err) {
        res.status(400).json({msg: err})
    }
});

router.post('/', async (req, res)=> {
    const newPost = new Todos (req.body); 

    try {
    const post = await newPost.save();
    if(!post) throw Error ('Something Wrong again. Please fix'); 
    
    res.status(200).json(post);
    
    } catch (err) {
        res.status(400).json({msg: err})
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const post = await Todos.findByIdAndDelete(req.params.id); 
        if(!post) throw Error ('No todo task find'); 
        res.status(200).json({sucess: true})
    
    } catch (err) {
        res.status(400).json({msg: err})
    }
})

router.patch('/:id', async (req, res) => {
    try{
        const post = await Todos.findByIdAndUpdate(req.params.id, req.body); 
        if(!post) throw Error ('Something went wrong while updating the todo'); 
        res.status(200).json({sucess: true})
    
    } catch (err) {
        res.status(400).json({msg: err})
    }
})
module.exports = router; 
