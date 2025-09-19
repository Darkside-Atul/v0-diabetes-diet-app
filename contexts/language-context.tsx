"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "fr" | "de" | "zh" | "ar" | "hi" | "uz" | "ru"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.recipes": "Recipes",
    "nav.mealPlan": "Meal Plan",
    "nav.profile": "Profile",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "Your Personal Diabetes Diet Companion",
    "home.description":
      "Take control of your diabetes with personalized meal plans, blood sugar tracking, and AI-powered recipe suggestions tailored to your dietary needs.",
    "home.getStarted": "Get Started",
    "home.learnMore": "Learn More",

    // Features
    "features.title": "Everything You Need to Manage Your Diabetes Diet",
    "features.tracking.title": "Blood Sugar Tracking",
    "features.tracking.description": "Monitor your glucose levels and see how different foods affect your blood sugar.",
    "features.recipes.title": "AI Recipe Generator",
    "features.recipes.description":
      "Get personalized, diabetes-friendly recipes based on your preferences and restrictions.",
    "features.planning.title": "Meal Planning",
    "features.planning.description": "Plan your weekly meals with automatic carb counting and nutritional analysis.",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome back!",
    "dashboard.bloodSugar": "Blood Sugar",
    "dashboard.todaysMeals": "Today's Meals",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.generateRecipe": "Generate Recipe",
    "dashboard.viewMealPlan": "View Meal Plan",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.close": "Close",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.dashboard": "Panel",
    "nav.recipes": "Recetas",
    "nav.mealPlan": "Plan de Comidas",
    "nav.profile": "Perfil",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "Tu Compañero Personal de Dieta para Diabetes",
    "home.description":
      "Toma control de tu diabetes con planes de comida personalizados, seguimiento de azúcar en sangre y sugerencias de recetas con IA adaptadas a tus necesidades dietéticas.",
    "home.getStarted": "Comenzar",
    "home.learnMore": "Saber Más",

    // Features
    "features.title": "Todo lo que Necesitas para Manejar tu Dieta Diabética",
    "features.tracking.title": "Seguimiento de Azúcar en Sangre",
    "features.tracking.description":
      "Monitorea tus niveles de glucosa y ve cómo diferentes alimentos afectan tu azúcar en sangre.",
    "features.recipes.title": "Generador de Recetas IA",
    "features.recipes.description":
      "Obtén recetas personalizadas y amigables para diabéticos basadas en tus preferencias y restricciones.",
    "features.planning.title": "Planificación de Comidas",
    "features.planning.description":
      "Planifica tus comidas semanales con conteo automático de carbohidratos y análisis nutricional.",

    // Dashboard
    "dashboard.title": "Panel",
    "dashboard.welcome": "¡Bienvenido de vuelta!",
    "dashboard.bloodSugar": "Azúcar en Sangre",
    "dashboard.todaysMeals": "Comidas de Hoy",
    "dashboard.recentActivity": "Actividad Reciente",
    "dashboard.generateRecipe": "Generar Receta",
    "dashboard.viewMealPlan": "Ver Plan de Comidas",

    // Common
    "common.loading": "Cargando...",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.close": "Cerrar",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.dashboard": "Tableau de Bord",
    "nav.recipes": "Recettes",
    "nav.mealPlan": "Plan de Repas",
    "nav.profile": "Profil",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "Votre Compagnon Personnel de Régime Diabétique",
    "home.description":
      "Prenez le contrôle de votre diabète avec des plans de repas personnalisés, le suivi de la glycémie et des suggestions de recettes alimentées par l'IA adaptées à vos besoins alimentaires.",
    "home.getStarted": "Commencer",
    "home.learnMore": "En Savoir Plus",

    // Features
    "features.title": "Tout ce dont Vous Avez Besoin pour Gérer Votre Régime Diabétique",
    "features.tracking.title": "Suivi de la Glycémie",
    "features.tracking.description":
      "Surveillez vos niveaux de glucose et voyez comment différents aliments affectent votre glycémie.",
    "features.recipes.title": "Générateur de Recettes IA",
    "features.recipes.description":
      "Obtenez des recettes personnalisées et adaptées aux diabétiques basées sur vos préférences et restrictions.",
    "features.planning.title": "Planification des Repas",
    "features.planning.description":
      "Planifiez vos repas hebdomadaires avec comptage automatique des glucides et analyse nutritionnelle.",

    // Dashboard
    "dashboard.title": "Tableau de Bord",
    "dashboard.welcome": "Bon retour !",
    "dashboard.bloodSugar": "Glycémie",
    "dashboard.todaysMeals": "Repas d'Aujourd'hui",
    "dashboard.recentActivity": "Activité Récente",
    "dashboard.generateRecipe": "Générer une Recette",
    "dashboard.viewMealPlan": "Voir le Plan de Repas",

    // Common
    "common.loading": "Chargement...",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.close": "Fermer",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.dashboard": "Dashboard",
    "nav.recipes": "Rezepte",
    "nav.mealPlan": "Essensplan",
    "nav.profile": "Profil",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "Ihr Persönlicher Diabetes-Diät-Begleiter",
    "home.description":
      "Übernehmen Sie die Kontrolle über Ihren Diabetes mit personalisierten Essensplänen, Blutzucker-Tracking und KI-gestützten Rezeptvorschlägen, die auf Ihre Ernährungsbedürfnisse zugeschnitten sind.",
    "home.getStarted": "Loslegen",
    "home.learnMore": "Mehr Erfahren",

    // Features
    "features.title": "Alles was Sie zur Verwaltung Ihrer Diabetes-Diät Brauchen",
    "features.tracking.title": "Blutzucker-Tracking",
    "features.tracking.description":
      "Überwachen Sie Ihre Glukosewerte und sehen Sie, wie verschiedene Lebensmittel Ihren Blutzucker beeinflussen.",
    "features.recipes.title": "KI-Rezeptgenerator",
    "features.recipes.description":
      "Erhalten Sie personalisierte, diabetikerfreundliche Rezepte basierend auf Ihren Vorlieben und Einschränkungen.",
    "features.planning.title": "Essensplanung",
    "features.planning.description":
      "Planen Sie Ihre wöchentlichen Mahlzeiten mit automatischer Kohlenhydratzählung und Nährwertanalyse.",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Willkommen zurück!",
    "dashboard.bloodSugar": "Blutzucker",
    "dashboard.todaysMeals": "Heutige Mahlzeiten",
    "dashboard.recentActivity": "Letzte Aktivität",
    "dashboard.generateRecipe": "Rezept Generieren",
    "dashboard.viewMealPlan": "Essensplan Anzeigen",

    // Common
    "common.loading": "Laden...",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",
    "common.close": "Schließen",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.dashboard": "仪表板",
    "nav.recipes": "食谱",
    "nav.mealPlan": "膳食计划",
    "nav.profile": "个人资料",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "您的个人糖尿病饮食伴侣",
    "home.description": "通过个性化膳食计划、血糖跟踪和根据您的饮食需求定制的AI食谱建议，控制您的糖尿病。",
    "home.getStarted": "开始使用",
    "home.learnMore": "了解更多",

    // Features
    "features.title": "管理糖尿病饮食所需的一切",
    "features.tracking.title": "血糖跟踪",
    "features.tracking.description": "监测您的血糖水平，了解不同食物如何影响您的血糖。",
    "features.recipes.title": "AI食谱生成器",
    "features.recipes.description": "根据您的偏好和限制获得个性化的糖尿病友好食谱。",
    "features.planning.title": "膳食规划",
    "features.planning.description": "规划您的每周膳食，自动计算碳水化合物和营养分析。",

    // Dashboard
    "dashboard.title": "仪表板",
    "dashboard.welcome": "欢迎回来！",
    "dashboard.bloodSugar": "血糖",
    "dashboard.todaysMeals": "今日膳食",
    "dashboard.recentActivity": "最近活动",
    "dashboard.generateRecipe": "生成食谱",
    "dashboard.viewMealPlan": "查看膳食计划",

    // Common
    "common.loading": "加载中...",
    "common.save": "保存",
    "common.cancel": "取消",
    "common.delete": "删除",
    "common.edit": "编辑",
    "common.close": "关闭",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.dashboard": "لوحة التحكم",
    "nav.recipes": "الوصفات",
    "nav.mealPlan": "خطة الوجبات",
    "nav.profile": "الملف الشخصي",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "رفيقك الشخصي لحمية السكري",
    "home.description":
      "تحكم في مرض السكري مع خطط الوجبات المخصصة، وتتبع السكر في الدم، واقتراحات الوصفات المدعومة بالذكاء الاصطناعي المصممة لاحتياجاتك الغذائية.",
    "home.getStarted": "ابدأ الآن",
    "home.learnMore": "اعرف المزيد",

    // Features
    "features.title": "كل ما تحتاجه لإدارة حمية السكري",
    "features.tracking.title": "تتبع السكر في الدم",
    "features.tracking.description": "راقب مستويات الجلوكوز واكتشف كيف تؤثر الأطعمة المختلفة على سكر الدم.",
    "features.recipes.title": "مولد الوصفات بالذكاء الاصطناعي",
    "features.recipes.description": "احصل على وصفات مخصصة ومناسبة لمرضى السكري بناءً على تفضيلاتك وقيودك.",
    "features.planning.title": "تخطيط الوجبات",
    "features.planning.description": "خطط لوجباتك الأسبوعية مع عد الكربوهيدرات التلقائي والتحليل الغذائي.",

    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.welcome": "مرحباً بعودتك!",
    "dashboard.bloodSugar": "سكر الدم",
    "dashboard.todaysMeals": "وجبات اليوم",
    "dashboard.recentActivity": "النشاط الأخير",
    "dashboard.generateRecipe": "إنشاء وصفة",
    "dashboard.viewMealPlan": "عرض خطة الوجبات",

    // Common
    "common.loading": "جاري التحميل...",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.close": "إغلاق",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.dashboard": "डैशबोर्ड",
    "nav.recipes": "रेसिपी",
    "nav.mealPlan": "भोजन योजना",
    "nav.profile": "प्रोफाइल",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "आपका व्यक्तिगत मधुमेह आहार साथी",
    "home.description":
      "व्यक्तिगत भोजन योजनाओं, रक्त शर्करा ट्रैकिंग, और आपकी आहार आवश्यकताओं के अनुकूल AI-संचालित रेसिपी सुझावों के साथ अपने मधुमेह को नियंत्रित करें।",
    "home.getStarted": "शुरू करें",
    "home.learnMore": "और जानें",

    // Features
    "features.title": "आपके मधुमेह आहार को प्रबंधित करने के लिए आवश्यक सब कुछ",
    "features.tracking.title": "रक्त शर्करा ट्रैकिंग",
    "features.tracking.description":
      "अपने ग्लूकोज स्तर की निगरानी करें और देखें कि विभिन्न खाद्य पदार्थ आपकी रक्त शर्करा को कैसे प्रभावित करते हैं।",
    "features.recipes.title": "AI रेसिपी जेनरेटर",
    "features.recipes.description": "अपनी प्राथमिकताओं और प्रतिबंधों के आधार पर व्यक्तिगत, मधुमेह-अनुकूल रेसिपी प्राप्त करें।",
    "features.planning.title": "भोजन योजना",
    "features.planning.description": "स्वचालित कार्ब गिनती और पोषण विश्लेषण के साथ अपने साप्ताहिक भोजन की योजना बनाएं।",

    // Dashboard
    "dashboard.title": "डैशबोर्ड",
    "dashboard.welcome": "वापसी पर स्वागत है!",
    "dashboard.bloodSugar": "रक्त शर्करा",
    "dashboard.todaysMeals": "आज के भोजन",
    "dashboard.recentActivity": "हाल की गतिविधि",
    "dashboard.generateRecipe": "रेसिपी बनाएं",
    "dashboard.viewMealPlan": "भोजन योजना देखें",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.save": "सेव करें",
    "common.cancel": "रद्द करें",
    "common.delete": "हटाएं",
    "common.edit": "संपादित करें",
    "common.close": "बंद करें",
  },
  uz: {
    // Navigation
    "nav.home": "Bosh sahifa",
    "nav.dashboard": "Boshqaruv paneli",
    "nav.recipes": "Retseptlar",
    "nav.mealPlan": "Ovqat rejasi",
    "nav.profile": "Profil",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "Sizning shaxsiy diabet dietasi yordamchingiz",
    "home.description":
      "Shaxsiylashtirilgan ovqat rejalari, qon shakarini kuzatish va sizning ovqat ehtiyojlaringizga moslashtirilgan AI tomonidan taklif qilingan retseptlar bilan diabetingizni nazorat qiling.",
    "home.getStarted": "Boshlash",
    "home.learnMore": "Batafsil",

    // Features
    "features.title": "Diabet dietasini boshqarish uchun kerak bo'lgan hamma narsa",
    "features.tracking.title": "Qon shakarini kuzatish",
    "features.tracking.description":
      "Glyukoza darajangizni kuzating va turli ovqatlar qon shakaringizga qanday ta'sir qilishini ko'ring.",
    "features.recipes.title": "AI retsept generatori",
    "recipes.description":
      "Afzalliklaringiz va cheklovlaringizga asoslangan shaxsiylashtirilgan, diabetga mos retseptlarni oling.",
    "features.planning.title": "Ovqat rejalashtirish",
    "features.planning.description":
      "Avtomatik karbohidrat hisoblash va ozuqaviy tahlil bilan haftalik ovqatlaringizni rejalashtiring.",

    // Dashboard
    "dashboard.title": "Boshqaruv paneli",
    "dashboard.welcome": "Xush kelibsiz!",
    "dashboard.bloodSugar": "Qon shakari",
    "dashboard.todaysMeals": "Bugungi ovqatlar",
    "dashboard.recentActivity": "So'nggi faoliyat",
    "dashboard.generateRecipe": "Retsept yaratish",
    "dashboard.viewMealPlan": "Ovqat rejasini ko'rish",

    // Common
    "common.loading": "Yuklanmoqda...",
    "common.save": "Saqlash",
    "common.cancel": "Bekor qilish",
    "common.delete": "O'chirish",
    "common.edit": "Tahrirlash",
    "common.close": "Yopish",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.dashboard": "Панель управления",
    "nav.recipes": "Рецепты",
    "nav.mealPlan": "План питания",
    "nav.profile": "Профиль",

    // Homepage
    "home.title": "DiaCare",
    "home.subtitle": "Ваш персональный помощник по диабетической диете",
    "home.description":
      "Контролируйте свой диабет с помощью персонализированных планов питания, отслеживания уровня сахара в крови и рекомендаций рецептов на основе ИИ, адаптированных к вашим диетическим потребностям.",
    "home.getStarted": "Начать",
    "home.learnMore": "Узнать больше",

    // Features
    "features.title": "Все необходимое для управления диабетической диетой",
    "features.tracking.title": "Отслеживание сахара в крови",
    "features.tracking.description":
      "Контролируйте уровень глюкозы и смотрите, как различные продукты влияют на ваш сахар в крови.",
    "features.recipes.title": "ИИ генератор рецептов",
    "features.recipes.description":
      "Получайте персонализированные рецепты, подходящие для диабетиков, основанные на ваших предпочтениях и ограничениях.",
    "features.planning.title": "Планирование питания",
    "features.planning.description":
      "Планируйте свои еженедельные приемы пищи с автоматическим подсчетом углеводов и анализом питания.",

    // Dashboard
    "dashboard.title": "Панель управления",
    "dashboard.welcome": "Добро пожаловать обратно!",
    "dashboard.bloodSugar": "Сахар в крови",
    "dashboard.todaysMeals": "Сегодняшние приемы пищи",
    "dashboard.recentActivity": "Недавняя активность",
    "dashboard.generateRecipe": "Создать рецепт",
    "dashboard.viewMealPlan": "Посмотреть план питания",

    // Common
    "common.loading": "Загрузка...",
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.delete": "Удалить",
    "common.edit": "Редактировать",
    "common.close": "Закрыть",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem("diacare-language") as Language
    if (saved && translations[saved]) {
      setLanguage(saved)
    }
  }, [])

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("diacare-language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
