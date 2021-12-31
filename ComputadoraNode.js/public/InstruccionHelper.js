InstruccionHelper = 
{
    DecodidicarInstruccion: function(bits)
    {
        InstruccionDecodificada = {
            ejecucion: 'NOP'
        };
        
        InstruccionDecodificada.BitsOP = BitsHelper.CortarBits(bits, 0, 6);
        InstruccionDecodificada.NroOp = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsOP);


        InstruccionDecodificada.BitsRS = BitsHelper.CortarBits(bits, 6, 11);
        InstruccionDecodificada.NroRS = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsRS);

        InstruccionDecodificada.BitsTarget = BitsHelper.CortarBits(bits, 6, 32);
        InstruccionDecodificada.NroTarget = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsTarget);

        InstruccionDecodificada.BitsRT = BitsHelper.CortarBits(bits, 11, 16);
        InstruccionDecodificada.NroRT = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsRT);

        InstruccionDecodificada.BitsRD = BitsHelper.CortarBits(bits, 16, 21);
        InstruccionDecodificada.NroRD = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsRD);

        InstruccionDecodificada.BitsOffSet = BitsHelper.CortarBits(bits, 16, 32);
        InstruccionDecodificada.NroOffSet = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsOffSet);

        
        InstruccionDecodificada.BitsRE = BitsHelper.CortarBits(bits, 21, 26);
        InstruccionDecodificada.NroRE = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsRE);

        InstruccionDecodificada.BitsFN = BitsHelper.CortarBits(bits, 26, 32);
        InstruccionDecodificada.NroFN = BitsHelper.BitsAEntero(InstruccionDecodificada.BitsFN);

        
        InstruccionDecodificada.instruccion = ""
        InstruccionDecodificada.tipoinstruccion = 'r';
        if (InstruccionDecodificada.NroOp == 2)
        {
            InstruccionDecodificada.instruccion = InstruccionHelper.GetJ(InstruccionDecodificada.NroTarget);
            InstruccionDecodificada.tipoinstruccion = 'j';

        }
        
        if (InstruccionDecodificada.NroOp == 0)
        {
            InstruccionDecodificada.tipoinstruccion = 'r';

            if (InstruccionDecodificada.NroFN == 0)
                InstruccionDecodificada.instruccion = InstruccionHelper.GetSLL(InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRD, InstruccionDecodificada.NroRE);
            if (InstruccionDecodificada.NroFN == 2)
                InstruccionDecodificada.instruccion = InstruccionHelper.GetMUL(InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRD, InstruccionDecodificada.NroRE);
            if (InstruccionDecodificada.NroFN == 32)
                InstruccionDecodificada.instruccion = InstruccionHelper.GetADD(InstruccionDecodificada.NroRS, InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRD);
            if (InstruccionDecodificada.NroFN == 33)
                InstruccionDecodificada.instruccion = InstruccionHelper.GetADDU(InstruccionDecodificada.NroRS, InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRD);
            if (InstruccionDecodificada.NroFN == 34)
                InstruccionDecodificada.instruccion = InstruccionHelper.GetSUB(InstruccionDecodificada.NroRS, InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRD);
            if (InstruccionDecodificada.NroFN == 36)
                InstruccionDecodificada.instruccion = InstruccionHelper.GetAND(InstruccionDecodificada.NroRS, InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRD);
            if (InstruccionDecodificada.NroFN == 43)
                InstruccionDecodificada.instruccion = InstruccionHelper.GetSLTU(InstruccionDecodificada.NroRS, InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRD);
        }
        
        if (InstruccionDecodificada.NroOp == 8)
        {
            InstruccionDecodificada.tipoinstruccion = 'i';
            InstruccionDecodificada.instruccion = InstruccionHelper.GetADDI(InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRS, InstruccionDecodificada.NroOffSet);

        }



        if (InstruccionDecodificada.NroOp == 5) {
            InstruccionDecodificada.tipoinstruccion = 'i';
            InstruccionDecodificada.instruccion = InstruccionHelper.GetBNE(InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRS, InstruccionDecodificada.NroOffSet);
        }


        if (InstruccionDecodificada.NroOp == 6)
        {
            InstruccionDecodificada.tipoinstruccion = 'i';
            InstruccionDecodificada.instruccion = InstruccionHelper.GetBEQ(InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRS, InstruccionDecodificada.NroOffSet);
        }

        if (InstruccionDecodificada.NroOp == 35)
        {
            InstruccionDecodificada.tipoinstruccion = 'i';
            InstruccionDecodificada.instruccion = InstruccionHelper.GetLW(InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRS, InstruccionDecodificada.NroOffSet);
        }

        if (InstruccionDecodificada.NroOp == 43)
        {
            InstruccionDecodificada.tipoinstruccion = 'i';
            InstruccionDecodificada.instruccion = InstruccionHelper.GetSW(InstruccionDecodificada.NroRT, InstruccionDecodificada.NroRS, InstruccionDecodificada.NroOffSet);
        }
        return InstruccionDecodificada;

    },
    
    GetInstruccion: function()
    {
        var instruccion = {
            nombre: '',
            code: '',
            numero: 0,
        };
        return JSON.parse(JSON.stringify(instruccion));;
    
    },
    GetNroI(op, rs, rt, offset)
    {
        ret = op;
        ret = ret << 5
        ret += rs;
        ret = ret << 5
        ret += rt;
        ret = ret << 16
        if (offset < 0)
        {
            var nro = 0x0000FFFF + offset;
            ret += nro;
        }
        else
        {
            ret += offset;
        }
        return ret;
    },

    
    GetNroJ(op, offset)
    {
        ret = op;
        ret = ret << 26
        ret += offset;
        return ret;
    },
    
    GetNroP(op, rs, rt, rd, re, fu)
    {
        ret = op;
        ret = ret << 5
        ret += rs;
        ret = ret << 5
        ret += rt;
        ret = ret << 5
        ret += rd;
        ret = ret << 5
        ret += re;
        ret = ret << 6
        ret += fu;
        return ret;
    },
    
    GetADDI: function(rs, rt, offset)
    {
        
        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroI(8, rs, rt, offset);

        ret.nombre = "ADDI";
        ret.code = "ADDI $" + rs + ", $" + rt +  ", " + offset;

        return ret;
    },

    GetBEQ: function(rs, rt, offset)
    {
        
        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroI(6, rs, rt, offset);
        ret.nombre = "BEQ";
        ret.code = "BEQ $" + rs + ", $" + rt +  ", " + offset;

        return ret;
    },
    GetBNE: function (rs, rt, offset) {

        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroI(5, rs, rt, offset);
        ret.nombre = "BNE";
        ret.code = "BNE $" + rs + ", $" + rt + ", " + offset;

        return ret;
    },

    GetSW: function(base, rt, offset)
    {
        
        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroI(43, base, rt, offset);
        ret.code = "SW $" + rt + ", " + offset + "($" + base + ")";
        ret.nombre = "SW";
        return ret;
    },
    GetLW: function(rs, rt, offset)
    {
        
        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroI(35, rs, rt, offset);
        ret.code = "LW $" + rt + ", " + offset + "($" + rs + ")";
        ret.nombre = "LW";
        return ret;
    },
    GetJ: function(target)
    {
        
        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroJ(2 , target);
        ret.code = "J " + target;
        ret.nombre = "J";

        return ret;
    },

    GetADD: function(rs, rt, rd)
    {
        
        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroP(0, rs, rt, rd, 0, 32);
        ret.code = "ADD $" + rd + ", $" + rt + ", $" + rs ;
        ret.nombre = "ADD";

        return ret;
    },

    GetMUL: function (rs, rt, rd) {

        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroP(0, rs, rt, rd, 0, 2);
        ret.code = "MUL $" + rd + ", $" + rt + ", $" + rs;
        ret.nombre = "MUL";

        return ret;
    },
    GetSUB: function (rs, rt, rd) {

        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroP(0, rs, rt, rd, 0, 34);
        ret.code = "SUB $" + rd + ", $" + rt + ", $" + rs;
        ret.nombre = "SUB";

        return ret;
    },



    GetADDU : function (rs, rt, rd) {

        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroP(0, rs, rt, rd, 0, 33);
        ret.code = "ADDU $" + rd + ", $" + rt + ", $" + rs;
        ret.nombre = "ADDU";

        return ret;
    },


    GetAND: function(rs, rt, rd)
    {
        
        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroP(0, rs, rt, rd, 0, 36);
        ret.code = "AND $" + rs + ", $" + rt + ", $" + rd ;
        ret.nombre = "AND";

        return ret;
    },



    GetLOAD_LBU: function(reg, pos)
    {
        var instruccion = this.GetInstruccion();
        instruccion.tipo = "LOAD";
        ret.nombre = "LBU";
    },

    GetSLTU: function (rs, rt, rd) {

        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroP(0, rs, rt, rd, 0, 43);
        ret.code = "SLTU $" + rs + ", $" + rt+ ", $" + rd;
        ret.nombre = "SLTU";
        return ret;
    },


    GetSLL: function (rs, rd, sa) {

        var ret = InstruccionHelper.GetInstruccion();
        ret.numero = InstruccionHelper.GetNroP(0, 0, rs, rd, sa, 0);
        ret.code = "SLL $" + rd + ", $" + rs + ", $" + sa;
        ret.nombre = "SLL";

        return ret;
    }
}