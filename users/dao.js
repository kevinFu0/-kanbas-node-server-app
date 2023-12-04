import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

  // uses findOne(from Mongoose model) to retrieve a document w/ username and password
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

// updates a document using key id and updates the fields in user
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId }); 




