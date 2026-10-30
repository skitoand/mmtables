"""Local two-service fixture for the embedded MMTable browser scenario."""
import importlib.util
import json
import os
from pathlib import Path
import sqlite3
import sys
import tempfile
import threading
from http.server import ThreadingHTTPServer
from werkzeug.serving import make_server

ROOT = Path(os.environ["SFERA_REPO"])
sys.path.insert(0, str(ROOT))
import server as kb

temp = tempfile.TemporaryDirectory()
kb.DATA_DIR = Path(temp.name) / 'kb'
kb.DB_PATH = kb.DATA_DIR / 'kb.db'
kb.AVATARS_DIR = kb.DATA_DIR / 'avatars'
kb.init_db()
conn=kb.get_db()
conn.execute("INSERT INTO users(id,email,full_name,password_salt,password_hash,is_admin,created_at) VALUES ('embed-owner','embed@example.test','Embed Owner','','',0,?)",(kb.now_iso(),))
conn.execute("INSERT INTO organization_members VALUES (?, 'embed-owner', 'member', ?)",(kb.DEFAULT_ORG_ID,kb.now_iso()))
conn.execute("INSERT INTO sessions VALUES ('embed-session','embed-owner','2099-01-01T00:00:00+00:00',?)",(kb.now_iso(),))
conn.execute("INSERT INTO kb_folders(id,organization_id,parent_folder_id,app_slug,is_app_root,title,access_json,sort_order,created_by_user_id,updated_by_user_id,created_at,updated_at) VALUES ('embed-root',?,'','Tickets',1,'Root','[]',1,'embed-owner','embed-owner',?,?)",(kb.DEFAULT_ORG_ID,kb.now_iso(),kb.now_iso()))
user={'id':'embed-owner','isAdmin':False,'is_superadmin':False}
doc=kb.kb_core.create_document(conn,user,{'organizationId':kb.DEFAULT_ORG_ID,'folderId':'embed-root','title':'Встроенная таблица','documentType':'mmtable'},kb.kb_core.KB_MODE_AGGREGATE,'',kb.list_admins,kb.generate_id,kb.generate_short_code,kb.now_iso())
external='abcdef123456'
conn.execute("UPDATE kb_documents SET external_document_id=?,external_url=? WHERE id=?",(external,'https://mmtable.crystalsystems.ru/d/'+external,doc['id']))
conn.commit();conn.close()
os.environ['MMTABLE_BRIDGE_SECRET']='fixture-bridge-secret'
os.environ['SFERA_BRIDGE_SECRET']='fixture-bridge-secret'
os.environ['SFERA_SYNC_DELIVERY_ENABLED']='0'
mmroot=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(mmroot))
spec=importlib.util.spec_from_file_location('mmtable_fixture_server',mmroot/'server.py')
mm=importlib.util.module_from_spec(spec);sys.modules[spec.name]=mm;spec.loader.exec_module(mm)
mm.DB_PATH=str(Path(temp.name)/'mmtable.db');mm._init_db()
@mm.app.route('/__test/reset', methods=['POST'])
def reset_test_document():
 c=mm._db();c.execute('DELETE FROM document_edit_locks');c.execute('DELETE FROM document_presence')
 layout={'schemaVersion':3,'activeSheetId':1,'sheets':[{'id':1,'name':'Лист 1','layout':{'shapes':[],'windows':[],'connectors':[]}}]}
 c.execute('UPDATE user_documents SET layout_json=?,updated_at=? WHERE id=?',(json.dumps(layout),mm._new_doc_ts(),external));c.commit();c.close()
 return {'ok':True}

@mm.app.route('/__test/advance', methods=['POST'])
def advance_test_document():
 c=mm._db();row=c.execute("SELECT * FROM user_documents WHERE id=?",(external,)).fetchone()
 layout=json.loads(row['layout_json'])
 for sheet in layout.get('sheets',[]):
  for shape in sheet.get('layout',{}).get('shapes',[]):
   shape['text']='SERVER VERSION';shape['textHtml']='SERVER VERSION'
 result,error,_=mm._atomic_update_layout(c,external,json.dumps(layout),row['updated_at']);c.close()
 return {'ok':not error}

c=mm._db()
c.execute("INSERT INTO user_documents(id,email,name,layout_json,is_active) VALUES (?,?,?, ?,0)",(external,'embed@example.test','Встроенная таблица',json.dumps({'activeSheetId':'sheet1','sheets':[{'id':'sheet1','name':'Лист 1','layout':{'shapes':[],'windows':[],'connectors':[]}}]})))
c.execute("INSERT INTO sfera_document_links(sfera_document_id,sfera_organization_id,mmtable_document_id,owner_email) VALUES (?,?,?,?)",(doc['id'],kb.DEFAULT_ORG_ID,external,'embed@example.test'));c.commit();c.close()
source=(ROOT/'frontend/kb.js').read_text().replace('  global.CrystalKB = {','  global.__embedTest={render:renderKbDocumentPanel,mount:mountKbMmtableEditor,layout:layoutKbDocumentViewer,state:kbState};\n  global.CrystalKB = {')
class Handler(kb.KnowledgeBaseHandler):
 def log_message(self,*args):pass
 def do_GET(self):
  if self.path=='/test-kb.js':
   data=source.encode();self.send_response(200);self.send_header('Content-Type','text/javascript; charset=utf-8');self.end_headers();self.wfile.write(data);return
  if self.path=='/test-host':
   data=('''<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="/kb.css"><style>body{margin:0}.host{padding:20px}.knowledge-workspace{width:100%}</style><div id="app" class="host"></div><script src="/test-kb.js"></script><script>
CrystalKB.configure({getOrganizationId:()=>'''+json.dumps(kb.DEFAULT_ORG_ID)+''',getUserId:()=> 'embed-owner',apiRequest:async(url,opts={})=>{const r=await fetch(url,{credentials:'include',...opts});const j=await r.json();if(!r.ok)throw Error(j.error);return j},onRender:()=>{document.querySelector('#app').innerHTML=__embedTest.render();__embedTest.layout();__embedTest.mount()}});
window.selectDoc=async()=>{await CrystalKB.handleAction('kb-open-document',{getAttribute:()=>'''+json.dumps(doc['id'])+'''})};
document.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(el)CrystalKB.handleAction(el.dataset.action,el)});
selectDoc();</script>''').encode()
   self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.end_headers();self.wfile.write(data);return
  return super().do_GET()
http=ThreadingHTTPServer(('127.0.0.1',0),Handler)
threading.Thread(target=http.serve_forever,daemon=True).start()
os.environ['SFERA_SSO_BASE_URL']='http://127.0.0.1:'+str(http.server_port)
mmhttp=make_server('127.0.0.1',0,mm.app,threaded=True)
threading.Thread(target=mmhttp.serve_forever,daemon=True).start()
print(json.dumps({'kbPort':http.server_port,'mmPort':mmhttp.server_port,'docId':doc['id'],'externalId':external}),flush=True)
try:sys.stdin.read()
finally:http.shutdown();mmhttp.shutdown();temp.cleanup()
