# 09. Programación Asíncrona

## Conceptos Clave
- Event loop y concurrencia
- Callbacks y callback hell
- Promises y cadenas
- Async/await sintaxis moderna
- Manejo de errores asíncronos

## Ejercicios

### Ejercicio 9.1: Callbacks y el Event Loop
Comprende cómo JavaScript maneja operaciones asíncronas.

```javascript
console.log("=== Event Loop y Callbacks ===");

// COMPORTAMIENTO SÍNCRONO VS ASÍNCRONO
console.log("1. Inicio del script");

// Código síncrono - bloquea la ejecución
function operacionSincrona() {
    console.log("2. Operación síncrona ejecutándose...");
    // Simular trabajo pesado
    const inicio = Date.now();
    while (Date.now() - inicio < 1000) {
        // Esperar 1 segundo bloqueando
    }
    console.log("3. Operación síncrona completada");
}

// Código asíncrono - no bloquea
function operacionAsincrona(mensaje, tiempo) {
    setTimeout(() => {
        console.log(`Asíncrono: ${mensaje}`);
    }, tiempo);
}

console.log("Antes de operaciones...");
operacionAsincrona("Esta se ejecuta en 500ms", 500);
operacionAsincrona("Esta se ejecuta en 100ms", 100);
operacionSincrona(); // Bloquea todo hasta completarse
operacionAsincrona("Esta se ejecuta en 200ms", 200);
console.log("4. Final del script principal");

// CALLBACKS BÁSICOS
console.log("\n=== Callbacks básicos ===");

function procesarDatos(datos, callback) {
    console.log("Procesando datos...");
    
    setTimeout(() => {
        const resultado = datos.map(x => x * 2);
        callback(null, resultado); // Patrón: (error, resultado)
    }, 1000);
}

function manejarResultado(error, resultado) {
    if (error) {
        console.error("Error:", error);
        return;
    }
    console.log("Datos procesados:", resultado);
}

procesarDatos([1, 2, 3, 4, 5], manejarResultado);

// CALLBACK HELL - Problema de callbacks anidados
console.log("\n=== Callback Hell ===");

function operacionA(callback) {
    setTimeout(() => {
        console.log("Operación A completada");
        callback(null, "resultado A");
    }, 1000);
}

function operacionB(datosA, callback) {
    setTimeout(() => {
        console.log("Operación B completada con:", datosA);
        callback(null, datosA + " -> resultado B");
    }, 800);
}

function operacionC(datosB, callback) {
    setTimeout(() => {
        console.log("Operación C completada con:", datosB);
        callback(null, datosB + " -> resultado C");
    }, 600);
}

// Callback Hell: anidamiento excesivo
operacionA((errorA, resultadoA) => {
    if (errorA) return console.error(errorA);
    
    operacionB(resultadoA, (errorB, resultadoB) => {
        if (errorB) return console.error(errorB);
        
        operacionC(resultadoB, (errorC, resultadoC) => {
            if (errorC) return console.error(errorC);
            
            console.log("Resultado final:", resultadoC);
        });
    });
});
```

**Explicación**: JavaScript es single-threaded pero usa callbacks para manejar operaciones asíncronas. El callback hell ocurre cuando se anidan demasiados callbacks.

**Conceptos vinculados**:
- Event loop
- Single-threaded concurrency
- Non-blocking I/O

### Ejercicio 9.2: Promises - Mejor manejo asíncrono
Aprende a usar Promises para código más limpio.

```javascript
console.log("=== Promises ===");

// CREACIÓN DE PROMISES
function crearPromesaBasica() {
    return new Promise((resolve, reject) => {
        const exito = Math.random() > 0.5;
        
        setTimeout(() => {
            if (exito) {
                resolve("¡Operación exitosa!");
            } else {
                reject(new Error("Algo salió mal"));
            }
        }, 1000);
    });
}

// CONSUMO DE PROMISES CON .then() y .catch()
console.log("Iniciando promesa básica...");

crearPromesaBasica()
    .then(resultado => {
        console.log("Éxito:", resultado);
        return "Datos procesados"; // Se puede retornar valor
    })
    .then(datosProcesados => {
        console.log("Segunda fase:", datosProcesados);
    })
    .catch(error => {
        console.error("Error capturado:", error.message);
    })
    .finally(() => {
        console.log("Promesa finalizada (siempre se ejecuta)");
    });

// PROMESAS UTILITARIAS
console.log("\n=== Promesas utilitarias ===");

// Promise resuelto inmediatamente
const promesaResuelta = Promise.resolve("Valor inmediato");
promesaResuelta.then(valor => console.log("Resuelto:", valor));

// Promise rechazado inmediatamente
const promesaRechazada = Promise.reject(new Error("Error inmediato"));
promesaRechazada.catch(error => console.log("Rechazado:", error.message));

// REESCRIBIR CALLBACK HELL CON PROMISES
console.log("\n=== Solución a Callback Hell ===");

function operacionAPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Operación A con Promise completada");
            resolve("resultado A");
        }, 1000);
    });
}

function operacionBPromise(datosA) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Operación B con Promise completada con:", datosA);
            resolve(datosA + " -> resultado B");
        }, 800);
    });
}

function operacionCPromise(datosB) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Operación C con Promise completada con:", datosB);
            resolve(datosB + " -> resultado C");
        }, 600);
    });
}

// Cadena de Promises - mucho más limpio
operacionAPromise()
    .then(resultadoA => operacionBPromise(resultadoA))
    .then(resultadoB => operacionCPromise(resultadoB))
    .then(resultadoFinal => {
        console.log("Resultado final con Promises:", resultadoFinal);
    })
    .catch(error => {
        console.error("Error en la cadena:", error);
    });

// PROMISE.ALL - Ejecutar múltiples promesas en paralelo
console.log("\n=== Promise.all ===");

const promesa1 = new Promise(resolve => setTimeout(() => resolve("Primera"), 1000));
const promesa2 = new Promise(resolve => setTimeout(() => resolve("Segunda"), 1500));
const promesa3 = new Promise(resolve => setTimeout(() => resolve("Tercera"), 500));

Promise.all([promesa1, promesa2, promesa3])
    .then(resultados => {
        console.log("Todas las promesas completadas:", resultados);
    })
    .catch(error => {
        console.error("Alguna promesa falló:", error);
    });

// PROMISE.RACE - La primera que se complete
Promise.race([promesa1, promesa2, promesa3])
    .then(resultado => {
        console.log("Primera en completarse:", resultado);
    });

// PROMISE.ALLSETTLED - Todas las promesas, sin importar el resultado
const promesaConError = Promise.reject(new Error("Error intencional"));
const promesasVariadas = [promesa1, promesaConError, promesa3];

Promise.allSettled(promesasVariadas)
    .then(resultados => {
        console.log("Resultados de allSettled:");
        resultados.forEach((resultado, index) => {
            if (resultado.status === 'fulfilled') {
                console.log(`  ${index}: Éxito - ${resultado.value}`);
            } else {
                console.log(`  ${index}: Error - ${resultado.reason.message}`);
            }
        });
    });
```

**Explicación**: Las Promises proporcionan una forma más limpia de manejar código asíncrono, evitando el callback hell y ofreciendo mejor control de errores.

**Conceptos vinculados**:
- Estados de Promise (pending, fulfilled, rejected)
- Chaining de Promises
- Paralelismo vs secuencial

### Ejercicio 9.3: Async/Await - Sintaxis moderna
Aprende la sintaxis más limpia para código asíncrono.

```javascript
console.log("=== Async/Await ===");

// FUNCIONES ASYNC BÁSICAS
async function funcionAsincrona() {
    console.log("Función async iniciada");
    
    // await pausa la ejecución hasta que la promesa se resuelve
    try {
        const resultado = await crearPromesaBasica();
        console.log("Resultado con await:", resultado);
        return "Función async completada";
    } catch (error) {
        console.error("Error en función async:", error.message);
        throw error; // Re-lanzar si es necesario
    }
}

// Las funciones async siempre retornan una Promise
funcionAsincrona()
    .then(mensaje => console.log(mensaje))
    .catch(error => console.log("Error capturado fuera:", error.message));

// REESCRIBIR CADENA DE PROMISES CON ASYNC/AWAIT
async function ejecutarOperacionesSecuenciales() {
    try {
        console.log("Iniciando operaciones secuenciales...");
        
        const resultadoA = await operacionAPromise();
        const resultadoB = await operacionBPromise(resultadoA);
        const resultadoC = await operacionCPromise(resultadoB);
        
        console.log("Resultado final con async/await:", resultadoC);
        return resultadoC;
    } catch (error) {
        console.error("Error en operaciones secuenciales:", error);
        throw error;
    }
}

ejecutarOperacionesSecuenciales();

// OPERACIONES EN PARALELO CON ASYNC/AWAIT
async function ejecutarOperacionesParalelas() {
    try {
        console.log("Iniciando operaciones paralelas...");
        
        // Esto NO es paralelo - se ejecuta secuencialmente
        const inicioSecuencial = Date.now();
        const resultado1 = await new Promise(resolve => setTimeout(() => resolve("A"), 1000));
        const resultado2 = await new Promise(resolve => setTimeout(() => resolve("B"), 1000));
        const resultado3 = await new Promise(resolve => setTimeout(() => resolve("C"), 1000));
        const tiempoSecuencial = Date.now() - inicioSecuencial;
        
        console.log("Secuencial:", [resultado1, resultado2, resultado3], `${tiempoSecuencial}ms`);
        
        // Esto SÍ es paralelo - se ejecuta simultáneamente
        const inicioParalelo = Date.now();
        const [resultadoA, resultadoB, resultadoC] = await Promise.all([
            new Promise(resolve => setTimeout(() => resolve("A"), 1000)),
            new Promise(resolve => setTimeout(() => resolve("B"), 1000)),
            new Promise(resolve => setTimeout(() => resolve("C"), 1000))
        ]);
        const tiempoParalelo = Date.now() - inicioParalelo;
        
        console.log("Paralelo:", [resultadoA, resultadoB, resultadoC], `${tiempoParalelo}ms`);
        
    } catch (error) {
        console.error("Error en operaciones paralelas:", error);
    }
}

ejecutarOperacionesParalelas();

// MANEJO DE ERRORES AVANZADO
async function manejoErroresAvanzado() {
    const operaciones = [
        () => Promise.resolve("Éxito 1"),
        () => Promise.reject(new Error("Error 1")),
        () => Promise.resolve("Éxito 2"),
        () => Promise.reject(new Error("Error 2"))
    ];
    
    // Ejecutar todas y manejar errores individualmente
    const resultados = await Promise.allSettled(
        operaciones.map(operacion => operacion())
    );
    
    const exitosos = resultados
        .filter(resultado => resultado.status === 'fulfilled')
        .map(resultado => resultado.value);
    
    const errores = resultados
        .filter(resultado => resultado.status === 'rejected')
        .map(resultado => resultado.reason.message);
    
    console.log("Operaciones exitosas:", exitosos);
    console.log("Errores encontrados:", errores);
}

manejoErroresAvanzado();

// ASYNC/AWAIT CON FOR LOOPS
async function procesarEnLotes(items) {
    console.log("Procesando items en lotes...");
    
    // Procesamiento secuencial
    for (const item of items) {
        const resultado = await new Promise(resolve => 
            setTimeout(() => resolve(`Procesado: ${item}`), 500)
        );
        console.log(resultado);
    }
    
    // Procesamiento en paralelo (cuidado con la carga)
    console.log("Procesamiento en paralelo:");
    const promesas = items.map(item => 
        new Promise(resolve => 
            setTimeout(() => resolve(`Paralelo: ${item}`), 500)
        )
    );
    
    const resultados = await Promise.all(promesas);
    resultados.forEach(resultado => console.log(resultado));
}

procesarEnLotes(['Item1', 'Item2', 'Item3']);

// EJEMPLO PRÁCTICO: SIMULACIÓN DE API
async function simularLlamadaAPI(url, tiempo = 1000) {
    console.log(`Llamando a API: ${url}`);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) { // 80% éxito
                resolve({
                    status: 200,
                    data: `Datos de ${url}`,
                    timestamp: new Date().toISOString()
                });
            } else {
                reject(new Error(`Error 500 en ${url}`));
            }
        }, tiempo);
    });
}

async function obtenerDatosCompletos() {
    try {
        console.log("=== Simulación de llamadas API ===");
        
        // Obtener datos del usuario primero
        const usuario = await simularLlamadaAPI('/api/user/123');
        console.log("Usuario obtenido:", usuario.data);
        
        // Luego obtener datos relacionados en paralelo
        const [perfil, configuracion, actividad] = await Promise.all([
            simularLlamadaAPI('/api/profile/123'),
            simularLlamadaAPI('/api/settings/123'),
            simularLlamadaAPI('/api/activity/123')
        ]);
        
        console.log("Datos completos obtenidos:");
        console.log("- Perfil:", perfil.data);
        console.log("- Configuración:", configuracion.data);
        console.log("- Actividad:", actividad.data);
        
        return {
            usuario: usuario.data,
            perfil: perfil.data,
            configuracion: configuracion.data,
            actividad: actividad.data
        };
        
    } catch (error) {
        console.error("Error obteniendo datos completos:", error.message);
        
        // Implementar fallback o retry
        console.log("Implementando fallback...");
        return {
            error: true,
            message: "Algunos datos no están disponibles",
            timestamp: new Date().toISOString()
        };
    }
}

obtenerDatosCompletos();
```

**Explicación**: Async/await proporciona sintaxis más limpia y legible para código asíncrono, siendo especialmente útil para operaciones secuenciales complejas.

**Conceptos vinculados**:
- Syntactic sugar sobre Promises
- Error handling con try/catch
- Paralelismo vs secuencial

## Ejercicios Prácticos

1. **Convierte callbacks**: Toma código con callbacks y conviértelo a Promises y async/await
2. **Simula APIs**: Crea funciones que simulen llamadas a servicios externos
3. **Manejo de errores**: Implementa estrategias de retry y fallback

## Siguientes Pasos
Con asincronía dominada, aprende sobre [módulos](../10-modulos/) para organizar tu código en proyectos grandes.