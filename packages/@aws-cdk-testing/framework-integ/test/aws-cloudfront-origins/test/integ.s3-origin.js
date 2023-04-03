"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const s3 = require("aws-cdk-lib/aws-s3");
const cdk = require("aws-cdk-lib");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'cloudfront-s3-origin');
const bucket = new s3.Bucket(stack, 'Bucket');
new cloudfront.Distribution(stack, 'Distribution', {
    defaultBehavior: { origin: new origins.S3Origin(bucket) },
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuczMtb3JpZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcuczMtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQXlEO0FBQ3pELHlDQUF5QztBQUN6QyxtQ0FBbUM7QUFDbkMsOERBQThEO0FBRTlELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUV6RCxNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO0lBQ2pELGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Q0FDMUQsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIG9yaWdpbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnQtb3JpZ2lucyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbmNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjayhhcHAsICdjbG91ZGZyb250LXMzLW9yaWdpbicpO1xuXG5jb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHN0YWNrLCAnQnVja2V0Jyk7XG5uZXcgY2xvdWRmcm9udC5EaXN0cmlidXRpb24oc3RhY2ssICdEaXN0cmlidXRpb24nLCB7XG4gIGRlZmF1bHRCZWhhdmlvcjogeyBvcmlnaW46IG5ldyBvcmlnaW5zLlMzT3JpZ2luKGJ1Y2tldCkgfSxcbn0pO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==