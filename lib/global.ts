import * as cdk from 'aws-cdk-lib';

export namespace paramStack{

const app = new cdk.App();

//Declaring variable for bucket
export var S3BucketAlias = "de-bucket-store-v1";
export var S3BucketArn = `arn:aws:s3:::${S3BucketAlias}`;

// IAM Variables
export var AccountID = cdk.Aws.ACCOUNT_ID;
export var IAMRoleArn = "arn:aws:iam::211125784601:role/service-role/AWSGlueServiceRole";

}

var taggingVars = {
    "App Name": "AWS DE Practice",
    "Stage": "Sandbox"
}

export const globals: any = {
    taggingVars
}