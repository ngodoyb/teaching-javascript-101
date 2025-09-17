# 01. Fundamentos Web y Entorno

## Conceptos Clave
- ¿Qué es JavaScript y para qué se utiliza?
- Diferencias entre cliente y servidor
- Navegadores y motores de JavaScript
- Herramientas de desarrollo

## Ejercicios

### Ejercicio 1.1: Tu primer script
Crea un archivo HTML básico que ejecute JavaScript en el navegador.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi primer JavaScript</title>
</head>
<body>
    <h1>¡Hola JavaScript!</h1>
    
    <script>
        // Tu primer código JavaScript
        console.log("¡Hola mundo desde JavaScript!");
        alert("¡Bienvenido a JavaScript!");
    </script>
</body>
</html>
```

**Explicación**: Este ejemplo muestra cómo incluir JavaScript directamente en HTML usando la etiqueta `<script>`. El código se ejecuta cuando el navegador carga la página.

**Conceptos vinculados**: 
- Integración de JavaScript en HTML
- Funciones básicas del navegador (`console.log`, `alert`)
- Orden de ejecución del código

### Ejercicio 1.2: JavaScript externo
Separa el JavaScript en un archivo externo.

**archivo: index.html**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Externo</title>
</head>
<body>
    <h1>JavaScript desde archivo externo</h1>
    <script src="script.js"></script>
</body>
</html>
```

**archivo: script.js**
```javascript
// Código JavaScript en archivo separado
console.log("Este código viene de un archivo externo");

// Verifica si el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log("El DOM está completamente cargado");
    document.querySelector('h1').style.color = 'blue';
});
```

**Explicación**: Separar JavaScript en archivos externos mejora la organización, permite reutilización y facilita el mantenimiento.

**Conceptos vinculados**:
- Arquitectura de aplicaciones web
- Separación de responsabilidades
- Eventos del DOM

### Ejercicio 1.3: Herramientas de desarrollo
Explora las herramientas de desarrollo del navegador.

```javascript
// Diferentes formas de mostrar información en la consola
console.log("Mensaje informativo");
console.warn("Mensaje de advertencia");
console.error("Mensaje de error");
console.info("Mensaje informativo");

// Medición de tiempo
console.time("operacion");
for(let i = 0; i < 1000; i++) {
    // Simulamos una operación
}
console.timeEnd("operacion");

// Agrupación de mensajes
console.group("Mi grupo de mensajes");
console.log("Mensaje 1");
console.log("Mensaje 2");
console.groupEnd();
```

**Explicación**: La consola del navegador es fundamental para depurar y entender el comportamiento de JavaScript.

**Conceptos vinculados**:
- Debugging y depuración
- Herramientas de desarrollo
- Optimización y medición de rendimiento

## Ejercicios Prácticos

1. **Experimenta**: Abre las herramientas de desarrollo (F12) y prueba cada tipo de `console`
2. **Modifica**: Cambia los mensajes y observa cómo se muestran
3. **Investiga**: Explora las pestañas Elements, Sources y Network en las herramientas de desarrollo

## Siguientes Pasos
Ahora que entiendes el entorno básico, continuemos con los [conceptos básicos de JavaScript](../02-conceptos-basicos/).