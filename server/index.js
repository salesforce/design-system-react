var path = require('path')
var express = require('express')
var auth = require('basic-auth')
var cors = require('cors')
var bodyParser = require('body-parser')
var babel = require('babel-core')

var app = express()
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port
  console.info('Express listening on port ' + port)
})

app.use(function (req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    var user = auth(req)
    var username = process.env.AUTH_USERNAME;
    var password = process.env.AUTH_PASSWORD;
    var unauthorized = function () {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    }
    if (!username || !password) return unauthorized();
    if (!user || user.name !== username || user.pass !== password) {
      return unauthorized();
    }
  }
  next();
});

app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(bodyParser.json());

app.get('/assets/bundle/*', function (req, res, next) {
  // During devlopment, serve /assets/bundle via webpack on port 3000
  if (process.env.NODE_ENV !== 'production') {
    return res.redirect(301, 'http://localhost:3001' + req.path);
  }
  next();
});

app.post('/api/transform/js', function (req, res) {
  try {
    var result = babel.transform(req.body.js, {
      presets: ['react', 'es2015', 'stage-1']
    })
    res.json({ response: result.code })
  } catch (err) {
    res.json({ error: err.message })
  }
})

app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/assets', express.static(path.resolve(__dirname, '../node_modules/@salesforce-ux/design-system/assets')))
