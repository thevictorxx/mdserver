# Instalación de Gogs

### 1.- Desde un servidor en blanco 

1.- Actualizamos los paquetes:

```bash
sudo apt update
```

```bash
sudo apt upgrade
```

2.- Crear un nuevo usuario para no usar el por defecto (ubuntu o root).

```bash
sudo adduser [usuario]
```

y le otorgamos los permisos de `sudo`:

```bash
sudo usermod -aG sudo [usuario]
```

#### 1.1.- Si tenemos con clave SSH

Debemos sincronizar las llaves SSH con el nuevo usuario

```bash
sudo rsync --archive --chown=[usuario]:[usuario] ~/ssh /home/[usuario] 
```

```bash
sudo rsync --archive --chown=victor:victor ~/ssh /home/victor 
```

### 2.- Instalación

1.- Descargamos el binario desde la **[Pagina Oficial](https://gogs.io/docs/installation/install_from_binary)** copiando el link de la versión que queramos e utilizamos el siguiente código para descargar:

```bash
wget https://dl.gogs.io/0.12.3/gogs_0.12.3_linux_amd64.tar.gz
```

El nombre del archivo puede ser un poco complicado de manejar podriamos renombrarlo de la siguiente manera:

```bash
cp gogs_0.12.3_linux_amd64.tar.gz gogs.tar.gz
```

2.- Descomprimimos el archivo `.tar.gz` de la siguiente manera:

```bash
tar -xvf gogs.tar.gz
```

Este comando debería extraer todo el contenido en una carpeta llamada `./gogs`.

### 3.- System Service Archivo

Para este archivo usaremos el usuario `git` y que el programa este en `/home/git`.

1.- Cambiaremos de usuario la carpeta `/git`

```
sudo chown -R git:git /home/git/
```

2.- Dentro de los archivos de configuración se encuentra un archivo de systemd, este lo copiamos en la siguiente ruta:

```bash
sudo cp /home/git/gogs/scripts/systemd/gogs.service /etc/systemd/system/
```

3.- Editamos el archivo que creamos con:

```bash
sudo nano /etc/systemd/system/gogs.service
```

y tiene que decir lo siguiente (Por defecto trae esto):

```tex
[Unit]
Description=Gogs
After=syslog.target
After=network.target
After=mariadb.service mysqld.service postgresql.service memcached.service redis.service

[Service]
# Modify these two values and uncomment them if you have
# repos with lots of files and get an HTTP error 500 because
# of that
###
#LimitMEMLOCK=infinity
#LimitNOFILE=65535
Type=simple
User=git
Group=git
WorkingDirectory=/home/git/gogs
ExecStart=/home/git/gogs/gogs web
Restart=always
Environment=USER=git HOME=/home/git

# Some distributions may not support these hardening directives. If you cannot start the service due
# to an unknown option, comment out the ones not supported by your version of systemd.
ProtectSystem=full
PrivateDevices=yes
PrivateTmp=yes
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
```

4.- habilitamos el servicio de gogs

```bash
sudo systemctl start gogs
sudo systemctl enable gogs
```

podemos ver el status

```bash
sudo systemctl status gogs
```

### Configuraciones





