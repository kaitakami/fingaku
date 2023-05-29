import SectionWrapper from "@/components/marketing/SectionWrapper"
import GradientWrapper from "@/components/marketing/GradientWrapper"

import Image from "next/image"

const testimonials = [
    {
        avatar: "/testimonial/user6.webp",
        name: "María Rodríguez",
        title: "Estudiante de Economía en la Universidad de Buenos Aires",
        quote: "Fingaku ha sido una herramienta increíble para mi vida financiera como estudiante. Me ha ayudado a establecer metas realistas, realizar un seguimiento de mis gastos y ahorrar de manera efectiva. ¡Recomendaría Fingaku a todos mis compañeros de universidad!"
    },
    {
        avatar: "/testimonial/user6.webp",
        name: "Diego López",
        title: "Estudiante de Ingeniería en la Universidad Nacional Autónoma de México",
        quote: "Como estudiante, administrar mis finanzas siempre ha sido un desafío. Sin embargo, desde que comencé a usar Fingaku, he sentido un gran alivio. La aplicación es fácil de usar, me permite controlar mis gastos y me motiva a alcanzar mis metas financieras. ¡No puedo imaginar mi vida universitaria sin Fingaku!"
    },
    {
        avatar: "/testimonial/user6.webp",
        name: "Carolina Fernandez",
        title: "Estudiante de Administración en la Pontificia Universidad Católica de Chile",
        quote: "Fingaku ha sido mi compañero constante en mi viaje financiero como estudiante. Me ha brindado las herramientas necesarias para organizar mis finanzas, establecer metas y tomar decisiones informadas. ¡Gracias a Fingaku, estoy más segura y confiada en mi futuro financiero!"
    },
    {
        avatar: "/testimonial/user6.webp",
        name: "Andrés Morales",
        title: "Estudiante de Contabilidad en la Universidad de São Paulo",
        quote: "Fingaku ha cambiado completamente la forma en que manejo mis finanzas como estudiante. La aplicación es fácil de usar, me proporciona una visión clara de mi situación financiera y me ayuda a alcanzar mis objetivos. ¡Estoy realmente impresionado y agradecido por esta increíble herramienta!"
    },
    {
        avatar: "/testimonial/user6.webp",
        name: "Isabela Silva",
        title: "Estudiante de Comunicación en la Universidad de la República de Uruguay",
        quote: "Fingaku ha sido mi salvación en el caos financiero universitario. Me ha permitido establecer presupuestos, ahorrar dinero y tener una mejor comprensión de mis gastos. Es una herramienta imprescindible para cualquier estudiante que desee tener un control financiero sólido y alcanzar sus metas."
    },
    {
        avatar: "/testimonial/user6.webp",
        name: "Ricardo González",
        title: "Estudiante de Derecho en la Universidad de Buenos Aires",
        quote: "Fingaku ha transformado mi relación con el dinero como estudiante. Me ha ayudado a administrar mis finanzas de manera eficiente, ahorrar dinero y estar más consciente de mis gastos. Es una aplicación esencial para cualquier estudiante que desee tener éxito en su vida financiera."
    }
];

const Testimonial = () => {

    return (
        <SectionWrapper>
            <div id="testimonials" className="max-w-screen-xl mx-auto px-4 text-zinc-500">
                <div className="max-w-2xl text-center md:mx-auto">
                    <h2 className="text-zinc-800 text-3xl font-semibold sm:text-4xl">
                        Fingaku es amado por estudiantes alrededor del mundo
                    </h2>
                </div>
                <GradientWrapper wrapperClassName="max-w-sm h-40 top-12 inset-x-0" className="mt-12">
                    <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
                        {
                            testimonials.map((item, idx) => (
                                <li key={idx} className="p-4 rounded-xl border border-zinc-300"
                                    style={{
                                        backgroundImage: "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)"
                                    }}
                                >
                                    <figure className="flex flex-col justify-between gap-y-6 h-full">
                                        <blockquote className="">
                                            <p className="">
                                                {item.quote}
                                            </p>
                                        </blockquote>
                                        <div className="flex items-center gap-x-4 relative">
                                            <Image
                                                src={item.avatar}
                                                alt={item.name}
                                                className="rounded-full object-contain"
                                                width={50}
                                                height={50}
                                            />
                                            <div>
                                                <span className="block text-zinc-800 font-semibold">{item.name}</span>
                                                <span className="block text-sm mt-0.5">{item.title}</span>
                                            </div>
                                        </div>
                                    </figure>
                                </li>
                            ))
                        }
                    </ul>
                </GradientWrapper>
            </div>
        </SectionWrapper>
    )
}

export default Testimonial
