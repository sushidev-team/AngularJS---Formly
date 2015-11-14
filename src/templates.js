angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.upload.html',
    "<div class=formly_upload><label class=control-label ng-if=to.label>{{to.label}}</label><div class=\"form-group filepicker\"><button class=\"btn btn-default\" ngf-select=uploadFiles($files,$invalidFiles) accept=image/* ngf-max-width=1000>Datei hochladen</button></div></div>"
  );

}]);
