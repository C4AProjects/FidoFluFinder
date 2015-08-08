define(['services/fidoDatacontext', 'services/logger', 'config', 'models/fidoModels','plugins/router','durandal/app'], function (datacontext, logger, config, models,router,app) {
    var title = 'Petowners';

    var petowners = ko.observableArray([]);

    var searchText = ko.observable("");

    var petownerId = ko.observable(0);

    function activate() {
        getPetowners();
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }

    var gotoDetails = function (selectedPetowner) {
        if (selectedPetowner) {
            var url = '#/petowner/' + selectedPetowner.Id();
            router.navigate(url);
        }
    };

    var onComplete = function (result, error) {
     if (error === false) {
        logger.log(' Petowner Deleted', null, title, true);
        getPetowners();
    }
};

var DeletePetowner = function (selectedPetowner) {
    if (selectedPetowner) {
        app.showMessage('Are you sure you want to Delete the Petowner?', 'Delete Petowner', ['Yes', 'No'])
        .then(function(dialogResult){
            if(dialogResult === "Yes"){
                        return datacontext.deletePetowner(selectedPetowner.Id(),onComplete)

    }
});


    }
};
var getPetowners = function () {
    app.trigger('busy', true);
    datacontext.getPetowners(function (data, error) {
        if (error === false) {
            
            //map according to model
            var mappedPetowners = $.map(data.results,
                function (item) {
                   return new models.PetownerModel(item);
               });
            petowners(mappedPetowners);
            app.trigger('busy', false);
        }
    });
};


var onRetrieve = function (data, error) {
    if (error === false) {
        app.trigger('busy', false);
            //map according to model
            var mappedPetowners = $.map(data, function (item) { return new models.PetownerModel(item); });
            petowners(mappedPetowners);
        }
    };

    var loadPetowners=function(){
        app.trigger('busy', true);
        var pId = 0;
        var s0 = '_';
        if (PetownerId()) pId = PetownerId();
        if (searchText() && (s0.length > 0) ) s0 = searchText();
        return datacontext.searchPetowners(s0, onRetrieve);
    };


    var attached = function (view) {
        bindEventToList(view, '.details', gotoDetails);
        bindEventToList(view, '.delete', DeletePetowner);
    };

    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var client = ko.dataFor(this);
            callback(client);
            return false;
        });
    };

//#region pagination

var pageSize = ko.observable(20);
var pageIndex = ko.observable(0);

var pagedList = ko.dependentObservable(function () {
    var size = pageSize();
    var start = pageIndex() * size;
    return petowners().slice(start, start + size);
});

var maxPageIndex = ko.dependentObservable(function () {
    return Math.ceil(petowners().length / pageSize()) - 1;
});
var previousPage = function () {
    if (pageIndex() > 0) {
        pageIndex(pageIndex() - 1);
    }
};
var nextPage = function () {
    if (pageIndex() < maxPageIndex()) {
        pageIndex(pageIndex() + 1);
    }
};
var allPages = ko.dependentObservable(function () {
    var pages = [];
    for (var i = 0; i <= maxPageIndex() ; i++) {
        pages.push({ pageNumber: (i + 1) });
    }
    return pages;
});
var moveToPage = function (index) {
    pageIndex(index);
};

        //#endregion

    //Run when navigating to another view
    var addNew = function () {
            var url = '#/petowner/0';
            router.navigate(url);
        }
    var refresh = function () {
            getPetowners();
        }

    var canActivate = function () {
        return true;
    };


    var vm = {
        activate: activate,
        title: title,
        petowners: petowners,
        attached: attached,
        loadPetowners:loadPetowners,
        petownerId:petownerId,
        addNew: addNew,
     
        refresh:refresh,
        searchText: searchText,
            //#region Pagination
            pagedList: pagedList,
            previousPage: previousPage,
            nextPage: nextPage,
            allPages: allPages,
            moveToPage: moveToPage,
            pageIndex: pageIndex,
            maxPageIndex: maxPageIndex,

            //#endregion
        };

        return vm;

    });