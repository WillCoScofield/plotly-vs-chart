let configJson = null

export function configs() {
  if (configJson) {
    return configJson
  }

  configJson = require('../config/config.json')
  return configJson
}

export function use_mongodb_for_facilities(): boolean {
  
  var use_mongodb = false;
  if ('use-mongodb' in configs().facilities.data) {
    use_mongodb = configs().facilities.data['use-mongodb']
  }
  
  return use_mongodb;
}

export default configs;
