# Acceso remoto a MySQL

Para acceder de manera remota a la base de datos (Esto implica cualquier base de datos) se debe cambiar la configuración de esta cambiando la variable **bind-address = 127.0.0.1 a bind-address = 0.0.0.0**.

En MySQL esta variable puede estar definida en el archivo:

```bash
nano /etc/mysql/my.cnf
```

pero este archivo realiza un include de la configuración, lo que tenemos que hacer es buscar donde se encuentra la variable bind-address de los archivos y carpetas que incluye este archivo.

#### Problema

Cuando yo ejecuto el comando 

```bash
sudo netstat -plnt
```

el `Local Address` de la base de datos se muestra de la siguiente forma, esto es para conexiones locales solamente.

![Texto alternativo](./img/configuracionBDDRomete01.png)

Para conexiones remotas debe estar de la siguiente forma

![Texto alternativo](./img/configuracionBDDRomete02.png)

 

## Configuracion por tipo de base de datos

### MySQL configuración

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

### MariaDB configuración 

```bash
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

## Tipos de usuarios

los usuarios para acceso remoto y local deben crearce de la siguiente manera

```mysql
GRANT ALL ON *.* TO ‘usuario’ @ ‘%’ IDENTIFIED BY ‘contraseña’;
```

## FIN

Para finalizar se debe reiniciar el servicio de la base de datos con

```bash
sudo /etc/init.d/mysql restart
```

