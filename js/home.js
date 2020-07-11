const HOME = 0;
let active = HOME;

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
                    if(loadPage){
                        document.getElementsByTagName('body')[0].style.display = 'flex';
                    }
                    break;

                case 401:
                    window.location.href = 'login.html';    
                    break;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

function showSnackbar(color, message) {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar");
    
    x.innerText = message
    x.style.backgroundColor = color;
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function markActive(){
    document.getElementsByClassName('element')[HOME].classList.add('active');
}

function openSidebar(){
    let sidebar = document.getElementsByClassName('sidebar')[0];
    let outfocusResponsiveMenu = document.getElementsByClassName('outfocus-responsive-menu')[0];

    Object.assign(sidebar.style, {
        left: '0'
    });
    Object.assign(outfocusResponsiveMenu.style, {
        left: '0'
    });
}

function closeSidebar(){
    let sidebar = document.getElementsByClassName('sidebar')[0];
    let outfocusResponsiveMenu = document.getElementsByClassName('outfocus-responsive-menu')[0];

    Object.assign(sidebar.style, {
        left: '-230px'
    });
    Object.assign(outfocusResponsiveMenu.style, {
        left: '-100%'
    });
}

function getUser(){
    let form = document.getElementById('form-account-user');
    let inputs = form.getElementsByTagName('input');
    let button = form.getElementsByClassName('button-edit')[0];
    let username = inputs[0];
    let email = inputs[1];
    let password = inputs[2];
    let creationDate = inputs[3];
    requestConfig.url = 'user/'
    requestConfig.method = 'get';

    axios.request(requestConfig)
        .then(function (response) {
            // handle success
            switch (response.status) {
                case 200:
                    username.value = response.data.username;
                    password.value = response.data.password;
                    email.value = response.data.email;
                    let year = response.data.creationDate.slice(0,4);
                    let month = response.data.creationDate.slice(5,7);
                    let day = response.data.creationDate.slice(8);
                    let date =  day + '/' + month + '/' + year;
                    creationDate.value = date;
                    break;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    
    for(input of inputs){
        input.disabled = true;
        input.style.border = '1px solid rgb(33, 139, 180)';
    }
    
    button.innerText = 'Editar';
}

function showContent(newActive){
    if(newActive == active){
        return;
    }

    getUser();

    if(window.screen.width < 767){
        closeSidebar();
    }

    document.getElementsByClassName('element')[active].classList.remove('active');
    document.getElementsByClassName('element')[newActive].classList.add('active');
    
    switch (newActive) {
        case 0:
            document.getElementsByClassName('home')[0].style.display = 'flex';
            break;
        case 1:
            document.getElementsByClassName('accounts')[0].style.display = 'flex';
            break;
        case 2:
            document.getElementsByClassName('passwords-generator')[0].style.display = 'flex';
            break;
        case 3:
            document.getElementsByClassName('configuration')[0].style.display = 'flex';
            break;
    }

    switch (active) {
        case 0:
            document.getElementsByClassName('home')[0].style.display = 'none';
            break;
        case 1:
            document.getElementsByClassName('accounts')[0].style.display = 'none';
            break;
        case 2:
            document.getElementsByClassName('passwords-generator')[0].style.display = 'none';
            break;
        case 3:
            document.getElementsByClassName('configuration')[0].style.display = 'none';
            break;
    }

    active = newActive;
}

function logout(){
    requestConfig.url = 'session/logout/'
    requestConfig.method = 'delete';

    axios.request(requestConfig)
        .then(function (response) {
            // handle success
            window.location.href = 'index.html';
        })
        .catch(function (error) {
            window.location.href = 'index.html';
        });
}

function elementListener(){
    [...document.getElementsByClassName("element")].forEach(
        (element, index) => {
            if(index === 4){
                element.addEventListener('click', logout, false);
                return;
            }

            element.addEventListener('click', (function(){showContent(index)}), false);
        }
    );
}

function responsiveMenuButton(){
    document.getElementById('responsive-menu-button').addEventListener('click', openSidebar, false);
}

function responsiveOutfocusMenu(){
    document.getElementsByClassName('outfocus-responsive-menu')[0].addEventListener('click', closeSidebar, false);
}

function main(){
    checkIsValidSession(true);
    setInterval(checkIsValidSession, 60*60000);
    markActive();
    elementListener();
    responsiveMenuButton();
    responsiveOutfocusMenu();
    getUser();
}

main();
    