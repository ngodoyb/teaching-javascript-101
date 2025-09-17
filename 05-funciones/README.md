# 05. Funciones

## Conceptos Clave
- Declaración vs expresión de función
- Funciones flecha (arrow functions)
- Parámetros y argumentos
- Funciones de orden superior
- Callback functions

## Ejercicios

### Ejercicio 5.1: Formas de declarar funciones
Aprende las diferentes maneras de crear funciones.

```javascript
// 1. DECLARACIÓN DE FUNCIÓN (función named)
function saludar(nombre) {
    return `¡Hola, ${nombre}!`;
}

console.log("Declaración:", saludar("Ana"));

// 2. EXPRESIÓN DE FUNCIÓN (función anónima)
const despedir = function(nombre) {
    return `¡Adiós, ${nombre}!`;
};

console.log("Expresión:", despedir("Juan"));

// 3. FUNCIÓN FLECHA (arrow function)
const multiplicar = (a, b) => {
    return a * b;
};

// Forma corta para una sola expresión
const dividir = (a, b) => a / b;

console.log("Arrow función:", multiplicar(5, 3));
console.log("Arrow corta:", dividir(10, 2));

// 4. FUNCIÓN AUTOEJECUTADA (IIFE - Immediately Invoked Function Expression)
(function() {
    console.log("Esta función se ejecuta inmediatamente");
})();

// IIFE con parámetros
(function(mensaje) {
    console.log("IIFE con parámetro:", mensaje);
})("¡Funciona!");

// 5. FUNCIÓN CONSTRUCTORA (veremos más en objetos)
function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.presentarse = function() {
        return `Soy ${this.nombre} y tengo ${this.edad} años`;
    };
}

let persona1 = new Persona("María", 30);
console.log("Constructor:", persona1.presentarse());
```

**Explicación**: JavaScript ofrece múltiples formas de crear funciones, cada una con características específicas sobre hoisting, sintaxis y uso.

**Conceptos vinculados**:
- Hoisting de funciones
- Contexto de ejecución
- Patrones de módulo

### Ejercicio 5.2: Parámetros y argumentos
Explora las diferentes formas de trabajar con parámetros.

```javascript
// Parámetros básicos
function sumar(a, b) {
    console.log("Parámetros recibidos:", a, b);
    return a + b;
}

console.log("Suma normal:", sumar(5, 3));
console.log("Con menos parámetros:", sumar(5)); // b será undefined
console.log("Con más parámetros:", sumar(5, 3, 2, 1)); // extras se ignoran

// Parámetros por defecto (ES6+)
function saludarConDefecto(nombre = "Amigo", saludo = "Hola") {
    return `${saludo}, ${nombre}!`;
}

console.log("Sin parámetros:", saludarConDefecto());
console.log("Un parámetro:", saludarConDefecto("Ana"));
console.log("Dos parámetros:", saludarConDefecto("Carlos", "Buenos días"));

// Parámetros rest (recoge múltiples argumentos)
function sumarTodos(...numeros) {
    console.log("Números recibidos:", numeros);
    return numeros.reduce((suma, num) => suma + num, 0);
}

console.log("Suma múltiples:", sumarTodos(1, 2, 3, 4, 5));
console.log("Suma dos:", sumarTodos(10, 20));

// Desestructuración de parámetros
function crearPersona({nombre, edad, ciudad = "No especificada"}) {
    return `${nombre}, ${edad} años, vive en ${ciudad}`;
}

console.log("Desestructuración:", crearPersona({
    nombre: "Luis", 
    edad: 25, 
    ciudad: "Madrid"
}));

// Objeto arguments (forma tradicional, evitar en código moderno)
function funcionTradicional() {
    console.log("Arguments tradicional:", arguments);
    console.log("Primer argumento:", arguments[0]);
    console.log("Cantidad de argumentos:", arguments.length);
}

funcionTradicional("a", "b", "c");

// Las arrow functions NO tienen arguments
const arrowSinArguments = () => {
    // console.log(arguments); // Error: arguments is not defined
    console.log("Arrow functions no tienen 'arguments'");
};

arrowSinArguments();
```

**Explicación**: JavaScript es flexible con parámetros - puedes pasar más o menos de los esperados. ES6+ añadió características modernas como parámetros por defecto y rest parameters.

**Conceptos vinculados**:
- Flexibilidad de JavaScript
- Desestructuración
- Diferencias entre function y arrow functions

### Ejercicio 5.3: Funciones como valores
Comprende que las funciones son objetos de primera clase.

```javascript
// Las funciones son valores que se pueden:

// 1. Asignar a variables
const miFuncion = function() {
    return "Soy una función en una variable";
};

// 2. Pasar como parámetros
function ejecutar(fn, mensaje) {
    console.log("Antes de ejecutar:", mensaje);
    const resultado = fn();
    console.log("Resultado:", resultado);
}

ejecutar(miFuncion, "Ejecutando función asignada");

// 3. Retornar desde otras funciones
function crearOperacion(operador) {
    switch(operador) {
        case '+':
            return (a, b) => a + b;
        case '-':
            return (a, b) => a - b;
        case '*':
            return (a, b) => a * b;
        case '/':
            return (a, b) => a / b;
        default:
            return () => "Operador no válido";
    }
}

const suma = crearOperacion('+');
const resta = crearOperacion('-');

console.log("Suma creada:", suma(10, 5));
console.log("Resta creada:", resta(10, 5));

// 4. Almacenar en arrays
const operaciones = [
    (x) => x * 2,
    (x) => x + 10,
    (x) => x / 2,
    (x) => Math.pow(x, 2)
];

let numero = 5;
console.log(`Empezando con: ${numero}`);

operaciones.forEach((operacion, index) => {
    numero = operacion(numero);
    console.log(`Después de operación ${index + 1}: ${numero}`);
});

// 5. Almacenar en objetos
const calculadora = {
    pi: Math.PI,
    sumar: function(a, b) { return a + b; },
    restar: (a, b) => a - b,
    areaCirculo: function(radio) {
        return this.pi * radio * radio;
    }
};

console.log("Calculadora suma:", calculadora.sumar(8, 2));
console.log("Calculadora área:", calculadora.areaCirculo(3));
```

**Explicación**: Las funciones en JavaScript son "ciudadanos de primera clase" - pueden usarse como cualquier otro valor.

**Conceptos vinculados**:
- Programación funcional
- Higher-order functions
- Flexibilidad de JavaScript

### Ejercicio 5.4: Callbacks y funciones de orden superior
Aprende a usar funciones que reciben otras funciones.

```javascript
// Callback básico
function procesarDatos(datos, callback) {
    console.log("Procesando datos:", datos);
    const resultado = datos.map(x => x * 2);
    callback(resultado);
}

function mostrarResultado(resultado) {
    console.log("Resultado del callback:", resultado);
}

procesarDatos([1, 2, 3, 4, 5], mostrarResultado);

// Callback con arrow function
procesarDatos([6, 7, 8], (resultado) => {
    console.log("Arrow callback:", resultado.join(", "));
});

// Simulando operaciones asíncronas con callbacks
function operacionAsincrona(datos, onSuccess, onError) {
    console.log("Iniciando operación asíncrona...");
    
    setTimeout(() => {
        if (datos && datos.length > 0) {
            const resultado = datos.reduce((sum, num) => sum + num, 0);
            onSuccess(resultado);
        } else {
            onError("No hay datos para procesar");
        }
    }, 1000);
}

operacionAsincrona([1, 2, 3], 
    (resultado) => console.log("Éxito:", resultado),
    (error) => console.log("Error:", error)
);

// Funciones de orden superior comunes
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map: transforma cada elemento
const dobles = numeros.map(n => n * 2);
console.log("Dobles:", dobles);

// filter: filtra elementos
const pares = numeros.filter(n => n % 2 === 0);
console.log("Pares:", pares);

// reduce: reduce a un solo valor
const suma = numeros.reduce((acc, n) => acc + n, 0);
console.log("Suma total:", suma);

// forEach: ejecuta algo para cada elemento
numeros.forEach((numero, index) => {
    if (numero > 5) {
        console.log(`Posición ${index}: ${numero} es mayor que 5`);
    }
});

// find: encuentra el primer elemento que cumple condición
const primerMayorQue5 = numeros.find(n => n > 5);
console.log("Primer número > 5:", primerMayorQue5);

// Creando nuestras propias funciones de orden superior
function repetir(fn, veces) {
    for (let i = 0; i < veces; i++) {
        fn(i + 1);
    }
}

repetir((numero) => console.log(`Ejecución número ${numero}`), 3);
```

**Explicación**: Los callbacks permiten que las funciones sean más flexibles y reutilizables. Son la base de la programación asíncrona y funcional.

**Conceptos vinculados**:
- Programación asíncrona
- Programación funcional
- Métodos de array

## Ejercicios Prácticos

1. **Crea funciones de diferentes formas**: Experimenta con declaraciones, expresiones y arrow functions
2. **Practica con parámetros**: Crea funciones con parámetros opcionales, por defecto y rest parameters
3. **Implementa callbacks**: Crea funciones que reciban otras funciones como parámetros

## Siguientes Pasos
Con las funciones dominadas, es momento de entender [el objeto this](../06-objeto-this/) y su comportamiento especial.