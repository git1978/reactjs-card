import jsonServer from 'json-server';
import { loadJsonFileSync } from 'load-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
 
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const mydirname = dirname(fileURLToPath(import.meta.url));
 
const router = jsonServer.router(join(mydirname, './db.json'));
const routes = loadJsonFileSync(join(mydirname, './routes.json'));
const db = loadJsonFileSync(join(mydirname, './db.json'));
 
server.use(jsonServer.rewriter(routes));
server.use(middlewares);
server.use(jsonServer.bodyParser);
 
server.post('/documents', function (req, res) {
  let { typeNetDocuments, accounts } = req.body;
 
  let documents = db.documents_relv;
 
  switch (typeNetDocuments.toString()) {
    case ['RELEV', 'RELEVS', 'RSYNS', 'RELEVM', 'RSYNM', 'RELVM', 'RELVA'].toString():
      documents = db.documents_relv;
      break;
    case ['RECH'].toString():
      documents = db.documents_rech;
      break;
    case ['20100064'].toString():
      documents = db.documents_fac;
      break;
    case ['AOVI'].toString():
      documents = db.documents_aovi;
      break;
    case ['282'].toString():
      documents = db.documents_encs;
      break;
    case ['281'].toString():
      documents = db.documents_relv;
      break;
    case ['CDPCC'].toString():
      documents = db.documents_relv;
      break;
    case ['RMFEC'].toString():
      documents = db.documents_relv;
      break;
    case ['RAFEC'].toString():
      documents = db.documents_relv;
      break;
    case ['RELVCC', 'REMBCC'].toString():
      documents = db.documents_rel_cc;
      break;
    default:
      documents = db.documents_relv;
      break;
  }
  const accountIds = accounts.map((account) => account.accountId);
 
  const filteredDocs = {
    data: documents.data.filter((data) => accountIds.includes(data.contractNumber)),
  };
  res.jsonp(filteredDocs);
});
 
server.post('/accounts_habilitations', function (req, res) {
  // res.status(403); //test for redirect to promo
  res.jsonp(db.accounts_habilitations); //object in db.json
});
 
server.use(router);
 
server.listen(6000, () => {
  console.log('JSON Server is running');
});
 
process.once('SIGTERM', () => process.exit(0));
 