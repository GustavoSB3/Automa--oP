from flask import Flask, send_file, render_template
from projeto1 import lista_arquivos

app = Flask(__name__)

@app.route("/")
def home():
   titulo = "Gestão de Usuários"
   usuarios = [
      { "nome": "Guilherme", "membro_ativo": True },
      { "nome": "Guilherme", "membro_ativo": True },
      { "nome": "Guilherme", "membro_ativo": True },
      ]
   return render_template("index.html", titulo=titulo, usuarios=usuarios)

@app.route("/mesclar")
def mesclar():
   caminho = lista_arquivos()
   return send_file(caminho, as_attachment=True)

app.run(debug=True)