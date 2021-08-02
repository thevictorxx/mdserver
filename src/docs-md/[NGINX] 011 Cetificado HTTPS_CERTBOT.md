# Certificados SSH con Certbot

Abrir el puerto 443.

```
sudo add-apt-repository ppa:certbot/certbot
```
```
sudo apt update
```
```
sudo apt install certbot python3-certbot-nginx
```
```
sudo certbot --nginx -d aws-prueba001.tk -d www.aws-prueba001.tk
```

Se debe apretar continuar hasta que aparezca la siguiente opción


```
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
```

y pulsamos la opción 2 para que siempre redireccione al sitio seguro
```
2
```

>Esto dura 3 meses después ingresar el siguiente comando

```
certbot renew --dry-run
```

### Verificar la renovación automática de Certbot

Los certificados de Let’s Encrypt son válidos únicamente por noventa días. El propósito de esto es incentivar a los usuarios a automatizar sus procesos de renovación de certificados. El paquete `certbot` que instalamos se ocupa de esto por nosotros añadiendo un temporizador systemd que se ejecutará dos veces al día y renovará automáticamente cualquier certificado que vaya a vencer en los próximos 30 días.

Puede consultar el estado del temporizador con `systemctl`:

```bash
sudo systemctl status certbot.timer
```

Para probar el proceso de renovación, puede hacer un simulacro con `certbot`:

```bash
sudo certbot renew --dry-run
```

Si no ve errores, estará listo. Cuando sea necesario, Certbot renovará sus certificados y volverá a cargar Nginx para registrar los cambios. Si el proceso de renovación automática falla, Let’s Encrypt enviará un mensaje a la dirección de correo electrónico que especificó en el que se le advertirá cuándo se aproxime la fecha de vencimiento de sus certificados.

