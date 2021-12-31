var Datos = {
    mem_escribir: false,
    vista: 0,
    leyendobits: [],
    bits: [],
    bits_posicion: [],
    NumCol: 0,
    NumPos: 0,
    NumeroDireccion: 0,
    decimales: [],
    hexadecimales: [],
    viendo_numero: 0,
    lala: 'aca',
    ascii: '',
    variables: [],
    tablaasci: [],
    memoria: [],
    memoria_md: []
}

var Controlador = {
    InicializarMemoria: function ()
    {
        Datos.bits_posicion = BitsHelper.EnteroANBit(0, 8);

        for (var i = 0; i < 16; i++)
            for (var c = 0; c < 16; c++) {
                if (!Datos.memoria[i]) {
                    Datos.memoria[i] = [];  
                }
                Datos.memoria[i][c] = BitsHelper.EnteroANBit(0, 8);
            }

        Datos.leyendobits = Datos.memoria[0][0];
                
    },


    pintarmemoria: function ()
    {
        for (var i = 0; i < 16; i++)
            for (var c = 0; c < 16; c++) {
                if (!Datos.memoria[i]) {
                    Datos.memoria[i] = [];
                }
                Datos.memoria[i][c] = BitsHelper.EnteroANBit(0, 8);
            }


        var cont = 0;
        for (var i = 0; i < 16; i++)
            for (var c = 0; c < 16; c++)
            {
                if (!Datos.memoria_md[i])
                {
                    Datos.memoria_md[i] = [];
                }
                Datos.memoria_md[i][c] = { color: 'black', variable: {}, indice: 0, direccion: cont++ };
            }

        var ii = 0;
        var ic = 0;

        for (var cont_var = 0; cont_var < Datos.variables.length; cont_var++)
        {

            var tam_dato = VariableHelper.TamVariable(Datos.variables[cont_var]);


            Datos.variables[cont_var].posicion = Datos.memoria_md[ii][ic].direccion;

            for (var cont_indice = 0; cont_indice < Datos.variables[cont_var].largo; cont_indice++)
            {
                var valores = [];
                switch (Datos.variables[cont_var].tipo)
                {
                    case 'Binario':
                        if (Datos.variables[cont_var].valor[cont_indice]) {
                            valores[0] = [1, 1, 1, 1, 1, 1, 1, 1]
                        }
                        else {
                            valores[0] = BitsHelper.EnteroANBit(0, 8);;
                        }
                        break;

                    case 'Caracter':
                        if (Datos.variables[cont_var].valor[0][cont_indice])
                        {
                            var char = Datos.variables[cont_var].valor[0][cont_indice];
                            valores[0] = BitsHelper.EnteroANBit(char.charCodeAt(0), 8);
                        }
                        else
                        {
                            valores[0] = BitsHelper.EnteroANBit(0, 8);;
                        }
                        break;
                    case 'Entero16':

                        valor = BitsHelper.EnteroANBit(parseInt(Datos.variables[cont_var].valor[cont_indice]), 16);
                        valores[0] = BitsHelper.CortarBits(valor, 0, 8);
                        valores[1] = BitsHelper.CortarBits(valor, 8, 16);
                        break;
                    case 'Entero32':

                        valor = BitsHelper.EnteroANBit(parseInt(Datos.variables[cont_var].valor[cont_indice]), 32);
                        valores[0] = BitsHelper.CortarBits(valor, 0, 8);
                        valores[1] = BitsHelper.CortarBits(valor, 8, 16);
                        valores[2] = BitsHelper.CortarBits(valor, 16, 24);
                        valores[3] = BitsHelper.CortarBits(valor, 24, 32);
                        break;
                    case 'Flotante':

                        valor = BitsHelper.FlotanteANBit(Datos.variables[cont_var].valor[cont_indice], 24, 8);
                        valores[0] = BitsHelper.CortarBits(valor, 0, 8);
                        valores[1] = BitsHelper.CortarBits(valor, 8, 16);
                        valores[2] = BitsHelper.CortarBits(valor, 16, 24);
                        valores[3] = BitsHelper.CortarBits(valor, 24, 32);
                        break;
                }


                for (var cont = 0; cont < tam_dato; cont++)
                {
                    Datos.memoria[ii][ic] = valores[cont];

                    Datos.memoria_md[ii][ic].variable = Datos.variables[cont_var];
                    Datos.memoria_md[ii][ic].indice = cont_indice;
                    ic++;
                    if (ic > 15)
                    {
                        ic = 0
                        ii++;
                    }
                }
            }

        }

    },


    ViendoBits: function()
    {
        if (Datos.vista == 2)
            return 4;
        if (Datos.vista > 2)
            return 8;
    },
    Cambio_Decimal: function ()
    {
        var mostrando = 0;
        for (var i = 0; i < Datos.decimales.length; i++)
        {
            mostrando = mostrando * 10;
            mostrando += parseInt(Datos.decimales[i]);
        }

        Datos.bits = BitsHelper.EnteroABit(mostrando);
        Controlador.ActualizarVista();

    },

    Cambio_Hexa: function () {
        var mostrando = 0;
        for (var i = 0; i < Datos.hexadecimales.length; i++) {
            mostrando = mostrando * 16;
            mostrando += parseInt("0x" + Datos.hexadecimales[i]);
        }

        Datos.bits = BitsHelper.EnteroABit(mostrando);
        Controlador.ActualizarVista();

    },

    ActualizarDireccionMemoria: function () {
        var mem_col = BitsHelper.CortarBits(Datos.bits_posicion, 0, 4);
        var mem_pos = BitsHelper.CortarBits(Datos.bits_posicion, 4, 8);

        Datos.NumCol = BitsHelper.BitsAEntero(mem_col);
        Datos.NumPos = BitsHelper.BitsAEntero(mem_pos);
        Datos.NumeroDireccion = BitsHelper.BitsAEntero(Datos.bits_posicion);
        Datos.leyendobits = Datos.memoria[Datos.NumCol][Datos.NumPos];

        Controlador.ActualizarVista();
    },

    ActualizarVista: function ()
    {

        var viendobits = Controlador.ViendoBits();

        var bitsamostrar = BitsHelper.CortarBits(Datos.bits, 32 - viendobits, 32);
        decimal = BitsHelper.BitsAEntero(bitsamostrar);
        Datos.viendo_numero = decimal;
        hexadecimales = decimal.toString(16);
        if (hexadecimales.length == 1)
        {
            Datos.hexadecimales[0] = 0;
            Datos.hexadecimales[1] = hexadecimales[0];
        }
        else
        {
            Datos.hexadecimales[0] = hexadecimales[0];
            Datos.hexadecimales[1] = hexadecimales[1];
        }




        Datos.ascii = String.fromCharCode(decimal);

        Datos.decimales = [];
        var totaldecimales = parseInt(Math.log10(Math.pow(2, viendobits)));
        for (var cont = 0; cont <= totaldecimales; cont++)
        {
            Datos.decimales[totaldecimales - cont] = decimal % 10;
            decimal = parseInt(decimal / 10);
        }

        Datos.leyendobits = Datos.memoria[Datos.NumCol][Datos.NumPos];



    }
}

Datos.bits = BitsHelper.EnteroABit(0);

for (var i = 0; i < 256; i++) {

    Datos.tablaasci[i] = String.fromCharCode(i);
}




Controlador.InicializarMemoria();
Controlador.ActualizarVista();
Controlador.pintarmemoria();

var app = new Vue({
    el: '#memoria',
    data: Datos,
    methods:
    {
        Cambio_Decimal: function () {

            Controlador.Cambio_Decimal();
        },
        Cambio_Hexa: function () {

            Controlador.Cambio_Hexa();
        },
        click_char: function (numero) {

            Datos.bits = BitsHelper.EnteroABit(numero);
            Controlador.ActualizarVista();

        },
        Cambio_Vista: function () {
            Controlador.ActualizarVista();

        },
        pintarmemoria: function () {

            Controlador.pintarmemoria();
            this.$forceUpdate();

        },
        Estilo_Sector: function (c, i) {
            var ret = {
                "border-color": '#ffffff'
            };
            if (Datos.memoria_md[c][i].variable)
                ret["border-color"] = Datos.memoria_md[c][i].variable.color;

            return ret;

        },

        EscribirByte: function () {
            Datos.memoria[Datos.NumCol][Datos.NumPos] = BitsHelper.CortarBits(Datos.bits, 32 - 8, 32);;
            Datos.leyendobits = Datos.memoria[Datos.NumCol][Datos.NumPos];

            this.$forceUpdate();
        },
        Cambio_Variable: function (variable, index)
        {
            Controlador.pintarmemoria();
            this.$forceUpdate();

        },
        Decimal: function (total)
        {

            var bitsamostrar = BitsHelper.CortarBits(Datos.bits, 32 - total, 32);
            var ret = BitsHelper.BitsAEntero(bitsamostrar);
            return ret;

        },

        ActualizarVista: function () {
            Controlador.ActualizarVista();

            this.$forceUpdate();
        },

        click_bit: function (index) {
            if (Datos.bits[index] == 0)
                Datos.bits[index] = 1;
            else
                Datos.bits[index] = 0;

            Controlador.ActualizarVista();
            this.$forceUpdate();
        },
        Click_NuevaVariable: function () {
            Datos.variables[Datos.variables.length] = VariableHelper.NuevaVariable();
            Controlador.pintarmemoria();
            this.$forceUpdate();
        },

        click_direccion: function (index)
        {
            if (Datos.bits_posicion[index] == 0)
                Datos.bits_posicion[index] = 1;
            else
                Datos.bits_posicion[index] = 0;


            Controlador.ActualizarDireccionMemoria();
        },
        Click_Sector: function(col, sec) {

            Datos.bits_posicion = BitsHelper.EnteroANBit((col * 16) + sec, 8);
            Controlador.ActualizarDireccionMemoria();

        },

        CambioNumeroDireccion: function () {
            Datos.bits_posicion = BitsHelper.EnteroANBit(Datos.NumeroDireccion, 8);


            Controlador.ActualizarDireccionMemoria();
        }


    }
})