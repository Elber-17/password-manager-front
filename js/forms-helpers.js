function showInputErrorMsg(input, inputStyles, msg, errorMsgStyles, otherElements){
    let errorMsg = input.parentElement.getElementsByClassName('error-msg')[0];

    Object.assign(input.style, inputStyles);
    errorMsg.innerText = msg;
    Object.assign(errorMsg.style, errorMsgStyles);

    if(otherElements){
        for(element of otherElements){
            Object.assign(element.element.style, element.styles);
        }
    }

    return;
}

function ocultInputErrorMsg(input, inputStyles, errorMsgStyles, otherElements){
    let errorMsg = input.parentElement.getElementsByClassName('error-msg')[0];

    Object.assign(input.style, inputStyles);
    Object.assign(errorMsg.style, errorMsgStyles);

    if(otherElements){
        for(element of otherElements){
            Object.assign(element.element.style, element.styles);
        }
    }
    
    return;
}