function buttonEditSaveClick(){
    let thisButton = event.currentTarget;
    let inputs = event.currentTarget.parentElement.parentElement.getElementsByTagName('input');

    if(thisButton.innerText === 'Editar'){
        for(input of inputs){
            input.disabled = false;
        }
    
        thisButton.innerText = 'Guardar';
        return;
    }
    else{
        for(input of inputs){
            if(input.value === ''){
                input.style.border = '1px solid red';
                showSnackbar('rgb(245, 49, 49)', 'No dejes campos vacios.');
                return;
            }
            if(input.id === 'input-edit-account-email'){
                if(!Validations.isValidEmail(input.value).status){
                    input.style.border = '1px solid red';
                    showSnackbar('rgb(245, 49, 49)', 'No parece un email valido.');    
                    return;
                }
            }
            if(input.id === 'input-edit-account-password'){
                if(!Validations.isValidPassword(input.value, 8, '.*?$&').status){
                    input.style.border = '1px solid red';

                    if(input.value.length < 8){
                        showSnackbar('rgb(245, 49, 49)', '*La contraseña debe tener 8 caracteres');    
                    }
                    else{
                        showSnackbar('rgb(245, 49, 49)', '*debe tener al menos un caracter especial de los siguientes \'.*?$&\'');    
                    }
                    return;
                }
            }
        }

        for(input of inputs){
            input.style.border = '1px solid #218bb4';
        }

        requestConfig.url = 'user/'
        requestConfig.method = 'patch';
        requestConfig.params.username = inputs[0].value;
        requestConfig.params.password = inputs[2].value;
        requestConfig.params.email = inputs[1].value;
    
        axios.request(requestConfig)
            .then(function (response) {
                // handle success
                switch (response.status) {
                    case 204:
                        cuteToast({
                            type: 'success',
                            message: 'Se ha modificado la cuenta',
                            timer: 4000
                        });

                        for(input of inputs){
                            input.disabled = true;
                        }
                    
                        thisButton.innerText = 'Editar';
                        break;
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            
        return;
    }
}

function DeleteMeAccount(){
    cuteAlert({
        type: 'question',
        title: 'Eliminar Cuenta',
        message: '¿Deseas eliminar esta cuenta?',
        confirmText: 'Si',
        cancelText: 'No',

    }).then((userResponse) =>{
        if(userResponse === 'confirm'){
            requestConfig.url = 'user/'
            requestConfig.method = 'delete';

            axios.request(requestConfig)
                .then(function (response) {
                    // handle success
                    switch (response.status) {
                        case 204:
                            logout();
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    })
}