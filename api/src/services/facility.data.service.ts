import { singleton } from 'tsyringe';
import axios from 'axios';
import configs from './config'
import { SecretProvider } from './secrets'

var https = require('https');

interface APIConfig {
  api_url: string;
  security_options: {[key: string]: any}
}

@singleton()
export class FacilityDataService {

  apiConfig: APIConfig;

  constructor(private secretProvider: SecretProvider) {
    
    this.apiConfig = {
      api_url: configs().facilities.data['api-url'],
      security_options: { 
        headers: {
          'x-api-key': this.secretProvider.secrets.fcmDataAwsApiKey
        }, 
        httpsAgent: new https.Agent({ rejectUnauthorized: false }) 
      }
    }
  }

  async getAttributeList(): Promise<any> {

    const response = await axios.get(`${this.apiConfig.api_url}/attributes`, this.apiConfig.security_options);
    return response.data;
  }

  async getFacilityByNpiTin(npi: number, tin: number): Promise<any> {
    
    const response = await axios.get(`${this.apiConfig.api_url}/facility-npi-${npi}-tin-${tin}`, this.apiConfig.security_options);
    return response.data;
  }

  async getRiskGroup(riskGroupNumber: number): Promise<any> {
    
    const response = await axios.get(`${this.apiConfig.api_url}/risk-group-${riskGroupNumber}`, this.apiConfig.security_options);
    return response.data;
  }
}
