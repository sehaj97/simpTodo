import express from 'express';
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
    res.render('tasks', { posts });
})

app.get('/new-task', (req, res) => {
    res.render('new-task', { tasks });
})


app.post('/add-task', (req, res) => {
    const { tasktitle } = req.body;
    tasks.push(tasktitle);
    res.redirect('/');
})