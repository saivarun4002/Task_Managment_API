import Task from '../models/Task.js';


export const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const newTask = await Task.create({ title, description, status, dueDate });
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { status, title, sortBy } = req.query;
        const query = {};
        if (status) {
            query.status = status; 
        }
        if (title) {
            query.title = { $regex: title, $options: 'i' }; 
        }
        let sortCriteria = {};
        if (sortBy) {
            const [field, order] = sortBy.split(':');
            sortCriteria[field] = order === 'desc' ? -1 : 1;
        }
        const tasks = await Task.find(query).sort(sortCriteria);

        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const task = await Task.findByIdAndUpdate(id, update, { new: true });
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid task ID' });
        }
        
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};