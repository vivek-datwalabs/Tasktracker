import { Task } from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET: Fetch all non-deleted tasks
export const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ isDeleted: false });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new task
export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Update task (title or completed status)
export const updateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updates,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Soft delete (set isDeleted to true)
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or already deleted' });
    }

    res.json({ message: 'Task soft-deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET: ALL deleted task
export const alldeletedTask=asyncHandler(async(req,res)=>{
    try{
        const tasks=await Task.find(
            {isDeleted:true}
        );

        if(!tasks){
            return res.status(404).json({message:'Task not found'})
        }

        res.json(tasks);
    }catch(err){
        res.status(200).json({message:err.message});
    }
})