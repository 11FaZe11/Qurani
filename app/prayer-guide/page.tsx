"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme as useAppTheme } from "@/contexts/theme-context"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { Droplets, BookOpen } from "lucide-react"

export default function PrayerGuidePage() {
  const { currentTheme } = useAppTheme()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [activeTab, setActiveTab] = useState("ablution")
  const { language } = useLanguage()

  // Ablution (Wudu) steps
  const ablutionSteps = [
    {
      id: 1,
      title: "Intention (Niyyah)",
      arabicTitle: "النية",
      description: "Make the intention in your heart to perform wudu for the purpose of prayer.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Intention%20%28Niyyah%29-kwyZQssBNGPyd91Wcp4XH8mY31xRAG.jpeg",
    },
    {
      id: 2,
      title: "Washing Hands",
      arabicTitle: "غسل اليدين",
      description: "Wash your hands up to the wrists three times, ensuring between the fingers are washed.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Washing%20Hands-5qHQfbxVXIui3XsLBRlGHFGxRwAdog.jpeg",
    },
    {
      id: 3,
      title: "Rinsing the Mouth",
      arabicTitle: "المضمضة",
      description: "Take water into your mouth and rinse it thoroughly three times.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rinsing%20the%20Mouth-o57K8s3gGY6FnuhSZ8LkiapmFWw1zi.jpeg",
    },
    {
      id: 4,
      title: "Sniffing Water",
      arabicTitle: "الاستنشاق",
      description: "Sniff water into your nostrils and blow it out three times.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sniffing%20Water-U5q4DvoB1NSIe6md1ECN7Huyxqtqb3.jpeg",
    },
    {
      id: 5,
      title: "Washing the Face",
      arabicTitle: "غسل الوجه",
      description: "Wash your face from forehead to chin and ear to ear three times.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Washing%20the%20Face-GiN3Z1amnNq2JOeFXqUsER7lLxNgFE.jpeg",
    },
    {
      id: 6,
      title: "Washing Arms",
      arabicTitle: "غسل اليدين إلى المرفقين",
      description: "Wash your right arm from wrist to elbow three times, then the left arm.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Washing%20Arms-NUDlcpT9CqQJBGWZj88ZWGX1x0Fi45.jpeg",
    },
    {
      id: 7,
      title: "Wiping the Head",
      arabicTitle: "مسح الرأس",
      description: "Wipe your wet hands over your head from front to back once.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wiping%20the%20Head-4SV2wmG6tMsNGjAroWpDjGpNNTlQdS.jpeg",
    },
    {
      id: 8,
      title: "Wiping the Ears",
      arabicTitle: "مسح الأذنين",
      description: "Wipe the inside and outside of your ears with wet fingers once.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wiping%20the%20Ears-FdeI19YD8r4umDMFb6xVFuqOTPtvrD.jpeg",
    },
    {
      id: 9,
      title: "Washing the Feet",
      arabicTitle: "غسل القدمين",
      description: "Wash your right foot up to the ankle three times, then the left foot.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Washing%20the%20Feet-iSF4IdzraNjveCxRKOZm8ghoR2qa3f.jpeg",
    },
  ]

  // Prayer (Salah) steps
  const prayerSteps = [
    {
      id: 1,
      title: "Standing (Qiyam)",
      arabicTitle: "القيام",
      description:
        "Stand facing the Qibla (direction of the Ka'bah in Mecca). Raise your hands to your ears and say 'Allahu Akbar' (Allah is the Greatest).",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Standing%20%28Qiyam%29-A6G9na3OvpVpIHKipK7aXTkk60gpYW.jpeg",
    },
    {
      id: 2,
      title: "Recitation (Qira'at)",
      arabicTitle: "القراءة",
      description:
        "Place your right hand over your left hand on your chest. Recite Surah Al-Fatihah followed by any other surah or verses from the Quran.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recitation%20%28Qira%27at%29-ZgMPy9e0K4T8VuI8SujNmcEdlVzwKy.jpeg",
    },
    {
      id: 3,
      title: "Bowing (Ruku)",
      arabicTitle: "الركوع",
      description:
        "Say 'Allahu Akbar' and bow with your back straight and hands on your knees. Say 'Subhana Rabbiyal Adheem' (Glory be to my Lord, the Most Great) three times.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bowing%20%28Ruku%29-eOPStTwGxtUkOxzAhM9ulhRuaCqY53.jpeg",
    },
    {
      id: 4,
      title: "Standing after Ruku",
      arabicTitle: "الرفع من الركوع",
      description:
        "Rise from bowing and say 'Sami Allahu liman hamidah, Rabbana wa lakal hamd' (Allah hears those who praise Him. Our Lord, praise be to You).",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Standing%20after%20Ruku-yCV3IU8hYwS6RIGAcWHFUTFiqzd8X9.jpeg",
    },
    {
      id: 5,
      title: "Prostration (Sujood)",
      arabicTitle: "السجود",
      description:
        "Say 'Allahu Akbar' and prostrate with your forehead, nose, palms, knees, and toes touching the ground. Say 'Subhana Rabbiyal A'la' (Glory be to my Lord, the Most High) three times.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prostration%20%28Sujood%29-iWVfh2sp1n3lca94aJPXyio4T7eOuX.jpeg",
    },
    {
      id: 6,
      title: "Sitting between Prostrations",
      arabicTitle: "الجلسة بين السجدتين",
      description:
        "Rise from prostration saying 'Allahu Akbar' and sit briefly. Say 'Rabbi ighfir li' (My Lord, forgive me).",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sitting%20between%20Prostrations-XTtKTQUygJq4V1Y0Tz6EZq4LXl1gar.jpeg",
    },
    {
      id: 7,
      title: "Second Prostration",
      arabicTitle: "السجدة الثانية",
      description: "Say 'Allahu Akbar' and prostrate again as before, saying 'Subhana Rabbiyal A'la' three times.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prostration%20%28Sujood%29-iWVfh2sp1n3lca94aJPXyio4T7eOuX.jpeg",
    },
    {
      id: 8,
      title: "Sitting for Tashahhud",
      arabicTitle: "التشهد",
      description:
        "After completing the required number of rak'ahs (units of prayer), sit for the final Tashahhud. Recite the Tashahhud and send blessings upon the Prophet Muhammad (peace be upon him).",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sitting%20for%20Tashahhud-Hs2tsLwj6MxRap1ROiD9bd0tKUk2SC.jpeg",
    },
    {
      id: 9,
      title: "Concluding the Prayer",
      arabicTitle: "التسليم",
      description:
        "Turn your face to the right saying 'Assalamu alaikum wa rahmatullah' (Peace and mercy of Allah be upon you), then to the left repeating the same words.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Concluding%20the%20Prayer-pVRiFq9vIo8K4nurTpc4ln064jioem.jpeg",
    },
  ]

  // Helper function to render title based on language preference
  const renderTitle = (title: string, arabicTitle: string) => {
    if (language === "arabic") {
      return <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-gray-800")}>{arabicTitle}</h3>
    } else if (language === "english") {
      return <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-gray-800")}>{title}</h3>
    } else {
      // Mixed
      return (
        <>
          <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-gray-800")}>{title}</h3>
          <h4 className={cn("text-lg mb-2", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
            {arabicTitle}
          </h4>
        </>
      )
    }
  }

  return (
    <div
      className={cn(
        "min-h-[calc(100vh-4rem)] py-8 px-4",
        isDark ? "bg-gradient-to-b from-gray-900 to-gray-800" : `bg-gradient-to-b ${currentTheme.gradient}`,
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={cn("text-3xl font-bold mb-2", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
            {language === "arabic" ? "دليل الصلاة والوضوء" : "Prayer & Ablution Guide"}
          </h1>
          {language === "mixed" && (
            <h2 className={cn("text-xl font-semibold", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
              دليل الصلاة والوضوء
            </h2>
          )}
          <p className={cn("mt-4 max-w-3xl mx-auto", isDark ? "text-gray-300" : "text-gray-600")}>
            {language === "arabic"
              ? "دليل شامل لأداء الوضوء والصلاة في الإسلام، مع تعليمات خطوة بخطوة وإرشادات مرئية."
              : "A comprehensive guide to performing ablution (Wudu) and prayer (Salah) in Islam, with step-by-step instructions and visual guidance."}
          </p>
        </div>

        <Tabs defaultValue="ablution" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="ablution" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              <span>
                {language === "arabic" ? "الوضوء" : language === "english" ? "Ablution" : "Ablution (الوضوء)"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="prayer" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{language === "arabic" ? "الصلاة" : language === "english" ? "Prayer" : "Prayer (الصلاة)"}</span>
            </TabsTrigger>
          </TabsList>

          {/* Ablution (Wudu) Content */}
          <TabsContent value="ablution">
            <Card className={cn(isDark && "bg-gray-800 border-gray-700")}>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h2 className={cn("text-2xl font-bold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                    {language === "arabic"
                      ? "كيفية الوضوء"
                      : language === "english"
                        ? "How to Perform Ablution (Wudu)"
                        : "How to Perform Ablution (Wudu)"}
                  </h2>
                  {language === "mixed" && (
                    <h3 className={cn("text-xl", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
                      كيفية الوضوء
                    </h3>
                  )}
                  <p className={cn("mt-2", isDark ? "text-gray-300" : "text-gray-600")}>
                    {language === "arabic"
                      ? "الوضوء هو إجراء إسلامي لتطهير أجزاء من الجسم قبل الصلاة."
                      : "Ablution (Wudu) is the Islamic procedure for cleansing parts of the body before prayer."}
                  </p>
                </div>

                <div className="space-y-12">
                  {ablutionSteps.map((step) => (
                    <div key={step.id} className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={step.image || "/placeholder.svg"}
                            alt={`Step ${step.id}: ${language === "arabic" ? step.arabicTitle : step.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full text-white font-bold",
                              isDark ? "bg-emerald-700" : currentTheme.primary,
                            )}
                          >
                            {step.id}
                          </div>
                          {renderTitle(step.title, step.arabicTitle)}
                        </div>
                        <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                          {language === "arabic"
                            ? step.id === 1
                              ? "انوِ في قلبك أداء الوضوء لغرض الصلاة. النية محلها القلب ولا يُشترط التلفظ بها."
                              : step.id === 2
                                ? "اغسل يديك إلى الرسغين ثلاث مرات، مع التأكد من غسل ما بين الأصابع."
                                : step.id === 3
                                  ? "خذ الماء في فمك واغسله جيداً ثلاث مرات."
                                  : step.id === 4
                                    ? "استنشق الماء في أنفك ثم انثره ثلاث مرات."
                                    : step.id === 5
                                      ? "اغسل وجهك من منبت شعر الرأس إلى الذقن ومن الأذن إلى الأذن ثلاث مرات."
                                      : step.id === 6
                                        ? "اغسل ذراعك الأيمن من الرسغ إلى المرفق ثلاث مرات، ثم الذراع الأيسر."
                                        : step.id === 7
                                          ? "امسح رأسك بيديك المبللتين من الأمام إلى الخلف مرة واحدة."
                                          : step.id === 8
                                            ? "امسح داخل وخارج أذنيك بأصابعك المبللة مرة واحدة."
                                            : "اغسل قدمك اليمنى إلى الكعبين ثلاث مرات، ثم القدم اليسرى."
                            : step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-lg bg-opacity-50 border border-dashed text-center">
                  <h3
                    className={cn("text-lg font-semibold mb-2", isDark ? "text-emerald-400" : currentTheme.textPrimary)}
                  >
                    Important Notes
                  </h3>
                  <ul
                    className={cn(
                      "list-disc list-inside text-left space-y-2",
                      isDark ? "text-gray-300" : "text-gray-600",
                    )}
                  >
                    <li>Wudu should be performed in the correct sequence as shown above.</li>
                    <li>Each part should be washed thoroughly, ensuring water reaches all required areas.</li>
                    <li>
                      Wudu is invalidated by natural discharges, deep sleep, unconsciousness, or touching private parts.
                    </li>
                    <li>
                      If you are unable to use water due to illness or unavailability, you may perform Tayammum (dry
                      ablution).
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prayer (Salah) Content - similar language handling would be applied here */}
          <TabsContent value="prayer">
            <Card className={cn(isDark && "bg-gray-800 border-gray-700")}>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h2 className={cn("text-2xl font-bold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                    {language === "arabic"
                      ? "كيفية الصلاة"
                      : language === "english"
                        ? "How to Perform Prayer (Salah)"
                        : "How to Perform Prayer (Salah)"}
                  </h2>
                  {language === "mixed" && (
                    <h3 className={cn("text-xl", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
                      كيفية الصلاة
                    </h3>
                  )}
                  <p className={cn("mt-2", isDark ? "text-gray-300" : "text-gray-600")}>
                    {language === "arabic"
                      ? "الصلاة هي أحد أركان الإسلام الخمسة، تؤدى خمس مرات يوميًا."
                      : "Prayer (Salah) is one of the five pillars of Islam, performed five times daily."}
                  </p>
                </div>

                <div className="space-y-12">
                  {prayerSteps.map((step) => (
                    <div key={step.id} className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={step.image || "/placeholder.svg"}
                            alt={`Step ${step.id}: ${language === "arabic" ? step.arabicTitle : step.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full text-white font-bold",
                              isDark ? "bg-emerald-700" : currentTheme.primary,
                            )}
                          >
                            {step.id}
                          </div>
                          {renderTitle(step.title, step.arabicTitle)}
                        </div>
                        <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                          {language === "arabic"
                            ? step.id === 1
                              ? "قف مستقبلاً القبلة (اتجاه الكعبة في مكة). ارفع يديك إلى أذنيك وقل 'الله أكبر' (تكبيرة الإحرام)."
                              : step.id === 2
                                ? "ضع يدك اليمنى فوق اليسرى على صدرك. اقرأ سورة الفاتحة متبوعة بأي سورة أخرى أو آيات من القرآن."
                                : step.id === 3
                                  ? "قل 'الله أكبر' وانحنِ مع استقامة ظهرك ويديك على ركبتيك. قل 'سبحان ربي العظيم' ثلاث مرات."
                                  : step.id === 4
                                    ? "ارفع من الركوع وقل 'سمع الله لمن حمده، ربنا ولك الحمد' (الله يسمع من يحمده. ربنا، لك الحمد)."
                                    : step.id === 5
                                      ? "قل 'الله أكبر' واسجد بحيث تلمس جبهتك وأنفك وكفيك وركبتيك وأصابع قدميك الأرض. قل 'سبحان ربي الأعلى' ثلاث مرات."
                                      : step.id === 6
                                        ? "ارفع من السجود قائلاً 'الله أكبر' واجلس لفترة وجيزة. قل 'رب اغفر لي' (ربي اغفر لي)."
                                        : step.id === 7
                                          ? "قل 'الله أكبر' واسجد مرة أخرى كما فعلت سابقاً، قائلاً 'سبحان ربي الأعلى' ثلاث مرات."
                                          : step.id === 8
                                            ? "بعد إكمال العدد المطلوب من الركعات (وحدات الصلاة)، اجلس للتشهد الأخير. اقرأ التشهد وصلِّ على النبي محمد (صلى الله عليه وسلم)."
                                            : "أدر وجهك إلى اليمين قائلاً 'السلام عليكم ورحمة الله' (السلام ورحمة الله عليكم)، ثم إلى اليسار مكرراً نفس الكلمات."
                            : step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-lg bg-opacity-50 border border-dashed text-center">
                  <h3
                    className={cn("text-lg font-semibold mb-2", isDark ? "text-emerald-400" : currentTheme.textPrimary)}
                  >
                    {language === "arabic" ? "عدد الركعات في كل صلاة" : "Number of Rak'ahs (Units) in Each Prayer"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div className={cn("p-3 rounded-lg", isDark ? "bg-gray-700" : "bg-emerald-50")}>
                      <h4 className={cn("font-semibold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                        {language === "arabic" ? "الفجر" : "Fajr"}
                      </h4>
                      <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                        {language === "arabic" ? "ركعتان" : "2 Rak'ahs"}
                      </p>
                    </div>
                    <div className={cn("p-3 rounded-lg", isDark ? "bg-gray-700" : "bg-emerald-50")}>
                      <h4 className={cn("font-semibold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                        {language === "arabic" ? "الظهر" : "Dhuhr"}
                      </h4>
                      <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                        {language === "arabic" ? "٤ ركعات" : "4 Rak'ahs"}
                      </p>
                    </div>
                    <div className={cn("p-3 rounded-lg", isDark ? "bg-gray-700" : "bg-emerald-50")}>
                      <h4 className={cn("font-semibold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                        {language === "arabic" ? "العصر" : "Asr"}
                      </h4>
                      <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                        {language === "arabic" ? "٤ ركعات" : "4 Rak'ahs"}
                      </p>
                    </div>
                    <div className={cn("p-3 rounded-lg", isDark ? "bg-gray-700" : "bg-emerald-50")}>
                      <h4 className={cn("font-semibold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                        {language === "arabic" ? "المغرب" : "Maghrib"}
                      </h4>
                      <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                        {language === "arabic" ? "٣ ركعات" : "3 Rak'ahs"}
                      </p>
                    </div>
                    <div className={cn("p-3 rounded-lg", isDark ? "bg-gray-700" : "bg-emerald-50")}>
                      <h4 className={cn("font-semibold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                        {language === "arabic" ? "العشاء" : "Isha"}
                      </h4>
                      <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                        {language === "arabic" ? "٤ ركعات" : "4 Rak'ahs"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
            {language === "arabic"
              ? "ملاحظة: هذا الدليل لأغراض تعليمية. للأحكام التفصيلية، يرجى استشارة العلماء المختصين."
              : "Note: This guide is for educational purposes. For detailed rulings, please consult with knowledgeable scholars."}
          </p>
        </div>
      </div>
    </div>
  )
}
