#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3DEStack } from '../lib/S3DEStack';
//import controller from '../controller.json';
import { LambdaDEStack } from '../lib/LambdaDEStack';
import { GlueDEStack } from '../lib/GlueDEStack';
import { ParameterDEStack } from '../lib/ParameterDEStack';

const controller = require('../controller.json');

export var S3DEstack: any;
export var GlueDEstack: any;
export var LambdaDEstack: any;
export var ParameterDEstack: any;

const app = new cdk.App();

// Choose stack to deploy
// stacks == B: S3 Bucket stack
// stacks == G: Glue stack
// stacks == L: Lambda stack
// stacks == p: Parameter stack

// S3 stack
if (controller.stacks == "B") {

  console.log("Building S3 bucket stack");
  S3DEstack = new S3DEStack(app, 'S3DEStack');
}

else if (controller.stacks == "G") {

  console.log("Building Glue stack");
  GlueDEstack = new GlueDEStack(app, 'GlueDEStack');
}

else if (controller.stacks == "L") {

  console.log("Building Lambda stack");
  LambdaDEstack = new LambdaDEStack(app, 'LambdaDEStack');
}

else if (controller.stacks == "P"){

  console.log("Building Parameter stack")
  ParameterDEstack = new ParameterDEStack(app, 'ParameterDEStack');
}

else {
  console.log("Invalid stack choice")
}
