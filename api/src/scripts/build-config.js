const fs = require('fs');
const merge = require('merge')
const yaml = require('yaml');

const CONFIG_ENCODING = 'utf8';

const PATH_TO_BASE_CONFIG = './src/config/config-base.yml';
const PATH_TO_PER_ENVIRONMENT_CONFIG = './src/config/config.yml';
const PATH_TO_OVERRIDE_CONFIG = './src/config/config-override.json';
const PATH_TO_MERGED_CONFIG = './src/config/config.json';

const baseConfig = yaml.parse(fs.readFileSync(PATH_TO_BASE_CONFIG, CONFIG_ENCODING));
const perEnvConfig = yaml.parse(fs.readFileSync(PATH_TO_PER_ENVIRONMENT_CONFIG, CONFIG_ENCODING));
const overrideConfig = JSON.parse(
  fs.readFileSync(PATH_TO_OVERRIDE_CONFIG, CONFIG_ENCODING));

let mergedConfig = merge.recursive(true, baseConfig, perEnvConfig);
mergedConfig = merge.recursive(true, mergedConfig, overrideConfig);
fs.writeFileSync(PATH_TO_MERGED_CONFIG, JSON.stringify(mergedConfig));
