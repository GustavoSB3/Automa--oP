async function enviarExcel() {
  const input = document.getElementById("excelInput");
  const file = input.files[0];
  const button = document.getElementById("enviarExcel");

  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  if (!file) {
    alert("Por favor, selecione um arquivo Excel!");
    return;
  }

  if (!allowedTypes.includes(file.type)) {
    alert(
      "O formato do arquivo não é válido! O arquivo tem que ser .xlsx ou .xls",
    );
    return;
  }

  button.innerText = "Convertendo...";
  button.disabled = true;

  const formData = new FormData();
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
  } finally {
    button.innerText = "Converter e baixar .db";
    button.disabled = false;
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

  if (!file.name.endsWith(".db")) {
    alert("O formato do arquivo não é válido! O arquivo tem que ser .db");
    return;
  }

  button.innerText = "Convertendo...";
  button.disabled = true;

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
  } finally {
    button.innerText = "Converter e baixar .xlsx";
    button.disabled = false;
  }
}

async function enviarCSV() {
  const input = document.getElementById("CSVinput");
  const file = input.files[0];
  const button = document.getElementById("enviarCSV");

  if (!file) {
    alert("Selecione um arquivo Excel!");
    return;
  }

  button.innerText = "Convertendo...";
  button.disabled = true;

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

    console.log("Excel convertido para CSV!");
  } catch (error) {
    alert("Erro: " + error.message);
  } finally {
    button.innerText = "Converter para CSV";
    button.disabled = false;
  }
}

async function enviarArquivo() {
  const input = document.getElementById("sendInput");
  const file = input.files[0];
  const button = document.getElementById("sendButton");

  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (!file) {
    alert("Selecione um arquivo para enviar.");
    return;
  }

  if (!allowedTypes.includes(file.type)) {
    alert("Tipo de arquivo não permitido. Selecione um arquivo Excel (.xlsx).");
    return;
  }

  const email = document.getElementById("email").value;
  if (!email) {
    alert("Digite seu e-mail.");
    return;
  }

  button.innerText = "Enviando...";
  button.disabled = true;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  try {
    const response = await fetch(
      "https://automa-op-1.onrender.com/converter-e-agendar",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.erro || "Erro no servidor");

    alert(data.mensagem);
  } catch (error) {
    alert("Falha: " + error.message);
  } finally {
    button.innerText = "Enviar";
    button.disabled = false;
  }
}

// Funções placeholder para conversões ainda não implementadas no backend
function enviarPdfDocx() {
  const input = document.getElementById("sendInput");
  const file = input.files[0];
  const button = document.getElementById("sendButton");

  const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!file) {
    alert("Selecione um arquivo para enviar.");
    return;
  }

  if (!allowedTypes.includes(file.type)) {
    alert("Tipo de arquivo não permitido. Selecione um arquivo Excel (.xlsx).");
    return;
  }

  const email = document.getElementById("email").value;
  if (!email) {
    alert("Digite seu e-mail.");
    return;
  }

  button.innerText = "Enviando...";
  button.disabled = true;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  try {
    const response = await fetch(
      "https://automa-op-1.onrender.com/converter-e-agendar",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.erro || "Erro no servidor");

    alert(data.mensagem);
  } catch (error) {
    alert("Falha: " + error.message);
  } finally {
    button.innerText = "Enviar";
    button.disabled = false;
  }
}
function enviarPdfDb() {
  alert("Conversão PDF → DB em breve!");
}
