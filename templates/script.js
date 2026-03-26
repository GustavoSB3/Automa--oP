async function enviarPDFs() {
  const input1 = document.getElementById("pdfInput1");
  const input2 = document.getElementById("pdfInput2");

  const files1 = input1.files;
  const files2 = input2.files;

  if (files1.length === 0 && files2.length === 0) {
    alert("Selecione arquivos");
    return;
  }

  const formData = new FormData();

  for (let file of files1) {
    formData.append("pdfs", file);
  }

  for (let file of files2) {
    formData.append("pdfs", file);
  }

  try {
    const response = await fetch("http://127.0.0.1:10000/merger", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PDF_Final.pdf";
    a.click();
    console.log("Download feito com sucesso!");
  } catch (error) {
    console.log(error.message);
  }
}
