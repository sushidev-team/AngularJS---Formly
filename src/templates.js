angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.ambersive.checkbox.html',
    "<div class=form-group ng-class=FormlyBootstrapCheckbox.getGroupClass(options);><div class=checkbox><label for=inp_{{options.key}}><input ng-class=FormlyBootstrap.getInputClass(options); ng-model=model[options.key] id=inp_{{options.key}} type=checkbox ng-disabled=options.templateOptions.disabled> {{to.label}} <span class=required ng-if=options.templateOptions.required>*</span><p class=small ng-if=\"options.templateOptions.more !== undefined\">{{options.templateOptions.more}}</p><div class=checkbox_iframe_container ng-if=\"options.templateOptions.iframe !== undefined && options.templateOptions.iframe !== ''\"><iframe class=checkbox_iframe ng-src={{options.templateOptions.iframe}}></iframe></div></label></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrap.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.date.html',
    "<script type=text/ng-template id=FormlyBootstrapDate_day.html><div class=\"col-xs-3\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.days\" ng-model=\"FormlyBootstrapDate.day\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><script type=text/ng-template id=FormlyBootstrapDate_month.html><div class=\"col-xs-5\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"FormlyBootstrapDate.getMonthName(o) for o in  FormlyBootstrapDate.months\" ng-model=\"FormlyBootstrapDate.month\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><script type=text/ng-template id=FormlyBootstrapDate_year.html><div class=\"col-xs-4\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.years\" ng-model=\"FormlyBootstrapDate.year\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><div class=\"form-group form-group-multiple\" ng-class=FormlyBootstrapDate.getGroupClass(options);><label for={{options.key}}_multiple>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=row><div ng-repeat=\"part in FormlyBootstrapDate.order track by $index\" ng-if=\"FormlyBootstrapDate.isNotADateDelimiter(part) === false\" ng-include=FormlyBootstrapDate.getPartByDelimiterShortcut(part)></div></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.hasServerError\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.default.html',
    "<div class=form-group ng-class=FormlyBootstrap.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><input type={{to.type}} ng-model=model[options.key] class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrap.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}> <small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrap.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.radio.html',
    "<div class=form-group ng-class=FormlyBootstrapRadio.getGroupClass(options);><label>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=radio ng-repeat=\"option in options.templateOptions.options track by $index\"><label><input type=radio name=inp_{{options.key}} id={{options.key}}{{$index}} ng-model=model[options.key] ng-value=option[options.templateOptions.valueProp]> {{option[options.templateOptions.labelProp]}}<p class=small ng-if=\"option[options.templateOptions.more] !== undefined\">{{option[options.templateOptions.more]}}</p></label></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapRadio.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.select.html',
    "<div class=form-group ng-class=FormlyBootstrapSelect.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><select id=inp_{{options.key}} name=inp_{{options.key}} ng-disabled=options.templateOptions.disabled ng-options=\"option[options.templateOptions.valueProp] as option[options.templateOptions.labelProp] for option in options.templateOptions.options\" class=\"form-control block\" ng-model=model[options.key] ng-options=\"\" ng-class=FormlyBootstrapSelect.getInputClass(options);></select><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapSelect.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.textarea.html',
    "<div class=form-group ng-class=FormlyBootstrapTextarea.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><textarea ng-disabled=options.templateOptions.disabled ng-model=model[options.key] rows={{FormlyBootstrapTextarea.settings.rows}} class=form-control ng-class=FormlyBootstrapTextarea.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}></textarea><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapTextarea.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.upload.html',
    "<div class=form-group ng-class=FormlyBootstrapUpload.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=file_container><label class=file><input type=file on-change=\"\" id=inp_{{options.key}} ng-model=model[options.key]> <span class=file-custom></span></label></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapUpload.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.upload.html',
    "<div class=formly_upload ng-init=FormlyUpload.init(to,model,options.key)><label class=control-label ng-if=to.label>{{to.label}}</label><div compile=FormlyUpload.preview></div><div compile=FormlyUpload.field></div><input type=hidden ng-model=model[options.key]><p ng-if=to.help><small>{{to.help}}</small></p></div>"
  );

}]);
