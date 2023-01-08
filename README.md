# Servidor de archivos MD

## Archivo de configuración

Se necesita el siguiente archivo **`.env`** con las variables de entorno usadas para un correcto funcionamiento:

```text
# Servidor
PORT = 5000

# Base de datos
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = ""
DB_DATABASE = "mdserver"

# Password
PASSWORD_SALT = 10

# JWT config
ACCESS_TOKEN_SECRET = Palabra_Secreta_Token
ACCESS_TOKEN_EXPIRES_IN = 864000
```
