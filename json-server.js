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
  if(username === 'demo' && password === 'demo') {
    res.json({
      name: 'SitePoint User',
      token: jwtToken
    });

    res.send(422, 'Invalid username and password');
  }
});

// Protect other routes
server.use((req, res, next) => {
  if(isAuthenticated(req)) {
    console.log('Access Granted');
    next();
  } else {
    console.log('Access Denied');
    res.sendStatus(401);
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
  if(bearer === 'Bearer' + jwtToken) {
    return true;
  }
  return false;
}
