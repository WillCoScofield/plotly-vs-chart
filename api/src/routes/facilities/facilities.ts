import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import { FacilityDataService } from '../../services/facility.data.service';

const router = express.Router();

const facilityDataService: FacilityDataService = container.resolve(FacilityDataService)

// facilities/attributes
router.get('/attributes', (req, res) => {

  facilityDataService.getAttributeList()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500);
      res.json({ error: `Error fetching attributes` });
      console.log(err)
    })
});

// facilities/riskgroups/1
router.get('/riskgroups/:riskGroupNumber', (req, res) => {

  if (!Number(req.params.riskGroupNumber)) {
    res.status(400);
    res.json({ error: `Provided riskGroupNumber ${req.params.riskGroupNumber} is not a number` });
  
  } else {
    const riskGroupNumber = Number(req.params.riskGroupNumber)
    facilityDataService.getRiskGroup(riskGroupNumber)
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500);
        res.json({ error: `Error fetching risk group for risk group number ${riskGroupNumber}` });
        console.log(err)
      })
  }
});

// facilities?npi=1467725168&tin=800767544
router.get('/', (req, res) => {
  
  if (!Number(req.query.npi) || !Number(req.query.tin)) {
    res.status(400);
    res.json({ error: "Missing required parameters" });

  } else {
    const npi = Number(req.query.npi);
    const tin = Number(req.query.tin);
    facilityDataService.getFacilityByNpiTin(npi, tin)
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500);
        res.json({ error: `Error fetching facility with npi ${npi} and tin ${tin}` });
        console.log(err)
      })
  }
});

export default router;
