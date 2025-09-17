# 08. Arrays, Maps y Sets

## Conceptos Clave
- Arrays y métodos de manipulación
- Maps y WeakMaps
- Sets y WeakSets
- Iteradores y estructuras de datos

## Ejercicios

### Ejercicio 8.1: Arrays - Métodos fundamentales
Domina los métodos esenciales para trabajar con arrays.

```javascript
console.log("=== Arrays - Métodos fundamentales ===");

// CREACIÓN DE ARRAYS
const numeros = [1, 2, 3, 4, 5];
const frutas = ["manzana", "banana", "naranja"];
const mixto = [1, "texto", true, null, {nombre: "objeto"}];
const vacio = [];
const conConstructor = new Array(5); // Array de 5 elementos undefined

console.log("Arrays creados:", {numeros, frutas, mixto, vacio, conConstructor});

// MÉTODOS DE TRANSFORMACIÓN
console.log("--- Métodos de transformación ---");

// map: transforma cada elemento
const dobles = numeros.map(n => n * 2);
const frutasMayusculas = frutas.map(fruta => fruta.toUpperCase());
console.log("Dobles:", dobles);
console.log("Frutas mayúsculas:", frutasMayusculas);

// filter: filtra elementos que cumplen condición
const pares = numeros.filter(n => n % 2 === 0);
const frutasLargas = frutas.filter(fruta => fruta.length > 6);
console.log("Números pares:", pares);
console.log("Frutas largas:", frutasLargas);

// reduce: reduce array a un solo valor
const suma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
const frutasJuntas = frutas.reduce((texto, fruta, index) => 
    index === 0 ? fruta : `${texto}, ${fruta}`, "");
console.log("Suma total:", suma);
console.log("Frutas juntas:", frutasJuntas);

// MÉTODOS DE BÚSQUEDA
console.log("--- Métodos de búsqueda ---");

// find: primer elemento que cumple condición
const primerPar = numeros.find(n => n % 2 === 0);
const frutaConA = frutas.find(fruta => fruta.includes('a'));
console.log("Primer par:", primerPar);
console.log("Fruta con 'a':", frutaConA);

// findIndex: índice del primer elemento que cumple condición
const indicePrimerPar = numeros.findIndex(n => n % 2 === 0);
console.log("Índice primer par:", indicePrimerPar);

// includes: verifica si contiene elemento
console.log("¿Contiene 3?:", numeros.includes(3));
console.log("¿Contiene 'banana'?:", frutas.includes("banana"));

// indexOf/lastIndexOf: posición del elemento
const arrayConRepetidos = [1, 2, 3, 2, 4, 2, 5];
console.log("Primera posición del 2:", arrayConRepetidos.indexOf(2));
console.log("Última posición del 2:", arrayConRepetidos.lastIndexOf(2));

// MÉTODOS DE VERIFICACIÓN
console.log("--- Métodos de verificación ---");

// every: todos los elementos cumplen condición
const todosMayoresACero = numeros.every(n => n > 0);
const todosMayoresACinco = numeros.every(n => n > 5);
console.log("¿Todos > 0?:", todosMayoresACero);
console.log("¿Todos > 5?:", todosMayoresACinco);

// some: al menos uno cumple condición
const algunMayorATres = numeros.some(n => n > 3);
const algunMayorADiez = numeros.some(n => n > 10);
console.log("¿Alguno > 3?:", algunMayorATres);
console.log("¿Alguno > 10?:", algunMayorADiez);
```

**Explicación**: Los arrays son la estructura de datos más versátil de JavaScript. Sus métodos permiten transformar, filtrar y procesar datos eficientemente.

**Conceptos vinculados**:
- Programación funcional
- Inmutabilidad (métodos que no modifican el original)
- Cadena de métodos (chaining)

### Ejercicio 8.2: Arrays - Manipulación avanzada
Explora métodos de modificación y técnicas avanzadas.

```javascript
console.log("=== Arrays - Manipulación avanzada ===");

// MÉTODOS QUE MODIFICAN EL ARRAY ORIGINAL
let frutas = ["manzana", "banana", "naranja"];

// push/pop: agregar/quitar al final
console.log("Array inicial:", frutas);
frutas.push("uva", "pera");
console.log("Después de push:", frutas);

const ultimaFruta = frutas.pop();
console.log("Fruta removida:", ultimaFruta);
console.log("Después de pop:", frutas);

// unshift/shift: agregar/quitar al inicio
frutas.unshift("fresa");
console.log("Después de unshift:", frutas);

const primeraFruta = frutas.shift();
console.log("Primera fruta removida:", primeraFruta);
console.log("Después de shift:", frutas);

// splice: insertar/eliminar en posición específica
let numeros = [1, 2, 3, 4, 5];
console.log("Números iniciales:", numeros);

// Eliminar elementos
const eliminados = numeros.splice(2, 2); // Desde índice 2, eliminar 2 elementos
console.log("Eliminados:", eliminados);
console.log("Después de eliminar:", numeros);

// Insertar elementos
numeros.splice(1, 0, 1.5, 1.7); // En índice 1, eliminar 0, insertar 1.5 y 1.7
console.log("Después de insertar:", numeros);

// Reemplazar elementos
numeros.splice(0, 1, 0.5); // En índice 0, eliminar 1, insertar 0.5
console.log("Después de reemplazar:", numeros);

// ORDENAMIENTO
console.log("--- Ordenamiento ---");

const palabras = ["banana", "manzana", "cereza", "arándano"];
const numerosDesordenados = [3, 1, 4, 1, 5, 9, 2, 6];

// sort básico (modifica el array original)
console.log("Palabras ordenadas:", [...palabras].sort());
console.log("Números 'ordenados' como strings:", [...numerosDesordenados].sort());

// sort con función comparadora
const numerosOrdenados = [...numerosDesordenados].sort((a, b) => a - b);
console.log("Números ordenados correctamente:", numerosOrdenados);

// Ordenar objetos
const personas = [
    {nombre: "Ana", edad: 25},
    {nombre: "Carlos", edad: 30},
    {nombre: "Beatriz", edad: 28}
];

const personasPorEdad = [...personas].sort((a, b) => a.edad - b.edad);
const personasPorNombre = [...personas].sort((a, b) => a.nombre.localeCompare(b.nombre));

console.log("Personas por edad:", personasPorEdad);
console.log("Personas por nombre:", personasPorNombre);

// reverse: invertir orden (modifica original)
const invertido = [...numeros].reverse();
console.log("Array invertido:", invertido);

// TÉCNICAS AVANZADAS
console.log("--- Técnicas avanzadas ---");

// Aplanar arrays (flat)
const arrayAnidado = [1, [2, 3], [4, [5, 6]]];
console.log("Aplanado nivel 1:", arrayAnidado.flat());
console.log("Aplanado completamente:", arrayAnidado.flat(Infinity));

// flatMap: map + flat
const frases = ["hola mundo", "javascript es genial"];
const palabrasIndividuales = frases.flatMap(frase => frase.split(" "));
console.log("Palabras individuales:", palabrasIndividuales);

// Array.from: crear arrays desde iterables
const rango = Array.from({length: 5}, (_, i) => i + 1);
const letras = Array.from("JavaScript");
console.log("Rango 1-5:", rango);
console.log("Letras de JavaScript:", letras);

// Eliminar duplicados
const conDuplicados = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const sinDuplicados = [...new Set(conDuplicados)];
console.log("Sin duplicados:", sinDuplicados);
```

**Explicación**: Los arrays ofrecen métodos poderosos para manipulación. Es importante distinguir entre métodos que modifican el array original y los que crean uno nuevo.

**Conceptos vinculados**:
- Métodos mutables vs inmutables
- Spread operator
- Destructuring

### Ejercicio 8.3: Maps - Diccionarios clave-valor
Aprende a usar Maps para asociaciones clave-valor avanzadas.

```javascript
console.log("=== Maps ===");

// CREACIÓN DE MAPS
const miMapa = new Map();
const mapaConDatos = new Map([
    ["clave1", "valor1"],
    ["clave2", "valor2"],
    [42, "número como clave"],
    [true, "boolean como clave"]
]);

console.log("Mapa con datos iniciales:", mapaConDatos);

// OPERACIONES BÁSICAS
console.log("--- Operaciones básicas ---");

// set: agregar/actualizar
miMapa.set("nombre", "Ana");
miMapa.set("edad", 28);
miMapa.set("profesion", "Desarrolladora");

// get: obtener valor
console.log("Nombre:", miMapa.get("nombre"));
console.log("Edad:", miMapa.get("edad"));

// has: verificar existencia
console.log("¿Tiene 'nombre'?:", miMapa.has("nombre"));
console.log("¿Tiene 'altura'?:", miMapa.has("altura"));

// delete: eliminar
miMapa.delete("edad");
console.log("Después de eliminar 'edad':", miMapa);

// size: tamaño
console.log("Tamaño del mapa:", miMapa.size);

// clear: limpiar todo
const mapaTemp = new Map([["a", 1], ["b", 2]]);
console.log("Antes de clear:", mapaTemp);
mapaTemp.clear();
console.log("Después de clear:", mapaTemp);

// VENTAJAS SOBRE OBJETOS
console.log("--- Ventajas sobre objetos ---");

// 1. Cualquier tipo como clave
const mapaFlexible = new Map();
const objetoClave = {id: 1};
const funcionClave = () => "función";

mapaFlexible.set(objetoClave, "valor del objeto");
mapaFlexible.set(funcionClave, "valor de la función");
mapaFlexible.set(42, "valor numérico");
mapaFlexible.set("42", "valor string");

console.log("Objeto como clave:", mapaFlexible.get(objetoClave));
console.log("Función como clave:", mapaFlexible.get(funcionClave));
console.log("42 vs '42':", mapaFlexible.get(42), "!=", mapaFlexible.get("42"));

// 2. Orden de inserción preservado
const mapaOrdenado = new Map();
mapaOrdenado.set("z", 1);
mapaOrdenado.set("a", 2);
mapaOrdenado.set("m", 3);

console.log("Orden de inserción:");
for (const [clave, valor] of mapaOrdenado) {
    console.log(`  ${clave}: ${valor}`);
}

// 3. Tamaño directo
console.log("Tamaño directo:", mapaOrdenado.size);

// ITERACIÓN
console.log("--- Iteración ---");

const frutasMap = new Map([
    ["manzana", 5],
    ["banana", 3],
    ["naranja", 8]
]);

// Iterar con for...of
console.log("Iterando entradas:");
for (const [fruta, cantidad] of frutasMap) {
    console.log(`  ${fruta}: ${cantidad} unidades`);
}

// Métodos de iteración
console.log("Solo claves:", Array.from(frutasMap.keys()));
console.log("Solo valores:", Array.from(frutasMap.values()));
console.log("Entradas:", Array.from(frutasMap.entries()));

// forEach
console.log("Con forEach:");
frutasMap.forEach((cantidad, fruta) => {
    console.log(`  ${fruta} tiene ${cantidad} unidades`);
});

// CASOS DE USO PRÁCTICOS
console.log("--- Casos de uso prácticos ---");

// Cache de funciones costosas
const cache = new Map();

function operacionCostosa(n) {
    if (cache.has(n)) {
        console.log(`Cache hit para ${n}`);
        return cache.get(n);
    }
    
    console.log(`Calculando para ${n}...`);
    const resultado = n * n * n; // Simulamos operación costosa
    cache.set(n, resultado);
    return resultado;
}

console.log("Resultado 1:", operacionCostosa(5));
console.log("Resultado 2:", operacionCostosa(3));
console.log("Resultado 3:", operacionCostosa(5)); // Desde cache

// Contador de frecuencia
function contarFrecuencia(array) {
    const contador = new Map();
    
    for (const elemento of array) {
        contador.set(elemento, (contador.get(elemento) || 0) + 1);
    }
    
    return contador;
}

const palabras = ["casa", "auto", "casa", "bici", "auto", "casa"];
const frecuencias = contarFrecuencia(palabras);
console.log("Frecuencias:", frecuencias);
```

**Explicación**: Los Maps son superiores a los objetos para mapeos clave-valor cuando necesitas claves de cualquier tipo, orden de inserción o tamaño eficiente.

**Conceptos vinculados**:
- Estructuras de datos hash
- Eficiencia de búsqueda
- Iteradores

### Ejercicio 8.4: Sets - Colecciones únicas
Aprende a usar Sets para mantener colecciones sin duplicados.

```javascript
console.log("=== Sets ===");

// CREACIÓN DE SETS
const miSet = new Set();
const setConDatos = new Set([1, 2, 3, 3, 4, 4, 5]); // Duplicados se eliminan automáticamente
const setDesdeString = new Set("javascript"); // Cada carácter único

console.log("Set con datos:", setConDatos);
console.log("Set desde string:", setDesdeString);

// OPERACIONES BÁSICAS
console.log("--- Operaciones básicas ---");

// add: agregar elemento
miSet.add("manzana");
miSet.add("banana");
miSet.add("manzana"); // No se duplica

console.log("Mi set:", miSet);
console.log("Tamaño:", miSet.size);

// has: verificar existencia
console.log("¿Tiene 'manzana'?:", miSet.has("manzana"));
console.log("¿Tiene 'naranja'?:", miSet.has("naranja"));

// delete: eliminar elemento
miSet.delete("banana");
console.log("Después de eliminar 'banana':", miSet);

// clear: limpiar todo
const setTemp = new Set([1, 2, 3]);
setTemp.clear();
console.log("Set después de clear:", setTemp);

// CASOS DE USO PRÁCTICOS
console.log("--- Casos de uso prácticos ---");

// 1. Eliminar duplicados de array
const arrayConDuplicados = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const arraySinDuplicados = [...new Set(arrayConDuplicados)];
console.log("Array sin duplicados:", arraySinDuplicados);

// 2. Intersección de arrays
function interseccion(array1, array2) {
    const set1 = new Set(array1);
    const set2 = new Set(array2);
    return [...set1].filter(x => set2.has(x));
}

const lista1 = [1, 2, 3, 4, 5];
const lista2 = [4, 5, 6, 7, 8];
console.log("Intersección:", interseccion(lista1, lista2));

// 3. Unión de arrays
function union(array1, array2) {
    return [...new Set([...array1, ...array2])];
}

console.log("Unión:", union(lista1, lista2));

// 4. Diferencia de arrays
function diferencia(array1, array2) {
    const set2 = new Set(array2);
    return array1.filter(x => !set2.has(x));
}

console.log("Diferencia (lista1 - lista2):", diferencia(lista1, lista2));

// ITERACIÓN
console.log("--- Iteración ---");

const colores = new Set(["rojo", "verde", "azul"]);

// for...of
console.log("Con for...of:");
for (const color of colores) {
    console.log(`  Color: ${color}`);
}

// forEach
console.log("Con forEach:");
colores.forEach(color => {
    console.log(`  Color forEach: ${color}`);
});

// Conversión a array para usar métodos de array
const coloresArray = Array.from(colores);
const coloresMayusculas = coloresArray.map(color => color.toUpperCase());
console.log("Colores en mayúsculas:", coloresMayusculas);

// SETS CON OBJETOS
console.log("--- Sets con objetos ---");

const personas = new Set();
const persona1 = {nombre: "Ana", edad: 25};
const persona2 = {nombre: "Carlos", edad: 30};
const persona3 = {nombre: "Ana", edad: 25}; // Objeto diferente con mismos datos

personas.add(persona1);
personas.add(persona2);
personas.add(persona3); // Se agrega porque es objeto diferente

console.log("Set con objetos (tamaño):", personas.size);

// Para comparar por contenido, necesitamos lógica custom
class PersonaSet extends Set {
    addPorNombre(persona) {
        // Buscar si ya existe alguien con el mismo nombre
        const existe = [...this].find(p => p.nombre === persona.nombre);
        if (!existe) {
            this.add(persona);
        }
        return this;
    }
}

const personasUnicas = new PersonaSet();
personasUnicas.addPorNombre(persona1);
personasUnicas.addPorNombre(persona2);
personasUnicas.addPorNombre(persona3); // No se agrega por nombre duplicado

console.log("Set personalizado (tamaño):", personasUnicas.size);

// WEAKSET (avanzado)
console.log("--- WeakSet ---");

let obj1 = {nombre: "objeto1"};
let obj2 = {nombre: "objeto2"};

const weakSet = new WeakSet();
weakSet.add(obj1);
weakSet.add(obj2);

console.log("¿WeakSet tiene obj1?:", weakSet.has(obj1));

// Los objetos en WeakSet pueden ser recolectados por garbage collector
obj1 = null; // El objeto puede ser eliminado de memoria
// El WeakSet automáticamente limpia referencias muertas
```

**Explicación**: Los Sets mantienen colecciones de valores únicos. Son ideales para operaciones de conjuntos y eliminación de duplicados.

**Conceptos vinculados**:
- Teoría de conjuntos
- Eliminación de duplicados
- Referencias débiles (WeakSet)

## Ejercicios Prácticos

1. **Manipula arrays complejos**: Crea arrays anidados y practica con flat, flatMap y reduce
2. **Implementa estructuras**: Usa Maps para crear cachés o índices
3. **Operaciones de conjuntos**: Usa Sets para implementar unión, intersección y diferencia

## Siguientes Pasos
Con las estructuras de datos dominadas, explora [programación asíncrona](../09-asincronia/) para manejar operaciones no bloqueantes.