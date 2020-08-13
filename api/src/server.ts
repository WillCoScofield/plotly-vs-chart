import express, { Router } from 'express';
import cors from 'cors';
import { use_mongodb_for_facilities } from './services/config'
import facilities from './routes/facilities/facilities';
import healthcheck from './routes/actuators/healthcheck';
import facilities_mongodb from './mongodb/routes/facilities/facilities';
import healthcheck_mongodb from './mongodb/routes/actuators/healthcheck';

const app = express();
app.use(cors())

const port = Number(process.env.PORT) || 8080;

var healthcheck_router: Router = healthcheck;
var facilities_router: Router = facilities;

if (use_mongodb_for_facilities()) {
  console.log('Using mongodb as facilities data source.')
  healthcheck_router = healthcheck_mongodb
  facilities_router = facilities_mongodb
}

app.use('/actuator', healthcheck_router);
app.use('/facilities', facilities_router);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
