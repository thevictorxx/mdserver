# Peticion del cliente

> http, server , location



### keepalive_requests

Establece el número máximo de solicitudes que se pueden atender a través de una conexión keep-alive. Una vez realizada la cantidad máxima de solicitudes, se cierra la conexión.

Es necesario cerrar las conexiones periódicamente para liberar las asignaciones de memoria por conexión. Por lo tanto, usar un número máximo de solicitudes demasiado alto podría resultar en un uso excesivo de memoria y no se recomienda.

*Predeterminado 100*

### keepalive_timeout

Establece un tiempo de espera durante el cual una conexión de cliente Keep-Alive permanecerá abierta en el lado del servidor. El valor cero deshabilita las conexiones de cliente de keep-alive.

El valor es en *segundos*.

*Predeterminado 75*

### send_timeout

Establece un tiempo de espera para transmitir una respuesta al cliente. El tiempo de espera se establece solo entre dos operaciones de escritura sucesivas, no para la transmisión de la respuesta completa. Si el cliente no recibe nada dentro de este tiempo, la conexión se cierra.

El valor es en *segundos*.

*Predeterminado 60*