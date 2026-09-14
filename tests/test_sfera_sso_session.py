import unittest

import server


class SferaSsoSessionTests(unittest.TestCase):
    def test_each_request_refreshes_role_claims_from_sfera(self):
        original_validate = server.validate_sfera_session
        server.validate_sfera_session = lambda _user_id, _email: {
            "issuer": "sfera",
            "audience": "mmtable",
            "name": "Updated User",
            "organizations": [{"id": "org-1", "name": "Org", "role": "admin"}],
            "expiresIn": 90,
        }
        try:
            with server.app.test_request_context("/api/me"):
                server.session["email"] = "user@example.test"
                server.session["name"] = "Old User"
                server.session["auth_provider"] = "sfera"
                server.session["sfera_user_id"] = "sfera-user-1"
                email, _scopes, _token = server._authenticate_request()
                self.assertEqual(email, "user@example.test")
                self.assertEqual(server.session["name"], "Updated User")
                self.assertEqual(server.session["sfera_organizations"][0]["role"], "admin")
        finally:
            server.validate_sfera_session = original_validate


if __name__ == "__main__":
    unittest.main()
