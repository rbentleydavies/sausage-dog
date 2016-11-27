var webpack = require ('webpack');
var webpackConfig = require( '../webpack.config.prod.js');
var chalk = require ('chalk');

webpack(webpackConfig).run((err, stats) => {
  if (err){
    console.log(chalk.red(err));
    return 1;
  }
  return 0;
})
