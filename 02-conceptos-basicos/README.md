# 02. Conceptos Básicos de JavaScript

## Conceptos Clave
- Tipado dinámico y débil
- Sintaxis básica
- Ejecución e interpretación
- Comentarios y buenas prácticas

## Ejercicios

### Ejercicio 2.1: Tipado dinámico
Explora cómo JavaScript maneja los tipos de datos automáticamente.

```javascript
// JavaScript es de tipado dinámico
let variable = "Soy un string";
console.log(typeof variable); // "string"

variable = 42;
console.log(typeof variable); // "number"

variable = true;
console.log(typeof variable); // "boolean"

variable = null;
console.log(typeof variable); // "object" (peculiaridad de JavaScript)

variable = undefined;
console.log(typeof variable); // "undefined"

// Ejemplo práctico: una función que acepta diferentes tipos
function mostrarTipo(valor) {
    console.log(`El valor "${valor}" es de tipo: ${typeof valor}`);
}

mostrarTipo("JavaScript");
mostrarTipo(2023);
mostrarTipo(false);
```

**Explicación**: JavaScript asigna tipos automáticamente según el valor. Una variable puede cambiar de tipo durante la ejecución.

**Conceptos vinculados**:
- Tipado dinámico vs estático
- Operador `typeof`
- Flexibilidad y posibles errores

### Ejercicio 2.2: Sintaxis y estructura
Aprende la sintaxis básica de JavaScript.

```javascript
// Comentarios de línea
/* Comentarios 
   multilínea */

// Declaraciones de variables (estudiaremos más en el siguiente módulo)
let nombre = "Ana";
const edad = 25;
var ciudad = "Madrid"; // forma tradicional, menos recomendada

// Punto y coma (opcional pero recomendado)
console.log("Con punto y coma");
console.log("Sin punto y coma") // funciona, pero no es recomendado

// Sensibilidad a mayúsculas y minúsculas
let miVariable = "correcto";
let MiVariable = "es diferente";
let mivariable = "también es diferente";

console.log(miVariable); // "correcto"
console.log(MiVariable); // "es diferente"

// Convenciones de nomenclatura
let camelCase = "recomendado para variables"; 
let snake_case = "menos común en JavaScript";
let CONSTANTE = "para valores constantes";
const PI = 3.14159;

// Caracteres especiales en strings
let textoConComillas = "Usa 'comillas simples' dentro";
let textoConEscape = "Usa \"comillas dobles\" escapadas";
let textoConTemplate = `Usa \`backticks\` para templates`;
```

**Explicación**: JavaScript tiene reglas específicas de sintaxis que debemos seguir para escribir código válido y mantenible.

**Conceptos vinculados**:
- Convenciones de nomenclatura
- Sensibilidad a mayúsculas/minúsculas
- Buenas prácticas de escritura

### Ejercicio 2.3: Ejecución e interpretación
Comprende cómo se ejecuta el código JavaScript.

```javascript
// El código se ejecuta línea por línea (normalmente)
console.log("Primera línea");
console.log("Segunda línea");
console.log("Tercera línea");

// Pero hay excepciones: hoisting (veremos más adelante)
console.log("Intentamos usar una variable antes de declararla:");
console.log(variableHoisted); // undefined (no error)
var variableHoisted = "Ahora tiene valor";

// Errores de sintaxis detienen la ejecución
console.log("Antes del error");
// console.log("Error de sintaxis: comilla sin cerrar);
console.log("Después del error - esta línea no se ejecuta si hay error");

// Ejemplo de ejecución asíncrona
console.log("Inicio");
setTimeout(function() {
    console.log("Esto se ejecuta después de 1 segundo");
}, 1000);
console.log("Final inmediato");

// Orden de ejecución esperado:
// 1. "Inicio"
// 2. "Final inmediato" 
// 3. "Esto se ejecuta después de 1 segundo" (después de 1 segundo)
```

**Explicación**: JavaScript ejecuta código línea por línea, pero tiene comportamientos especiales como hoisting y ejecución asíncrona.

**Conceptos vinculados**:
- Ejecución secuencial
- Hoisting (elevación)
- Programación asíncrona básica

### Ejercicio 2.4: Errores comunes y depuración
Aprende a identificar y solucionar errores básicos.

```javascript
// Error de sintaxis
// let nombre = "Juan;  // Falta comilla de cierre

// Error de referencia  
// console.log(variableNoExiste); // ReferenceError

// Error de tipo
// let numero = "texto";
// numero.toFixed(2); // TypeError: numero.toFixed is not a function

// Depuración básica
function suma(a, b) {
    console.log("Parámetros recibidos:", a, b);
    console.log("Tipos:", typeof a, typeof b);
    
    let resultado = a + b;
    console.log("Resultado:", resultado);
    
    return resultado;
}

// Pruebas
suma(5, 3);        // 8 (correcto)
suma("5", 3);      // "53" (concatenación, posible error)
suma("5", "3");    // "53" (concatenación)
suma(5, "3");      // "53" (concatenación)

// Mejorando la función con validación
function sumaSegura(a, b) {
    // Validación de tipos
    if (typeof a !== 'number' || typeof b !== 'number') {
        console.warn("Advertencia: se esperaban números");
        return NaN;
    }
    
    return a + b;
}

console.log("Pruebas de suma segura:");
console.log(sumaSegura(5, 3));     // 8
console.log(sumaSegura("5", 3));   // NaN con advertencia
```

**Explicación**: Los errores son comunes en JavaScript. Aprender a depurar y validar datos es fundamental.

**Conceptos vinculados**:
- Tipos de errores
- Técnicas de depuración
- Validación de datos

## Ejercicios Prácticos

1. **Experimenta con tipos**: Crea variables de diferentes tipos y usa `typeof` para verificarlos
2. **Provoca errores**: Comenta y descomenta líneas con errores para ver qué sucede
3. **Depura código**: Agrega `console.log` en diferentes puntos para seguir el flujo

## Siguientes Pasos
Con estos conceptos básicos claros, estás listo para explorar [variables y tipos de datos](../03-variables-tipos/) en profundidad.