define(['services/fidoDatacontext', 'plugins/router',
    'durandal/system', 'services/logger', 'models/fidoModels', 'config', 'durandal/app'],
    function (datacontext, router, system, logger, models, config,app) {

        var model = ko.observable();
        var title = "Shelter Details";
        var excelArray=ko.observableArray();
        
        var self = this;
        //Run when viewmodel is called
        var activate = function (id) {
        };

     
//Run when navigating to another view
     
        //Run when navigating to another view
       var cancel = function () {
           router.navigateBack();
       };

        //Run when navigating to another view
        var deactivate = function () {
            return model();
        };


        var attached = function (view) {
        //Dom is ready
        //do manipulation
        $(function() {
    $("#xlsxFile").change(function(event) {
        var file = this.files[0],
            sheets;
        XLSXReader(file, true,true, function(xlsxData) {
            sheets = xlsxData.sheets;
            // Do somehting with sheets. It's a
            // Javascript object with sheet names
            // as keys and data as value in form of 2D array
excelArray(sheets.Sheet1);
        });
    });
});
    };

var readFile=function(item){
console.log(item);
}

        var vm = {
            attached:attached,
            activate: activate,
            deactivate: deactivate,
            model: model,
            cancel: cancel,
            title: title,
           readFile:readFile,
           excelArray:excelArray
            
        };

        return vm;
    });