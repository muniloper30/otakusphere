# 👹 OTAKUSPHERE 👹   
🚀 *Proyecto Fin de Grado*  


---

## 📖 Resumen  
OTAKUSPHERE es una plataforma web que permite a los usuarios llevar un registro de los animes o mangas que han visto o leído.  

## 💡 En qué consiste el proyecto  
La plataforma ofrece las siguientes funcionalidades clave:  
✔️ Registro y autenticación de usuarios.  
✔️ Creación y gestión de listas personalizadas (*Viendo, Pendientes, Favoritos*).  
✔️ Sistema de valoración y comentarios.  
✔️ Integración con APIs externas (*AniList, MyAnimeList*) para obtener información actualizada.  


## 🎯 ¿Qué soluciones aporta?  
🔹 Centraliza la gestión de animes en un solo lugar.  
🔹 Proporciona recomendaciones basadas en gustos personales.  
🔹 Fomenta la comunidad otaku mediante reseñas y valoraciones.  

## 🛠️ Tecnologías necesarias  

### 🎨 Frontend  
🔹 **React.js** - Desarrollo modular y eficiente de la interfaz.  
🔹 **Tailwind CSS / Bootstrap** - Diseño responsivo y moderno.  

### ⚙️ Backend  
🔹 **Node.js con Express** - Manejo de la lógica y peticiones.  
🔹 **API REST** - Comunicación entre frontend y backend.  

### 💾 Base de Datos  
🔹 **PostgreSQL** - Almacenamiento de usuarios, listas , favoritos...  

### 🔗 Integraciones  
🔹 **AniList / MyAnimeList API** - Información actualizada sobre animes y mangas.  


---

## 🚀 Requisitos

Antes de empezar, asegúrate de tener instalado:

- Node.js y npm
- PostgreSQL + PgAdmin
- Git
- Un editor como Visual Studio Code

---

## 🧠 Clonar el proyecto

```bash
git clone https://github.com/muniloper30/otakusphere
cd otakusphere
```

---

## 🔧 Configuración de la base de datos PostgreSQL
1. Crear la base de datos
Desde PgAdmin:

Click derecho en "Databases" → Create Database...

Nombre: otakusphere

2. Restaurar la base desde el archivo .sql
Click derecho sobre la base otakusphere → Restore

Formato: Plain

Archivo: selecciona database/otakusphere.sql

En las opciones de restauración, asegurarse de marcar:

✅ Restore Data

✅ Restore Table Definitions

✅ Roles / Privileges (si existen)

Pulsar Restore y esperar la confirmación.

>[!IMPORTANT]
>El archivo para la restauración se encuentra exactamente en `backend/src/db/`
>Para la JWT_SECRET, se puede crear con la terminal. Por ejemplo con el comando 
>`ssh-keygen -t rsa -b 4096 -m PEM -f private.key`, le colocamos una contraseña y luego en el documento 
>.env le poemos la ruta del archivo `JWT_SECRET='./private.key'` .

## 🛠 Backend – Express + PostgreSQL
```
cd backend
npm install
```

##  🔑 Configurar variables en .env

Crear un archivo .env en la raíz del backend con:

```
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=otakusphere
JWT_SECRET=tu_clave_secreta
```

## ▶️ Levantar el servidor
```
npm start
```

## 🎨 Frontend – React + Tailwind
```
cd frontend
npm install
npm run dev
```

El frontend estará en http://localhost:5173

## ✅ Funcionalidades principales
1. Registro/login de usuarios con token JWT

2. Gestión de listas personalizadas (viendo, pendientes, completados)

3. Eliminación y cambio de animes entre listas

4. Visualización dinámica desde la API de AniList

5. Reseñas y puntuaciones

6. Dashboard de usuario