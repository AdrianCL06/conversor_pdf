const botonConvertir = document.querySelector(".botonConvertir");
const input = document.querySelector(".inputArchivo")
const botonBorrar = document.querySelector(".botonBorrar");

botonBorrar.disabled = true;
botonConvertir.disabled = true;

// Ocultar o deshabilitar el botón de borrar si no hay archivo.
input.addEventListener('change', () => {
    // Habilita el botón de convertir si hay un archivo
    botonConvertir.disabled = !input.files.length;
    // Habilita el botón de borrar (X) si hay un archivo
    botonBorrar.disabled = !input.files.length; 
});


// Lógica para el botón 'X'
botonBorrar.addEventListener('click', () => {
    // Vacía el input de archivo
    input.value = "";
    
    // Deshabilita el botón de convertir
    botonConvertir.disabled = true;
    
    // Deshabilita el botón de borrar
    botonBorrar.disabled = true; 
});

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
        const imgData = event.target.result; // Contenido de la imagen
        
        // Crear objeto de Imagen para obtener dimensiones
        const img = new Image();
        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            // Crear el documento PDF con las dimensiones de la imagen
            const doc = new jsPDF({
                orientation: imgWidth > imgHeight ? 'l' : 'p', // Orientación (Landscape o Portrait)
                unit: 'px', // Usar píxeles como unidad
                format: [imgWidth, imgHeight] // Establecer el tamaño del PDF al de la imagen
            });

            // Agregar la imagen al documento
            // (0, 0) es la esquina superior izquierda. La imagen ocupará todo el documento.
            doc.addImage(imgData, 0, 0, imgWidth, imgHeight); 

            // Guardar el PDF y forzar la descarga
            // Esto le indica al navegador que descargue el archivo.
            doc.save("imagen-convertida.pdf");
        };
        img.src = imgData;
    };

    
    fileReader.readAsDataURL(file);

})