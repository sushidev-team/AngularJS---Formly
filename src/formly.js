/**
 * Formly fields for AngularJS - Addon for angular-formly
 * @version v0.2.0
 * @link http://www.ambersive.com
 * @licence MIT License, http://www.opensource.org/licenses/MIT
 */

(function(window, document, undefined) {

    'use strict';

    angular.module('ambersive.formly', ['formly','ngLocale','ngMessages','ngFileUpload']);

    angular.module('ambersive.formly').config(['formlyConfigProvider', 'FormlyBootstrapSrvProvider',

        function (formlyConfigProvider, FormlyBootstrapSrvProvider) {

            formlyConfigProvider.setType({
                name: 'bootstrap_input',
                templateUrl: 'src/views/formly.ambersive.default.html',
                controller:'FormlyBootstrapsCtrl as FormlyBootstrap',
                defaultOptions: {
                    templateOptions: {
                        onKeypress: function (value,field,scope) {
                            field.formControl.$setValidity('server', true);
                        }
                    },
                    validators: {
                        standardValidation: FormlyBootstrapSrvProvider.$get().validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_date',
                templateUrl: 'src/views/formly.ambersive.date.html',
                controller:'FormlyBootstrapsDateCtrl as FormlyBootstrapDate',
                defaultOptions: {
                    templateOptions: {
                        onChange: function (value,field,scope) {
                            field.hasServerError = false;
                        }
                    },
                    validators: {
                        standardValidation: FormlyBootstrapSrvProvider.$get().validation
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
                            field.formControl.$setValidity('server', true);
                        }
                    },
                    validators: {
                        standardValidation: FormlyBootstrapSrvProvider.$get().validation
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
                            field.formControl.$setValidity('server', true);
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
                            field.formControl.$setValidity('server', true);
                        }
                    },
                    validators: {
                        standardValidation: FormlyBootstrapSrvProvider.$get().validation
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
                            field.formControl.$setValidity('server', true);
                        }
                    },
                    validators: {
                        standardValidation: FormlyBootstrapSrvProvider.$get().validation
                    }
                }
            });

            formlyConfigProvider.setType({
                name: 'bootstrap_upload',
                templateUrl: 'src/views/formly.ambersive.upload.html',
                controller:'FormlyBootstrapsUploadCtrl as FormlyBootstrapUpload',
                defaultOptions: {
                    validators: {
                        //standardValidation: FormlyBootstrapSrvProvider.$get().validation
                    }
                },
                link: function(scope, el, attrs) {
                    el.on("change", function (changeEvent) {
                        alert('test');
                        var file = changeEvent.target.files[0];
                        if (file) {
                            var fd = new FormData();
                            fd.append('uploadFile', file);
                            scope.$emit('fileToUpload', fd);
                            var fileProp = {};
                            for (var properties in file) {
                                if (!angular.isFunction(file[properties])) {
                                    fileProp[properties] = file[properties];
                                }
                            }
                            scope.fc.$setViewValue(fileProp);
                        } else {
                            scope.fc.$setViewValue(undefined);
                        }
                    });
                    el.on("focusout", function(focusoutEvent) {
                        if (window.document.activeElement.id === scope.id) {
                            scope.$apply(function(scope) {
                                scope.fc.$setUntouched();
                            });
                        } else {
                            scope.fc.$validate();
                        }
                    });
                }
            });

        }
    ]);

    angular.module('ambersive.formly').provider('$formlyBootstrapSettings', [
        function () {

            var values = {
                cssError:'error',
                cssSuccess:'success',
                cssWarning:'warning',
                formControl:'form-control-',
                formGroup:'has-',
                dateLayout:'d m y',
                dateFormat:'d m y',
                dateDelimiter: '(\\.|\\/|\\-|\\s)',
                monthFormat:'MMMM',
                regex:{
                    email:"^[-a-z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$"
                },
                lang:{
                    'fallbackError':' An error occurs. Please check the field again.',
                    'required':'Please fill out the field. This field is required.',
                    'email':'This is not a valid e-mail address'
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
                }
            };

            return({
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

    angular.module('ambersive.formly').run(['$rootScope', '$log', 'formlyConfig', 'formlyValidationMessages',
        function ($rootScope, $log, formlyConfig, formlyValidationMessages) {

            formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;

        }
    ]);

    angular.module('ambersive.formly').factory('FormlyBootstrapSrv',['$q', '$log', '$rootScope', '$formlyBootstrapSettings','$timeout',
        function($q, $log, $rootScope, $formlyBootstrapSettings,$timeout){

            var FormlyBootstrapSrv           = {};

            FormlyBootstrapSrv.errorMessages = {};

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
                                    field.hasServerError = true;
                                    field.validation.messages = filteredMessages;
                                } else if (filteredMessages.length === 0 && angular.isDefined(field.formControl) === false) {
                                    field.hasServerError = false;
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
                    cssClass += ' '+$formlyBootstrapSettings.formControl+$formlyBootstrapSettings.cssError;
                }

                return cssClass;

            };

            /***
             * Get the CSS-Class a form group
             * @param options
             * @returns {string}
             */

            FormlyBootstrapSrv.getGroupClass = function (options) {

                var cssClass = '';

                if(options.templateOptions !== undefined &&  options.templateOptions.cssClass !== undefined){
                    cssClass = options.templateOptions.cssClass;
                }

                if((options.formControl !== undefined && options.formControl.$invalid === true && options.formControl.$untouched === false) || (options.hasServerError === true)) {
                    cssClass += ' ' + $formlyBootstrapSettings.formGroup + $formlyBootstrapSettings.cssError;
                }

                return cssClass;
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
                    if (year === undefined) { year = new Date().getFullYear(); }
                    return new Date(year, month, 0).getDate();
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
                        yearStop = new Date().getFullYear();
                    }

                    if (yearStart === undefined) { yearStart = 1900; }

                    for (var i = yearStart; i < yearStop; i += 1) {
                        years.push(i);
                    }

                    return years;

                }

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

            return FormlyBootstrapSrv;

        }
    ]);

    /***
     * Controller
     */

    angular.module('ambersive.formly').controller('FormlyBootstrapsCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrap = this;

            FormlyBootstrap.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrap.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options); };

            FormlyBootstrap.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsSelectCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapSelect = this;

            FormlyBootstrapSelect.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapSelect.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options); };

            FormlyBootstrapSelect.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

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
                var className = FormlyBootstrapSrv.getGroupClass($scope.options);

                if($scope.options.templateOptions.hasFocus === true){
                    className += ' focus';
                }

                return className;
            };

            FormlyBootstrapTextarea.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            FormlyBootstrapTextarea.init = function () {

                var tinyMceSettings = $formlyBootstrapSettings.tinyMCE;

                if(angular.isDefined($scope.options.templateOptions)){

                    // Define multiple settings

                    if(angular.isDefined($scope.options.templateOptions.rows) && angular.isNumber($scope.options.templateOptions.rows)){
                        FormlyBootstrapTextarea.settings.rows = $scope.options.templateOptions.rows;
                    }

                    if(angular.isDefined($scope.options.templateOptions.tinyMCE) && $scope.options.templateOptions.tinyMCE === true) {

                        if(angular.isDefined(tinymce) === true){

                            tinyMceSettings.selector = '*[name="' + $scope.options.id + '"]';
                            tinyMceSettings.skin     = $formlyBootstrapSettings.tinyMCETheme;
                            tinyMceSettings.skin_url = $formlyBootstrapSettings.tinyMCEThemeUrl;
                            tinyMceSettings.setup    = function(ed) {

                                var render = function () {
                                    $scope.model[$scope.options.key] = ed.getContent({format: 'html'}).trim();
                                    $scope.$apply();
                                };

                                ed.on('init', function() {
                                    render();
                                });

                                ed.on('ExecCommand change NodeChange ObjectResized', function() {
                                    render();
                                });

                                ed.on('keyUp', function() {
                                    render();
                                });

                                ed.on('focus', function() {
                                    $scope.options.templateOptions.hasFocus = true;
                                    render();
                                });

                                ed.on('blur', function() {
                                    $scope.options.formControl.$setTouched();
                                    $scope.options.templateOptions.hasFocus = false;
                                    render();
                                });

                            };

                            if(angular.isDefined($scope.options.templateOptions.tinyMCE_Settings)) {
                                tinyMceSettings = angular.extend(tinyMceSettings, $scope.options.templateOptions.tinyMCE_Settings);
                            }

                            tinymce.init(tinyMceSettings);

                        }

                    }

                }

            };

            FormlyBootstrapTextarea.init();


        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsDateCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv','$locale','$filter',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv,$locale,$filter){

            var FormlyBootstrapDate = this,
                CurrentDate         = new Date();

            FormlyBootstrapDate.order = [];

            var datetime = $locale.DATETIME_FORMATS; //get date and time formats
            $scope.months = datetime.MONTH; //access localized months

            if($scope.options.templateOptions.yearStart !== undefined && $scope.options.templateOptions.yearStop !== undefined){

                FormlyBootstrapDate.years = FormlyBootstrapSrv.dateHelper.yearListByStartAndStop($scope.options.templateOptions.yearStart, $scope.options.templateOptions.yearStop);
                if(FormlyBootstrapDate.years.indexOf(CurrentDate.getFullYear()) === -1){
                    FormlyBootstrapDate.year = FormlyBootstrapDate.years[FormlyBootstrapDate.years.length-1];
                }

            } else {

                if($scope.options.templateOptions.yearFromNow === undefined){
                    $scope.options.templateOptions.yearFromNow = 5;
                }

                if($scope.options.templateOptions.yearStart === undefined){
                    $scope.options.templateOptions.yearStart = FormlyBootstrapDate.year;
                }

                FormlyBootstrapDate.years = FormlyBootstrapSrv.dateHelper.yearList($scope.options.templateOptions.yearFromNow,$scope.options.templateOptions.yearStart);

                if(FormlyBootstrapDate.years.indexOf(CurrentDate.getFullYear()) === -1){
                    FormlyBootstrapDate.year = FormlyBootstrapDate.years[FormlyBootstrapDate.years.length-1];
                }

            }

            FormlyBootstrapDate.month = CurrentDate.getMonth()+1;
            FormlyBootstrapDate.day   = CurrentDate.getDate();

            if(FormlyBootstrapDate.year === undefined) {
                FormlyBootstrapDate.year  = CurrentDate.getFullYear();
            }

            FormlyBootstrapDate.days = FormlyBootstrapSrv.dateHelper.daysListForMonthAndYear(FormlyBootstrapDate.month,FormlyBootstrapDate.year);
            FormlyBootstrapDate.months = FormlyBootstrapSrv.dateHelper.monthList();

            FormlyBootstrapDate.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapDate.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options); };

            FormlyBootstrapDate.isNotADateDelimiter = function (char) {

                var dateDelimiter = new RegExp($formlyBootstrapSettings.dateDelimiter);

                if ($scope.options.templateOptions.dateDelimiter !== undefined && angular.isString($scope.options.templateOptions.dateDelimiter)) {
                    dateDelimiter = new RegExp($scope.options.templateOptions.dateDelimiter);
                }

                return dateDelimiter.test(char);

            };

            FormlyBootstrapDate.getPartByDelimiterShortcut = function (ele) {

                var templateName = '';

                switch (ele.toLowerCase()) {
                    case 'd':
                        templateName = 'FormlyBootstrapDate_day';
                        break;
                    case 'm':
                        templateName = 'FormlyBootstrapDate_month';
                        break;
                    case 'y':
                        templateName = 'FormlyBootstrapDate_year';
                        break;
                }

                templateName += '.html';

                return templateName;

            };

            FormlyBootstrapDate.init = function () {

                /**
                 * Define the layout
                 * @type {string|watch.options.dateFormat|exports.watch.dateFormat|string}
                 */

                var dateFormat          = $formlyBootstrapSettings.dateFormat,
                    dateLayout          = $formlyBootstrapSettings.dateLayout,
                    dateDelimiter       = new RegExp($formlyBootstrapSettings.dateDelimiter),
                    dateFormatFilter    = function (part) {
                        if(dateDelimiter.test(part) === false){
                            return part;
                        }
                    },
                    dateFormatSplitted  = [],
                    dateFormatFiltered  = null,
                    currentDate         = null,
                    day                 = 1,
                    month               = 1,
                    year                = new Date().getFullYear(),
                    value               = null;

                if ($scope.options.templateOptions.dateFormat !== undefined && angular.isString($scope.options.templateOptions.dateFormat)) {
                    dateFormat = $scope.options.templateOptions.dateFormat;
                }

                if ($scope.options.templateOptions.dateLayout !== undefined && angular.isString($scope.options.templateOptions.dateLayout)) {
                    dateLayout = $scope.options.templateOptions.dateLayout;
                }

                if ($scope.options.templateOptions.dateDelimiter !== undefined && angular.isString($scope.options.templateOptions.dateDelimiter)) {
                    dateDelimiter = new RegExp($scope.options.templateOptions.dateDelimiter);
                }

                FormlyBootstrapDate.order = dateLayout.split(dateDelimiter);
                dateFormatSplitted        = dateFormat.split(dateDelimiter);

                if(dateFormat !== dateLayout){
                    FormlyBootstrapDate.order = dateLayout.split(dateDelimiter);
                }

                dateFormatFiltered = angular.copy(dateFormatSplitted).filter(dateFormatFilter);

                if($scope.model[$scope.options.key] !== undefined){

                    value = $scope.model[$scope.options.key];

                    if(value === ''){
                        return;
                    }

                    if(value !== null & angular.isString(value)) {

                        value = value.split(dateDelimiter).filter(dateFormatFilter);

                        dateFormatFiltered.forEach(function(val,index){

                            switch (val.toLowerCase()){
                                case 'y':
                                    year    = parseInt(value[index]);
                                    break;
                                case 'm':
                                    month   = parseInt(value[index]);
                                    break;
                                default:
                                    day     = parseInt(value[index]);
                                    break;
                            }

                        });

                        currentDate = new Date(year,month,day+1);

                    }
                    else if(angular.isDate(value)){

                        currentDate = value;

                    }

                    FormlyBootstrapDate.month = currentDate.getMonth();
                    FormlyBootstrapDate.day   = currentDate.getDate();
                    FormlyBootstrapDate.year  = currentDate.getFullYear();

                }

            };

            /***
             * Get the month in the local name
             * @param month
             * @returns {string}
             */

            FormlyBootstrapDate.getMonthName = function (month) {

                var monthFormat = $formlyBootstrapSettings.monthFormat,
                    name        = '';

                if($scope.options.templateOptions.monthFormat !== undefined){
                    monthFormat = $scope.options.templateOptions.monthFormat;
                }

                name = $filter('date')(new Date(FormlyBootstrapDate.year, month-1), monthFormat);

                return  name;
            };

            /**
             * Watchers
             */

            $scope.$watchGroup(['FormlyBootstrapDate.month', 'FormlyBootstrapDate.year'], function(newValues, oldValues, scope) {
                FormlyBootstrapDate.days = FormlyBootstrapSrv.dateHelper.daysListForMonthAndYear(FormlyBootstrapDate.month,FormlyBootstrapDate.year);
            });
            $scope.$watchGroup(['FormlyBootstrapDate.day','FormlyBootstrapDate.month', 'FormlyBootstrapDate.year'], function(newValues, oldValues, scope) {
                $scope.model[$scope.options.key] = new Date(FormlyBootstrapDate.year,FormlyBootstrapDate.month-1,FormlyBootstrapDate.day);
                $scope.options.hasServerError = false;
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
            FormlyBootstrapCheckbox.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options); };

            FormlyBootstrapCheckbox.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            // File Listener

            var unlisten = $scope.$on('fileToUpload', function(event, arg) {
                $scope.formData = arg;
            });

            $scope.$on('$destroy', unlisten);

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsRadioCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv){

            var FormlyBootstrapRadio = this;

            FormlyBootstrapRadio.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapRadio.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options); };

            FormlyBootstrapRadio.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

        }
    ]);

    angular.module('ambersive.formly').controller('FormlyBootstrapsUploadCtrl',['$rootScope','$scope','$formlyBootstrapSettings','FormlyBootstrapSrv', 'Upload',
        function($rootScope,$scope,$formlyBootstrapSettings,FormlyBootstrapSrv, Upload){

            var FormlyBootstrapUpload = this;

            FormlyBootstrapUpload.getInputClass = function() { return FormlyBootstrapSrv.getInputClass($scope.options); };
            FormlyBootstrapUpload.getGroupClass = function() { return FormlyBootstrapSrv.getGroupClass($scope.options); };

            FormlyBootstrapUpload.getErrorMessage = function (type, hasError) { return FormlyBootstrapSrv.getErrorMessage($scope.options, type, hasError); };

            FormlyBootstrapUpload.picFile = function(){
                
            };
            
        }
    ]);


})(window, document, undefined);