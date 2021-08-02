# Instalar PHP Ubuntu

Este tutorial lo guía a través de la instalación de PHP 8.0 en Ubuntu 20.04/18.04.

1.- Pero primero, actualice los paquetes de su sistema Ubuntu e instalemos algunas dependencias como se muestra.

```bash
sudo apt update
```

```bash
sudo apt upgrade
```

```bash
sudo apt install  ca-certificates apt-transport-https software-properties-common
```

A continuación, agregue el PPA de Ondrej:

```bash
sudo add-apt-repository ppa:ondrej/php
```

### Nginx

Si elige usar PHP 8.0 con la instalación de Nginx, el paso más recomendado es instalar PHP-FPM para procesar archivos PHP.

Por lo tanto, instale PHP y PHP-FPM usando el siguiente comando:

```bash
sudo apt install php8.0-fpm
```

El servicio PHP-FPM debería iniciarse automáticamente. Puede verificar esto como se muestra:

```bash
sudo systemctl status php8.0-fpm
```

Para que Nginx procese archivos PHP, configure su bloque de servidor Nginx actualizando la sección del servidor como se muestra:

```tex
server {

   # ... some other code

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.0-fpm.sock;
    }
}
```

Finalmente, reinicie el servidor web Nginx para que los cambios entren en vigencia.

```bash
sudo systemctl restart nginx
```

Las extensiones de PHP son bibliotecas que amplían la funcionalidad de PHP. Estas extensiones existen como paquetes y se pueden instalar de la siguiente manera:

```bash
sudo apt install php8.0-[extension-name]
```

Por ejemplo, el siguiente ejemplo instala las extensiones SNMP, Memcached y MySQL.

```bash
sudo apt install php8.0-snmp php-memcached php8.0-mysql
```

Para confirmar la versión de PHP instalada, ejecute el comando:

```bash
php -v
```

Además, puede crear un archivo php de muestra en/var/www/html como se muestra:

```bash
sudo nano /var/www/html/info.php
```

Pegue las siguientes líneas y guarde el archivo:

```php
<?php

phpinfo();

?>
```



