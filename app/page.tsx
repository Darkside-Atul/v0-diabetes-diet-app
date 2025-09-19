"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💚</span>
            <h1 className="text-2xl font-serif font-bold text-foreground">{t("home.title")}</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">{t("home.getStarted")}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            AI-Powered Diabetes Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-balance mb-6 leading-tight">
            {t("home.subtitle")}
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed max-w-2xl mx-auto">
            {t("home.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                {t("home.getStarted")}
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                {t("home.learnMore")}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">Start your journey to better health today</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">{t("features.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Comprehensive tools designed specifically for diabetes management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">👨‍🍳</span>
                <CardTitle className="text-xl">{t("features.recipes.title")}</CardTitle>
                <CardDescription>{t("features.recipes.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">📅</span>
                <CardTitle className="text-xl">{t("features.planning.title")}</CardTitle>
                <CardDescription>{t("features.planning.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">🛡️</span>
                <CardTitle className="text-xl">{t("features.tracking.title")}</CardTitle>
                <CardDescription>{t("features.tracking.description")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-serif font-bold mb-6 text-balance">Ready to Transform Your Health?</h2>
          <p className="text-xl mb-8 opacity-90 text-balance leading-relaxed">
            Join thousands who are already managing their diabetes with confidence
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Free Today
            </Button>
          </Link>
          <p className="text-sm mt-6 opacity-75">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-xl">💚</span>
              <span className="text-lg font-serif font-semibold">{t("home.title")}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 DiaCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
