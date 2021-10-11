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
  return res.json({"name" : "Nuttapong Boonsala", "code" : "630610744"})
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
  return res.status(400).json({status : 'failed', "message" : "Invalid input data"})
 
})

app.get('/todo', (req, res) => {

  if (req.query.order === "asc"){
    tasks.sort(function(a,b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })

    return res.json({ status: 'success', tasks })

  }else if(req.query.order === "dasc"){
    tasks.sort(function(a,b){
      if(a.name < b.name) { return 1; }
      if(a.name > b.name) { return -1; }
      return 0;
    })

    return res.json({ status: 'success', tasks })
  }else{
    tasks.sort(function(a,b){
      if(a.id < b.id) { return -1; }
      if(a.id > b.id) { return 1; }
      return 0;
    })
    return res.json({ status: 'success', tasks })
  }
    

  // try to call /todo?q1=data1&q2data2
  // you can read query parameters with "req.query"
  // console.log(req.query.q1)
  
})

app.put('/todo/:id', (req, res) => {
    const selectedTask = tasks.find(x => x.id === parseInt(req.params.id))
    if(selectedTask){
      selectedTask.complete = !selectedTask.complete
      return res.json({ status: 'success', task: selectedTask })
    }else
      return res.status(404).json({
        status: 'failed',
        message: 'Id not found'
      })

})

app.delete('/todo/:id', (req, res) => {
  tasks.sort(function(a,b){
    if(a.id < b.id) { return -1; }
    if(a.id > b.id) { return 1; }
    return 0;
  })
  const id = parseInt(req.params.id)
  const foundIndex = tasks.findIndex(x => x.id === id)
  if(foundIndex > -1){
      tasks.splice(foundIndex, 1)
      return res.json({status: 'success', task: tasks})
  }else
      return res.status(404).json({
          status: 'failed',
          message: 'Id not found'
      })
    
})


//Heroku will set process.env.PORT to server port
//But if this code run locally, port will be 3000
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server is running at port' + port)
})