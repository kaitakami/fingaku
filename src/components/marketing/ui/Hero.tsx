import GradientWrapper from "@/components/marketing/GradientWrapper"
import Image from "next/image"
import NavLink from "./NavLink"

const Hero = () => (
    <section>
        <div className="max-w-screen-xl mx-auto px-4 py-28">
            <div>
                <div className="space-y-5 max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl"
                        style={{
                            backgroundImage: "linear-gradient(179.1deg, #000000 0.77%, rgba(100, 100, 100, 100) 182.09%)"
                        }}
                    >
                        Maneja tus finanzas mientras que sacas 10
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-500">
                        Gana control sobre tu dinero, automatiza tus gastos e ingresos y todo de manera fácil
                    </p>
                    <div className="flex justify-center font-medium text-sm">
                        <NavLink
                            href="/signin"
                            className="flex items-center text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 "
                        >
                            Inicia ahora
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </NavLink>
                    </div>
                </div>
                <GradientWrapper className="mt-16 sm:mt-28 relative" wrapperClassName="max-w-3xl h-[250px] inset-0 sm:h-[300px] lg:h-[650px]">
                    <div
                        className="h-[250px] sm:h-[300px] md:h-[650px] w-full m-auto"
                    >
                        <Image
                            src={"/images/hero.svg"}
                            className="shadow-lg rounded-2xl object-cover"
                            alt="Fingaku"
                            fill
                        />
                    </div>
                </GradientWrapper>
            </div>
        </div>
    </section>
)

export default Hero
