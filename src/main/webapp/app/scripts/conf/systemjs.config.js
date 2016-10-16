(function(global) {
    System.config({
          paths: {
              'uf:' : 'app/scripts/thirdparty/'
          },

          map: {
            'app':                        'app/scripts',
            'rxjs':                       'app/scripts/thirdparty/rxjs',
            'angular2-in-memory-web-api': 'app/scripts/thirdparty/angular2-in-memory-web-api',

            '@angular/core':              'uf:@angular/core/bundles/core.umd.js',
            '@angular/common':            'uf:@angular/common/bundles/common.umd.js',
            '@angular/compiler':          'uf:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser':  'uf:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'uf:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http':              'uf:@angular/http/bundles/http.umd.js',
            '@angular/router':            'uf:@angular/router/bundles/router.umd.js',
            '@angular/forms':             'uf:@angular/forms/bundles/forms.umd.js',      
          },

          packages: {
              app: {
                main: './main.js',
                defaultExtension: 'js'
              },
              rxjs: {
                defaultExtension: 'js'
              },
              'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
              }
          }
  });
})(this);
