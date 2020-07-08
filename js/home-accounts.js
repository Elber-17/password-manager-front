var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        userAccounts: [],
        accounts: [],
    },

    mounted() {
        this.getUserAccounts();
        this.getAccounts();
    },

    methods:{
        getAccounts(){
            requestConfig.url = 'account/'
            requestConfig.method = 'get';
            vue = this;

            axios.request(requestConfig)
                .then(function (response) {
                    // handle success
                    switch (response.status) {
                        case 200:
                            vue.accounts = response.data;
                            break;
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },

        getUserAccounts(){
            requestConfig.url = 'user/accounts/'
            requestConfig.method = 'get';
            vue = this;

            axios.request(requestConfig)
                .then(function (response) {
                    // handle success
                    switch (response.status) {
                        case 200:
                            vue.userAccounts = response.data;
                            vue.userAccountsCopy = response.data;
                            break;
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },

        overAccountCard(dominantColor){
            if(!event.currentTarget.style.border || event.currentTarget.style.border === 'none'){
                event.currentTarget.style.outline = '1px solid ' + dominantColor;
            }
        },

        leaveAccountCard(){
            event.currentTarget.style.outline = 'none';
        },

        showInfo(dominantColor){
            let accountCard = event.currentTarget.parentElement;
            let buttonEditSave = accountCard.getElementsByClassName('edit-save-button')[0];
            let inputs = accountCard.getElementsByTagName('input');
            let icons = accountCard.getElementsByTagName('span');
            
            this.closeOtherAccountsCard(accountCard);

            for(input of inputs){
                input.style.border = '1px solid ' + dominantColor;
            }

            for(icon of icons){
                if(icon.id === 'new-account'){
                    continue;
                }
                icon.style.color = dominantColor;
            }

            buttonEditSave.style.border = '1px solid ' + dominantColor;

            if([...accountCard.classList].includes('new-account')){
                if(!accountCard.style.height || accountCard.style.height === '150px'){
                    accountCard.style.height = '450px';
                    accountCard.style.border = '1px solid ' + dominantColor;
                    accountCard.style.outline = 'none';

                    return;
                }
                else{
                    accountCard.style.height = '150px';
                    accountCard.style.border = 'none';
                    accountCard.style.outline = '1px solid ' + dominantColor;
                    let buttonEditSave = accountCard.getElementsByClassName('edit-save-button')[0];
                    let icon = buttonEditSave.firstElementChild;
                    let inputUsername = accountCard.getElementsByTagName('input')[0];
                    let inputPassword = accountCard.getElementsByTagName('input')[1];
                    
                    if(accountCard.getAttribute('id')){
                        for(userAccount of this.userAccounts){
                            if(userAccount.id == accountCard.getAttribute('id')){
                                inputUsername.value = userAccount.username;
                                inputPassword.value = userAccount.password;
                                inputUsername.disabled = true;
                                inputPassword.disabled = true;
                                icon.classList.remove('mdi-content-save-outline');
                                buttonEditSave.innerText = 'Editar';
                                icon.classList.add('mdi-square-edit-outline');
                                buttonEditSave.appendChild(icon);
                            }
                        }
                    }
                    return;
                }    
            }

            if(!accountCard.style.height || accountCard.style.height === '150px'){
                accountCard.style.height = '370px';
                accountCard.style.border = '1px solid ' + dominantColor;
                accountCard.style.outline = 'none';
            }
            else{
                accountCard.style.height = '150px';
                accountCard.style.border = 'none';
                accountCard.style.outline = '1px solid ' + dominantColor;
                let buttonEditSave = accountCard.getElementsByClassName('edit-save-button')[0];
                let icon = buttonEditSave.firstElementChild;
                let inputUsername = accountCard.getElementsByTagName('input')[0];
                let inputPassword = accountCard.getElementsByTagName('input')[1];
                
                if(accountCard.getAttribute('id')){
                    for(userAccount of this.userAccounts){
                        if(userAccount.id == accountCard.getAttribute('id')){
                            inputUsername.value = userAccount.username;
                            inputPassword.value = userAccount.password;
                            inputUsername.disabled = true;
                            inputPassword.disabled = true;
                            icon.classList.remove('mdi-content-save-outline');
                            buttonEditSave.innerText = 'Editar';
                            icon.classList.add('mdi-square-edit-outline');
                            buttonEditSave.appendChild(icon);
                        }
                    }
                }
            }

        },

        closeOtherAccountsCard(currentAccountCard){
            let accountsCards = document.getElementsByClassName('accounts-card');

            for(accountCard of accountsCards){
                if(accountCard === currentAccountCard){
                    continue;
                }
                
                accountCard.style.height = '150px';
                accountCard.style.border = 'none';
                let buttonEditSave = accountCard.getElementsByClassName('edit-save-button')[0];
                let icon = buttonEditSave.firstElementChild;
                let inputUsername = accountCard.getElementsByTagName('input')[0];
                let inputPassword = accountCard.getElementsByTagName('input')[1];
                
                if(accountCard.getAttribute('id')){
                    for(userAccount of this.userAccounts){
                        if(userAccount.id == accountCard.getAttribute('id')){
                            inputUsername.value = userAccount.username;
                            inputPassword.value = userAccount.password;
                            inputUsername.disabled = true;
                            inputPassword.disabled = true;
                            icon.classList.remove('mdi-content-save-outline');
                            buttonEditSave.innerText = 'Editar';
                            icon.classList.add('mdi-square-edit-outline');
                            buttonEditSave.appendChild(icon);
                        }
                    }
                }
            }
        },

        copytoClipboard(){
            let input = event.currentTarget.previousElementSibling;
            input.disabled = false;
            input.select();
            input.setSelectionRange(0, 99999);

            if(input.type === 'password'){
                input.type = 'text';
                document.execCommand("copy");
                input.disabled = true;
                input.type = 'password';
            }
            else{
                document.execCommand("copy");
                input.disabled = true;
                input.type = 'password';
                input.type = 'text';
            }

            
            
        },

        buttonEditSaveClick(dominantColor){
            let button = event.currentTarget;
            let icon = button.firstElementChild;
            let inputs = event.target.parentElement.getElementsByTagName('input');

            if(button.innerText === 'Editar'){
                icon.classList.remove('mdi-square-edit-outline');
                button.innerText = 'Guardar';
                icon.classList.add('mdi-content-save-outline');
                button.appendChild(icon);

                for(input of inputs){
                    input.disabled = false;
                }
            }
            else{
                this.editUserAccount(dominantColor, button, icon, inputs);
            }
        },

        changeInputType(newAccount){
            let input = !newAccount ? event.currentTarget.previousElementSibling.previousElementSibling : event.currentTarget.previousElementSibling;

            if(input.type === 'password'){
                input.type = 'text';
            }
            else{
                input.type = 'password';
            }
        },

        buttonEditSaveHover(dominantColor){
            event.currentTarget.style.background = dominantColor;
            event.currentTarget.style.color = 'white';
            event.currentTarget.firstElementChild.style.color = 'white';
        },

        buttonEditSaveLeave(dominantColor){
            event.currentTarget.style.background = 'white';
            event.currentTarget.style.color = 'black';
            event.currentTarget.firstElementChild.style.color = dominantColor;
        },

        validateSelect(select, dominantColor){
            if(select.value === 'none'){
                select.style.border = '1px solid red';
                return false;
            }

            select.style.border = '1px solid ' + dominantColor;

            return true;
        },

        validateUsername(input, dominantColor){
            if(!input.value.trim()){
                input.style.border = '1px solid red';

                return false;
            }

            input.style.border = '1px solid ' + dominantColor;

            return true;
        },

        validatePassword(input, dominantColor){
            if(!input.value.trim()){
                input.style.border = '1px solid red';

                return false;
            }

            input.style.border = '1px solid ' + dominantColor;

            return true;
        },

        addUserAccount(){
            let form = event.currentTarget.parentElement
            let select = form.getElementsByTagName('select')[0];
            let inputUsername = form.getElementsByTagName('input')[0];
            let inputPassword = form.getElementsByTagName('input')[1];

            let validSelect = this.validateSelect(select, '#218bb4');
            let validUsername = this.validateUsername(inputUsername, '#218bb4');
            let validPassword = this.validatePassword(inputPassword, '#218bb4');

            if(!validSelect || !validUsername || !validPassword){
                showSnackbar('rgb(245, 49, 49)', 'No dejes campos vacios.');
                return;
            }
        },

        editUserAccount(dominantColor, button, icon, inputs){
            let form = event.currentTarget.parentElement
            let inputUsername = form.getElementsByTagName('input')[0];
            let inputPassword = form.getElementsByTagName('input')[1];

            let validUsername = this.validateUsername(inputUsername, dominantColor);
            let validPassword = this.validatePassword(inputPassword, dominantColor);

            if(!validUsername || !validPassword){
                showSnackbar('rgb(245, 49, 49)', 'No dejes campos vacios.');
                return;
            }

            icon.classList.remove('mdi-content-save-outline');
            button.innerText = 'Editar';
            icon.classList.add('mdi-square-edit-outline');
            button.appendChild(icon);

            for(input of inputs){
                input.disabled = true;
            }
        }
    }
})