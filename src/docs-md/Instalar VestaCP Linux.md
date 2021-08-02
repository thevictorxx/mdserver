# Instalación de VestaCP

> Ubuntu 18.04

## Configuración BASICA de VPS

### Establecer conexión con la VPS

Desde línea de comandos seria

```bash
ssh usuario@direcionIP
```

### Actualizar los paquetes

Primero:

```bash
sudo apt-get update
```

Luego

```bash
sudo apt-get upgrade
```

### Cambiar el puerto de conexión SSH

Por seguridad lo ideal seria cambiar el puerto de conexión por SSH, por un tema de seguridad ya que normalmente es el Puerto `22`.

Para cambiar esta opción se debe ejecutar el siguiente comando:

```bash
sudo nano /etc/ssh/sshd_config
```

### Cambiar la contraseña del usuario

Lo ideal seria cambiar la contraseña que se entrego.

```bash
passwd [Usuario]
```

Luego se recomienda reiniciar la configuración cargada del SSH:

```bash
/etc/init.d/ssh restart
```

### Crear un nuevo usuario

Lo ideal seria que se creara un nuevo usuario y dejar de usar el que entregaron:

```bash
adduser [Nombre-Usuario]
```

### Desactivar el acceso de ROOT (o Otro)

Para desactivar el usuario ROOT:

```bash
sudo nano /etc/ssh/sshd_config
```

y cambiamos la opción `PermitRootLogin` de la siguiente forma:

```texto
PermitRootLogin no
```

y guardamos los cambios y reiniciamos la configuración del SSH

```bash
/etc/init.d/ssh restart
```

## Instalación de VestaCP

Descargamos el archivo `.sh` para la instalación:

```bash
curl -O http://vestacp.com/pub/vst-install.sh
```

Y luego ejecutamos el `.sh` descargado:

```bash
sudo bash vst-install.sh --force
```

> Ultima versión que pude instalar VestaCP Ubuntu 18.04, en la versión de Ubuntu 20 o superior Error