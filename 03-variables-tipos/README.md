# 03. Variables y Tipos de Datos

## Conceptos Clave
- Declaración de variables (var, let, const)
- Tipos primitivos y objetos
- Conversión de tipos
- Inmutabilidad y mutabilidad

## Ejercicios

### Ejercicio 3.1: Formas de declarar variables
Aprende las diferencias entre `var`, `let` y `const`.

```javascript
// VAR (forma tradicional, evitar en código moderno)
var nombre = "Ana";
var nombre = "Beatriz"; // Se puede redeclarar (problemático)
nombre = "Carmen";       // Se puede reasignar

console.log("Con var:", nombre);

// LET (recomendado para variables que cambian)
let edad = 25;
// let edad = 30;        // Error: no se puede redeclarar
edad = 30;               // Se puede reasignar

console.log("Con let:", edad);

// CONST (recomendado para valores que no cambian)
const PI = 3.14159;
// PI = 3.14;            // Error: no se puede reasignar
// const radio;          // Error: debe inicializarse

console.log("Con const:", PI);

// CONST con objetos (importante entender)
const persona = { nombre: "Juan", edad: 30 };
persona.edad = 31;       // ✓ Permitido: modificar propiedades
persona.ciudad = "Madrid"; // ✓ Permitido: agregar propiedades
// persona = {};         // ✗ Error: no se puede reasignar el objeto

console.log("Objeto const modificado:", persona);
```

**Explicación**: `let` y `const` son más seguros que `var`. `const` protege la reasignación pero permite modificar contenido de objetos.

**Conceptos vinculados**:
- Scoping (ámbito)
- Inmutabilidad superficial
- Buenas prácticas modernas

### Ejercicio 3.2: Tipos de datos primitivos
Explora los tipos primitivos de JavaScript.

```javascript
// STRING (cadenas de texto)
let texto1 = "Comillas dobles";
let texto2 = 'Comillas simples';
let texto3 = `Template literals con ${texto1}`;

console.log("Strings:", texto1, texto2, texto3);

// NUMBER (números enteros y decimales)
let entero = 42;
let decimal = 3.14159;
let negativo = -17;
let infinito = Infinity;
let noEsNumero = NaN; // Not a Number

console.log("Numbers:", entero, decimal, negativo, infinito, noEsNumero);

// BOOLEAN (verdadero o falso)  
let verdadero = true;
let falso = false;

console.log("Booleans:", verdadero, falso);

// UNDEFINED (valor no asignado)
let sinValor;
let explicitamenteUndefined = undefined;

console.log("Undefined:", sinValor, explicitamenteUndefined);

// NULL (ausencia intencional de valor)
let valorNulo = null;

console.log("Null:", valorNulo);

// SYMBOL (identificador único, avanzado)
let simbolo1 = Symbol("descripcion");
let simbolo2 = Symbol("descripcion"); // Diferentes aunque tengan misma descripción

console.log("Symbols iguales?", simbolo1 === simbolo2); // false

// BIGINT (números muy grandes)
let numeroGigante = BigInt(9007199254740991);
let numeroGigante2 = 123n; // Notación con 'n'

console.log("BigInt:", numeroGigante, numeroGigante2);
```

**Explicación**: JavaScript tiene 7 tipos primitivos. Cada uno tiene características y usos específicos.

**Conceptos vinculados**:
- Tipos primitivos vs referencias
- Inmutabilidad de primitivos
- Coerción de tipos

### Ejercicio 3.3: Tipos de datos complejos
Trabajando con objetos y arrays.

```javascript
// OBJECT (tipo complejo básico)
let persona = {
    nombre: "Ana",
    edad: 28,
    esEstudiante: false,
    hobbies: ["leer", "nadar", "programar"],
    direccion: {
        calle: "Gran Vía 123",
        ciudad: "Madrid"
    }
};

console.log("Objeto persona:", persona);
console.log("Nombre:", persona.nombre);
console.log("Primer hobby:", persona.hobbies[0]);
console.log("Ciudad:", persona.direccion.ciudad);

// ARRAY (tipo de objeto especializado)
let numeros = [1, 2, 3, 4, 5];
let mixto = ["texto", 42, true, null, {nombre: "objeto"}];

console.log("Array números:", numeros);
console.log("Array mixto:", mixto);
console.log("Tercer elemento:", mixto[2]);

// FUNCTION (también es un objeto)
function saludar(nombre) {
    return `¡Hola, ${nombre}!`;
}

let saludarVariable = function(nombre) {
    return `¡Hi, ${nombre}!`;
};

console.log("Función:", saludar("Ana"));
console.log("Función en variable:", saludarVariable("Juan"));
console.log("Tipo de función:", typeof saludar); // "function"

// DATE (objeto para fechas)
let ahora = new Date();
let fechaEspecifica = new Date(2023, 11, 25); // Año, mes (0-11), día

console.log("Fecha actual:", ahora);
console.log("Fecha específica:", fechaEspecifica);
```

**Explicación**: Los objetos permiten agrupar datos relacionados. Los arrays son objetos especializados para listas ordenadas.

**Conceptos vinculados**:
- Estructuras de datos
- Objetos anidados
- Referencias vs valores

### Ejercicio 3.4: Conversión de tipos
Aprende cómo JavaScript convierte tipos automática y manualmente.

```javascript
// Conversión automática (coerción)
console.log("=== Conversión automática ===");

// Con el operador +
console.log("5" + 3);        // "53" (string)
console.log(5 + "3");        // "53" (string)  
console.log("5" + "3");      // "53" (string)
console.log(5 + 3);          // 8 (number)

// Con otros operadores
console.log("5" - 3);        // 2 (number)
console.log("5" * "3");      // 15 (number)
console.log("5" / "2");      // 2.5 (number)

// Comparaciones
console.log(5 == "5");       // true (conversión)
console.log(5 === "5");      // false (sin conversión)

// Conversión manual (casting)
console.log("\n=== Conversión manual ===");

// A string
let numero = 42;
console.log(String(numero));        // "42"
console.log(numero.toString());     // "42"
console.log(numero + "");           // "42"

// A number
let texto = "123";
console.log(Number(texto));         // 123
console.log(parseInt(texto));       // 123 (solo parte entera)
console.log(parseFloat("123.45"));  // 123.45
console.log(+texto);                // 123 (operador unario)

// A boolean
console.log(Boolean(""));           // false
console.log(Boolean("texto"));      // true
console.log(Boolean(0));            // false
console.log(Boolean(42));           // true
console.log(!!"valor");             // true (doble negación)

// Casos especiales
console.log("\n=== Casos especiales ===");
console.log(Number("123abc"));      // NaN
console.log(parseInt("123abc"));    // 123 (para hasta donde pueda)
console.log(Number(true));          // 1
console.log(Number(false));         // 0
console.log(Number(null));          // 0
console.log(Number(undefined));     // NaN
```

**Explicación**: JavaScript convierte tipos automáticamente en ciertas situaciones. Es importante entender cuándo y cómo sucede.

**Conceptos vinculados**:
- Coerción de tipos
- Comparaciones estrictas vs flexibles
- Validación de datos

## Ejercicios Prácticos

1. **Experimenta con declaraciones**: Prueba redeclarar variables con `var`, `let` y `const`
2. **Explora conversiones**: Mezcla diferentes tipos en operaciones y observa los resultados
3. **Crea estructuras**: Construye objetos anidados complejos y accede a sus propiedades

## Siguientes Pasos
Con un buen entendimiento de variables y tipos, es momento de explorar [ámbito y contexto](../04-ambito-contexto/).