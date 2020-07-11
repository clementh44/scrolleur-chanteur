const WebSocket = require('ws');
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 8100 });
var offsetHeight = 0;

console.log("Server started...");

wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;

  ws.on('message', function incoming(data) {
    var ob = JSON.parse(data);
    switch (ob.type) {
      case 'ping':
        ws.isAlive = true;
        break;
      case 'init':
        console.log("nouvelle connection : ip=" + ip);
        if(offsetHeight == 0)offsetHeight = parseInt(ob.content);
        ws.send('{ "type":"offsetHight", "content": ' + offsetHeight + '}');
        break;
      case 'offsetHight':
        console.log("demande offsetHight");
        ws.send('{ "type":"offsetHight", "content": ' + offsetHeight + '}');
        break;
      default:
        console.log("Received: " + ob.content)
        envoieBroadcast(ws, ob.type, ob.content);
        //console.log("ERR : type inconnu !")
        break;
    }
  });

  /**
   * fin de connection
   */
  ws.on("close", function () {
    console.log("Fin de connection pour : " + ip);
  });

  /**
   * Vérification que le client est toujours connecté
   */
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) { // pour chaque id
      if(ws.OPEN){
        if (ws.isAlive == false){
          console.log("fin de co");
          ws.close();
          
          return ws.terminate();  // si pas de réponse
        }
        ws.isAlive = false;
        ws.send('{ "type":"ping", "content": ""}'); // on envoie type ping
        setTimeout(function(){
          if (ws.isAlive == false) {
            console.log("pas de réponse !");
            ws.send('{ "type":"ping", "content": ""}'); // on envoie type ping
          }
        }, 2000);
      }
      
    });
  }, 30000);  // toutes les 10s (peut évoluer si trop rapide)
});

/**
 * Permet l'envoie de message à tous les clients
 * @param {String} texte : texte à envoyer
 */
function envoieBroadcast(ws, type, texte){
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      console.log("envoie à tout le monde : " + texte);
      client.send('{ "type":"' + type + '", "content": "' + texte + '"}');
    }
  });
}