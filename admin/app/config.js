define(function () {
    toastr.options.timeOut = 2000;
    toastr.options.positionClass = 'toast-bottom-right';


    // var apiUrl = "http://fidoflufinder-dev.c4asolution.com/api/v1/";
var apiUrl = "api/v1/";
    var imageSettings = {
        imageBasePath: 'api/v1/uploads/',
        unknownPlayerImageSource: 'nopic-player.png',
        unknownTeamImageSource: 'nopic-team.png'
    };

    var petService = apiUrl + 'petowners';
    var shelterService = apiUrl + 'shelters';

    var userService = apiUrl + 'users';
    
    var uploadService=apiUrl+'upload/upload/files';

    var mediaService = apiUrl + 'media';

    var appTitle = 'FIDO Admin';

    var activate = function () {
        console.log('activate');
    };



    //var startModule = 'login';

    return {
        appTitle: appTitle,
        debugEnabled: ko.observable(true),
        activate: activate,
        imageSettings: imageSettings,
        apiUrl: apiUrl,
        petService: petService,
        shelterService: shelterService,
        userService: userService,
        uploadService:uploadService,
        mediaService:mediaService
        
    };

    //#region Sub

    //#endregion


});