let tasks = [];

export const createTask = (req, res)=>{
    console.log(req.body);
    const {title, description, status} = req.body;

    if(!title || !description || !status){
        throw new Error("the data is missing");
    }

    const createdTask = {_id: Date.now().toString(),title, description, status};
    tasks.push(createdTask);

   res.status(201).json({ message: "Task created", task: createdTask });
};


export const getTasks = (req, res)=>{
    res.status(200).send({message: "success", data: tasks});
}

export const deleteTask = (req, res) => {
    const { id } = req.params;
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task._id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
};
    
