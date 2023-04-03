"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ec2 = require("aws-cdk-lib/aws-ec2");
const ecs = require("aws-cdk-lib/aws-ecs");
const events = require("aws-cdk-lib/aws-events");
const sqs = require("aws-cdk-lib/aws-sqs");
const cdk = require("aws-cdk-lib");
const integ = require("@aws-cdk/integ-tests-alpha");
const targets = require("aws-cdk-lib/aws-events-targets");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-ecs-integ-ecs');
const vpc = new ec2.Vpc(stack, 'Vpc', { maxAzs: 1 });
const cluster = new ecs.Cluster(stack, 'EcsCluster', { vpc });
cluster.addCapacity('DefaultAutoScalingGroup', {
    instanceType: new ec2.InstanceType('t2.micro'),
});
const deadLetterQueue = new sqs.Queue(stack, 'MyDeadLetterQueue');
// Create a Task Definition for the container to start
const taskDefinition = new ecs.Ec2TaskDefinition(stack, 'TaskDef');
taskDefinition.addContainer('TheContainer', {
    image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, 'eventhandler-image')),
    memoryLimitMiB: 256,
    logging: new ecs.AwsLogDriver({ streamPrefix: 'EventDemo' }),
});
// An Rule that describes the event trigger (in this case a scheduled run)
const rule = new events.Rule(stack, 'Rule', {
    schedule: events.Schedule.rate(cdk.Duration.minutes(1)),
});
// Use EcsTask as the target of the Rule
rule.addTarget(new targets.EcsTask({
    cluster,
    taskDefinition,
    taskCount: 1,
    containerOverrides: [{
            containerName: 'TheContainer',
            environment: [
                { name: 'I_WAS_TRIGGERED', value: 'From CloudWatch Events' },
            ],
        }],
    deadLetterQueue,
}));
new integ.IntegTest(app, 'EcsTest', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuZXZlbnQtZWMyLXRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlZy5ldmVudC1lYzItdGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QiwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUNqRCwyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLG9EQUFvRDtBQUNwRCwwREFBMEQ7QUFFMUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRXRELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzlELE9BQU8sQ0FBQyxXQUFXLENBQUMseUJBQXlCLEVBQUU7SUFDN0MsWUFBWSxFQUFFLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7Q0FDL0MsQ0FBQyxDQUFDO0FBRUgsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRWxFLHNEQUFzRDtBQUN0RCxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbkUsY0FBYyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUU7SUFDMUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDbEYsY0FBYyxFQUFFLEdBQUc7SUFDbkIsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztDQUM3RCxDQUFDLENBQUM7QUFFSCwwRUFBMEU7QUFDMUUsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDMUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hELENBQUMsQ0FBQztBQUVILHdDQUF3QztBQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNqQyxPQUFPO0lBQ1AsY0FBYztJQUNkLFNBQVMsRUFBRSxDQUFDO0lBQ1osa0JBQWtCLEVBQUUsQ0FBQztZQUNuQixhQUFhLEVBQUUsY0FBYztZQUM3QixXQUFXLEVBQUU7Z0JBQ1gsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFO2FBQzdEO1NBQ0YsQ0FBQztJQUNGLGVBQWU7Q0FDaEIsQ0FBQyxDQUFDLENBQUM7QUFFSixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtJQUNsQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDbkIsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCAqIGFzIGVjcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzJztcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZXZlbnRzJztcbmltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpbnRlZyBmcm9tICdAYXdzLWNkay9pbnRlZy10ZXN0cy1hbHBoYSc7XG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMtdGFyZ2V0cyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbmNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjayhhcHAsICdhd3MtZWNzLWludGVnLWVjcycpO1xuXG5jb25zdCB2cGMgPSBuZXcgZWMyLlZwYyhzdGFjaywgJ1ZwYycsIHsgbWF4QXpzOiAxIH0pO1xuXG5jb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHN0YWNrLCAnRWNzQ2x1c3RlcicsIHsgdnBjIH0pO1xuY2x1c3Rlci5hZGRDYXBhY2l0eSgnRGVmYXVsdEF1dG9TY2FsaW5nR3JvdXAnLCB7XG4gIGluc3RhbmNlVHlwZTogbmV3IGVjMi5JbnN0YW5jZVR5cGUoJ3QyLm1pY3JvJyksXG59KTtcblxuY29uc3QgZGVhZExldHRlclF1ZXVlID0gbmV3IHNxcy5RdWV1ZShzdGFjaywgJ015RGVhZExldHRlclF1ZXVlJyk7XG5cbi8vIENyZWF0ZSBhIFRhc2sgRGVmaW5pdGlvbiBmb3IgdGhlIGNvbnRhaW5lciB0byBzdGFydFxuY29uc3QgdGFza0RlZmluaXRpb24gPSBuZXcgZWNzLkVjMlRhc2tEZWZpbml0aW9uKHN0YWNrLCAnVGFza0RlZicpO1xudGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKCdUaGVDb250YWluZXInLCB7XG4gIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbUFzc2V0KHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdldmVudGhhbmRsZXItaW1hZ2UnKSksXG4gIG1lbW9yeUxpbWl0TWlCOiAyNTYsXG4gIGxvZ2dpbmc6IG5ldyBlY3MuQXdzTG9nRHJpdmVyKHsgc3RyZWFtUHJlZml4OiAnRXZlbnREZW1vJyB9KSxcbn0pO1xuXG4vLyBBbiBSdWxlIHRoYXQgZGVzY3JpYmVzIHRoZSBldmVudCB0cmlnZ2VyIChpbiB0aGlzIGNhc2UgYSBzY2hlZHVsZWQgcnVuKVxuY29uc3QgcnVsZSA9IG5ldyBldmVudHMuUnVsZShzdGFjaywgJ1J1bGUnLCB7XG4gIHNjaGVkdWxlOiBldmVudHMuU2NoZWR1bGUucmF0ZShjZGsuRHVyYXRpb24ubWludXRlcygxKSksXG59KTtcblxuLy8gVXNlIEVjc1Rhc2sgYXMgdGhlIHRhcmdldCBvZiB0aGUgUnVsZVxucnVsZS5hZGRUYXJnZXQobmV3IHRhcmdldHMuRWNzVGFzayh7XG4gIGNsdXN0ZXIsXG4gIHRhc2tEZWZpbml0aW9uLFxuICB0YXNrQ291bnQ6IDEsXG4gIGNvbnRhaW5lck92ZXJyaWRlczogW3tcbiAgICBjb250YWluZXJOYW1lOiAnVGhlQ29udGFpbmVyJyxcbiAgICBlbnZpcm9ubWVudDogW1xuICAgICAgeyBuYW1lOiAnSV9XQVNfVFJJR0dFUkVEJywgdmFsdWU6ICdGcm9tIENsb3VkV2F0Y2ggRXZlbnRzJyB9LFxuICAgIF0sXG4gIH1dLFxuICBkZWFkTGV0dGVyUXVldWUsXG59KSk7XG5cbm5ldyBpbnRlZy5JbnRlZ1Rlc3QoYXBwLCAnRWNzVGVzdCcsIHtcbiAgdGVzdENhc2VzOiBbc3RhY2tdLFxufSk7XG5cbmFwcC5zeW50aCgpO1xuIl19