# node-red-contrib-msg-repeater

A Node-RED node that can capture and repeat messages.

## Features

- Capture any message flowing through the node
- Replay the captured message on demand without clearing it from memory
- Visual status indicator showing capture state
- Button on the node to trigger capture mode
- Second button on the node to trigger message replay

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

1. **Normal mode**: All regular messages pass through unchanged.
2. **Capture mode**: When a message with `msg.capture = true` is received, the node enters capture mode. The next message will be stored for later replay and also passed through unchanged.

Control messages:
- Messages with `msg.capture = true` put the node in capture mode but do not pass through
- Messages with `msg.repeat = true` trigger replay of the stored message but do not pass through

The captured message remains in memory until a new message is captured (by entering capture mode again).

### UI Buttons

- The main button on the node triggers capture mode
- The "Repeat" button on the node triggers a replay of the captured message

### Status Indicators

- No status: Normal mode, no message captured
- Blue dot "Capturing": Node is in capture mode, waiting for next message
- Green dot "Captured": A message has been captured and is available for replay

## Example Flow

```json
[
    {
        "id": "425c2ffc692b6f08",
        "type": "msg-repeater",
        "z": "f6f2187d.f17ca8",
        "name": "",
        "x": 530,
        "y": 580,
        "wires": [
            [
                "c4daf6e907b0b923"
            ]
        ]
    },
    {
        "id": "e402feb314f26bb1",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "Capture",
        "props": [
            {
                "p": "capture",
                "v": "true",
                "vt": "bool"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 350,
        "y": 540,
        "wires": [
            [
                "425c2ffc692b6f08"
            ]
        ]
    },
    {
        "id": "f73f2541e25985fb",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "Test Message",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "timestamp",
                "v": "",
                "vt": "date"
            },
            {
                "p": "jsonPayload",
                "v": "{\"key1\":\"value1\", \"list\": [\"first\", \"second\"]}",
                "vt": "json"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "Great day to be alive",
        "payload": "Hello World",
        "payloadType": "str",
        "x": 330,
        "y": 580,
        "wires": [
            [
                "425c2ffc692b6f08"
            ]
        ]
    },
    {
        "id": "f6423e902816d493",
        "type": "inject",
        "z": "f6f2187d.f17ca8",
        "name": "Repeat",
        "props": [
            {
                "p": "repeat",
                "v": "true",
                "vt": "bool"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 350,
        "y": 620,
        "wires": [
            [
                "425c2ffc692b6f08"
            ]
        ]
    },
    {
        "id": "c4daf6e907b0b923",
        "type": "debug",
        "z": "f6f2187d.f17ca8",
        "name": "Output",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 690,
        "y": 580,
        "wires": []
    },
    {
        "id": "666071d5abaca966",
        "type": "comment",
        "z": "f6f2187d.f17ca8",
        "name": "Start Capture",
        "info": "",
        "x": 530,
        "y": 540,
        "wires": []
    }
]
```

## License

MIT
