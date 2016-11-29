'use strict';

const gulp = require('gulp');
const crust = require('./gulp-plugin');

gulp.task('default', () =>
    gulp.src('./source/**')
        .pipe(crust({ templatePath: './templates/pages/' }))
);
