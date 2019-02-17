/***/
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

// sample JWT token
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJlYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

// Use default middlewares
server.use(middlewares);

// Ensure JSON body is parsed correctly
server.use(bodyParser.json());

// Handle Sign in
server.post('/sign-in', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log('Server user name: ', username);
  console.log('Server password: ', password);
  if(username === 'demo' && password === 'demo') {
    res.json({
      name: 'demo',
      token: jwtToken
    });
    return;
  }
  res.status(422).send('Invalid Username and Password');
});

// Protect other routes
server.use((req, res, next) => {
  if(isAuthorized(req)) {
    console.log('Access Granted');
    next();
  } else {
    console.log('Access Denied');
    res.status(401).send('Unauthorized');
  }
});

// API routes
server.use(router);

// Start Server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Check Auth
function isAuthorized(req) {
  let bearer = req.get('Authorization');
  if (bearer === 'Bearer ' + jwtToken) {
    console.log('Is Authorized');
    return true;
  }
  console.log('NOT Authorized: ', bearer);
  return false;
}
