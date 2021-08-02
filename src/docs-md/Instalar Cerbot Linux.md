# Instalar Certbot

Si instala con el siguiente comando

```bash
sudo add-apt-repository ppa:certbot/certbot
```

Cuando pregunte presiónanos ENTER

Luego instalamos lo siguiente:

```bash
sudo apt install python-certbot-nginx
```

Para activar el SSL

```bash
sudo certbot --nginx -d victorguzman.tk -d www.victorguzman.tk
```

y Contestas lo que pide (LEER ATENTAMENTE).