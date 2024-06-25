class RecommendationReq {
    constructor(age, situation, gender, lat, lng) {
        this.age = age;
        this.situation = situation;
        this.gender = gender;
        this.lat = lat;
        this.lng = lng;
    }
}

module.exports = RecommendationReq;