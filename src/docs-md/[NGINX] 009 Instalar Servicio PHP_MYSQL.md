# Instalar Servisio PHP y MYSQL

Instalamos PHP (Al finalizar se inicia)

`apt-get install php-fpm`

Nos dirigimos a la carpeta de configuracion de nginx sites-available

```
cd /etc/nginx/sites_available
```

Y modificamos el archivo que tiene la configuracion de nuestra pagina en este caso default

`nano default`

Y tenemos que modificar la parte de php de la siguiente manera, teniendo en cuenta la version que tenemos instalada de php, solo descomentar una opcon de configuracion en este caso el .sock

```
#pass PHP scripts to FastCGI server
#
location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        
        # With php-fpm (or other unix sockets):
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
#       # With php-cgi (or other tcp sockets):
#       fastcgi_pass 127.0.0.1:9000;
#}
```

Tambien desactivaremos los archivos .htcacces de apache descomentando la siguiente linea

```
location ~ /\.ht {
       deny all;
}
```
Luego chekemaos la configuraciond e nginx para que queden errores en las modificaciones que hemos hecho

```
nginx -t
```

Luego reiniciamos el sistema de nginx
```
systemctl reload nginx
```
Como ver la version del php, lo que este dentro de esta carpeta es la version correcta

```
/var/run/php/
```



------



# Instalar MYSQL Y PHP-MYSQL

```
apt-get install mysql-server php-mysql
```

## Para instalar phpmyadmin

Nos dirigimos al link y copiamos la direccion de enlace de descarga del archivo **.zip**
```
https://www.phpmyadmin.net/
```

Nos dirigimos a la carpeta donde se encuentras los archivos del sitio web
```
cd /var/www/html
```
Y descargamos el zip en esta pagina con

```
wget https://files.phpmyadmin.net/phpMyAdmin/5.0.4/phpMyAdmin-5.0.4-all-languages.zip
```

Y luego descomprimimos
```
unzip archivo.zip
```
Renombramos la carpeta que descomprimio

```
mv phpMyAdmin-5.0.4-all-languages phpmyadmin
```
Finalmente tenemos que agregar el archivo **index.php** a la lista de archivos de inicio en la carpeta ***sites-available*** de nginx

```
cd /etc/nginx/sites-available/
```

Y editamos la configuracion de nuestra sitio web
quedando de la siguiente manera
```
root /var/www/html;

# Add index.php to the list if you are using PHP
index index.php index.html index.htm index.nginx-debian.html;

server_name _;
```

Luego comprobamos si todo esta bien y recargamos nginx
```
nginx -t
```
```
systemctl reload nginx
```

## Crear las cuentas de PHPMYADMIN

creamos la cuenta root desde consola, esta no puede ingresar desde phpmyadmin luego tenemos que crear otra desde la consola de mysql (Intentar todos los comandos con sudo)

```
mysqladmin --user=root password "contraseña"
```

Y probamos conexion por consola

```
mysql -u root -p
```

Despues de estar logueado como root en la consola de mysql creamos el usuario y le damos todos los privilegios de administrador

```
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'Contraseña';
```

```
GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'localhost' WITH GRANT OPTION;
```