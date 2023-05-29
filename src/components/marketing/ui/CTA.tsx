import GradientWrapper from "@/components/marketing/GradientWrapper"
import Image from "next/image"
import NavLink from "./NavLink"

const CTA = () => (
    <section>
        <GradientWrapper wrapperClassName="max-w-xs h-[13rem] top-12 inset-0">
            <div className="max-w-screen-xl mx-auto px-4 py-28 relative">
                <div className="relative z-10">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-zinc-800 text-3xl font-semibold sm:text-4xl">
                            Conoce el poder de controlar tus finanzas
                        </h2>
                        <p className="mt-5 text-zinc-600">
                            Con nuestra IA encontrarás las soluciones a tus problemas financieros, nosotros nos encargamos de la gestión de tu dinero, tu te enfocas en tus estudios
                        </p>
                    </div>
                    <div className="mt-5 flex justify-center font-medium text-sm">
                        <NavLink
                            href="/#pricing"
                            className="flex items-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 "
                        >
                            Empieza ahora
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </div>
        </GradientWrapper>
    </section>
)

export default CTA
