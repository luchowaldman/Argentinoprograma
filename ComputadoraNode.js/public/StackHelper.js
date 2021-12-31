var StackHelper = 
{
    // Crea un slack y devuelve el tope actualizado
    CrearSlack: function(fn, tope, variables)
    {
           var ret = 
           {
               variables: [],
               tope: 0,
               fn: fn
            };
           
            var desde = 0;


            for (var c = 0; c <  variables.length; c++)
            {
                if (variables[c].tipo == 'int')
                {
                    variables[c].desde = desde;
                    desde += (4 * variables[c].tam_vector);
                }
 
                if (variables[c].tipo == 'char')
                {
                    variables[c].desde = desde;
                    desde += (2 * variables[c].tam_vector);
                    desde =((desde >> 2) << 2) + 4 ;
                }
           }

           ret.tope = tope - desde;
           for (var c = 0; c < variables.length; c++)
           {
               variables[c].posicion = ret.tope + variables[c].desde;
           }
           ret.variables = variables;

            
             
            
            return ret;
    },
    CrearVariable: function(nombre, tipo, tam_vector, valor)
    {
        var variable = {

            nombre : nombre,
            tipo : tipo,
            tam_vector : tam_vector,
            valor : valor ,
            desde : 0 ,
            posicion : 0,
            tam_enteros: 0
            

        };

        if (tipo == 'char')
        {
            variable.valor = [];

            for (var c = 0; (c * 4) < tam_vector; c++)
            {
                var interovalor = 0;
                var otrocont = 0

                for (var cont = (c * 4); (otrocont < 4) && (cont < tam_vector); cont++)
                {
                    interovalor = interovalor << 8;
                    interovalor += valor.charCodeAt(cont);
                    otrocont++;
                }

                for (cont = cont; otrocont < 4; cont++)
                {
                    interovalor = interovalor << 8;
                    otrocont++;
                }
                
                variable.valor[variable.valor.length] = interovalor;
                
            }
        }

        return variable;

    }
       
}