# Copiar archivos al servidor
### NOS POCICIONAMOS EN LA CASPETA QUE DE ARCHIVOS QUE QUEREMOS TRANSFERIR AL SERVIDOR
```
ssh vps2 "mkdir /home/thevictor/carpetanueva"
```
```
scp -r * usuario@ipservidor:/home/thevictor/carpetanueva
```
### LUEGO SE COPIA AL DIRECTORIO DONDE SE MUESTRA LA WEB
```
sudo cp -rv carpetanueva/ /var/www/
```