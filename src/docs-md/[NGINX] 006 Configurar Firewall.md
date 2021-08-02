# Configurar firewall

## SE USARA "UFW" CREADO POR UBUNTO QUE ES MAS FACIL


Informacion de la funcion
```
sudo ufw help
```

### MOSTRARIA LO SIGUIENTE
```
#Commands:
# enable                          enables the firewall  // ACTIVAR EL CORTAFUEGO
# disable                         disables the firewall // DESACTIVAR EL CORTAFUEGO
# default ARG                     set default policy 
# logging LEVEL                   set logging to LEVEL
# allow ARGS                      add allow rule
# deny ARGS                       add deny rule
# reject ARGS                     add reject rule
# limit ARGS                      add limit rule 
# delete RULE|NUM                 delete RULE
# insert NUM RULE                 insert RULE at NUM
# route RULE                      add route RULE
# route delete RULE|NUM           delete route RULE
# route insert NUM RULE           insert route RULE at NUM
# reload                          reload firewall
# reset                           reset firewall
# status                          show firewall status
# status numbered                 show firewall status as numbered list of RULES
# status verbose                  show verbose firewall status
# show ARG                        show firewall report
# version                         display version information

#Application profile commands:
# app list                        list application profiles
# app info PROFILE                show information on PROFILE
# app update PROFILE              update PROFILE
# app default ARG                 set default application policy
```


### VER ESTADO DEL SERVIDOR Y LOS PUERTOS
```
sudo ufw status verbose
```
### VER LOS PUERTOS QUE ESTAMOS UTILIZANDO
```
sudo netstat -plnt
```
### SI EL COMANDO ANTERIOR DA ERROR NOT FOUND INTALAR EL PAQUETE
```
sudo apt-get install net-tools
```
### ANTES DE ACTIVAR EL CORTAFUEGO SE DEBEN NOMBRAR LOS PUERTOS QUE ESTARAN HABILITADOS
```
sudo ufw allow 22/tcp
```
### O TAMBIEN POR NOMBRE DE APLICACION QUE SE ENCUENTRA EN LA RUTA
```
ll /etc/ufw/applications.d/
```
### O
```
sudo ufw app list
```
### VER EL PUERTO QUE USA LA APLICACION
```
sudo ufw app info {NOMBRE APLICACION DE LA LISTA}
```
### LIMITAR LAS CONEXIONES POR DIRECCION IP A NO MAS DE 6 VECES EN LOS ULTIMOS 30 SIGUIENTE
```
sudo ufw limit OpenSSH comment 'Comentario de Limitacion'
```
### INICIAR EL CONTAFUEGOS
```
sudo ufw enable
```