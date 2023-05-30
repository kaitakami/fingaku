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
        <title>Fingaku</title>
        <meta property="og:title" content="Fingaku" />
        <meta property="og:site_name" content="Fingaku" />
        <meta property="og:url" content="https://fingaku.kaitakami.dev" />
        <meta property="og:description" content="Maneja tus finanzas mientras que sacas 10" />
        <meta property="og:type" content="" />
        <meta property="og:image" content="https://fingaku.kaitakami.dev/images/og.png" />
        <link rel='icon' href='/favicon.ico' />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
