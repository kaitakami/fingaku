import React, { type ReactNode } from 'react';
import Head from "next/head"
import Navbar from "@/components/app/ui/Navbar"

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Fingaku - Dashboard</title>
        <meta name='description' content="Maneja tus finanzas mientras que sacas 10" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
