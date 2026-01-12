const express =require('express');
const router = express.Router();
const {protect}=require('../middlewear/authMiddlewear');
const {getTasks,createTask,updateTask,deleteTask,updateTaskStatus,restoreTask, assignTask}=require('../controllers/taskController');

router.get('/',protect,getTasks)
    .post('/',protect,createTask);

router.route('/:id')
    .put(protect,updateTask)
    .delete(protect,deleteTask);

router.route('/:id/status')
    .patch(protect,updateTaskStatus);

router.route('/:id/restore')
.patch(protect,restoreTask);

router.patch("/:id/assign",protect,assignTask);

module.exports=router;