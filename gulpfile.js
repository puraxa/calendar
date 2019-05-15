let gulp = require('gulp');
let minify = require('gulp-html-minifier2');
let uglify = require('gulp-uglify-es').default;
let cleancss = require('gulp-clean-css');
let ts = require('gulp-typescript');

let tsProject = ts.createProject('tsconfig.json');

gulp.task('minify',async function(){
    gulp.src('./src/index.html')
        .pipe(minify({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('cleancss', async function(){
    gulp.src('./src/style.css')
        .pipe(cleancss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('ts', async function(){
    gulp.src('./src/*.ts')
        .pipe(tsProject())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.parallel(['minify', 'cleancss', 'ts']));