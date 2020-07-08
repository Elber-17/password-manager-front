let usernameValidate = false;
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

function validateUsernameOrEmail(){
    let usernameOrEmail = document.getElementById('username-or-email');
    let usernameOrEmailStyles = {};
    let errorMsgStyles = {};
    let otherElements = [];

    if(Validations.isEmpty(usernameOrEmail.value)){
        let msg = '*No debes dejar el nombre vacío';
        usernameOrEmailStyles = {
            marginTop: '-3%',
            border: '1px solid red',
            borderLeft: 'none'
        }
        errorMsgStyles = {
            height: '50%'
        }
        otherElements = [
            {
                element: usernameOrEmail.previousElementSibling,
                styles: {
                    marginTop: '-3%'
                }
            }
        ]

        showInputErrorMsg(usernameOrEmail, usernameOrEmailStyles, msg, errorMsgStyles, otherElements);
        usernameValidate = false;

        return;
    }

    usernameOrEmailStyles = {
        marginTop: '0%',
        border: '2px solid rgb(76, 228, 114)',
        borderLeft: 'none'
    }
    errorMsgStyles = {
        height: '0%'
    }
    otherElements = [
        {
            element: usernameOrEmail.previousElementSibling,
            styles: {
                marginTop: '0%'
            }
        }
    ]


    ocultInputErrorMsg(usernameOrEmail, usernameOrEmailStyles, errorMsgStyles, otherElements);
    usernameValidate = true;

    return;

}

function validatePassword(){
    let password = document.getElementById('password');
    let passwordStyles = {};
    let errorMsgStyles = {};
    let otherElements = [];

    if(Validations.isEmpty(password.value)){
        let msg = '*No debes dejar la contraseña vacía';
        passwordStyles = {
            marginTop: '-3%',
            border: '1px solid red',
            borderLeft: 'none'
        }
        errorMsgStyles = {
            height: '50%'
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
                    marginTop: '-1.5%'
                }
            }
        ]

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
        height: '0%'
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
                marginTop: '0%'
            }
        }
    ]

    ocultInputErrorMsg(password, passwordStyles, errorMsgStyles, otherElements);
    passwordValidate = true;

    return;
}

function showNotification(msg){
    let notification = document.getElementById('notification');
    notification.firstElementChild.nextElementSibling.innerHTML = msg;
    notification.style.height = '10%';
    notification.style.padding = '1.25rem 2.5rem 1.25rem 1.5rem';
}

async function login(){
    validateUsernameOrEmail()
    validatePassword();

    if(!usernameValidate || !passwordValidate){
        if(!usernameValidate){
            document.getElementById('username-or-email').style.animation = 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
        }
    
        if(!passwordValidate){
            document.getElementById('password').style.animation = 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
        }

        showNotification('Tienes campos vacios!');
    
        return;
    }

    requestConfig.url = 'session/login/';
    requestConfig.method = 'post';
    requestConfig.params.username = document.getElementById('username-or-email').value;
    requestConfig.params.password = document.getElementById('password').value;
    let response = null;
    let msg = '';

    try {
        response = await axios.request(requestConfig);
    } catch (error) {
        msg = 'Ha ocurrido un <p>Error Interno</p> intentalo más tarde.'
        showNotification(msg);
        console.log(error.message);
        return
    }

    
    
    switch(response.status){
        case 200:
            window.location.href = 'home.html';
            break;

        case 404:
            msg = 'Nombre de <p>Usuario</p> o <p>Contraseña</p> incorrecto.'
            showNotification(msg);
            break;

        case 500:
            msg = 'Ha ocurrido un <p>Error Interno</p> intentalo más tarde.'
            showNotification(msg);
            break;
    }

    return;
}

function removeAnimation(inputId){
    document.getElementById(inputId).style.animation = 'none';
}

function inputPasswordKeyUpEnter(){
    if (event.keyCode === 13) {
        document.getElementById('button-accept').click();
    }
    
}

function inputUsernameOrEmailKeyUpEnter(){
    if (event.keyCode === 13) {
        document.getElementById('password').focus();
    }
}

function closeNotification(){
    let notification = document.getElementById('notification');
    notification.style.height = '0';
    notification.style.padding = '0';
}

document.getElementById('show-ocult-password-button').addEventListener('click', function(){changeInputType('password');}, false);
document.getElementById('username-or-email').addEventListener('blur', validateUsernameOrEmail, false);
document.getElementById('username-or-email').addEventListener('animationend', function(){removeAnimation('username-or-email');}, false);
document.getElementById('username-or-email').addEventListener('keyup', inputUsernameOrEmailKeyUpEnter, false);
document.getElementById('password').addEventListener('blur', validatePassword, false);
document.getElementById('password').addEventListener('animationend', function(){removeAnimation('password');}, false);
document.getElementById('password').addEventListener('keyup', inputPasswordKeyUpEnter, false);
document.getElementById('button-accept').addEventListener('click', login, false);
document.getElementById('notification-button-close').addEventListener('click', closeNotification, false);