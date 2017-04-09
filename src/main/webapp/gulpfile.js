var gulp = require('gulp');

gulp.task('default', function() {

    gulp.src('node_modules/rxjs/**/*')
   .pipe(gulp.dest('app/scripts/thirdparty/rxjs'));
    
    gulp.src('node_modules/@angular/compiler/bundles/compiler.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@angular/compiler/bundles'));   

      gulp.src('node_modules/@angular/core/bundles/core.umd.js')
   .pipe(gulp.dest('app/scripts/thirdparty/@angular/core/bundles'));   
 
    gulp.src('node_modules/@angular/common/bundles/common.umd.js')
      .pipe(gulp.dest('app/scripts/thirdparty/@angular/common/bundles'));   

    gulp.src('node_modules/@angular/platform-browser/bundles/platform-browser.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@angular/platform-browser/bundles'));   

    gulp.src('node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@angular/platform-browser-dynamic/bundles'));   

    gulp.src('node_modules/@angular/http/bundles/http.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@angular/http/bundles'));  
    
    gulp.src('node_modules/@angular/router/bundles/router.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@angular/router/bundles'));   

    gulp.src('node_modules/@angular/forms/bundles/forms.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@angular/forms/bundles'));   

    gulp.src('node_modules/@ngrx/store/bundles/store.umd.js')
      .pipe(gulp.dest('app/scripts/thirdparty/@ngrx/store/bundles'));   
 
    gulp.src('node_modules/@ngrx/core/bundles/core.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@ngrx/core/bundles'));   

    gulp.src('node_modules/@ngrx/db/bundles/db.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@ngrx/db/bundles'));   

    gulp.src('node_modules/@ngrx/effects/bundles/effects.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@ngrx/effects/bundles'));   

    gulp.src('node_modules/@ngrx/router-store/bundles/router-store.umd.js')
    .pipe(gulp.dest('app/scripts/thirdparty/@ngrx/router-store/bundles'));   

    gulp.src('node_modules/ngrx-store-freeze/dist/*')
    .pipe(gulp.dest('app/scripts/thirdparty/ngrx-store-freeze'));   

    gulp.src('node_modules/deep-freeze-strict/index.js')
    .pipe(gulp.dest('app/scripts/thirdparty/deep-freeze-strict'));   

    gulp.src('node_modules/reselect/dist/*')
    .pipe(gulp.dest('app/scripts/thirdparty/reselect'));   
    
        gulp.src('node_modules/zone.js/dist/*')
   .pipe(gulp.dest('app/scripts/obrowsersp/zone'));  
    
         gulp.src('node_modules/core-js/client/shim.min.js')
   .pipe(gulp.dest('app/scripts/obrowsersp')); 
    
             gulp.src('node_modules/reflect-metadata/Reflect.js')
   .pipe(gulp.dest('app/scripts/obrowsersp')); 

                 gulp.src('node_modules/systemjs/dist/*')
   .pipe(gulp.dest('app/scripts/obrowsersp/systemjs')); 

    
});