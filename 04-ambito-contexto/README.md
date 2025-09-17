# 04. Ámbito y Contexto

## Conceptos Clave
- Ámbito global, de función y de bloque
- Cadena de ámbitos (scope chain)
- Hoisting (elevación)
- Diferencias entre var, let y const en ámbito

## Ejercicios

### Ejercicio 4.1: Ámbito global vs local
Comprende dónde están disponibles las variables.

```javascript
// Ámbito global
let globalVar = "Soy global";
const GLOBAL_CONST = "También global";

function mostrarAmbito() {
    // Ámbito de función
    let localVar = "Soy local de la función";
    
    console.log("Desde la función:");
    console.log("- Variable global:", globalVar);     // ✓ Accesible
    console.log("- Variable local:", localVar);       // ✓ Accesible
    
    // Función anidada
    function funcionAnidada() {
        let anidadaVar = "Soy de la función anidada";
        
        console.log("Desde función anidada:");
        console.log("- Global:", globalVar);           // ✓ Accesible
        console.log("- Local padre:", localVar);       // ✓ Accesible
        console.log("- Local anidada:", anidadaVar);   // ✓ Accesible
    }
    
    funcionAnidada();
    
    // console.log(anidadaVar); // ✗ Error: no accesible aquí
}

mostrarAmbito();
console.log("Desde global:", globalVar);  // ✓ Accesible
// console.log(localVar);                  // ✗ Error: no accesible
```

**Explicación**: Las variables tienen diferente alcance según donde se declaren. Las variables internas pueden acceder a las externas, pero no al revés.

**Conceptos vinculados**:
- Encapsulación
- Cadena de ámbitos
- Resolución de variables

### Ejercicio 4.2: Diferencias entre var, let y const
Explora cómo cada palabra clave maneja el ámbito.

```javascript
console.log("=== Diferencias de ámbito ===");

function compararAmbitos() {
    // VAR: ámbito de función
    if (true) {
        var varVariable = "var dentro de if";
        let letVariable = "let dentro de if";
        const constVariable = "const dentro de if";
    }
    
    console.log("Después del if:");
    console.log("var:", varVariable);        // ✓ Accesible (ámbito de función)
    // console.log("let:", letVariable);     // ✗ Error (ámbito de bloque)
    // console.log("const:", constVariable); // ✗ Error (ámbito de bloque)
}

compararAmbitos();

// Ejemplo práctico: problema clásico con var en loops
console.log("\n=== Problema clásico con var ===");

console.log("Con var (problema):");
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log("var i:", i); // Imprime 3, 3, 3
    }, 100);
}

console.log("Con let (solución):");
for (let j = 0; j < 3; j++) {
    setTimeout(function() {
        console.log("let j:", j); // Imprime 0, 1, 2
    }, 200);
}

// Otro ejemplo: redeclaración
function ejemploRedeclaracion() {
    var mensaje = "Primera declaración";
    console.log("1:", mensaje);
    
    var mensaje = "Segunda declaración"; // ✓ Permitido con var
    console.log("2:", mensaje);
    
    let otroMensaje = "Primera con let";
    console.log("3:", otroMensaje);
    
    // let otroMensaje = "Segunda con let"; // ✗ Error: no se puede redeclarar
    otroMensaje = "Reasignación con let";   // ✓ Permitido
    console.log("4:", otroMensaje);
}

ejemploRedeclaracion();
```

**Explicación**: `var` tiene ámbito de función, mientras que `let` y `const` tienen ámbito de bloque, lo que previene errores comunes.

**Conceptos vinculados**:
- Ámbito de bloque vs función
- Closures implícitos
- Mejores prácticas modernas

### Ejercicio 4.3: Hoisting (elevación)
Entiende cómo JavaScript "eleva" declaraciones.

```javascript
console.log("=== Hoisting ===");

// Ejemplo 1: Hoisting de var
console.log("Antes de declarar:", miVariable); // undefined (no error)
var miVariable = "Ahora tiene valor";
console.log("Después de asignar:", miVariable);

// Lo anterior es equivalente a:
/*
var miVariable; // undefined
console.log("Antes de declarar:", miVariable);
miVariable = "Ahora tiene valor";
console.log("Después de asignar:", miVariable);
*/

// Ejemplo 2: Hoisting de funciones
console.log("Llamando función antes de declararla:");
miFuncion(); // ✓ Funciona por hoisting

function miFuncion() {
    console.log("¡Función ejecutada por hoisting!");
}

// Ejemplo 3: let y const NO tienen hoisting utilizable
try {
    console.log(variabaleLet); // ReferenceError
    let variableLet = "valor";
} catch(error) {
    console.log("Error con let:", error.message);
}

// Ejemplo 4: Función vs variable de función
console.log("Diferencias en hoisting:");

// Declaración de función: completamente hoisted
console.log(typeof funcionDeclarada); // "function"
function funcionDeclarada() {
    return "Soy una declaración";
}

// Variable de función: solo la variable es hoisted
console.log(typeof funcionVariable); // "undefined"
var funcionVariable = function() {
    return "Soy una expresión de función";
};
console.log(typeof funcionVariable); // "function"
```

**Explicación**: JavaScript "eleva" las declaraciones al inicio de su ámbito, pero no las inicializaciones. Esto puede causar comportamientos inesperados.

**Conceptos vinculados**:
- Fase de compilación vs ejecución
- Temporal Dead Zone (let/const)
- Diferencia entre declaración y expresión

### Ejercicio 4.4: Closures básicos
Aprende cómo las funciones "recuerdan" su ámbito.

```javascript
console.log("=== Closures básicos ===");

// Ejemplo 1: Closure simple
function crearContador() {
    let contador = 0; // Variable privada
    
    return function() {
        contador++;
        return contador;
    };
}

let miContador = crearContador();
console.log("Contador 1:", miContador()); // 1
console.log("Contador 2:", miContador()); // 2
console.log("Contador 3:", miContador()); // 3

let otroContador = crearContador();
console.log("Otro contador:", otroContador()); // 1 (independiente)

// Ejemplo 2: Closure con parámetros
function crearSaludo(saludo) {
    return function(nombre) {
        return `${saludo}, ${nombre}!`;
    };
}

let saludoFormal = crearSaludo("Buenos días");
let saludoInformal = crearSaludo("¡Hola");

console.log(saludoFormal("Ana"));        // "Buenos días, Ana!"
console.log(saludoInformal("Carlos"));   // "¡Hola, Carlos!"

// Ejemplo 3: Múltiples funciones compartiendo closure
function crearCalculadora() {
    let resultado = 0;
    
    return {
        sumar: function(num) {
            resultado += num;
            return resultado;
        },
        restar: function(num) {
            resultado -= num;
            return resultado;
        },
        obtenerResultado: function() {
            return resultado;
        },
        reiniciar: function() {
            resultado = 0;
            return resultado;
        }
    };
}

let calc = crearCalculadora();
console.log("Sumar 10:", calc.sumar(10));      // 10
console.log("Sumar 5:", calc.sumar(5));        // 15
console.log("Restar 3:", calc.restar(3));      // 12
console.log("Resultado:", calc.obtenerResultado()); // 12
console.log("Reiniciar:", calc.reiniciar());   // 0
```

**Explicación**: Los closures permiten que las funciones "recuerden" variables de ámbitos externos, incluso después de que esos ámbitos hayan terminado.

**Conceptos vinculados**:
- Encapsulación de datos
- Variables privadas
- Patrones de módulo

## Ejercicios Prácticos

1. **Experimenta con ámbitos**: Crea funciones anidadas y observa qué variables son accesibles desde dónde
2. **Compara var vs let**: Crea loops y observa las diferencias de comportamiento
3. **Crea closures**: Construye funciones que retornen otras funciones y experimenta con variables privadas

## Siguientes Pasos
Con el ámbito claro, puedes profundizar en [funciones](../05-funciones/) y sus diferentes formas de declaración.