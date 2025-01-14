import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    description:{
        type: String
    },

    status:{
        type: String,
        enum: ['Completed' , 'Pending'],
        default: 'Pending'
    },

    dueDate:{
        type: Date
    },
} , {timestamps: true});

// Model Defining
const Task = mongoose.model('Task' , taskSchema);

//Here we are exporting the model so it can be used in other files
export default Task;