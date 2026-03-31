from flask import Flask, request, send_file, render_template
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import os
import traceback


app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/converter", methods=["POST"])
def converter():
    try:
        arquivo_excel = request.files["excel"]

        
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
        print(traceback.format_exc())
        return str(e), 500



@app.route("/converter-db-excel", methods=["POST"])
def converter_db_excel():
    try:
        arquivo_db = request.files["db"]

       
        if not arquivo_db.filename.endswith(".db"):
            return "Arquivo inválido! Envie apenas .db", 400

        caminho_db = "temp.db"
        arquivo_db.save(caminho_db)

        engine = create_engine(f"sqlite:///{caminho_db}")

        tabelas = pd.read_sql(
            "SELECT name FROM sqlite_master WHERE type='table';",
            engine,
        )

        nome_tabela = tabelas.iloc[0, 0]

        df = pd.read_sql(f"SELECT * FROM {nome_tabela}", engine)

        nome_excel = "resultado.xlsx"
        df.to_excel(nome_excel, index=False)

        return send_file(nome_excel, as_attachment=True)

    except Exception as e:
        print(traceback.format_exc())
        return str(e), 500
    
@app.route("/converter-excel-csv", methods=["POST"])
def converter_db_excel():
    try:
        arquivo_db = request.files["db"]

       
        if not arquivo_db.filename.endswith(".db"):
            return "Arquivo inválido! Envie apenas .db", 400

        caminho_db = "temp.db"
        arquivo_db.save(caminho_db)

        engine = create_engine(f"sqlite:///{caminho_db}")

        tabelas = pd.read_sql(
            "SELECT name FROM sqlite_master WHERE type='table';",
            engine,
        )

        nome_tabela = tabelas.iloc[0, 0]

        df = pd.read_sql(f"SELECT * FROM {nome_tabela}", engine)

        nome_excel = "resultado.xlsx"
        df.to_excel(nome_excel, index=False)

        return send_file(nome_excel, as_attachment=True)

    except Exception as e:
        print(traceback.format_exc())
        return str(e), 500

