"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Brand from "@/components/marketing/ui/Brand"
import { signOut, useSession } from "next-auth/react"
import { ApplicationError } from "@/lib/errors"
import { useRouter } from "next/router"
import Image from "next/image"

const AvatarMenu = () => {

  const [state, setState] = useState(false)
  const profileRef = useRef<HTMLButtonElement>(null)
  const { data: session } = useSession()

  const navigation = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Objetivos", path: "/dashboard/objetivos" },
    { title: "Gastos", path: "/dashboard/gastos" },
    { title: "Presupuestos", path: "/dashboard/presupuestos" },
    { title: "FingakuAI", path: "/dashboard/ai" },

  ]


  useEffect(() => {
    const handleDropDown = (e: Event) => {
      if (profileRef.current) {
        if (!profileRef.current.contains(e.target as Node)) setState(false)
      }
    }
    document.addEventListener('click', handleDropDown)
  }, [])

  return (
    <div className="relative border-t lg:border-none">
      <div className="">
        <button ref={profileRef} className="hidden outline-none rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2 lg:block"
          onClick={() => setState(!state)}
        >
          {session?.user.image ? <Image
            src={session?.user.image}
            className="rounded-full"
            alt={`${session?.user.name || ""} profile photo`}
            width={40}
            height={40}
            unoptimized
          /> : <div className="rounded-full w-10 h-10 bg-zinc-300 items-center flex justify-center font-bold">{session?.user.name?.split("")[0]}</div>}

        </button>
      </div>
      <ul className={`bg-white top-14 right-0 mt-6 space-y-6 lg:absolute z-10 lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
        {
          navigation.map((item, id) => (
            <li key={id}>
              <a className="block text-gray-600 hover:text-gray-900 lg:hover:bg-gray-50 lg:p-3" href={item.path}>
                {item.title}
              </a>
            </li>
          ))
        }
        <button className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:hover:bg-gray-50 lg:p-3" onClick={() => { signOut().catch((err: string) => new ApplicationError(err)) }}>
          Salir de sesión
        </button>
      </ul>
    </div>
  )
}

const Navbar = () => {
  const [state, setState] = useState(false)
  const router = useRouter()

  const navigation = [
    { title: "Versión Pro", path: "/#pricing" },
    { title: "Soporte", path: "https://linkedin.com/in/kaitakami" },
  ]

  const submenuNav = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Objetivos", path: "/dashboard/objetivos" },
    { title: "Gastos", path: "/dashboard/gastos" },
    { title: "Presupuestos", path: "/dashboard/presupuestos" },
    { title: "FingakuAI", path: "/dashboard/ai" },
  ]


  return (
    <header className="text-base lg:text-sm">
      <div className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${state ? "h-full fixed inset-x-0" : ""}`}>
        <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
          <Link href="/">
            <Brand imageHeight={25} imageWidth={25} textClassName="text-lg font-bold" />
          </Link>
          <div className="lg:hidden">
            <button className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {
                state ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>

                )
              }
            </button>
          </div>
        </div>
        <div className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? "" : "hidden"}`}>
          <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0  justify-end">
            {
              navigation.map((item, id) => {
                return (
                  <li key={id}>
                    <a href={item.path} className="block text-gray-700 hover:text-gray-900">
                      {item.title}
                    </a>
                  </li>
                )
              })
            }
            <AvatarMenu />
          </ul>
        </div>
      </div>
      <nav className="border-b">
        <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
          {
            submenuNav.map((item, id) => {
              return (
                <li key={id} className={`py-1 ${router.pathname === item.path ? "border-b-2 border-blue-500" : ""}`}>
                  <a href={item.path} className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150">
                    {item.title}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
