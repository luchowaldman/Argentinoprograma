palabraHelper = {
    
    GetPalabra_Base: function()
    {
        var palabra = 
        {
            partes: []

        }
        return palabra;
    },

    GetPalabra: function(vBit, vValor)
    {
        var parte = { bits: vBit, valor: vValor };
        return JSON.parse(JSON.stringify(parte));;
    },

    ConcatenarPartes: function(palabra1, palabra2)
    {
        var bits_npalabra = palabra1.bits + palabra2.bits;
        var valor_palabra = palabra1.valor * (2 ** palabra2.bits);
        valor_palabra += palabra2.valor;
        return this.GetPartePalabra(bits_npalabra, valor_palabra);
    }


    



}