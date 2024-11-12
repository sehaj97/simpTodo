import express from 'express';
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
    res.render('tasks', { tasks });
})

app.get('/new-task', (req, res) => {
    res.render('new-task', { tasks });
})


app.post('/add-task', (req, res) => {
    const { description } = req.body;

    let id = 0;
    if (tasks.length) {
        id = (parseInt(tasks[tasks.length - 1].id) + 1).toString();
    } else {
        id = (tasks.length + 1).toString();
    }

    const newTask = {
        id,
        description,
    }
    tasks.push(newTask);
    res.redirect('/');
})

app.post('/delete-task/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(p => p.id === taskId);
    const index = tasks.indexOf(task);
    if (index > -1) { // only splice array when item is found
        tasks.splice(index, 1); // 2nd parameter means remove one item only
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});