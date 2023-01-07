
// Dessa maneira tive muita dificuldade, muitos erros.

// const gulp = require('gulp')
// const concat = require("gulp-concat") 
// const cssmin = require("gulp-cssmin")
// const rename = require("gulp-rename")
// const uglify = require("gulp-uglify")
// const image = require('gulp-images')


// Import que o ECMAScript reconhece.

import gulp from 'gulp';
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import image from 'gulp-images';


function tarefasCSS(cb){

    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.css',
        './vendor/owl/css/owl.css',
        "./node_modules/@fortawesome/fontawesome-free/css/fontawesome.css",
        './vendor/jquery-ui-ligth/jquery-ui.min.css',
        "./vendor/jquery-ui-ligth/jquery-ui.css"
    ])
        .pipe(concat('libs.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'})) // libs.min.css
        .pipe(gulp.dest('./dist/css'))

}

function tarefasJS(){

    return gulp.src('./vendor/**/*.js')
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) // libs.min.js
        .pipe(gulp.dest('./dist/js'))
}

function tarefasImagem(){

    return gulp.src('./src/images/*')
        .pipe(image({
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
}

// O ensinado no curso.

// exports.styles = tarefasCSS
// exports.scripts = tarefasJS
// exports.images = tarefasImagem

// Esse é o export que foi possivel com o ECMAScript.
export const styles = tarefasCSS;
export const scripts = tarefasJS;
export const images = tarefasImagem;