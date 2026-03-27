from flask import Flask, request, send_file
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import os
import traceback  

app = Flask(__name__)
CORS(app)

@app.route("/converter", methods=["POST"])
def converter():
    try:
        print("FILES:", request.files)

        arquivo_excel = request.files['excel']

        
        arquivo_excel.save("teste.xlsx")
        print("Arquivo salvo")

        
        tabela = pd.read_excel("teste.xlsx")
        print("Excel lido")
        print(tabela.head())

        nome_db = "banco_teste_logistica.db"

        engine = create_engine(f"sqlite:///{nome_db}")

        
        tabela.to_sql(
            name="produtos_logistica",
            con=engine,
            if_exists="replace",
            index=False
        )

        print("Banco criado!")

        
        if not os.path.exists(nome_db):
            return "Erro: banco não foi criado", 500

        return send_file(nome_db, as_attachment=True)

    except Exception as e:
        print("ERRO COMPLETO:")
        print(traceback.format_exc())
        return str(e), 500

if __name__ == '__main__':
    app.run(port=10000, debug=True)

    
@app.route("/converter-db-excel", methods=["POST"])
def converter_db_excel():
    try:

        arquivo_excel = request.files['db']

        
        arquivo_excel.save("teste.xlsx")
        print("Arquivo salvo")

        
        tabela = pd.read_excel("teste.xlsx")
        print("Excel lido")
        print(tabela.head())

        nome_db = "banco_teste_logistica.db"

        engine = create_engine(f"sqlite:///{nome_db}")

        
        tabela.to_sql(
            name="produtos_logistica",
            con=engine,
            if_exists="replace",
            index=False
        )

        print("Banco criado!")

        
        if not os.path.exists(nome_db):
            return "Erro: banco não foi criado", 500

        return send_file(nome_db, as_attachment=True)

    except Exception as e:
        print("ERRO COMPLETO:")
        print(traceback.format_exc())
        return str(e), 500

if __name__ == '__main__':
    app.run(port=10000, debug=True)