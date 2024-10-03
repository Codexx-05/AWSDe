import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export class S3DEStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    var SSMPrefix = `/cdk/`;
    let S3BucketAlias = StringParameter.valueForStringParameter(this,SSMPrefix+`S3BucketAlias`)

    const bucket = new Bucket(this, 'S3DEBucketStore', {
      bucketName: S3BucketAlias,  // Optional bucket name
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Delete bucket when stack is deleted
      autoDeleteObjects: true,  // Automatically delete objects in the bucket on stack deletion
    });
    
}
}

