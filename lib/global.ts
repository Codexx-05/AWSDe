import * as cdk from 'aws-cdk-lib';

export namespace paramStack{

const app = new cdk.App();

//Declaring variable for test purpose
export var S3BucketAlias = "de-bucket-store-v1";
export var S3BucketArn = `arn:aws:s3:::${S3BucketAlias}`;

}

var taggingVars = {
    "App Name": "AWS DE Practice",
    "Stage": "Sandbox"
}

export const globals: any = {
    taggingVars
}