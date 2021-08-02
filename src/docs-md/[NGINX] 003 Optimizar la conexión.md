
# Conectar directamente desde CMD

Desde la ruta
```
C:\Users\Victor\.ssh>
```

Agregar un archivo con el siguiente comando
```
touch config
```

Abrimos la carpeta que aloja el archivo config 
Para editarlo en nuestro editor de preferencia
```
explorer .
```

Escribimos lo siguiente en el codigo
```
Host *
    ServerAliveInterval 120

# Comentario
Host vps2
    HostName 51.91.58.50
    User thevictor
    Port 22

```