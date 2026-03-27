async function enviarExcel() {
  const input = document.getElementById("excelInput");
  const file = input.files[0];

  if (!file) {
    alert("Por favor, selecione um arquivo Excel!"); // Adicionei o alert que faltava
    return;
  }

  // Ajuste 1: FormData com F e D maiúsculos
  const formData = new FormData();

  // Ajuste 2: O 'file' entra como segundo argumento dentro do parênteses
  formData.append("excel", file);

  try {
    const response = await fetch("http://127.0.0.1:10000/converter", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Erro no servidor: ${response.status}`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Ajuste 3: "a" entre aspas e configuração do link de download
    const a = document.createElement("a");
    a.href = url;
    a.download = "logistica_convertida.db"; // Sem isso, o navegador não sabe o nome do arquivo

    document.body.appendChild(a); // É boa prática anexar antes de clicar
    a.click();
    a.remove();

    console.log("Excel convertido para DB com sucesso!");
  } catch (error) {
    alert("Falha na conversão: " + error.message);
  }
}
