var WebSocket = require('ws');
var ws = WebSocket.Server;
var wss = new ws({port: 3001});

wss.on("connection", function (ws) {
    console.log("Connected");
    ws.on("message", function (message, isBinary) {
        wss.clients.forEach(function each(client) {
            if (ws === client) {
                console.log("- skip sender -");
                var enc = new TextDecoder("utf-8");
                var arr = new Uint8Array(message);
                console.log(enc.decode(arr));
            } else {
                client.send(message, { binary: isBinary });
            }
        });
    });
});