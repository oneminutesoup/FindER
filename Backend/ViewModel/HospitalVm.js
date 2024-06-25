const HospitalLocal = require("../Model/HospitalLocal");

class HospitalVm {
    constructor(name, waitTime, note, type, city, phone, address, website, availability, age, services) {
        this.name = name;
        this.waitTime = waitTime;
        this.note = note;
        this.type = type;
        this.city = city;
        this.phone = phone;
        this.address = address;
        this.website = website;
        this.availability = availability;
        this.age = age;
        this.services = services;
    }

    // Getter and setter methods for name
    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    // Getter and setter methods for distance
    getDistance() {
        return this.distance;
    }

    setDistance(newDistance) {
        this.distance = newDistance;
    }

    getDuration(){
        return this.duration;
    }

    setDuration(newDuration){
        this.duration = newDuration;
    }
    
    setTotalTime(totalTime){
        this.totalTime = totalTime;
    }
}

module.exports = HospitalVm;
