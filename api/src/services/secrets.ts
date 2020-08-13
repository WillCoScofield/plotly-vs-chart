import { singleton } from 'tsyringe';
import { Secrets } from '../models/secrets'

@singleton()
export class SecretProvider {

    secrets: Secrets = {
        fcmDataAwsApiKey: null
    };

    constructor() {
        const {
            FCM_DATA_AWS_API_KEY
        } = process.env;
        this.secrets.fcmDataAwsApiKey = FCM_DATA_AWS_API_KEY;
    }
}