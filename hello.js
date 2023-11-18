
// function accepts app reference to express module
// to create routes here

const Hello = (app) => {
  app.get('/hello', (req, res) => {
    res.send('Life is good!')
  });
  app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')
  });
  


}

export default Hello;
