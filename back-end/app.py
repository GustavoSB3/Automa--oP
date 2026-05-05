from flask import Flask, request, send_file, render_template, jsonify
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler


app = Flask(__name__)
CORS(app)

def enviar_email(destinatario, caminho_arquivo, nome_arquivo):

    remetente = "gugapudgod@gmail.com"
    senha = "ybif sasz jdkx epam"

    msg = MIMEMultipart()
    msg["Subject"] = "Seu arquivo convertido está pronto!"
    msg["From"] = remetente
    msg["To"] = destinatario

    corpo = MIMEText("Olá! Segue em anexo o arquivo convertido pelo Conversor de Arquivos.")
    msg.attach(corpo)

    with open(caminho_arquivo, "rb") as f:
        anexo = MIMEBase("application", "octet-stream")
        anexo.set_payload(f.read())

    encoders.encode_base64(anexo)
    anexo.add_header("Content-Disposition", f"attachment; filename={nome_arquivo}")
    msg.attach(anexo)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(remetente, senha)
        server.sendmail(remetente, destinatario, msg.as_string())

    print(f"E-mail enviado para {destinatario}!")

def enviar_email_bytes(destinatario, conteudo_bytes, nome_arquivo):
    remetente = "gugapudgod@gmail.com"
    senha = "ybif sasz jdkx epam"

    msg = MIMEMultipart()
    msg["Subject"] = "Seu arquivo convertido está pronto!"
    msg["From"] = remetente
    msg["To"] = destinatario

    corpo = MIMEText("Segue em anexo o arquivo convertido.")
    msg.attach(corpo)

    anexo = MIMEBase("application", "octet-stream")
    anexo.set_payload(conteudo_bytes)
    encoders.encode_base64(anexo)
    anexo.add_header("Content-Disposition", f"attachment; filename={nome_arquivo}")
    msg.attach(anexo)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(remetente, senha)
        server.sendmail(remetente, destinatario, msg.as_string())

    print(f"E-mail enviado para {destinatario}!")

@app.route("/converter-e-agendar", methods=["POST"])
def converter_e_agendar():
    try:
        if "file" not in request.files or "email" not in request.form:
            return jsonify({"erro": "Arquivo ou e-mail não informado"}), 400

        arquivo = request.files["file"]
        email_destino = request.form["email"]

        if not arquivo.filename.endswith((".xls", ".xlsx")):
            return jsonify({"erro": "Envie apenas arquivos Excel (.xls ou .xlsx)"}), 400

        # lê na memória, sem salvar no disco
        import io
        conteudo = arquivo.read()
        df = pd.read_excel(io.BytesIO(conteudo), engine="openpyxl")

        csv_buffer = io.StringIO()
        df.to_csv(csv_buffer, index=False)
        csv_bytes = csv_buffer.getvalue().encode("utf-8")

        # envia imediatamente
        enviar_email_bytes(email_destino, csv_bytes, "resultado.csv")

        return jsonify({"mensagem": f"Arquivo convertido e enviado para {email_destino}!"}), 200

    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route("/")
def home():
    return "API rodando 🚀"


@app.route("/converter", methods=["POST"])
def converter():
    try:
        if "excel" not in request.files:
            return "Nenhum arquivo enviado", 400

        arquivo_excel = request.files["excel"]

        if arquivo_excel.filename == "":
            return "Arquivo sem nome", 400

        arquivo_excel.save("teste.xlsx")

        tabela = pd.read_excel("teste.xlsx")

        nome_db = "banco_teste_logistica.db"
        engine = create_engine(f"sqlite:///{nome_db}")

        tabela.to_sql(
            name="produtos_logistica",
            con=engine,
            if_exists="replace",
            index=False,
        )

        if not os.path.exists(nome_db):
            return "Erro: banco não foi criado", 500

        return send_file(nome_db, as_attachment=True)

    except Exception as e:
        return str(e), 500
    
@app.route('/menu')
def menu():
    return render_template('menu.html')


@app.route("/converter-db-excel", methods=["POST"])
def converter_db_excel():
    try:
        arquivo_db = request.files.get("db")

        if not arquivo_db or not arquivo_db.filename.endswith(".db"):
            return "Arquivo inválido! Envie apenas .db", 400

        caminho_db = "temp.db"
        arquivo_db.save(caminho_db)

        engine = create_engine(f"sqlite:///{caminho_db}")

        tabelas = pd.read_sql(
            "SELECT name FROM sqlite_master WHERE type='table';", engine
        )

        nome_tabela = tabelas.iloc[0, 0]
        df = pd.read_sql(f"SELECT * FROM {nome_tabela}", engine)

        nome_excel = "resultado.xlsx"
        df.to_excel(nome_excel, index=False)

        return send_file(nome_excel, as_attachment=True)

    except Exception as e:
        return str(e), 500


@app.route("/converter_excel_csv", methods=["POST"])
def converter_excel_csv():
    try:
        arquivo_excel = request.files.get("file")

        if not arquivo_excel or not arquivo_excel.filename.endswith((".xls", ".xlsx")):
            return "Envie apenas arquivos Excel (.xls ou .xlsx)", 400

        caminho_excel = "temp.xlsx"
        arquivo_excel.save(caminho_excel)

        df = pd.read_excel(caminho_excel)

        nome_csv = "resultado.csv"
        df.to_csv(nome_csv, index=False)

        return send_file(nome_csv, as_attachment=True)

    except Exception as e:
        return str(e), 500
    
scheduler = BackgroundScheduler()
scheduler.start()

if __name__ == "__main__":
    app.run(debug=True)