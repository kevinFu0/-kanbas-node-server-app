import Database from '../Database/index.js';

// retrieves all courses from Database
function CourseRoutes(app) {
  // retrieves a course using id from req.params
  // responds with the corresponding course in Database.courses if found
  app.get('/api/courses/:id', (req, res) => {
    const { id } = req.params;

    const course = Database.courses.find((c) => c._id === id);
    
    if (!course) {
      res.status(404).send('Course not found');
      return;
    }
    res.send(course);
  });

  // updates a course using id from req.params
  // req.body contains updated course information
  // updates Database.courses
  app.put('/api/courses/:id', (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { c, ...course } : c
    );
    res.send(course);
  });

  // deletes a course using id from req.params
  // updates Database.courses
  app.delete('/api/courses/:id', (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  // post a new course using req.body
  // push new course to Database.courses
  // send back new course
  app.post('/api/courses', (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

  // get all courses
  app.get('/api/courses', (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });
}
export default CourseRoutes;
