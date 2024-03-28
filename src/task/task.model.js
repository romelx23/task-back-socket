const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    color: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

TaskSchema.methods.toJSON = function () {
    const { __v, _id, ...task } = this.toObject(); //eslint-disable-line
    task.uid = _id;
    return task;
};

const Task = model("Task", TaskSchema);

module.exports = Task;
