//gulpfile.js
var gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

//script paths
var jsFiles = 'lib/**/*.js'
jsDest = 'lib'

gulp.task('package', function () {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('breadknife.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
})

gulp.task('default', function () {
    // Default task code
    console.log('GULP GULP GULP')
})