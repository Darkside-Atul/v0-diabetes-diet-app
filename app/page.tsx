import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
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
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started</Button>
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
            Take Control of Your
            <span className="text-primary"> Diabetes Diet</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed max-w-2xl mx-auto">
            Get personalized, AI-generated recipes tailored to your dietary restrictions, calorie needs, and diabetes
            management goals. Make healthy eating simple and delicious.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free to start • No credit card required • Trusted by thousands
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Everything You Need for Better Health</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Comprehensive tools designed specifically for diabetes management and healthy living
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">👨‍🍳</span>
                <CardTitle className="text-xl">AI Recipe Generation</CardTitle>
                <CardDescription>
                  Get personalized recipes based on your dietary restrictions, preferences, and calorie goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">📅</span>
                <CardTitle className="text-xl">Meal Planning</CardTitle>
                <CardDescription>
                  Plan your meals in advance with our intelligent scheduling system that considers your lifestyle
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">🛡️</span>
                <CardTitle className="text-xl">Diabetes-Safe</CardTitle>
                <CardDescription>
                  All recipes are carefully crafted to support healthy blood sugar levels and diabetes management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">👥</span>
                <CardTitle className="text-xl">Dietary Restrictions</CardTitle>
                <CardDescription>
                  Support for vegetarian, vegan, gluten-free, and other dietary needs without compromising taste
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">⚡</span>
                <CardTitle className="text-xl">Smart Nutrition</CardTitle>
                <CardDescription>
                  Automatic calorie counting and nutritional analysis to keep you on track with your health goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-4">💚</span>
                <CardTitle className="text-xl">Health Tracking</CardTitle>
                <CardDescription>
                  Monitor your progress and see how your dietary choices impact your overall health and wellbeing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Simple Steps to Better Health</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Getting started with Diacare is easy and takes just a few minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Set Your Profile</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tell us about your dietary restrictions, calorie goals, and health preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Get AI Recipes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI generates personalized recipes that match your exact needs and taste preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Cook & Track</h3>
              <p className="text-muted-foreground leading-relaxed">
                Follow the recipes and track your progress as you build healthier eating habits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-serif font-bold mb-6 text-balance">
            Ready to Transform Your Diabetes Management?
          </h2>
          <p className="text-xl mb-8 opacity-90 text-balance leading-relaxed">
            Join thousands of people who are already living healthier lives with Diacare's personalized approach to
            diabetes-friendly nutrition.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Free Today
            </Button>
          </Link>
          <p className="text-sm mt-6 opacity-75">
            No commitment required • Cancel anytime • Your health data stays private
          </p>
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
            <p>© 2024 Diacare. All rights reserved. Made with care for your health.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
