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