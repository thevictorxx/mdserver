# Template proxy NGINX

## Ruta de archivos de templates
```bash
$ cd /usr/local/hestia/data/templates/web/nginx
```
Todos los archivos de esta carpeta que creemos deben tener los siguientes permisos
```bash
$ chmod 755
```
## Archivos necesarios
Se necesitan crear tres archivos de los cuales dos son necesarios. (*.tpl* y *.stpl*)

### archivo.tpl
Uso normal solo redireccionamiento sin Let's Encrypt
```
server {
    listen      %ip%:%proxy_port%;
    server_name %domain_idn% %alias_idn%;

    include %home%/%user%/conf/web/%domain%/nginx.forcessl.conf*;

    location / {
        proxy_pass      http://%ip%:%web_port%;
        location ~* ^.+\.(%proxy_extensions%)$ {
            root           %docroot%;
            access_log     /var/log/%web_system%/domains/%domain%.log combined;
            access_log     /var/log/%web_system%/domains/%domain%.bytes bytes;
            expires        max;
            try_files      $uri @fallback;
        }
    }

    location /error/ {
        alias   %home%/%user%/web/%domain%/document_errors/;
    }

    location @fallback {
        proxy_pass      http://%ip%:%web_port%;
    }

    location ~ /\.ht    {return 404;}
    location ~ /\.svn/  {return 404;}
    location ~ /\.git/  {return 404;}
    location ~ /\.hg/   {return 404;}
    location ~ /\.bzr/  {return 404;}

    include %home%/%user%/conf/web/%domain%/nginx.conf_*;
}
```
### archivo.stpl
Se utiliza cuando Let's Encrypt esta activado.
```
server {
    listen      %ip%:%proxy_ssl_port% ssl http2;
    server_name %domain_idn% %alias_idn%;
    ssl_certificate      %ssl_pem%;
    ssl_certificate_key  %ssl_key%;
    ssl_stapling on;
    ssl_stapling_verify on;
    error_log  /var/log/%web_system%/domains/%domain%.error.log error;

    include %home%/%user%/conf/web/%domain%/nginx.hsts.conf*;

    location / {
        proxy_pass      https://%ip%:%web_ssl_port%;
        location ~* ^.+\.(%proxy_extensions%)$ {
            root           %sdocroot%;
            access_log     /var/log/%web_system%/domains/%domain%.log combined;
            access_log     /var/log/%web_system%/domains/%domain%.bytes bytes;
            expires        max;
            try_files      $uri @fallback;
        }
    }

    location /error/ {
        alias   %home%/%user%/web/%domain%/document_errors/;
    }

    location @fallback {
        proxy_pass      https://%ip%:%web_ssl_port%;
    }

    location ~ /\.ht    {return 404;}
    location ~ /\.svn/  {return 404;}
    location ~ /\.git/  {return 404;}
    location ~ /\.hg/   {return 404;}
    location ~ /\.bzr/  {return 404;}

    proxy_hide_header Upgrade;

    include %home%/%user%/conf/web/%domain%/nginx.ssl.conf_*;
}
```
### archivo.sh
Se ejecutara al configurar el dominio.
```bash
#!/bin/bash
# Changing public_html permission
user="$1"
domain="$2"
ip="$3"
home_dir="$4"
docroot="$5"

#Acciones
chmod 755 $docroot
#Fin Acciones
exit 0
```
## Para aplicación node
Experimental, faltan más pruebas.
### archivoEjemplo.tpl
```
server {
    listen      %ip%:%proxy_port%;
    server_name %domain_idn% %alias_idn%;

    include %home%/%user%/conf/web/%domain%/nginx.forcessl.conf*;

    location / {
        proxy_set_header Host $host;
        # Cambiar aqui la ip y el puerto de destino
        proxy_pass http://51.75.206.238:4000/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Accept-Encoding gzip;
    }

    location ~ /\.ht    {return 404;}
    location ~ /\.svn/  {return 404;}
    location ~ /\.git/  {return 404;}
    location ~ /\.hg/   {return 404;}
    location ~ /\.bzr/  {return 404;}

    include %home%/%user%/conf/web/%domain%/nginx.conf_*;
}
```
### archivoEjemplo.stpl
```
server {
    listen      %ip%:%proxy_ssl_port% ssl http2;
    server_name %domain_idn% %alias_idn%;
    ssl_certificate      %ssl_pem%;
    ssl_certificate_key  %ssl_key%;
    ssl_stapling on;
    ssl_stapling_verify on;
    error_log  /var/log/%web_system%/domains/%domain%.error.log error;

    include %home%/%user%/conf/web/%domain%/nginx.hsts.conf*;

    location / {
        proxy_set_header Host $host;
        # Cambiar aqui la ip y el puerto de destino
        proxy_pass http://51.75.206.238:4000/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Accept-Encoding gzip;
    }

    location ~ /\.ht    {return 404;}
    location ~ /\.svn/  {return 404;}
    location ~ /\.git/  {return 404;}
    location ~ /\.hg/   {return 404;}
    location ~ /\.bzr/  {return 404;}

    include %home%/%user%/conf/web/%domain%/nginx.ssl.conf_*;
}
```
### archivoEjemplo.sh
```bash
#!/bin/bash
# Changing public_html permission
user="$1"
domain="$2"
ip="$3"
home_dir="$4"
docroot="$5"

mkdir "/home/$user/web/$domain/nodeapp"
chown -R $user:$user "/home/$user/web/$domain/nodeapp"

exit 0
```
## Ruta con redireccionamiento a API con puerto
>Ej: https://dominio.tld/api

Los archivos de esta configuracion deben estar en la siguiente carpeta y con la seguiente configuración:

```bash
/home/%user%/conf/web/%domain%/nginx.conf_*
```
Y para SSL
```bash
/home/%user%/conf/web/%domain%/nginx.ssl.conf_*
```

### Archivo Sin SSL (nginx.conf_ejemplo)

```
location /api {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    rewrite ^/api/?(.*) /$1 break;
    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;
}
```

### Archivo Con SSL (nginx.ssl.conf_ejemplo)

```
location /api {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    rewrite ^/api/?(.*) /$1 break;
    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;
}
```