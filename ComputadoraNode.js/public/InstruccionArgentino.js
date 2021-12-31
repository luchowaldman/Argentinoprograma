var Colores = ['#ff0000', '#00ff00', '#ff0000', '#ffff00', '#ff0000' ]
var concol = 0
var InstruccionArgentinoHelper =
{

    GetInstruccion: function ()
    {
        if (concol > Colores.length) {
            concol = 0
        }
        var ret = {
            nombre: '',
            tipo: 'Asignar',
            AsignaVariable: '',
            Variable1: '',
            Variable1Valor: '',
            Variable2: '',
            Variable2Valor: '',
            operacion: '',
            conlazo: false,
            color: Colores[concol++],
            con_if: 0,
            con_ciclo   : 0,
            colores_anteriores: []

        }
        return ret;
    },


}