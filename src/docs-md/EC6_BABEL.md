# EC6 Con Babel en NodeJS

### Dependencia necesarias

```bash
npm install -D @babel/cli @babel/core @babel/node @babel/preset-env
```

### Configuracion archivo `.rcbabel`

Debemos crear un archivo de configuracion para babel llamado `.rcbabel` en la raiz del proyecto y introducir lo siguiente:

```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

### Compilar el codigo final

En la lista de scripts del documento `package.json` agregamos el siguiente.

``` bash
babel src --out-dir build
```

### Implementar Nodemon

En la lista de scripts del documento `package.json` agregamos el siguiente.

```
nodemon src/index.js --exec babel-node
```

