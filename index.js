const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 4000

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.json({ message: "hello world" })
})

app.get('/todos', (req, res) => {
    const filePath = path.join(__dirname, 'data.json')

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Internal server error")
            return
        }

        try {
            const jsonData = JSON.parse(data)
            res.status(200).json({ "data": jsonData })
            return
        } catch {
            res.status(500).send("Internal server error")
            return
        }
    })
})

app.post('/add', (req, res) => {

    const { todo } = req.body

    if (!todo) {
        res.status(400).json({ messgae: "Bad request" })
    }

    const filePath = path.join(__dirname, 'data.json')

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Internal server error")
            return
        }

        try {

            const fileData = JSON.parse(data)
            const todoArr = fileData?.todos

            const newTodo = {
                "id": todoArr.length + 1,
                "todo": todo,
                "completed": false,
                "userId": Math.floor(Math.random() * 100)
            }

            todoArr[todoArr.length] = newTodo


            res.status(200).json({ message: "success", todos: todoArr })
            return

        } catch (error) {
            res.status(500).send("Internal server error")
            return
        }
    })


})

app.listen(PORT, () => {
    console.log("app running on PORT 4000")
})
