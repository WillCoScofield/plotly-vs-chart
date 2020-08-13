import express from 'express';
import Facility from '../../models/facilities';
import configs from '../../../services/config'

const LOW_HIGH_DISTINCTION_REGEX = /(high|low)/gi;

const router = express.Router();

// TODO remove
// endpoint to trigger printing out server configs
router.get('/configs', (req, res) => {
  console.log(configs());
  // console.log(configs().security.auth['client-id']);
  res.send('The application configs were printed out to the console on the server side.')
});

// facilities/attributes
router.get('/attributes', (req, res) => {
  // TODO optimize the query to make it perform faster
  Facility.aggregate([{
    "$sort": {
      "_id": 1
    }
  }, {
    "$group": {
      "_id": "$risk_group_num",
      "first": {
        "$first": "$$ROOT"
      }
    }
  }, {
    "$project": {
      "_id": 0,
      "risk_group": "$first.risk_group",
      "risk_group_num": "$first.risk_group_num",
      "total_npis_in_risk_group": "$first.total_npis_in_risk_group"
    }
  }],
    (err, queryResult) => {
      if (err) {
        res.status(500);
        // TODO do not send detailed server side errors in the response
        res.json({ error: err });
      }

      const riskGroupsByAttributes = queryResult.reduce(function (riskGroupsByAttributes, firstInRiskGroup) {
        const riskGroupName = firstInRiskGroup.risk_group.split(":")[0].trim();
        const attributesOfRiskGroup = firstInRiskGroup.risk_group.split(":")[1].split(",");
        attributesOfRiskGroup.forEach(attribute => {
          const normalizedAttribute = attribute.replace(LOW_HIGH_DISTINCTION_REGEX, '').trim();
          if (!riskGroupsByAttributes[normalizedAttribute]) {
            riskGroupsByAttributes[normalizedAttribute] = [];
          }
          riskGroupsByAttributes[normalizedAttribute].push({
            "risk_group_key": riskGroupName,
            "risk_group_value": riskGroupName,
            "risk_group_num": firstInRiskGroup.risk_group_num,
            "total_npis_in_risk_group": firstInRiskGroup.total_npis_in_risk_group
          });
        });
        return riskGroupsByAttributes;
      }, {});

      const attributes = [];
      for (const [attribute, riskGroups] of Object.entries(riskGroupsByAttributes)) {
        attributes.push({
          "attr_key": attribute,
          "attr_value": '',
          "risk_groups": riskGroups
        });
      };

      const responseData = {};
      responseData["attributes"] = attributes;

      res.json(responseData);
    }
  );
});


// facilities/riskgroups/1
router.get('/riskgroups/:riskGroupNumber', (req, res) => {
  Facility.aggregate([{
    "$match": {
      "risk_group_num": Number(req.params.riskGroupNumber)
    }
  }, {
    "$project": {
      "_id": 0,
      "tin": 1,
      "npi": 1,
      // "facility_name": 1,
      // "speciality": 1,
      // "dollars_at_risk": 1,
      "scatterplot_x_axis": 1,
      "scatterplot_y_axis": 1,
      "risk_score": 1,
      "risk_group": 1
    }
  }],
    (err, queryResult) => {
      if (err) {
        res.status(500);
        // TODO do not send detailed server side errors in the response
        res.json({ error: err });
      }

      let riskGroupName;
      const scatterPlotNodes = [];

      queryResult.forEach(facility => {
        if (!riskGroupName) {
          riskGroupName = facility.risk_group.split(":")[0].trim();
        }

        // TODO optimize the response object to make the payload smaller
        scatterPlotNodes.push({
          "x": facility.scatterplot_x_axis,
          "y": facility.scatterplot_y_axis,
          "risk_score": facility.risk_score,
          // "dollars_at_risk": facility.dollars_at_risk,
          "tin": facility.tin,
          "npi": facility.npi,
          // "facility_name": facility.facility_name,
          // "speciality": facility.speciality
        });

      });

      const responseData = {};
      responseData["risk_group_key"] = riskGroupName;
      responseData["risk_group_value"] = '';
      responseData["scatterplot_nodes"] = scatterPlotNodes

      res.json(responseData);
    }
  );
});

// facilities?npi=1467725168&tin=800767544
router.get('/', (req, res) => {
  if (!Number(req.query.npi) || !Number(req.query.tin)) {
    res.status(400);
    res.json({ error: "Missing required parameters." });
  } else {
    const matcher: any = {};
    matcher.npi = req.query.npi;
    matcher.tin = req.query.tin;

    // TODO optimize the response object to reduce duplicate entries
    Facility.find(matcher).exec((err, result) => {
      if (err) {
        res.status(500);
        // TODO do not send detailed server side errors in the response
        res.json({ error: err });
      }

      res.json(result);
    });
  }
});

export default router;
