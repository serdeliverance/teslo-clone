import Head from 'next/head'
import React, { FC, ReactNode } from 'react'

interface Props {
    title: string
    pageDescription: string
    imageFullUrl?: string
    children: ReactNode
}
export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
        </Head>

        <nav>
            {/* Navbar */}
        </nav>

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        {/* Footer */}
        <footer>
            {/* TODO custom footer */}
        </footer>
    </>
  )
}
