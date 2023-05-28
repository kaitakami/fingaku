import SectionWrapper from "@/components/marketing/SectionWrapper"
import Image from "next/image"

const VisualFeatures = () => {

    const features = [
        {
            title: "Accesible para todos",
            desc: "Casi todas las funcionalidades son gratuitas, no buscamos generar ingresos con Fingaku, solo lo necesario para sobrevivir.",
            img: "/images/Feature-1.svg"
        },
        {
            title: "Actualizado al 2023",
            desc: "Sabemos que la IA está revolucionando el mundo, no nos quedamos atrás. Pregúnta a la Inteligencia Artificial y recibe consejos.",
            img: "images/Feature-2.svg"
        },
    ]
    return (
        <SectionWrapper>
            <div className="custom-screen text-zinc-600">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-zinc-800 text-3xl font-semibold sm:text-4xl">
                        Lleva tus finanzas al siguiente nivel con Fingaku
                    </h2>
                    <p className="mt-3">
                        Hecho por estudiantes para estudiantes, sabemos lo díficil que puede ser manejar tus gastos como estudiante, estamos aquí para ayudarte
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                        {
                            features.map((item, idx) => (
                                <li className="flex-1 flex flex-col justify-between border border-zinc-800 rounded-2xl" key={idx}
                                    style={{
                                        background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(214, 214, 214, 0.5) 0%, rgba(190, 190, 190, 0.2) 57.72%)"
                                    }}
                                >
                                    <div className="p-8">
                                        <h3 className="text-zinc-800 text-xl font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 sm:text-sm md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="pl-8 relative">
                                        <Image
                                            src={item.img}
                                            className="w-full ml-auto object-cover"
                                            alt={item.title}
                                            fill
                                        />
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default VisualFeatures
