var ContadorStamp = 0;
CacheHelper = {
    NewCache: function() 
    {
        var ret = 
        {
            latencia: 100, /*nonosegungos*/
            latenciaunidad: -9,
            anchobanda: 200, /* MegaHerz */
            anchobandaunidad: 6,


            nrobits_tag: 18,
            nrobits_index: 7,
            nrobits_offset: 7,
            vias: 2,

            politicareemplazo: 'FIFO',
            missescritura: false,
            tarda_escribir: 10,
            tarda_escribirorden: -9,


            bits_tag: [],
            bits_index: [],
            bits_offset: [],
            nro_tag: 0,
            nro_index: 0,
            nro_offset: 0,
            direccion: 0,

            lecturas: 0,
            misses: 0,
            hit_en_via: -1,
            missrate: 0,
            bloques: [],
        }
        this.ActualizarBits(ret);
        return ret;

    },
    ActualizarBits(cache)
    {
        var bits = BitsHelper.EnteroABit(cache.direccion);
        
        cache.bits_tag = BitsHelper.CortarBits(bits, 0, cache.nrobits_tag)
        cache.nro_tag = BitsHelper.BitsAEntero(cache.bits_tag);

        
        cache.bits_index = BitsHelper.CortarBits(bits, parseInt(cache.nrobits_tag), parseInt(cache.nrobits_tag) + parseInt(cache.nrobits_index));
        cache.nro_index = BitsHelper.BitsAEntero(cache.bits_index);

        
        cache.bits_offset = BitsHelper.CortarBits(bits, parseInt(cache.nrobits_tag) + parseInt(cache.nrobits_index), 32);
        cache.nro_offset = BitsHelper.BitsAEntero(cache.bits_offset);
    },

    Tiempocarga(cache, reloj) {
        var tamgru = Math.pow(2, cache.nrobits_offset);
        if (cache.anchobanda == 0)
            cache.anchobanda = 1;
        var tiempo_bloque = (tamgru / cache.anchobanda);
        var tiempocarga = Sumar(tiempo_bloque, - cache.anchobandaunidad, cache.latencia, cache.latenciaunidad);
        return tiempocarga;

    },

    MissPenalty(cache, reloj)
    {
        var tamgru = Math.pow(2, cache.nrobits_offset);
        if (cache.anchobanda == 0)
            cache.anchobanda = 1;
        var tiempo_bloque = (tamgru / cache.anchobanda);
        var suma_carga = Sumar(tiempo_bloque, - cache.anchobandaunidad, cache.latencia, cache.latenciaunidad)

        var ret = suma_carga * reloj.Frecuencia;

        var orden = reloj.MagnitudFrecuencia - cache.anchobandaunidad;
        return Escribir(ret, orden);

    },

    ClocksEscritura(cache, reloj) {
        var ret = cache.tarda_escribir * reloj.Frecuencia;
        var orden = parseInt(reloj.MagnitudFrecuencia) + parseInt(cache.tarda_escribirorden);
        return Escribir(ret, orden);

    },
    TiempoBloque(cache, reloj) {
        var tamgru = Math.pow(2, cache.nrobits_offset);
        if (cache.anchobanda == 0)
            cache.anchobanda = 1;
        var ret = tamgru / cache.anchobanda;
        return Escribir(ret, -cache.anchobandaunidad);
    },
    NewVia(tag, direccion, is_dirty)
    {
        if (is_dirty == undefined)
            is_dirty = 0;
        ContadorStamp++;
        var ret = {
            tag: tag,
            direccion: direccion,
            time_stamp: ContadorStamp,
            leida: ContadorStamp,
            is_dirty: 0
        }
        return ret;


    },



    EscribirMemoriaCache(cache)
    {
        cache.bloque_salida = undefined;
        cache.lecturas++;
        cache.quitobloque = undefined;
        CacheHelper.ActualizarBits(cache);
        cache.hit_en_via = -1;
        if (cache.bloques[cache.nro_index]) {
            for (var i = 0; i < cache.bloques[cache.nro_index].length; i++) {
                if (cache.bloques[cache.nro_index][i].tag == cache.nro_tag) {
                    cache.hit_en_via = i;
                }
            }
        }

        if (cache.hit_en_via == -1)
        {
            cache.misses++;
            // SI HAY UN MISS Y ES WRITE ALLOCATE  LO CARGA
            if (cache.missescritura)
            {

                if (cache.bloques[cache.nro_index] == undefined) {
                    cache.bloques[cache.nro_index] = []
                }

                // Si entra no hay problema
                if (cache.bloques[cache.nro_index].length < cache.vias) {
                    if (cache.bloques[cache.nro_index] == undefined)
                        cache.bloques[cache.nro_index] = [];
                    cache.bloques[cache.nro_index][cache.bloques[cache.nro_index].length] = CacheHelper.NewVia(cache.nro_tag, cache.direccion, 1)
                }
                else {
                    var agregar_en = 0;
                    if (cache.politicareemplazo == 'FIFO') {
                        for (var i = 1; i < cache.bloques[cache.nro_index].length; i++) {
                            if (cache.bloques[cache.nro_index][agregar_en].time_stamp > cache.bloques[cache.nro_index][i].time_stamp)
                                agregar_en = i;
                        }
                    }

                    if (cache.politicareemplazo == 'LRU') {
                        for (var i = 1; i < cache.bloques[cache.nro_index].length; i++) {
                            if (cache.bloques[cache.nro_index][agregar_en].leida > cache.bloques[cache.nro_index][i].leida)
                                agregar_en = i;
                        }
                    }

                    if (cache.politicareemplazo == 'RANDOM') {
                        agregar_en = parseInt(Math.random() * cache.bloques[cache.nro_index].length);
                    }
                    cache.quitobloque = cache.bloques[cache.nro_index][agregar_en];
                    cache.bloques[cache.nro_index][agregar_en] = CacheHelper.NewVia(cache.nro_tag, cache.direccion, 1);
                }
            }

        }
        else
        {
            cache.bloques[cache.nro_index][cache.hit_en_via].leida = ContadorStamp++;
            cache.bloques[cache.nro_index][cache.hit_en_via].is_dirty = 1;
        }




        cache.missrate = (cache.misses * 100) / cache.lecturas;

    },

    LeerMemoriaCache(cache)
    {
        cache.bloque_salida = undefined;
        cache.lecturas++;
        cache.quitobloque = undefined;
        CacheHelper.ActualizarBits(cache);
        cache.hit_en_via = -1;
        if (cache.bloques[cache.nro_index])
        {
            for (var i = 0; i < cache.bloques[cache.nro_index].length; i++)
            {
                if (cache.bloques[cache.nro_index][i].tag == cache.nro_tag)
                {
                        cache.hit_en_via = i;
                }
            }
        }

        if (cache.hit_en_via == -1)
        {
            cache.misses++;
            // SI HAY UN MISS, LO CARGA
            if (cache.bloques[cache.nro_index] == undefined)
            {
                cache.bloques[cache.nro_index] = []
            }

            // Si entra no hay problema
            if (cache.bloques[cache.nro_index].length < cache.vias)
            {
                if (cache.bloques[cache.nro_index] == undefined)
                    cache.bloques[cache.nro_index] = [];
                cache.bloques[cache.nro_index][cache.bloques[cache.nro_index].length] = CacheHelper.NewVia(cache.nro_tag, cache.direccion)
            }
            else
            {
                var agregar_en = 0;
                if (cache.politicareemplazo == 'FIFO')
                {
                    for (var i = 1; i < cache.bloques[cache.nro_index].length; i++)
                    {
                        if (cache.bloques[cache.nro_index][agregar_en].time_stamp > cache.bloques[cache.nro_index][i].time_stamp )
                            agregar_en = i;
                    }
                }
                
                if (cache.politicareemplazo == 'LRU')
                {
                    for (var i = 1; i < cache.bloques[cache.nro_index].length; i++)
                    {
                        if (cache.bloques[cache.nro_index][agregar_en].leida > cache.bloques[cache.nro_index][i].leida )
                            agregar_en = i;
                    }
                }
                
                if (cache.politicareemplazo == 'RANDOM')
                {
                    agregar_en = parseInt(Math.random() * cache.bloques[cache.nro_index].length);
                }
                cache.quitobloque = cache.bloques[cache.nro_index][agregar_en];
                cache.bloques[cache.nro_index][agregar_en] = CacheHelper.NewVia(cache.nro_tag, cache.direccion);
                
                //si no quita alguna
            }
        }
        else
        {
            cache.bloques[cache.nro_index][cache.hit_en_via].leida = ContadorStamp++;
        }




        cache.missrate = (cache.misses * 100) / cache.lecturas;  
        
    },

    TotalMemoriaCache(cache)
    {
        var bitoffset = cache.nrobits_offset;
        var vias = parseInt(cache.vias);
        while ( vias > 1 ) {
            vias = vias >> 1;
            bitoffset++;
        }
        var bits = parseInt(bitoffset) + parseInt(cache.nrobits_index);
        return BitsHelper.BitsATamanio(bits);
    }

    


}