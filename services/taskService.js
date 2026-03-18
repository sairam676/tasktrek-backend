const Task = require("../models/taskModel");
const notifyUser = require("./notificationService");

const createTask = async ({ title, userId, io }) => {
  const task = await Task.create({
    title,
    user: userId,
  });

  // realtime state sync
  io.to(`user:${userId}`).emit("task:created", {
    taskId: task._id,
    title: task.title,
    user: userId,
  });

  // persisted notification
  await notifyUser({
    io,
    userId,
    type: "task_created",
    message: `Task "${task.title}" was created`,
    data: { taskId: task._id },
  });

  return task;
};

const updateTask = async ({ taskId, userId, updates, io }) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.user.toString() !== userId.toString())
    throw new Error("Not authorized");

  Object.assign(task, updates);
  const updated = await task.save();

  io.to(`task:${updated._id}`).emit("task:updated", {
    taskId: updated._id,
    title: updated.title,
    status: updated.status,
  });

  await notifyUser({
    io,
    userId,
    type: "task_updated",
    message: `Task "${updated.title}" was updated`,
    data: { taskId: updated._id },
  });

  return updated;
};

const deleteTask = async ({ taskId, userId, io }) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.user.toString() !== userId.toString())
    throw new Error("Not authorized");

  task.isDeleted = true;
  await task.save();

  io.to(`user:${userId}`).emit("task:deleted", {
    taskId: task._id,
  });

  await notifyUser({
    io,
    userId,
    type: "task_deleted",
    message: `Task "${task.title}" was deleted`,
    data: { taskId: task._id },
  });

  return task;
};

const assignTask = async ({ taskId, ownerId, assigneeId, io }) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.user.toString() !== ownerId.toString())
    throw new Error("Not authorized");

  task.assignedTo = assigneeId;
  await task.save();

  io.to(`user:${assigneeId}`).emit("task:assigned", {
    taskId: task._id,
    assignedBy: ownerId,
  });

  await notifyUser({
    io,
    userId: assigneeId,
    type: "task_assigned",
    message: `You were assigned task "${task.title}"`,
    data: { taskId: task._id },
  });

  return task;
};

const updateTaskStatus = async ({ taskId, userId, status }) => {
  if (!status) throw new Error("Please provide status");

  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.user.toString() !== userId.toString())
    throw new Error("Not authorized");

  task.status = status;
  return await task.save();
};

const restoreTask = async ({ taskId, userId }) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.user.toString() !== userId.toString())
    throw new Error("Not authorized");

  task.isDeleted = false;
  return await task.save();
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  assignTask,
  updateTaskStatus,
  restoreTask,
};