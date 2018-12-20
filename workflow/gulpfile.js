const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

/* ============================================== 
    DEVELOPMENT TASKS
=============================================== */

// sass/css
gulp.task( 'sass-dev', () => {
    return gulp.src( './src/sass/**/*.sass' )
        .pipe( sass({outputStyle: 'expanded'}).on('error', sass.logError) )
        .pipe( gulp.dest('./src/css') );
});

gulp.task( 'babel', ['concat-dev'], () => {
    return gulp.src( './src/js/script.js' )
        .pipe( babel({ presets: ['@babel/env'] }) )
        .pipe( gulp.dest('./src/js') )
})

// merge js
gulp.task('concat-dev', () => {
    return gulp.src(['./src/js/lib/*.js', './src/js/scripts/*.js'])
        .pipe( concat('script.js') )
        .pipe( gulp.dest('./src/js') );
});


/* ============================================== 
    PRODUCTION TASKS
=============================================== */
gulp.task( 'html', () => {
    return gulp.src( './src/*.html' )
        .pipe( gulp.dest('./dist') );
});

gulp.task('sass-prod', () => {
    return gulp.src( './src/sass/**/*.sass' )
        .pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError) )
        .pipe( gulp.dest( './dist/css') );
});

const uglifyOption = {
    mangle: { toplevel: true },
    output: { beautify: false }
};
gulp.task( 'uglifyjs', () => {
    return gulp.src( './src/js/script.js' )
        .pipe( uglify(uglifyOption) )
        .pipe( gulp.dest('./dist/js') );
});

gulp.task( 'copyimg', () => {
    return gulp.src( './src/img/*' )
    .pipe( gulp.dest('./dist/img') );
});


/* ============================================== 
    WATCH TASKS
=============================================== */
// watch
gulp.task('watch', () => {
    gulp.watch( './src/sass/*', ['sass-dev', 'sass-prod'] );
    gulp.watch( './src/js/scripts/*', ['babel'] );
    gulp.watch( './src/js/script.js', ['uglifyjs'] );
    gulp.watch( './src/*.html', ['html'] );
    gulp.watch( './src/img/*', ['copyimg'] );
});
