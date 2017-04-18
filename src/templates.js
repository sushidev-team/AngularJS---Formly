angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.ambersive.autocomplete.html',
    "<div class=form-group ng-class=FormlyBootstrapsAutocomplete.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=input-group ng-if=FormlyBootstrapsAutocomplete.hasAddon(null,options)><div class=input-group-addon ng-if=\"FormlyBootstrapsAutocomplete.hasAddon('left',options)\" ng-bind-html=options.templateOptions.addons.left.content ng-click=\"FormlyBootstrapsAutocomplete.hasAddonAction('left',options)\"></div><input type={{to.type}} ng-model=model[options.key] uib-typeahead=\"option for option in options.templateOptions.options | filter:$viewValue | limitTo:8\" class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrapsAutocomplete.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}><div class=input-group-addon ng-if=\"FormlyBootstrapsAutocomplete.hasAddon('right',options)\" ng-bind-html=options.templateOptions.addons.right.content ng-click=\"FormlyBootstrapsAutocomplete.hasAddonAction('right',options)\"></div></div><input type={{to.type}} ng-if=\"FormlyBootstrapsAutocomplete.hasAddon(null,options) === false\" ng-model=model[options.key] uib-typeahead=\"option for option in options.templateOptions.options | filter:$viewValue | limitTo:8\" class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrapsAutocomplete.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}> <small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapsAutocomplete.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.checkbox.html',
    "<div class=form-group ng-class=FormlyBootstrapCheckbox.getGroupClass(options);><div class=checkbox><label for=inp_{{options.key}}><input ng-class=FormlyBootstrap.getInputClass(options); ng-model=model[options.key] id=inp_{{options.key}} type=checkbox ng-disabled=options.templateOptions.disabled> {{to.label}} <span class=required ng-if=options.templateOptions.required>*</span><p class=small ng-if=\"options.templateOptions.more !== undefined\">{{options.templateOptions.more}}</p><div class=checkbox_iframe_container ng-if=\"options.templateOptions.iframe !== undefined && options.templateOptions.iframe !== ''\"><iframe class=checkbox_iframe ng-src={{options.templateOptions.iframe}}></iframe></div></label></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrap.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.checkbox.list.html',
    "<div class=form-group ng-class=FormlyBootstrapCheckboxList.getGroupClass(options);><label>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=checkbox ng-repeat=\"option in options.templateOptions.options track by $index\"><label><input ng-class=FormlyBootstrapCheckboxList.getInputClass(options); ng-model=option.isSelected id=inp_{{options.key}} type=checkbox ng-disabled=options.templateOptions.disabled> {{ FormlyBootstrapCheckboxList.getOptionLabel(option,options.templateOptions.labelProp) }} <span class=required ng-if=options.templateOptions.required>*</span><br><small ng-if=\"options.templateOptions.descriptionProp !== undefined && options.templateOptions.descriptionProp !== ''\">{{ FormlyBootstrapCheckboxList.getOptionLabel(option,options.templateOptions.descriptionProp) }}</small></label></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapCheckboxList.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.codemirror.html',
    "<div class=form-group ng-class=FormlyBootstrapCodemirror.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><ui-codemirror ng-model=model[options.key] ui-codemirror-opts=options.templateOptions.codemirrorOptions></ui-codemirror><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapCodemirror.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.color.html',
    "<div class=form-group ng-class=FormlyBootstrapColor.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><input colorpicker=hex ng-model=model[options.key] class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrapColor.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}> <small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapColor.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.date.html',
    "<script type=text/ng-template id=FormlyBootstrapDate_day.html><div ng-if=\"options.templateOptions.time === false\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.days\" ng-model=\"FormlyBootstrapDate.day\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div ng-if=\"options.templateOptions.time === true\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.days\" ng-model=\"FormlyBootstrapDate.day\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><script type=text/ng-template id=FormlyBootstrapDate_month.html><div ng-if=\"options.templateOptions.time === false\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"FormlyBootstrapDate.getMonthName(o) for o in  FormlyBootstrapDate.months\" ng-model=\"FormlyBootstrapDate.month\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div ng-if=\"options.templateOptions.time === true\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"FormlyBootstrapDate.getMonthName(o) for o in  FormlyBootstrapDate.months\" ng-model=\"FormlyBootstrapDate.month\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><script type=text/ng-template id=FormlyBootstrapDate_year.html><div ng-if=\"options.templateOptions.time === false\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.years\" ng-model=\"FormlyBootstrapDate.year\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div ng-if=\"options.templateOptions.time === true\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.years\" ng-model=\"FormlyBootstrapDate.year\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><div class=form-group ng-class=FormlyBootstrapDate.getGroupClass(options);><label for={{options.key}}_multiple>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=row><div ng-class=FormlyBootstrapDate.getCssClassForDateControl(part) ng-repeat=\"part in FormlyBootstrapDate.order track by $index\" ng-if=\"FormlyBootstrapDate.isNotADateDelimiter(part) === false\" ng-include=FormlyBootstrapDate.getPartByDelimiterShortcut(part)></div><div ng-class=\"FormlyBootstrapDate.getCssClassForDateControl('time')\" ng-if=\"options.templateOptions.time === true\"><div class=form-group><input type=time step=1 ng-change=FormlyBootstrapDate.change(model[options.key]) ng-disabled=options.templateOptions.disabled ng-required=options.templateOptions.required class=\"form-control block\" ng-model=model[options.key] ng-class=\"FormlyBootstrap.getInputClass(options);\"></div></div></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.hasServerError\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.default.html',
    "<div class=form-group ng-class=FormlyBootstrap.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=input-group ng-if=FormlyBootstrap.hasAddon(null,options)><div class=input-group-addon ng-if=\"FormlyBootstrap.hasAddon('left',options)\" ng-bind-html=options.templateOptions.addons.left.content ng-click=\"FormlyBootstrap.hasAddonAction('left',options)\"></div><input type={{to.type}} ng-model=model[options.key] class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrap.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}><div class=input-group-addon ng-if=\"FormlyBootstrap.hasAddon('right',options)\" ng-bind-html=options.templateOptions.addons.right.content ng-click=\"FormlyBootstrap.hasAddonAction('right',options)\"></div></div><input type={{to.type}} ng-if=\"FormlyBootstrap.hasAddon(null,options) === false\" ng-model=model[options.key] class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrap.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}> <small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrap.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.infos.html',
    "<div class=info_box ng-class=FormlyBootstrapInfos.getGroupClass(options);><div class=headline ng-if=\"FormlyBootstrapInfos.headline !== '' && FormlyBootstrapInfos.headline !== undefined\" ng-click=FormlyBootstrapInfos.toggle($event)><div class=pull-right ng-if=\"options.templateOptions.toggle === true\"><div class=headline_toggle_icon ng-bind-html=options.templateOptions.toggleOpen ng-if=\" FormlyBootstrapInfos.hide === false\"></div><div class=headline_toggle_icon ng-bind-html=options.templateOptions.toggleClosed ng-if=\" FormlyBootstrapInfos.hide === true\"></div></div><span class=headline_inside ng-bind-html=FormlyBootstrapInfos.headline></span></div><div class=infos ng-if=\"FormlyBootstrapInfos.infos !== '' && FormlyBootstrapInfos.infos !== undefined\" ng-hide=FormlyBootstrapInfos.hide ng-bind-html=FormlyBootstrapInfos.infos></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.list.html',
    "<div class=form-group ng-class=FormlyBootstrapList.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=row><div class=list_container><div class=list_entry ng-repeat=\"listEntry in FormlyBootstrapList.formData track by $index\" ng-class=FormlyBootstrapList.getListClass(options);><div class=row><div ng-class=FormlyBootstrapList.getCssClassList()><formly-form model=FormlyBootstrapList.formData[$index] fields=FormlyBootstrapList.formDataFields[$index] bind-name=\"$parent.$index + '_list'\"></formly-form></div><div ng-class=FormlyBootstrapList.getCssClassListBtn()><div ng-class=FormlyBootstrapList.getBtnClass(options);><button ng-click=FormlyBootstrapList.remove($index,$event) class=\"btn btn-danger btn-block\"><span ng-bind-html=FormlyBootstrapList.lang.remove></span></button></div></div></div></div><div class=list_add><div ng-class=FormlyBootstrapList.getGroupClass(options);><button ng-click=FormlyBootstrapList.add($event) class=\"btn btn-success btn-block\"><span ng-bind-html=FormlyBootstrapList.lang.add></span></button></div></div></div></div><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapList.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.radio.html',
    "<div class=form-group ng-class=FormlyBootstrapRadio.getGroupClass(options);><label>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=radio ng-repeat=\"option in options.templateOptions.options track by $index\"><label><input type=radio name=inp_{{options.key}} id={{options.key}}{{$index}} ng-model=model[options.key] ng-value=option[options.templateOptions.valueProp]> {{ FormlyBootstrapRadio.getOptionLabel(option,options.templateOptions.labelProp) }}<p class=small ng-if=\"option[options.templateOptions.more] !== undefined\">{{option[options.templateOptions.more]}}</p></label></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapRadio.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.select.html',
    "<div class=form-group ng-class=FormlyBootstrapSelect.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><select id=inp_{{options.key}} name=inp_{{options.key}} ng-disabled=options.templateOptions.disabled ng-options=\"option[options.templateOptions.valueProp] as (FormlyBootstrapSelect.getOptionLabel(option,options.templateOptions.labelProp,options.templateOptions)) for option in options.templateOptions.options\" class=\"form-control block\" ng-model=model[options.key] ng-class=FormlyBootstrapSelect.getInputClass(options);></select><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapSelect.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.select2.html',
    "<div class=form-group ng-class=FormlyBootstrapSelect2.getGroupClass(options);><label>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><ui-select ng-model=FormlyBootstrapSelect2.data on-select=\"FormlyBootstrapSelect2.choose($item, $model)\"><ui-select-match placeholder={{options.templateOptions.placeholder}} ng-model=FormlyBootstrapSelect2.data><span ng-if=\"options.templateOptions.templateSelected === undefined && FormlyBootstrapSelect2.isDefined(options.templateOptions.templateFn) === false\">{{ FormlyBootstrapSelect2.getOptionLabel($select.selected,options.templateOptions.labelProp,options.templateOptions) }}</span> <span ng-if=\"options.templateOptions.templateSelected !== undefined && FormlyBootstrapSelect2.isDefined(options.templateOptions.templateFn) === false\" ng-include=options.templateOptions.templateSelected></span> <span ng-if=\"FormlyBootstrapSelect2.isDefined(options.templateOptions.templateFn) === true\" ng-bind-html=options.templateOptions.templateFn($select.selected)></span></ui-select-match><ui-select-choices repeat=\"item in (options.templateOptions.options | filter: $select.search) track by item[options.templateOptions.valueProp]\"><span ng-if=\"options.templateOptions.template === undefined && FormlyBootstrapSelect2.isDefined(options.templateOptions.templateFn) === false\">{{ FormlyBootstrapSelect2.getOptionLabel(item,options.templateOptions.labelProp) }}</span> <span ng-if=\"options.templateOptions.template !== undefined && FormlyBootstrapSelect2.isDefined(options.templateOptions.templateFn) === false\" ng-include=options.templateOptions.template></span> <span ng-if=\"options.templateOptions.template === undefined || FormlyBootstrapSelect2.isDefined(options.templateOptions.templateFn) === true\" ng-bind-html=options.templateOptions.templateFn(item)></span></ui-select-choices></ui-select><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapSelect2.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.tags.html',
    "<div class=\"form-group {{FormlyBootstrapTags.customClass}}\" ng-class=FormlyBootstrapTags.getGroupClass(options);><label>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><ui-select multiple theme=bootstrap ng-model=FormlyBootstrapTags.data ng-if=\"options.templateOptions.addTags !== true\"><ui-select-match placeholder={{options.templateOptions.placeholder}} ng-model=FormlyBootstrapTags.data><span ng-if=\"options.templateOptions.templateSelected === undefined\">{{$item[options.templateOptions.labelProp]}}</span> <span ng-if=\"options.templateOptions.templateSelected !== undefined\" ng-include=options.templateOptions.templateSelected></span></ui-select-match><ui-select-choices repeat=\"item in (options.templateOptions.options | filter: $select.search) track by $index\"><span ng-if=\"options.templateOptions.template === undefined\">{{ item[options.templateOptions.labelProp] }}</span> <span ng-if=\"options.templateOptions.template !== undefined\" ng-include=options.templateOptions.template></span></ui-select-choices></ui-select><ui-select multiple tagging=FormlyBootstrapTags.tagTransform tagging-tokens=\"SPACE|,|/\" theme=bootstrap ng-model=FormlyBootstrapTags.data ng-if=\"options.templateOptions.addTags === true\"><ui-select-match placeholder={{options.templateOptions.placeholder}} ng-model=FormlyBootstrapTags.data><span ng-if=\"options.templateOptions.templateSelected === undefined && $item[options.templateOptions.labelProp] !== undefined\">{{$item[options.templateOptions.labelProp]}}</span> <span ng-if=\"options.templateOptions.templateSelected === undefined && $item[options.templateOptions.labelProp] === undefined\">{{$item[options.templateOptions.valueProp]}}</span> <span ng-if=\"options.templateOptions.templateSelected !== undefined\" ng-include=options.templateOptions.templateSelected></span></ui-select-match><ui-select-choices repeat=\"item in (options.templateOptions.options | filter: $select.search) track by $index\"><span ng-if=\"options.templateOptions.template === undefined && item[options.templateOptions.labelProp] !== undefined\">{{ item[options.templateOptions.labelProp] }}</span> <span ng-if=\"options.templateOptions.template === undefined && item[options.templateOptions.labelProp] === undefined\">{{ item[options.templateOptions.valueProp] }}</span> <span ng-if=\"options.templateOptions.template !== undefined\" ng-include=options.templateOptions.template></span></ui-select-choices></ui-select><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapTags.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.textarea.html',
    "<div class=form-group ng-class=FormlyBootstrapTextarea.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><textarea ui-tinymce=options.templateOptions.tinyMCE_Settings ng-model=model[options.key] ng-if=\"options.templateOptions.tinyMCE === true\" class=form-control ng-class=FormlyBootstrapTextarea.getInputClass(options); placeholder={{to.placeholder}}></textarea><textarea ng-disabled=options.templateOptions.disabled ng-if=\"options.templateOptions.tinyMCE === false || options.templateOptions.tinyMCE === undefined\" ng-model=model[options.key] rows={{FormlyBootstrapTextarea.settings.rows}} class=form-control ng-class=FormlyBootstrapTextarea.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}></textarea><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapTextarea.getErrorMessage(key,value); }}</small></div></div>"
  );

}]);
