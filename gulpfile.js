let gulp = require('gulp');
let minify = require('gulp-html-minifier2');
let uglify = require('gulp-uglify-es').default;
let cleancss = require('gulp-clean-css');
let ts = require('gulp-typescript');
let browserSync = require('browser-sync');

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

gulp.task('server', async function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
})

gulp.task('reload',async function(){
    browserSync.reload();
})

gulp.task('watch', function(){
    gulp.watch('./src/*.ts', gulp.series('ts', 'reload'));
    gulp.watch('./src/*.html', gulp.series('minify', 'reload'));
    gulp.watch('./src/*.css', gulp.series('cleancss', 'reload'));
});

gulp.task('browsersync', gulp.parallel('server','watch'));

gulp.task('default', gulp.parallel(['minify', 'cleancss', 'ts']));