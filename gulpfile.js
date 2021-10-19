const gulp        = require('gulp');
const pug         = require('gulp-pug');
const stylus 			= require('gulp-stylus');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;


gulp.task('proyectoPerritos', function () {
    browserSync.init({
      server: './',
      port: 2020
    });
    gulp.watch('assets/views/*.pug', gulp.series('generatePug'));
    gulp.watch('assets/stylus/*.styl', gulp.series('generateStylus'));
});


gulp.task('generatePug',function(){
	return gulp.src('assets/views/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('./public/'))
		.pipe(browserSync.stream());
});

gulp.task('generateStylus',function(){
	return gulp.src('assets/stylus/*.styl')
        .pipe(stylus({ use: nib(), compress: true }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});