var ProgramaHelper = {
    GetPrograma: function ()
    {
        var programa = {
            Variables: [],
            Operaciones: [],
            Funciones: [],
            cont_posinst: 0
        }
        return programa;
    },
    GetOperacion()
    {

        var operacion = {
            nombre: '',
            operacion: '',
            Operaciones: []
        }
        return operacion;
    },

    GetOperacionASSEMBLY: function (assembly) {
        var ret = ProgramaHelper.GetOperacion();
        ret.nombre = 'ASS'
        ret.assembly = assembly;
        return ret;
    },

    GetOperacionAsignacion: function (variable, valor, indice)
    {
        var ret = ProgramaHelper.GetOperacion();
        ret.nombre = 'ASIGNACION'
        ret.variable = variable;
        ret.indice = indice;
        ret.valor = valor;
        return ret;
    },
    GetOperacionInmediato: function (variable1, variable2, inmediato, operacion, indice1, indice2) {


        var ret = this.GetOperacion();
        ret.nombre = 'INME'
        ret.variable1 = variable1;
        ret.variable2 = variable2;
        ret.indice1 = indice1;
        ret.indice2 = indice2;
        ret.operacion = operacion;
        ret.inmediato = inmediato;
        return ret;
    },

    GetOperacionEntreVariables: function (variable1, variable2, variable3, operacion, indice1, indice2, indice3) {
        var ret = this.GetOperacion();
        ret.nombre = 'VARIA'
        ret.variable1 = variable1;
        ret.variable2 = variable2;
        ret.variable3 = variable3;
        ret.operacion = operacion;
        ret.indice1 = indice1;
        ret.indice2 = indice2;
        ret.indice3 = indice3;
        return ret;
    },
    GetIf: function (variable1, variable2, operacion, ope_ver, ope_else) {
        var ret = this.GetOperacion();
        ret.nombre = 'IF'
        ret.variable1 = variable1;
        ret.variable2 = variable2;
        ret.operacion = operacion;

        ret.ope_ver = ope_ver;
        ret.ope_else = ope_else;

        return ret;
    },


    GetCiclo: function (tipociclo, inicio_ope, ciclo, finciclo, variable1, variable2, operacion) {
        var ret = this.GetOperacion();
        ret.nombre = 'CICLO'

        ret.tipociclo = tipociclo;
        ret.inicio_ope = inicio_ope;
        ret.ciclo = ciclo;
        ret.finciclo = finciclo;
        ret.variable1 = variable1;
        ret.variable2 = variable2;
        ret.operacion = operacion;


        return ret;
    },



    GetGoto: function (nroinstruccion) {
        var ret = this.GetOperacion();
        ret.nombre = 'GOTO'
        ret.nroinstruccion = nroinstruccion;
        return ret;
    },

    GenerarCodigo(programa, operaciones)
    {

        // GENERO CODIGO
        if (operaciones)
        for (var i = 0; i < operaciones.length; i++) {
            var MiOperacion = operaciones[i];
            MiOperacion.posicion = Datos.memoria.instrucciones.length;

            if (MiOperacion.nombre == 'ASS') {

                for (var i = 0; i < MiOperacion.assembly.length; i++)
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = MiOperacion.assembly[i];
            }
            if (MiOperacion.nombre == 'ASIGNACION') {
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADDI(0, 8, MiOperacion.valor);
                var posicionVariable = programa.Variables[MiOperacion.variable].desde;
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 8, posicionVariable);
            }
            if (MiOperacion.nombre == 'VARIA') {

                var posicionVariable1 = programa.Variables[MiOperacion.variable1].desde;
                var posicionVariable2 = programa.Variables[MiOperacion.variable2].desde;
                var posicionVariable3 = programa.Variables[MiOperacion.variable3].desde;

                if (MiOperacion.indice1)
                {

                }
                else
                {
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 9, posicionVariable2);

                }
                

                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 10, posicionVariable3);


                if (MiOperacion.operacion == '+')
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(9, 10, 11);
                if (MiOperacion.operacion == '*')
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetMUL(9, 10, 11);
                if (MiOperacion.operacion == '-')
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSUB(9, 10, 11);
                if (MiOperacion.operacion == '<')
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLTU(9, 10, 11);
                if (MiOperacion.operacion == '>')
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLTU(9, 10, 11);


                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 10, posicionVariable1);
            }
            if (MiOperacion.nombre == 'INME') {
                var posicionVariable1 = programa.Variables[MiOperacion.variable1].desde;
                var posicionVariable2 = programa.Variables[MiOperacion.variable2].desde;
                var inmediato = MiOperacion.inmediato;

                

                if (MiOperacion.indice1)
                {

                    var posicionIndice = programa.Variables[MiOperacion.indice1].desde;

                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 10, posicionIndice);
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 29, 11);
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 29, 11);
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 29, 11);
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 29, 11);
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(11, 9, 0);
                }
                else
                {
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 9, posicionVariable2);
                }


                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADDI(9, 9, inmediato);
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 9, posicionVariable1);
            }

            if (MiOperacion.nombre == 'GOTO') {
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);
            }


            if (MiOperacion.nombre == 'CICLO') {

                var posicionVariable1 = programa.Variables[MiOperacion.variable1].desde;
                var posicionVariable2 = programa.Variables[MiOperacion.variable2].desde;


                // CODIGO INICIALIZACION
                this.GenerarCodigo(programa, MiOperacion.inicio_ope);


                MiOperacion.PosInicioCiclo = Datos.memoria.instrucciones.length;
                this.GenerarCodigo(programa, MiOperacion.ciclo);
                this.GenerarCodigo(programa, MiOperacion.finciclo);

                //EVALUO CONDICION CORTE
                

                
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 8, posicionVariable1);
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 9, posicionVariable2);

                if (MiOperacion.operacion == '<') {
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLTU(9, 8, 10);
                }
                if (MiOperacion.operacion == '>') {
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLTU(8, 9, 10);
                }
                MiOperacion.PosCondicionCorte = Datos.memoria.instrucciones.length;
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(MiOperacion.PosInicioCiclo);
            }


            if (MiOperacion.nombre == 'IF')
            {

                var posicionVariable1 = programa.Variables[MiOperacion.variable1].desde;
                var posicionVariable2 = programa.Variables[MiOperacion.variable2].desde;

                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 8, posicionVariable1);
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 9, posicionVariable2);

                if (MiOperacion.operacion == '<')
                {
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLTU(8, 9, 10);
                }
                if (MiOperacion.operacion == '>')
                {
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLTU(9, 8, 10);
                }

                // IF
                MiOperacion.PosBranch = Datos.memoria.instrucciones.length;
                Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);

                // GeneroPrograma
                this.GenerarCodigo(programa, MiOperacion.ope_ver);
                MiOperacion.PosElse = Datos.memoria.instrucciones.length;

                if (MiOperacion.ope_else)
                {
                    Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);
                    MiOperacion.PosElse = Datos.memoria.instrucciones.length;
                    this.GenerarCodigo(programa, MiOperacion.ope_else);
                }
                MiOperacion.PosEnd = Datos.memoria.instrucciones.length;
            }


            MiOperacion.posicion_hasta = Datos.memoria.instrucciones.length;
        }
    },
    ResuelvoReferencias(programa, operaciones)
    {


        for (var i = 0; i < operaciones.length; i++) {

            var MiOperacion = operaciones[i];

            if (MiOperacion.nombre == 'GOTO') {
                Datos.memoria.instrucciones[MiOperacion.posicion] = InstruccionHelper.GetJ(operaciones[MiOperacion.nroinstruccion].posicion);
            }

            if (MiOperacion.nombre == 'IF') {
                if (MiOperacion.operacion == '!=') {
                    Datos.memoria.instrucciones[MiOperacion.PosBranch] = InstruccionHelper.GetBEQ(8, 9, MiOperacion.PosElse - MiOperacion.PosBranch - 1);
                }
                if (MiOperacion.operacion == '==') {
                    Datos.memoria.instrucciones[MiOperacion.PosBranch] = InstruccionHelper.GetBNE(8, 9, MiOperacion.PosElse - MiOperacion.PosBranch - 1);
                }
                if (MiOperacion.operacion == '<') {
                    Datos.memoria.instrucciones[MiOperacion.PosBranch] = InstruccionHelper.GetBEQ(10, 0, MiOperacion.PosElse - MiOperacion.PosBranch - 1);
                }
                if (MiOperacion.operacion == '>') {
                    Datos.memoria.instrucciones[MiOperacion.PosBranch] = InstruccionHelper.GetBEQ(10, 0, MiOperacion.PosElse - MiOperacion.PosBranch - 1);
                }

                if (MiOperacion.ope_else)
                {
                    Datos.memoria.instrucciones[MiOperacion.PosElse - 1] = InstruccionHelper.GetJ(MiOperacion.PosEnd);
                }


            }



            if (MiOperacion.nombre == 'CICLO') {
                if (MiOperacion.operacion == '!=') {
                    Datos.memoria.instrucciones[MiOperacion.PosCondicionCorte] = InstruccionHelper.GetBNE(8, 9, MiOperacion.PosInicioCiclo - MiOperacion.PosCondicionCorte);
                }
                if (MiOperacion.operacion == '==') {
                    Datos.memoria.instrucciones[MiOperacion.PosCondicionCorte] = InstruccionHelper.GetBEQ(8, 9, MiOperacion.PosInicioCiclo - MiOperacion.PosCondicionCorte);
                }
                if (MiOperacion.operacion == '<') {
                    Datos.memoria.instrucciones[MiOperacion.PosCondicionCorte] = InstruccionHelper.GetBEQ(10, 0, MiOperacion.PosInicioCiclo - MiOperacion.PosCondicionCorte);
                }
                if (MiOperacion.operacion == '>') {
                    Datos.memoria.instrucciones[MiOperacion.PosCondicionCorte] = InstruccionHelper.GetBEQ(10, 0, MiOperacion.PosInicioCiclo - MiOperacion.PosCondicionCorte);
                }
                this.ResuelvoReferencias(programa, MiOperacion.ciclo);




            }
        }

    },

    CargarPrograma: function (programa) {
        Datos.Programa = programa;

        // VARIABLES
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, programa.Variables);
        // Seteo el valor del stack
        Datos.procesador.registros[29].valor = 0xFF000000 + Datos.memoria.slacks[0].tope;


        this.GenerarCodigo(programa, programa.Operaciones);

        // RESUELVO REFERENCIAS

        this.ResuelvoReferencias(programa, programa.Operaciones);
    }





}