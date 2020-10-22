var gulp = require('gulp'),
	scss = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	// csscomb = require('gulp-csscomb'), //хрень какая-то вроде группирует стили
	// uncss = require('gulp-uncss'), //удаляет неиспользуемые стили ВЫПИЛИВАЕТ ДИНАМИЧЕСКИЕ СТИЛИ ВРОДЕ ACTIVE/LOCK
	csso = require('gulp-csso'), // минификатор css
	htmlmin = require('gulp-htmlmin'),
	// uglify = require('gulp-uglify'), // Не пашет с ES6
	// pipeline = require('readable-stream').pipeline, //хня для uglify который не пашет
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin');

// gulp.task('dist', ['imgmin', 'jsmin', 'htmlmin', 'cssmin', 'fonts', 'awesomecss', 'libs'], function (){
// 	console.log('Построение файлов…');
// })


// gulp.task('csscomb', function() {
// 	return gulp.src('shelter/css/pets.css')
// 		.pipe(csscomb())
// 		.pipe(gulp.dest('dist/css'));
// });

// gulp.task('uncss', function() {
//     return gulp.src('shelter/css/pets.css')
//         .pipe(uncss({
//             html: ['shelter/index.html']
//         }))
//         .pipe(gulp.dest('dist/css'));
// });

// gulp.task('jsmin', function () {
// 	return pipeline(
// 		gulp.src('shelter/js/*.js'),
// 		uglify(),
// 		gulp.dest('dist/js')
// 	);
// });

gulp.task('fonts', function() {
	return gulp.src('shelter/assets/fonts/**/*')
		.pipe(gulp.dest('dist/assets/fonts'))

})

// gulp.task('awesomecss', function() {
// 	return gulp.src('shelter/assets/css/font-awesome.min.css')
// 		.pipe(gulp.dest('dist/css'))
// })

// gulp.task('libs', function() {
// 	return gulp.src('shelter/assets/libs/*')
// 		.pipe(gulp.dest('dist/libs'))
// })

gulp.task("imgmin", function () {
	return gulp.src("shelter/assets/images/*.*")
		.pipe(imagemin([
				imagemin.gifsicle({interlaced: true}),
				imagemin.mozjpeg({quality: 75, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
					]
				})
		]))
		.pipe(gulp.dest('dist/assets/img'));
});


gulp.task("jsmin", function () {
	return gulp.src("shelter/pages/pets/*.js")
		// .pipe(rename(function (path) {
		// path.basename += ".min";
		//  }))
		.pipe(uglify(/* options */))
		.pipe(gulp.dest("dist/pages/pets/"));
});

gulp.task('htmlmin', () => {
	return gulp.src('shelter/pages/pets/index.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/pages/pets'));
});

gulp.task('cssmin', function () {
	return gulp.src('shelter/pages/pets/style.css')
		.pipe(csso({
			restructure: false,
			sourceMap: true,
			debug: true
		}))
		.pipe(gulp.dest('dist/pages/pets'));
});

gulp.task('scss', function () {
	return gulp.src('shelter/assets/scss/**/*.scss')
		.pipe(scss())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('shelter'))
		.pipe(browserSync.reload({stream:true}))
});


gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir:'shelter'
		},
		notify:false
	});
});
gulp.task('scripts', function (){
	return gulp.src(['shelter/assets/js/common.js', 'shelter/assets/libs/**/*.js'])
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('code', function(){
	return gulp.src('shelter/*.html')
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function() {
	gulp.watch('shelter/assets/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('shelter/*.html', gulp.parallel('code'));
	gulp.watch(['shelter/assets/js/common.js', 'shelter/assets/libs/**/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));
gulp.task('dist', gulp.parallel('imgmin', 'jsmin', 'htmlmin', 'cssmin', 'fonts'));
