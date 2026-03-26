import pandas as pd
from sqlalchemy import create_engine

tabela = pd.read_excel("Excel\Planilha de Teste Logística e Desafios.xlsx")
print(tabela)

engine = create_engine("mysql+pymysql://root:gure2408@localhost:3306/login")
Base = declarative_base()

class Usuario(Base):