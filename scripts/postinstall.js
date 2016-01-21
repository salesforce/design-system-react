if (process.env.HEROKU) {
  console.log('Compiling webpack');
  require('webpack')(require('../webpack.config.heroku'), function (err, stats) {
    if (err) throw err;
  });
}
