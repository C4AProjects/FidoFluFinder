define(['config'],function (config) {
    var limit = 13;
    var shortText = function (limit, text) {
        return ((text && text.length > limit) ? text.substring(0, limit) + '...' : text);
    };
   
    var PetownerModel=function(data){
        if (!data) {
            data = {};
        }

        this.Id = ko.observable(data._id);
        this.usertype = ko.observable(data.usertype);
        this.state = ko.observable(data.state);
        this.city=ko.observable(data.city);
        this.zipcode=ko.observable(data.zipcode);
        this.petType=ko.observable(data.petType);
        this.sick=ko.observable(data.sick);
        this.petSeenVet=ko.observable(data.petSeenVet);
        this.canineInfluenza=ko.observable(data.canineInfluenza);
        this.samplesCollected=ko.observable(data.samplesCollected);
        this.samplesPositive=ko.observable(data.samplesPositive);
    };

    var ShelterModel=function(data){
        if (!data) {
            data = {};
        }
        this.Id = ko.observable(data._id);
        this.usertype = ko.observable(data.usertype);
        this.state = ko.observable(data.state);
        this.city=ko.observable(data.city);
        this.zipcode=ko.observable(data.zipcode);
        this.petType=ko.observable(data.petType);
        this.sick=ko.observable(data.sick);
        this.petSeenVet=ko.observable(data.petSeenVet);
        this.canineInfluenza=ko.observable(data.canineInfluenza);
        this.samplesCollected=ko.observable(data.samplesCollected);
        this.samplesPositive=ko.observable(data.samplesPositive);
        this.dogNumber=ko.observable(data.dogNumber);
        this.catNumber=ko.observable(data.catNumber);
        this.suspectInfluenza=ko.observable(data.suspectInfluenza);
        this.infCats=ko.observable(data.infCats);
        this.infDogs=ko.observable(data.infDogs);
    };

    var UserModel = function (data) {
        if (!data)
        {
            data = {};
        }

        this.username = ko.observable(data.username);
        this.email = ko.observable(data.email);
        this.id = ko.observable(data._id);
        //this.isAdmin=ko.observable(data.isAdmin);
       /* this.picture=ko.observable(data.picture);
        this.provider=ko.observable(data.provider);*/
        this.shortEmail = ko.computed(function () {
            return shortText(limit, data.email);
        });
    };
    var RegisterModel = function (data) {
        if (!data)
        {
            data = {};
        }

        this.username = ko.observable(data.username);
        this.email = ko.observable(data.email);
        this.password=ko.observable(data.password);
        this.confirmPassword=ko.observable(data.confirmPassword);
        
    };

    return {
        UserModel: UserModel,
        RegisterModel:RegisterModel,
        PetownerModel:PetownerModel,
        ShelterModel:ShelterModel,
    };


});