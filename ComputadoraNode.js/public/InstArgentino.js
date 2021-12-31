
Vue.component('instruccionalta',
    {
        props: ['instruccion'],
        template: '#instruccionalta-template',
        methods: {

            NombreVariable(id_variable) {
                return "NOSE"
            }
        }
    });



Vue.component('variablecomp',
    {
        props: ['variable'],
        template: '#variablecomp-template',
        methods: {
            NombreVariable: function (id_variable) {
                return Datos.memoria.slacks[0].variables[id_variable].nombre
            }
        }
    });