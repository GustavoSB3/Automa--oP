function mergerPDFs() {
  fetch("http://127.0.0.1:5000/merger")
    .then((response) => response.blob())
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectURL;
      a.download = "PDF_Final.pdf";
      a.click();
    });
}
