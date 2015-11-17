angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.upload.html',
    "<div class=formly_upload ng-init=FormlyUpload.init(to)><label class=control-label ng-if=to.label>{{to.label}}</label><div compile=FormlyUpload.field></div></div>"
  );

}]);
