// Ejemplos prácticos del módulo 2: Conceptos Básicos

console.log("=== MÓDULO 2: CONCEPTOS BÁSICOS ===");

// Ejercicio 2.1: Tipado dinámico
console.log("\n--- Tipado dinámico ---");

let variable = "Soy un string";
console.log(`Valor: ${variable}, Tipo: ${typeof variable}`);

variable = 42;
console.log(`Valor: ${variable}, Tipo: ${typeof variable}`);

variable = true;
console.log(`Valor: ${variable}, Tipo: ${typeof variable}`);

variable = null;
console.log(`Valor: ${variable}, Tipo: ${typeof variable}`); // "object" - peculiaridad

variable = undefined;
console.log(`Valor: ${variable}, Tipo: ${typeof variable}`);

// Ejercicio 2.2: Sintaxis y estructura
console.log("\n--- Sintaxis básica ---");

let camelCase = "recomendado para variables";
const PI = 3.14159;
console.log(`Variable camelCase: ${camelCase}`);
console.log(`Constante PI: ${PI}`);

// Ejercicio 2.3: Depuración práctica
console.log("\n--- Depuración ---");

function sumaConLog(a, b) {
    console.log(`Sumando ${a} + ${b}`);
    console.log(`Tipos: ${typeof a}, ${typeof b}`);
    
    const resultado = a + b;
    console.log(`Resultado: ${resultado}`);
    
    return resultado;
}

// Pruebas que muestran comportamientos diferentes
sumaConLog(5, 3);        // Suma numérica
sumaConLog("5", 3);      // Concatenación
sumaConLog(5, "3");      // Concatenación