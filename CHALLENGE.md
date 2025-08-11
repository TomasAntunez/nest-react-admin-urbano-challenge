# Documentación de cambios realizados para completar el desafío de Urbano

- Este documento se escribe en español teniendo en cuenta que el desafío se realizó en un entorno hispanohablante.
- Toda la documentacion se va a encontrar en este archivo, incluyendo los pasos realizados, las decisiones tomadas y cualquier otro detalle relevante. La razon principal es que sea sencillo de seguir y entender el proceso completo de desarrollo del desafío (que seria mas complicado si se dividiera en varios archivos).

## Primeros pasos

En un principio fue necesaria una revisión del código existente para entender la estructura y el propósito de cada componente. Como asi tambien entender cuales son los dominios y subdominios que se manejan en el proyecto, ya que esto es clave para poder realizar las modificaciones necesarias.

### Plan a accion

Considero que lo mas importante y urgente es que el proyecto funcione correctamente (lo mejor es tener lo antes posible un proyecto que pueda desplegarse en produccion por mas que tenga deuda tecnica, la cual se ataca mas adelante), sin tener en cuenta por un lado las malas practicas y por otro lado las pruebas automaticas debido a que luego se haran cambios en la estructura de carpetas y archivos que haran que las pruebas automaticas fallen. Por lo tanto, el plan de accion es el siguiente:

1. **Revisar los endpoints de backend y frontend**: Esto es principalmente para saber si para el correcto funcionamiento es necesario desarrollar algun endpoint nuevo o si alguno esta de mas, principalmente para no hacer sobretrabajo y perder tiempo arreglando codigo que no es necesario.

2. **Arreglar aplicacion de nestjs**: La idea es que quede funcional primero en el entorno local, y luego en el entorno de produccion. Es decir, primero arreglar codigo y luego arreglar Dockerfile y docker-compose (solo la parte del backend y base de datos).

3. **Arreglar aplicacion de react**: Al igual que con el backend, primero arreglar codigo y luego arreglar Dockerfile y docker-compose (solo la parte del frontend).

4. **Creacion otra "app" que haga de proxy**: Si bien el proxy lo podria hacer el nginx que se configura en el frontend, la idea es que sea una app que se encargue de hacer el proxy y que se pueda configurar facilmente. Principalmente para separar las responsabilidades y que cada app tenga un unico proposito. Una vez integradas todas las apps (frontend, backend, y proxy), la intención es que con tan solo ejecutar `docker compose build` se construyan todas las imágenes necesarias. Estas imágenes podrían luego (queda fuera del alcance de este desafío):

   - Subirse a un repositorio de imágenes (como Docker Hub o ECR).
   - Desplegarse manualmente en una máquina virtual.
   - O integrarse con scripts/sistemas de CI/CD, según la infraestructura disponible.

5. **Planteo de refactorizacion**: Una vez que las aplicaciones esten funcionando correctamente y esten listas para desplegar a produccion, se puede plantear una refactorizacion para mejorar la estructura del codigo, eliminar duplicaciones y aplicar mejores practicas. Esto incluye la implementacion de pruebas automaticas para asegurar que los cambios no rompan la funcionalidad existente.

## Cambios para funcionamiento correcto del proyecto

### Backend

- Se creo un archivo `.env.local` y otro `.env.template` (Esto no se agrega al `.gitignore` ya que es para tener de ejemplo con datos dummy) en la raiz del proyecto para tener todas las variables de entorno en un mismo lugar, y sirve para facilitar la configuracion y el despliegue en diferentes entornos.
- Se agrego un volumen para la base de datos en el archivo `docker-compose.yml` para persistir los datos en el entorno local, y tambien se cambiaron algunos datos hardcodeados por variables de entorno.
- Elimine el archivo de config del ORM y lo configure como esta definido en la documentacion para el correcto funcionamiento de las entidades y de la base de datos.
- Hice cambios en la coleccion de Postman, en ese caso agrupe los endpoint en carpetas de acuerdo a los modulos que tiene la aplicacion. Esto fue principalmente para que quede mas legible y organizado. Por otro lado eso rompe con los tests e2e ya que movi los endpoints de lugar, aun que esto no me preocupa tanto ya que es bastante fragil ejecutar los tests de esta manera, ya que solo estamos testeando un happy path. Seria mejor hacer test e2e con supertest o alguna libreria similar que permita hacer pruebas mas robustas.
- Agregue variables de entorno en el `docker-compose.yml` (en el servicio de backend), para que los valores se agreguen de manera dinamica y no queden expuestos los valores en el repositorio.
- Hice un upgrade de la version de bcrypt a la version `6.0.0` que no tiene problemas con versiones mas nuevas de node ni tampoco con la imagen de node:alpine. Otras alternativas eran cambiar a bcryptjs o hacer cambios en la construccion de la imagen de backend ya cambiando la imagen de base de node e instalando las herramientas necesarias para el funcionamiento correcto de los binarios que usa bcrypt.
- Reconstruí el Dockerfile de backend para que la imagen se construya por capas, optimizando así el proceso de construcción y reduciendo el tamaño de la imagen final. Con el Dockerfile previo le imagen de backend tenia un size de `603MB` y ahora tiene un size `233MB`. Aparte quedo definita una version especifica de node y de alpine para asegurar la compatibilidad y estabilidad en el entorno de producción.

### Frontend

- Hice un cambio en las versiones de las librerias que se estaban usando en el `package.json` y reconstrui el `yarn.lock` para hacer limpieza.
- Agregue un script de arranque para que se tomen las variables de entorno desde la raiz del proyecto y porque era necesario sobreescribir una variable para cambiar el puerto que usaba la app en desarrollo.
- Hice un refactor del routing de la aplicacion ya que subi algunas versiones las librerias y esto rompia con el routing anterior.
- Hice un cambio en el `nginx.conf` apuntando a otro puerto para la api y tambien cambie la url base.
- Cambie como se estaba construyendo la imagen de frontend, si bien no hay una mejora en el size, si hay una mejora en la legilibilidad y el orden.
