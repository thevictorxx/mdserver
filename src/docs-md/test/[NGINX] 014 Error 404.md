# Error 404

En la configuración de los server, en la carpeta `sites-available` agregar para un error 440.

Esto lo busca donde indica la definición del `root`.

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
       
       # Error desde Aqui
       # si encuentra un error 404 redirigira a lo seleccionado 
       # y regresara un status de servidor 200
       error_page 404 = 200 @error
       location @error {
       	rewrite ^ index.php permanent;
       }
}
```

O tambien puede ser

```
error_page 404 = 200 http://$server_name/404.html;
```

