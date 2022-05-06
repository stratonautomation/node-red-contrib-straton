# Node-RED nodes for Straton Data-Server

This package **node-red-contrib-straton** contains nodes to easily connect to a Straton runtime data-server from [Straton Automation](https://straton-plc.com).

Using the nodes you can connect to Straton runtime data-server to read and write application and system variables.

![nodes.png](./docs/images/nodes.png)

## Installation

Install using the managed palette from inside Node-RED.

### In Node-RED (preferred)

* Via **Manage Palette** -> **Search** for `node-red-contrib-ctrlx-automation`

### In a shell

* go to the Node-RED user data directory, e.g.: `~/.node-red`
* run `npm install node-red-contrib-ctrlx-automation --save`

## Usage - Quick Overview

### Straton Read

Connect to a WebSocket and subscribe to one or several straton variables.

![read.png](./docs/images/read.png)


### Straton Write

Connect to a WebSocket and write value of a straton variable.
Each time a message is coming in, the configured variable will be written

![write.png](./docs/images/write.png)


### Straton Websocket

Connect to a WebSocket and subscribe to one or several straton variables.
Additionally, it can send other commands when a message is coming in.

There will be an output for each subscribed variable.
Each time the value of a variable is changed, a message with value will be sent on the corresponding output.

An additional output will send message with the result of the command sent 

![websocket.png](./docs/images/websocket.png)


### Straton Command

Sends a data-server command to its output when receive a message.
This node should be used in conjunction with Straton Websocket.

![cmd.png](./docs/images/cmd.png)


## Documentation

Each node has it's own help/documentation available in the help window.

A more complete user guide is available [here](./docs/straton_user_guide_Node_Red_Rev2.pdf)

