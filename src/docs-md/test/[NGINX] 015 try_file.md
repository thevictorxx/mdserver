# try_file

Intenta redireccionar al archivo que se encuentre disponible, se lee de izquierda a derecha. 

Los archivos que buscan están relacionados con la ruta indicada en `root`.

Esto se puede usar en `server` y `location`.

```
server {
       listen 80;
       listen [::]:80;

       server_name example.com;

       root /var/www/example.com;
       index index.html;

       location / {
              try_files $uri $uri/ =404;
       }
       
       #Desde Aqui
       # Si se intenta ingresar a la direccion /inicio
       # intentara el redireccionamiento de izquierda a derecha si encuentra los archivos
       location /inicio {
       		try_file admin.php user.php @redireccion;
       }
       location @redireccion {
       		rewrite ^ index.php permanent;
       }
}
```

