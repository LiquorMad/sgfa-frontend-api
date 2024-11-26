
export const mask = (event: React.SyntheticEvent) => {

  const target = event.target as HTMLInputElement; // Diga que é um HTMLInputElement
  var currentValue = target.value.toUpperCase();

  console.log(currentValue.length)

  const nativeEvent = event.nativeEvent as InputEvent;
  if (nativeEvent.inputType === 'deleteContentBackward') {
    console.log('O botão de backspace foi pressionado.');
  }
  var data = nativeEvent.data;
  event.preventDefault();
  //script para permitir eliminar
  if(currentValue.length==2&&data==null){
      //console.log(currentValue);
    return (currentValue.substring(0,3));
  }
  else if((currentValue.length==5)&&data==null){
      return (currentValue.substring(0,5));
  }
  //check if AA-__-__ match
  var ilha = currentValue.substring(0,2);
  var patternIlha = /^(([B])([R]|[V]))|(([F])([G]))|(([S])([A]|[L]|[N]|[T]|[V]))/;
  var resultIlha = patternIlha.test(ilha);
  if( currentValue.length==2  && !resultIlha) {
    return currentValue.substring(0,0);
  }
   if(currentValue.length==2||currentValue.length==5){
    return currentValue.concat("-");
  }
  //check if __-00-__ match
  var number = currentValue.substr(3,2)
  var patternNumber = /[0-9][0-9]/;
  var resultNumber = patternNumber.test(number);
  if(!resultNumber && currentValue.length==7){
    return currentValue.substring(0,3);
  }
  //check if __-__-AA match
  var final = currentValue.substr(6,2);
  var patternFinal = /[A-Z][A-Z]/;
  var resultFinal = patternFinal.test(final);
  if(!resultFinal && currentValue.length>7){
    return currentValue.substring(0,6);
  }

  if(!resultNumber && currentValue.length==5){
    //error_matricula.innerHTML = "Matricula invalida";
    return currentValue.concat('-');
  }
  if(!resultFinal && currentValue.length==8){
    //error_matricula.innerHTML = "Matricula invalida";
    return ilha.concat('-').concat(number).concat('-');
  } 
  if(currentValue.length>8&&resultFinal){
    return ilha.concat('-').concat(number).concat('-').concat(final);
  }
  console.log(currentValue.length)
  if(currentValue.length>2 && currentValue.charAt(2)!='-'){
    currentValue = currentValue.substring(0,0);
  }
  if(currentValue.length>5 && currentValue.charAt(5)!='-'){
    currentValue = currentValue.substring(0,4);
  }
  console.log(currentValue.charAt(2));
    return currentValue;
}
