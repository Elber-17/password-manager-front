window.addEventListener('popstate', () => {
    location.reload();
}, false);

function checkIsValidSession(){
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
                    document.getElementsByTagName('body')[0].style.display = 'flex';
                    break;
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

function redirect(page){
    window.location.href = page;
}

function showResponsiveMenu(){
    let responsiveMenu = document.getElementById('responsive-menu');
    let outfocusMenu = document.getElementById('outfocus-menu');
    responsiveMenu.style.borderRight = '1px solid white';
    responsiveMenu.style.left = '0';
    outfocusMenu.style.left = '45%';

    /*
    Cuando se abre el menu, oculta los demas elementos de la pagina para lo que solo se pueda
    hacer scroll en el menu
    */
    document.getElementsByClassName('demas')[0].style.display = 'none'
}

function closeResponsiveMenu(){
    let responsiveMenu = document.getElementById('responsive-menu');
    let outfocusMenu = document.getElementById('outfocus-menu');
    responsiveMenu.style.borderRight = 'none';
    responsiveMenu.style.left = '-45%';
    outfocusMenu.style.left = '-55%';

    //Se muestra de nuevo el contenido de la pagina
    document.getElementsByClassName('demas')[0].style.display = 'flex'
}

checkIsValidSession();
document.getElementById('login-button').addEventListener('click', function(){redirect('login.html')}, false);
document.getElementById('sign-up-button').addEventListener('click', function(){redirect('sign-up.html')}, false);
document.getElementById('login-responsive-button').addEventListener('click', function(){redirect('login.html')}, false);
document.getElementById('sign-up-responsive-button').addEventListener('click', function(){redirect('sign-up.html')}, false);
document.getElementById('responsive-icon-menu').addEventListener('click', showResponsiveMenu, false);
document.getElementById('outfocus-menu').addEventListener('click', closeResponsiveMenu, false);


// if(window.screen.width < 650){
//     document.getElementsByTagName('body')[0].style.height = String(window.screen.height - 80) + 'px';
//     document.getElementsByTagName('html')[0].style.height = String(window.screen.height - 80) + 'px';
// }