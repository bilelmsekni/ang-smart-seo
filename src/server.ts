import 'reflect-metadata';
import 'zone.js/dist/zone-node';
// import 'rxjs';

import { platformServer, renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory'
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
const PORT = 4000;

enableProdMode();

const app = express();

const template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();
const region: any = {};

app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };
  region.ipAdr = options.req.ip;
  region.lang = options.req.headers['accept-language'];
  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', 'src')
app.get('/region', function (req, res) {
  res.send(region);
});
app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
