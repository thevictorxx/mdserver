# Como instalar code-server

Se instalara la versión [2.1692-vsc1.39.2](https://github.com/cdr/code-server/releases/tag/2.1692-vsc1.39.2)

## Instalación

1.- Descargamos el archivo

```bash
wget https://github.com/cdr/code-server/releases/download/2.1692-vsc1.39.2/code-server2.1692-vsc1.39.2-linux-x86_64.tar.gz
```

2.- Descomprimimos el archivo

```bash
tar -xzvf [Nombre_Del_Archivo]
```

3.- Copiamos el binario a la carpeta `/usr/local/bin/`

```bash
sudo cp code-server /usr/local/bin/
```

4.- Crear carpeta para los archivos de configuración y demás de code-server

```bash
sudo mkdir /var/lib/code-server
```

## Crear un proceso

Creamos un archivo

```bash
sudo nano /lib/systemd/system/code-server.service
```

Le escribimos los siguientes comandos:

```bash
[Unit]
Description=code-server
After=nginx.service

[Service]
Type=simple
Environment=PASSWORD=master159
ExecStart=/usr/local/bin/code-server --host 127.0.0.1 --user-data-dir /var/lib/code-server --auth password
Restart=always

[Install]
WantedBy=multi-user.target
```

Y luego iniciamos el servicio

```bash
sudo systemctl start code-server
```

configurar para que queda ves que se reinicie el servidor se inicie automáticamente

```bash
sudo systemctl enable code-server.service
```

## Redireccionamiento con NGINX

El archivo `.conf` creado debe contener lo siguiente:

```bash
server {
    listen 80;
    listen [::]:80;
    server_name mydomain.com;

    location / {
      proxy_pass http://localhost:8080/;
      proxy_set_header Host $host;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection upgrade;
      proxy_set_header Accept-Encoding gzip;
    }
}
```

```
server {
    listen      51.75.206.238:80;
    server_name vscode.thevictorxx.com www.vscode.thevictorxx.com;

    location / {
        proxy_set_header Host $host;
        proxy_pass http://51.75.206.238:8089/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Accept-Encoding gzip;
    }
}
```

