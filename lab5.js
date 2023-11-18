const assignment = {
  id: 1,
  title: 'NodeJS Assignment',
  description: 'Create a NodeJS server with ExpressJS',
  due: '2021-10-10',
  completed: false,
  score: 0,
};

// testing CRUD with arrays
const todos = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false },
  { id: 4, title: 'Task 4', completed: true },
];

const Lab5 = (app) => {

  // create a new todo based on request body
  // push to todos array
  // sends the new todo back to client
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // updates todo using id using request body
  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));


    if (!todo) {
      res.res
        .status(404)
        .json({ message:
          `Unable to update Todo with ID ${id}` });
      return;
    }


    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });



  // // update todo.title using id
  // app.get("/a5/todos/:id/title/:title", (req, res) => {
  //   const { id, title } = req.params;
  //   const todo = todos.find((t) => t.id === parseInt(id));
  //   todo.title = title;
  //   res.json(todos);
  // });


  // deletes todo using id
  // sends back 200 status code
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));

    if (!todo) {
      res.res
        .status(404)
        .json({ message:
          `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });



  // app.get("/a5/todos/:id/delete", (req, res) => {
  //   const { id } = req.params;
  //   const todo = todos.find((t) => t.id === parseInt(id));
  //   // start index, delete count
  //   todos.splice(todos.indexOf(todo), 1);
  //   res.json(todos);
  // });



  // //create a new todo
  // app.get('/a5/todos/create', (req, res) => {
  //   const newTodo = {
  //     id: new Date().getTime(),
  //     title: 'New Task',
  //     completed: false,
  //   };
  //   todos.push(newTodo);
  //   res.json(todos);
  // });

  app.get('/a5/todos', (req, res) => {
    // filter the array based on query parameters completed
    // no query parameters, return all todos
    // e.g., /a5/todos?completed=true
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedTodos = todos.filter((t) => t.completed);
      res.json(completedTodos);
      return;
    }

    res.json(todos);
  });

  // geting todos by id
  app.get('/a5/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  // modifies assignment.title
  app.get('/a5/assignment/title/:newTitle', (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  app.get('/a5/assignment/score/:newScore', (req, res) => {
    const { newScore } = req.params;
    assignment.score = newScore;
    res.json(assignment);
  });

  app.get('/a5/assignment/completed/:newCompleted', (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted;
    res.json(assignment);
  });

  // use .json() instead of .send() if you know
  // the response is formatted as JSON
  app.get('/a5/assignment', (req, res) => {
    res.json(assignment);
  });

  // getting assignment.title
  app.get('/a5/assignment/title', (req, res) => {
    res.json(assignment.title);
  });

  app.get('/a5/welcome', (req, res) => {
    res.send('Welcome to Assignment 5');
  });

  // e.g., a5/calculator?a=5&b=2&operation=add
  // retrieve a, b, and operation parameters in query
  app.get('/a5/calculator', (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
      case 'add':
        result = parseInt(a) + parseInt(b);
        break;
      case 'subtract':
        result = parseInt(a) - parseInt(b);
        break;
      default:
        result = 'Invalid operation';
    }
    res.send(result.toString());
  });

  // route expects 2 path parameters after /a5/add
  app.get('/a5/add/:a/:b', (req, res) => {
    // retrieve path parameters as strings
    const { a, b } = req.params;
    // parse as integers and adds
    const sum = parseInt(a) + parseInt(b);
    // sum as string sent back as response
    // don't send integers since can be interpreted as status
    res.send(sum.toString());
  });
  app.get('/a5/subtract/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  });
};

export default Lab5;
