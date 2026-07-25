import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// La clave se lee de un secreto de entorno, nunca del código.
// Configúralo en Supabase: supabase secrets set RESEND_API_KEY=...
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req: Request) => {
    try {
        if (!RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY no está configurada en el entorno.");
        }
        const body = await req.json();
        const { record } = body;
        const { name, contact_method, contact_value } = record;

        if (contact_method === 'email' && contact_value) {
            console.log(`Sending email to ${contact_value}`);
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "Iglesia IJUS <contacto@ijuschile.cl>",
                    to: [contact_value],
                    subject: "¡Bienvenido a la familia IJUS!",
                    html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #1a1a1a;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #001a4d; font-size: 28px; margin: 0; font-weight: normal; letter-spacing: -0.5px;">Bienvenido a casa</h1>
                <p style="color: #666; font-size: 14px; text-transform: uppercase; tracking: 2px; margin-top: 8px;">Nos alegra que planearas tu visita</p>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 32px; margin-bottom: 32px; border: 1px solid #e2e8f0;">
                <h2 style="font-size: 20px; margin-top: 0; margin-bottom: 16px; color: #001a4d; font-weight: 500;">Hola ${name ? name : 'amigo/a'},</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #334155; margin-bottom: 24px;">Gracias por dejarnos tus datos. Nos emociona mucho saber que nos acompañarás pronto en nuestras reuniones.</p>
                
                <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                  <h3 style="font-size: 14px; text-transform: uppercase; color: #64748b; margin-top: 0; margin-bottom: 12px; letter-spacing: 1px;">Nuestros Horarios</h3>
                  <ul style="list-style-type: none; padding: 0; margin: 0; color: #0f172a; font-size: 16px;">
                    <li style="margin-bottom: 8px;">✓ <strong>Domingos:</strong> Culto General a las 11:00 am</li>
                    <li>✓ <strong>Jueves:</strong> Culto General a las 19:30 pm</li>
                  </ul>
                </div>

                <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
                  <h3 style="font-size: 14px; text-transform: uppercase; color: #64748b; margin-top: 0; margin-bottom: 12px; letter-spacing: 1px;">Dónde Estamos</h3>
                  <p style="margin: 0; color: #0f172a; font-size: 16px; line-height: 1.5;">
                    <strong>Constantino 104</strong><br>
                    Estación Central<br>
                    Santiago, Chile
                  </p>
                </div>
              </div>
              
              <div style="text-align: center;">
                <p style="font-size: 18px; color: #001a4d; font-weight: 500; font-style: italic; margin-bottom: 24px;">¡Te esperamos con los brazos abiertos!</p>
                <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                  <p style="font-size: 14px; color: #64748b; margin: 0;">Bendiciones,</p>
                  <p style="font-size: 16px; color: #001a4d; font-weight: 600; margin: 4px 0 0 0;">Familia IJUS</p>
                </div>
              </div>
            </div>
          `,
                }),
            });
            const data = await res.json();
            console.log("Resend API response:", data);
            return new Response(JSON.stringify(data), {
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Not an email or no action taken." }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        console.error("Error sending email:", err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
})
