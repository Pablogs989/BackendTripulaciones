# Backend API para Gestión de Reuniones y Eventos

## Descripción
Este proyecto proporciona una API RESTful para gestionar usuarios, reuniones y eventos. La API facilita el registro y autenticación de usuarios, la creación y gestión de reuniones, y la organización de eventos con funcionalidades avanzadas como la carga de imágenes y el envío de correos electrónicos de confirmación.

## Documentación en Postman
 [Enlace a la documentación de postman](https://documenter.getpostman.com/view/34523081/2sA3dxEXJk).

## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución para JavaScript en el lado del servidor.
- **Express**: Marco de aplicación web para Node.js, utilizado para construir la API RESTful.
- **MongoDB**: Base de datos NoSQL orientada a documentos, usada para almacenar datos de usuarios, proveedores, reuniones y eventos.
- **Mongoose**: Biblioteca de modelado de datos para MongoDB y Node.js.
- **Bcrypt**: Biblioteca para el hashing de contraseñas.
- **JsonWebToken**: Biblioteca para la creación y verificación de tokens JWT para la autenticación de usuarios.
- **Dotenv**: Carga variables de entorno desde un archivo `.env`.
- **Nodemailer**: Librería para el envío de correos electrónicos.
- **Imgur**: Servicio de alojamiento de imágenes usado para subir y almacenar imágenes de usuarios.

## Instalación

1. Clona el repositorio desde GitHub.
2. Navega al directorio del proyecto.
3. Instala las dependencias utilizando `npm install`.
4. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto:
    - `PORT`: El puerto en el que se ejecutará el servidor.
    - `MONGODB_URI`: La URI de conexión a la base de datos MongoDB.
    - `JWT_SECRET`: La clave secreta para la firma de tokens JWT.
    - `EMAILURL`: La URL base para la confirmación de correo electrónico.
5. Inicia el servidor utilizando `npm start`.

## Endpoints Principales

### Autenticación de Usuarios
- **POST /users/register**: Registra un nuevo usuario.
- **POST /users/login**: Autentica a un usuario y devuelve un token JWT para acceso autorizado.
- **GET /users/confirm/:emailToken**: Confirma el registro del usuario a través de un token enviado por correo electrónico.

### Gestión de Usuarios
- **GET /users/:id**: Obtiene la información de un usuario por su ID.
- **GET /users**: Obtiene una lista de todos los usuarios.
- **PUT /users**: Actualiza la información de un usuario.
- **DELETE /users**: Elimina un usuario.

### Gestión de Reuniones
- **POST /meetings**: Crea una nueva reunión.
- **GET /meetings**: Obtiene todas las reuniones.
- **PUT /meetings/:id**: Actualiza una reunión existente.
- **DELETE /meetings/:id**: Cancela una reunión.

### Gestión de Eventos
- **POST /events**: Crea un nuevo evento.
- **GET /events**: Obtiene todos los eventos.
- **PUT /events/:id**: Actualiza un evento existente.
- **DELETE /events/:id**: Elimina un evento.
- **POST /events/:id/users**: Agrega un usuario a un evento.
- **DELETE /events/:id/users**: Elimina un usuario de un evento.
- **POST /events/:id/score**: Agrega una puntuación a un evento.

## Modelos de Datos

### Usuario
El modelo de usuario incluye campos como nombre, apellido, correo electrónico, contraseña, tipo de usuario, avatar, y más.

### Proveedor
El modelo de proveedor incluye campos como CIF, nombre de la empresa, dirección, país, correo electrónico, número de teléfono, tipo de colaboración, intereses, y más.

### Reunión
El modelo de reunión incluye campos como identificadores de proveedor y usuario, fecha, hora y estado de cancelación.

### Evento
El modelo de evento incluye campos como descripción del evento, lugar, fecha, hora, intereses, correo electrónico del ponente, proveedor, empresa y estado de confirmación.

## Contribución
Las contribuciones son bienvenidas. Para contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu característica (`feature/nueva-feature`).
3. Realiza tus cambios y realiza commits descriptivos.
4. Haz push a la rama.
5. Abre un Pull Request en GitHub.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

Para obtener más detalles sobre la API y su uso, revisa la documentación completa o contacta al equipo de desarrollo.

## Autores
 [Pablo](https://github.com/Pablogs989)
 [Jairo](https://github.com/jaironf)
 [Bruno](https://github.com/BrunoMalfi)
 [Manuel](https://github.com/manudana11)
 [Agustin](https://github.com/AgustinErimbaue)

