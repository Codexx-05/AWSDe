import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import {globals as G, paramStack as param} from './global';

export class ParameterDEStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ssm.CfnParameter(this, 'S3BucketAlias',{
        name: '/cdk/S3BucketAlias',
        type: 'String',
        value: param.S3BucketAlias,
        description: 'S3 Bucket Name',
        tags: G.TaggingVars 
    });

    new ssm.CfnParameter(this, 'S3BucketArn',{
        name: '/cdk/S3BucketArn',
        type: 'String',
        value: param.S3BucketArn,
        description: 'S3 Bucket ARN',
        tags: G.TaggingVars 
    });

    new ssm.CfnParameter(this, 'IAMRolern',{
        name: '/cdk/IAMRoleArn',
        type: 'String',
        value: param.IAMRoleArn,
        description: 'IAM Role ARN',
        tags: G.TaggingVars 
    });
}
}