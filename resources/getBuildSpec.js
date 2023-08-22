const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const readFileAsync = promisify(fs.readFile);

const buildOnlySpec = path.join(__dirname, './buildspec/build-only.yml');
const buildAndDeploySpecDev = path.join(__dirname, './buildspec/build-and-deploy.dev.yml');
const buildAndDeploySpecDevCDK = path.join(__dirname, './buildspec/build-and-deploy-cdk.dev.yml');
const buildAndDeploySpecStaging = path.join(__dirname, './buildspec/build-and-deploy.staging.yml');
const buildAndDeploySpecQA = path.join(__dirname, './buildspec/build-and-deploy.qa.yml');
const buildAndDeploySpecProd = path.join(__dirname, './buildspec/build-and-deploy.prod.yml');
const buildAndDeploySpecProdUS = path.join(__dirname, './buildspec/build-and-deploy.prod_us.yml');
const buildAndDeploySpecProdCA = path.join(__dirname, './buildspec/build-and-deploy.prod_ca.yml');


module.exports = async (serverless) => {
    const { stage } = serverless.providers.aws.options;
    serverless.cli.consoleLog('------------- Loading buildspec files -------------');
    serverless.cli.consoleLog(`STAGE IS --> "${stage}"`);

    return {
        buildOnly: await readFileAsync(buildOnlySpec).then((contents) => contents.toString('utf8')),
        buildAndDeploySpec: {
            dev: await readFileAsync(buildAndDeploySpecDev).then((contents) => contents.toString('utf8')),
            dev_cdk: await readFileAsync(buildAndDeploySpecDevCDK).then((contents) => contents.toString('utf8')),
            staging: await readFileAsync(buildAndDeploySpecStaging).then((contents) => contents.toString('utf8')),
            qa: await readFileAsync(buildAndDeploySpecQA).then((contents) => contents.toString('utf8')),
            prod: await readFileAsync(buildAndDeploySpecProd).then((contents) => contents.toString('utf8')),
            'prod_us': await readFileAsync(buildAndDeploySpecProdUS).then((contents) => contents.toString('utf8')),
            'prod_ca': await readFileAsync(buildAndDeploySpecProdCA).then((contents) => contents.toString('utf8')),
        },
    }
};
