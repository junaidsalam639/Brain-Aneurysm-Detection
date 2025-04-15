import React from 'react'
import Cookies from 'js-cookie'
import HomeHeroSection from '../../components/home/HomeHeroSection'
import Layout from '../../components/layout/Layout'
import HomeUploadSection from '../../components/home/HomeUploadSection'
import HomeHowitswork from '../../components/home/HomeHowitswork'

export default function HomePage() {
    const token = Cookies.get("token");
    return (
        <>
            <Layout>
                <main className="flex-1">
                    {token ? (
                        <>
                            <HomeUploadSection />
                        </>
                    ) : (
                        <>
                            <HomeHeroSection />
                            <HomeHowitswork />
                        </>
                    )}
                </main>
            </Layout>
        </>
    )
}

