module.exports = function(RED) {
    function MsgRepeaterNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        
        // Initialize node state
        node.capturing = false;
        node.flowVarName = "repeater_" + node.id;
        
        // Set initial status
        node.status({});
        
        // Handle incoming messages
        node.on('input', function(msg, send, done) {
            send = send || function() { node.send.apply(node, arguments) };
            
            // Handle capture command
            if (msg.capture === true) {
                node.capturing = true;
                node.status({fill:"blue", shape:"dot", text:"Capturing"});
                if (done) done();
                return;
            }
            
            // Handle repeat command
            if (msg.repeat === true) {
                const storedMsg = node.context().flow.get(node.flowVarName);
                if (storedMsg) {
                    const replayObj = RED.util.cloneMessage(storedMsg);
                    send(replayObj);
                } else {
                    node.warn("No message captured to repeat");
                }
                if (done) done();
                return;
            }
            
            // Normal message handling
            if (node.capturing) {
                // Store the message and reset capturing state
                node.context().flow.set(node.flowVarName, RED.util.cloneMessage(msg));
                node.capturing = false;
                node.status({fill:"green", shape:"dot", text:"Captured"});
            }
            
            // Always pass the original message through
            send(msg);
            if (done) done();
        });
        
        // Clean up when node is removed
        node.on('close', function() {
            node.status({});
        });
    }
    
    // HTTP endpoints for button actions
    RED.httpAdmin.post("/msg-repeater/:id/trigger-capture", RED.auth.needsPermission("msg-repeater.write"), function(req, res) {
        const node = RED.nodes.getNode(req.params.id);
        if (node) {
            node.capturing = true;
            node.status({fill:"blue", shape:"dot", text:"Capturing"});
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
    
    RED.httpAdmin.post("/msg-repeater/:id/trigger-repeat", RED.auth.needsPermission("msg-repeater.write"), function(req, res) {
        const node = RED.nodes.getNode(req.params.id);
        if (node) {
            const storedMsg = node.context().flow.get("repeater_" + node.id);
            if (storedMsg) {
                const replayObj = RED.util.cloneMessage(storedMsg);
                node.send(replayObj);
                res.sendStatus(200);
            } else {
                res.status(400).json({error: "No message captured to repeat"});
            }
        } else {
            res.sendStatus(404);
        }
    });
    
    RED.nodes.registerType("msg-repeater", MsgRepeaterNode);
}
