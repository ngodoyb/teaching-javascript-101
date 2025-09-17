# 06. El Objeto `this`

## Conceptos Clave
- ¿Qué es `this` y cómo se determina?
- `this` en diferentes contextos
- Métodos call, apply y bind
- Arrow functions y `this`

## Ejercicios

### Ejercicio 6.1: `this` en diferentes contextos
Comprende cómo cambia el valor de `this` según el contexto.

```javascript
// 1. THIS EN CONTEXTO GLOBAL
console.log("=== This en contexto global ===");
console.log("this en global:", this); // En navegador: window, en Node: global object

function funcionGlobal() {
    console.log("this en función global:", this);
    // En modo estricto sería undefined, en modo normal es el objeto global
}

funcionGlobal();

// 2. THIS EN MÉTODOS DE OBJETO
console.log("=== This en métodos de objeto ===");

const persona = {
    nombre: "Ana",
    edad: 25,
    
    presentarse: function() {
        console.log(`Soy ${this.nombre} y tengo ${this.edad} años`);
        console.log("this en método:", this);
    },
    
    obtenerInfo: function() {
        return {
            nombre: this.nombre,
            edad: this.edad,
            esAdulto: this.edad >= 18
        };
    }
};

persona.presentarse(); // this apunta a 'persona'
console.log("Info:", persona.obtenerInfo());

// 3. PÉRDIDA DE CONTEXTO
console.log("=== Pérdida de contexto ===");

const metodoSuelto = persona.presentarse;
// metodoSuelto(); // this será undefined o window, causará error

// Solución temporal con bind
const metodoConContexto = persona.presentarse.bind(persona);
metodoConContexto(); // this apunta correctamente a 'persona'

// 4. THIS EN CALLBACKS
console.log("=== This en callbacks ===");

const boton = {
    texto: "Clic aquí",
    clicks: 0,
    
    manejarClick: function() {
        this.clicks++;
        console.log(`${this.texto} fue clickeado ${this.clicks} veces`);
    }
};

// Simular callback (problema común)
function simularClick(callback) {
    callback(); // this se pierde
}

console.log("Callback sin contexto:");
// simularClick(boton.manejarClick); // Error: this.clicks is undefined

console.log("Callback con bind:");
simularClick(boton.manejarClick.bind(boton)); // Funciona correctamente
```

**Explicación**: El valor de `this` depende de CÓMO se llama la función, no dónde se define. Es uno de los conceptos más confusos pero importantes de JavaScript.

**Conceptos vinculados**:
- Contexto de ejecución
- Binding de funciones
- Patrones de callback

### Ejercicio 6.2: Arrow functions y `this`
Aprende cómo las arrow functions manejan `this` diferente.

```javascript
console.log("=== Arrow functions y this ===");

const objetoConArrow = {
    nombre: "Pedro",
    edad: 30,
    
    // Método tradicional
    metodoTradicional: function() {
        console.log("Método tradicional - this.nombre:", this.nombre);
        
        // Función interna tradicional - pierde contexto
        function funcionInterna() {
            console.log("Función interna tradicional - this.nombre:", this.nombre); // undefined
        }
        
        // Arrow function interna - mantiene contexto
        const arrowInterna = () => {
            console.log("Arrow interna - this.nombre:", this.nombre); // "Pedro"
        };
        
        funcionInterna();
        arrowInterna();
    },
    
    // Arrow function como método - NO recomendado
    arrowComoMetodo: () => {
        console.log("Arrow como método - this.nombre:", this.nombre); // undefined
        // Las arrow functions no tienen su propio 'this'
    },
    
    // Caso práctico: setTimeout
    contarConTradicional: function() {
        console.log("Iniciando contador tradicional...");
        
        // Problema: this se pierde en setTimeout
        setTimeout(function() {
            console.log("Callback tradicional - this.nombre:", this.nombre); // undefined
        }, 100);
        
        // Solución 1: Guardar this en variable
        const self = this;
        setTimeout(function() {
            console.log("Con variable self - nombre:", self.nombre);
        }, 200);
        
        // Solución 2: Arrow function (más elegante)
        setTimeout(() => {
            console.log("Arrow en setTimeout - this.nombre:", this.nombre);
        }, 300);
    }
};

objetoConArrow.metodoTradicional();
objetoConArrow.arrowComoMetodo();
objetoConArrow.contarConTradicional();

// Ejemplo práctico: Event handlers
console.log("=== Event handlers y this ===");

class Contador {
    constructor() {
        this.valor = 0;
        this.elemento = null; // Simularía un elemento del DOM
    }
    
    incrementarTradicional() {
        this.valor++;
        console.log(`Contador tradicional: ${this.valor}`);
    }
    
    incrementarArrow = () => {
        this.valor++;
        console.log(`Contador arrow: ${this.valor}`);
    }
    
    simularEventos() {
        console.log("Simulando eventos...");
        
        // Con función tradicional - perdería contexto en evento real
        const handlerTradicional = this.incrementarTradicional.bind(this);
        setTimeout(handlerTradicional, 400);
        
        // Con arrow function - mantiene contexto automáticamente
        setTimeout(this.incrementarArrow, 500);
    }
}

const contador = new Contador();
contador.simularEventos();
```

**Explicación**: Las arrow functions no tienen su propio `this` - heredan el del contexto donde se definen. Esto las hace ideales para callbacks pero problemáticas como métodos de objeto.

**Conceptos vinculados**:
- Lexical binding
- Event handling
- Clases y métodos

### Ejercicio 6.3: call, apply y bind
Aprende a controlar explícitamente el valor de `this`.

```javascript
console.log("=== call, apply y bind ===");

// Función que usa this
function presentar(saludo, puntuacion) {
    return `${saludo}, soy ${this.nombre} y tengo ${this.edad} años${puntuacion}`;
}

const persona1 = { nombre: "Ana", edad: 28 };
const persona2 = { nombre: "Carlos", edad: 35 };

// CALL: llama la función con this específico y parámetros individuales
console.log("Con call:");
console.log(presentar.call(persona1, "Hola", "!"));
console.log(presentar.call(persona2, "Buenos días", "."));

// APPLY: como call pero los parámetros van en un array
console.log("Con apply:");
console.log(presentar.apply(persona1, ["Hola", "!!!"]));
console.log(presentar.apply(persona2, ["Saludos", "..."]));

// BIND: crea una nueva función con this fijo
console.log("Con bind:");
const presentarAna = presentar.bind(persona1);
const presentarCarlos = presentar.bind(persona2);

console.log(presentarAna("¡Hola", "!"));
console.log(presentarCarlos("Buenos días", "."));

// Bind parcial (curry)
const presentarAnaHola = presentar.bind(persona1, "¡Hola");
console.log(presentarAnaHola("!!!"));

// Ejemplo práctico: Math.max con apply
const numeros = [5, 2, 8, 1, 9, 3];
console.log("Máximo con apply:", Math.max.apply(null, numeros));
// Equivalente moderno: Math.max(...numeros)

// Ejemplo práctico: borrowing methods
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// "Tomar prestado" el método push
Array.prototype.push.apply(array1, array2);
console.log("Array1 después de 'tomar prestado' push:", array1);

// Crear utilidades reutilizables
const log = console.log.bind(console);
const warn = console.warn.bind(console);
const error = console.error.bind(console);

log("Mensaje con bind");
warn("Advertencia con bind");
error("Error con bind");
```

**Explicación**: `call`, `apply` y `bind` permiten controlar explícitamente el valor de `this`. Son herramientas poderosas para programación funcional y reutilización de código.

**Conceptos vinculados**:
- Control explícito de contexto
- Programación funcional
- Method borrowing

### Ejercicio 6.4: Patrones comunes y buenas prácticas
Aprende patrones útiles para trabajar con `this`.

```javascript
console.log("=== Patrones y buenas prácticas ===");

// Patrón 1: Constructor function
function Vehiculo(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
    this.velocidad = 0;
    
    // Método que usa this correctamente
    this.acelerar = function(incremento) {
        this.velocidad += incremento;
        console.log(`${this.marca} ${this.modelo} ahora va a ${this.velocidad} km/h`);
    };
    
    // Arrow function en constructor - mantiene this
    this.frenar = () => {
        this.velocidad = Math.max(0, this.velocidad - 10);
        console.log(`${this.marca} ${this.modelo} frenó, velocidad: ${this.velocidad} km/h`);
    };
}

const miAuto = new Vehiculo("Toyota", "Corolla");
miAuto.acelerar(50);
miAuto.frenar();

// Patrón 2: Módulo con this controlado
const gestorTareas = {
    tareas: [],
    
    agregar: function(tarea) {
        this.tareas.push({
            id: Date.now(),
            texto: tarea,
            completada: false
        });
        console.log(`Tarea agregada: ${tarea}`);
        return this; // Permite method chaining
    },
    
    completar: function(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = true;
            console.log(`Tarea completada: ${tarea.texto}`);
        }
        return this; // Method chaining
    },
    
    listar: function() {
        console.log("Tareas:");
        this.tareas.forEach(tarea => {
            const estado = tarea.completada ? "✓" : "○";
            console.log(`  ${estado} ${tarea.texto}`);
        });
        return this; // Method chaining
    }
};

// Method chaining gracias al return this
gestorTareas
    .agregar("Estudiar JavaScript")
    .agregar("Hacer ejercicio")
    .completar(gestorTareas.tareas[0].id)
    .listar();

// Patrón 3: Factory function (alternativa a constructor)
function crearPersona(nombre, edad) {
    return {
        nombre,
        edad,
        
        cumpleanios() {
            this.edad++;
            console.log(`¡Feliz cumpleaños! Ahora ${this.nombre} tiene ${this.edad} años`);
            return this;
        },
        
        presentarse() {
            console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
            return this;
        }
    };
}

const persona = crearPersona("Luis", 25);
persona.presentarse().cumpleanios();

// Patrón 4: Mixin (compartir comportamiento)
const comportamientoVolador = {
    volar() {
        console.log(`${this.nombre} está volando!`);
    },
    aterrizar() {
        console.log(`${this.nombre} ha aterrizado.`);
    }
};

const pajaro = { nombre: "Águila" };
const avion = { nombre: "Boeing 747" };

// Agregar comportamiento a objetos existentes
Object.assign(pajaro, comportamientoVolador);
Object.assign(avion, comportamientoVolador);

pajaro.volar();
avion.volar();
```

**Explicación**: Estos patrones muestran formas efectivas de usar `this` para crear código reutilizable y mantenible.

**Conceptos vinculados**:
- Constructor functions
- Factory functions  
- Method chaining
- Mixins

## Ejercicios Prácticos

1. **Experimenta con contextos**: Crea objetos y prueba `this` en diferentes situaciones
2. **Practica bind/call/apply**: Crea funciones que necesiten contexto específico
3. **Compara arrow vs tradicional**: Crea ejemplos donde cada una sea más apropiada

## Siguientes Pasos
Con `this` dominado, puedes profundizar en [objetos y programación orientada a objetos](../07-objetos-poo/).