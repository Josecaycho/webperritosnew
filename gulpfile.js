const browserSync	= require('browser-sync').create();
const concat 			= require('gulp-concat');
const favicon 		= require('gulp-to-ico');
const imagemin 		= require('gulp-imagemin');
const gulp 				= require('gulp');
const nib 				= require('nib');
const pug 				= require('gulp-pug');
const stylus 			= require('gulp-stylus');
const uglify 			= require('gulp-uglify');


gulp.task('proyectoPerritos', function () {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    gulp.watch('assets/img/*.{png,jpg,jpeg,gif,svg}', gulp.series('generateImage'));
    gulp.watch('assets/js/*.js', gulp.series('generateJs'));
    gulp.watch('assets/templates/*.pug', gulp.series('generatePug'));
    gulp.watch('assets/stylus/*.styl', gulp.series('generateStylus'));
});

/** Con esta tarea se genera las imagenes ya optimizadas **/
gulp.task('generateImage',function(){
  return gulp.src('assets/img/*.{png,jpg,jpeg,gif,svg}')
       .pipe(imagemin())
       .pipe(gulp.dest('./public/img/'))
       .pipe(browserSync.stream());
});

/** Con esta tarea se genera el archivo app.js para unir todos los archivos .js  **/
gulp.task('generateJs',function(){
  return gulp.src('assets/js/*.js')
       .pipe(concat('app.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./public/js/'))
       .pipe(browserSync.stream());
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