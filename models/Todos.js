const mongoose = require ('mongoose'); 
const Schema = mongoose.Schema;
const Todos = new Schema ({
    body: {
        type: String,
        required: true,
    }, 
}); 

module.exports = mongoose.model('Todos', Todos);
