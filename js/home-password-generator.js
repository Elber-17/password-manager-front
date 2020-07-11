let radio1Checked = false;
let radio2Checked = false;
let radio3Checked = false;

function unselectMe(){
    event.preventDefault;
    let input = event.currentTarget;

    if(input.id === 'radio1'){
        if(!radio1Checked){
            radio1Checked = true;
            input.checked = true;
        }
        else{
            radio1Checked = false;
            input.checked = false;
        }
    }
    else if(input.id === 'radio2'){
        if(!radio2Checked){
            radio2Checked = true;
            input.checked = true;
        }
        else{
            radio2Checked = false;
            input.checked = false;
        }
    }
    else{
        if(!radio3Checked){
            radio3Checked = true;
            input.checked = true;
        }
        else{
            radio3Checked = false;
            input.checked = false;
        }
    }

}

function unselectOther(){
    unselectMe();
    let thisInput = event.currentTarget;

    if(thisInput.id === 'radio2'){
        document.getElementById('radio3').checked = false;
        radio3Checked = false;
    }
    else{
        document.getElementById('radio2').checked = false;
        radio2Checked = false;
    }
}

function changeLength(action){
    if(action == 'decrease'){
        let lengthValue = parseInt(document.getElementById('length').value);
        lengthValue -= 1;

        if(lengthValue < 1){
            lengthValue += 1;
        }

        document.getElementById('length').value = lengthValue;
    }
    else{
        let lengthValue = parseInt(document.getElementById('length').value);
        lengthValue += 1;

        document.getElementById('length').value = lengthValue;
    }
}

function generatePassword(){
    let length = parseInt(document.getElementById('length').value);
    let uppercaseOnly = radio2Checked;
    let lowecaseOnly = radio3Checked;
    let numbers = radio1Checked;
    let specialCharacters = document.getElementById('specialCharacters').value;
    let alphabet = 'abcdefghijqlmnopqrstuvwxyz';
    let alphabetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = '1234567890';
    var generatePasswordString = '';

    if(specialCharacters.length > length){
        length = specialCharacters.length;
        document.getElementById('length').value = length;
    }

    if(numbers){
        alphabet += number;
    }

    if(!uppercaseOnly && !lowecaseOnly){
        alphabet += alphabetUppercase;
    }

    if(uppercaseOnly){
        alphabet = alphabetUppercase;
    }

    while (generatePasswordString.length < length-specialCharacters.length) {
        generatePasswordString += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    generatePasswordString += specialCharacters;
    generatePasswordString = Array.from(generatePasswordString).sort(function(){return Math.random() - 0.5}).join('');

    document.getElementById('generated-password-input').value = generatePasswordString;
}

function copytoClipboard(){
    let input = event.currentTarget.previousElementSibling;
    if(input.value.trim() === ''){
        showSnackbar('rgb(39, 218, 70)', 'No hay contraseña generada');
        return;    
    }

    input.disabled = false;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    input.type = 'password';
    input.type = 'text';
    input.disabled = true;

    showSnackbar('rgb(39, 218, 70)', 'Copiado al portapapeles');
    
}