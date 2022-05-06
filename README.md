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

![read.png](./doc/images/read.png)