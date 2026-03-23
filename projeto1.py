import PyPDF2
import os

merger = PyPDF2.PdfMerger.PdfMerger()

lista_arquivos = os.listdir()
print(lista_arquivos)