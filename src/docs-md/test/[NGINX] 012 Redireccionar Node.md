# Redireccionar a node

en la configuración del sitio

```bash
cd /etc/nginx/sites-available
```

Agregar una configuración de esta manera

```
server {
       listen 33;

       location / {
               	proxy_pass http://127.0.0.1:3306;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection upgrade;
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
       }
}
```

