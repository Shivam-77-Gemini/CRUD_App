const Mongoose=require('mongoose');
const schema=Mongoose.Schema({
    name:{
        type:String,

        required:true,
    },
    userName:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type:String,
        minlength:8,
        required:true,
    }
});
const User = Mongoose.model("user", schema);
module.exports = User