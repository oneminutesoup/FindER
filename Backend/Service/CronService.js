const Constants = require("../constants");
const HospitalService = require("./HospitalService");

const CronService = {
    ExecCron: async function() {
        await this.UpdateParams();
        setInterval(this.UpdateParams, Constants.updateWaitTimesInterval);
    },

    UpdateParams: async function() {
        await HospitalService.updateHospitalsCache();
    },

    // UpdateWaitTimes
};

module.exports = CronService;