# Autentificación Básica

Primero tenemos que tener instalado `apache2-utils`, que son programas útiles para web servers

```bash
sudo apt-get install apache2-utils
```

Creamos el archivo que contendrá las claves y usuarios

```bash
sudo htpasswd -c [RutaOpcional].htpasswd [NombreUsuario]
```

> `-c` Se utiliza para crear el archivo

Quedando por ejemplo:

```bash
sudo htpasswd -c /etc/nginx/.htpasswd user1
```

Si deseamos agregar otro usuario dentro del mismo fichero usamos

```bash
sudo htpasswd /etc/nginx/.htpasswd user2
```

Después de ejecutar estos programas pedirá ingresar la contraseña y repetir la contraseña.

Para confirmar la encriptación de las claves ejecutar:

```bash
cat /etc/nginx/.htpasswd
```

Mostrando algo parecido a:

```bash
user1:$apr1$/woC1jnP$KAh0SsVn5qeSMjTtn0E9Q0
user2:$apr1$QdR8fNLT$vbCEEzDj7LyqCMyNpSoBh/
```

## Configurando NGINX

1.- Dentro de un `location` que va a proteger, especifique la directiva `auth_basic` y asigne un nombre al área protegida por contraseña. El nombre del área se mostrará en la ventana de diálogo de nombre de usuario / contraseña cuando solicite las credenciales:

```bash
location /api{ 
    auth_basic  "Área del administrador"; 
    # ... Resto
}
```

2.- Especifique la `auth_basic_user_file` directiva con una ruta al archivo *.htpasswd* que contiene pares de usuario / contraseña:

```bash
location /api {
    auth_basic “Administrator’s Area”;
    auth_basic_user_file /etc/nginx/.htpasswd; 
}
```

3.- Alternativamente, puede limitar el acceso a todo el sitio web con autenticación básica, pero aún así hacer públicas algunas áreas del sitio web. En este caso, especifique el `off`parámetro de la `auth_basic` directiva que cancela la herencia de los niveles de configuración superiores:

```bash
server {
    #...
    auth_basic "Área del administrador";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location /public/ {
        auth_basic off;
    }
}
```

## Combinar con restricción de acceso por dirección de IP

```bash
http {
    server {
        listen 192.168.1.23:8080;
        root   /usr/share/nginx/html;

        location /api {
            api;
            satisfy all;

            deny  192.168.1.2;
            allow 192.168.1.1/24;
            allow 127.0.0.1;
            deny  all;

            auth_basic           "Área del administrador";
            auth_basic_user_file /etc/nginx/.htpasswd; 
        }
    }
}
```

