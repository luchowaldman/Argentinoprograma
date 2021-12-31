Seter = {
    ForNxM: function (prog, n, m, cicloic) {

        prog.Variables[prog.Variables.length] = StackHelper.CrearVariable('CONTA', 'int', 1, [0]);
        prog.Variables[prog.Variables.length] = StackHelper.CrearVariable('CONTB', 'int', 1, [0]);
        prog.Variables[prog.Variables.length] = StackHelper.CrearVariable('TAMA', 'int', 1, [0]);
        prog.Variables[prog.Variables.length] = StackHelper.CrearVariable('TAMB', 'int', 1, [0]);
        prog.Variables[prog.Variables.length] = StackHelper.CrearVariable('INDICE', 'int', 1, [0]);

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(2, n);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(3, m);


        var ope_ini = [];
        ope_ini[ope_ini.length] = ProgramaHelper.GetOperacionAsignacion(0, 0);
        var ciclo = [];



        var ope_iniic = [];
        ope_iniic[ope_iniic.length] = ProgramaHelper.GetOperacionAsignacion(1, 0);



        var fincicloic = [];
        fincicloic[fincicloic.length] = ProgramaHelper.GetOperacionInmediato(1, 1, 1, '+');


        var ciclo = [];
        ciclo[ciclo.length] = ProgramaHelper.GetCiclo('FOR', ope_iniic, cicloic, fincicloic, 1, 3, '<');

        var finciclo = [];
        finciclo[finciclo.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1, '+');



        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetCiclo('FOR', ope_ini, ciclo, finciclo, 0, 2, '<');



    },


    CargarSuma: function()
    {

        // PROGRAMA

        // A + B = C
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 9, 0);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 10, 4);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 9, 11);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 11, 8);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);

        // VARIABLES
        var variables= [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [1]);
        variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [2]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

    },
    CargarResta: function () {
        // PROGRAMA

        // A + B = C
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 9, 0);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 10, 4);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 9, 11);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 11, 8);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);

        // VARIABLES
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [1]);
        variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [2]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

    },
    ProgramaIF: function () {

        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        prog.Variables = variables;

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 4);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(1, 4);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionEntreVariables(2, 0, 1, '+');

        
        var variable_true = [];
        variable_true[variable_true.length] = ProgramaHelper.GetOperacionAsignacion(2, 9);
        variable_true[variable_true.length] = ProgramaHelper.GetOperacionAsignacion(1, 9);

        var variable_false = [];
        variable_false[variable_false.length] = ProgramaHelper.GetOperacionAsignacion(2, 3);
        variable_false[variable_false.length] = ProgramaHelper.GetOperacionAsignacion(1, 5);

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetIf(0, 1, '==', variable_true, variable_false);

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 4);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 3);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 2);


        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetGoto(2);

        ProgramaHelper.CargarPrograma(prog);

    },
    ExPrograma1: function () {

        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        prog.Variables = variables;

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 4);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(1, 1);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionEntreVariables(0, 0, 1, '-');


        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetGoto(2);

        ProgramaHelper.CargarPrograma(prog);

    },
    CargarSumaPrograma: function () {

        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        prog.Variables = variables;

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 4);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(1, 3);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionEntreVariables(2, 0, 1, '+');
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1, '+');

        ProgramaHelper.CargarPrograma(prog);


        // A + B = C
        /*
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 10, 4);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 9, 11);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 11, 8);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);
        */

    },
    SumoInmediata: function () {

        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        prog.Variables = variables;

        //  prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 4);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1);

        ProgramaHelper.CargarPrograma(prog);


        // A + B = C
        /*
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 10, 4);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 9, 11);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 11, 8);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);
        */

    },
    RestaInmediata: function () {

        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        prog.Variables = variables;

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(0, 4);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 31);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 31);
        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 21);

        ProgramaHelper.CargarPrograma(prog);


        // A + B = C
        /*
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(29, 10, 4);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADD(10, 9, 11);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(29, 11, 8);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);
        */

    },
    CargarCacheCaso1: function()
    {
        // PROGRAMA

        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 0);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 16384);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 32768);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 49152);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 0);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 16384);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 32768);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 49152);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);

        // VARIABLES
        var variables= [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [1]);
   //     variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [2]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

    },
    CargarCacheCaso2: function()
    {
        // PROGRAMA

        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 0);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 1024);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 2048);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 3072);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 4096);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 0);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 1024);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 2048);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(0, 1, 3072);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 4096);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);
        // VARIABLES
        var variables= [];
        variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [1]);
        //     variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [2]);
        variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

    },
    CargarCacheModelo1() {

        Datos.caches = [];
        var micache = CacheHelper.NewCache();
        micache.nrobits_tag = 19;
        micache.nrobits_index = 6;
        micache.nrobits_offset = 7;
        micache.vias = 4;
        Datos.caches[0] = micache;

    },
    CargarCacheModelo2() {

        Datos.caches = [];
        var micache = CacheHelper.NewCache();
        micache.nrobits_tag = 18;
        micache.nrobits_index = 7;
        micache.nrobits_offset = 7;
        micache.vias = 1;

        Datos.caches[0] = micache;

    },

    CargarEjercicio1: function () {

        // 2, 3, 11, 16, 21, 13, 64, 48, 19, 11, 3,
        //22, 4, 27, 6 y 11


        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 2);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 3);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 11);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 16);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 21);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 13);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 64);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 48);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 19);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 11);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 3);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 22);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 4);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 27);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 6);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetLW(0, 1, 11);
     // Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);




        // VARIABLES
        var variables = [];
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

        var cacheN = CacheHelper.NewCache();

        cacheN.nrobits_offset = 0;
        cacheN.nrobits_index = 4;
        cacheN.nrobits_tag = 28;
        cacheN.vias = 1;
        cacheN.missescritura = true;

        Datos.caches[Datos.caches.length] = cacheN;

    },

    CargarEjercicio2: function () {
        this.CargarEjercicio1();
        Datos.caches[0].nrobits_offset = 2;
        Datos.caches[0].nrobits_index = 2;
        Datos.caches[0].nrobits_tag = 028;
        Datos.caches[0].vias = 1;

    },


    CargarEjercicio3CacheA: function () {


        // VARIABLES
        var variables = [];
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

        var cacheN = CacheHelper.NewCache();


        cacheN.nrobits_offset = 5;
        cacheN.nrobits_index = 7;
        cacheN.nrobits_tag = 20;
        cacheN.vias = 2;
        Datos.reloj.Frecuencia = 10;

        cacheN.tarda_escribir = 500;
        cacheN.anchobanda = 32;
        cacheN.latencia = 0;
        cacheN.vias = 2;
        Datos.caches[Datos.caches.length] = cacheN;
    },
    CargarEjercicio3CacheB: function ()
    {
    

        // VARIABLES
        var variables = [];
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

        var cacheN = CacheHelper.NewCache();



        cacheN.nrobits_offset = 5;
        cacheN.nrobits_index = 8;
        cacheN.nrobits_tag = 19;
        cacheN.vias = 1;
        Datos.reloj.Frecuencia = 10;

        cacheN.anchobanda = 32;
        cacheN.latencia = 0;
        cacheN.vias = 1;
        cacheN.missescritura = true;
        cacheN.tarda_escribir = 500;

        Datos.caches[Datos.caches.length] = cacheN;

    },

    CargarEjercicio3ProgramaBuenaA: function ()
    {

        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('CONT', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('TOTAL', 'int', 1, [0]);
        prog.Variables = variables;

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(1, 6);


        var ope_ini = [];
        ope_ini[ope_ini.length] = ProgramaHelper.GetOperacionAsignacion(0, 0);


        var ciclo = [];
        var cicloass  = [];


        cicloass[cicloass.length] = InstruccionHelper.GetLW(0, 1, 0);
        cicloass[cicloass.length] = InstruccionHelper.GetLW(0, 1, 8192);

        ciclo[ciclo.length] = ProgramaHelper.GetOperacionASSEMBLY(cicloass);

        var finciclo = [];
        finciclo[finciclo.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1, '+');

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetCiclo('FOR', ope_ini, ciclo, finciclo, 0, 1, '!=');


        //prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetGoto(0);
        ProgramaHelper.CargarPrograma(prog);


    },
    CargarEjercicio3ProgramaBuenaB: function ()
    {


        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('CONT', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('TOTAL', 'int', 1, [0]);
        prog.Variables = variables;

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(1, 6);


        var ope_ini = [];
        ope_ini[ope_ini.length] = ProgramaHelper.GetOperacionAsignacion(0, 0);


        var ciclo = [];
        var cicloass = [];


        cicloass[cicloass.length] = InstruccionHelper.GetSW(0, 1, 0);

        ciclo[ciclo.length] = ProgramaHelper.GetOperacionASSEMBLY(cicloass);

        var finciclo = [];
        finciclo[finciclo.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1, '+');

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetCiclo('FOR', ope_ini, ciclo, finciclo, 0, 1, '!=');


        //prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetGoto(0);
        ProgramaHelper.CargarPrograma(prog);

    },


    CargarEjercicio4Cache: function () {


        // VARIABLES
        var variables = [];
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

        var cacheN = CacheHelper.NewCache();



        cacheN.nrobits_offset = 5;
        cacheN.nrobits_index = 8;
        cacheN.nrobits_tag = 19;
        cacheN.vias = 1;
        Datos.reloj.Frecuencia = 10;

        cacheN.anchobanda = 32;
        cacheN.latencia = 0;
        cacheN.vias = 1;
        cacheN.missescritura = true;
        cacheN.tarda_escribir = 500;

        Datos.caches[Datos.caches.length] = cacheN;

    },


    CargarEjercicio4RowMajorOrder: function ()
    {

        this.CargarEjercicio4Cache();
        var cicloic = [];

        var instrucciones = [];
        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(29, 9, 0);
        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(29, 10, 4);
        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(29, 11, 8);
        instrucciones[instrucciones.length] = InstruccionHelper.GetMUL(11, 9, 12);
        instrucciones[instrucciones.length] = InstruccionHelper.GetADD(12, 10, 12);
        instrucciones[instrucciones.length] = InstruccionHelper.GetADDI(0, 13, 4);
        instrucciones[instrucciones.length] = InstruccionHelper.GetMUL(12, 13, 12);

        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(12, 14, 0);

        cicloic[0] = ProgramaHelper.GetOperacionASSEMBLY(instrucciones);

        //prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(2, n);
        var prog = ProgramaHelper.GetPrograma();


        this.ForNxM(prog, 10, 10, cicloic);
        prog.Variables[id_varCUATRO] = StackHelper.CrearVariable('CONTA', 'int', 1, [4]);


        var id_varCUATRO = prog.Variables.length;
        
        ProgramaHelper.CargarPrograma(prog);
        Datos.memoria.instrucciones[15].breack = true;

    },
    CargarEjercicio4ColumnMajorOrder: function () {

        this.CargarEjercicio4Cache();
        var cicloic = [];

        var instrucciones = [];
        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(29, 10, 0);
        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(29, 9, 4);
        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(29, 11, 8);
        instrucciones[instrucciones.length] = InstruccionHelper.GetMUL(11, 9, 12);
        instrucciones[instrucciones.length] = InstruccionHelper.GetADD(12, 10, 12);
        instrucciones[instrucciones.length] = InstruccionHelper.GetADDI(0, 13, 4);
        instrucciones[instrucciones.length] = InstruccionHelper.GetMUL(12, 13, 12);

        instrucciones[instrucciones.length] = InstruccionHelper.GetLW(12, 14, 0);

        cicloic[0] = ProgramaHelper.GetOperacionASSEMBLY(instrucciones);

        //prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(2, n);
        var prog = ProgramaHelper.GetPrograma();


        this.ForNxM(prog, 10, 10, cicloic);
        prog.Variables[id_varCUATRO] = StackHelper.CrearVariable('CONTA', 'int', 1, [4]);


        var id_varCUATRO = prog.Variables.length;

        ProgramaHelper.CargarPrograma(prog);
        Datos.memoria.instrucciones[15].breack = true;

    },


    CargarEjercicio5CacheA: function () {


        // VARIABLES
        var variables = [];
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);

        var cacheN = CacheHelper.NewCache();


        cacheN.nrobits_offset = 0;
        cacheN.nrobits_index = 4;
        cacheN.nrobits_tag = 28;
        cacheN.vias = 1;
        Datos.reloj.Frecuencia = 10;

        cacheN.tarda_escribir = 500;
        cacheN.anchobanda = 32;
        cacheN.latencia = 0;
        Datos.caches[Datos.caches.length] = cacheN;
    },

    CargarEjercicio5ProgramaBuenaA: function () {

        var prog = ProgramaHelper.GetPrograma();
        var variables = [];
        variables[variables.length] = StackHelper.CrearVariable('CONT', 'int', 1, [0]);
        variables[variables.length] = StackHelper.CrearVariable('TOTAL', 'int', 1, [0]);
        prog.Variables = variables;

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetOperacionAsignacion(1, 6);


        var ope_ini = [];
        ope_ini[ope_ini.length] = ProgramaHelper.GetOperacionAsignacion(0, 0);


        var ciclo = [];
        var cicloass = [];


        cicloass[cicloass.length] = InstruccionHelper.GetLW(0, 1, 0);
        cicloass[cicloass.length] = InstruccionHelper.GetLW(0, 1, 8192);

        ciclo[ciclo.length] = ProgramaHelper.GetOperacionASSEMBLY(cicloass);

        var finciclo = [];
        finciclo[finciclo.length] = ProgramaHelper.GetOperacionInmediato(0, 0, 1, '+');

        prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetCiclo('FOR', ope_ini, ciclo, finciclo, 0, 1, '!=');


        //prog.Operaciones[prog.Operaciones.length] = ProgramaHelper.GetGoto(0);
        ProgramaHelper.CargarPrograma(prog);


    },


    CargarEjercicioGUIAGRANDE31: function ()
    {

        Datos.procesador.registros[5].valor = 200;
        Datos.procesador.registros[2].valor = 3405692592;

        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetADDU(2, 5, 2);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSW(2, 3, 0);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLTU(3, 2, 4);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetSLL(2, 3, 1);
        Datos.memoria.instrucciones[Datos.memoria.instrucciones.length] = InstruccionHelper.GetJ(0);


        // VARIABLES
        var variables = [];
     //   variables[variables.length] = StackHelper.CrearVariable('VARA', 'int', 1, [1]);
        //     variables[variables.length] = StackHelper.CrearVariable('VARB', 'int', 1, [2]);
        //variables[variables.length] = StackHelper.CrearVariable('VARC', 'int', 1, [0]);
        Datos.memoria.slacks[0] = StackHelper.CrearSlack('main', Datos.memoria.tope_slack, variables);
        Datos.caches = [];
        Datos.caches[0] = CacheHelper.NewCache();

    }
    



    
}