import SectionWrapper from "@/components/marketing/SectionWrapper";
import Button from "./Button";

const Pricing = () => {

    const plans = [
        {
            name: "Basic",
            desc: "Para el estudiante",
            price: 0,
            isMostPop: false,
            features: [
                "Crea presupuestos",
                "Establece metas financieras",
                "Automatiza tus gastos y ganancias",
                "Analíticas",
                "Soporte 24 / 7",
                "Accede desde donde quieras",
            ],
        },
        {
            name: "Pro",
            desc: "Para aquellos que quieren lo mejor",
            price: 1.9,
            isMostPop: true,
            features: [
                "Crea presupuestos",
                "Establece metas financieras",
                "Automatiza tus gastos y ganancias",
                "Analíticas",
                "Soporte 24 / 7",
                "Usa nuestra inteligencia artificial"
            ],
        },
    ];

    return (
        <SectionWrapper id="pricing" className='max-w-screen-xl mx-auto px-4'>
            <div className='relative max-w-xl mx-auto text-center'>
                <h2 className='text-zinc-800 text-3xl font-semibold sm:text-4xl'>
                    Paga solo por lo que usas
                </h2>
            </div>
            <div className='mt-16 justify-center gap-6 flex flex-col sm:flex-row sm:space-y-0'>
                {
                    plans.map((item, idx) => (
                        <div key={idx} className={`relative flex-1 flex items-stretch flex-col rounded-xl border border-zinc-300 mt-6 sm:mt-0 max-w-sm ${item.isMostPop ? "border border-blue-500 bg-gradient-to-br from-zinc-900 to-gray-800" : ""}`}
                        >
                            <div className="p-8 space-y-4 border-b border-zinc-400 text-center">
                                <span className='text-blue-600 font-medium'>
                                    {item.name}
                                </span>
                                <div className={`text-3xl font-semibold ${item.isMostPop ? "text-white" : "text-zinc-800"}`}>
                                    ${item.price} <span className="text-xl text-zinc-400 font-normal">/mo</span>
                                </div>
                                <p className={item.isMostPop ? "text-zinc-300" : "text-zinc-500"}>
                                    {item.desc}
                                </p>
                            </div>
                            <div className="p-8">
                                <ul className='space-y-3'>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className={`flex items-center gap-5 ${item.isMostPop ? "text-zinc-200" : "text-zinc-500"}`}>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='h-5 w-5 text-blue-600'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'>
                                                    <path
                                                        fill-rule='evenodd'
                                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                        clipRule='evenodd'></path>
                                                </svg>
                                                {featureItem}
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="pt-8">
                                    <Button className={`w-full rounded-full text-white ring-offset-2 focus:ring ${item.isMostPop ? "bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 ring-blue-600" : "bg-gray-800 hover:bg-gray-700 ring-gray-800"}`}>
                                        Iniciar ahora
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </SectionWrapper>
    );
};

export default Pricing
