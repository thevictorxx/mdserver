# Getting Started por Midudev

Este proyecto esta siendo seguido por el video de [midudev](https://www.youtube.com/watch?v=ansUGkcrhwY&ab_channel=midudev).

> Solo conceptos básicos.

### Dependencias

#### Iniciales

```bash
npm install -D webpack webpack-cli
```

### Scripts de ejecución

#### Básico

Solo con esto tomara de punto de entrada el archivo de `src/index.js` y lo compilara a una carpeta `./dist`, solo convertirá los archivos `.js`, si deseamos convertir mas cosas se deben utilizar **loaders**.

```json
"scripts": {
    "build": "webpack --mode production",
    "dev": "webpack --mode development --watch"
},
```

## Webpack con React.js

### Dependencias

#### Iniciales

```bash
npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli @babel/plugin-proposal-optional-chaining html-webpack-plugin webpack-dev-server
```

- `@babel/plugin-proposal-optional-chaining` Es para babel que soporte la nueva característica de JavaScript `object?.noCreado`.
- `@babel/preset-react` para que babel entienda JSX.



> - `@babel/plugin-syntax-optional-chaining` - Copia exactamente igual en el archivo de salida
>
> - `@babel/plugin-proposal-optional-chaining` - Analiza y transforma la sintaxis. 
>
> **Se recomienda *@babel/plugin-proposal-optional-chaining***.

### Archivo de configuración e Webpack

Creamos un archivo llamado `webpack.config.js` y le agregamos lo siguiente.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  output:{
    filename:'app.[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react", 
              "@babel/preset-env"
            ],
            plugins: [
              "@babel/plugin-proposal-optional-chaining"
            ],
          },
        },
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'Webpack Paso a Paso',
      template: 'src/index.html'
    })
  ]
};
```

##### ¿Como correr el servidor?

Agregamos el siguiente script en `package.json`:

```json
"scripts": {
    "dev": "webpack serve --mode development",
},
```



