async function enviarExcel() {
  const input = document.getElementById("excelInput");
  const file = input.files[0];

  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/excel",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert(
      "O formato do arquivo não é válido! O arquivo tem que ser .xlsx ou .xls",
    );
    return;
  }

  if (!file) {
    alert("Por favor, selecione um arquivo Excel!"); // Adicionei o alert que faltava
    return;
  }

  // Ajuste 1: FormData com F e D maiúsculos
  const formData = new FormData();

  // Ajuste 2: O 'file' entra como segundo argumento dentro do parênteses
  formData.append("excel", file);

  try {
    const response = await fetch("https://automa-op-1.onrender.com/converter", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Erro no servidor: ${response.status}`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "logistica_convertida.db";

    document.body.appendChild(a);
    a.click();
    a.remove();

    console.log("Excel convertido para DB com sucesso!");
  } catch (error) {
    alert("Falha na conversão: " + error.message);
  }
}

async function enviarDB() {
  const input = document.getElementById("dbInput");
  const file = input.files[0];

  const button = document.getElementById("enviarDB");

  if (!file) {
    alert("Selecione um banco de dados!");
    return;
  }

  const formData = new FormData();
  formData.append("db", file);

  try {
    const response = await fetch(
      "https://automa-op-1.onrender.com/converter-db-excel",
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
    a.download = "convertido.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();

    console.log("DB convertido para Excel!");
  } catch (error) {
    alert("Erro: " + error.message);
  }

  button.innerText = "Convertendo...";
  button.disabled = true;
}

async function enviarCSV() {
  const input = document.getElementById("CSVinput");
  const file = input.files[0];

  if (!file) {
    alert("Selecione um banco de dados!");
    return;
  }

  const formData = new FormData();
  formData.append("CSV", file);

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
    a.download = "convertido.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();

    console.log("CSV convertido para Excel!");
  } catch (error) {
    alert("Erro: " + error.message);
  }

  button.innerText = "Convertendo...";
}
