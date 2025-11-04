# 🚀 Configuración de Supabase para Spiriwors CMS

**Tiempo estimado:** 15-30 minutos

Este documento contiene las instrucciones paso a paso para configurar Supabase como backend del CMS de administración.

---

## 📋 Prerrequisitos

- Cuenta en [Supabase](https://supabase.com) (gratis)
- Acceso al proyecto

---

## 1️⃣ Crear Proyecto en Supabase

1. Ir a https://supabase.com
2. Click en "New Project"
3. Configuración:
   - **Name:** Spiriwors CMS
   - **Database Password:** (guárdalo, lo necesitarás)
   - **Region:** South America (São Paulo) - más cercano a Colombia
   - **Pricing Plan:** Free
4. Click "Create new project"
5. **Esperar 2-3 minutos** mientras Supabase configura el proyecto

---

## 2️⃣ Crear Tabla de Proyectos

1. En el panel de Supabase, ir a **SQL Editor** (ícono de base de datos en la barra lateral)
2. Click en "New query"
3. **Copiar y pegar** el siguiente SQL:

```sql
-- Crear tabla de proyectos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('2d', 'stop')),
  year INTEGER,

  -- Imágenes del carrusel (URLs de Supabase Storage)
  images TEXT[] DEFAULT '{}',

  -- Proyectos destacados
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER,
  featured_poster TEXT,
  featured_description TEXT,

  -- Metadata
  display_order INTEGER DEFAULT 999,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX idx_projects_order ON projects(display_order);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer proyectos (para el sitio público)
CREATE POLICY "Proyectos son públicos para lectura"
  ON projects
  FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden insertar/actualizar/eliminar
CREATE POLICY "Solo admins pueden modificar proyectos"
  ON projects
  FOR ALL
  USING (auth.role() = 'authenticated');
```

4. Click en **"Run"** (o Ctrl/Cmd + Enter)
5. Deberías ver: **"Success. No rows returned"**

---

## 3️⃣ Configurar Storage para Imágenes

### 3.1 Crear Bucket

1. Ir a **Storage** en la barra lateral
2. Click en "Create a new bucket"
3. Configuración:
   - **Name:** `project-images`
   - **Public bucket:** ✅ **Activar** (importante para que las imágenes sean accesibles)
   - **File size limit:** 5 MB
   - **Allowed MIME types:** `image/webp,image/jpeg,image/png`
4. Click "Create bucket"

### 3.2 Configurar Políticas de Storage

1. Click en el bucket `project-images` que acabas de crear
2. Click en "Policies" (en la parte superior)
3. Click en "New Policy"
4. Seleccionar **"For full customization"**
5. **Política de LECTURA (pública):**

```sql
CREATE POLICY "Imágenes públicas para lectura"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');
```

6. Click "Review" → "Save policy"

7. Click en "New Policy" de nuevo
8. **Política de ESCRITURA (solo autenticados):**

```sql
CREATE POLICY "Solo admins pueden subir imágenes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images'
  AND auth.role() = 'authenticated'
);
```

9. Click "Review" → "Save policy"

10. Repetir para DELETE:

```sql
CREATE POLICY "Solo admins pueden eliminar imágenes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images'
  AND auth.role() = 'authenticated'
);
```

---

## 4️⃣ Crear Usuario Admin (Camilo)

1. Ir a **Authentication** en la barra lateral
2. Click en "Users"
3. Click en "Add user" → "Create new user"
4. Configuración:
   - **Email:** camilo@spiriwors.com (o el email que prefiera Camilo)
   - **Password:** (crear contraseña segura)
   - **Auto Confirm User:** ✅ **Activar**
5. Click "Create user"
6. **Guardar email y contraseña** - Camilo los necesitará para hacer login

---

## 5️⃣ Obtener Credenciales para el Frontend

1. Ir a **Settings** (ícono de engranaje) → **API**
2. En la sección "Project API keys", copiar:

   **a) Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **b) Anon/Public Key (anon public):**
   ```
   eyJhbGc....[key muy larga]
   ```

3. **ENVIAR ESTAS DOS CREDENCIALES** al equipo de frontend

---

## 6️⃣ Variables de Entorno para el Frontend

El equipo de frontend necesita crear un archivo `.env.local` con:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc....
```

**⚠️ IMPORTANTE:**
- Reemplazar con las credenciales reales del paso 5
- Este archivo **NO** se commitea a Git (ya está en .gitignore)

---

## 7️⃣ Verificar Configuración

### Checklist:

- [ ] ✅ Proyecto creado en Supabase
- [ ] ✅ Tabla `projects` creada (ejecutaste el SQL)
- [ ] ✅ Bucket `project-images` creado y público
- [ ] ✅ Políticas de Storage configuradas (3 políticas)
- [ ] ✅ Usuario admin creado (email de Camilo)
- [ ] ✅ Credenciales enviadas al equipo (URL + Anon Key)

---

## 8️⃣ Migración de Datos Actuales (Opcional - Después)

Una vez que el CMS esté funcionando, podemos migrar los 11 proyectos actuales:

```sql
-- Ejemplo de inserción (ejecutar para cada proyecto)
INSERT INTO projects (
  title,
  description,
  video_url,
  category,
  is_featured,
  featured_order,
  display_order
) VALUES
  ('La Joya Del Pantano', 'Trailer de la historia original La Joya Del Pantano', 'https://vimeo.com/896578269', '2d', true, 1, 1),
  ('SALÚ', 'Trailer de la historia original SALÚ', 'https://vimeo.com/172426682', '2d', true, 2, 2);
  -- ... más proyectos
```

**Nota:** Las imágenes se subirán manualmente desde el panel de admin.

---

## 🆘 Troubleshooting

### "Error: relation 'projects' does not exist"
- No ejecutaste el SQL del paso 2. Ve a SQL Editor y ejecútalo.

### "Error: permission denied for table projects"
- Las políticas RLS no están bien configuradas. Revisa el paso 2.

### "Las imágenes no se ven en el sitio público"
- El bucket no es público. Ve a Storage → project-images → Settings → Asegúrate que "Public bucket" esté activado.

### "No puedo subir imágenes"
- Las políticas de Storage no están bien. Revisa el paso 3.2.

---

## 📞 Soporte

Si tienes problemas, revisa:
- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

---

## ✅ Siguiente Paso

Una vez completado esto, el equipo de frontend podrá:
- Hacer login como admin
- Crear/editar/eliminar proyectos
- Subir imágenes
- Marcar proyectos como destacados

El sitio público automáticamente mostrará los datos de Supabase.

**¡Listo! 🎉**
