// const Item = require("../item/item.model");
const Task = require("./task.model");
const taskJoiSchema = require("./task.schema");

const getTask = async (req, res) => {
    const { id } = req.params;
    const votation = await Task.findById(id);
    // const items = await Item.find({ votation: id });

    res.status(200).json({
        votation,
        // items,
    });
};

const getTasks = async (req, res) => {
    const votations = await Task.find();
    res.status(200).json({
        total: votations.length,
        votations,
    });
};

const createTask = async (req, res) => {
    const { ...rest } = req.body;

    const validation = taskJoiSchema.validate(rest);

    if (validation.error) {
        return res.status(400).json({
            msg: "Error en la validación de los campos",
            error: validation.error.details,
        });
    }

    // if (!items) return res.status(400).json({ msg: "No hay items" });
    // if (!items.length < 0)
    //     return res.status(400).json({ msg: "No hay elementos en el arreglo" });

    const task = new Task({
        ...rest,
    });

    try {
        const newVotation = await task.save();
        // const votationItems = await Item.insertMany(items);
        res.status(200).json({
            msg: "Tarea creada",
            votation: newVotation,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al crear la votación",
        });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    const validation = taskJoiSchema.validate(rest);

    if (validation.error) {
        return res.status(400).json({
            msg: "Error en la validación de los campos",
            error: validation.error.details,
        });
    }

    try {
        const votation = await Task.findByIdAndUpdate(id, rest, { new: true });
        res.status(200).json({
            msg: "Tarea actualizada",
            votation,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al actualizar la tarea",
        });
    }
};

module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
};
