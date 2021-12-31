var Ejercicios = [];

var EjerciciosHelper =  {

    Cont: 0,
    NuevoEjercicio: function (num)
    {
        if (num == undefined)
            num = this.Cont++;

        ret_solucion = {

        };

        ret = {
            numero: num,
            nombre: '',
            enunciado: '',
            solucion: ret_solucion

        };
        return ret;
    }
};






var Proyectos = [
    {
        nombre: 'Inicio'
    },
    {
        nombre: 'Administra tu Laboratorio'
    },
    {
        nombre: 'Una banda de musica'
    },
    {
        nombre: 'Un video juego'
    },
    {
        nombre: 'un robot'
    },
    {
        nombre: 'un viaje a la luna'
    }

];

Proyectos[0].ejercicios = [];

var proyid = 0;

var nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Devolver 1";
nueEj.enunciado = "Declarar una función que devuelva el valor entero 1";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "el mas grande";
nueEj.enunciado = "Declarar una función que reciba un 3 valores y devuelva el mayor";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "el mas chico";
nueEj.enunciado = "Declarar una función que reciba un 3 valores y devuelva el menor";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Protocolo";
nueEj.enunciado = "Declarar una función que si recibe el texto 'hola' devuelve el texto 'chau'";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Ordenar un vector";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y su tamaño, y devuelva el vector ordenado";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "El promedio";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y su tamaño, y devuelva el promedio de los valores recibidos";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "El maximo";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y su tamaño, y devuelva el maximo de los valores recibidos";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();

nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Obtener la cantidad";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y devuelva su tamaño, considerando que termina cuando tiene un 0 como valor.";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;
nueEj = EjerciciosHelper.NuevoEjercicio();


nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Agregar elemento a un vector de enteros";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y un valor y se le agregue ";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;



nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Agregar elemento a un vector de textos";
nueEj.enunciado = "Declarar una función que reciba un vector de textos y un valor y se le agregue ";

Proyectos[0].ejercicios[Proyectos[0].ejercicios.length] = nueEj;


nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Mayores que 5";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y devuelva la cantidad de numeros que son mayores que 5";

Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;


nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Semaforo";
nueEj.enunciado = "Declarar una función que devuelva 1 entre tres valores, segun el valor de tiempo que se le ingrese ";

Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;


// LABORATORIO
proyid = 1;
Proyectos[proyid].ejercicios = [];


nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "La varianza";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y devuelva su varianza";

Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;



nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Fuera de lo comun";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y un valor para ingresar. Si el valor esta fuera del promedio imprime una alerta ";

Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;


nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Fuera de lo común";
nueEj.enunciado = "Declarar una función que reciba un vector de enteros y un valor para ingresar. Si el valor esta fuera del promedio imprime una alerta ";

Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;



// BANDA DE MUSICA
proyid = 2;

Proyectos[proyid].ejercicios = [];
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Dar la nota";
nueEj.enunciado = "Declarar una función que reciba un numero de nota y devuelva su nombre";
Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;




Proyectos[proyid].ejercicios = [];
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "El beat";
nueEj.enunciado = "Declarar una función que reciba un tiempo y un pulso y devuelva verdadero si tiene que sonar un ";
Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;


// Video juego
proyid = 3;
Proyectos[proyid].ejercicios = [];
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Azar";
nueEj.enunciado = "Declarar una función que devuelva un numero al azar";
Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;


nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Ruleta";
nueEj.enunciado = "Declarar una función que reciba un numero y devuelva verdadero si gano.";
Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;


// robot
proyid = 4;
Proyectos[proyid].ejercicios = [];
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Mover";
nueEj.enunciado = "Si detecta movimiento en un sensor, mueve un motor";
Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;

// viaje a la luna
proyid = 5;
Proyectos[proyid].ejercicios = [];
nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Gases";
nueEj.enunciado = "Calcular la presion de gas en un recipiente. El volumen, el numero de moleculas y la temperatura son pasadas por parametros ";
Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;


nueEj = EjerciciosHelper.NuevoEjercicio();
nueEj.nombre = "Disparo";
nueEj.enunciado = "Calcular donde cae una piedra. La fuerza en el eje X y en el eje Y son recibidas como parametros.";
Proyectos[proyid].ejercicios[Proyectos[proyid].ejercicios.length] = nueEj;
