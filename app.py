from flask import Flask, send_file, request
from flask_cors import CORS
import PyPDF2
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route("/merger", methods=["POST"])
def mesclar():
    arquivos = request.files.getlist("pdfs")  # 🔥 pega os arquivos

    merger = PyPDF2.PdfMerger()

    for arquivo in arquivos:
        merger.append(arquivo)

    output = BytesIO()
    merger.write(output)
    merger.close()

    output.seek(0)

    return send_file(
        output,
        download_name="PDF_Final.pdf",
        as_attachment=True
    )

app.run(host="0.0.0.0", port=10000)