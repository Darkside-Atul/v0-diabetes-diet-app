"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💚</span>
            <h1 className="text-2xl font-serif font-bold text-foreground">Diacare</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("common.features")}
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("common.howItWorks")}
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("common.about")}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                {t("common.signIn")}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">{t("common.getStarted")}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            {t("homepage.hero.badge")}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-balance mb-6 leading-tight">
            {t("homepage.hero.title")}
            <span className="text-primary"> {t("homepage.hero.titleHighlight")}</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed max-w-2xl mx-auto">
            {t("homepage.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                {t("homepage.hero.startJourney")}
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                {t("common.learnMore")}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">{t("homepage.hero.freeStart")}</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">{t("homepage.features.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {t("homepage.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">👨‍🍳</span>
                <CardTitle className="text-xl">{t("homepage.features.aiRecipes.title")}</CardTitle>
                <CardDescription>{t("homepage.features.aiRecipes.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">📅</span>
                <CardTitle className="text-xl">{t("homepage.features.mealPlanning.title")}</CardTitle>
                <CardDescription>{t("homepage.features.mealPlanning.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">🛡️</span>
                <CardTitle className="text-xl">{t("homepage.features.diabetesSafe.title")}</CardTitle>
                <CardDescription>{t("homepage.features.diabetesSafe.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">👥</span>
                <CardTitle className="text-xl">{t("homepage.features.dietaryRestrictions.title")}</CardTitle>
                <CardDescription>{t("homepage.features.dietaryRestrictions.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">⚡</span>
                <CardTitle className="text-xl">{t("homepage.features.smartNutrition.title")}</CardTitle>
                <CardDescription>{t("homepage.features.smartNutrition.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">💚</span>
                <CardTitle className="text-xl">{t("homepage.features.healthTracking.title")}</CardTitle>
                <CardDescription>{t("homepage.features.healthTracking.description")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">{t("homepage.howItWorks.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {t("homepage.howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("homepage.howItWorks.step1.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("homepage.howItWorks.step1.description")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("homepage.howItWorks.step2.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("homepage.howItWorks.step2.description")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">{t("homepage.howItWorks.step3.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("homepage.howItWorks.step3.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-serif font-bold mb-6 text-balance">{t("homepage.cta.title")}</h2>
          <p className="text-xl mb-8 opacity-90 text-balance leading-relaxed">{t("homepage.cta.subtitle")}</p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              {t("common.startFree")}
            </Button>
          </Link>
          <p className="text-sm mt-6 opacity-75">{t("homepage.cta.noCommitment")}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-xl">💚</span>
              <span className="text-lg font-serif font-semibold">Diacare</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                {t("common.privacyPolicy")}
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                {t("common.termsOfService")}
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                {t("common.contact")}
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>{t("homepage.footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
