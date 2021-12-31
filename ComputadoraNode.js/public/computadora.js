/*
 * 
 REFERENCIAS:

COMO COMPILA C++
 https://godbolt.org/
 * */


var Datos = {
    viendoprograma: true,
    micpu: cpu,
    misinstrucciones: instrucciones,
    MEMV: [],
    Programa: {},
    instruccion: {},

    vista: {
        viendo: 'bits',
        mirando_instruccion: 0,
        mostrando_bits: '',
    },
    caches: [], 

    bits: [],
    bitsdirememoria: [],

    lecturadebit: {
        numero: 0,
        hexadecimales: [],
        caracteres: [],

    },





    reloj: {
        Frecuencia: 1000,
        MagnitudFrecuencia: 6,
        cpi: 2,
        ci: 1,
        mips: 1000,
        Nanos_SegundosTranscurridos: 0,
        tiempo: 100,

        segundos: 0,
        segundosorden: -9,
        clocks: 0,

        segundos_anterior: 0,
        clocks_anterior: 0,

        segundos_calculoteo: '',
        clocks_calculoteo: '',

        segundos_calculo: '',
        clocks_calculo: '',


        iniciado: false,
        id_funcion: undefined,
        conectado_a: undefined
    },

    programa: {},
    memoria: 
    {
        instrucciones: [],
        tope_slack: 16777216,
        slacks: [],

        registros: [],
        busca_registro: 0,
        valor_registro: 0,
        escribiendo: 0,

         

        set_registro: function(num_reg, value) 
        {
            
            var busca = num_reg & 0x00FFFFFF;
            for (var c = 0; c < this.slacks.length; c++)
            {
                
                for (var v = 0; v < this.slacks[c].variables.length; v++)
                {
                    for (var z = 0; z < this.slacks[c].variables[v].valor.length; z++)
                    {
                        
                        if ((this.slacks[c].variables[v].posicion + (z * 4)) == busca)
                        {
                            this.slacks[c].variables[v].valor[z] = value;
                            return value;
                        }

                    }
                }   
            }
        },

        get_registro: function(num_reg) 
        {
            try {

             
            var busca = num_reg & 0x00FFFFFF;
            for (var c = 0; c < this.slacks.length; c++)
            {
                
                for (var v = 0; v < this.slacks[c].variables.length; v++)
                {
                    for (var z = 0; z < this.slacks[c].variables[v].valor.length; z++)
                    {
                        
                        if ((this.slacks[c].variables[v].posicion + (z * 4)) == busca)
                        {
                            return this.slacks[c].variables[v].valor[z];

                        }

                    }
                }   
            }
            
        } catch(ex) {};
            

        
        },


    },
    procesador: 
    {
        registros: [],
        instruccion_leidanro: 0,
        instruccion_leida: {},
        programcont: 0,
        bits_instruccion: [],
        instruccion_decode: {},

        actividad : '',
        actividad_registro: 0,

        nombreregistro: function (nroreg)
        {
            return "$" + this.registros[nroreg].nombre;
        },

        set_registro: function(name_reg, value) 
        {
            for (var i = 0; i < this.registros.length; i++)
                if (this.registros[i].nombre == name_reg)
                    this.registros[i].valor = value;

        },
        get_registro: function(name_reg) 
        {
            
            for (var i = 0; i < this.registros.length; i++)
                if (this.registros[i].nombre == name_reg)
                    return this.registros[i];

        },
        IniciaCalculos: function ()
        {
            Datos.reloj.clocks_calculoteo = Datos.reloj.clocks;
            Datos.reloj.clocks_calculo = Datos.reloj.clocks_calculoteo;
            Datos.reloj.clocks += Datos.reloj.cpi;
            Datos.reloj.segundos_calculoteo = Escribir(Datos.reloj.segundos, Datos.reloj.segundosorden) + "s";
            Datos.reloj.segundos_calculo = Datos.reloj.segundos_calculoteo;
            Datos.reloj.clocks_calculoteo += ' + ' + Datos.reloj.cpi + ' CLOCK ';
            Datos.reloj.clocks_calculo += ' + ' + Datos.reloj.cpi;
            Datos.reloj.segundos_calculoteo += '+ (CPI / FRECUENCIA)';
            Datos.reloj.segundos_calculo += '+ ' + Escribir(1 / Datos.reloj.Frecuencia, -Datos.reloj.MagnitudFrecuencia);
            Datos.reloj.segundos = Sumar(Datos.reloj.segundos, Datos.reloj.segundosorden, 1 / Datos.reloj.Frecuencia, -Datos.reloj.MagnitudFrecuencia);


        },
        MissCache(idCache)
        {
            var cache = Datos.caches[idCache];

            var MP = CacheHelper.MissPenalty(cache, Datos.reloj);
            var TiempoCarga = CacheHelper.Tiempocarga(cache, Datos.reloj);
            var mostrartiempocarga = Escribir(TiempoCarga, -cache.anchobandaunidad);



            Datos.reloj.clocks += parseInt(MP);
            Datos.reloj.segundos_calculoteo = Escribir(Datos.reloj.segundos, Datos.reloj.segundosorden) + "s";
            Datos.reloj.segundos_calculo = Datos.reloj.segundos_calculoteo;
            Datos.reloj.clocks_calculoteo += ' + MISS PENALTY';
            Datos.reloj.clocks_calculo += ' + ' + MP;
            Datos.reloj.segundos_calculoteo += '+ LATENCIA + (TAMANO GRUPO/ ANCHO DE BANDA)';
            Datos.reloj.segundos_calculo += '+ ' + mostrartiempocarga;

            Datos.reloj.segundos = Sumar(Datos.reloj.segundos, Datos.reloj.segundosorden, TiempoCarga, -cache.anchobandaunidad);

        },
        MissEscritura(idCache) {
            var cache = Datos.caches[idCache];

            if (cache.missescritura) {
                var cache = Datos.caches[idCache];
                var MP = CacheHelper.MissPenalty(cache, Datos.reloj);
                var TiempoCarga = CacheHelper.Tiempocarga(cache, Datos.reloj);
                var mostrartiempocarga = Escribir(TiempoCarga, -cache.anchobandaunidad);
                Datos.reloj.clocks += parseInt(MP);
                Datos.reloj.segundos_calculoteo = Escribir(Datos.reloj.segundos, Datos.reloj.segundosorden) + "s";
                Datos.reloj.segundos_calculo = Datos.reloj.segundos_calculoteo;
                Datos.reloj.clocks_calculoteo += ' + MISS PENALTY';
                Datos.reloj.clocks_calculo += ' + ' + MP;
                Datos.reloj.segundos_calculoteo += '+ LATENCIA + (TAMANO GRUPO/ ANCHO DE BANDA)';
                Datos.reloj.segundos_calculo += '+ ' + mostrartiempocarga;
                Datos.reloj.segundos = Sumar(Datos.reloj.segundos, Datos.reloj.segundosorden, TiempoCarga, -cache.anchobandaunidad);
            }
            else
            {

                var cache = Datos.caches[idCache];
                var clo_es = CacheHelper.ClocksEscritura(cache, Datos.reloj);
                var mostrartiempocarga = Escribir(cache.tarda_escribir, cache.tarda_escribirorden);
                Datos.reloj.clocks += parseInt(clo_es);
                Datos.reloj.segundos_calculoteo = Escribir(Datos.reloj.segundos, Datos.reloj.segundosorden) + "s";
                Datos.reloj.segundos_calculo = Datos.reloj.segundos_calculoteo;
                Datos.reloj.clocks_calculoteo += ' + CLOCKS ESCRITURA';
                Datos.reloj.clocks_calculo += ' + ' + clo_es;
                Datos.reloj.segundos_calculoteo += 'TIEMPO ESCRITURA';
                Datos.reloj.segundos_calculo += '+ ' + mostrartiempocarga;
                Datos.reloj.segundos = Sumar(Datos.reloj.segundos, Datos.reloj.segundosorden, cache.tarda_escribir, cache.tarda_escribirorden);

            }
        },
        pulsoReloj: function()
        {

            // INICIALIZA VAROBA:ES
            this.actividad = '';
            this.actividad_registro = 0;


            this.IniciaCalculos();
            // LEE LA INSTRUCCION DE MEMORIA
            this.instruccion_leida = Datos.memoria.instrucciones[(this.programcont / 4)];


            if (this.instruccion_leida.breack)
                Controlador.PararReloj();

            this.bits_instruccion = BitsHelper.EnteroABit(this.instruccion_leida.numero);
            this.instruccion_leidanro = this.programcont;

            // SUMA UNO AL PC
            this.programcont += 4;

            // DECODICA LA INSTRUCCION
            this.instruccion_decode = InstruccionHelper.DecodidicarInstruccion(this.bits_instruccion)
            if (this.instruccion_decode.instruccion.nombre == "ADD")
            {
                var ej = "$" + this.registros[this.instruccion_decode.NroRD].nombre + " = ";
                ej += this.registros[this.instruccion_decode.NroRS].valor + " + ";
                ej += this.registros[this.instruccion_decode.NroRT].valor;
                this.instruccion_decode.ejecucion = ej;
                this.registros[this.instruccion_decode.NroRD].valor = this.registros[this.instruccion_decode.NroRT].valor + this.registros[this.instruccion_decode.NroRS].valor;
            }
            if (this.instruccion_decode.instruccion.nombre == "MUL") {
                var ej = "$" + this.registros[this.instruccion_decode.NroRD].nombre + " = ";
                ej += this.registros[this.instruccion_decode.NroRS].valor + " * ";
                ej += this.registros[this.instruccion_decode.NroRT].valor;
                this.instruccion_decode.ejecucion = ej;
                this.registros[this.instruccion_decode.NroRD].valor = this.registros[this.instruccion_decode.NroRT].valor * this.registros[this.instruccion_decode.NroRS].valor;
            }

            if (this.instruccion_decode.instruccion.nombre == "SUB") {
                var ej = "$" + this.registros[this.instruccion_decode.NroRD].nombre + " = ";
                ej += this.registros[this.instruccion_decode.NroRS].valor + " - ";
                ej += this.registros[this.instruccion_decode.NroRT].valor;
                this.instruccion_decode.ejecucion = ej;
                this.registros[this.instruccion_decode.NroRD].valor = this.registros[this.instruccion_decode.NroRS].valor - this.registros[this.instruccion_decode.NroRT].valor;
            }
            if (this.instruccion_decode.instruccion.nombre == "ADDU") {
                var ej = "$" + this.registros[this.instruccion_decode.NroRD].nombre + " = ";
                ej += this.registros[this.instruccion_decode.NroRS].valor + " + ";
                ej += this.registros[this.instruccion_decode.NroRT].valor;
                this.instruccion_decode.ejecucion = ej;

                this.registros[this.instruccion_decode.NroRD].valor = this.registros[this.instruccion_decode.NroRT].valor + this.registros[this.instruccion_decode.NroRS].valor;

            }
            if (this.instruccion_decode.instruccion.nombre == "SLL") {
                var ej = "$" + this.registros[this.instruccion_decode.NroRD].nombre + " = ";
                ej += this.registros[this.instruccion_decode.NroRT].valor + " << ";
                ej += this.instruccion_decode.NroRE;
                this.instruccion_decode.ejecucion = ej;
                this.registros[this.instruccion_decode.NroRD].valor = this.registros[this.instruccion_decode.NroRT].valor << this.instruccion_decode.NroOffSet;
            }
            if (this.instruccion_decode.instruccion.nombre == "ADDI")
            {
                var ej = "$" + this.registros[this.instruccion_decode.NroRT].nombre + " = ";
                ej += this.registros[this.instruccion_decode.NroRS].valor + " + ";
                ej += this.instruccion_decode.NroOffSet;
                this.instruccion_decode.ejecucion = ej;
                this.registros[this.instruccion_decode.NroRT].valor = this.registros[this.instruccion_decode.NroRS].valor + this.instruccion_decode.NroOffSet;
            }
            //ACCESOS A MEMORIA
            if (this.instruccion_decode.instruccion.nombre == "LW")
            {
                var mem_destino = this.registros[this.instruccion_decode.NroRS].valor + this.instruccion_decode.NroOffSet; 
                var ej = "$" + this.registros[this.instruccion_decode.NroRT].nombre + " = LOAD(";
                ej += decimaltohex( this.registros[this.instruccion_decode.NroRS].valor ) + " + ";
                ej += this.instruccion_decode.NroOffSet + ") = LOAD(" + decimaltohex(mem_destino) + ")";
                this.instruccion_decode.ejecucion = ej;
                this.instruccion_decode.datosobtenidos = Datos.memoria.get_registro(mem_destino);
                this.registros[this.instruccion_decode.NroRT].valor = this.instruccion_decode.datosobtenidos;
                this.actividad = 'L';
                this.actividad_registro = mem_destino;
                Datos.bitsdirememoria = BitsHelper.EnteroABit(mem_destino);


                for (var i = 0; i < Datos.MEMV.length; i++)
                {
                    MEMVirtualHelper.LeerMemoria(Datos.MEMV[i], mem_destino);
                    
                }

                for (var i = 0; i < Datos.caches.length; i++)
                {
                    Datos.caches[i].direccion = mem_destino;
                    CacheHelper.LeerMemoriaCache(Datos.caches[i]);


                    if (Datos.caches[i].hit_en_via == -1)
                    {
                        this.MissCache(i);

                    }
                }


            }
            if (this.instruccion_decode.instruccion.nombre == "SW")
            {
                var mem_destino = this.registros[this.instruccion_decode.NroRS].valor + this.instruccion_decode.NroOffSet; 
                var ej = "$" + this.registros[this.instruccion_decode.NroRT].nombre + " = SAVE(";
                ej += decimaltohex( this.registros[this.instruccion_decode.NroRS].valor ) + " + ";
                ej += this.instruccion_decode.NroOffSet + ") = SAVE(" + decimaltohex(mem_destino) + ")";
                this.instruccion_decode.ejecucion = ej;
                this.instruccion_decode.datosobtenidos = Datos.memoria.set_registro(mem_destino, this.registros[this.instruccion_decode.NroRT].valor);
                this.actividad = 'E';
                this.actividad_registro = mem_destino;
                Datos.bitsdirememoria = BitsHelper.EnteroABit(mem_destino);




                for (var i = 0; i < Datos.MEMV.length; i++) {
                    MEMVirtualHelper.LeerMemoria(Datos.MEMV[i], mem_destino);

                }

                for (var i = 0; i < Datos.caches.length; i++)
                {
                    Datos.caches[i].direccion = mem_destino;
                    CacheHelper.EscribirMemoriaCache(Datos.caches[i]);
                    if (Datos.caches[i].hit_en_via == -1)
                    {
                        
                        this.MissEscritura(i);

                    }

                }

            }


            // COMPARADOR
            if (this.instruccion_decode.instruccion.nombre == "SLTU")
            {
                var ej = "$" + this.registros[this.instruccion_decode.NroRD].nombre + " = ";
                ej += this.registros[this.instruccion_decode.NroRS].valor + " < ";
                ej += this.registros[this.instruccion_decode.NroRT].valor;
                this.instruccion_decode.ejecucion = ej;

                if (this.registros[this.instruccion_decode.NroRS].valor < this.registros[this.instruccion_decode.NroRT].valor)
                    this.registros[this.instruccion_decode.NroRD].valor = 1;
                else
                    this.registros[this.instruccion_decode.NroRD].valor = 0;

            }


            // SALTOS
            if (this.instruccion_decode.instruccion.nombre == "J")
            {
                this.programcont = this.instruccion_decode.NroOffSet << 2

                var ej = "PC = " + (this.instruccion_decode.NroOffSet << 2);
                this.instruccion_decode.ejecucion = ej;

            }

            // SALTOS CONDICIONALES

            if (this.instruccion_decode.instruccion.nombre == "BEQ")
            {
                var ej = "PC = $" + this.registros[this.instruccion_decode.NroRS].nombre + " == ";
                ej += this.registros[this.instruccion_decode.NroRT].valor + " ? ";
                ej += (this.instruccion_decode.NroOffSet << 2);
                this.instruccion_decode.ejecucion = ej;


                if (this.registros[this.instruccion_decode.NroRS].valor == this.registros[this.instruccion_decode.NroRT].valor)
                {

                    var correr = (this.instruccion_decode.NroOffSet << 2);
                    if (this.instruccion_decode.NroOffSet > Math.pow(2, 15)) {
                        var inst = Math.pow(2, 16) - this.instruccion_decode.NroOffSet;
                        correr = -(inst << 2);
                    }

                    this.programcont = this.programcont + correr
                }
                    
            }

            if (this.instruccion_decode.instruccion.nombre == "BNE") {
                var ej = "PC = $" + this.registros[this.instruccion_decode.NroRS].nombre + " == ";
                ej += this.registros[this.instruccion_decode.NroRT].valor + " ? ";
                ej += (this.instruccion_decode.NroOffSet << 2);
                this.instruccion_decode.ejecucion = ej;

                if (this.registros[this.instruccion_decode.NroRS].valor != this.registros[this.instruccion_decode.NroRT].valor) {

                    var correr = (this.instruccion_decode.NroOffSet << 2);
                    if (this.instruccion_decode.NroOffSet > Math.pow(2, 15)) {
                        var inst = Math.pow(2, 16) - this.instruccion_decode.NroOffSet;
                        correr = -(inst << 2);
                    }

                    this.programcont = this.programcont + correr
                }
            }
        }

        

        
        
    },
}


var Controlador = 
{


    CrearRegistro: function(nombre, valorP) 
    {
        if (valorP == undefined)
            valorP = 0; 
        var ret = 
        {
            nombre: nombre,
            valor: valorP 
        };
        return ret;
    },

    

    IniciarReloj: function()
    {
            Datos.reloj.id_funcion = setInterval(Controlador.PulsoReloj, Datos.reloj.tiempo);
    },

    PararReloj: function()
    {
        clearTimeout(Datos.reloj.id_funcion);
    },

    PulsoReloj: function()
    {
        Datos.procesador.pulsoReloj();

    },
    ActualizarBits()
    {
        Datos.lecturadebit = InstruccionHelper.DecodidicarInstruccion(Datos.bits);
        Datos.lecturadebit.numero = BitsHelper.BitsAEntero(Datos.bits);
        Datos.lecturadebit.hexadecimales = BitsHelper.BitsAHexa(Datos.bits);
        Datos.lecturadebit.caracteres = BitsHelper.BitsACaracter(Datos.bits);
        

    }



}



Datos.reloj.conectado_a = Datos.procesador;
Datos.procesador.memoria = Datos.memoria;

Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("Zero");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("at");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("v0");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("v1");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("a0");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("a1");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("a2");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("a3");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("a4");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t0");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t1");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t2");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t3");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t4");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t5");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t6");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t7");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s0");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s1");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s2");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s3");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s4");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s5");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s6");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("s7");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t8");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("t9");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("k0");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("k1");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("gp");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("sp");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("fp");
Datos.procesador.registros[Datos.procesador.registros.length] = Controlador.CrearRegistro("ra");


/*

TP:
Seter.CargarCacheCaso1();
Seter.CargarCacheModelo2();


Ejercicios Guia CACHE:

seter.CargarEjercicio1();
Seter.CargarEjercicio2();

Ejercicio 3: 
Seter.CargarEjercicio3CacheA();
Seter.CargarEjercicio3ProgramaBuenaA();

Seter.CargarEjercicio3CacheB();
Seter.CargarEjercicio3ProgramaBuenaB();

Ejercicio 4:



Seter.CargarEjercicio5CacheA();
Seter.CargarEjercicio5ProgramaBuenaA(); 



Seter.CargarEjercicio4ColumnMajorOrder();
Seter.CargarEjercicio4RowMajorOrder();
*/
//Seter.CargarEjercicioGUIAGRANDE31();

//Seter.CargarEjercicio5CacheA();

Seter.CargarCacheCaso1();
Seter.CargarCacheModelo2();

Datos.bits = BitsHelper.GetBits(32);


Datos.MEMV[0] = MEMVirtualHelper.GetMEMVirtual();
Datos.MEMV[0].Nivel1 = 4
Datos.MEMV[0].Nivel2 = 4
Datos.MEMV[0].Nivel3 = 4
Datos.MEMV[0].Offset = 8
Controlador.ActualizarBits();
Controlador.PulsoReloj();



Vue.component('instruccionalta', 
    {
        props: ['instruccion'],
        template: '#instruccionalta-template',
        methods: {

            NombreVariable(id_variable) {
                return Datos.memoria.slacks[0].variables[id_variable].nombre
            }
        }
    });

Vue.component('my-checkbox', {
    template: '#checkbox-template',
    data() {
        return { checked: false, title: 'Check me' }
    },
    methods: {
        check() { this.checked = !this.checked; }
    }
});



var app = new Vue({
    el: '#app',
    data: Datos,
    methods: {

        Click_Bit: function (index) {
            if (Datos.bits[index] == 0)
                Datos.bits[index] = 1
            else
                Datos.bits[index] = 0;

            Controlador.ActualizarBits();

        },
        click_instruccion: function (index) {
            var ins = Datos.memoria.instrucciones[index];


            Datos.vista.mostrando_bits = 'instr';
            Datos.vista.mirando_instruccion = index;
            Datos.bits = BitsHelper.EnteroABit(ins.numero);
            Controlador.ActualizarBits();
        },
        NombreVariable(id_variable)
        {
            return Datos.memoria.slacks[0].variables[id_variable].nombre
        },
        cambio_numerobit: function () {

            Datos.bits = BitsHelper.EnteroABit(Datos.lecturadebit.numero);
            Controlador.ActualizarBits();
        },
        leerdireccion: function () {

            var mem_destino = Datos.lecturadebit.numero;
            for (var i = 0; i < Datos.MEMV.length; i++) {
                MEMVirtualHelper.LeerMemoria(Datos.MEMV[i], mem_destino);

            }

            for (var i = 0; i < Datos.caches.length; i++) {
                Datos.caches[i].direccion = mem_destino;
                CacheHelper.LeerMemoriaCache(Datos.caches[i]);
            }

        },

        cambio_numerohexa: function ()
        {

            Datos.bits = BitsHelper.HexaABit(Datos.lecturadebit.hexadecimales);
            Controlador.ActualizarBits();
        },

        click_valormemoria: function (valor) {
            Datos.vista.mostrando_bits = 'valor';
            Datos.bits = BitsHelper.EnteroABit(valor);
            Controlador.ActualizarBits();
        },
        BitsATamanio: function (bit) {
            return BitsHelper.BitsATamanio(bit);
        },
        TotalMemoriaCache: function (cache) {
            return CacheHelper.TotalMemoriaCache(cache);
        },

        MostrarConOrden: function (valor, orden) {
            return Escribir(valor, orden);

        },

        cambio_rangocache: function (cache) {
            if (parseInt(cache.nrobits_offset) + parseInt(cache.nrobits_tag) > 32) {
                cache.nrobits_tag = 32 - cache.nrobits_offset;

            }
            cache.nrobits_index = 32 - cache.nrobits_offset - cache.nrobits_tag;
            CacheHelper.ActualizarBits(cache);
            this.$forceUpdate();

        },
        cambio_rangoMEMV: function (memoria)
        {
            MEMVirtualHelper.ActualizarBits(memoria);
        },
        DosALa: function (pot) {
            return Math.pow(2, pot);

        },
        MissPenalty: function (cache) {
            return CacheHelper.MissPenalty(cache, Datos.reloj);

        },
        ClocksEscritura: function (cache) {
            return CacheHelper.ClocksEscritura(cache, Datos.reloj);

        },
        

        TiempoBloque: function (cache) {
            return CacheHelper.TiempoBloque(cache, Datos.reloj);

        },
        CambioCPI: function ()
        {
            Datos.reloj.ci = 1 / parseFloat(Datos.reloj.cpi)
            
        },
        MIPS: function ()
        {
            unidad = Datos.reloj.Frecuencia / parseFloat(Datos.reloj.cpi);
            return Escribir(unidad, Datos.reloj.MagnitudFrecuencia - 6);
        },

        posicionMemoriaHexString: function (posicion, elem_vector) {
            posicion += (elem_vector * 4);
            if (posicion == undefined) {
                return "UNDEF"
            }
            try {
                var valor = decimaltohex(posicion);
                return zfill(valor, 8, "f");
            }
            catch (err) {
                return "EX00" + err.message;
            }
        },
        cache_bloque2: function (memoria)
        {
            return MEMVirtualHelper.GetTotalCache2(memoria);
        },

        cache_bloque3: function (memoria) {
            return MEMVirtualHelper.GetTotalCache3(memoria);
        },

        decimalToHexString: function (parte_word) {
            if (parte_word == undefined) {
                return "UNDEF"
            }
            try {
                var valor = decimaltohex(parte_word);
                return zfill(valor, 8, "0");
            }
            catch (err) {
                return "EX00" + err.message;
            }
        },
        decimalToHexStringMEM: function (parte_word) {
            if (parte_word == undefined) {
                return "UNDEF"
            }
            try {
                var valor = decimaltohex(parte_word);
                return zfill(valor, 2, "0");
            }
            catch (err) {
                return "EX00" + err.message;
            }
        }
    }
});

