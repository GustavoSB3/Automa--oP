import pandas as pd
from sqlalchemy import create_engine

tabela = pd.read_excel(r"Excel\Produtos.xlsx")
print(tabela)

def engine_dados_teste():
    #host = "127.0.0.1"
    #user = "root"
    #password = "gure2408"
    #database = "login"

    url = "sqlite:///banco_teste_logistica.db"

    return create_engine(url)
 
engine = engine_dados_teste()

tabela.to_sql(name="produtos_logistica", con=engine, if_exists="replace", index=False)

print("Sucesso! O arquivo 'banco_teste_logistica.db' foi criado na sua pasta.")
