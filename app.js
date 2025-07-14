const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



let toDoList = [];

app.get("/" , (req , res) =>{
    res.render("home.ejs",{ toDoList });
})

app.post("/",(req,res)=>{
    let newTask = req.body.work
    if(newTask){
        toDoList.push(newTask);
    }
    res.redirect("/");
})

app.post("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const updatedTask = req.body.updatedTask;

    if (index >= 0 && index < toDoList.length && updatedTask) {
        toDoList[index] = updatedTask;
        res.status(200).send("Task updated");
    } else {
        res.status(400).send("Invalid task index or empty task");
    }
});

app.post("/delete/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (index >= 0 && index < toDoList.length) {
        toDoList.splice(index, 1); // Remove one item at position index
    }

    res.redirect("/");

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    });
});

app.listen(PORT, () => {
    console.log("Server started on http://localhost:8080");
});
