import SectionWrapper from "@/components/marketing/SectionWrapper"

const faqsList = [
    {
        q: "¿Cómo puede Fingaku ayudarme a alcanzar mis metas financieras?",
        a: "Fingaku te proporciona herramientas y recursos para establecer y alcanzar tus metas financieras. Nuestro software te permite realizar un seguimiento de tus ingresos y gastos, crear presupuestos personalizados y visualizar fácilmente tus números.",
    },
    {
        q: "¿Puedo utilizar Fingaku para automatizar mis ingresos y gastos?",
        a: "Sí, Fingaku ofrece funciones de automatización. Esto te ayuda a tener una visión clara de tus finanzas y a tomar decisiones informadas sobre cómo administrar tu dinero.",
    },
    {
        q: "¿Cómo puedo obtener soporte en caso de tener alguna pregunta o problema?",
        a: "En Fingaku, estamos comprometidos a brindarte soporte las 24 horas del día, los 7 días de la semana. Puedes envíarnos un correo o contactarnos por redes sociales. Estaremos encantados de ayudarte con cualquier pregunta o problema que puedas tener.",
    },
    {
        q: "¿Fingaku es adecuado solo para estudiantes o también puede ser utilizado por otros grupos?",
        a: "Aunque Fingaku está diseñado específicamente para estudiantes, cualquier persona que desee administrar sus finanzas de manera efectiva puede beneficiarse de nuestra aplicación.",
    },
    {
        q: "¿Puedo establecer metas financieras personalizadas con Fingaku?",
        a: "¡Absolutamente! Fingaku te permite establecer metas financieras personalizadas según tus objetivos individuales. Puedes establecer metas de ahorro, metas de pago de deudas o cualquier otra meta financiera que desees lograr.",
    },
    {
        q: "¿Cómo puedo comenzar a utilizar Fingaku?",
        a: "Para comenzar a utilizar Fingaku, simplemente crea una cuenta desde nuestro sitio web.",
    }
];

const FAQs = () => (
    <SectionWrapper id="faqs">
        <div className="custom-screen text-zinc-600">
            <div className="max-w-xl text-center xl:mx-auto">
                <h2 className="text-zinc-800 text-3xl font-extrabold sm:text-4xl">
                    Todo lo que necesitas saber
                </h2>
                <p className="mt-3">
                    Estas son las preguntas que más nos hacen
                </p>
            </div>
            <div className='mt-12'>
                <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
                    {faqsList.map((item, idx) => (
                        <li
                            key={idx}
                            className="space-y-3"
                        >
                            <summary
                                className="flex items-center justify-between font-semibold text-zinc-500">
                                {item.q}
                            </summary>
                            <p
                                dangerouslySetInnerHTML={{ __html: item.a }}
                                className='leading-relaxed'>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </SectionWrapper>
)

export default FAQs
