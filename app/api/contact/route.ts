import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export async function POST(request: NextRequest) {
  try {
    // Verificar si la API key está configurada
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_dummy_key_for_build') {
      return NextResponse.json(
        { error: 'API key de Resend no configurada. Por favor, configura RESEND_API_KEY en las variables de entorno.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, company, project, budget, message } = body;

    // Validación básica
    if (!name || !email || !project || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Spiriwors Contact <onboarding@resend.dev>', // Cambiar por tu dominio verificado
      to: ['hola@spiriwors.com'], // Email de destino
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">
            Nuevo mensaje de contacto - Spiriwors
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Información del cliente:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
            <p><strong>Tipo de Proyecto:</strong> ${project}</p>
            <p><strong>Presupuesto:</strong> ${budget || 'No especificado'}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #fbbf24; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Mensaje:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de Spiriwors.</p>
            <p>Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email enviado exitosamente', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API route:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
