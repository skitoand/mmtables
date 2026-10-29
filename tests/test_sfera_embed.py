import unittest
from unittest.mock import patch
import server
from test_sfera_open_token import SferaOpenTokenTests

class SferaEmbedHeadersTests(unittest.TestCase):
    def test_only_document_embed_routes_allow_sfera(self):
        client=server.app.test_client()
        for route in ['/', '/d/abcdef123456', '/login?embed=sfera', '/?embed=sfera']:
            response=client.get(route)
            self.assertEqual(response.headers.get('X-Frame-Options'),'SAMEORIGIN',route)
        response=client.get('/d/abcdef123456?embed=sfera')
        self.assertNotIn('X-Frame-Options',response.headers)
        self.assertEqual(response.headers['Content-Security-Policy'],"frame-ancestors 'self' https://sfera.crystalsystems.ru")
        self.assertNotIn('*',response.headers['Content-Security-Policy'])
        self.assertEqual(response.headers['Cache-Control'],'no-store')

class SferaEmbedTicketTests(SferaOpenTokenTests):
    def test_embed_flag_survives_ticket_exchange_without_forwarding_secret(self):
        server.consume_sfera_open_token=lambda token,doc:{'sferaUserId':'sfera_alice','email':'alice@example.test','name':'Alice','organizationId':'org_test','sferaDocumentId':'kbd_test','mmtableDocumentId':doc,'accessRole':'reader','expiresIn':90}
        response=self.client.get(f'/auth/sfera/open?token=secret-ticket&documentId={self.document_id}&embed=sfera')
        self.assertEqual(response.headers['Location'],f'/d/{self.document_id}?embed=sfera')
        self.assertNotIn('secret-ticket',response.headers['Location'])
        self.assertNotIn('X-Frame-Options',response.headers)

class SferaTicketClaimsTests(unittest.TestCase):
    def test_document_ticket_uses_its_own_audience(self):
        import io, json, sfera_sso
        claims={'issuer':'sfera','audience':'mmtable-open','email':'alice@example.test','mmtableDocumentId':'abcdef123456','accessRole':'editor'}
        with patch.dict('os.environ',{'SFERA_BRIDGE_SECRET':'test'}), patch.object(sfera_sso,'urlopen',return_value=io.BytesIO(json.dumps(claims).encode())):
            self.assertEqual(sfera_sso.consume_open_token('ticket','abcdef123456')['accessRole'],'editor')
    def test_regular_session_rejects_document_ticket(self):
        import io, json, sfera_sso
        claims={'issuer':'sfera','audience':'mmtable-open','email':'alice@example.test','mmtableDocumentId':'abcdef123456','accessRole':'editor'}
        with patch.dict('os.environ',{'SFERA_BRIDGE_SECRET':'test'}), patch.object(sfera_sso,'urlopen',return_value=io.BytesIO(json.dumps(claims).encode())):
            with self.assertRaises(PermissionError):sfera_sso.validate_session('user','alice@example.test')
