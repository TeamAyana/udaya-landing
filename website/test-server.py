import http.server
import socketserver
import os

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            html = """
<!DOCTYPE html>
<html>
<head>
    <title>Localhost Test</title>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; padding: 40px;">
    <h1 style="color: green;">✓ SUCCESS! Localhost is working!</h1>
    <p>If you can see this, your browser can access localhost.</p>
    <p>Server is running on port 8080</p>
    <p>Time: <span id="time"></span></p>
    <script>
        document.getElementById('time').textContent = new Date().toLocaleTimeString();
    </script>
</body>
</html>
"""
            self.wfile.write(html.encode())
        else:
            super().do_GET()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    httpd.serve_forever()