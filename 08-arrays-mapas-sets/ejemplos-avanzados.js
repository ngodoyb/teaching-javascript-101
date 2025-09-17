// Ejemplos prácticos avanzados del módulo 8: Arrays, Maps y Sets

console.log("=== EJEMPLOS PRÁCTICOS AVANZADOS ===");

// EJEMPLO 1: Sistema de inventario con Maps
class SistemaInventario {
    constructor() {
        this.productos = new Map();
        this.categorias = new Set();
        this.transacciones = [];
    }
    
    agregarProducto(id, info) {
        this.productos.set(id, {
            ...info,
            fechaAgregado: new Date()
        });
        this.categorias.add(info.categoria);
        
        this.transacciones.push({
            tipo: 'agregado',
            producto: id,
            fecha: new Date()
        });
    }
    
    buscarPorCategoria(categoria) {
        return Array.from(this.productos.entries())
            .filter(([id, producto]) => producto.categoria === categoria)
            .map(([id, producto]) => ({id, ...producto}));
    }
    
    obtenerEstadisticas() {
        const estadisticas = new Map();
        
        // Agrupar por categoría
        for (const [id, producto] of this.productos) {
            const categoria = producto.categoria;
            if (!estadisticas.has(categoria)) {
                estadisticas.set(categoria, {
                    cantidad: 0,
                    valorTotal: 0,
                    productos: []
                });
            }
            
            const stats = estadisticas.get(categoria);
            stats.cantidad += producto.cantidad;
            stats.valorTotal += producto.precio * producto.cantidad;
            stats.productos.push(id);
        }
        
        return estadisticas;
    }
    
    productosConBajoStock(minimo = 10) {
        return Array.from(this.productos.entries())
            .filter(([id, producto]) => producto.cantidad < minimo)
            .map(([id, producto]) => ({id, ...producto}));
    }
}

// Ejemplo de uso del sistema de inventario
const inventario = new SistemaInventario();

inventario.agregarProducto('LAP001', {
    nombre: 'Laptop Dell XPS',
    precio: 1200,
    cantidad: 5,
    categoria: 'electronica'
});

inventario.agregarProducto('TEL001', {
    nombre: 'iPhone 14',
    precio: 999,
    cantidad: 3,
    categoria: 'electronica'
});

inventario.agregarProducto('LIB001', {
    nombre: 'JavaScript: The Good Parts',
    precio: 35,
    cantidad: 15,
    categoria: 'libros'
});

console.log("Productos de electrónica:");
console.log(inventario.buscarPorCategoria('electronica'));

console.log("Estadísticas por categoría:");
console.log(inventario.obtenerEstadisticas());

console.log("Productos con bajo stock:");
console.log(inventario.productosConBajoStock());

// EJEMPLO 2: Cache inteligente con Map y Set
class CacheInteligente {
    constructor(maxSize = 100, ttl = 300000) { // TTL: 5 minutos
        this.cache = new Map();
        this.accesos = new Map(); // Contador de accesos
        this.tiempos = new Map(); // Tiempo de creación
        this.maxSize = maxSize;
        this.ttl = ttl;
    }
    
    set(key, value) {
        // Limpiar caché si está lleno
        if (this.cache.size >= this.maxSize) {
            this.limpiarCache();
        }
        
        this.cache.set(key, value);
        this.accesos.set(key, 0);
        this.tiempos.set(key, Date.now());
    }
    
    get(key) {
        // Verificar si ha expirado
        const tiempo = this.tiempos.get(key);
        if (tiempo && Date.now() - tiempo > this.ttl) {
            this.delete(key);
            return null;
        }
        
        if (this.cache.has(key)) {
            // Incrementar contador de accesos
            this.accesos.set(key, this.accesos.get(key) + 1);
            return this.cache.get(key);
        }
        
        return null;
    }
    
    delete(key) {
        this.cache.delete(key);
        this.accesos.delete(key);
        this.tiempos.delete(key);
    }
    
    limpiarCache() {
        // Eliminar los elementos menos accedidos y más antiguos
        const entradas = Array.from(this.cache.keys());
        
        // Ordenar por accesos (ascendente) y luego por tiempo (ascendente)
        entradas.sort((a, b) => {
            const accesosA = this.accesos.get(a);
            const accesosB = this.accesos.get(b);
            
            if (accesosA !== accesosB) {
                return accesosA - accesosB;
            }
            
            return this.tiempos.get(a) - this.tiempos.get(b);
        });
        
        // Eliminar el 25% menos usado
        const aEliminar = Math.floor(this.cache.size * 0.25);
        for (let i = 0; i < aEliminar; i++) {
            this.delete(entradas[i]);
        }
    }
    
    estadisticas() {
        return {
            tamaño: this.cache.size,
            masAccedidos: Array.from(this.accesos.entries())
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5),
            antiguedad: Array.from(this.tiempos.entries())
                .map(([key, tiempo]) => [key, Date.now() - tiempo])
                .sort(([,a], [,b]) => b - a)
        };
    }
}

// Ejemplo de uso del cache
const cache = new CacheInteligente(5, 2000); // Máximo 5 items, TTL 2 segundos

cache.set('user:1', {nombre: 'Ana', email: 'ana@email.com'});
cache.set('user:2', {nombre: 'Carlos', email: 'carlos@email.com'});

console.log("Usuario 1:", cache.get('user:1'));
console.log("Usuario 1 de nuevo:", cache.get('user:1')); // Incrementa accesos

console.log("Estadísticas del cache:");
console.log(cache.estadisticas());

// Esperar TTL y probar expiración
setTimeout(() => {
    console.log("Después de TTL, usuario 1:", cache.get('user:1')); // null
}, 2100);

// EJEMPLO 3: Análisis de texto con estructuras de datos
class AnalizadorTexto {
    constructor(texto) {
        this.texto = texto.toLowerCase();
        this.palabras = this.extraerPalabras();
        this.frecuencias = this.calcularFrecuencias();
        this.palabrasUnicas = new Set(this.palabras);
    }
    
    extraerPalabras() {
        return this.texto
            .replace(/[^\w\s]/g, '') // Eliminar puntuación
            .split(/\s+/)
            .filter(palabra => palabra.length > 0);
    }
    
    calcularFrecuencias() {
        const frecuencias = new Map();
        
        for (const palabra of this.palabras) {
            frecuencias.set(palabra, (frecuencias.get(palabra) || 0) + 1);
        }
        
        return frecuencias;
    }
    
    palabrasMasFrecuentes(limite = 10) {
        return Array.from(this.frecuencias.entries())
            .sort(([,a], [,b]) => b - a)
            .slice(0, limite);
    }
    
    palabrasRaras(minimo = 2) {
        return Array.from(this.frecuencias.entries())
            .filter(([palabra, freq]) => freq < minimo)
            .map(([palabra]) => palabra);
    }
    
    similitud(otroAnalisis) {
        // Coeficiente de Jaccard
        const interseccion = new Set(
            [...this.palabrasUnicas].filter(p => otroAnalisis.palabrasUnicas.has(p))
        );
        
        const union = new Set([
            ...this.palabrasUnicas,
            ...otroAnalisis.palabrasUnicas
        ]);
        
        return interseccion.size / union.size;
    }
    
    estadisticas() {
        return {
            totalPalabras: this.palabras.length,
            palabrasUnicas: this.palabrasUnicas.size,
            promedioPorPalabra: this.palabras.length / this.palabrasUnicas.size,
            longitudPromedio: this.palabras.reduce((acc, p) => acc + p.length, 0) / this.palabras.length
        };
    }
}

// Ejemplo de uso del analizador
const texto1 = `
    JavaScript es un lenguaje de programación muy versátil.
    JavaScript se usa tanto en frontend como en backend.
    Con JavaScript puedes crear aplicaciones web increíbles.
`;

const texto2 = `
    Python es un lenguaje de programación muy popular.
    Python se usa en ciencia de datos y desarrollo web.
    Con Python puedes crear aplicaciones robustas.
`;

const analisis1 = new AnalizadorTexto(texto1);
const analisis2 = new AnalizadorTexto(texto2);

console.log("=== ANÁLISIS DE TEXTO ===");
console.log("Estadísticas texto 1:", analisis1.estadisticas());
console.log("Palabras más frecuentes texto 1:", analisis1.palabrasMasFrecuentes(5));

console.log("Estadísticas texto 2:", analisis2.estadisticas());
console.log("Similitud entre textos:", analisis1.similitud(analisis2));

// EJEMPLO 4: Algoritmo de recomendaciones con Sets
class SistemaRecomendaciones {
    constructor() {
        this.usuarios = new Map();
        this.items = new Map();
        this.interacciones = new Map();
    }
    
    agregarUsuario(userId, preferencias = []) {
        this.usuarios.set(userId, {
            id: userId,
            preferencias: new Set(preferencias),
            historial: new Set()
        });
    }
    
    agregarItem(itemId, categorias = [], tags = []) {
        this.items.set(itemId, {
            id: itemId,
            categorias: new Set(categorias),
            tags: new Set(tags),
            puntuacion: 0,
            votos: 0
        });
    }
    
    registrarInteraccion(userId, itemId, tipo = 'view', puntuacion = null) {
        if (!this.interacciones.has(userId)) {
            this.interacciones.set(userId, new Map());
        }
        
        this.interacciones.get(userId).set(itemId, {
            tipo,
            puntuacion,
            fecha: new Date()
        });
        
        // Agregar al historial del usuario
        const usuario = this.usuarios.get(userId);
        if (usuario) {
            usuario.historial.add(itemId);
        }
        
        // Actualizar puntuación del item
        if (puntuacion) {
            const item = this.items.get(itemId);
            if (item) {
                item.puntuacion = (item.puntuacion * item.votos + puntuacion) / (item.votos + 1);
                item.votos++;
            }
        }
    }
    
    recomendarPorSimilitud(userId, limite = 5) {
        const usuario = this.usuarios.get(userId);
        if (!usuario) return [];
        
        // Encontrar usuarios similares basado en historial
        const usuariosSimilares = [];
        
        for (const [otroUserId, otroUsuario] of this.usuarios) {
            if (otroUserId === userId) continue;
            
            // Calcular similitud basada en intersección de historial
            const interseccion = new Set(
                [...usuario.historial].filter(item => otroUsuario.historial.has(item))
            );
            
            const union = new Set([
                ...usuario.historial,
                ...otroUsuario.historial
            ]);
            
            const similitud = interseccion.size / union.size;
            
            if (similitud > 0) {
                usuariosSimilares.push({ id: otroUserId, similitud });
            }
        }
        
        usuariosSimilares.sort((a, b) => b.similitud - a.similitud);
        
        // Obtener recomendaciones de usuarios similares
        const recomendaciones = new Map();
        
        for (const usuarioSimilar of usuariosSimilares.slice(0, 3)) {
            const otroUsuario = this.usuarios.get(usuarioSimilar.id);
            
            for (const itemId of otroUsuario.historial) {
                if (!usuario.historial.has(itemId)) {
                    const puntuacion = recomendaciones.get(itemId) || 0;
                    recomendaciones.set(itemId, puntuacion + usuarioSimilar.similitud);
                }
            }
        }
        
        return Array.from(recomendaciones.entries())
            .sort(([,a], [,b]) => b - a)
            .slice(0, limite)
            .map(([itemId, puntuacion]) => ({
                item: this.items.get(itemId),
                puntuacion: puntuacion.toFixed(3)
            }));
    }
    
    recomendarPorContenido(userId, limite = 5) {
        const usuario = this.usuarios.get(userId);
        if (!usuario) return [];
        
        // Obtener categorías preferidas basadas en historial
        const categoriasPreferidas = new Set();
        const tagsPreferidos = new Set();
        
        for (const itemId of usuario.historial) {
            const item = this.items.get(itemId);
            if (item) {
                for (const categoria of item.categorias) {
                    categoriasPreferidas.add(categoria);
                }
                for (const tag of item.tags) {
                    tagsPreferidos.add(tag);
                }
            }
        }
        
        // Calcular puntuación de compatibilidad para cada item no visto
        const recomendaciones = [];
        
        for (const [itemId, item] of this.items) {
            if (!usuario.historial.has(itemId)) {
                let puntuacion = 0;
                
                // Puntuación por categorías
                const interseccionCategorias = new Set(
                    [...item.categorias].filter(c => categoriasPreferidas.has(c))
                );
                puntuacion += interseccionCategorias.size * 2;
                
                // Puntuación por tags
                const interseccionTags = new Set(
                    [...item.tags].filter(t => tagsPreferidos.has(t))
                );
                puntuacion += interseccionTags.size;
                
                // Bonus por puntuación alta
                puntuacion += item.puntuacion;
                
                if (puntuacion > 0) {
                    recomendaciones.push({
                        item,
                        puntuacion: puntuacion.toFixed(2)
                    });
                }
            }
        }
        
        return recomendaciones
            .sort((a, b) => b.puntuacion - a.puntuacion)
            .slice(0, limite);
    }
}

// Ejemplo de uso del sistema de recomendaciones
const recomendaciones = new SistemaRecomendaciones();

// Agregar usuarios
recomendaciones.agregarUsuario('user1', ['tecnologia', 'programacion']);
recomendaciones.agregarUsuario('user2', ['tecnologia', 'ciencia']);
recomendaciones.agregarUsuario('user3', ['arte', 'diseño']);

// Agregar items
recomendaciones.agregarItem('item1', ['tecnologia'], ['javascript', 'web']);
recomendaciones.agregarItem('item2', ['tecnologia'], ['python', 'data']);
recomendaciones.agregarItem('item3', ['ciencia'], ['fisica', 'matematicas']);
recomendaciones.agregarItem('item4', ['arte'], ['diseño', 'creatividad']);

// Registrar interacciones
recomendaciones.registrarInteraccion('user1', 'item1', 'like', 5);
recomendaciones.registrarInteraccion('user1', 'item2', 'view');
recomendaciones.registrarInteraccion('user2', 'item1', 'like', 4);
recomendaciones.registrarInteraccion('user2', 'item3', 'like', 5);

console.log("=== SISTEMA DE RECOMENDACIONES ===");
console.log("Recomendaciones por similitud para user1:");
console.log(recomendaciones.recomendarPorSimilitud('user1'));

console.log("Recomendaciones por contenido para user1:");
console.log(recomendaciones.recomendarPorContenido('user1'));