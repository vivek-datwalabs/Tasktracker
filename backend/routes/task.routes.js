import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  alldeletedTask
} from '../controllers/task.controller.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/alldeletedtask',alldeletedTask)

export default router;
