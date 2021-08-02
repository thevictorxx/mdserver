# Instalar y configurar el servidor FTP

### Paso 1: Instalando el Servidor VsFTP

**1.** Primero, debemos actualizar la lista de fuentes de paquetes del sistema y luego instalar el paquete binario **VSFTPD** de la siguiente manera:

```bash
sudo apt-get update
sudo apt-get install vsftpd
```

**2.** Una vez que se complete la instalación, el servicio se deshabilitará inicialmente, por lo tanto, debemos iniciarlo manualmente por el tiempo medio y también habilitarlo para que se inicie automáticamente desde el próximo inicio del sistema: (NO SIEMPRE)

```bash
#------------- On SystemD ------------- 
systemctl start vsftpd
systemctl enable vsftpd

#------------- On SysVInit ------------- 
service vsftpd start
chkconfig --level 35 vsftpd on
```

**3.** A continuación, si tienes el firewall UFW habilitado (no está habilitado de manera predeterminada) en el servidor, debes abrir los puertos **21** y **20** donde los daemons de FTP están escuchando, para permitir el acceso a los servicios de FTP desde máquinas remotas, luego agregue las nuevas reglas de firewall de la siguiente manera:

```bash
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw status
```

### Paso 2: Configuración y seguridad del servidor VsFTP

**4.** Ahora vamos a realizar algunas configuraciones para configurar y asegurar nuestro servidor FTP, primero crearemos una copia de seguridad del archivo de configuración original **/etc/vsftpd/vsftpd.conf** como asi que:

```bash
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig
```

A continuación, vamos a abrir el archivo de configuración **vsftpd**:

```bash
sudo nano /etc/vsftpd.conf
```

Agregue/modifique las siguientes opciones con estos valores:

```tex
anonymous_enable=NO             # Deshabilitar el inicio de sesión anónimo
local_enable=YES				# Permitir inicios de sesión locales
write_enable=YES				# Habilitar comandos FTP que cambian el sistema de archivos
local_umask=022		        	# Valor de umask para la creación de archivos para usuarios locales
dirmessage_enable=YES	        # visualización de mensaje cuando los usuarios ingresan por primera vez a un nuevo directorio
xferlog_enable=YES				# Se mantendrá un archivo de registro detallando las cargas y descargas.
connect_from_port_20=YES        # Use el puerto 20 (ftp-data) en la máquina del servidor para conexiones de estilo PORT
xferlog_std_format=YES          # mantener el formato de archivo de registro estándar
listen=NO   					# Evitar que vsftpd se ejecute en modo independiente
listen_ipv6=YES		        	# vsftpd escuchará en un socket IPv6 en lugar de uno IPv4
pam_service_name=vsftpd         # nombre del servicio PAM que usará vsftpd
userlist_enable=YES  	        # habilitar vsftpd para cargar una lista de nombres de usuario
tcp_wrappers=YES  				# activar envoltorios tcp
```

A continuación, veremos dos posibles escenarios de cómo configurar el directorio de jaula chroot (raíz local), como se explica a continuación.

**6.** En este punto, agreguemos/modifiquemos/descomentemos estas dos opciones siguientes para restringir a los usuarios de FTP a sus directorios de Inicio.

```text
chroot_local_user=YES
allow_writeable_chroot=YES
```

La opción `chroot_local_user = YES `significa que los usuarios locales serán ubicados en una jaula chroot, su directorio de inicio de forma predeterminada después del inicio de sesión.

Y también debemos entender que VSFTPD no permite que se pueda escribir en el directorio chroot jail, de manera predeterminada, por razones de seguridad, podemos usar la opción **allow_writeable_chroot = YES** para deshabilitar esta configuración.

Guarde el archivo y ciérrelo. Luego tenemos que reiniciar los servicios VSFTPD para que los cambios anteriores surtan efecto:

```bash
#------------- On SystemD ------------- 
sudo systemctl restart vsftpd

#------------- On SysVInit ------------- 
sudo service vsftpd restart
```

### Paso 3: Configurar los directorios de inicio de usuario de FTP

**7.** Ahora, abra el archivo de configuración VSFTPD una vez más.

```bash
sudo nano /etc/vsftpd.conf
```

y comente la opción no segura utilizando el carácter `# `como se muestra a continuación:

```
#allow_writeable_chroot=YES
```

A continuación, cree el directorio raíz local alternativo para el usuario ( **victor** , posiblemente el suyo no sea el mismo) y configure los permisos necesarios deshabilitando los permisos de escritura de todos los demás usuarios en este directorio:

```bash
$ sudo mkdir /home/victor/ftp
$ sudo chown nobody:nogroup /home/victor/ftp
$ sudo chmod a-w /home/victor/ftp
```

**8.** Luego, cree un directorio bajo la raíz local con los permisos apropiados donde el usuario almacenará sus archivos:

```bash
$ sudo mkdir /home/victor/ftp/files
$ sudo chown -R victor:victor /home/victor/ftp/files
$ sudo chmod -R 0770 /home/victor/ftp/files/
```

Luego, agregue/modifique las siguientes opciones en el archivo de configuración de VSFTPD con sus valores correspondientes:

```tex
user_sub_token=$USER          # inserta el nombre de usuario en el directorio raíz local
local_root=/home/$USER/ftp    # define el directorio raíz local de cualquier usuario
```

Guarde el archivo y ciérrelo. Y reinicie los servicios VSFTPD con la configuración reciente:

```bash
#------------- On SystemD ------------- 
sudo systemctl restart vsftpd

#------------- On SysVInit ------------- 
sudo service vsftpd restart
```

> https://es.linux-console.net/?p=750