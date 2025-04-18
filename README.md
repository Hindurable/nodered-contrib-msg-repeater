# node-red-contrib-msg-repeater

A Node-RED node that can capture and repeat messages.

## Features

- Capture any message flowing through the node
- Replay the captured message on demand
- Visual status indicator showing capture state
- Button on the node to trigger capture mode
- Button in the configuration panel to trigger message replay

## Installation

### Local Installation

```bash
cd ~/.node-red
npm install /path/to/node-red-contrib-msg-repeater
```

### From NPM (Once Published)

```bash
cd ~/.node-red
npm install node-red-contrib-msg-repeater
```

## Usage

The node has two modes of operation:

1. **Normal mode**: All messages pass through unchanged.
2. **Capture mode**: When a message with `msg.capture = true` is received, the node enters capture mode. The next message will be stored for later replay and also passed through unchanged.

To replay a captured message, send a message with `msg.repeat = true`.

### UI Buttons

- The main button on the node triggers capture mode
- The "Repeat" button in the configuration panel triggers a replay of the captured message

### Status Indicators

- No status: Normal mode, no message captured
- Blue dot "Capturing": Node is in capture mode, waiting for next message
- Green dot "Captured": A message has been captured and is available for replay

## Example Flow

```json
[{"id":"f6f2187d.f17ca8","type":"msg-repeater","z":"2795455e.938b6a","name":"","x":340,"y":220,"wires":[["c6047a.ff4e95f8"]]},{"id":"7f1e24de.69544c","type":"inject","z":"2795455e.938b6a","name":"Capture","props":[{"p":"capture","v":"true","vt":"bool"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":150,"y":180,"wires":[["f6f2187d.f17ca8"]]},{"id":"89a29947.478f68","type":"inject","z":"2795455e.938b6a","name":"Test Message","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello World","payloadType":"str","x":170,"y":220,"wires":[["f6f2187d.f17ca8"]]},{"id":"3a9e3c57.c5c674","type":"inject","z":"2795455e.938b6a","name":"Repeat","props":[{"p":"repeat","v":"true","vt":"bool"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":150,"y":260,"wires":[["f6f2187d.f17ca8"]]},{"id":"c6047a.ff4e95f8","type":"debug","z":"2795455e.938b6a","name":"Output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":510,"y":220,"wires":[]}]
```

## License

MIT
