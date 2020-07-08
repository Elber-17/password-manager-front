let usernameValidate = false;
let emailValidate = false;
let passwordValidate = false;

function changeInputType(inputId){
    let input = document.getElementById(inputId);

    if(input.type == 'text'){
        input.type = 'password';
    }
    else{
        input.type = 'text';
    }

    input.focus();

    return
}

function isMobileDevice(){
    return window.screen.width < 577;
}

function usernameBlurValidate(){
    let username = document.getElementById('username');
    let usernameStyles = {};
    let errorMsgStyles = {};
    let otherElements = [];

    if(Validations.isEmpty(username.value)){
        let msg = '*No debes dejar el nombre vacío.';
        usernameStyles = {
            marginTop: '-3%',
            border: '1px solid red',
            borderLeft: 'none'
        }
        errorMsgStyles = {
            height: '50%'
        }
        otherElements = [
            {
                element: username.previousElementSibling,
                styles: {
                    marginTop: '-3%'
                }
            }
        ]

        showInputErrorMsg(username, usernameStyles, msg, errorMsgStyles, otherElements);
        usernameValidate = false;

        return;
    }

    usernameStyles = {
        marginTop: '0%',
        border: '2px solid rgb(76, 228, 114)',
        borderLeft: 'none'
    }
    errorMsgStyles = {
        height: '0%'
    }
    otherElements = [
        {
            element: username.previousElementSibling,
            styles: {
                marginTop: '0%'
            }
        }
    ]


    ocultInputErrorMsg(username, usernameStyles, errorMsgStyles, otherElements);
    usernameValidate = true;

    return;
}

function emailBlurValidate(){
    let email = document.getElementById('email');
    let emailStyles = {};
    let errorMsgStyles = {};
    let otherElements = [];
    let isValidEmailValue = Validations.isValidEmail(email.value);

    if(!isValidEmailValue.status){
        let msg = '';

        switch (isValidEmailValue.code) {
            case EMPTY:
                msg = '*No debes dejar el email vacío.';
                break;
        
            case INVALID_FORMAT:
                msg = '*No es un formato de correo valido.';
                break;
        }

        emailStyles = {
            marginTop: '-3%',
            border: '1px solid red',
            borderLeft: 'none'
        }
        errorMsgStyles = {
            height: '50%'
        }
        otherElements = [
            {
                element: email.previousElementSibling,
                styles: {
                    marginTop: '-3%'
                }
            }
        ]

        showInputErrorMsg(email, emailStyles, msg, errorMsgStyles, otherElements);
        emailValidate = false;

        return;
    }

    emailStyles = {
        marginTop: '0%',
        border: '2px solid rgb(76, 228, 114)',
        borderLeft: 'none'
    }
    errorMsgStyles = {
        height: '0%'
    }
    otherElements = [
        {
            element: email.previousElementSibling,
            styles: {
                marginTop: '0%'
            }
        }
    ]


    ocultInputErrorMsg(email, emailStyles, errorMsgStyles, otherElements);
    emailValidate = true;

    return;
}

function passwordBlurValidate(){
    let password = document.getElementById('password');
    let passwordStyles = {};
    let errorMsgStyles = {};
    let otherElements = [];
    let isValidPasswordValue = Validations.isValidPassword(password.value, 8, '.*?$&');

    if(!isValidPasswordValue.status){
        let msg = '';
        let showIconPasswordBottom = 0;

        passwordStyles = {
            marginTop: '-3%',
            border: '1px solid red',
            borderLeft: 'none'
        }

        switch (isValidPasswordValue.code) {
            case 1:
                msg = '*No debes dejar la contraseña vacía.';
                errorMsgStyles = {
                    height: '50%',
                    width: '80%',
                    bottom: '-20%'
                }
                otherElements = [
                    {
                        element: password.previousElementSibling,
                        styles: {
                            marginTop: '-3%'
                        }
                    },
                    {
                        element: password.nextElementSibling.nextElementSibling,
                        styles: {
                            bottom: '18%'
                        }
                    },
                    {
                        element: password.previousElementSibling.previousElementSibling,
                        styles: {
                            marginTop: '0%'
                        }
                    }
                ]
                break;
            
            case 2:
                msg = '*La contraseña debe ser mayor a 8 digitos.';
                showIconPasswordBottom = 22;

                if(isMobileDevice()){
                    showIconPasswordBottom = 20;
                }

                passwordStyles = {
                    marginTop: '-5%',
                    border: '1px solid red',
                    borderLeft: 'none'
                }
                errorMsgStyles = {
                    height: '50%',
                    width: '100%',
                    bottom: '-15%'
                }
                otherElements = [
                    {
                        element: password.previousElementSibling,
                        styles: {
                            marginTop: '-5%'
                        }
                    },
                    {
                        element: password.nextElementSibling.nextElementSibling,
                        styles: {
                            bottom: String(showIconPasswordBottom) + '%'
                        }
                    },
                    {
                        element: password.previousElementSibling.previousElementSibling,
                        styles: {
                            marginTop: '0%'
                        }
                    }
                ]
                break;
            
            case 3:
                msg = '*La contraseña debe tener al menos un caracter especial de los siguientes \'.*?$&\'';
                showIconPasswordBottom = 42;

                if(isMobileDevice()){
                    showIconPasswordBottom = 34;
                }

                passwordStyles = {
                    marginTop: '-10%',
                    border: '1px solid red',
                    borderLeft: 'none'
                }
                errorMsgStyles = {
                    height: '50%',
                    width: '100%',
                    bottom: '-10%'
                }
                otherElements = [
                    {
                        element: password.previousElementSibling,
                        styles: {
                            marginTop: '-10%'
                        }
                    },
                    {
                        element: password.nextElementSibling.nextElementSibling,
                        styles: {
                            bottom: String(showIconPasswordBottom) + '%'
                        }
                    },
                    {
                        element: password.previousElementSibling.previousElementSibling,
                        styles: {
                            marginTop: '-5%'
                        }
                    }
                ]
                break;
        }
        
        showInputErrorMsg(password, passwordStyles, msg, errorMsgStyles, otherElements);
        passwordValidate = false;

        return;
    }

    passwordStyles = {
        marginTop: '0%',
        border: '2px solid rgb(76, 228, 114)',
        borderLeft: 'none'
    }
    errorMsgStyles = {
        height: '0%',
        width: '80%',
        bottom: '-25%'
    }
    otherElements = [
        {
            element: password.previousElementSibling,
            styles: {
                marginTop: '0%'
            }
        },
        {
            element: password.nextElementSibling.nextElementSibling,
            styles: {
                bottom: '12%'
            }
        },
        {
            element: password.previousElementSibling.previousElementSibling,
            styles: {
                marginTop: '0%'
            }
        }
    ]

    ocultInputErrorMsg(password, passwordStyles, errorMsgStyles, otherElements);
    passwordValidate = true;

    return;
}

function closeNotification(){
    let notification = document.getElementById('notification');
    notification.style.height = '0';
    notification.style.padding = '0';
}

function showNotification(){
    let notification = document.getElementById('notification');
    notification.style.height = '10%';
}

function removeAnimation(inputId){
    document.getElementById(inputId).style.animation = 'none';
}


function validateAll(){
    closeNotification();
    usernameBlurValidate();
    emailBlurValidate();
    passwordBlurValidate();

    if(!usernameValidate || !emailValidate || !passwordValidate){
        if(!usernameValidate){
            document.getElementById('username').style.animation = 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
        }
    
        if(!passwordValidate){
            document.getElementById('password').style.animation = 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
        }

        if(!emailValidate){
            document.getElementById('email').style.animation = 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
        }

        showNotification();

        return;
    }

    alert('me logeo');

    return;
}

document.getElementById('username').addEventListener('blur', usernameBlurValidate, false);
document.getElementById('username').addEventListener('animationend', function(){removeAnimation('username')}, false);
document.getElementById('email').addEventListener('blur', emailBlurValidate, false);
document.getElementById('email').addEventListener('animationend', function(){removeAnimation('email')}, false);
document.getElementById('password').addEventListener('blur', passwordBlurValidate, false);
document.getElementById('password').addEventListener('animationend', function(){removeAnimation('password')}, false);
document.getElementById('show-ocult-password-button').addEventListener('click', 
                                                                       function(){changeInputType('password')}, 
                                                                       false); 
document.getElementById('button-continue').addEventListener('click', validateAll, false);
document.getElementById('notification-button-close').addEventListener('click', closeNotification, false);