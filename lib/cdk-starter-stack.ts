import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, 's3-bucket', {
      // bucketName: 'my-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
          ],
          allowedOrigins: ['http://localhost:3000'],
          allowedHeaders: ['*'],
        },
      ],
      lifecycleRules: [
        {
          abortIncompleteMultipartUploadAfter: cdk.Duration.days(90),
          expiration: cdk.Duration.days(365),
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(30),
            },
          ],
        },
      ],
    });
  }
}
