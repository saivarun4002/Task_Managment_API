import express from 'express';
import {
    createTask,
    getTaskById,
    getTasks,
    updateTask,
    deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
