const hospitalsInfo = require("./hospital_info.json");

// const services = new Map();
let maxService = 0;
let maxSHosp = "";

for (const [key, value] of Object.entries(hospitalsInfo)) {
    // for (s of value.services) {
    //     if (services.has(s)) {
    //         services.set(s, services.get(s) + 1)
    //     } else {
    //         services.set(s, 1);
    //     }
    // }
    if (value.services.length > maxService) {
        maxService = value.services.length;
        maxSHosp = key;
    }
}

console.log(maxService);
console.log(maxSHosp);

// let query = '';
// for (const [key, value] of services) {
//     query += `"${key}", `
// }

// console.log(query);