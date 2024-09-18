import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import * as glue from 'aws-cdk-lib/aws-glue';
import {globals as G, paramStack as param} from './global';

export class GlueDEStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    var SSMPrefix = `/cdk/`;
    let IAMArn = StringParameter.valueForStringParameter(this,SSMPrefix+`IAMRoleArn`)
    let S3BucketAlias = StringParameter.valueForStringParameter(this,SSMPrefix+`S3BucketAlias`)

    const gluejobname = 'Csvtoparquetjob';

    // Glue Job construct
    const gluejob = new glue.CfnJob(this, gluejobname, {
      name: gluejobname,
      role: IAMArn,
      command: {
        name: 'glueetl',
        pythonVersion: '3',
        scriptLocation: 's3://' + S3BucketAlias + '/Glue/Code/'
      },
      glueVersion: "4.0",
      description: "CDK created sample job for converting csv files to parquet files",
      numberOfWorkers: 4,
      workerType: "G.1X",
      timeout: 2880,
      tags: G.TaggingVars
    });

    //Glue catalog Database construct for crawlers
    const gluedatabase = new glue.CfnDatabase(this, 'GlueDatabase', {
      catalogId: cdk.Aws.ACCOUNT_ID,
      databaseInput: {
        name: 'fifa_db',
        description: 'Glue CDK sample database',
      }
    });

    // Glue Crawler construct
   const gluecrawler = new glue.CfnCrawler(this, 'GlueCrawler', {
      name: 'fifa_crawler',
      role: IAMArn,
      databaseName: gluedatabase.ref,
      description: 'Glue CDK sample crawler',
      targets: {
        s3Targets: [
          {
            path: 's3://' + S3BucketAlias + '/case-1/landing/',
          }
        ]
      }
    });
  }
}