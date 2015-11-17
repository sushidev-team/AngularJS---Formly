/**
 * Formly fields for AngularJS - Addon for angular-formly
 * @version v0.0.1
 * @link http://www.ambersive.com
 * @licence MIT License, http://www.opensource.org/licenses/MIT
 */

(function(window, document, undefined) {

    'use strict';

    angular.module('ambersive.formly',['formly','ngFileUpload','ambersive.helper']);

    angular.module('ambersive.formly').config(['formlyConfigProvider',
        function (formlyConfigProvider) {

            formlyConfigProvider.setType({
                name: 'upload',
                templateUrl: 'src/views/formly.upload.html',
                controller:'FormlyUploadCtrl as FormlyUpload'
            });

        }
    ]);

    angular.module('ambersive.formly').provider('$formlyAdditionallySettings',[
        function(){

            var uploadUrl = '',
                setUploadUrl = function(url){
                    if(url === undefined){return;}
                    uploadUrl = url;
                };

            return {
                setUploadUrl:setUploadUrl,
                $get: function () {
                    return {
                        uploadUrl:uploadUrl
                    };
                }
            };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyUploadCtrl',['$rootScope','$scope','$log','Upload','$formlyAdditionallySettings',
        function($rootScope,$scope,$log,Upload,$formlyAdditionallySettings){

            var FormlyUpload = this,
                Settings = {};

            FormlyUpload.field = '';

            FormlyUpload.init = function(settings){

                Settings = settings;

                var uploadButton = '<button';

                if(settings.multiple === true){
                    uploadButton += ' multiple ngf-select="FormlyUpload.uploadFiles($event,$files)"';
                } else {
                    uploadButton += ' ngf-select="FormlyUpload.uploadFile($event,$file)"';
                }

                uploadButton += '>'+settings.button+'</button>';

                FormlyUpload.field = uploadButton;

            };

            FormlyUpload.doUpload = function(file){

                var url = $formlyAdditionallySettings.uploadUrl,
                    data = {file: file};

                if(Settings.url !== undefined){
                    url = Settings.url;
                }

                if(Settings.uploadParams !== undefined){
                    for(var ele in Settings.uploadParams){
                        if(ele !== 'file'){
                           data[ele] = Settings.uploadParams[ele];
                       }
                    }
                }

                Upload.upload({
                    url: url,
                    data: data
                }).then(function (resp) {
                    FormlyUpload.broadcast(resp);
                }, function (resp) {
                    FormlyUpload.broadcast(resp);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });

            };

            FormlyUpload.uploadFile = function($event,file,callback){
                $event.preventDefault();
                FormlyUpload.doUpload(file);
            };

            FormlyUpload.uploadFiles = function($event,files){
                $event.preventDefault();

                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        FormlyUpload.doUpload(files[i]);
                    }
                } else {
                    $log.warn('no files detected');
                }

            };

            FormlyUpload.broadcast = function(data){

                var unique = '',
                    broadcastName = '';

                if(Settings.unique !== undefined && Settings.unqiue !== ''){
                    unique = Settings.unique;
                }

                broadcastName = 'formlyUpload'+unique.toUpperCase();

                $rootScope.$broadcast(broadcastName, { result: data.data,settings:Settings, unique:unique });

            };

        }
    ]);

    angular.module('ambersive.formly').run(['$rootScope','$log',
        function ($rootScope, $log) {

        }
    ]);

})(window, document, undefined);
angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.upload.html',
    "<div class=formly_upload ng-init=FormlyUpload.init(to)><label class=control-label ng-if=to.label>{{to.label}}</label><div compile=FormlyUpload.field></div></div>"
  );

}]);
