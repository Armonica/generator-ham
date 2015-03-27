'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the glorious ' + chalk.red('H.A.M.') + ' generator!'
    ));

    var prompts = [{
      type: 'text',
      name: 'name',
      message: 'What would you like to call your HAM Framework?',
      default: this.appname
    }, {
      type: 'text',
      name: 'author',
      message: 'Who\'s name should I put as the author in the package.json?'
    }];

    this.prompt(prompts, function (props) {

      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_package.json', 'package.json');

      this.directory('config', 'config');
      this.directory('test', 'test');

      this.copy('gulpfile.js', 'gulpfile.js');
      this.copy('index.js', 'index.js');
      this.copy('.gitignore', '.gitignore');
      this.copy('.travis.yml', '.travis.yml');
      this.copy('readme.md', 'readme.md');

      this.mkdir('plugins');

      this.template('_bower.json', 'bower.json');
      this.copy('.bowerrc', '.bowerrc');
      this.directory('plugins/assets', 'plugins/assets');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});