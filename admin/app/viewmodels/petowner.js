define(['services/fidoDatacontext', 'plugins/router',
    'durandal/system', 'services/logger', 'models/fidoModels', 'config', 'durandal/app'],
    function (datacontext, router, system, logger, models, config,app) {

        var model = ko.observable();
        var title = "Pet Owner Details";
        var self = this;
        //Run when viewmodel is called
        var activate = function (id) {

                return datacontext.getPetownerById(id, onRetrieve);
        };

        var onRetrieve = function (data, error) {
            if (error === false) {
                model(new models.PetownerModel(data));
            }
        };

  
      
        //Run when navigating to another view
       var cancel = function () {
           router.navigateBack();
       };

        //Run when navigating to another view
        var deactivate = function () {
            return model();
        };


       


        var vm = {
            activate: activate,
            deactivate: deactivate,
            model: model,
            cancel: cancel,
            title: title,
           
            
        };

        return vm;
    });