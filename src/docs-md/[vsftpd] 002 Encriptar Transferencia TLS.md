# Encriptar Transferencia TLS

### 1.- Crear llave TLS

Comenzaremos creando un subdirectorio en: **/etc/ssl/** para almacenar el certificado **SSL/TLS** y los archivos de claves, si no no existe

```bash
sudo mkdir /etc/ssl/private
```

Ahora generemos el certificado y la clave en un solo archivo, ejecutando el siguiente comando.

```bash
sudo openssl req -x509 -nodes -keyout /etc/ssl/private/vsftpd.pem -out /etc/ssl/private/vsftpd.pem -days 365 -newkey rsa:2048
```

El comando anterior pedirá los siguientes datos:

```tex
Country Name (2 letter code) [XX]:CL
State or Province Name (full name) []:Lower Parel
Locality Name (eg, city) [Default City]:Mumbai
Organization Name (eg, company) [Default Company Ltd]:TecMint.com
Organizational Unit Name (eg, section) []:Linux and Open Source
Common Name (eg, your name or your server's hostname) []:tecmint
Email Address []:[email protected]
```

### 2.- Configuración de VSFTPD para usar SSL / TLS

Antes de realizar cualquier configuración de **VSFTPD** , para aquellos que tienen habilitado el firewall UFW, debe abrir los puertos **990** y **40000 -50000** para permitir que las conexiones TLS y el rango de puertos de los puertos pasivos se establezcan en el archivo de configuración VSFTPD, respectivamente:

```bash
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp
sudo ufw status
```

Ahora, abra el archivo de configuración de VSFTPD y defina los detalles de SSL en él:

```bash
sudo nano /etc/vsftpd/vsftpd.conf
```

Luego, agregue o ubique la opción `ssl_enable `y establezca su valor en **YES** para activar el uso de SSL, nuevamente, porque TLS es más seguro que SSL, restringiremos VSFTPD a use TLS en su lugar, habilitando la opción `ssl_tlsv1 `:

```text
ssl_enable=YES
ssl_tlsv1=YES
ssl_sslv2=NO
ssl_sslv3=NO
```

A continuación, comente las siguientes líneas utilizando el carácter `# `de la siguiente manera:

```text
#rsa_cert_file=/etc/ssl/private/ssl-cert-snakeoil.pem
#rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
```

Luego, agregue las líneas a continuación para definir la ubicación del certificado SSL y el archivo de clave:

```text
rsa_cert_file=/etc/ssl/private/vsftpd.pem
rsa_private_key_file=/etc/ssl/private/vsftpd.pem
```

Ahora, también tenemos que evitar que los usuarios anónimos usen SSL, luego forzar a todos los inicios de sesión no anónimos a usar una conexión SSL segura para la transferencia de datos y enviar la contraseña durante el inicio de sesión:

```text
allow_anon_ssl=NO
force_local_data_ssl=YES
force_local_logins_ssl=YES
```

Además, podemos usar las siguientes opciones para agregar más funciones de seguridad en el servidor FTP. Con la opción `require_ssl_reuse = YES `, todas las conexiones de datos SSL deben mostrar la reutilización de la sesión SSL; demostrando que conocen el mismo secreto maestro que el canal de control. Por lo tanto, debemos deshabilitarlo.

```
require_ssl_reuse=NO
```

Además, podemos establecer qué cifrados SSL VSFTPD permitirá para las conexiones SSL cifradas con la opción `ssl_ciphers `. Esto ayudará a frustrar cualquier esfuerzo de los atacantes que intenten forzar un cifrado específico en el que posiblemente descubrieron vulnerabilidades en:

```
ssl_ciphers=HIGH
```

Luego, definamos el rango de puertos (mínimo y máximo) de los puertos pasivos.

```text
pasv_min_port=40000
pasv_max_port=50000
```

Para habilitar la depuración de SSL, lo que significa que los diagnósticos de conexión de openSSL se registran en el archivo de registro VSFTPD, podemos usar la opción `debug_ssl `:

```text
debug_ssl=YES
```

Finalmente guarde el archivo y ciérrelo. Luego reinicie el servicio VSFTPD:

```bash
sudo systemctl restart vsftpd
```



