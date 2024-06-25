const AHS = require("../AHS/AHS");
const HospitalMetadata = require("../AHS/hospital_info.json");
const HospitalLocal = require("../Model/HospitalLocal");
const HospitalVm = require("../ViewModel/HospitalVm");
const DistanceFinder = require("../Maps/DistanceFinder")
const GPT = require("../GPT/GPT");
const Constants = require("../constants");
let Ahs = new AHS()

const HospitalService = {
    hospitalsCache: [],

    updateHospitalsCache: async function() {
        let hoptitalInfo = await Ahs.buildClasses();
        this.initCache(hoptitalInfo);
    },
    getEstimateSeconds: function(WaitTime,TravelTime){
        let currentTimeInSeconds = new Date().getTime() / 1000;
        return (currentTimeInSeconds + WaitTime + TravelTime)
    },
    // inits the cache with the metadata
    initCache: function(hoptitalInfo) {
        this.hospitalsCache.length = 0;
        for (let hospInfo of hoptitalInfo) {
            let hospName = hospInfo.Name;
            let hospMeta = HospitalMetadata[hospName];
            if (!hospMeta) { console.log("Missing Hospital: " + hospName); continue; }
            this.hospitalsCache.push(new HospitalLocal(hospName, hospInfo.WaitTime, hospInfo.Note, hospMeta.type, hospMeta.city, hospMeta.phone, 
                hospMeta.address, hospMeta.website, hospMeta.availability, hospMeta.age, hospMeta.services));
        }
    },

    mapHospitalLocal(hospitalCache, distanceDurationObject) {
        if (!hospitalCache || !distanceDurationObject) { console.log("ERR: Invalid atts mapHospitalLocal"); return []};
        return hospitalCache.map(hospLoc => {
            let hospitalVm = new HospitalVm(hospLoc.name, hospLoc.waitTime, hospLoc.note, hospLoc.type, hospLoc.city, hospLoc.phone, hospLoc.address, hospLoc.website, hospLoc.availability, 
                hospLoc.age, hospLoc.services);
            hospitalVm.setDistance(distanceDurationObject?.[hospLoc.name].distance)
            hospitalVm.setDuration(distanceDurationObject?.[hospLoc.name].duration)
            let waitTimeInSeconds = (hospLoc.waitTime.hours*3600) + (hospLoc.waitTime.minutes*60) 
            let total = this.getEstimateSeconds(waitTimeInSeconds,distanceDurationObject[hospLoc.name].duration.value)
            hospitalVm.setTotalTime(total)
            return hospitalVm
        })
    },

    getRecommendation: async function(recommendationReq) {
        let respUrgency = await GPT.checkUrgency(recommendationReq.gender, recommendationReq.age, recommendationReq.situation);
        let firstResponse = GPT.checkFirstResponse(recommendationReq.gender,recommendationReq.age,recommendationReq.situation);
        // console.log(`Urgency: ${respUrgency}; initResp: ${firstResponse}`)
        let hosps = [];
        if (this.isUrgent(respUrgency)) {
            console.log("Urgent");
            hosps = await this.getRecommendationForUrgent(recommendationReq)
            
        } else {
            console.log("Not Urgent");
            hosps = await this.getRecommendationForNonUrgent(recommendationReq)
        }
        hosps = this.filterHospitals(hosps, this.isOver18(recommendationReq.age));
        firstResponse = await firstResponse;
        console.log(firstResponse);
        return [firstResponse, hosps, this.isUrgent(respUrgency)]
    },

    isUrgent: function(urgentResp) { return urgentResp == "urgent"; },

    isHospitalForAdults: function(hospital) { return hospital.age != Constants.under18; },

    isHospitalForKids: function(hospital) { return hospital.age == Constants.under18 || hospital.age == Constants.allAges; },

    isOver18: function(age) { return age >= 18; },

    filterHospitals: function(hospitals, over18) {
        return hospitals.filter(hosp => {
            if (over18) { return this.isHospitalForAdults(hosp); }
            else { return this.isHospitalForKids(hosp); }
        })
    },

    getRecommendationForUrgent: async function(recommendationReq) {
        // console.log(recommendationReq)
        let matrix = await DistanceFinder.DistanceToEverything({lat: recommendationReq.lat, long: recommendationReq.lng})
        let hospitals = this.mapHospitalLocal(this.hospitalsCache, matrix)
        hospitals.sort((a, b) => (a.distance.value) - (b.distance.value));
        return hospitals;
    },

    getRecommendationForNonUrgent: async function(recommendationReq){
        let matrix = await DistanceFinder.DistanceToEverything({lat: recommendationReq.lat, long: recommendationReq.lng})
        if (!matrix) { console.log("ERR: MATRIX NONE getRecommendationForNonUrgent"); return []; }
        let hospitals = this.mapHospitalLocal(this.hospitalsCache, matrix)
        hospitals.sort((a, b) => ((a.totalTime) - (b.totalTime) || ((a.distance.value) - (b.distance.value))));
        
        return hospitals
    }
};


module.exports = HospitalService;


{[{},{}]}