import type React from "react"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import { Suspense } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})

const locales = ["en", "es", "fr", "de", "zh", "ar", "hi", "uz", "ru"]

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = await getMessages()
  const title = (messages as any).homepage?.title || "Diacare - Diabetes Diet Management"
  const description =
    (messages as any).homepage?.description ||
    "AI-powered diabetes diet management app that creates personalized recipes based on your dietary restrictions and calorie needs."

  return {
    title,
    description,
    generator: "v0.app",
    keywords: ["diabetes", "diet", "nutrition", "AI", "recipes", "health"],
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`font-sans ${inter.variable} ${workSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
