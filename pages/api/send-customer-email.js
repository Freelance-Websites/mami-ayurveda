// API Route for sending purchase confirmation emails to customers via Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      email, 
      name, 
      phone, 
      productTitle, 
      productCategory,
      productPrice,
      deliveryUrl,
      isEbook 
    } = req.body;

    // Validate required fields
    if (!email || !name || !productTitle) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, name, and productTitle' 
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamiayurveda.com';
    const fullDeliveryUrl = deliveryUrl 
      ? (deliveryUrl.startsWith('http') ? deliveryUrl : `${baseUrl}${deliveryUrl}`)
      : '';

    // Build email content
    const deliveryContent = fullDeliveryUrl 
      ? isEbook
        ? `
          <div style="margin: 30px 0; padding: 20px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
            <h2 style="color: #15803d; margin-top: 0;">📥 Descargá tu E-book</h2>
            <p style="color: #166534; margin-bottom: 15px;">Tu e-book está listo para descargar. Hacé click en el botón de abajo:</p>
            <a href="${fullDeliveryUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Descargar E-book (PDF)
            </a>
            <p style="color: #166534; font-size: 14px; margin-top: 15px;">
              Si el botón no funciona, copiá y pegá este enlace en tu navegador:<br/>
              <a href="${fullDeliveryUrl}" style="color: #16a34a; word-break: break-all;">
                ${fullDeliveryUrl}
              </a>
            </p>
          </div>
        `
        : `
          <div style="margin: 30px 0; padding: 20px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h2 style="color: #1e40af; margin-top: 0;">🎓 Accedé a tu Curso</h2>
            <p style="color: #1e40af; margin-bottom: 15px;">Tu curso ya está disponible. Hacé click en el botón de abajo para acceder:</p>
            <a href="${fullDeliveryUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Acceder al Curso
            </a>
            <p style="color: #1e40af; font-size: 14px; margin-top: 15px;">
              Si el botón no funciona, copiá y pegá este enlace en tu navegador:<br/>
              <a href="${fullDeliveryUrl}" style="color: #2563eb; word-break: break-all;">
                ${fullDeliveryUrl}
              </a>
            </p>
          </div>
        `
      : `
          <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0;">
              Te enviaremos las instrucciones de acceso dentro de las próximas 24 horas hábiles.
            </p>
          </div>
        `;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">✨ ¡Gracias por tu compra!</h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                      Hola <strong>${name}</strong>,
                    </p>
                    
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                      ¡Tu compra se ha procesado exitosamente! Gracias por confiar en Mami Ayurveda.
                    </p>

                    <!-- Product Details -->
                    <div style="margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <h2 style="color: #111827; margin-top: 0; font-size: 18px;">📦 Detalles de tu compra</h2>
                      <table width="100%" style="font-size: 15px; color: #4b5563;">
                        <tr>
                          <td style="padding: 8px 0;"><strong>Producto:</strong></td>
                          <td style="padding: 8px 0;">${productTitle}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;"><strong>Tipo:</strong></td>
                          <td style="padding: 8px 0;">${productCategory}</td>
                        </tr>
                        ${productPrice ? `
                        <tr>
                          <td style="padding: 8px 0;"><strong>Precio:</strong></td>
                          <td style="padding: 8px 0;">$${productPrice.toLocaleString('es-AR')} ARS</td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>

                    <!-- Delivery Content (Download/Access) -->
                    ${deliveryContent}

                    <!-- Contact Info -->
                    <div style="margin: 30px 0; padding: 20px; background-color: #f0f9ff; border-radius: 8px;">
                      <h3 style="color: #0369a1; margin-top: 0; font-size: 16px;">💬 ¿Tenés alguna duda?</h3>
                      <p style="color: #0c4a6e; margin: 0; font-size: 14px;">
                        Si tenés alguna pregunta o problema, no dudes en contactarnos:<br/>
                        <a href="https://www.instagram.com/mami.ayurveda" style="color: #0284c7; text-decoration: none;">
                          📱 Instagram: @mami.ayurveda
                        </a>
                      </p>
                    </div>

                    <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-top: 30px;">
                      ¡Que disfrutes tu ${isEbook ? 'e-book' : 'curso'}! 🌿
                    </p>
                    
                    <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 0;">
                      Con cariño,<br/>
                      <strong style="color: #16a34a;">Mami Ayurveda</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 12px 12px; text-align: center;">
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                      Este email fue enviado a ${email}<br/>
                      © ${new Date().getFullYear()} Mami Ayurveda. Todos los derechos reservados.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Mami Ayurveda <onboarding@resend.dev>',
      to: [email],
      subject: `✨ Tu compra: ${productTitle}`,
      html: emailHtml,
    });

    console.log('Email sent successfully to customer:', data);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      emailId: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return res.status(500).json({
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
