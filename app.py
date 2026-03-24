from flask import Flask, send_file
from flask_cors import CORS
from projeto1 import mesclar_pdfs as merger
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route("/merger", methods=["POST"])
def mesclar():
    caminho = merger()
    return send_file(caminho, as_attachment=True)

app.run(host="0.0.0.0", port=10000)