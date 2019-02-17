# MESG-Z
---
A Zapier Connector built on the decentralized application network MESG.

## Inspiration
[MESG - The new economy of app development](https://mesg.com/) wants to take advantage of distributed services to streamline applications, but the ecosystem of services available on blockchain are small. With MESG-Z, users of MESG can easily integrate their blockchain based application with exising centralized services using Zapier, and this Zapier connector.

## How to Install
Add the service to your docker swarm with `mesg-core service deploy https://github.com/JBarna/MESG-Z`

To gain access to the MESG app on Zapier, open a ticket and I will invite you!

## Example Application
[In this example](https://github.com/JBarna/mesg-example-app) A MESG application waits for
1. An incoming webhook
2. Goes out to Zapier to retrieve centralized resources
![Zapier](https://cl.ly/27f342fa8a3c/Image%2525202019-02-17%252520at%2525206.42.33%252520PM.png)

3. Sends a messages with those resources to Slack

## Schema
Load Sample Data
```yaml
loadSample:
  inputs:
    triggerType:
      description: "The type of zapier trigger that this sample corresponds to"
      type: String
    sampleData:
      description: "The sample of data that will be sent to Zapier to start your zap"
      type: Object
  outputs:
    success:
      name: "Success"
      description: "Output when Zapier returns with Data"
      data:
        outputs:
          type: Any
    error:
      data:
        error:
          type: Any
```

Execute a Zap Workflow and retrieve data

```yaml
execute:
  inputs:
    triggerType:
      description: "The type of zapier trigger that will fire. Defined in your Zapier Trigger" 
      type: String
    data:
      description: "The data to send to the Zapier trigger to be used in the following Zapier steps"
      type: Object
  outputs:
    success:
      name: "Success"
      description: "Output when Zapier returns with Data"
      data:
        outputs:
          type: Any
    error:
      data:
        error:
          type: Any
```

## Challenges I ran into
The ran into two main challenges: 
1. Building the MESG Zapier App (on the Zapier side) is time consuming and there are more parts than you would expect for such a simple application.
2. The node.js MESG SDK does not expose the `execution ID` to the services, so I had to store the success callback in memory. This is not optimal as any service restart will wipe the history of existing zaps.

# License
MIT
