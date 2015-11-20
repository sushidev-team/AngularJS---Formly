angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.upload.html',
    "<div class=formly_upload ng-init=FormlyUpload.init(to,model,options.key)><label class=control-label ng-if=to.label>{{to.label}}</label><div compile=FormlyUpload.preview></div><div compile=FormlyUpload.field></div><input type=hidden ng-model=model[options.key]><p ng-if=to.help><small>{{to.help}}</small></p></div>"
  );


  $templateCache.put('src/views/formly.wysiwyg.html',
    "<div class=formly_upload ng-init=FormlyWysiwyg.init(to,model,options.key)><label class=control-label ng-if=to.label>{{to.label}}</label><textarea ng-wig=model[options.key] class=editor1></textarea><p ng-if=to.help><small>{{to.help}}</small></p></div>"
  );

}]);
