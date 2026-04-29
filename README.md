# 📊 Conversor Excel ↔ SQLite / CSV

Ferramenta web para conversão de arquivos entre formatos Excel, banco de dados SQLite e CSV — sem precisar instalar nada. Basta acessar, fazer upload e baixar.

🔗 **[Acesse o projeto ao vivo](https://automa-o-p.vercel.app/)**

---

## ✨ Funcionalidades

- **Excel → SQLite** — Converte planilhas `.xlsx`/`.xls` para banco de dados `.db`
- **SQLite → Excel** — Exporta tabelas de um banco `.db` de volta para planilha `.xlsx`
- **Excel → CSV** — Converte planilhas para o formato `.csv`

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Python + Flask |
| Frontend | HTML, CSS, JavaScript |
| Estilização | Tailwind CSS |
| Deploy | Vercel |

---

## 🚀 Como rodar localmente

**Pré-requisitos:** Python 3.x instalado

```bash
# Clone o repositório
git clone https://github.com/GustavoSB3/Automa--oP.git
cd Automa--oP

# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor
python app.py
```

Acesse `http://localhost:5000` no navegador.

---

## 📁 Estrutura do projeto

```
├── app.py              # Servidor Flask e rotas da API
├── requirements.txt    # Dependências Python
├── static/
│   ├── conection.js    # Lógica de frontend
│   └── styles.css
└── templates/
    └── index.html      # Interface principal
```

---

## 💡 Motivação

Criei esse projeto para resolver um problema prático: muitos sistemas legados em empresas exportam dados apenas em Excel, enquanto aplicações modernas precisam de SQLite ou CSV. Essa ferramenta elimina a necessidade de conversão manual, economizando tempo em fluxos de trabalho de dados.

---

## 📬 Contato

Feito por **Gustavo Berg** — [LinkedIn](www.linkedin.com/in/gustavo-berg-31b97b1b9) · [GitHub](https://github.com/GustavoSB3)

> Aberto a oportunidades em desenvolvimento e freelances. Entre em contato!
