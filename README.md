# 🍽️ Plataforma Web de Gestión de Platillos

## 📖 Descripción

Aplicación web desarrollada con **Django + MySQL + HTML/CSS/JS** que permite:

- 👥 A los visitantes explorar un catálogo visual de platillos con filtros combinables.
- 🔐 A los administradores gestionar el inventario desde un panel seguro con autenticación.

---

## 🎯 Visión del Producto

Una plataforma web donde los clientes pueden descubrir platillos de forma visual e intuitiva mediante filtros avanzados, mientras que los administradores gestionan el inventario completo desde un panel seguro y centralizado.

---

## 🛠️ Stack Tecnológico

- **Backend:** Django
- **Base de datos:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Librerías adicionales:** Pillow

---

## 🧩 Funcionalidades

### 👥 Área Pública
- Catálogo en formato grid responsivo
- Vista de detalle del producto
- Filtros combinables:
  - Tiempo de comida
  - Tipo de cocina
  - Tipo de dieta
- Mensaje dinámico si no hay productos registrados

### 🔐 Área Administrador
- Login y logout seguro
- Dashboard con métricas de inventario
- CRUD completo de productos
- Validación de formularios
- Protección de rutas privadas

---

## 🗂️ Modelo Producto

| Campo              | Descripción |
|--------------------|-------------|
| titulo             | Nombre del platillo |
| foto               | Imagen del platillo |
| descripcion        | Texto descriptivo |
| precio             | Precio numérico |
| categoria_tiempo   | Desayuno, Entrada, Comida, etc. |
| tipo_cocina        | Italiana, Mexicana, etc. |
| tipo_dieta         | Vegetariana, Vegana, etc. |
| fecha_creacion     | Fecha automática de registro |

---

## 🚀 Instalación

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/tuusuario/turepositorio.git
cd turepositorio
```

### 2️⃣ Crear entorno virtual

```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

### 3️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4️⃣ Configurar base de datos MySQL

Editar `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nombre_db',
        'USER': 'usuario',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 5️⃣ Ejecutar migraciones

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6️⃣ Crear superusuario

```bash
python manage.py createsuperuser
```

### 7️⃣ Ejecutar servidor

```bash
python manage.py runserver
```

Acceder en navegador:

```
http://127.0.0.1:8000/catalogo/
```

---

## 📊 Dashboard

El panel de administrador incluye:

- Total de productos registrados
- Conteo de productos por categoría
- Últimos 5 productos agregados

Ruta protegida:

```
/admin/dashboard/
```

---

## 🔒 Seguridad Implementada

- Uso de `@login_required`
- Protección CSRF
- Confirmación antes de eliminar productos
- Manejo automático de error 404
- Protección de rutas privadas

---

## 📆 Planificación por Sprints

### Sprint 1
- Catálogo público
- Vista detalle
- Login y logout

### Sprint 2
- CRUD completo de productos

### Sprint 3
- Filtros combinables
- Dashboard administrativo

---

## 🧪 Estado del Proyecto

🚧 En desarrollo bajo metodología ágil (Scrum).

---

## 👨‍💻 Autor

Proyecto académico desarrollado para práctica de desarrollo web con Django.

---
