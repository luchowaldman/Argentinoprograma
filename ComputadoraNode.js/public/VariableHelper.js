var colores = ['#ff0000', '#00ff00', '#0000ff', '#0ff000', '#000ff0', '#66cc00', '#45ab00', '#ff00f5', '#ff0000'];
var idcolor = 0;
var numero = 0;


var VariableHelper = {
    NuevaVariable: function () {

        ret = {
            color: colores[idcolor],
            nombre: 'mivari_' + numero++    ,
            tipo: 'Caracter',
            tam: 1,
            largo: 1,
            editar: true,
            indice: 0,
            valor: [],
            posicion: 0
        }
        ret.valor[0] = 0;
        idcolor = idcolor + 1;
        if (idcolor > 8)
            idcolor = 0;
        return ret;

    },

    TamVariable: function (mivariable)
    {
        var tam_dato = 1;
        switch (mivariable.tipo)
        {
            
        
            case 'Binario':
                tam_dato = 1;
                break;
            case 'Caracter':
                tam_dato = 1;
                break;
            case 'Entero16':
                tam_dato = 2;
                break;
            case 'Entero32':
                tam_dato = 4;
                break;
            case 'Flotante':
                tam_dato = 4;
                break;
        }
        return tam_dato;

    }


}