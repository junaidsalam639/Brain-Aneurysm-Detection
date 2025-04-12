import React from 'react'
import HomeHeroSection from '../../components/home/HomeHeroSection'
import Layout from '../../components/layout/Layout'
import HomeUploadSection from '../../components/home/HomeUploadSection'
import HomeHowitswork from '../../components/home/HomeHowitswork'

export default function HomePage() {
    return (
        <>
            <Layout>
                <main className="flex-1">
                    <HomeHeroSection />
                    <HomeUploadSection />
                    <HomeHowitswork />
                </main>
            </Layout>
        </>
    )
}

