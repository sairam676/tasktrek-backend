const asyncHandler = require('express-async-handler');
const Task = require('..//models/taskModel');

//@desc Get user tasks
//@route api/tasks
//@acsess Private
const getTasks =asyncHandler(async(req,res)=>{
    const filter = {user:req.user._id,isDeleted:false};
    const page = parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;

const skip=(page-1)*limit;

//option status filter
    if(req.query.status){
        filter.status=req.query.status
    }
const tasks = await Task.find(filter).sort({updatedAt:-1}).skip(skip).limit(limit);
const total = await Task.countDocuments(filter);
res.status(200).json({page,
    limit,
    total,
    results: tasks.length,
    tasks,});
})

//@desc create task
//@route  POST api/tasks
//@acsess Private

const createTask=asyncHandler(async(req,res)=>{
    if(!req.body.title){
        res.status(400);
        throw new Error('Please add the title field');
    }

    const task = await Task.create({
        title:req.body.title,
        description:req.body.description,
        user:req.user._id,
        status:req.body.status,
    });

    res.status(201).json(task);
})

//@desc Update task
//@desc PUT api/tasks/:id
//@access private

const updateTask=asyncHandler(async(req,res)=>{
    const task =await Task.findById(req.params.id);
    
    if(!task){
        res.status(404);
        throw new Error('Task not found');
    }
    

    if(task.user.toString()!==req.user._id.toString()){
        res.status(401);
        throw new Error('user not authorized');
    }
    
    const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json(updatedTask);
})

//@desc Delete task
//@route DELETE api/task/:id
//@access Private

const deleteTask=asyncHandler(async(req,res)=>{
    const task = await Task.findById(req.params.id);

    if(!task){
        res.status(404);
        throw new Error('Task not found');
    }
    
      if(task.user.toString()!==req.user._id.toString()){
        res.status(401);
        throw new Error('user not authorized');
    }

    task.isDeleted=true;
    await task.save();
    res.status(200).json({id:req.params.id});

})

//@desc Update task status
//@route PATCH api/tasks/:id/status
//@access Private   
const updateTaskStatus=asyncHandler(async(req,res)=>{
     const {status}=req.body;
     if(!status){
        res.status(400);
        throw new Error('Please provide status');
     }

     const task = await Task.findById(req.params.id);

     if(!task){
        res.status(404);
        throw new Error('Task not found');
     }

     //ownershipcheck
     if(task.user.toString()!==req.user._id.toString()){
       res.status(401);
         throw new Error('user not authorized');
}

      task.status=status;
      const updated = await task.save();

      res.status(200).json(updated);
})

//@desc restore deleted task
//@route PATCH api/tasks/:id/restore
//@access private
const restoreTask=asyncHandler(async(req,res)=>{
     const task = await Task.findById(req.params.id);

     if(!task){
        res.status(404);
        throw new Error('Task not found');
     }

     if(task.user.toString()!==req.user._id.toString()){
         res.status(401);
            throw new Error('user not authorized');
     }

     task.isDeleted=false;
     const restored=await task.save();
     res.status(200).json(restored);
})
module.exports={
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    restoreTask,
};