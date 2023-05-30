import React, { type ReactNode } from 'react';
import Head from "next/head"
import Footer from "@/components/marketing/ui/Footer"
import Navbar from "@/components/marketing/ui/Navbar"

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
            </Head>
            <div className='min-h-screen flex flex-col justify-between'>
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout
