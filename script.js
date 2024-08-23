document.addEventListener('DOMContentLoaded', function() {
    const encryptButton = document.querySelector('.encrypt-button');
    const decryptButton = document.querySelector('.decrypt-button');
    const copyButton = document.querySelector('.copy');
    const textInput = document.getElementById('textInput');
    const textOutput = document.getElementById('textOutput');
    const image = document.querySelector('.image-container img');

    // Función de encriptación simple (sustitución de caracteres)
    function encrypt(text) {
        let encrypted = '';
        for (let i = 0; i < text.length; i++) {
            encrypted += String.fromCharCode(text.charCodeAt(i) + 3);
        }
        return encrypted;
    }

    // Función de desencriptación simple (sustitución de caracteres)
    function decrypt(text) {
        let decrypted = '';
        for (let i = 0; i < text.length; i++) {
            decrypted += String.fromCharCode(text.charCodeAt(i) - 3);
        }
        return decrypted;
    }

    // Función para mostrar el botón de copiar
    function updateCopyButtonVisibility() {
        if (textOutput.value) {
            copyButton.style.display = 'block';
        } else {
            copyButton.style.display = 'none';
        }
    }

    // Manejo de clic en el botón de encriptar
    encryptButton.addEventListener('click', function() {
        const inputText = textInput.value;
        if (inputText) {
            const encryptedText = encrypt(inputText);
            textOutput.value = encryptedText;
            image.style.display = 'none'; // Ocultar solo la imagen
            updateCopyButtonVisibility(); // Actualizar visibilidad del botón de copiar
        }
    });

    // Manejo de clic en el botón de desencriptar
    decryptButton.addEventListener('click', function() {
        const outputText = textOutput.value;
        if (outputText) {
            const decryptedText = decrypt(outputText);
            textOutput.value = decryptedText;
            image.style.display = 'none'; // Ocultar solo la imagen
            updateCopyButtonVisibility(); // Actualizar visibilidad del botón de copiar
        }
    });

    // Manejo de clic en el botón de copiar
    copyButton.addEventListener('click', function() {
        textOutput.select();
        document.execCommand('copy');
        alert('Texto copiado al portapapeles');
    });

    // Inicialmente ocultar el botón de copiar
    copyButton.style.display = 'none';

    // Manejo de borrado del texto en textInput
    textInput.addEventListener('input', function() {
        if (textInput.value === '') {
            image.style.display = 'block'; // Volver a mostrar la imagen
            textOutput.value = ''; // Borrar el texto en textOutput
            updateCopyButtonVisibility(); // Actualizar visibilidad del botón de copiar
        }

        // Verificar si el texto contiene caracteres no permitidos
        const invalidChars = /[^a-z\s]/; // Solo letras minúsculas y espacios permitidos
        if (invalidChars.test(textInput.value)) {
            alert('Solo letras minúsculas y sin acentos');
            // Eliminar caracteres no permitidos
            textInput.value = textInput.value.replace(invalidChars, '');
        }
    });

    // Hacer que textOutput sea de solo lectura
    textOutput.readOnly = true;
});
