# NGINX

#### SERVIDORES WEB CONOCIDOS
* APACHE
* NGINX (plus)
* MICROSOFT INTERNET INFORMATION SERVICES
* LITESPEED


### ACTUALIZAR LA LISTA DE PAQUETES DE UBUNTU
```
sudo apt update
```
### INSTALAMOS NGINX
```
sudo apt install nginx -y
```

### VER EL ESTADO (DEBEMOS VER QUE ESTE ACTIVO)
```
sudo systemctl status nginx
```
### INDICAR AL CORTA FUEGOS EL PUERTO QUE DEBE ESCUCHAR PARA LAS PETICIONES
### VEMOS LA LISTA DE PROGRAMAS QUE USAN PUERTO
```
sudo ufw app list
```

### VEMOS LA INFO DEL QUE CONFIGURAREMOS EN ESTE CASO EL "Nginx HTTP"
### Y ACTIVAMOS EL PUERTO QUE INDICA
```
sudo ufw app info "Nginx HTTP"
```
### LO AGREGAMOS A LAS REGLAS DEL CORTAFUEGO
```
sudo ufw allow "Nginx HTTP"
```
### VERIFICAMOS QUE SE AGREGARA CORRECTAMENTE
```
sudo afw status verbose
```
---

## PARA VER EL CONTENIDO DE SU PAGINA (sitios disponibles)
```
cd /etc/nginx/sites_available
```
```
ll
```

### EDITAMOS EL ARCHIVO default
```
nano default
```
>
>INFORMACION DEL FICHERO default
>
>root /var/www/html -> donde estan los ficheros que muestra por defecto
>server_name -> indica cuando uno inglesa poniendo en el navegador "thevictor.com"
>
>// solo puede haber un defaul_server

### SITIOS HABILITADOS ES PARA AGREGAR UNA REFERENCIA AL LA CONFIGURACION DEL SITIO WEB DESDE EL NAVEGADOR
#### EN ESTA CARPETA SE ENCUENTRA UN ARCHIVO REFERENCIA AL ARCHIVO DE sites_available
```
cd /etc/nginx/sites_enabled
```



### DESPUES DE TENER TENER NUESTRA CARPETA DEL SITIO WEB EN /var/www/
### NOS DIRIGIMOS A **/etc/nginx/sites_available** Y DUPLICAMOS EL ARCHIVO default Y LE CAMBIAMOS EL NOMBRE
### LO EDITAMOS Y EN LA PARTE DE root PONEMOS LA UBICACION DE LA CARPETA
### NOS DIRIGIMOS A **/etc/nginx/sites_enabled** Y LE PONEMOS COMO REFERENCIA EL ARCHIVO QUE CREAMOS
```
sudo ln -s /etc/nginx/sites_available/nombre_archivo
```
### Y QUITAMOS EL ARCHIVO DE REFERENCIA DE default PARA EVITAR CONFLICTOS
```
sudo rm -v default
```
### RIVISAMOS SI ESTA CORRECTA LA NUEVA SINTAXYS
```
sudo nginx -t
```
### RECARGAMOS LA CONFIGURACION
```
sudo systemctl reload nginx
```