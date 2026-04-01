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

    function enviarExcel() {
      console.log("ok");
    }

    window.enviarExcel = enviarExcel;

    console.log("Excel convertido para DB com sucesso!");
  } catch (error) {
    alert("Falha na conversão: " + error.message);
  }
}
