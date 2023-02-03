
// Dessa maneira tive muita dificuldade, muitos erros.

// const gulp = require('gulp')
// const concat = require("gulp-concat") 
// const cssmin = require("gulp-cssmin")
// const rename = require("gulp-rename")
// const uglify = require("gulp-uglify")
// const image = require('gulp-images')


// Import que o ECMAScript reconhece.

import gulp from 'gulp';
const { series, parallel } = gulp
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';

browserSync.create()
const reload = browserSync.reload

function tarefasCSS(cb) {

    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './vendor/owl/css/owl.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
        './vendor/jquery-ui-ligth/jquery-ui.min.css',
        './vendor/jquery-ui-ligth/jquery-ui.css',
        './src/css/style.css'
    ])  .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' })) // libs.min.css
        .pipe(gulp.dest('./dist/css'))

    return cb()
}

function tarefasJS(cb) {

    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './vendor/owl/js/owl.js',
        './vendor/jquery-mask/dist/jquery.mask.js',
        './vendor/jquery-ui-ligth/jquery-ui.js',
        './src/js/custom.js',
        './src/js/validations.js'
    ])  .pipe(babel({
        comments: true,
        presets: ['@babel/env']
    }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) // libs.min.js
        .pipe(gulp.dest('./dist/js'))

    return cb();
}

function tarefasImagem(cb) {

    gulp.src('./src/images/*')
        .pipe(imagemin({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
    
    return cb()
}

// POC
function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/'))

    return callback();
}

gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: './dist',
        }
    })
    gulp.watch('./src/**/*').on('change', process)
    gulp.watch('./dist/**/*').on('change', reload)
})

function end(cb){
    console.log('done')
    return cb()
}

// Esse é o export que foi possivel com o ECMAScript.
const process = parallel(tarefasHTML, tarefasJS, tarefasCSS, end) 

export default process

export const styles = tarefasCSS;
export const scripts = tarefasJS;
export const images = tarefasImagem;