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
