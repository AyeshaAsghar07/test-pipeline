/*
  DANGER!
  Using this file incorrectly can delete resources
*/

const ServerlessPluginSplitStacks = require('serverless-plugin-split-stacks');

const APITypes = new Set([
    'AWS::ApiGateway::Account',
    'AWS::ApiGateway::ApiKey',
    'AWS::ApiGateway::Authorizer',
    'AWS::ApiGateway::BasePathMapping',
    'AWS::ApiGateway::ClientCertificate',
    'AWS::ApiGateway::DocumentationPart',
    'AWS::ApiGateway::DocumentationVersion',
    'AWS::ApiGateway::DomainName',
    'AWS::ApiGateway::GatewayResponse',
    'AWS::ApiGateway::Method',
    'AWS::ApiGateway::Model',
    'AWS::ApiGateway::RequestValidator',
    // We keep these in root stack (see module.exports at the bottom of this file)
    // 'AWS::ApiGateway::Deployment',
    // 'AWS::ApiGateway::Resource',
    // 'AWS::ApiGateway::RestApi',
    'AWS::ApiGateway::Stage',
    'AWS::ApiGateway::UsagePlan',
    'AWS::ApiGateway::UsagePlanKey',
    'AWS::ApiGateway::VpcLink',

    // V2 not in use; enable when needed
    // 'AWS::ApiGatewayV2::Api',
    // 'AWS::ApiGatewayV2::Authorizer',
    // 'AWS::ApiGatewayV2::Deployment',
    // 'AWS::ApiGatewayV2::Integration',
    // 'AWS::ApiGatewayV2::IntegrationResponse',
    // 'AWS::ApiGatewayV2::Model',
    // 'AWS::ApiGatewayV2::Route',
    // 'AWS::ApiGatewayV2::RouteResponse',
    // 'AWS::ApiGatewayV2::Stage',
]);

ServerlessPluginSplitStacks.resolveMigration = function (resource, logicalId, serverless) {
    // --------------- Custom nested stacks
    // API Gateway
    if (APITypes.has(resource.Type)) return {destination: 'API'};

    // --------------- Fallback to default map
    // https://github.com/dougmoscrop/serverless-plugin-split-stacks/blob/master/lib/migration-strategy/per-type.js
    return this.stacksMap[resource.Type];
};

// the values in here are merged into `this.stacksMap` in the `resolveMigration` fn above
module.exports = {
    // Handle ApiGatewayRestApi reference bug caused by plugin incompatibilities
    // See https://github.com/dougmoscrop/serverless-plugin-split-stacks/issues/9#issuecomment-451448018
    'AWS::ApiGateway::Deployment': false,
    'AWS::ApiGateway::Resource': false,
    'AWS::ApiGateway::RestApi': false,

    // Permissions reference lambda fn arn so they need to be part of the same (root) stack
    'AWS::Lambda::Permission': false,

    // Keep bucket policy in the root stack so it can reference the bucket directly
    'AWS::S3::BucketPolicy': false,
};
