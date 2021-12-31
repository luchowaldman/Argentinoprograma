MEMVirtualHelper = {
    GetMEMVirtual: function () {
        var ret = {
            Nivel1: 10,
            Nivel2: 10,
            Nivel3: 0,
            Offset: 12,
            direccion: 0,
            direccionbits: [],
            bitsoffset: [],
            direccionbitsN1: [],
            direccionbitsN2: [],
            direccionbitsN3: [],
            totalbit: 0,
            nrobitsoffset: [],
            nrodireccionbitsN1: [],
            nrodireccionbitsN2: [],
            nrodireccionbitsN3: [],
            Nivel2Cargados: [],

            TamPTP: 4,
            TamPTE: 4
        }
        this.ActualizarBits(ret);
        return ret;
    },
    GetGrupo2(nro)
    {
        ret =
        {
            nro: nro,
            grupos: []
        }
        return ret;
    },
    GetTotalCache2: function (memoria) {
        return memoria.Nivel2Cargados.length;
    },
    GetTotalCache3: function (memoria)
    {
        var ret = 0;


        for (var i = 0; i < memoria.Nivel2Cargados.length; i++)
        {
            ret += memoria.Nivel2Cargados[i].grupos.length;
        }

        return ret;
    },

    TamNivel1: function (memoria)
    {
        var acu = Math.pow(2, memoria.Nivel1);

        if (memoria.Nivel2 > 0) {
            acu *= memoria.TamPTP;
        }
        else
        {

            acu *= memoria.TamPTE;
        }
        return acu;
    },
    TamNivel2: function (memoria) {
        var acu = Math.pow(2, memoria.Nivel2);

        if (memoria.Nivel3 > 0)
        {
            acu *= memoria.TamPTP;
        }
        else
        {

            acu *= memoria.TamPTE;
        }
        return acu;
    },
    TamNivel3: function (memoria) {
        var acu = Math.pow(2, memoria.Nivel3);

        acu *= memoria.TamPTE;

        return acu;
    },

    TamTotal: function (memoria)
    {
        var acu = parseInt(this.TamNivel1(memoria));
        acu += (this.TamNivel2(memoria) * this.GetTotalCache2(memoria))
        acu += (this.TamNivel3(memoria) * this.GetTotalCache3(memoria))

        return Escribir(acu, 0);
    },

    LeerMemoria: function (memoria, direccion)
    {
        memoria.direccion = direccion;
        this.ActualizarBits(memoria);

        var EncontroNivel2 = -1;
        if (memoria.Nivel2 > 0)
        {
            for (var i = 0; i < memoria.Nivel2Cargados.length; i++)
            {
                if (memoria.Nivel2Cargados[i].nro == memoria.nrodireccionbitsN1)
                {
                    EncontroNivel2 = i;
                }
            }
            if (EncontroNivel2 == -1)
            {
                EncontroNivel2 = memoria.Nivel2Cargados.length;
                memoria.Nivel2Cargados[memoria.Nivel2Cargados.length] = this.GetGrupo2(memoria.nrodireccionbitsN1);
            }
        }

        if (memoria.Nivel3 > 0) {
            var EncontroNivel3 = -1;
            for (var i = 0; i < memoria.Nivel2Cargados[EncontroNivel2].grupos.length; i++) {
                if (memoria.Nivel2Cargados[EncontroNivel2].grupos[i] == memoria.nrodireccionbitsN2) {
                    EncontroNivel3 = i;
                }
            }
            if (EncontroNivel3 == -1) {
                EncontroNivel3 = memoria.Nivel2Cargados[EncontroNivel2].grupos.length;
                memoria.Nivel2Cargados[EncontroNivel2].grupos[EncontroNivel3] = memoria.nrodireccionbitsN2;

            }
        }
        
    },

    ActualizarBits: function (memoria)
    {
        var totalbit = parseInt(memoria.Nivel1) + parseInt(memoria.Nivel2) + parseInt(memoria.Nivel3) + parseInt(memoria.Offset);
        memoria.totalbit = totalbit;
        memoria.direccionbits = BitsHelper.EnteroANBit(memoria.direccion, totalbit);
        if ((memoria.Nivel2 == 0) & (memoria.Nivel3 > 0))
        {
            memoria.Nivel2 = memoria.Nivel3;
            memoria.Nivel3 = 0;
        }
        memoria.direccionbitsN1 = BitsHelper.CortarBits(memoria.direccionbits, 0, parseInt(memoria.Nivel1));
        memoria.direccionbitsN2 = BitsHelper.CortarBits(memoria.direccionbits, parseInt(memoria.Nivel1), parseInt(memoria.Nivel1) + parseInt(memoria.Nivel2));
        memoria.direccionbitsN3 = BitsHelper.CortarBits(memoria.direccionbits, parseInt(memoria.Nivel1) + parseInt(memoria.Nivel2), parseInt(memoria.Nivel1) + parseInt(memoria.Nivel2) + parseInt(memoria.Nivel3));
        memoria.bitsoffset = BitsHelper.CortarBits(memoria.direccionbits, parseInt(memoria.Nivel1) + parseInt(memoria.Nivel2) + parseInt(memoria.Nivel3), totalbit);


        memoria.nrodireccionbitsN1 = BitsHelper.BitsAEntero(memoria.direccionbitsN1);
        memoria.nrodireccionbitsN2 = BitsHelper.BitsAEntero(memoria.direccionbitsN2);
        memoria.nrodireccionbitsN3 = BitsHelper.BitsAEntero(memoria.direccionbitsN3);
        memoria.nrooffset = BitsHelper.BitsAEntero(memoria.bitsoffset);

    }
}