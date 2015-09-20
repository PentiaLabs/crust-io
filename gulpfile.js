/* jshint node:true */
'use strict';

var critical = require('critical').stream;
var del = require('del');
var gulp = require('gulp');
var glob = require('glob');
var merge = require('merge-stream');
var moment = require('moment');
var path = require('path');
var serverPort = 9000;
var $ = require('gulp-load-plugins')();
var M = require('./mcfly'); // TODO: publish to npm when it's done
var _ = require('lodash');

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

// Generate & Inline Critical-path CSS 
gulp.task('critical', ['build'], function () {
  var streams = [];

  glob('dist/**/*.html', {}, function (er, files) {
    _.each(files, function(filepath, i) {
      var targetpath = path.dirname(filepath);

      streams.push(
        gulp.src(filepath)
        .pipe(critical({base: targetpath, inline: true, css: ['dist/styles/maincss-3.css'] }))
        .pipe(gulp.dest(targetpath))
      );

    });

    return merge.apply(this, streams);
  });
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.jshint.reporter('fail'));
});

gulp.task('mcfly', function () {
  var dir = path.join(__dirname, 'app/source');

  return M.compile(dir, { 
    sourceFolder : 'app/source',
    templateFolder : path.join(__dirname, '/app/templates/pages/')
  });
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

gulp.task('graphics', function () {
  return gulp.src('app/graphics/**/*')
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('.tmp/graphics'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('.tmp/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
  .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
  .pipe($.flatten())
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', ['images', 'graphics'], function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'CNAME',
    '.htaccess'
    ], {
      dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['styles', 'mcfly'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
  .use(require('connect-livereload')({port: 35729}))
  .use(serveStatic('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('.tmp'));

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

gulp.task('watch', ['images','connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
  ]).on('change', $.livereload.changed);

  gulp.watch('app/images/**/*.*', ['images']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch(['app/templates/**/*.html', 'app/source/**/*.md', 'app/source/**/*.yaml'], ['mcfly']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'mcfly', 'html', 'fonts', 'extras'], function () {
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
