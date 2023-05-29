import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import NavHeader from './NavHeader'
import NavLink from './NavLink'
import { useSession } from 'next-auth/react'

const Navbar = () => {

    const [state, setState] = useState(false)
    const menuBtnEl = useRef<HTMLButtonElement>(null)
    const { status: sessionStatus } = useSession()

    const navigation = [
        { name: "Características", href: "/#caracteristicas" },
        { name: "Precios", href: "/#pricing" },
        { name: "Testimonios", href: "/#testimonials" },
        { name: "Q&A", href: "/#faqs" },
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target as Node
            if (menuBtnEl.current) {
                if (!menuBtnEl.current.contains(target)) setState(false);
            }
        };
    }, [])

    return (
        <header className='relative'>
            <div className="max-w-screen-xl mx-auto px-4 md:hidden">
                <NavHeader menuBtnEl={menuBtnEl} state={state} onClick={() => setState(!state)} />
            </div>
            <nav className={`pb-5 md:text-sm md:static md:block ${state ? "bg-zinc-200 absolute z-20 top-0 inset-x-0 rounded-b-2xl shadow-xl md:bg-transparent" : "hidden"}`}>
                <div className="max-w-screen-xl mx-auto px-4 items-center md:flex">
                    <NavHeader state={state} onClick={() => setState(!state)} />
                    <div className={`flex-1 items-center mt-8 text-zinc-500 md:font-medium md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                        <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, id) => {
                                    return (
                                        <li key={id} className="hover:text-zinc-600">
                                            <Link href={item.href} className="block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                            {sessionStatus === "authenticated" ? <Link href="/dashboard" className="block hover:text-zinc-800">
                                Dashboard
                            </Link>
                                : <>
                                    <Link href="/signin" className="block hover:text-zinc-800">
                                        Inicia sesión
                                    </Link>
                                    <NavLink href="/pricing" className="flex items-center justify-center gap-x-1 text-sm text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 md:inline-flex">
                                        Comienza ahora
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </NavLink></>}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
