import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.ico':'image/x-icon', '.ttf':'font/ttf', '.woff':'font/woff', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8' };
const server = http.createServer(async (req,res) => {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Cache-Control','no-cache');
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  let filename;
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    filename = path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    const relative = path.relative(root,filename);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(/[\\/]/).some(part=>part.startsWith('.')) || /^runtime(?:[\\/]|$)/i.test(relative) || !types[path.extname(filename).toLowerCase()]) {res.writeHead(404);res.end('Not found');return;}
  } catch {res.writeHead(400);res.end('Bad request');return;}
  try {
    const data = await fs.readFile(filename);
    res.writeHead(200,{'Content-Type':types[path.extname(filename).toLowerCase()],'Content-Length':data.length});
    res.end(req.method==='HEAD'?undefined:data);
  } catch {res.writeHead(404);res.end('Not found');}
});
let port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port<1024 || port>65535) port=3000;
let attempts = 0;
server.on('error',error=>{
  if(error.code==='EADDRINUSE' && attempts++<10 && port<65535){port++;server.listen(port,'127.0.0.1');return;}
  console.error('Server could not start:',error.message);process.exitCode=1;
});
server.on('listening',()=>{
  const url=`http://localhost:${port}`;
  console.log(`\nEge Hospital Sac Merkezi\n\n${url}\n\nDayandirmaq ucun Ctrl+C basin.\n`);
  if(process.argv.includes('--open') && process.platform==='win32'){
    const opener=spawn('cmd.exe',['/c','start','',url],{windowsHide:true,stdio:'ignore'});
    opener.on('error',()=>{});opener.unref();
  }
});
server.listen(port,'127.0.0.1');
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
