# 🚀 Configuración del Formulario de Contacto con Resend

## ✅ Estado actual
El formulario está **completamente implementado** y listo para funcionar. Solo necesitas configurar tu API key de Resend.

## 🔧 Pasos para activar el formulario:

### 1. Crear cuenta en Resend
- Ve a [resend.com](https://resend.com)
- Crea una cuenta gratuita
- Verifica tu email

### 2. Obtener API Key
- En el dashboard, ve a "API Keys"
- Crea una nueva API key
- Copia la key (empieza con `re_`)

### 3. Configurar variables de entorno
```bash
# Copia el template
cp env.template .env.local

# Edita .env.local y agrega tu API key
RESEND_API_KEY=re_tu_api_key_aqui
CONTACT_EMAIL=hola@spiriwors.com
```

### 4. Reiniciar el servidor
```bash
npm run dev
```

## 📧 Características implementadas:

✅ **API Route** en `/app/api/contact/route.ts`
✅ **Validación robusta** con react-hook-form + zod
✅ **Estados de carga** con spinner animado
✅ **Mensajes de éxito/error** con iconos
✅ **Email HTML profesional** con diseño responsive
✅ **Validación del lado del servidor**
✅ **Manejo de errores** completo
✅ **Logging** para debugging

## 🎨 El email incluye:
- Información del cliente organizada
- Mensaje formateado
- Fecha y hora (zona horaria Colombia)
- Diseño profesional con colores de Spiriwors

## 🔧 Para desarrollo:
1. Agrega tu API key en `.env.local`
2. Reinicia el servidor: `npm run dev`
3. Prueba el formulario en `http://localhost:3001`

## 🚀 Para producción:
1. Agrega las variables de entorno en tu plataforma de hosting
2. Opcional: Verifica tu dominio en Resend
3. ¡Listo!

## 📊 Plan gratuito de Resend:
- **3,000 emails/mes** gratis
- **100 emails/día** gratis
- Sin límite de tiempo
- Soporte por email

## 🧪 Prueba el formulario:
1. Ve a `http://localhost:3001`
2. Navega hasta la sección de contacto
3. Llena el formulario
4. Sin API key: Verás mensaje de error (esperado)
5. Con API key: Email enviado exitosamente

¡El formulario está prácticamente listo! Solo falta la API key de Resend.
