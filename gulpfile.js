'use strict';

const gulp = require('gulp');
const crust = require('./index');

gulp.task('default', () =>
    gulp.src('./source/**')
        .pipe(crust({ templatePath: './templates/pages/' }))
);
