# FORMLY FIELDS - For Formly for AngularJS

### Version
0.0.11.2

The package is still suppored by AMBERSIVE.com

This package provides a collection of useful formly control fields.

Currently the following controlfields are provides

- Input
- Checkbox (boots)
- Colorpicker
- Radio
- Tags
- Textarea with TinyMCE Implementation
- Codemirror implementation
- Autocomplete
- Select and also Select2
- Infotext
- Datepicker / Timepicker
- Radio- and checkboxlist

### Installation

#### Step 1

```sh
$ bower install ambersive-formly
```

#### Step 2
You first have to declare the 'ambersive.formly' module dependency inside your app module (perhaps inside your app main module).

```sh
angular.module('app', ['ambersive.formly']);
```
### Useage

```sh

angular.module('app', ['ambersive.formly'])
   .controller('DemoController',function($scope,$log,$rootScope){

});
```

### Changelog

- 0.0.11.0 Change date calculations to moment js (add requirements)
- 0.0.11.1 Change the time to select controls to avoid issues with the input[type="time"] date requirements. Also added a style sheet to the package (.less file available)
- 0.0.11.2 Fix the issue with the date layout

License
----
MIT