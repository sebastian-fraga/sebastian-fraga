export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        console.log("Formulario recibido:");
        console.log(data);

        const result = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "fragasebastian1@gmail.com",
            subject: `Nuevo contacto de ${data.firstName}`,
            html: `
                <h2>Nuevo mensaje desde tu portfolio</h2>

                <p><strong>Nombre:</strong> ${data.firstName}</p>
                <p><strong>Apellido:</strong> ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Motivo:</strong> ${data.reason}</p>

                <hr>

                <p>${data.message}</p>
            `,
        });

        console.log("Respuesta de Resend:");
        console.log(JSON.stringify(result, null, 2));

        return new Response(
            JSON.stringify({
                success: true,
                result,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("ERROR EN CONTACT API:");
        console.error(error);

        return new Response(
            JSON.stringify({
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
            }),
            { status: 500 }
        );
    }
};