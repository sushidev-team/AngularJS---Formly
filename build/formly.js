/**
 * Formly fields for AngularJS - Addon for angular-formly
 * @version v0.0.1
 * @link http://www.ambersive.com
 * @licence MIT License, http://www.opensource.org/licenses/MIT
 */

(function(window, document, undefined) {

    'use strict';

    angular.module('ambersive.formly',['ambersive.helper','formly']);

    angular.module('ambersive.formly').config(['formlyConfigProvider',
        function (formlyConfigProvider) {

            formlyConfigProvider.setType({
                name: 'upload',
                templateUrl: 'src/views/formly.upload.html'
            });

        }
    ]);

    angular.module('ambersive.formly').run(['$rootScope', '$state', '$stateParams', '$log',
        function ($rootScope, $state, $stateParams,$log) {

        }
    ]);



})(window, document, undefined);
angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.upload.html',
    "<div class=formly_upload><label class=control-label ng-if=to.label>{{to.label}}</label><div class=\"form-group filepicker\"><button class=\"btn btn-default\" ngf-select=uploadFiles($files,$invalidFiles) accept=image/* ngf-max-width=1000>Datei hochladen</button></div></div>"
  );

}]);
