import express, { Request } from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

type Task = {
  id: number;
  name: string;
  complete: boolean;
}

const tasks: Task[] = []

let currentId: number = 1

app.get('/me', (req, res) => {
  return res.json({"name" : "Nuttapong Boonsala",
                  "code" : "630610744"})
})

app.post('/todo', (req: Request<{}, {}, Task>, res) => {
if(typeof(req.body.name) === 'string' && typeof(req.body.complete) === 'boolean' && req.body.name !== ""){
  const newTask: Task ={
    id : currentId, 
    name: req.body.name,
    complete: req.body.complete
  }
  // const newTask = req.body
  tasks.push(newTask)
  currentId += 1

  return res.json({status : 'success', tasks: tasks})

}else
  return res.json({status : 'failed', "message" : "Invalid input data"})
 
})



app.get('/todo', (req, res) => {

  if(req.query.order === "")
    return res.json({ status: 'success', tasks })
  // else if (req.query.order === "asc")


  // try to call /todo?q1=data1&q2data2
  // you can read query parameters with "req.query"
  // console.log(req.query.q1)
 
  
})


//Heroku will set process.env.PORT to server port
//But if this code run locally, port will be 3000
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server is running at port' + port)
})