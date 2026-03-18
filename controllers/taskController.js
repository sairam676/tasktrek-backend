const asyncHandler = require('express-async-handler');
const Task = require('..//models/taskModel');
const taskService = require("../services/taskService");

//@desc Get user tasks
//@route api/tasks
//@acsess Private
const getTasks =asyncHandler(async(req,res)=>{
    const filter = {user:req.user._id,isDeleted:false};
    //option status filter
    if(req.query.status){
        filter.status=req.query.status
    }

    const page = parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    const skip=(page-1)*limit;

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
    const io=req.app.get("io");
    const task = await taskService.createTask({
    title:req.body.title,
    userId:req.user._id,
    io,
   });
    
   res.status(201).json(task);
})

//@desc Update task
//@desc PUT api/tasks/:id
//@access private

const updateTask=asyncHandler(async(req,res)=>{
    const io=req.app.get("io");
    const task = await taskService.updateTask({
    taskId: req.params.id,
    userId: req.user._id,
    updates: req.body,
    io,
    });
    res.json(task);
});

//@desc Delete task
//@route DELETE api/task/:id
//@access Private

const deleteTask=asyncHandler(async(req,res)=>{
    const io = req.app.get("io");
    await taskService.deleteTask({
    taskId: req.params.id,
    userId: req.user._id,
    io,
  });
  res.json({ id: req.params.id });

})

//@desc Update task status
//@route PATCH api/tasks/:id/status
//@access Private   
const updateTaskStatus=asyncHandler(async(req,res)=>{
    const task = await taskService.updateTaskStatus({
    taskId: req.params.id,
    userId: req.user._id,
    status: req.body.status,
  });
  res.json(task);
})

//@desc restore deleted task
//@route PATCH api/tasks/:id/restore
//@access private
const restoreTask=asyncHandler(async(req,res)=>{
    const task = await taskService.restoreTask({
    taskId: req.params.id,
    userId: req.user._id,
   });
   res.json(task); 
})

//@desc assign task to user
//@route PATCH api/tasks/:id/assign
//@access private
const assignTask=asyncHandler(async(req,res)=>{
     const io = req.app.get("io");
  const task = await taskService.assignTask({
    taskId: req.params.id,
    ownerId: req.user._id,
    assigneeId: req.body.assignedTo,
    io,
  });
  res.json(task);
})


module.exports={
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    restoreTask,
    assignTask,
};