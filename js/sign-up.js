let usernameValidate = false;
let emailValidate = false;
let passwordValidate = false;

window.addEventListener('popstate', () => {
    location.reload();
}, false);

function checkIsValidSession(loadPage){
    if(loadPage){
        document.getElementsByTagName('body')[0].style.display = 'none';
    }

    requestConfig.url = 'session/check/'
    requestConfig.method = 'get';

    axios.request(requestConfig)
        .then(function (response) {
            // handle success
            switch (response.status) {
                case 200:
                    window.location.href = 'home.html';    
                    break;
                
                case 401:
                    if(loadPage){
                        document.getElementsByTagName('body')[0].style.display = 'flex';
                    }
                    break;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}


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

function showNotification(msg){
    let notification = document.getElementById('notification');
    notification.innerHTML = `
    <div
    class="notification-button-close"
    id="notification-button-close"
    >
        <span class="mdi mdi-close"></span>
    </div>
    ` + msg;
    document.getElementById('notification-button-close').addEventListener('click', closeNotification, false);
    notification.style.height = '10%';

}

function removeAnimation(inputId){
    document.getElementById(inputId).style.animation = 'none';
}

function signUpLogin(username, password){
    requestConfig.url = 'session/login/'
    requestConfig.method = 'post';
    requestConfig.params.username = username;
    requestConfig.params.password = password;

    axios.request(requestConfig)
        .then(function (response) {
            // handle success
            switch (response.status) {
                case 200:
                    window.location.href = 'home.html';
                    break;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

function inputPasswordKeyUpEnter(){
    if (event.keyCode === 13) {
        document.getElementById('button-continue').click();
    }
    
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

        showNotification('Debes rellenar todos los campos.');

        return;
    }

    requestConfig.url = 'user/'
    requestConfig.method = 'post';
    requestConfig.params.username = document.getElementById('username').value;
    requestConfig.params.password = document.getElementById('password').value;
    requestConfig.params.email = document.getElementById('email').value;

    axios.request(requestConfig)
        .then(function (response) {
            // handle success
            switch (response.status) {
                case 201:
                    signUpLogin(requestConfig.params.username, requestConfig.params.password);
                    break;
                
                case 500:
                    showNotification('Ocurrio un error interno, intentalo más tarde.');
                    break;
            }
        })
        .catch(function (error) {
            showNotification('Ocurrio un error interno, intentalo más tarde.');
            console.log(error);
        });

    return;
}

checkIsValidSession(true);
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