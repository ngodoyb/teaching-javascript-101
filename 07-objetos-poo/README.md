# 07. Objetos y Programación Orientada a Objetos

## Conceptos Clave
- Creación y manipulación de objetos
- Prototipos y herencia
- Clases ES6
- Encapsulación, herencia y polimorfismo

## Ejercicios

### Ejercicio 7.1: Creación y manipulación de objetos
Aprende las diferentes formas de crear y trabajar con objetos.

```javascript
console.log("=== Creación de objetos ===");

// 1. LITERAL DE OBJETO (más común)
const persona = {
    nombre: "Ana",
    edad: 28,
    profesion: "Desarrolladora",
    
    // Método
    presentarse() {
        return `Hola, soy ${this.nombre}, tengo ${this.edad} años`;
    },
    
    // Computed property names
    [`hobby_${Date.now()}`]: "programar"
};

console.log("Objeto literal:", persona);
console.log("Presentación:", persona.presentarse());

// 2. CONSTRUCTOR OBJECT
const persona2 = new Object();
persona2.nombre = "Carlos";
persona2.edad = 35;
console.log("Con constructor Object:", persona2);

// 3. Object.create()
const plantillaPersona = {
    especie: "Homo sapiens",
    presentarse() {
        return `Soy ${this.nombre} de la especie ${this.especie}`;
    }
};

const persona3 = Object.create(plantillaPersona);
persona3.nombre = "María";
persona3.edad = 24;
console.log("Con Object.create:", persona3.presentarse());

// MANIPULACIÓN DE PROPIEDADES
console.log("=== Manipulación de propiedades ===");

const producto = { nombre: "Laptop", precio: 1000 };

// Agregar propiedades
producto.marca = "Dell";
producto["año"] = 2023;

// Acceso dinámico
const propiedad = "precio";
console.log("Precio dinámico:", producto[propiedad]);

// Verificar existencia
console.log("Tiene marca:", "marca" in producto);
console.log("Tiene color:", "color" in producto);

// Enumerar propiedades
console.log("Propiedades:");
for (let key in producto) {
    console.log(`  ${key}: ${producto[key]}`);
}

// Object.keys, values, entries
console.log("Keys:", Object.keys(producto));
console.log("Values:", Object.values(producto));
console.log("Entries:", Object.entries(producto));

// Eliminar propiedades
delete producto.año;
console.log("Después de delete:", producto);
```

**Explicación**: JavaScript ofrece múltiples formas de crear objetos. Los literales son más comunes, pero otras formas ofrecen flexibilidad adicional.

**Conceptos vinculados**:
- Propiedades dinámicas
- Enumeración de propiedades
- Referencias vs valores

### Ejercicio 7.2: Prototipos y herencia
Comprende el sistema de prototipos de JavaScript.

```javascript
console.log("=== Prototipos ===");

// FUNCIÓN CONSTRUCTORA
function Animal(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
}

// Agregar métodos al prototipo
Animal.prototype.dormir = function() {
    console.log(`${this.nombre} está durmiendo`);
};

Animal.prototype.comer = function(comida) {
    console.log(`${this.nombre} está comiendo ${comida}`);
};

// Crear instancias
const perro = new Animal("Rex", "perro");
const gato = new Animal("Misu", "gato");

console.log("Perro:", perro);
perro.dormir();
perro.comer("hueso");

// HERENCIA CON PROTOTIPOS
function Perro(nombre, raza) {
    // Llamar al constructor padre
    Animal.call(this, nombre, "perro");
    this.raza = raza;
}

// Establecer herencia
Perro.prototype = Object.create(Animal.prototype);
Perro.prototype.constructor = Perro;

// Agregar métodos específicos
Perro.prototype.ladrar = function() {
    console.log(`${this.nombre} dice: ¡Guau guau!`);
};

// Sobrescribir método padre
Perro.prototype.dormir = function() {
    console.log(`${this.nombre} el perro está durmiendo en su cama`);
};

const miPerro = new Perro("Buddy", "Golden Retriever");
console.log("Mi perro:", miPerro);
miPerro.comer("croquetas");
miPerro.ladrar();
miPerro.dormir(); // Método sobrescrito

// VERIFICACIÓN DE PROTOTIPOS
console.log("=== Verificación de prototipos ===");
console.log("miPerro instanceof Perro:", miPerro instanceof Perro);
console.log("miPerro instanceof Animal:", miPerro instanceof Animal);
console.log("miPerro instanceof Object:", miPerro instanceof Object);

console.log("Prototipo de miPerro:", Object.getPrototypeOf(miPerro));
console.log("¿Tiene ladrar?:", miPerro.hasOwnProperty("ladrar"));
console.log("¿Puede ladrar?:", "ladrar" in miPerro);

// CADENA DE PROTOTIPOS
function mostrarCadenaPrototipos(obj) {
    let actual = obj;
    let nivel = 0;
    
    while (actual) {
        console.log(`Nivel ${nivel}:`, actual.constructor.name);
        actual = Object.getPrototypeOf(actual);
        nivel++;
        if (nivel > 10) break; // Evitar bucle infinito
    }
}

console.log("Cadena de prototipos de miPerro:");
mostrarCadenaPrototipos(miPerro);
```

**Explicación**: JavaScript usa prototipos para herencia. Cada objeto tiene un prototipo del cual hereda propiedades y métodos.

**Conceptos vinculados**:
- Cadena de prototipos
- Herencia prototípica
- Constructor functions

### Ejercicio 7.3: Clases ES6
Aprende la sintaxis moderna de clases en JavaScript.

```javascript
console.log("=== Clases ES6 ===");

// CLASE BÁSICA
class Vehiculo {
    // Constructor
    constructor(marca, modelo, año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.velocidad = 0;
    }
    
    // Métodos de instancia
    acelerar(incremento = 10) {
        this.velocidad += incremento;
        console.log(`${this.marca} ${this.modelo} acelera a ${this.velocidad} km/h`);
    }
    
    frenar() {
        this.velocidad = Math.max(0, this.velocidad - 10);
        console.log(`${this.marca} ${this.modelo} frena a ${this.velocidad} km/h`);
    }
    
    // Getter
    get info() {
        return `${this.marca} ${this.modelo} (${this.año})`;
    }
    
    // Setter
    set velocidadMaxima(valor) {
        this._velocidadMaxima = valor;
    }
    
    get velocidadMaxima() {
        return this._velocidadMaxima || 200;
    }
    
    // Método estático
    static compararAños(vehiculo1, vehiculo2) {
        return vehiculo1.año - vehiculo2.año;
    }
}

const auto = new Vehiculo("Toyota", "Corolla", 2022);
console.log("Auto info:", auto.info);
auto.acelerar(30);
auto.frenar();

// HERENCIA DE CLASES
class Coche extends Vehiculo {
    constructor(marca, modelo, año, puertas) {
        super(marca, modelo, año); // Llamar constructor padre
        this.puertas = puertas;
        this.tipo = "automóvil";
    }
    
    // Sobrescribir método
    acelerar(incremento = 15) {
        console.log("El coche acelera suavemente...");
        super.acelerar(incremento); // Llamar método padre
    }
    
    // Método específico
    abrirPuertas() {
        console.log(`Abriendo las ${this.puertas} puertas del ${this.marca}`);
    }
}

class Motocicleta extends Vehiculo {
    constructor(marca, modelo, año, cilindrada) {
        super(marca, modelo, año);
        this.cilindrada = cilindrada;
        this.tipo = "motocicleta";
    }
    
    acelerar(incremento = 20) {
        console.log("La moto acelera rápidamente...");
        super.acelerar(incremento);
    }
    
    hacerCaballito() {
        console.log(`${this.marca} hace un caballito!`);
    }
}

const miCoche = new Coche("Honda", "Civic", 2023, 4);
const miMoto = new Motocicleta("Yamaha", "R1", 2023, 1000);

console.log("=== Polimorfismo ===");
const vehiculos = [auto, miCoche, miMoto];

vehiculos.forEach(vehiculo => {
    console.log(`--- ${vehiculo.info} ---`);
    vehiculo.acelerar();
});

// Métodos estáticos
console.log("Comparar años:", Vehiculo.compararAños(auto, miCoche));
```

**Explicación**: Las clases ES6 proporcionan sintaxis más clara para OOP, pero internamente siguen usando prototipos.

**Conceptos vinculados**:
- Sintaxis de clases
- Herencia con extends
- Polimorfismo
- Métodos estáticos

### Ejercicio 7.4: Principios OOP avanzados
Explora encapsulación, getters/setters y patrones avanzados.

```javascript
console.log("=== Principios OOP Avanzados ===");

// ENCAPSULACIÓN CON CAMPOS PRIVADOS (ES2022)
class CuentaBancaria {
    // Campos privados (comienzan con #)
    #saldo = 0;
    #titular;
    #numeroCuenta;
    
    constructor(titular, saldoInicial = 0) {
        this.#titular = titular;
        this.#numeroCuenta = this.#generarNumeroCuenta();
        this.#saldo = saldoInicial;
    }
    
    // Método privado
    #generarNumeroCuenta() {
        return Math.random().toString(36).substr(2, 10).toUpperCase();
    }
    
    // Métodos públicos para acceder a datos privados
    get saldo() {
        return this.#saldo;
    }
    
    get titular() {
        return this.#titular;
    }
    
    get numeroCuenta() {
        return this.#numeroCuenta;
    }
    
    depositar(cantidad) {
        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor a cero");
        }
        this.#saldo += cantidad;
        console.log(`Depósito de $${cantidad}. Nuevo saldo: $${this.#saldo}`);
    }
    
    retirar(cantidad) {
        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor a cero");
        }
        if (cantidad > this.#saldo) {
            throw new Error("Fondos insuficientes");
        }
        this.#saldo -= cantidad;
        console.log(`Retiro de $${cantidad}. Nuevo saldo: $${this.#saldo}`);
    }
    
    transferir(cantidad, cuentaDestino) {
        this.retirar(cantidad);
        cuentaDestino.depositar(cantidad);
        console.log(`Transferencia de $${cantidad} completada`);
    }
}

const miCuenta = new CuentaBancaria("Ana García", 1000);
const tuCuenta = new CuentaBancaria("Carlos López", 500);

console.log("Mi cuenta:", miCuenta.titular, miCuenta.numeroCuenta);
console.log("Saldo inicial:", miCuenta.saldo);

miCuenta.depositar(200);
miCuenta.retirar(100);
miCuenta.transferir(150, tuCuenta);

// console.log(miCuenta.#saldo); // Error: campo privado no accesible

// PATRÓN FACTORY AVANZADO
class Empleado {
    constructor(nombre, salario, departamento) {
        this.nombre = nombre;
        this.salario = salario;
        this.departamento = departamento;
    }
    
    trabajar() {
        console.log(`${this.nombre} está trabajando en ${this.departamento}`);
    }
    
    calcularSalarioAnual() {
        return this.salario * 12;
    }
}

class Desarrollador extends Empleado {
    constructor(nombre, salario, lenguajes) {
        super(nombre, salario, "Desarrollo");
        this.lenguajes = lenguajes;
    }
    
    programar() {
        console.log(`${this.nombre} está programando en ${this.lenguajes.join(", ")}`);
    }
}

class Gerente extends Empleado {
    constructor(nombre, salario, equipoSize) {
        super(nombre, salario, "Gerencia");
        this.equipoSize = equipoSize;
    }
    
    dirigir() {
        console.log(`${this.nombre} está dirigiendo un equipo de ${this.equipoSize} personas`);
    }
}

// Factory para crear empleados
class EmpleadoFactory {
    static crearEmpleado(tipo, datos) {
        switch(tipo.toLowerCase()) {
            case 'desarrollador':
                return new Desarrollador(datos.nombre, datos.salario, datos.lenguajes);
            case 'gerente':
                return new Gerente(datos.nombre, datos.salario, datos.equipoSize);
            default:
                return new Empleado(datos.nombre, datos.salario, datos.departamento);
        }
    }
}

const dev = EmpleadoFactory.crearEmpleado('desarrollador', {
    nombre: 'Ana',
    salario: 5000,
    lenguajes: ['JavaScript', 'Python', 'Java']
});

const manager = EmpleadoFactory.crearEmpleado('gerente', {
    nombre: 'Carlos',
    salario: 8000,
    equipoSize: 10
});

dev.trabajar();
dev.programar();
manager.trabajar();
manager.dirigir();
```

**Explicación**: La encapsulación protege los datos internos, mientras que los patrones como Factory proporcionan flexibilidad en la creación de objetos.

**Conceptos vinculados**:
- Campos privados
- Encapsulación
- Factory pattern
- Abstracción

## Ejercicios Prácticos

1. **Crea jerarquías de clases**: Diseña un sistema de clases con herencia múltiple nivel
2. **Implementa encapsulación**: Usa campos privados para proteger datos sensibles
3. **Practica polimorfismo**: Crea arrays de objetos de diferentes clases con métodos comunes

## Siguientes Pasos
Con OOP dominado, explora [arrays, maps y sets](../08-arrays-mapas-sets/) para estructuras de datos avanzadas.