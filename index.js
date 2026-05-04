const WebSocket = require('ws');

const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.send('Welcome!');

  ws.on('message', message => {
    const text = message.toString();
    console.log('Received:', text);

    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });
});
