var gulp = require('gulp');

gulp.task('copy3party', function() {

    gulp.src('node_modules/rxjs/**/*')
   .pipe(gulp.dest('app/scripts/thirdparty/rxjs'));
   
    gulp.src('node_modules/angular2-in-memory-web-api/**/*')
   .pipe(gulp.dest('app/scripts/thirdparty/angular2-in-memory-web-api'));
   
      gulp.src('node_modules/@angular/**/*')
   .pipe(gulp.dest('app/scripts/thirdparty/@angular'));   
   
      gulp.src('node_modules/angular2-logger/**/*')
   .pipe(gulp.dest('app/scripts/thirdparty/angular2-logger'));   
    
        gulp.src('node_modules/zone.js/dist/*')
   .pipe(gulp.dest('app/scripts/obrowsersp/zone'));  
    
         gulp.src('node_modules/core-js/client/shim.min.js')
   .pipe(gulp.dest('app/scripts/obrowsersp')); 
    
             gulp.src('node_modules/reflect-metadata/Reflect.js')
   .pipe(gulp.dest('app/scripts/obrowsersp')); 

                 gulp.src('node_modules/systemjs/dist/*')
   .pipe(gulp.dest('app/scripts/obrowsersp/systemjs')); 

    
});