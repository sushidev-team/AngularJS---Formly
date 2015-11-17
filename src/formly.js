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
                previewUrl = '',
                setUploadUrl = function(url){
                    if(url === undefined){return;}
                    uploadUrl = url;
                },
                setPreviewUrl = function(url){
                    if(url === undefined){return;}
                    previewUrl = url;
                };

            return {
                setUploadUrl:setUploadUrl,
                setPreviewUrl:setPreviewUrl,
                $get: function () {
                    return {
                        uploadUrl:uploadUrl,
                        previewUrl:previewUrl
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
            FormlyUpload.disabled = false;
            FormlyUpload.preview = '';

            FormlyUpload.init = function(settings,model,key){

                Settings = settings;

                var uploadButton = '<button class="btn btn-default" ng-disabled="FormlyUpload.disabled" ',
                    filePreviewUrl = '';

                if(settings.preview !== undefined && settings.preview.url !== undefined){
                    filePreviewUrl = settings.preview.url+model[key];
                } else {
                    filePreviewUrl = $formlyAdditionallySettings.previewUrl+model[key];
                }

                if(settings.multiple === true){
                    uploadButton += ' multiple ngf-select="FormlyUpload.uploadFiles($event,$files)"';
                } else {
                    uploadButton += ' ngf-select="FormlyUpload.uploadFile($event,$file)"';
                }

                uploadButton += '>'+settings.button+'</button>';

                FormlyUpload.field = uploadButton;

                // File-Preview

                if(model[key] !== undefined && model[key] !== ''){
                    if(Settings.preview !== undefined && Settings.preview.type !== undefined){

                        var previewUrl = '';

                        switch(Settings.preview.type){
                            case 'image':
                                previewUrl = filePreviewUrl;
                                FormlyUpload.preview =  '<div class="image_container"><img class="img-responsive" src="'+previewUrl+'" alt="Preview Image"></div>';
                                break;
                            default:
                                FormlyUpload.preview =  '<p>'+model[key]+'</p>';
                                break;
                        }

                    }
                }


            };

            FormlyUpload.doUpload = function(file,callback){

                FormlyUpload.disabled = true;

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
                    if(callback){
                        callback(true);
                    }
                }, function (resp) {
                    FormlyUpload.broadcast(resp);
                    if(callback){
                        callback(false);
                    }
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });

            };

            FormlyUpload.uploadFile = function($event,file,callback){
                $event.preventDefault();
                FormlyUpload.doUpload(file,function(success){
                    FormlyUpload.disabled = false;
                });
            };

            FormlyUpload.uploadFiles = function($event,files){
                $event.preventDefault();

                var counter = 0;

                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        /* jshint ignore:start */
                        FormlyUpload.doUpload(files[i],function(success){
                            counter++;
                            if(counter === files.length){
                                FormlyUpload.disabled = false;
                            }
                        });
                        /* jshint ignore:end */
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