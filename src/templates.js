angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.ambersive.date.html',
    "<script type=text/ng-template id=FormlyBootstrapDate_day.html><div class=\"col-xs-3\">\n" +
    "        <select class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.days\" ng-model=\"FormlyBootstrapDate.day\" ng-class=\"FormlyBootstrap.getInputClass(options);\"></select>\n" +
    "    </div></script><script type=text/ng-template id=FormlyBootstrapDate_month.html><div class=\"col-xs-5\">\n" +
    "        <select class=\"form-control block\" ng-options=\"FormlyBootstrapDate.getMonthName(o) for o in  FormlyBootstrapDate.months\" ng-model=\"FormlyBootstrapDate.month\" ng-class=\"FormlyBootstrap.getInputClass(options);\"></select>\n" +
    "    </div></script><script type=text/ng-template id=FormlyBootstrapDate_year.html><div class=\"col-xs-4\">\n" +
    "        <select class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.years\" ng-model=\"FormlyBootstrapDate.year\" ng-class=\"FormlyBootstrap.getInputClass(options);\"></select>\n" +
    "    </div></script><div class=\"form-group form-group-multiple\" ng-class=FormlyBootstrapDate.getGroupClass(options);><label for={{options.key}}_multiple>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=row><div ng-repeat=\"part in FormlyBootstrapDate.order track by $index\" ng-if=\"FormlyBootstrapDate.isNotADateDelimiter(part) === false\" ng-include=FormlyBootstrapDate.getPartByDelimiterShortcut(part)></div></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.hasServerError\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.default.html',
    "<div class=form-group ng-class=FormlyBootstrap.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><input type={{to.type}} ng-model=model[options.key] class=form-control ng-class=FormlyBootstrap.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}> <small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrap.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.select.html',
    "<div class=form-group ng-class=FormlyBootstrapSelect.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><select id=inp_{{options.key}} name=inp_{{options.key}} ng-options=\"option[options.templateOptions.valueProp] as option[options.templateOptions.labelProp] for option in options.templateOptions.options\" class=\"form-control block\" ng-model=model[options.key] ng-options=\"\" ng-class=FormlyBootstrapSelect.getInputClass(options);></select><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrap.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.textarea.html',
    "<div class=form-group ng-class=FormlyBootstrapTextarea.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><textarea ng-model=model[options.key] rows={{FormlyBootstrapTextarea.settings.rows}} class=form-control ng-class=FormlyBootstrapTextarea.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}></textarea><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapTextarea.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.upload.html',
    "<div class=formly_upload ng-init=FormlyUpload.init(to,model,options.key)><label class=control-label ng-if=to.label>{{to.label}}</label><div compile=FormlyUpload.preview></div><div compile=FormlyUpload.field></div><input type=hidden ng-model=model[options.key]><p ng-if=to.help><small>{{to.help}}</small></p></div>"
  );

}]);
