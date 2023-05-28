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
                <meta name='description' content="Maneja tus finanzas mientras que sacas 10" />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
