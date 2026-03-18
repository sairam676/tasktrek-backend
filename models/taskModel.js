const mongoose = require('mongoose');

const  taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
     title:{
    type:String,
    required:[true,'Title is required']
     },
     description:{
        type:String,
     },
     status:{
        type:String,
        enum:["todo","in-progress","done"],
        default:"todo",
     },
     isDeleted:{
      type:Boolean,
      default:false,
     },
     assignedTo:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     },
},{timestamps:true});

module.exports = mongoose.model('Task',taskSchema);