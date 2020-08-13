"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityDataService = void 0;
const tsyringe_1 = require("tsyringe");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("./config"));
const secrets_1 = require("./secrets");
var https = require('https');
let FacilityDataService = class FacilityDataService {
    constructor(secretProvider) {
        this.secretProvider = secretProvider;
        this.apiConfig = {
            api_url: config_1.default().facilities.data['api-url'],
            security_options: {
                headers: {
                    'x-api-key': this.secretProvider.secrets.fcmDataAwsApiKey
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }
        };
    }
    getAttributeList() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiConfig.api_url}/attributes`, this.apiConfig.security_options);
            return response.data;
        });
    }
    getFacilityByNpiTin(npi, tin) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiConfig.api_url}/facility-npi-${npi}-tin-${tin}`, this.apiConfig.security_options);
            return response.data;
        });
    }
    getRiskGroup(riskGroupNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiConfig.api_url}/risk-group-${riskGroupNumber}`, this.apiConfig.security_options);
            return response.data;
        });
    }
};
FacilityDataService = __decorate([
    tsyringe_1.singleton(),
    __metadata("design:paramtypes", [secrets_1.SecretProvider])
], FacilityDataService);
exports.FacilityDataService = FacilityDataService;
//# sourceMappingURL=facility.data.service.js.map