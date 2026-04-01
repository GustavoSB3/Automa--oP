async function enviarCSV() {
  const input = document.getElementById("CSVinput");
  const file = input.files[0];
  const button = document.getElementById("enviarCSV");

  if (!file) {
    alert("Selecione um banco de dados!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      "https://automa-op-1.onrender.com/converter_excel_csv",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "convertido.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();

    console.log("CSV convertido para Excel!");
  } catch (error) {
    alert("Erro: " + error.message);
  }

  button.innerText = "Convertendo...";
  button.disabled = true;
}