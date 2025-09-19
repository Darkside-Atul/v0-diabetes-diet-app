import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es", "fr", "de", "zh", "ar", "hi", "uz", "ru"],

  // Used when no locale matches
  defaultLocale: "en",

  // Always use locale prefix
  localePrefix: "always",
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|en|es|fr|zh|ar|hi|uz|ru)/:path*"],
}
