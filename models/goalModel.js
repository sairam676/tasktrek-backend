const mongoose = require('mongoose');
const goalSchema = new mongoose.schema({
user:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'User',
},


text:{
    type:String,
    required:[true,'Text is required']
},},
{timsStamps:true,}
)

module.exports=mongoose.model('goal',goalSchema);