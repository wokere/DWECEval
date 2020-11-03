window.onload =  isLogged;

    

    
function isLogged(){

    let valido = localStorage.getItem("valid");
    let formulario = document.getElementById("formulario");
    if(valido == null){
       
        formulario.onsubmit =validateUserPW;
    }else{
        
       formulario.parentNode.removeChild(formulario); 
       document.getElementById("miOtroForm").innerHTML = "logueado";
        
}
    }



function validateUserPW(){

    let userPw= document.getElementById("pw").value;

    if(userPw =="supercalifragilistico"){
        localStorage.setItem("valid","true");
        return true;
    }else{
        alert("contraseña no valida");
        return false;
       
    }
}