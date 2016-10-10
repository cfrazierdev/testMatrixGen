(function(global) {
  var map = {
    'app':                        'public/dist/js',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'ag-grid':                    'node_modules/ag-grid',
    'ag-grid-enterprise':         'node_modules/ag-grid-enterprise',
    'ag-grid-ng2':                'node_modules/ag-grid-ng2'
  };
  var packages = {
    'app':                        { main: 'main',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index', defaultExtension: 'js' },
    'ag-grid':                    { main: 'main', defaultExtension: 'js' },
    'ag-grid-enterprise':         { main: 'main', defaultExtension: 'js' },
    'ag-grid-ng2':                { main: 'main', defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
