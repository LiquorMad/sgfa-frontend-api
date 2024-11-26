
//script para permitir eliminar
document.getElementById('matricula').addEventListener("keydown", function(event) {
    var keyCode = event.which;
    var currentValue = event.target.value;

    if((currentValue.length==3||currentValue.length==5)&&keyCode==8){
      matricula.value=matricula.value.substr(0,2);
    }
    if((currentValue.length==6)&&keyCode==8){
        matricula.value=matricula.value.substr(0,5);
    }
       
  });

  
  //mask input matricula
  var matricula = document.getElementById('matricula');
  var error_matricula=document.getElementById('matricula_error');
  matricula.addEventListener('input',function(e){
    var currentValue = e.target.value;

    if(currentValue.length==2||currentValue.length==5){
      matricula.value=matricula.value.concat("-");
    }
    
  //check if AA-__-__ match
  var ilha = currentValue.substr(0,2).toUpperCase();
  var patternIlha = /^(([B])([R]|[V]))|(([F])([G]))|(([S])([A]|[L]|[N]|[T]|[V]))/;
  var resultIlha = patternIlha.test(ilha);
  
  //check if __-00-__ match
  var number = currentValue.substr(3,2)
  var patternNumber = /[0-9][0-9]/;
  var resultNumber = patternNumber.test(number);

  //check if __-__-AA match
  var final = currentValue.substr(6,2).toUpperCase();
  var patternFinal = /[A-Z][A-Z]/;
  var resultFinal = patternFinal.test(final);

  if(!resultIlha && currentValue.length==2){
   // error_matricula.innerHTML = "Matricula invalida";
    matricula.value=null;

  }
  if(!resultNumber && currentValue.length==5){
    //error_matricula.innerHTML = "Matricula invalida";
    matricula.value = ilha.concat('-');
    
  }
  if(!resultFinal && currentValue.length==8){
    //error_matricula.innerHTML = "Matricula invalida";
    matricula.value = ilha.concat('-').concat(number).concat('-');

  } 
  if(currentValue.length>8&&resultFinal){
    matricula.value=matricula.value = ilha.concat('-').concat(number).concat('-').concat(final);
  }
})  