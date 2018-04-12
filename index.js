const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');
const index = fs.readFileSync('./html/index.html');
const path = require('path');

const cmd = path.join(__dirname,'/test/test')
const cmd_params = ['1','2','3']

var proc = null

function start(){
  if (!proc){
    proc = spawn(cmd, cmd_params, { stdio: 'inherit' } );
  }
}

function stop(){
  if (proc){
    proc.kill()
    proc = null
  }
}

function dispatcher(url){
  switch (url) {
    case '/start':
      start()
      break;
    case '/stop':
      stop()
      break;
    default:

  }
}

http.createServer(function (req, res) {
  dispatcher(req.url)
  res.writeHead(200);
  res.end(index);
}).listen(3000);
