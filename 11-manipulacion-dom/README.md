# 11. Manipulación del DOM

## Conceptos Clave
- ¿Qué es el DOM y cómo acceder a él?
- Selección de elementos
- Modificación de contenido, atributos y estilos
- Eventos y event listeners
- Formularios y validación

## Ejercicios

### Ejercicio 11.1: Selección de elementos
Aprende las diferentes formas de encontrar elementos en el DOM.

```html
<!-- Ejemplo HTML para los ejercicios -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM Manipulation</title>
    <style>
        .destacado { background-color: yellow; }
        .oculto { display: none; }
        .error { color: red; border: 2px solid red; }
    </style>
</head>
<body>
    <header>
        <h1 id="titulo-principal">Mi Página Web</h1>
        <nav class="navegacion">
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#sobre">Sobre nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="inicio">
            <h2>Bienvenidos</h2>
            <p class="descripcion">Este es un párrafo de ejemplo.</p>
            <p class="descripcion">Este es otro párrafo.</p>
        </section>
        
        <section id="productos">
            <h2>Productos</h2>
            <div class="producto" data-id="1">
                <h3>Producto 1</h3>
                <p>Descripción del producto 1</p>
                <button class="btn-comprar">Comprar</button>
            </div>
            <div class="producto" data-id="2">
                <h3>Producto 2</h3>
                <p>Descripción del producto 2</p>
                <button class="btn-comprar">Comprar</button>
            </div>
        </section>
    </main>

    <script src="dom-manipulation.js"></script>
</body>
</html>
```

```javascript
// Métodos de selección básicos
console.log("=== Selección de elementos ===");

// 1. getElementById - Selecciona por ID único
const tituloPrincipal = document.getElementById('titulo-principal');
console.log("Título principal:", tituloPrincipal);

// 2. getElementsByClassName - Selecciona por clase (retorna HTMLCollection)
const descripciones = document.getElementsByClassName('descripcion');
console.log("Párrafos con clase 'descripcion':", descripciones);
console.log("Cantidad:", descripciones.length);

// 3. getElementsByTagName - Selecciona por etiqueta
const todosLosParagrafos = document.getElementsByTagName('p');
console.log("Todos los párrafos:", todosLosParagrafos);

// 4. querySelector - Selecciona el PRIMER elemento que coincida (CSS selector)
const primerProducto = document.querySelector('.producto');
const tituloH1 = document.querySelector('#titulo-principal');
const primerEnlace = document.querySelector('nav a');

console.log("Primer producto:", primerProducto);
console.log("Título con querySelector:", tituloH1);
console.log("Primer enlace:", primerEnlace);

// 5. querySelectorAll - Selecciona TODOS los elementos (retorna NodeList)
const todosLosProductos = document.querySelectorAll('.producto');
const todosLosBotones = document.querySelectorAll('.btn-comprar');
const enlacesNav = document.querySelectorAll('nav a');

console.log("Todos los productos:", todosLosProductos);
console.log("Todos los botones:", todosLosBotones);

// DIFERENCIAS ENTRE HTMLCOLLECTION Y NODELIST
console.log("=== Diferencias Collection vs NodeList ===");

// HTMLCollection es "live" - se actualiza automáticamente
console.log("HTMLCollection (live):", descripciones.length);

// NodeList de querySelectorAll es "static" - no se actualiza
const descripcionesStatic = document.querySelectorAll('.descripcion');
console.log("NodeList (static):", descripcionesStatic.length);

// SELECTORES CSS AVANZADOS
console.log("=== Selectores CSS avanzados ===");

// Selectores de atributo
const productosConId = document.querySelectorAll('[data-id]');
const producto1 = document.querySelector('[data-id="1"]');

console.log("Productos con data-id:", productosConId);
console.log("Producto específico:", producto1);

// Selectores de pseudoclase
const primerHijo = document.querySelector('section:first-child');
const ultimoBoton = document.querySelector('button:last-of-type');

console.log("Primer section:", primerHijo);
console.log("Último botón:", ultimoBoton);

// Selectores combinados
const botonesEnProductos = document.querySelectorAll('.producto button');
const h3DentroDeProductos = document.querySelectorAll('.producto > h3');

console.log("Botones dentro de productos:", botonesEnProductos);
console.log("H3 hijos directos de productos:", h3DentroDeProductos);

// NAVEGACIÓN POR EL DOM
console.log("=== Navegación por el DOM ===");

const mainElement = document.querySelector('main');

// Propiedades de navegación
console.log("Elemento padre:", mainElement.parentElement);
console.log("Nodos hijos:", mainElement.childNodes); // Incluye text nodes
console.log("Elementos hijos:", mainElement.children); // Solo elementos
console.log("Primer hijo elemento:", mainElement.firstElementChild);
console.log("Último hijo elemento:", mainElement.lastElementChild);
console.log("Hermano siguiente:", mainElement.nextElementSibling);
console.log("Hermano anterior:", mainElement.previousElementSibling);

// VERIFICACIÓN DE ELEMENTOS
console.log("=== Verificación de elementos ===");

console.log("¿Existe el elemento?:", tituloPrincipal !== null);
console.log("¿Tiene clase 'destacado'?:", tituloPrincipal.classList.contains('destacado'));
console.log("¿Tiene atributo 'id'?:", tituloPrincipal.hasAttribute('id'));
console.log("Tipo de nodo:", tituloPrincipal.nodeType); // 1 = Element
```

**Explicación**: La selección de elementos es fundamental para manipular el DOM. Cada método tiene sus ventajas según el caso de uso.

**Conceptos vinculados**:
- Árbol del DOM
- CSS selectors
- Live vs static collections

### Ejercicio 11.2: Modificación de contenido y atributos
Aprende a cambiar el contenido y propiedades de los elementos.

```javascript
console.log("=== Modificación de contenido ===");

// MODIFICAR CONTENIDO DE TEXTO
const titulo = document.getElementById('titulo-principal');

// textContent: solo texto, sin HTML
console.log("Texto original:", titulo.textContent);
titulo.textContent = "Mi Página Web Modificada";

// innerHTML: permite HTML
const primerParrafo = document.querySelector('.descripcion');
console.log("HTML original:", primerParrafo.innerHTML);
primerParrafo.innerHTML = "Este párrafo fue <strong>modificado con innerHTML</strong>";

// innerText: texto visible (respeta CSS display)
const segundoParrafo = document.querySelectorAll('.descripcion')[1];
segundoParrafo.innerText = "Modificado con innerText";

// CREAR ELEMENTOS DINÁMICAMENTE
console.log("=== Crear elementos ===");

// createElement: crear nuevo elemento
const nuevoParrafo = document.createElement('p');
nuevoParrafo.textContent = "Este párrafo fue creado dinámicamente";
nuevoParrafo.className = "dinamico";

// Agregar al DOM
const seccionInicio = document.getElementById('inicio');
seccionInicio.appendChild(nuevoParrafo);

// Crear elemento complejo
const nuevaSeccion = document.createElement('section');
nuevaSeccion.id = "nueva-seccion";
nuevaSeccion.innerHTML = `
    <h2>Sección Dinámica</h2>
    <p>Esta sección fue creada con JavaScript</p>
    <button onclick="alert('¡Botón dinámico!')">Clic aquí</button>
`;

// insertBefore: insertar en posición específica
const main = document.querySelector('main');
const primeraSeccion = main.firstElementChild;
main.insertBefore(nuevaSeccion, primeraSeccion);

// MODIFICAR ATRIBUTOS
console.log("=== Modificación de atributos ===");

const primerEnlace = document.querySelector('nav a');

// getAttribute/setAttribute
console.log("Href original:", primerEnlace.getAttribute('href'));
primerEnlace.setAttribute('href', 'https://example.com');
primerEnlace.setAttribute('target', '_blank');

// Propiedades directas
primerEnlace.title = "Enlace externo";
primerEnlace.id = "enlace-inicio";

// Data attributes
const producto1 = document.querySelector('[data-id="1"]');
console.log("Data-id original:", producto1.dataset.id);
producto1.dataset.precio = "99.99";
producto1.dataset.categoria = "electronica";

console.log("Datos del producto:", producto1.dataset);

// MODIFICAR CLASES CSS
console.log("=== Modificación de clases ===");

const todosLosProductos = document.querySelectorAll('.producto');

todosLosProductos.forEach((producto, index) => {
    // classList.add: agregar clase
    producto.classList.add('procesado');
    
    if (index === 0) {
        // classList.add múltiple
        producto.classList.add('destacado', 'especial');
    }
    
    // classList.toggle: alternar clase
    setTimeout(() => {
        producto.classList.toggle('destacado');
    }, 2000);
});

// classList methods
const boton = document.querySelector('.btn-comprar');
console.log("Clases del botón:", boton.classList);
console.log("¿Tiene clase 'btn-comprar'?:", boton.classList.contains('btn-comprar'));

// MODIFICAR ESTILOS DIRECTAMENTE
console.log("=== Modificación de estilos ===");

// Style individual
titulo.style.color = 'blue';
titulo.style.fontSize = '2.5em';
titulo.style.textAlign = 'center';

// Múltiples estilos con Object.assign
Object.assign(nuevoParrafo.style, {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '10px 0'
});

// cssText: establecer múltiples estilos como string
const segundoBoton = document.querySelectorAll('.btn-comprar')[1];
segundoBoton.style.cssText = `
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

// ELIMINAR ELEMENTOS
console.log("=== Eliminar elementos ===");

// Crear elemento temporal
const elementoTemporal = document.createElement('div');
elementoTemporal.textContent = "Me eliminaré en 3 segundos";
elementoTemporal.style.cssText = `
    background: red;
    color: white;
    padding: 10px;
    margin: 10px 0;
`;
main.appendChild(elementoTemporal);

// remove(): eliminar el elemento
setTimeout(() => {
    elementoTemporal.remove();
    console.log("Elemento temporal eliminado");
}, 3000);

// removeChild(): eliminar hijo específico
setTimeout(() => {
    if (main.contains(nuevaSeccion)) {
        main.removeChild(nuevaSeccion);
        console.log("Nueva sección eliminada");
    }
}, 5000);

// FRAGMENTOS DE DOCUMENTO (PERFORMANCE)
console.log("=== Document Fragments ===");

// DocumentFragment para modificaciones eficientes
const fragment = document.createDocumentFragment();

// Crear múltiples elementos sin afectar el DOM hasta el final
for (let i = 1; i <= 5; i++) {
    const item = document.createElement('li');
    item.textContent = `Item dinámico ${i}`;
    item.className = 'item-dinamico';
    fragment.appendChild(item);
}

// Una sola modificación al DOM
const lista = document.querySelector('nav ul');
lista.appendChild(fragment);

console.log("Items dinámicos agregados eficientemente");
```

**Explicación**: Modificar el DOM es costoso en términos de rendimiento. Es importante usar técnicas eficientes como DocumentFragment para múltiples modificaciones.

**Conceptos vinculados**:
- Rendimiento del DOM
- innerHTML vs textContent
- Data attributes

### Ejercicio 11.3: Eventos y Event Listeners
Aprende a manejar interacciones del usuario.

```javascript
console.log("=== Manejo de eventos ===");

// EVENT LISTENERS BÁSICOS
const botones = document.querySelectorAll('.btn-comprar');

// addEventListener: la forma moderna recomendada
botones.forEach((boton, index) => {
    boton.addEventListener('click', function(evento) {
        console.log(`Botón ${index + 1} clickeado`);
        console.log("Evento:", evento);
        console.log("Elemento que disparó el evento:", evento.target);
        
        // Cambiar el texto del botón
        this.textContent = 'Comprando...';
        
        // Deshabilitar temporalmente
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = 'Comprar';
            this.disabled = false;
        }, 2000);
    });
});

// MÚLTIPLES EVENTOS EN EL MISMO ELEMENTO
const titulo = document.getElementById('titulo-principal');

titulo.addEventListener('mouseenter', function() {
    this.style.color = 'red';
});

titulo.addEventListener('mouseleave', function() {
    this.style.color = 'black';
});

titulo.addEventListener('click', function() {
    this.classList.toggle('destacado');
});

// EVENTOS DE FORMULARIO
console.log("=== Eventos de formulario ===");

// Crear formulario dinámicamente para el ejemplo
const formulario = document.createElement('form');
formulario.innerHTML = `
    <h3>Formulario de Contacto</h3>
    <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
        <span class="error-nombre error" style="display: none;"></span>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <span class="error-email error" style="display: none;"></span>
    </div>
    <div>
        <label for="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
        <span class="error-mensaje error" style="display: none;"></span>
    </div>
    <button type="submit">Enviar</button>
`;

formulario.style.cssText = `
    border: 1px solid #ccc;
    padding: 20px;
    margin: 20px 0;
    background: #f9f9f9;
`;

document.querySelector('main').appendChild(formulario);

// Eventos de input en tiempo real
const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');

campoNombre.addEventListener('input', function(e) {
    const valor = e.target.value;
    console.log("Escribiendo nombre:", valor);
    
    // Validación en tiempo real
    const errorSpan = document.querySelector('.error-nombre');
    if (valor.length > 0 && valor.length < 2) {
        errorSpan.textContent = "El nombre debe tener al menos 2 caracteres";
        errorSpan.style.display = 'inline';
        campoNombre.classList.add('error');
    } else {
        errorSpan.style.display = 'none';
        campoNombre.classList.remove('error');
    }
});

// Evento focus/blur
campoEmail.addEventListener('focus', function() {
    this.style.backgroundColor = '#e6f3ff';
});

campoEmail.addEventListener('blur', function() {
    this.style.backgroundColor = 'white';
    
    // Validar email al perder el foco
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorSpan = document.querySelector('.error-email');
    
    if (this.value && !emailRegex.test(this.value)) {
        errorSpan.textContent = "Email no válido";
        errorSpan.style.display = 'inline';
        this.classList.add('error');
    } else {
        errorSpan.style.display = 'none';
        this.classList.remove('error');
    }
});

// Evento submit del formulario
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evitar envío real
    
    console.log("Formulario enviado");
    
    // Recopilar datos
    const formData = new FormData(this);
    const datos = Object.fromEntries(formData);
    
    console.log("Datos del formulario:", datos);
    
    // Validación final
    let esValido = true;
    const errores = [];
    
    if (!datos.nombre || datos.nombre.length < 2) {
        errores.push("Nombre inválido");
        esValido = false;
    }
    
    if (!datos.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
        errores.push("Email inválido");
        esValido = false;
    }
    
    if (!datos.mensaje || datos.mensaje.length < 10) {
        errores.push("Mensaje muy corto");
        esValido = false;
    }
    
    if (esValido) {
        alert("Formulario enviado correctamente!");
        this.reset(); // Limpiar formulario
    } else {
        alert("Errores: " + errores.join(", "));
    }
});

// DELEGACIÓN DE EVENTOS
console.log("=== Delegación de eventos ===");

// En lugar de agregar eventos a cada producto individualmente
const seccionProductos = document.getElementById('productos');

seccionProductos.addEventListener('click', function(evento) {
    // Verificar si el clic fue en un botón de comprar
    if (evento.target.classList.contains('btn-comprar')) {
        const producto = evento.target.closest('.producto');
        const idProducto = producto.dataset.id;
        
        console.log(`Comprando producto ID: ${idProducto}`);
        
        // Crear notificación dinámica
        const notificacion = document.createElement('div');
        notificacion.textContent = `Producto ${idProducto} agregado al carrito`;
        notificacion.style.cssText = `
            background: green;
            color: white;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
        `;
        
        producto.appendChild(notificacion);
        
        // Remover notificación después de 3 segundos
        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }
    
    // Verificar si el clic fue en un título de producto
    if (evento.target.tagName === 'H3' && evento.target.closest('.producto')) {
        const producto = evento.target.closest('.producto');
        producto.classList.toggle('expandido');
        
        if (producto.classList.contains('expandido')) {
            producto.style.backgroundColor = '#f0f0f0';
        } else {
            producto.style.backgroundColor = 'white';
        }
    }
});

// EVENTOS DE TECLADO
document.addEventListener('keydown', function(evento) {
    // Detectar combinaciones especiales
    if (evento.ctrlKey && evento.key === 's') {
        evento.preventDefault();
        console.log("Ctrl+S presionado - guardando...");
        alert("Simulando guardado de página");
    }
    
    // Escape para cerrar modales
    if (evento.key === 'Escape') {
        console.log("Escape presionado");
        // Cerrar cualquier modal abierto
        const modales = document.querySelectorAll('.modal');
        modales.forEach(modal => modal.style.display = 'none');
    }
    
    // Navegación con flechas en productos
    if (evento.key === 'ArrowDown' || evento.key === 'ArrowUp') {
        const productos = document.querySelectorAll('.producto');
        const activo = document.querySelector('.producto.activo');
        
        let indiceActual = Array.from(productos).indexOf(activo);
        
        if (evento.key === 'ArrowDown') {
            indiceActual = (indiceActual + 1) % productos.length;
        } else {
            indiceActual = indiceActual <= 0 ? productos.length - 1 : indiceActual - 1;
        }
        
        // Remover clase activa de todos
        productos.forEach(p => p.classList.remove('activo'));
        
        // Agregar clase activa al nuevo
        productos[indiceActual].classList.add('activo');
        productos[indiceActual].scrollIntoView({ behavior: 'smooth' });
    }
});

// REMOVER EVENT LISTENERS
console.log("=== Remover event listeners ===");

function handlerTemporal() {
    console.log("Handler temporal ejecutado");
}

// Agregar handler
document.addEventListener('click', handlerTemporal);

// Remover handler después de 10 segundos
setTimeout(() => {
    document.removeEventListener('click', handlerTemporal);
    console.log("Handler temporal removido");
}, 10000);
```

**Explicación**: Los eventos permiten interactividad. La delegación de eventos es eficiente para elementos dinámicos, y es importante remover listeners cuando no se necesiten.

**Conceptos vinculados**:
- Event bubbling y capturing
- Delegación de eventos
- Performance de eventos

## Ejercicios Prácticos

1. **Crea una galería interactiva**: Implementa navegación con teclado y mouse
2. **Construye un formulario completo**: Con validación en tiempo real y múltiples tipos de input
3. **Desarrolla un sistema de pestañas**: Usando delegación de eventos y modificación dinámica de clases

## Siguientes Pasos
Con DOM dominado, explora [paradigmas frontend](../12-paradigmas-frontend/) para arquitecturas más complejas.