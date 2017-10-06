/**
 * Formly fields for AngularJS - Addon for angular-formly
 * @version v0.2.0
 * @link http://www.ambersive.com
 * @licence MIT License, http://www.opensource.org/licenses/MIT
 */

(function(window, document, undefined) {

    'use strict';

    angular.module('ambersive.formly', ['formly','ngLocale','ngMessages','ui.select', 'ngSanitize','ui.tinymce','ui.bootstrap','ui.codemirror','colorpicker.module']);

    angular.module('ambersive.formly').provider('$formlyBootstrapSettings', [
        function () {

            var values = {
                language:'en',
                cssError:'error',
                cssErrorInput:'error',
                cssSuccess:'success',
                cssWarning:'warning',
                formControl:'form-control-',
                formGroup:'has-',
                dateLayout:'d-m-y,t',
                dateLayoutRegex: new RegExp('(\\-|\\,|\\;|\\s)','gm'),
                regex:{
                    email:"^[-a-z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$"
                },
                lang:{
                    'fallbackError' :'An error occurs. Please check the field again.',
                    'required'      :'Please fill out the field. This field is required.',
                    'email'         :'This is not a valid e-mail address',
                    'add'           :'Add',
                    'remove'        :'Remove'
                },
                tinyMCETheme:'bootstrap',
                tinyMCEThemeUrl:'../build/skins/bootstrap',
                tinyMCE:{
                    statusbar: false,
                    menubar: false,
                    toolbar_items_size: 'small',
                    toolbar: 'bold italic | alignleft aligncenter alignright alignjustify | bullist numlist',
                    content_css: [

                    ],
                    plugins: [
                        'visualblocks'
                    ]
                },
            };

            var validation  = function (viewValue, modelValue, scope) {

                var options         = scope.options,
                    regexAvailable  = false,
                    regex,
                    success         = false,
                    type            = options.templateOptions.type;

                if(type === undefined){
                    type = 'text';
                }

                if(angular.isDefined(options.templateOptions) && angular.isDefined(options.templateOptions.regex)){
                    if(angular.isString(options.templateOptions.regex)){
                        options.templateOptions.regex = [options.templateOptions.regex];
                    }
                }

                switch(type){
                    case 'email':
                        regex = new RegExp(values.regex[type]);
                        regexAvailable = true;
                        break;
                    default:
                        break;
                }

                if(regexAvailable === false){
                    success = true;
                } else {
                    success = regex.test(viewValue);
                }

                return success;

            };

            return({
                validation:validation,
                setLang: function (name, value) {
                    if (values.lang[name] === undefined){ return; }
                    values.lang[name] = value;
                },
                setTinyMCE: function (name, value) {
                    if (values.tinyMCE[name] === undefined){ return; }
                    values.tinyMCE[name] = value;
                },
                setRegex: function (name, value) {
                    if (values.regex[name] === undefined){ return; }
                    values.regex[name] = value;
                },
                setValue: function (name, value) {
                    if (values[name] === undefined) { return; }
                    values[name] = value;
                },
                $get: function () {
                    return values;
                }
            });

        }
    ]);

    angular.module('ambersive.formly').config(['formlyConfigProvider', '$formlyBootstrapSettingsProvider',

        function (formlyConfigProvider, $formlyBootstrapSettingsProvider) {

            formlyConfigProvider.setType({
                name: 'bootstrap_input',
                templateUrl: 'src/views/formly.ambersive.default.html',
                controller:'FormlyBootstrapsCtrl as FormlyBootstrap',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {

                        }
                    },
                    validators: {
                       standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_input_check',
                templateUrl: 'src/views/formly.ambersive.check.html',
                controller:'FormlyBootstrapsCheckCtrl as FormlyBootstrapCheck',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {

                        }
                    },
                    validators: {
                        standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_color',  
                templateUrl: 'src/views/formly.ambersive.color.html',
                controller:'FormlyBootstrapsColorCtrl as FormlyBootstrapColor',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {

                        }
                    },
                    validators: {
                        standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_date',
                templateUrl: 'src/views/formly.ambersive.date.html',
                controller:'FormlyBootstrapsDateCtrl as FormlyBootstrapDate',
                defaultOptions: {
                    templateOptions: {

                    },
                    validators: {
                      standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_select',
                templateUrl: 'src/views/formly.ambersive.select.html',
                controller:'FormlyBootstrapsSelectCtrl as FormlyBootstrapSelect',
                defaultOptions: {
                    templateOptions: {
                        onChange: function (value,field,scope) {
                            //field.formControl.$setValidity('server', true);
                        }
                    },
                    validators: {
                        standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_select2',
                templateUrl: 'src/views/formly.ambersive.select2.html',
                controller:'FormlyBootstrapsSelect2Ctrl as FormlyBootstrapSelect2',
                defaultOptions: {
                    validators: {
                       standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_tags',
                templateUrl: 'src/views/formly.ambersive.tags.html',
                controller:'FormlyBootstrapsTagsCtrl as FormlyBootstrapTags',
                defaultOptions: {
                    validators: {
                       standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_textarea',
                templateUrl: 'src/views/formly.ambersive.textarea.html',
                controller:'FormlyBootstrapsTextareaCtrl as FormlyBootstrapTextarea',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {

                        }
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_checkbox',
                templateUrl: 'src/views/formly.ambersive.checkbox.html',
                controller:'FormlyBootstrapsCheckboxCtrl as FormlyBootstrapCheckbox',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {

                        }
                    },
                    validators: {
                       standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_checkboxlist',
                templateUrl: 'src/views/formly.ambersive.checkbox.list.html',
                controller:'FormlyBootstrapsCheckboxListCtrl as FormlyBootstrapCheckboxList',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {

                        }
                    },
                    validators: {
                        standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_radio',
                templateUrl: 'src/views/formly.ambersive.radio.html',
                controller:'FormlyBootstrapsRadioCtrl as FormlyBootstrapRadio',
                defaultOptions: {
                    templateOptions: {
                        onChange: function (value,field,scope) {

                        }
                    },
                    validators: {
                       standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_autocomplete',
                templateUrl: 'src/views/formly.ambersive.autocomplete.html',
                controller:'FormlyBootstrapsAutocompleteCtrl as FormlyBootstrapsAutocomplete',
                defaultOptions: {
                    templateOptions: {
                        onChange: function (value,field,scope) {

                        }
                    },
                    validators: {
                        standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_codemirror',
                templateUrl: 'src/views/formly.ambersive.codemirror.html',
                controller:'FormlyBootstrapsCodemirrorCtrl as FormlyBootstrapCodemirror',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {
                            field.formControl.$setValidity('server', true);
                        }
                    },
                    validators: {
                        standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_list',
                templateUrl: 'src/views/formly.ambersive.list.html',
                controller:'FormlyBootstrapsListCtrl as FormlyBootstrapList',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {
                            field.formControl.$setValidity('server', true);
                        }
                    },
                    validators: {
                        standardValidation: $formlyBootstrapSettingsProvider.validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_infos',
                templateUrl: 'src/views/formly.ambersive.infos.html',
                controller:'FormlyBootstrapsInfosCtrl as FormlyBootstrapInfos',
                defaultOptions: {}
            });

        }
    ]);

    angular.module('ambersive.formly').run(['$rootScope', '$log', 'formlyConfig', 'formlyValidationMessages',
        function ($rootScope, $log, formlyConfig, formlyValidationMessages) {

            formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;

        }
    ]);

    angular.module('ambersive.formly').factory('FormlyBootstrapSrv',['$q', '$log', '$rootScope', '$formlyBootstrapSettings','$timeout',
        function($q, $log, $rootScope, $formlyBootstrapSettings,$timeout){

            var FormlyBootstrapSrv              = {};

            FormlyBootstrapSrv.errorMessages    = {};
            FormlyBootstrapSrv.tinyMCEPlugins   = [];

            FormlyBootstrapSrv.serverValidation = function (fc, messages){

                var messagesLength = 0,
                    filteredMessages = [],
                    filterFunction;

                if(angular.isDefined(fc) && angular.isObject(fc) && angular.isDefined(messages) && angular.isObject(messages)){

                    messagesLength = messages.length;

                    fc.form.$valid = (messagesLength === 0);
                    fc.form.$invalid = (messagesLength !== 0);

                    angular.forEach(fc.formFields,function(field){

                        filterFunction = function(group){
                            if(group.field === field.key){
                                return group;
                            }
                        };

                        angular.forEach(messages,function(messageData,messageGroup){

                            if (messageGroup === 'server' && angular.isArray(messageData)) {

                                filteredMessages = angular.copy(messageData).filter(filterFunction);

                                if(filteredMessages.length > 0 && angular.isDefined(field.formControl)){
                                    field.formControl.$setValidity('server', false);
                                    field.validation.messages = filteredMessages;
                                } else if (filteredMessages.length > 0 && angular.isDefined(field.formControl) === false) {
                                    field.validation.messages = filteredMessages;
                                } else if (filteredMessages.length === 0 && angular.isDefined(field.formControl) === false) {
                                    field.validation.messages = [];
                                } else {
                                    field.formControl.$setValidity('server', true);
                                }

                            }


                        });

                    });


                } else {

                    $log.warn('ambersive.formly: error while updateing the submit validation data');

                }

            };

            /***
             * Standard validation for the Bootstrap Form field with integrated
             * @param viewValue
             * @param modelValue
             * @param scope
             * @returns {boolean}
             */

            FormlyBootstrapSrv.validation = function (viewValue, modelValue, scope) {

                var options         = scope.options,
                    regexAvailable  = false,
                    regex,
                    success         = false,
                    type            = options.templateOptions.type;

                if(type === undefined){
                    type = 'text';
                }

                if(options.templateOptions.regex !== undefined){
                    if(angular.isString(options.templateOptions.regex)){
                        options.templateOptions.regex = [options.templateOptions.regex];
                    }
                }

                switch(type){
                    case 'email':
                        regex = new RegExp($formlyBootstrapSettings.regex[type]);
                        regexAvailable = true;
                        break;
                    default:
                        break;
                }

                if(regexAvailable === false){
                    success = true;
                } else {
                    success = regex.test(viewValue);
                }

                return success;

            };

            /***
             * Get the CSS-Class for an input
             * @param options
             * @returns {string}
             */

            FormlyBootstrapSrv.getInputClass = function (options) {

                var cssClass = '';

                if((options.formControl !== undefined && options.formControl.$invalid === true && options.formControl.$untouched === false) || (options.hasServerError === true)){
                    cssClass += ' '+$formlyBootstrapSettings.formControl+$formlyBootstrapSettings.cssErrorInput;
                }

                return cssClass;

            };

            /***
             * Get the CSS-Class a form group
             * @param options
             * @returns {string}
             */

            FormlyBootstrapSrv.getGroupClass = function (options,modelData) {

                var cssClass = '';

                if(options.templateOptions !== undefined &&  options.templateOptions.cssClass !== undefined){
                    cssClass = options.templateOptions.cssClass;
                }

                if((options.formControl !== undefined && options.formControl.$invalid === true && options.formControl.$untouched === false) || (options.hasServerError === true)) {
                    cssClass += ' ' + $formlyBootstrapSettings.formGroup + $formlyBootstrapSettings.cssError;
                }

                if(angular.isDefined(modelData) && modelData !== ''){

                    cssClass += ' ' + 'hasData';

                }

                return cssClass;
            };

            /***
             * Resolve the model by key
             * @param model
             * @param key
             * @returns {*}
             */

            FormlyBootstrapSrv.resolveModelByKey = function(model,key){

                if(angular.isDefined(model) === true && angular.isDefined(key) === true &&  angular.isDefined(model[key]) === true){
                    return model[key];
                }

                return null;

            };

            FormlyBootstrapSrv.hasAddon      = function(which,field){

                if(angular.isDefined(field) && angular.isDefined(field.templateOptions) && angular.isDefined(field.templateOptions.addons)){

                    if(which === null){

                        if(angular.isDefined(field.templateOptions.addons.left) || angular.isDefined(field.templateOptions.addons.right)){
                            return true;
                        }
                        return false;

                    } else {

                        if(angular.isDefined(field.templateOptions.addons[which])){
                            return true;
                        }

                        return false;

                    }

                } else {
                    return false;
                }

            };

            FormlyBootstrapSrv.hasAddonAction      = function(which,field){

                if(angular.isDefined(field) && angular.isDefined(field.templateOptions) && angular.isDefined(field.templateOptions.addons)){

                    if(which !== null){

                        if(angular.isDefined(field.templateOptions.addons[which]) && angular.isDefined(field.templateOptions.addons[which].action) && angular.isFunction(field.templateOptions.addons[which].action)){
                            field.templateOptions.addons[which].action(field,which);
                        }

                        return false;

                    }

                } else {
                    return false;
                }

            };

            /***
             *  Multiple Date helper for the date formly field
             */

            FormlyBootstrapSrv.dateHelper = {

                /***
                 * Returns the amount of days for a month in a year
                 * @param month
                 * @param year
                 * @returns {number}
                 */

                daysForMonth: function  (month, year) {
                    if (month === undefined) { month = 1; }
                    if (year === undefined) { year = new Date(Date.UTC()).getFullYear(); }
                    return new Date(Date.UTC(year, month, 0)).getDate();
                },

                /***
                 * Creates an array of integers
                 * @param month
                 * @param year
                 * @returns {Array}
                 */

                daysListForMonthAndYear: function(month, year){

                    var days    = [],
                        maxDays = FormlyBootstrapSrv.dateHelper.daysForMonth(month,year);

                    for (var i = 0; i < maxDays; i += 1) {
                        days.push(i + 1);
                    }

                    return days;

                },

                /***
                 * Returns an array of integers (months)
                 * @returns {Array}
                 */

                monthList: function() {

                    var months = [];

                    for (var i = 0; i < 12; i += 1) {
                        months.push(i+1);
                    }

                    return months;

                },

                /***
                 * Returns an array of integers (years). You can define the range
                 * @param yearsFromNow (integer)
                 * @param yearStart (integer)
                 * @returns {Array}
                 */

                yearList: function(yearsFromNow,yearStart){

                    var years = [],
                        yearsEnd = new Date().getFullYear();

                    if (yearsFromNow === undefined) { yearsFromNow = 30; }
                    if (yearStart === undefined) { yearStart = 1900; }

                    yearsEnd += yearsFromNow+1;

                    for (var i = yearStart; i < yearsEnd; i += 1) {
                        years.push(i);
                    }

                    return years;

                },


                yearListByStartAndStop: function(yearStart, yearStop){

                    var years = [];

                    if(yearStop === undefined){
                        yearStop = new Date(Date.UTC()).getFullYear();
                    }

                    if (yearStart === undefined) { yearStart = 1900; }

                    for (var i = yearStart; i < yearStop; i += 1) {
                        years.push(i);
                    }

                    return years;

                }

            };

            FormlyBootstrapSrv.getOptionLabel  = function (option, labelProp,templateOptions){

                var label       = '',
                    labelObj    = null,
                    labelParts  = [];

                var getOption   = function(obj,template){

                    var val = '';

                    /* jshint ignore:start */

                    try {
                        val = eval(template);
                    } catch(err){
                        console.error(err);
                    }

                    /* jshint ignore:end */

                    return val;
                };

                if(angular.isDefined(templateOptions) && angular.isDefined(templateOptions.labelTemplate)){

                    if(angular.isFunction(templateOptions.labelTemplate)){

                        // is function

                        label = templateOptions.labelTemplate(option);

                    } else {

                        // is string

                        label = getOption(option,templateOptions.labelTemplate);

                    }

                } else {

                    try {

                        if (labelProp.indexOf('.') > -1) {

                            labelParts = labelProp.split('.');

                            angular.forEach(labelParts, function (item, index) {

                                if (labelObj === null && angular.isDefined(option) && angular.isDefined(option[item]) === true) {

                                    labelObj = option[item];

                                }
                                else if (labelObj !== null) {

                                    if (angular.isDefined(labelObj[item]) === true) {
                                        labelObj = labelObj[item];
                                    }

                                }

                                if (angular.isString(labelObj) === true) {

                                    label = labelObj;

                                }
                                else if (angular.isFunction(labelObj) === true) {

                                    label = labelObj();

                                }

                            });

                        } else {

                            if (option !== undefined && option[labelProp] !== undefined) {


                                label = option[labelProp];

                            }

                        }

                    } catch(err){
                        console.error(err);
                    }

                }

                return label;

            };

            FormlyBootstrapSrv.getErrorMessage = function (options, type, hasError){

                var standardResponse = $formlyBootstrapSettings.lang[type];

                if (angular.isDefined(standardResponse) === false && type === 'standardValidation') {

                    standardResponse = $formlyBootstrapSettings.lang[options.templateOptions.type];

                }

                if (angular.isDefined(standardResponse) === false) {

                    standardResponse = $formlyBootstrapSettings.lang.fallbackError;

                }

                return standardResponse;

            };

            FormlyBootstrapSrv.setTinyMCEPlugins = function(obj){
                FormlyBootstrapSrv.tinyMCEPlugins.push(obj);
            };

            FormlyBootstrapSrv.getTinyMCEPlugins = function(){
                return FormlyBootstrapSrv.tinyMCEPlugins;
            };

            return FormlyBootstrapSrv;

        }
    ]);

    /***
     * Controller
     */

    angular.module('ambersive.formly').controller('FormlyBootstrapsCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrap = this;

            FormlyBootstrap.getInputClass       = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrap.getGroupClass       = function(options,model) { return FormlyBootstrapSrv.getGroupClass($scope.options,model); };

            FormlyBootstrap.hasAddon            = FormlyBootstrapSrv.hasAddon;
            FormlyBootstrap.hasAddonAction      = FormlyBootstrapSrv.hasAddonAction;

            FormlyBootstrap.getErrorMessage     = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsCheckCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapCheck = this;

            FormlyBootstrapCheck.getInputClass       = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapCheck.getGroupClass       = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };

            FormlyBootstrapCheck.hasAddon            = FormlyBootstrapSrv.hasAddon;
            FormlyBootstrapCheck.hasAddonAction      = FormlyBootstrapSrv.hasAddonAction;

            FormlyBootstrapCheck.textes              = {
                invalid:    'invalid',
                valid:      'valid',
                none:       'n/a',
                progress:   'please wait...'
            };

            FormlyBootstrapCheck.getErrorMessage     = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            FormlyBootstrapCheck.value               = '';
            FormlyBootstrapCheck.content             = '';

            FormlyBootstrapCheck.keyDownEvent        = null;

            /***
             * The actual action
             */

            FormlyBootstrapCheck.action              = function(){

                if(angular.isDefined($scope.options.templateOptions) && angular.isDefined($scope.options.templateOptions.check) && angular.isFunction($scope.options.templateOptions.check)){

                    try { 

                        $scope.options.templateOptions.check(FormlyBootstrapCheck.value).then(
                            function () {

                                // Success

                                FormlyBootstrapCheck.content = angular.copy(FormlyBootstrapCheck.textes.valid);

                            },
                            function () {

                                // Error

                                FormlyBootstrapCheck.content = angular.copy(FormlyBootstrapCheck.textes.invalid);

                            }
                        );

                    } catch(err){

                        FormlyBootstrapCheck.content = angular.copy(FormlyBootstrapCheck.textes.invalid);

                    }
                }

            };

            /***
             * Keydown event in the input
             * @param e
             */

            FormlyBootstrapCheck.keydown             = function(e){

                // Disable enter the keydown

                var ts = 500;

                if(angular.isDefined(e) && e.keyCode === 13){
                    e.preventDefault();
                    ts = 0;
                }

                FormlyBootstrapCheck.content = angular.copy(FormlyBootstrapCheck.textes.progress);

                clearTimeout(FormlyBootstrapCheck.keyDownEvent);

                setTimeout(function(){

                    FormlyBootstrapCheck.action();

                },ts);

            };

            /***
             * Force the validation 
             */

            FormlyBootstrapCheck.force               = function(){

                clearTimeout(FormlyBootstrapCheck.keyDownEvent);
                FormlyBootstrapCheck.action();

            };

            FormlyBootstrapCheck.init                = function(){

                FormlyBootstrapCheck.value = angular.copy($scope.model[$scope.options.key]);

                if(angular.isDefined($scope.options.templateOptions.checkValid)){
                    FormlyBootstrapCheck.textes.valid   = $scope.options.templateOptions.checkValid;
                }

                if(angular.isDefined($scope.options.templateOptions.checkInvalid)){
                    FormlyBootstrapCheck.textes.invalid = $scope.options.templateOptions.checkInvalid;
                }

                if(angular.isDefined($scope.options.templateOptions.checkValid)){
                    FormlyBootstrapCheck.textes.none   = $scope.options.templateOptions.checkNone;
                }

                if(angular.isDefined($scope.options.templateOptions.checkProgress)){
                    FormlyBootstrapCheck.textes.progress   = $scope.options.templateOptions.checkProgress;
                }

                FormlyBootstrapCheck.content = angular.copy(FormlyBootstrapCheck.textes.none);

            };

            FormlyBootstrapCheck.init();

            $scope.$watch('FormlyBootstrapCheck.value',function(){

                FormlyBootstrapCheck.keydown();

                $scope.model[$scope.options.key] = FormlyBootstrapCheck.value;

            },true);

            //model[options.key]

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsColorCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapColor = this;

            FormlyBootstrapColor.getInputClass       = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapColor.getGroupClass       = function() { return FormlyBootstrapSrv.getGroupClass($scope.options,FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };

            FormlyBootstrapColor.hasAddon            = FormlyBootstrapSrv.hasAddon;
            FormlyBootstrapColor.hasAddonAction      = FormlyBootstrapSrv.hasAddonAction;

            FormlyBootstrapColor.getErrorMessage     = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsSelectCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapSelect = this;

            FormlyBootstrapSelect.getInputClass         = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapSelect.getGroupClass         = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };
            FormlyBootstrapSelect.getOptionLabel        = FormlyBootstrapSrv.getOptionLabel;

            FormlyBootstrapSelect.getErrorMessage       = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsSelect2Ctrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapSelect2 = this;

            FormlyBootstrapSelect2.options  = [];
            FormlyBootstrapSelect2.loaded   = false;

            FormlyBootstrapSelect2.getInputClass        = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapSelect2.getGroupClass        = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };
            FormlyBootstrapSelect2.getOptionLabel       = FormlyBootstrapSrv.getOptionLabel;

            FormlyBootstrapSelect2.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            FormlyBootstrapSelect2.choose = function(item,model,newEntry){

                if(item === undefined){
                    return;
                }

                $scope.model[$scope.options.key] = item[$scope.options.templateOptions.valueProp];
                $rootScope.$broadcast('changeValue',{item:item,options:$scope.options});

            };

            FormlyBootstrapSelect2.isDefined = angular.isDefined;

            FormlyBootstrapSelect2.init = function(){

                var chosenElement = [];

                if($scope.model[$scope.options.key] !== undefined){

                    if($scope.options.templateOptions.options !== undefined) {

                        chosenElement = $scope.options.templateOptions.options.filter(function (item, index) {

                            if (item[$scope.options.templateOptions.valueProp] === $scope.model[$scope.options.key]) {
                                return item;
                            }

                        });

                        FormlyBootstrapSelect2.data = chosenElement[0];

                    }

                }

            };

            FormlyBootstrapSelect2.init();
            
            // Broadcasts
            
            $scope.$on('FormlyBootstrapSelect2Refresh',function(event,args){
                FormlyBootstrapSelect2.init();
            });

        }
    ]);

    angular.module('ambersive.formly').directive('myUiSelect', function() {
        return {
            require: 'uiSelect',
            link: function(scope, element, attrs, $select) {

            }
        };
    });

    angular.module('ambersive.formly').controller('FormlyBootstrapsTagsCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapTags = this;

            FormlyBootstrapTags.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapTags.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };
            FormlyBootstrapTags.customClass   = '';

            FormlyBootstrapTags.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            FormlyBootstrapTags.set = function(newValue){

                if(newValue === undefined){
                    return;
                }

                var copy = angular.copy(newValue),
                    data = [];

                copy.forEach(function(value,index){
                    data.push(value[$scope.options.templateOptions.valueProp]);
                });

                $scope.model[$scope.options.key] = data;

            };

            FormlyBootstrapTags.getOptionsForModel = function(){

                var data = angular.copy($scope.options.templateOptions.options);

                if(angular.isArray(data) === true){

                    data = data.filter(function(item){

                        if($scope.model[$scope.options.key] !== undefined && $scope.model[$scope.options.key].indexOf(item[$scope.options.templateOptions.valueProp]) > -1){

                            return item;

                        }

                    });

                    FormlyBootstrapTags.data = data;

                }
 
            };

            FormlyBootstrapTags.init = function(){

                if($scope.options.templateOptions.customClass !== undefined){
                    FormlyBootstrapTags.customClass = $scope.options.templateOptions.customClass;
                }

                FormlyBootstrapTags.getOptionsForModel();

            };

            FormlyBootstrapTags.tagTransform = function(newTag){
                var element = {};

                element[$scope.options.templateOptions.valueProp] = newTag;

                return element;
            };

            FormlyBootstrapTags.init();


            // Broadcasts

            $scope.$watch('options.templateOptions.options',function(newValue, oldValue) {

                FormlyBootstrapTags.init();

            });

            $scope.$watch('FormlyBootstrapTags.data',function(newValue, oldValue) {

                FormlyBootstrapTags.set(newValue);
                
            });

            $scope.$on('FormlyBootstrapTagsRefresh',function(event,args){
                FormlyBootstrapTags.init();
            });

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsTextareaCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv','$timeout','$sce',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv,$timeout,$sce){

            var FormlyBootstrapTextarea = this;

            FormlyBootstrapTextarea.settings = {
                rows: 3
            };

            FormlyBootstrapTextarea.getInputClass = function () { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapTextarea.getGroupClass = function () {
                var className = FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key));

                if($scope.options.templateOptions.hasFocus === true){
                    className += ' focus';
                }

                return className;
            };

            FormlyBootstrapTextarea.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            FormlyBootstrapTextarea.init = function () {

                var tinyMceSettings = $formlyBootstrapSettings.tinyMCE;

                if(angular.isDefined($scope.options.templateOptions.tinyMCE) && $scope.options.templateOptions.tinyMCE === true) {

                    if (angular.isDefined($scope.options.templateOptions.tinyMCE_Settings) === true) {

                        $scope.options.templateOptions.tinyMCE_Settings.invalid_elements = 'pre,code';
                        $scope.options.templateOptions.tinyMCE_Settings.plugins = 'paste';

                        if($scope.options.templateOptions.disabled === true){

                            $scope.options.templateOptions.tinyMCE_Settings.readonly = 1;

                        }

                        $scope.options.templateOptions.tinyMCE_Settings.setup = function (editor) {

                            var plugins = FormlyBootstrapSrv.getTinyMCEPlugins();

                            // Init custom buttons

                            angular.forEach(plugins,function(plugin){

                                switch(plugin.type){

                                    case 'button':

                                        editor.addButton(plugin.name, plugin.data);

                                        break;

                                }

                            });

                            editor.on("paste", function (e) {
                                $timeout(function () {

                                    $scope.model[$scope.options.key] = editor.getContent();

                                });
                            });
                        };
                    }

                }

                if(angular.isDefined($scope.options.templateOptions)){

                    // Define multiple settings

                    if(angular.isDefined($scope.options.templateOptions.rows) && angular.isNumber($scope.options.templateOptions.rows)){
                        FormlyBootstrapTextarea.settings.rows = $scope.options.templateOptions.rows;
                    }

                }



            };

            FormlyBootstrapTextarea.init();


        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsDateCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv','$locale','$filter','$timeout',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv,$locale,$filter,$timeout){

            var FormlyBootstrapDate             = this;

            FormlyBootstrapDate.initDone        = false;

            FormlyBootstrapDate.day             = 1;
            FormlyBootstrapDate.month           = 1;
            FormlyBootstrapDate.year            = 1900;

            FormlyBootstrapDate.order           = [];
            FormlyBootstrapDate.years           = [];
            FormlyBootstrapDate.hoursList       = [];
            FormlyBootstrapDate.minutesList     = [];
            FormlyBootstrapDate.current         = null;

            FormlyBootstrapDate.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapDate.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };

            FormlyBootstrapDate.getCssClassForDateControl = function(part){

                var cssClass = '';

                switch(part.toLowerCase()){

                    case 'd':

                        if($scope.options.templateOptions.cssClassDay !== undefined){

                            cssClass = $scope.options.templateOptions.cssClassDay;

                        } else {

                            if($scope.options.templateOptions.time === true){
 
                                cssClass = 'col-xs-3';

                            } else {

                                cssClass = 'col-xs-4';

                            }

                        }

                        break;

                    case 'm':

                        if($scope.options.templateOptions.cssClassMonth !== undefined){

                            cssClass = $scope.options.templateOptions.cssClassMonth;

                        } else {

                            if($scope.options.templateOptions.time === true){

                                cssClass = 'col-xs-3';

                            } else {

                                cssClass = 'col-xs-4';

                            }

                        }

                        break;

                    case 'y':

                        if($scope.options.templateOptions.cssClassYear !== undefined){

                            cssClass = $scope.options.templateOptions.cssClassYear;

                        } else {

                            if($scope.options.templateOptions.time === true){

                                cssClass = 'col-xs-2';

                            } else {

                                cssClass = 'col-xs-4';

                            }

                        }

                        break;

                    case 'time':

                        if($scope.options.templateOptions.cssClassTime !== undefined){

                            cssClass = $scope.options.templateOptions.cssClassTime;

                        } else {

                            cssClass = 'col-xs-4';

                        }

                        break;
                }

                return cssClass;

            };

            // Fills the controls with possible values

            FormlyBootstrapDate.populateControlsYear           = function(){

                // Populate years

                var years     = [];
                var year      = 0;

                var yearStart = 1900;
                var yearStop  = moment().year() + 20;

                if(angular.isDefined($scope.options.templateOptions.yearStart) === true){
                    yearStart = parseInt($scope.options.templateOptions.yearStart);
                }

                if(angular.isDefined($scope.options.templateOptions.yearStop) === true){
                    yearStop = parseInt($scope.options.templateOptions.yearStop);
                }

                for(year = yearStart; year < yearStop + 1; year += 1){

                    years.push(year);

                }

                FormlyBootstrapDate.years = years;

            };

            FormlyBootstrapDate.populateControlsMonths           = function(){

                var months = moment.months();

                var i      = 0;
                var arr    = [];

                for(i = 0; i < 12; i += 1){

                    arr.push({'value':(i+1),'label':months[i]});

                }

                FormlyBootstrapDate.months = arr;

            };

            FormlyBootstrapDate.populateControlsTime              = function(){

                var hoursArr    = [];
                var h           = 0;

                var minutesArr  = [];
                var m           = 0;


                for(h = 0; h < 24; h += 1){

                    hoursArr.push(h);

                }

                for(m = 0; m < 60; m += 1){

                    minutesArr.push(m);

                }

                FormlyBootstrapDate.hoursList   = hoursArr;
                FormlyBootstrapDate.minutesList = minutesArr;

            };

            FormlyBootstrapDate.getPartByDelimiterShortcut       = function(part){

                var template = '';

                switch(part){

                    case 'd':
                        template = 'FormlyBootstrapDate_day.html';
                        break;
                    case 'm':
                        template = 'FormlyBootstrapDate_month.html';
                        break;
                    case 'y':
                        template = 'FormlyBootstrapDate_year.html';
                        break;

                }

                return template;

            };

            FormlyBootstrapDate.init = function () {

                var day          = 0;
                var month        = 0;
                var year         = 1900;

                var hours        = 0;
                var hoursOffset  = 0;
                var minutes      = 0;
                var seconds      = 0;

                var parts        = [];
                var lang         = $formlyBootstrapSettings.language;
                var layout       = $formlyBootstrapSettings.dateLayout;

                var tempLayout   = ($scope.options.templateOptions.dateLayout || layout);
                var tempSplitted = tempLayout.split($formlyBootstrapSettings.dateLayoutRegex);

                tempSplitted = tempSplitted.filter(function(item){

                    var ele = null;

                    item = item.toLowerCase();

                    if($formlyBootstrapSettings.dateLayoutRegex.test(item) === false) {

                        switch (item) {
                            case 'd':
                            case 'm':
                            case 'y':
                                ele = item;
                                break;
                        }

                        if (ele !== null) {
                            return ele;
                        }

                    }

                });

                if(localStorage !== undefined){
                    lang = localStorage.getItem('language') || $formlyBootstrapSettings.language;
                }

                if(angular.isDefined($scope.options.templateOptions.language) === true){
                    lang = $scope.options.templateOptions.language;
                }

                moment.locale(lang);

                if(angular.isUndefined($scope.model[$scope.options.key]) === true || moment($scope.model[$scope.options.key]).isValid() === false){

                    FormlyBootstrapDate.current = moment().utc();

                    FormlyBootstrapDate.current.hours(0);
                    FormlyBootstrapDate.current.minutes(0);
                    FormlyBootstrapDate.current.seconds(0);

                } else {
                    FormlyBootstrapDate.current = moment($scope.model[$scope.options.key]);
                }

                FormlyBootstrapDate.populateControlsYear();
                FormlyBootstrapDate.populateControlsMonths();
                FormlyBootstrapDate.populateControlsTime();

                FormlyBootstrapDate.order = tempSplitted;

                // Define day

                day                       = FormlyBootstrapDate.current.date();

                if(isNaN(day) === true){

                    day = 1;

                }

                // Define month

                month                     = FormlyBootstrapDate.current.month() + 1;

                if(isNaN(month) === true){

                    month = 1;

                }

                // Define year

                year   = FormlyBootstrapDate.current.year();

                if(isNaN(year) === true){

                    year = 1;

                }

                // Define hours

                hours       = FormlyBootstrapDate.current.hours();
                hoursOffset = new Date().getTimezoneOffset() / 60 * -1;

                if(isNaN(hours) === true){

                    hours = 0;

                }

                // Define minutes

                minutes   = FormlyBootstrapDate.current.minutes();

                if(isNaN(minutes) === true){

                    minutes = 0;

                }

                // Define seconds

                seconds   = FormlyBootstrapDate.current.seconds();

                if(isNaN(seconds) === true){

                    seconds = 0;

                }

                FormlyBootstrapDate.day     = day;
                FormlyBootstrapDate.month   = month;
                FormlyBootstrapDate.year    = year;
                FormlyBootstrapDate.hours   = hours;
                FormlyBootstrapDate.minutes = minutes;
                FormlyBootstrapDate.seconds = seconds;

                FormlyBootstrapDate.days    = FormlyBootstrapSrv.dateHelper.daysListForMonthAndYear(FormlyBootstrapDate.month, FormlyBootstrapDate.year);

                $timeout(function(){
                    FormlyBootstrapDate.initDone = true;
                });

            };

            /***
             * Set the date mode (start of day or end of day)
             */

            FormlyBootstrapDate.setDateMode   = function(){

                if($scope.options.templateOptions.time !== true){

                    if($scope.options.templateOptions.dateMode === 'end'){
                        FormlyBootstrapDate.setEndOfDay();
                    }
                    else {
                        FormlyBootstrapDate.setStartOfDay();
                    }

                }

            };

            /**
             * Set time to start of day
             */

            FormlyBootstrapDate.setStartOfDay = function(){

                FormlyBootstrapDate.current.hours(0);
                FormlyBootstrapDate.current.minutes(0);
                FormlyBootstrapDate.current.seconds(0);

            };

            /***
             * Set time to end of day
             */

            FormlyBootstrapDate.setEndOfDay   = function(){

                FormlyBootstrapDate.current.hours(23);
                FormlyBootstrapDate.current.minutes(59);
                FormlyBootstrapDate.current.seconds(59);

            };

            FormlyBootstrapDate.getHoursStr   = function(){

                var str = [];

                var fn  = function(val){

                    if(FormlyBootstrapDate[val] < 10){
                        str.push('0' + FormlyBootstrapDate[val]);
                    }
                    else {
                        str.push(FormlyBootstrapDate[val]);
                    }

                };

                fn('hours');
                fn('minutes');
                fn('seconds');

                return str.join(':');

            };

            /**
             * Watchers
             */

            $scope.$watchGroup(['FormlyBootstrapDate.month', 'FormlyBootstrapDate.year'], function(newValues, oldValues, scope) {

                if(FormlyBootstrapDate.initDone === true) {

                    FormlyBootstrapDate.days = FormlyBootstrapSrv.dateHelper.daysListForMonthAndYear(FormlyBootstrapDate.month, FormlyBootstrapDate.year);

                }

            });

            /***
             * Define watchers
             */

            $scope.$watchGroup(['FormlyBootstrapDate.day','FormlyBootstrapDate.month', 'FormlyBootstrapDate.year','FormlyBootstrapDate.hours','FormlyBootstrapDate.minutes','FormlyBootstrapDate.seconds'], function(newValues, oldValues, scope) {

                if(FormlyBootstrapDate.initDone === true) {

                    FormlyBootstrapDate.setDateMode();
                    FormlyBootstrapDate.dateString = moment(FormlyBootstrapDate.year + '-' + FormlyBootstrapDate.month + '-' + FormlyBootstrapDate.day + ' ' + FormlyBootstrapDate.getHoursStr()).format('YYYY-MM-DD HH:mm:ss');

                }

            });

            $scope.$watch('FormlyBootstrapDate.dateString',function(){

               var dateData     = null;
               var localFormat  = 'YYYY-MM-DD[T]HH:mm:ss';

               if(angular.isUndefined(FormlyBootstrapDate.dateString) === true){
                   FormlyBootstrapDate.setDateMode();
                   FormlyBootstrapDate.dateString = moment(FormlyBootstrapDate.year + '-' + FormlyBootstrapDate.month + '-' + FormlyBootstrapDate.day + ' ' + FormlyBootstrapDate.getHoursStr()).format('YYYY-MM-DD HH:mm:ss');
                   return;
               }

               if(angular.isDefined(FormlyBootstrapDate.dateString) === true) {

                   dateData                         = moment(FormlyBootstrapDate.dateString);
                   $scope.model[$scope.options.key] = dateData.format(localFormat);

               }

            });

            /**
             * Init
             */

            FormlyBootstrapDate.init();

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsCheckboxCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapCheckbox = this;

            FormlyBootstrapCheckbox.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapCheckbox.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };

            FormlyBootstrapCheckbox.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsCheckboxListCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapCheckboxList = this,
                ModelValues                 = [];

            FormlyBootstrapCheckboxList.inited          = false;

            FormlyBootstrapCheckboxList.getInputClass   = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapCheckboxList.getGroupClass   = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };

            FormlyBootstrapCheckboxList.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };
            FormlyBootstrapCheckboxList.getOptionLabel  = FormlyBootstrapSrv.getOptionLabel;


            FormlyBootstrapCheckboxList.init            = function(){

                var length  = $scope.options.templateOptions.options.length;
                var options = [];

                angular.forEach($scope.options.templateOptions.options, function (item, index) {

                    if($scope.model[$scope.options.key] === undefined){
                        $scope.model[$scope.options.key] = [];
                    }

                    if(item[$scope.options.templateOptions.valueProp] !== undefined && $scope.model[$scope.options.key].indexOf(item[$scope.options.templateOptions.valueProp]) > -1){

                        item.isSelected = true;

                    }

                    options.push(item);

                    if(index + 1 === length){
                        $scope.options.templateOptions.options  = options;
                        FormlyBootstrapCheckboxList.inited      = true;
                    }

                });

            };

            FormlyBootstrapCheckboxList.init();

            // Watchers

            $scope.$watch('options.templateOptions.options',function(newValue,oldValue){

                if($scope.options.templateOptions.options.length === 0){
                    return;
                }

                if(FormlyBootstrapCheckboxList.inited === false){
                    FormlyBootstrapCheckboxList.init();
                }

                var newValues = [];

                if(newValue === undefined){
                    return;
                }

                var length = newValue.length;

                if(length > 0) {

                    angular.forEach(newValue, function (item, index) {

                        if(item.isSelected === true) {

                            newValues.push(item[$scope.options.templateOptions.valueProp]);

                        }

                        if (index + 1 === length) {

                            if(FormlyBootstrapCheckboxList.inited === true) {

                                $scope.model[$scope.options.key] = newValues;

                            }

                        }

                    });

                }

            },true);
            
        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsRadioCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapRadio = this;

            FormlyBootstrapRadio.getInputClass      = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapRadio.getGroupClass      = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };
            FormlyBootstrapRadio.getOptionLabel     = FormlyBootstrapSrv.getOptionLabel;

            FormlyBootstrapRadio.getErrorMessage    = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsAutocompleteCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapsAutocomplete = this;

            FormlyBootstrapsAutocomplete.getInputClass      = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapsAutocomplete.getGroupClass      = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };
            FormlyBootstrapsAutocomplete.getOptionLabel     = FormlyBootstrapSrv.getOptionLabel;
            FormlyBootstrapsAutocomplete.hasAddon           = FormlyBootstrapSrv.hasAddon;
            FormlyBootstrapsAutocomplete.hasAddonAction     = FormlyBootstrapSrv.hasAddonAction;

            FormlyBootstrapsAutocomplete.getErrorMessage    = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsCodemirrorCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapCodemirror = this;

            FormlyBootstrapCodemirror.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapCodemirror.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };

            FormlyBootstrapCodemirror.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            if($scope.options.templateOptions.codemirrorOptions === undefined){
                $scope.options.templateOptions.codemirrorOptions = {};
            }

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsListCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapList = this;

            FormlyBootstrapList.modelDataParent     = $scope.model;

            FormlyBootstrapList.getInputClass       = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapList.getGroupClass       = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };
            FormlyBootstrapList.getBtnClass         = function() { return $scope.options.templateOptions.cssBtn; };
            FormlyBootstrapList.getListClass        = function() { return $scope.options.templateOptions.cssListEntry;};

            FormlyBootstrapList.getErrorMessage     = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            FormlyBootstrapList.getCssClassList     = function(){

                var cssClass = 'col-sm-8 col-xs-12';

                if(angular.isDefined($scope.options.templateOptions) && angular.isDefined($scope.options.templateOptions.cssClassList)){
                    cssClass = $scope.options.templateOptions.cssClassList;
                }

                return cssClass;

            };

            FormlyBootstrapList.getCssClassListBtn  = function(){

                var cssClass = 'col-sm-4 col-xs-12';

                if(angular.isDefined($scope.options.templateOptions) && angular.isDefined($scope.options.templateOptions.cssClassListBtn)){
                    cssClass = $scope.options.templateOptions.cssClassListBtn;
                }

                return cssClass;

            };

            FormlyBootstrapList.formFields      = $scope.options.templateOptions.fields;

            // Data register
            
            FormlyBootstrapList.formData        = [];
            FormlyBootstrapList.formDataFields  = [];
            FormlyBootstrapList.lang            = {};

            if(angular.isDefined($scope.model[$scope.options.key])){
                FormlyBootstrapList.formData = $scope.model[$scope.options.key];
            }
            
            // List functions

            FormlyBootstrapList.add  = function($event){

                $event.preventDefault();

                var copy        = angular.copy($scope.options.templateOptions.fields);

                var newObject   = {};

                FormlyBootstrapList.formDataFields.push(copy);

                angular.forEach(copy,function(field,index){

                    switch(field.type){

                        case 'bootstrap_date':
                            newObject[field.key] = new Date();
                            break;
                        default:

                            if(angular.isDefined(field.defaultValue)){

                                if(angular.isFunction(field.defaultValue)){
                                    newObject[field.key] = field.defaultValue(field,$scope.options,$scope);
                                } else {
                                    newObject[field.key] = field.defaultValue;
                                }

                            } else {
                                newObject[field.key] = '';
                            }
                            break;

                    }

                    if(index + 1 === $scope.options.templateOptions.fields.length){
                        FormlyBootstrapList.formData.push(newObject);
                    }

                });
                
            };

            FormlyBootstrapList.remove = function($index,$event){
              
                $event.preventDefault();
                
                FormlyBootstrapList.formData.splice($index, 1);
                FormlyBootstrapList.formDataFields.splice($index, 1);

            };

            FormlyBootstrapList.init = function(){

                FormlyBootstrapList.lang.add    = $formlyBootstrapSettings.lang.add;
                FormlyBootstrapList.lang.remove = $formlyBootstrapSettings.lang.remove;

                if(angular.isDefined($scope.options.templateOptions.lang)){

                    if(angular.isDefined($scope.options.templateOptions.lang.add)){
                        FormlyBootstrapList.lang.add = $scope.options.templateOptions.lang.add;
                    }

                    if(angular.isDefined($scope.options.templateOptions.lang.remove)){
                        FormlyBootstrapList.lang.remove = $scope.options.templateOptions.lang.remove;
                    }

                }

                if(angular.isArray(FormlyBootstrapList.formData) === true){

                    FormlyBootstrapList.formDataFields = [];

                    angular.forEach(FormlyBootstrapList.formData,function(){

                        var copy        = angular.copy($scope.options.templateOptions.fields);
                        FormlyBootstrapList.formDataFields.push(copy);

                    });

                }
                
            };

            FormlyBootstrapList.init();

            // Relation

            $scope.model[$scope.options.key] = FormlyBootstrapList.formData;

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsInfosCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapInfos                = this;

            FormlyBootstrapInfos.getGroupClass      = function() { return FormlyBootstrapSrv.getGroupClass($scope.options, FormlyBootstrapSrv.resolveModelByKey($scope.model,$scope.options.key)); };

            FormlyBootstrapInfos.hide               = false;
            FormlyBootstrapInfos.toggle             = function(e){

                e.preventDefault();

                if(angular.isDefined($scope.options.templateOptions.toggle) === false || $scope.options.templateOptions.toggle === false){
                    return;
                }

                FormlyBootstrapInfos.hide = !FormlyBootstrapInfos.hide;
            };

            FormlyBootstrapInfos.init               = function(){

                if(angular.isDefined($scope.options.templateOptions.toggle) === true && $scope.options.templateOptions.toggle === true){
                    FormlyBootstrapInfos.hide = true;
                }

            };

            // Headline

            if($scope.options.templateOptions.headline !== '' && $scope.options.templateOptions.headline !== undefined) {

                FormlyBootstrapInfos.headline = '<' + ($scope.options.templateOptions.headlineSize || 'h1') + '>' + $scope.options.templateOptions.headline + '</' + ($scope.options.templateOptions.headlineSize || 'h1') + '>';

            }

            // Text

            if($scope.options.templateOptions.text !== '' && $scope.options.templateOptions.text !== undefined) {

                FormlyBootstrapInfos.infos = $scope.options.templateOptions.text;

            }

            // Init

            FormlyBootstrapInfos.init();

        }
    ]);

})(window, document, undefined);
angular.module('ambersive.formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/views/formly.ambersive.autocomplete.html',
    "<div class=form-group ng-class=FormlyBootstrapsAutocomplete.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=input-group ng-if=FormlyBootstrapsAutocomplete.hasAddon(null,options)><div class=input-group-addon ng-if=\"FormlyBootstrapsAutocomplete.hasAddon('left',options)\" ng-bind-html=options.templateOptions.addons.left.content ng-click=\"FormlyBootstrapsAutocomplete.hasAddonAction('left',options)\"></div><input type={{to.type}} ng-model=model[options.key] uib-typeahead=\"option for option in options.templateOptions.options | filter:$viewValue | limitTo:8\" class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrapsAutocomplete.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}><div class=input-group-addon ng-if=\"FormlyBootstrapsAutocomplete.hasAddon('right',options)\" ng-bind-html=options.templateOptions.addons.right.content ng-click=\"FormlyBootstrapsAutocomplete.hasAddonAction('right',options)\"></div></div><input type={{to.type}} ng-if=\"FormlyBootstrapsAutocomplete.hasAddon(null,options) === false\" ng-model=model[options.key] uib-typeahead=\"option for option in options.templateOptions.options | filter:$viewValue | limitTo:8\" class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrapsAutocomplete.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}> <small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapsAutocomplete.getErrorMessage(key,value); }}</small></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.check.html',
    "<div class=form-group ng-class=FormlyBootstrapCheck.getGroupClass(options);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=input-group><input type={{to.type}} ng-model=FormlyBootstrapCheck.value class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrapCheck.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}><div class=input-group-addon ng-bind-html=FormlyBootstrapCheck.content ng-click=FormlyBootstrapCheck.force()></div></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrapCheck.getErrorMessage(key,value); }}</small></div></div>"
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
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o.value as o.label for o in  FormlyBootstrapDate.months\" ng-model=\"FormlyBootstrapDate.month\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div ng-if=\"options.templateOptions.time === true\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o.value as o.label for o in  FormlyBootstrapDate.months\" ng-model=\"FormlyBootstrapDate.month\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><script type=text/ng-template id=FormlyBootstrapDate_year.html><div ng-if=\"options.templateOptions.time === false\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.years\" ng-model=\"FormlyBootstrapDate.year\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div ng-if=\"options.templateOptions.time === true\">\n" +
    "        <select ng-disabled=\"options.templateOptions.disabled\" ng-required=\"options.templateOptions.required\" class=\"form-control block\" ng-options=\"o for o in  FormlyBootstrapDate.years\" ng-model=\"FormlyBootstrapDate.year\" ng-class=\"FormlyBootstrap.getInputClass(options);\">\n" +
    "        </select>\n" +
    "    </div></script><div class=form-group ng-class=FormlyBootstrapDate.getGroupClass(options);><label for={{options.key}}_multiple>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=row><div ng-class=FormlyBootstrapDate.getCssClassForDateControl(part) ng-repeat=\"part in FormlyBootstrapDate.order track by $index\" ng-include=FormlyBootstrapDate.getPartByDelimiterShortcut(part)></div><div ng-class=\"FormlyBootstrapDate.getCssClassForDateControl('time')\" ng-if=\"options.templateOptions.time === true\"><div class=form-group><div class=time><select ng-disabled=options.templateOptions.disabled ng-required=options.templateOptions.required class=form-control ng-options=\"o for o in  FormlyBootstrapDate.hoursList\" ng-model=FormlyBootstrapDate.hours ng-class=FormlyBootstrap.getInputClass(options);></select><select ng-disabled=options.templateOptions.disabled ng-required=options.templateOptions.required class=form-control ng-options=\"o for o in  FormlyBootstrapDate.minutesList\" ng-model=FormlyBootstrapDate.minutes ng-class=FormlyBootstrap.getInputClass(options);></select><select ng-disabled=options.templateOptions.disabled ng-required=options.templateOptions.required class=form-control ng-options=\"o for o in  FormlyBootstrapDate.minutesList\" ng-model=FormlyBootstrapDate.seconds ng-class=FormlyBootstrap.getInputClass(options);></select></div></div></div></div><small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.hasServerError\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div></div></div>"
  );


  $templateCache.put('src/views/formly.ambersive.default.html',
    "<div class=form-group ng-class=FormlyBootstrap.getGroupClass(options,model[options.key]);><label for=inp_{{options.key}}>{{to.label}} <span class=required ng-if=options.templateOptions.required>*</span></label><div class=input-group ng-if=FormlyBootstrap.hasAddon(null,options)><div class=input-group-addon ng-if=\"FormlyBootstrap.hasAddon('left',options)\" ng-bind-html=options.templateOptions.addons.left.content ng-click=\"FormlyBootstrap.hasAddonAction('left',options)\"></div><input type={{to.type}} ng-model=model[options.key] class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrap.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}><div class=input-group-addon ng-if=\"FormlyBootstrap.hasAddon('right',options)\" ng-bind-html=options.templateOptions.addons.right.content ng-click=\"FormlyBootstrap.hasAddonAction('right',options)\"></div></div><input type={{to.type}} ng-if=\"FormlyBootstrap.hasAddon(null,options) === false\" ng-model=model[options.key] class=form-control ng-disabled=options.templateOptions.disabled ng-class=FormlyBootstrap.getInputClass(options); id=inp_{{options.key}} placeholder={{to.placeholder}}> <small class=text-muted ng-if=\"to.help !== undefined && showError !== true\">{{to.help}}</small><div ng-messages=fc.$error ng-if=\"form.$submitted || options.formControl.$touched\" class=error-messages><div class=text-danger ng-repeat=\"obj in options.validation.messages\"><small>{{obj.message}}</small></div><small class=text-danger ng-message={{key}} ng-repeat=\"(key, value) in fc.$error\" ng-if=\"key !== 'server'\">{{ FormlyBootstrap.getErrorMessage(key,value); }}</small></div></div>"
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
