const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify-es').default,
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	newer = require('gulp-newer'),
	responsive = require('gulp-responsive'),
	del = require('del'),
	babel = require('gulp-babel'),
	flatten = require('gulp-flatten'),
	svgo = require('gulp-svgo');

// Локальный сервер
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'dist',
		},
		notify: false,
		online: true,
		browser: 'chrome'
		// tunnel: true, tunnel: 'projectname', // Страница тунеля: http://projectname.localtunnel.me
	})
});

function bsReload(done) { browserSync.reload(); done() };

gulp.task('styles', function () {
	return gulp.src('app/**/*.css')
		.pipe(concat('styles.min.css'))
		.pipe(autoprefixer({
			// grid: true, //Гриды в IE
			overrideBrowserslist: ['last 10 versions']
		}))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', function () {
	return gulp.src('app/**/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(flatten())
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({ stream: true }))
});

var quality = 95; // Качество изображения

gulp.task('img-responsive-1x', async function () {
	return gulp.src('app/img/_src/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/img/@1x'))
		.pipe(responsive({
			'**/*': { width: '50%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg') }))
		.pipe(gulp.dest('dist/img/@1x'))
});

gulp.task('img-responsive-2x', async function () {
	return gulp.src('app/img/_src/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('app/img/@2x'))
		.pipe(responsive({
			'**/*': { width: '100%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg') }))
		.pipe(gulp.dest('dist/img/@2x'))
});

gulp.task('img-svg', async function () {
	return gulp.src('app/img/_src/**/*.svg')
		.pipe(svgo())
		.pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', async function () {
	return gulp.src('app/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('img', gulp.series('img-svg', 'img-responsive-1x', 'img-responsive-2x', bsReload));

gulp.task('cleanimg', function () {
	return del(['app/img/@*'], { force: true })
});

gulp.task('code', function () {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
	gulp.watch('app/**/*.css', gulp.parallel('styles'));
	gulp.watch('app/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/fonts/*', gulp.parallel('fonts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('img', 'fonts', 'styles', 'scripts', 'browser-sync', 'watch'));
