# Instalar Fail2ban

Mejorar la seguridad de su servidor debe ser una de sus principales prioridades cuando se trata de administrar un servidor Linux. Al revisar los registros de su servidor, a menudo puede encontrar diferentes intentos de inicio de sesión de fuerza bruta, inundaciones web, búsqueda de explotaciones y muchos otros.

Con un software de prevención de intrusiones como **fail2ban** puede examinar los registros de su servidor y agregar reglas iptables adicionales para bloquear las direcciones IP problemáticas.

Primero actualice sus paquetes e instale **fail2ban** como se muestra.

```bash
sudo apt-get update && apt-get upgrade -y
sudo apt-get install fail2ban
```

### Cómo configurar Fail2ban

