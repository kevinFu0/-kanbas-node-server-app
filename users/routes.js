import * as dao from "./dao.js";
// let currentUser = null;
function UserRoutes(app) {

  // creates new user using req.body
  // returns new user
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };


  // deletes user with id from path parameter
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

 
  // sends back all users
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  // sends back user with id from req.params
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };



  // user id as path parameter, req.body contains updated user info
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };

  // 
  const signup = async (req, res) => {
    // check if username already exists
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    // username is available, create new user make them the currentUser
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  
  // gets username and password from req.body
  // sends back user if found
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };


  // sets currentUser to null
  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };


  // curentUser is who's logged in
  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };

  app.post("/api/users/signout", signout);

  
  app.post("/api/users/signup", signup);

  app.delete("/api/users/:userId", deleteUser);

  
  app.get("/api/users/:userId", findUserById);

  app.post("/api/users", createUser);

  app.get("/api/users", findAllUsers);

  app.put("/api/users/:userId", updateUser);

  
  

  

  app.post("/api/users/signin", signin);
 
  app.post("/api/users/account", account);
}
export default UserRoutes;