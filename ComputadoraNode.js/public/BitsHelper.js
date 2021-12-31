BitsHelper = 
{
    
    
    GetDecimal: function () {

        var ret = [];
        for (var c = 0; c < bits; c++)
            ret[c] = 0;
        return ret;

    },
    GetBits: function(bits)
    {
        var ret = [];
        for (var c = 0; c < bits; c++)
            ret[c] = 0;
        return ret;
    },
    BitsAEntero: function(bits)
    {
        let ret = 0;
        for (var c = 0; c < bits.length; c++)
            {
                ret = (ret << 1);
                ret += bits[c] ;
            }
            
        return ret;
    },
    
    EnteroABit: function(nro)
    {

        let nrocopia = nro;
        let ret = this.GetBits(32);

        for (var c = 0; c < 32; c++)
        {
            if ((nrocopia % 2) == 0)
                ret[31 - c] = 0;
            else
                ret[31 - c] = 1;
            nrocopia = (nrocopia >> 1);
        }   
        return ret;
    },

    HexaABit: function (hexas)
    {
        var ret = 0;
        for (var i = 0; i < hexas.length; i++)
        {
            ret = ret << 4;
            ret += parseInt("0x" + hexas);
        }
        return this.EnteroABit(ret);
    },

    EnteroANBit: function(nro, NBits)
    {
        if (!nro)
            nro = 0;
        let nrocopia = nro;
        let ret = this.GetBits(NBits);

        for (var c = 0; c < NBits; c++)
        {
            if ((nrocopia % 2) == 0)
                ret[NBits - 1 - c] = 0;
            else
                ret[NBits - 1 - c] = 1;
            nrocopia = (nrocopia >> 1);
        }
            
        return ret;
    },



    FlotanteANBit: function (nro, NBits, NFBits) {
        if (!nro)
            nro = 0;
        let nrocopia = parseInt(nro);
        let nrocopiadec = parseFloat(nro);
        nrocopiadec = nrocopiadec - nrocopia;

        let ret = this.GetBits(NBits);

        for (var c = 0; c < NBits; c++) {
            if ((nrocopia % 2) == 0)
                ret[c] = 0;
            else
                ret[c] = 1;
            nrocopia = (nrocopia >> 1);
        }
        ret = ret.reverse();

        for (var c = 0; c < NFBits; c++)
        {
            nrocopiadec = nrocopiadec * 2;
            if (nrocopiadec >= 1) {
                ret[NBits + c] = 1;
                nrocopiadec = nrocopiadec - 1;
            }
            else
                ret[NBits + c] = 0;
        }

        return ret;
    },
    BitsATamanio: function(NroBits)
    {
        var toOp = NroBits;
        var ret = "";
        while (toOp >= 10) 
        {

            if (ret == "P")
                ret = "E";
            if (ret == "T")
                ret = "P";
            if (ret == "G")
                ret = "T";
            if (ret == "M")
                ret = "G";
            if (ret == "K")
                ret = "M";
            if (ret == "")
                ret = "K";
            
            toOp -= 10;
        }
        ret = Math.pow(2, toOp) + ret;
        return ret;
    },

    


    BitsAHexa: function(bits)
    {
        var ret = [];


        for (var c = 0; c < bits.length; )
            {
                    
            let acumulador = 0;
            for (var contadorbit = 0;(contadorbit < 4)  &&  (c < bits.length); contadorbit++)
            {
                acumulador = (acumulador << 1);
                acumulador += bits[c];
                c++;
            }
            ret[ret.length] = acumulador.toString(16);

        }
            
        return ret;

    },

    BitsACaracter: function(bits)
    {
        var ret = [];


        for (var c = 0; c < bits.length; )
            {
                    
            let acumulador = 0;
            for (var contadorbit = 0;(contadorbit < 8)  &&  (c < bits.length); contadorbit++)
            {
                acumulador = (acumulador << 1);
                acumulador += bits[c];
                c++;
            }
            ret[ret.length] = {
                num: acumulador,
                caracter: String.fromCharCode(acumulador)
            } 
        }
            
        return ret;

    },

    
    ConcatenarBits: function(bits1, bists2)
    {

        var ret = [];
        for (var c = 0; c < bits1; c++)
            ret[ret.length] = bits1[c];
        for (var c = 0; c < bits2; c++)
                ret[ret.length] = bits2[c];
        return ret;
    },
    CortarBits: function(bits1, desde, hasta)
    {

        var ret = [];
        for (var c = desde; c < hasta; c++)
            ret[ret.length] = bits1[c];
        return ret;
    }
}
