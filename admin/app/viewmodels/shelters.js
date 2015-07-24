define(['services/fidoDatacontext', 'services/logger', 'config', 'models/fidoModels','plugins/router','durandal/app'], function (datacontext, logger, config, models,router,app) {
    var title = 'Shelters';

    var events = ko.observableArray([]);

    var searchText = ko.observable("");

    var shelterModelId = ko.observable(0);

    function activate() {
        getShelters();
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }

    var gotoDetails = function (selectedShelterModel) {
        if (selectedShelterModel) {
            var url = '#/shelter/' + selectedShelterModel.Id();
            router.navigate(url);
        }
    };

    var onComplete = function (result, error) {
     if (error === false) {
        logger.log(' Shelter Deleted', null, title, true);
        getShelters();
    }
    };

var getShelters = function () {
    datacontext.getShelters(function (data, error) {
        if (error === false) {
            //map according to model
            var mappedShelters = $.map(data.results,
                function (item) {
                   return new models.ShelterModel(item);
               });
            events(mappedShelters);
        }
    });
};


var onRetrieve = function (data, error) {
    if (error === false) {
        app.trigger('busy', false);
            //map according to model
            var mappedShelters = $.map(data, function (item) { return new models.ShelterModel(item); });
            events(mappedShelters);
        }
    };

    var loadShelters=function(){
        app.trigger('busy', true);
        var pId = 0;
        var s0 = '_';
        if (ShelterModelId()) pId = ShelterModelId();
        if (searchText() && (s0.length > 0) ) s0 = searchText();
        return datacontext.searchShelters(s0, onRetrieve);
    };


    var attached = function (view) {
        bindEventToList(view, '.details', gotoDetails);
        bindEventToList(view, '.delete', DeleteShelterModel);
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
    return events().slice(start, start + size);
});

var maxPageIndex = ko.dependentObservable(function () {
    return Math.ceil(events().length / pageSize()) - 1;
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
            var url = '#/shelter/0';
            router.navigate(url);
        };
        var DeleteShelterModel = function (selectedShelter) {
            if (selectedShelter) {
                app.showMessage('Are you sure you want to Delete the event?', 'Delete Shelter', ['Yes', 'No'])
                .then(function(dialogResult){
                    if(dialogResult === "Yes"){
                        return datacontext.deleteShelter(selectedShelter.Id(),onComplete)
                        //app.showMessage('Shelter Deleted');
                    }
                });


            }
        };  
    var refresh = function () {
            getShelters();
        };

    var canActivate = function () {
        return true;
    };


    var vm = {
        activate: activate,
        title: title,
        events: events,
        attached: attached,
        loadShelters:loadShelters,
        shelterModelId:shelterModelId,
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