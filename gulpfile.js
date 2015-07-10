/* jshint node:true */
'use strict';

var dirToJson = require('dir-to-json');
var gulp = require('gulp');
var merge = require('merge-stream');
var moment = require('moment');
var path = require('path');
var Q = require('q');
var serverPort = 9000;
var $ = require('gulp-load-plugins')();
var _ = require('lodash');
var marked = require('marked');
var fs = require('fs');

var sourceFolder = 'app/source';

var dirTree = function (filename) {
  var folders = Q.defer();

  dirToJson(filename, function( err, dirTree ){
    if( err ){
      throw err;
    }else{
      folders.resolve(dirTree);
    }
  });

  return folders.promise;
};

var generate = function (lvl) {
  var name = lvl.name,
  children = lvl.children,
  type = lvl.type,
  mdpath,
  mdcontent,
  opts;

  if (name === '..' || name === '') {
    return;
  }

  if (type === 'directory' && children && children.length) {
    console.log(lvl.path);
    mdpath = path.join(__dirname, sourceFolder, lvl.path, 'content.md');

    // TODO: check for existing md
    if (fs.existsSync(mdpath)) {
      mdcontent = fs.readFileSync(mdpath, 'utf8').replace(/\r\n|\r/g, '\n');

      console.log('Generate', lvl.path, '(', mdpath, ')');

      console.log('mdcontent:', mdcontent);

      opts = {
        defaults: { 
          cache: false,
          locals : { 
            markdown: function markdown() {
              return marked(mdcontent);
            } 
          }
        }
      };

      // put generatedcontent into swig
      gulp.src('./app/templates/page.html')
      .pipe($.swig(opts))
      .pipe(gulp.dest(path.join('.tmp', name + '.html')));
  }

  _.each(children, generate);
}
};

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
  .pipe($.plumber())
  .pipe($.sass({
    style: 'expanded',
    precision: 10
  }))
  .pipe($.autoprefixer({browsers: ['last 1 version']}))
  .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.jshint.reporter('fail'));
});

gulp.task('temp', function () {
  var dir = path.join(__dirname, sourceFolder);

  dirTree(dir).then(function (structure) {
    var children = structure.children;

    _.each(children, generate);
  }).done();
});

gulp.task('template', function () {
  // var folders = getFolders('./app/data/');
  var folders = [];
  var defaultLang = '';

  var tasks = folders.map(function(folder) {

    var data = require('./app/data/' + folder + '/strings.json');
    data.languages = folders;
    data.currentLanguage = folder;
    data.generatedTime = moment().format('MMM Do YY, HH:mm:ss');

    console.log('Generating: ' + folder);
    console.log('Data file loaded is:', data);

    return gulp.src('./app/templates/pages/*.html')
    .pipe($.data(data))
    .pipe($.swig({ defaults: { cache: false } }))
    .pipe(gulp.dest('.tmp/' + folder))
      .pipe($.if(defaultLang === folder, gulp.dest('.tmp'))); // Put default lang in root
    });

  return merge(tasks);
});

gulp.task('html', ['styles'], function () {
  var lazypipe = require('lazypipe');
  var cssChannel = lazypipe()
  .pipe($.csso)
  .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('.tmp/**/*.html')
  .pipe(assets)
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', cssChannel()))
  .pipe(assets.restore())
  .pipe($.useref())
  .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
  .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
  .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
  .pipe($.flatten())
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'CNAME'
    ], {
      dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['styles'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
  .use(require('connect-livereload')({port: 35729}))
  .use(serveStatic('.tmp'))
  .use(serveStatic('app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

    require('http').createServer(app)
    .listen(serverPort)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:' + serverPort);
    });
  });

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:' + serverPort);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
  .pipe(wiredep())
  .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
  .pipe(wiredep({exclude: ['bootstrap-sass-official']}))
  .pipe(gulp.dest('app'));

  gulp.src('app/templates/**/*.html')
  .pipe(wiredep({exclude: ['bootstrap-sass-official']}))
  .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    '.tmp/**/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*'
    ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch(['app/templates/**/*.html', 'app/data/**/*.json'], ['template']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'template', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('deploy', ['build'], function () {
	var ghpages = require('gh-pages');
	var path = require('path');

	ghpages.publish(path.join(__dirname, 'dist'), function(err) {
		console.error(err);
	});
});

gulp.task('deploy-no-build', function () {
	var ghpages = require('gh-pages');
	var path = require('path');

	ghpages.publish(path.join(__dirname, 'dist'), function(err) {
		console.error(err);
	});
});
