# SASS

## Instalación

### Node

```bash
npm install -g sass
```

## ¿Como Usar?

Para que quede escuchando y actualizando los cambias que realices.

```bash
sass --watch input.scss output.css
```

Solo compilar el archivo

```bash
sass main.scss output.css
```

## Diferencia entre SASS y SCSS

Basicamente es la forma en que se escriben.

### SCSS

Es mas parecido al css tradicional que la mayoria conoce.

```css
SCSS SYNTAX
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

### SASS

No utiliza llaves, solo usa sangría forzada.

```SASS
SASS SYNTAX
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none

```

## Proyecto Multi-Archivos

Lo ideal seria trabajar con una carpeta `SASS` con todos lo archivos y luego compilarlos a CSS, uniendo todo en un archivo `main.scss`.

En el ejemplo se utiliza una carpeta `sass` con una carpeta `base ` dentro de esta para las variables, mixes y los reset que sean necesarios y otra carpeta `component` los estilos de cada componente.

La estructura seria algo:

```
CSS

SASS
	- base
		- _variables.scss
		- _reset.scss
	- component
		- _menu.scss
		- _button.scss
main.scss
```

El archivo `main.scss` importará todos los parciales de todos los directorios. No necesitará agregar el subrayado o la extensión al importar los nombres de archivo; en lugar de "_variables.scss", simplemente escribirá "variables".

Archivo `main.scss`:

```css
// Base

@import 'base/variables';
@import 'base/reset';

// Components

@import 'components/menu';
@import 'components/button';
```

Para compilar todo se utiliza el siguiente comando (Quedara observando los cambios que se realicen), es importante que el nombre del archivo donde se importen los componentes sea `main.scss` y los archivos partials comiences con un `_`.

```bash
sass --watch sass:css --style compressed
```

