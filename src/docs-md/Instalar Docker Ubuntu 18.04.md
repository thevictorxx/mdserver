# Instalar Docker Ubuntu 18.04

Primero, actualice su lista de paquetes existente:

```bash
sudo apt update
```

A continuación, instale algunos paquetes de requisitos previos que le permiten a `apt` usar paquetes mediante HTTPS:

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Luego, agregue la clave GPG para el repositorio oficial de Docker a su sistema:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Agregue el repositorio de Docker a las fuentes de APT:

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

Posteriormente, actualice la base de datos de paquetes usando los paquetes de Docker del repositorio que acaba de agregar:

```bash
sudo apt update
```

Asegúrese de que va a instalar desde el repositorio de Docker en vez del repositorio de Ubuntu predeterminado:

```bash
apt-cache policy docker-ce
```

Verá un resultado como este, aunque el número de versión de Docker puede variar:

Output of apt-cache policy docker-ce

```bash
docker-ce:
  Installed: (none)
  Candidate: 18.03.1~ce~3-0~ubuntu
  Version table:
     18.03.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
```

Note que `docker-ce` no está instalado, pero el candidato para la instalación es del repositorio de Docker para Ubuntu 18.04 (`bionic`).

Por último, instale Docker:

```bash
sudo apt install docker-ce
```

Ahora debería tener Docker instalado, el daemon iniciado, y el proceso habilitado para iniciar durante el arranque. Verifique que se esté ejecutando:

```bash
sudo systemctl status docker
```

El resultado debería ser parecido al siguiente, indicando que el servicio está activo y se está ejecutando:

```
Output● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-07-05 15:08:39 UTC; 2min 55s ago
     Docs: https://docs.docker.com
 Main PID: 10096 (dockerd)
    Tasks: 16
   CGroup: /system.slice/docker.service
           ├─10096 /usr/bin/dockerd -H fd://
           └─10113 docker-containerd --config /var/run/docker/containerd/containerd.toml
```

Instalar Docker ahora no solamente le ofrece el servicio Docker (daemon), sino también la utilidad de línea de comandos `docker` o el cliente Docker. Más adelante en este tutorial, vamos a explorar cómo usar el comando `docker`.

## Ejecutar el comando Docker sin sudo

De forma predeterminada, el comando `docker` solamente puede ejecutarse por el usuario de **root** o por un usuario en el grupo **docker**, el cual se crea automáticamente durante la instalación de Docker.

Agregue su nombre de usuario al grupo `docker` si quiere evitar escribir `sudo` siempre que deba ejecutar el comando `docker`:

```bash
sudo usermod -aG docker ${USER}
```

Para aplicar la nueva membresía de grupo, debe cerrar sesión en el servidor y volver a iniciarla, o puede escribir lo siguiente:

```bash
su - ${USER}
```

Se le pedirá que ingrese la contraseña de su usuario para poder continuar.

Confirme que se haya agregado su usuario al grupo de **docker** escribiendo:

```bash
id -nG
```

Si necesita agregar un usuario al grupo de `docker` y no ha iniciado sesión como ese usuario, declare tal nombre de usuario explícitamente usando:

```bash
sudo usermod -aG docker username
```

Para el resto de este artículo, se asume que está ejecutando el comando de `docker` como un usuario que es parte del grupo de **docket**. Si opta por no hacerlo, anteponga los comandos con `sudo`.