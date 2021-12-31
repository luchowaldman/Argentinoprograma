var Datos = {
    viendo: 0,
    ejercicio: {},
    nombre_funcion: 'Principal',
    parametros: [],
    variables: [],
    instrucciones: [],
    retorno: {},
    colores: [],
    cont_colores: 0

};

Controlador = {
    ActualizarInstrucciones: function () {

        Datos.cont_colores = 0
        var con_if = 0;
        var con_ciclo = 0;
        var color = "#000000";
        for (var i = 0; i < Datos.instrucciones.length; i++)
        {


            Datos.instrucciones[i].con_if = con_if;
            Datos.instrucciones[i].con_ciclo = con_ciclo;


            Datos.instrucciones[i].conlazo = true;



            if (Datos.instrucciones[i].tipo == "Asignar") {

                Datos.instrucciones[i].conlazo = false;

            }
                

            if (Datos.instrucciones[i].tipo == "Sipasa")
            {
                con_if++;
                Datos.colores[Datos.cont_colores] = Datos.instrucciones[i].color;
                Datos.cont_colores++;
                color = Datos.instrucciones[i].color;
            }

            Datos.instrucciones[i].con_if = con_if;
            if (Datos.instrucciones[i].tipo == "Ciclo") {
                con_ciclo++;
                Datos.colores[Datos.cont_colores] = Datos.instrucciones[i].color;
                Datos.cont_colores++;

                color = Datos.instrucciones[i].color;
            }

            

            if (Datos.instrucciones[i].tipo == "OSiNo")
            {
                Datos.instrucciones[i].color = Datos.colores[Datos.cont_colores - 1];
            }

            if (Datos.instrucciones[i].tipo == "OSiPasa")
            {
                Datos.instrucciones[i].color = Datos.colores[Datos.cont_colores - 1];
            }


            if (Datos.instrucciones[i].tipo == "Despues") {
                Datos.instrucciones[i].color = Datos.colores[Datos.cont_colores - 1];
                Datos.cont_colores--;
                con_if--;

            }

            if (Datos.instrucciones[i].tipo == "FinCiclo") {
                Datos.instrucciones[i].color = Datos.colores[Datos.cont_colores - 1];
                Datos.cont_colores--;
                con_ciclo--;

            }
            Datos.instrucciones[i].colores_anteriores = [];
            for (var mc = 0; mc < Datos.cont_colores; mc++)
            {
                Datos.instrucciones[i].colores_anteriores[mc] = Datos.colores[mc];
            };


        }
    }
}


Datos.ejercicio = Ejercicios[0];
Datos.retorno = VariableHelper.NuevaVariable();
Datos.retorno.nombre = "Retorno";
Datos.retorno.tipo = "Entero16";

var app = new Vue({
    el: '#mainapp',
    data: Datos,
    methods: {
        ClaseColor: function (color)
        {
            
            ret = { "background-color" : color };

            return ret;
        },
        NuevoParametro: function () {
            var par_len = Datos.parametros.length;
            var parametro = VariableHelper.NuevaVariable();
            parametro.nombre = "par" + par_len;
            Datos.parametros[par_len] = parametro;

            this.$forceUpdate();
        },
        ForzarActualizar: function ()
        {
            Controlador.ActualizarInstrucciones();

            this.$forceUpdate();
        },
        NuevaVariable: function () {
            var par_len = Datos.variables.length;
            var variab = VariableHelper.NuevaVariable();
            variab.nombre = "var" + par_len;
            Datos.variables[par_len] = variab;

            this.$forceUpdate();
        },
        NuevaInstruccion: function () {
            var par_ins = Datos.instrucciones.length;
            var inst = InstruccionArgentinoHelper.GetInstruccion();

            Datos.instrucciones[par_ins] = inst;

            Controlador.ActualizarInstrucciones();
            this.$forceUpdate();
        },
    }
});