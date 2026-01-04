const mongose = require('mongoose');

const userSchema = new mongose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'mail is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'pass is required']
    },
},
{
    timestamps:true
});

module.exports=mongose.model('User',userSchema);
