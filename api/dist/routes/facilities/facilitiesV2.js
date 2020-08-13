"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const express_1 = __importDefault(require("express"));
const facility_data_service_1 = require("./facility.data.service");
const router = express_1.default.Router();
const facilityDataService = tsyringe_1.container.resolve(facility_data_service_1.FacilityDataService);
// facilities/attributes
router.get('/attributes', (req, res) => {
    facilityDataService.getAttributeList()
        .then(data => {
        res.json(data);
    })
        .catch(err => {
        res.status(500);
        res.json({ error: `Error fetching attributes` });
        console.log(err);
    });
});
// facilities/riskgroups/1
router.get('/riskgroups/:riskGroupNumber', (req, res) => {
    if (!Number(req.params.riskGroupNumber)) {
        res.status(400);
        res.json({ error: `Provided riskGroupNumber ${req.params.riskGroupNumber} is not a number` });
    }
    else {
        const riskGroupNumber = Number(req.params.riskGroupNumber);
        facilityDataService.getRiskGroup(riskGroupNumber)
            .then(data => {
            res.json(data);
        })
            .catch(err => {
            res.status(500);
            res.json({ error: `Error fetching risk group for risk group number ${riskGroupNumber}` });
            console.log(err);
        });
    }
});
// facilities?npi=1467725168&tin=800767544
router.get('/', (req, res) => {
    if (!Number(req.query.npi) || !Number(req.query.tin)) {
        res.status(400);
        res.json({ error: "Missing required parameters" });
    }
    else {
        const npi = Number(req.query.npi);
        const tin = Number(req.query.tin);
        facilityDataService.getFacilityByNpiTin(npi, tin)
            .then(data => {
            res.json(data);
        })
            .catch(err => {
            res.status(500);
            res.json({ error: `Error fetching facility with npi ${npi} and tin ${tin}` });
            console.log(err);
        });
    }
});
exports.default = router;
//# sourceMappingURL=facilitiesV2.js.map