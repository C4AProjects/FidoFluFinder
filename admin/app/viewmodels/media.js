define(['services/fidoDatacontext', 'services/logger', 'config', 'models/fidoModels','plugins/router','durandal/app'], function (datacontext, logger, config, models,router,app) {
    var title = 'Media';

    var media = ko.observableArray([]);

    var searchText = ko.observable("");

    var mediaItemId = ko.observable(0);

    function activate() {
        getMedia();
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }

    var gotoDetails = function (selectedMediaItem) {
        if (selectedMediaItem) {
            var url = '#/mediaItem/' + selectedMediaItem.Id();
            router.navigate(url);
        }
    };

    var onComplete = function (result, error) {
     if (error === false) {
        logger.log(' MediaItem Deleted', null, title, true);
        getMedia();
    }
};

var DeleteMediaItem = function (selectedMediaItem) {
    if (selectedMediaItem) {
        app.showMessage('Are you sure you want to Delete the MediaItem?', 'Delete MediaItem', ['Yes', 'No'])
        .then(function(dialogResult){
            if(dialogResult === "Yes"){
                        return datacontext.deleteMediaItem(selectedMediaItem.Id(),onComplete)

    }
});


    }
};
var getMedia = function () {
    app.trigger('busy', true);
    datacontext.getMedia(function (data, error) {
        if (error === false) {
            
            //map according to model
            var mappedMedia = $.map(data.results,
                function (item) {
                   return new models.MediaModel(item);
               });
            media(mappedMedia);
            if(media().length==0)media.push(new models.MediaModel());
            app.trigger('busy', false);
        }
    });
};


var onRetrieve = function (data, error) {
    if (error === false) {
        app.trigger('busy', false);
            //map according to model
            var mappedMedia = $.map(data, function (item) { return new models.MediaModel(item); });
            
            media(mappedMedia);
            if(media().length==0)media.push(new models.MediaModel());
        }
    };

    var loadMedia=function(){
        app.trigger('busy', true);
        var pId = 0;
        var s0 = '_';
        if (MediaItemId()) pId = MediaItemId();
        if (searchText() && (s0.length > 0) ) s0 = searchText();
        return datacontext.searchMedia(s0, onRetrieve);
    };


    var attached = function (view) {
        bindEventToList(view, '.details', gotoDetails);
        bindEventToList(view, '.delete', DeleteMediaItem);
        // apply DataTables
          $("#media").DataTable( { responsive: true } );
    };

    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var client = ko.dataFor(this);
            callback(client);
            return false;
        });
    };


    //Run when navigating to another view
    var addNew = function () {
            var url = '#/mediaItem/0';
            router.navigate(url);
        }
    var refresh = function () {
            getMedia();
        }

    var canActivate = function () {
        return true;
    };


    var vm = {
        activate: activate,
        title: title,
        media: media,
        attached: attached,
        loadMedia:loadMedia,
        mediaItemId:mediaItemId,
        addNew: addNew,
     
        refresh:refresh,
        searchText: searchText,
           
        };

        return vm;

    });