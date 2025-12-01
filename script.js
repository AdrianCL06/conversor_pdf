const botonConvertir = document.querySelector(".botonConvertir");
const input = document.querySelector(".inputArchivo")
const formulario = document.querySelector('#form');

//la libreria para pasar a PDF
const { jsPDF } = window.jspdf;

botonConvertir.addEventListener('click', () => {
    const file = input.files[0];
    if (!file) {
        alert('Por favor, selecciona un archivo de imagen.');
        return;
    }
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
        const imgData = event.target.result; // Contenido de la imagen como Data URL (Base64)
        
        // 3. Crear objeto de Imagen para obtener dimensiones
        const img = new Image();
        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            // 4. Crear el documento PDF con las dimensiones de la imagen
            const doc = new jsPDF({
                orientation: imgWidth > imgHeight ? 'l' : 'p', // Orientación (Landscape o Portrait)
                unit: 'px', // Usar píxeles como unidad
                format: [imgWidth, imgHeight] // Establecer el tamaño del PDF al de la imagen
            });

            // 5. Agregar la imagen al documento
            // (0, 0) es la esquina superior izquierda. La imagen ocupará todo el documento.
            doc.addImage(imgData, 0, 0, imgWidth, imgHeight); 

            // 6. Guardar el PDF y forzar la descarga
            // Esto le indica al navegador que descargue el archivo.
            doc.save("imagen-convertida.pdf");
        };
        img.src = imgData;
    };

    
    fileReader.readAsDataURL(file);

})