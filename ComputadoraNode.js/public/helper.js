
function decimaltohex(number)
{
    let hexStr = number.toString(16);
    return  hexStr;
}

function zfill(number, width, zero) {
    var length = number.toString().length; /* Largo del número */ 
    
    if (width <= length) 
    {
             return number.toString(); 



    } 
    else 
    {
        
        return ((zero.repeat(width - length)) + number.toString()); 
    
    }
}

function nombreorden(orden)
{
    if (orden == 9)
        return "G";
    if (orden == 6)
        return "M";
    if (orden == 3)
        return "K";
    if (orden == 0)
        return "";
    if (orden == -3)
        return "m";
    if (orden == -6)
        return "mi";
    if (orden == -9)
        return "n";
    return "NOSABENOMBBREORDEN"
};

function Escribir(valor, orden)
{
    var ciclos = 0;
    if (orden == undefined)
        orden = 0;
    if (valor == undefined)
        valor = 0;

    if (valor != 0) {
        while ((Math.abs(valor) < 1) & (ciclos < 10000)) {
            orden--;
            valor = valor * 10;

            ciclos++;

        }

        while ((Math.abs(valor) > 9) & (ciclos < 10000)) {
            orden++;
            valor = valor / 10;
            ciclos++;

        }
    }

    while (((orden % 3) != 0) & (ciclos < 10000))
        {
            orden--;
            valor = valor * 10;
        ciclos++;

    }
    valor = Math.round(valor);
    return "" + valor + nombreorden(orden);



}



function Sumar(valor, orden, a_valor, a_orden) {
    if (orden == undefined)
        orden = 0;

    while (orden > a_orden)
    {
        a_orden++;
        a_valor = a_valor / 10;
    }


    while (orden < a_orden)
    {
        a_orden--;
        a_valor = a_valor * 10;
    }


    return valor + a_valor;



}