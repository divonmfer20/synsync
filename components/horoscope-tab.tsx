"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  age: number
  birthDate: string
  birthTime: string
  birthPlace: string
  location: string
  avatar: string
  bio: string
  interests: string[]
}

interface HoroscopeTabProps {
  currentUser: User
}

export function HoroscopeTab({ currentUser }: HoroscopeTabProps) {
  const [birthData, setBirthData] = useState({
    date: currentUser.birthDate,
    time: currentUser.birthTime,
    place: currentUser.birthPlace,
  })
  const [showChart, setShowChart] = useState(false)
  const [showFullHoroscope, setShowFullHoroscope] = useState(false)

  const calculateZodiacSign = (birthDate: string): string => {
    const date = new Date(birthDate)
    const month = date.getMonth() + 1
    const day = date.getDate()

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"
    return "Leo"
  }

  const getZodiacEmoji = (sign: string): string => {
    const emojis: { [key: string]: string } = {
      Aries: "♈",
      Taurus: "♉",
      Gemini: "♊",
      Cancer: "♋",
      Leo: "♌",
      Virgo: "♍",
      Libra: "♎",
      Scorpio: "♏",
      Sagittarius: "♐",
      Capricorn: "♑",
      Aquarius: "♒",
      Pisces: "♓",
    }
    return emojis[sign] || "⭐"
  }

  const getDailyLoveTip = (sign: string): string => {
    const tips: { [key: string]: string[] } = {
      Aries: [
        "Your bold energy is magnetic today - make the first move!",
        "Plan an active date to showcase your adventurous spirit",
        "Your directness is refreshing - speak your truth in love",
        "Channel your competitive nature into playful flirting",
        "Your confidence is your best accessory today",
        "Take the lead in planning something spontaneous",
        "Your enthusiasm is contagious - let it shine on dates",
      ],
      Taurus: [
        "Slow and steady wins hearts today - take your time",
        "Plan a sensual date involving good food or beautiful scenery",
        "Your reliability is incredibly attractive right now",
        "Show love through thoughtful gestures and quality time",
        "Your grounded nature is exactly what someone needs",
        "Create a cozy, comfortable atmosphere for connection",
        "Trust your instincts about long-term potential",
      ],
      Gemini: [
        "Your wit and conversation skills are irresistible today",
        "Ask thoughtful questions to create deeper connections",
        "Your curiosity about others is your dating superpower",
        "Share interesting stories to captivate potential partners",
        "Your adaptability makes you appealing to many types",
        "Plan dates that involve learning something new together",
        "Your mental agility is particularly attractive right now",
      ],
      Cancer: [
        "Trust your intuition about people's true intentions",
        "Your nurturing nature is drawing in quality partners",
        "Create emotional safety for deeper connections to bloom",
        "Your empathy helps others feel truly understood",
        "Home-based dates will feel especially meaningful today",
        "Your protective instincts show how much you care",
        "Listen to your heart - it knows what it wants",
      ],
      Leo: [
        "Your natural radiance is impossible to ignore today",
        "Be generous with compliments - your warmth is magnetic",
        "Plan dates where you can both shine and have fun",
        "Your loyalty and big heart are your best qualities",
        "Don't dim your light for anyone - the right person loves your glow",
        "Your dramatic flair makes ordinary moments special",
        "Show appreciation for your date's unique qualities",
      ],
      Virgo: [
        "Your attention to detail shows how much you care",
        "Plan thoughtful dates that demonstrate your consideration",
        "Your practical approach to love is refreshingly honest",
        "Help others feel appreciated for who they truly are",
        "Your reliability makes you an ideal long-term partner",
        "Show love through helpful actions and kind gestures",
        "Your analytical skills help you spot genuine connections",
      ],
      Libra: [
        "Your charm and diplomacy create harmony in all interactions",
        "Plan aesthetically pleasing dates in beautiful settings",
        "Your fair-minded approach makes others feel valued",
        "Create balance between giving and receiving in relationships",
        "Your social grace makes you appealing to many",
        "Focus on creating beautiful shared experiences",
        "Your desire for partnership attracts like-minded souls",
      ],
      Scorpio: [
        "Your intensity draws in those ready for real connection",
        "Trust your ability to see beneath surface attractions",
        "Your mysterious allure is particularly powerful today",
        "Create safe spaces for vulnerable, authentic sharing",
        "Your passion is magnetic to the right person",
        "Deep conversations will lead to meaningful bonds",
        "Your transformative energy helps relationships evolve",
      ],
      Sagittarius: [
        "Your adventurous spirit attracts fellow explorers",
        "Plan dates that involve new experiences or learning",
        "Your optimism and humor light up every interaction",
        "Share your philosophical insights to create deeper bonds",
        "Your honesty and directness are refreshingly authentic",
        "Embrace spontaneity in your romantic adventures",
        "Your love of growth attracts evolving individuals",
      ],
      Capricorn: [
        "Your ambition and stability are incredibly attractive",
        "Show your softer side to create emotional connection",
        "Your long-term thinking attracts serious partners",
        "Plan quality dates that demonstrate your good taste",
        "Your reliability makes others feel secure and valued",
        "Your dry humor and wisdom are uniquely appealing",
        "Build relationships slowly but surely for lasting results",
      ],
      Aquarius: [
        "Your unique perspective makes you fascinating to others",
        "Embrace your individuality - it's your greatest asset",
        "Your humanitarian nature attracts conscious partners",
        "Plan unconventional dates that reflect your values",
        "Your friendship-first approach creates strong foundations",
        "Your vision for the future inspires potential partners",
        "Your independence is attractive to secure individuals",
      ],
      Pisces: [
        "Your intuitive understanding of others is your gift",
        "Create romantic, dreamy atmospheres for connection",
        "Your compassionate nature draws in sensitive souls",
        "Trust your psychic impressions about compatibility",
        "Your artistic sensibility makes ordinary moments magical",
        "Your ability to love unconditionally is rare and precious",
        "Let your imagination guide you to creative date ideas",
      ],
    }

    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const signTips = tips[sign] || tips["Leo"]
    return signTips[dayOfYear % signTips.length]
  }

  const getLuckyColors = (sign: string): { primary: string; secondary: string; accent: string } => {
    const today = new Date()
    const dayOfWeek = today.getDay()

    const colorSets: { [key: string]: { primary: string; secondary: string; accent: string }[] } = {
      Aries: [
        { primary: "Red", secondary: "Orange", accent: "Gold" },
        { primary: "Crimson", secondary: "Coral", accent: "Bronze" },
        { primary: "Scarlet", secondary: "Amber", accent: "Copper" },
        { primary: "Ruby", secondary: "Peach", accent: "Rose Gold" },
        { primary: "Burgundy", secondary: "Salmon", accent: "Champagne" },
        { primary: "Cherry", secondary: "Tangerine", accent: "Brass" },
        { primary: "Maroon", secondary: "Apricot", accent: "Honey" },
      ],
      Taurus: [
        { primary: "Green", secondary: "Brown", accent: "Pink" },
        { primary: "Forest Green", secondary: "Chocolate", accent: "Rose" },
        { primary: "Emerald", secondary: "Tan", accent: "Blush" },
        { primary: "Sage", secondary: "Caramel", accent: "Dusty Rose" },
        { primary: "Olive", secondary: "Mocha", accent: "Mauve" },
        { primary: "Mint", secondary: "Beige", accent: "Coral" },
        { primary: "Jade", secondary: "Taupe", accent: "Peony" },
      ],
      Gemini: [
        { primary: "Yellow", secondary: "Silver", accent: "Blue" },
        { primary: "Lemon", secondary: "Platinum", accent: "Sky Blue" },
        { primary: "Canary", secondary: "Chrome", accent: "Periwinkle" },
        { primary: "Sunshine", secondary: "Mercury", accent: "Powder Blue" },
        { primary: "Butter", secondary: "Steel", accent: "Cerulean" },
        { primary: "Citrine", secondary: "Pewter", accent: "Azure" },
        { primary: "Goldenrod", secondary: "Titanium", accent: "Cornflower" },
      ],
      Cancer: [
        { primary: "Silver", secondary: "White", accent: "Sea Blue" },
        { primary: "Pearl", secondary: "Ivory", accent: "Ocean Blue" },
        { primary: "Moonstone", secondary: "Cream", accent: "Aqua" },
        { primary: "Platinum", secondary: "Snow", accent: "Teal" },
        { primary: "Chrome", secondary: "Alabaster", accent: "Turquoise" },
        { primary: "Sterling", secondary: "Bone", accent: "Seafoam" },
        { primary: "Opal", secondary: "Linen", accent: "Marina" },
      ],
      Leo: [
        { primary: "Gold", secondary: "Orange", accent: "Red" },
        { primary: "Amber", secondary: "Tangerine", accent: "Crimson" },
        { primary: "Honey", secondary: "Peach", accent: "Scarlet" },
        { primary: "Champagne", secondary: "Coral", accent: "Ruby" },
        { primary: "Bronze", secondary: "Apricot", accent: "Cherry" },
        { primary: "Copper", secondary: "Salmon", accent: "Rose" },
        { primary: "Brass", secondary: "Sunset", accent: "Fire" },
      ],
      Virgo: [
        { primary: "Navy", secondary: "Gray", accent: "White" },
        { primary: "Midnight", secondary: "Charcoal", accent: "Pearl" },
        { primary: "Indigo", secondary: "Slate", accent: "Ivory" },
        { primary: "Sapphire", secondary: "Ash", accent: "Snow" },
        { primary: "Royal Blue", secondary: "Graphite", accent: "Cream" },
        { primary: "Cobalt", secondary: "Stone", accent: "Alabaster" },
        { primary: "Steel Blue", secondary: "Pewter", accent: "Linen" },
      ],
      Libra: [
        { primary: "Pink", secondary: "Blue", accent: "Green" },
        { primary: "Rose", secondary: "Powder Blue", accent: "Mint" },
        { primary: "Blush", secondary: "Sky Blue", accent: "Sage" },
        { primary: "Coral", secondary: "Periwinkle", accent: "Jade" },
        { primary: "Peony", secondary: "Azure", accent: "Emerald" },
        { primary: "Dusty Rose", secondary: "Cerulean", accent: "Forest" },
        { primary: "Mauve", secondary: "Cornflower", accent: "Olive" },
      ],
      Scorpio: [
        { primary: "Black", secondary: "Red", accent: "Purple" },
        { primary: "Obsidian", secondary: "Crimson", accent: "Violet" },
        { primary: "Onyx", secondary: "Burgundy", accent: "Plum" },
        { primary: "Charcoal", secondary: "Maroon", accent: "Amethyst" },
        { primary: "Midnight", secondary: "Wine", accent: "Lavender" },
        { primary: "Ebony", secondary: "Cherry", accent: "Orchid" },
        { primary: "Jet", secondary: "Ruby", accent: "Magenta" },
      ],
      Sagittarius: [
        { primary: "Purple", secondary: "Turquoise", accent: "Orange" },
        { primary: "Violet", secondary: "Teal", accent: "Tangerine" },
        { primary: "Amethyst", secondary: "Aqua", accent: "Peach" },
        { primary: "Plum", secondary: "Cyan", accent: "Coral" },
        { primary: "Lavender", secondary: "Seafoam", accent: "Apricot" },
        { primary: "Orchid", secondary: "Marina", accent: "Salmon" },
        { primary: "Magenta", secondary: "Turquoise", accent: "Sunset" },
      ],
      Capricorn: [
        { primary: "Black", secondary: "Brown", accent: "Gray" },
        { primary: "Charcoal", secondary: "Chocolate", accent: "Silver" },
        { primary: "Onyx", secondary: "Espresso", accent: "Pewter" },
        { primary: "Midnight", secondary: "Mocha", accent: "Steel" },
        { primary: "Obsidian", secondary: "Caramel", accent: "Platinum" },
        { primary: "Jet", secondary: "Tan", accent: "Chrome" },
        { primary: "Ebony", secondary: "Taupe", accent: "Titanium" },
      ],
      Aquarius: [
        { primary: "Blue", secondary: "Silver", accent: "White" },
        { primary: "Electric Blue", secondary: "Platinum", accent: "Snow" },
        { primary: "Cobalt", secondary: "Chrome", accent: "Pearl" },
        { primary: "Sapphire", secondary: "Mercury", accent: "Ivory" },
        { primary: "Azure", secondary: "Steel", accent: "Cream" },
        { primary: "Cerulean", secondary: "Titanium", accent: "Alabaster" },
        { primary: "Royal Blue", secondary: "Pewter", accent: "Linen" },
      ],
      Pisces: [
        { primary: "Sea Green", secondary: "Purple", accent: "Silver" },
        { primary: "Teal", secondary: "Lavender", accent: "Pearl" },
        { primary: "Aqua", secondary: "Violet", accent: "Moonstone" },
        { primary: "Turquoise", secondary: "Amethyst", accent: "Opal" },
        { primary: "Seafoam", secondary: "Plum", accent: "Sterling" },
        { primary: "Marina", secondary: "Orchid", accent: "Platinum" },
        { primary: "Cyan", secondary: "Magenta", accent: "Chrome" },
      ],
    }

    const signColors = colorSets[sign] || colorSets["Leo"]
    return signColors[dayOfWeek]
  }

  const getDatingHoroscope = (sign: string, birthDate: string) => {
    const date = new Date(birthDate)
    const month = date.getMonth() + 1
    const day = date.getDate()

    // Calculate more precise timing within the sign
    const isEarlySign = day <= 10
    const isMidSign = day > 10 && day <= 20
    const isLateSign = day > 20

    const horoscopes: { [key: string]: { preview: string; full: string } } = {
      Aries: {
        preview: isEarlySign
          ? "Born in early Aries, your pioneering Mars energy is at its peak right now. Your bold, direct approach to dating is magnetic - don't second-guess your instincts when making the first move."
          : isMidSign
            ? "As a mid-Aries, you balance fiery passion with strategic thinking in love. This week, your natural leadership qualities are attracting partners who appreciate your confident yet thoughtful approach."
            : "Late Aries energy brings wisdom to your romantic pursuits. Your matured fire sign traits make you irresistible to those seeking passionate yet stable connections.",
        full: isEarlySign
          ? "Born between March 21-31, you embody pure Aries fire energy. Mars, your ruling planet, is amplifying your natural magnetism and courage in love. Your direct, no-games approach is exactly what the dating world needs right now. You're attracting partners who are drawn to your authentic, pioneering spirit. Plan active dates - hiking, dancing, or competitive activities where your natural energy shines. Your ideal matches right now appreciate your honesty and match your enthusiasm for life's adventures. Trust your instincts completely; your first impressions about people are remarkably accurate during this period."
          : isMidSign
            ? "Born in mid-Aries (April 1-10), you possess the perfect balance of fire and wisdom. Your Mars energy is tempered with strategic thinking, making you incredibly appealing to quality partners. You're not just passionate - you're passionate with purpose. This combination is attracting mature individuals who value both excitement and stability. Your leadership qualities are particularly magnetic right now. Focus on dates that showcase your ability to take charge while remaining considerate - dinner planning, event organizing, or teaching someone a new skill."
            : "Born in late Aries (April 11-19), you carry the wisdom of your sign with refined fire energy. Your approach to dating is both passionate and thoughtful, attracting partners who seek depth alongside excitement. You've learned to channel your Aries intensity in ways that create lasting connections rather than just sparks. Your matured confidence is incredibly attractive to those looking for serious partnership. You're particularly appealing to earth and water signs who are drawn to your grounded fire energy.",
      },
      Taurus: {
        preview: isEarlySign
          ? "Early Taurus energy brings pure Venus magic to your love life. Your sensual, grounded nature is drawing partners who crave stability and genuine connection. Take your time - your patient approach is your greatest strength."
          : isMidSign
            ? "Mid-Taurus combines earthly sensuality with practical wisdom. Your ability to create beautiful, comfortable experiences is attracting quality partners who value the finer things in life alongside emotional depth."
            : "Late Taurus energy adds determination to your romantic pursuits. Your unwavering loyalty and refined taste are magnetic to those seeking long-term partnership with someone who knows their worth.",
        full: isEarlySign
          ? "Born April 20-30, you embody Venus in her most earthly form. Your natural sensuality and appreciation for beauty are at their peak, making you irresistible to partners who value genuine connection over superficial attraction. Your patient, steady approach to dating is attracting individuals who are tired of games and ready for something real. Plan sensory-rich dates - wine tastings, art galleries, cooking together, or garden walks. Your ideal partners right now appreciate your reliability and are drawn to your ability to create comfort and luxury in simple moments."
          : isMidSign
            ? "Born in mid-Taurus (May 1-10), you blend earthly pleasures with practical wisdom beautifully. Your Venus energy is enhanced by your ability to build lasting foundations, making you incredibly attractive to partners seeking both passion and stability. You're not just romantic - you're romantically intelligent. This attracts mature individuals who value your ability to nurture relationships while maintaining your independence. Focus on dates that highlight your creativity and taste - home-cooked meals, antique shopping, or cultural events."
            : "Born in late Taurus (May 11-20), your earth energy is refined and determined. You know exactly what you want in love and aren't willing to settle for less. This clarity and self-respect is incredibly magnetic to quality partners. Your late-Taurus energy brings persistence to your romantic goals - when you decide someone is worth pursuing, your steady dedication is both flattering and effective. You're particularly attractive to air and fire signs who are drawn to your grounding influence and unwavering loyalty.",
      },
      Gemini: {
        preview: isEarlySign
          ? "Early Gemini sparkle is lighting up your dating life! Your quick wit and genuine curiosity about people are your superpowers. Your ability to connect through conversation is drawing fascinating individuals into your orbit."
          : isMidSign
            ? "Mid-Gemini energy brings depth to your natural charm. You're attracting partners who appreciate both your intellectual agility and your growing emotional intelligence. Your conversations are becoming gateways to real intimacy."
            : "Late Gemini combines mental agility with emotional wisdom. Your mature communication style is attracting partners who value both stimulating conversation and genuine emotional connection.",
        full: isEarlySign
          ? "Born May 21-31, your Mercury energy is pure and electric. Your natural curiosity and communication gifts are at their peak, making you the most interesting person in any room. You're attracting partners through the power of genuine conversation and intellectual connection. Your ability to make anyone feel heard and understood is incredibly seductive. Plan dates that involve discovery and dialogue - bookstore browsing, museum visits, coffee shop conversations, or exploring new neighborhoods together. Your ideal matches appreciate your mental agility and share your love of learning and growth."
          : isMidSign
            ? "Born in mid-Gemini (June 1-10), you've learned to balance your quick mind with deeper emotional intelligence. Your Mercury gifts are enhanced by your growing ability to create meaningful connections beyond just mental stimulation. You're attracting partners who value both wit and wisdom, conversation and compassion. Your evolved Gemini energy makes you particularly appealing to water and earth signs who are drawn to your ability to communicate feelings as skillfully as ideas."
            : "Born in late Gemini (June 11-20), your air energy is refined and purposeful. You've mastered the art of meaningful communication, using your natural gifts to build genuine intimacy rather than just surface-level connections. Your mature Gemini traits attract partners who seek both intellectual stimulation and emotional depth. You're particularly magnetic to those who have been disappointed by shallow connections and are ready for someone who can engage both their mind and heart.",
      },
      Cancer: {
        preview: isEarlySign
          ? "Early Cancer intuition is your dating superpower right now. Your emotional intelligence and nurturing nature are drawing partners who crave authentic intimacy. Trust your gut feelings about people - they're remarkably accurate."
          : isMidSign
            ? "Mid-Cancer energy balances emotional depth with protective wisdom. Your ability to create safe spaces for vulnerability is attracting quality partners who value emotional maturity and genuine care."
            : "Late Cancer combines intuitive gifts with emotional strength. Your mature approach to feelings and relationships is magnetic to those seeking deep, lasting connections with someone who truly understands love.",
        full: isEarlySign
          ? "Born June 21-July 1, your lunar energy is pure and powerful. Your emotional intuition and natural empathy are at their peak, making you incredibly attractive to partners seeking genuine emotional connection. Your ability to create safe, nurturing spaces where people can be vulnerable is your greatest dating asset. You're drawing in individuals who are ready for real intimacy, not just surface-level attraction. Plan dates that allow for emotional connection - quiet dinners, sunset walks, cozy coffee shops, or intimate concerts where real conversation can flow."
          : isMidSign
            ? "Born in mid-Cancer (July 2-12), you balance emotional depth with protective wisdom. Your Moon energy is enhanced by your ability to set healthy boundaries while remaining open to love. You're attracting partners who appreciate your emotional intelligence and your strength. Your evolved Cancer traits make you particularly appealing to fire and air signs who are drawn to your grounding emotional presence and your ability to help them connect with their own feelings."
            : "Born in late Cancer (July 13-22), your water energy is deep and wise. You've learned to trust your intuition while protecting your sensitive heart, creating an irresistible combination of vulnerability and strength. Your mature emotional intelligence attracts partners who are ready for the kind of deep, transformative love that only comes with true emotional intimacy. You're particularly magnetic to those who have learned that real strength comes from emotional courage.",
      },
      Leo: {
        preview: isEarlySign
          ? "Early Leo radiance is impossible to ignore! Your pure solar energy and generous heart are drawing admirers from all directions. Your authentic confidence and warmth are your most attractive qualities right now."
          : isMidSign
            ? "Mid-Leo energy combines natural magnetism with mature leadership. Your ability to make others feel special while maintaining your own shine is attracting high-quality partners who appreciate your generous spirit."
            : "Late Leo brings wisdom to your natural charisma. Your refined solar energy attracts partners who value both your dramatic flair and your loyal, generous heart. Your mature confidence is irresistible.",
        full: isEarlySign
          ? "Born July 23-August 2, your Sun energy is pure and radiant. Your natural confidence, generosity, and warmth are at their peak, making you absolutely magnetic to potential partners. Your authentic Leo traits - loyalty, creativity, and dramatic flair - are drawing in individuals who appreciate your larger-than-life personality. You're not just confident; you're confidently generous, which is incredibly attractive. Plan dates that let your natural radiance shine - theater shows, art galleries, rooftop dinners, or anywhere you can be the center of positive attention while making your date feel special too."
          : isMidSign
            ? "Born in mid-Leo (August 3-13), you've learned to balance your natural need for attention with genuine care for others. Your Sun energy is enhanced by your ability to make others feel like stars too. You're attracting partners who appreciate both your confidence and your generosity of spirit. Your evolved Leo traits make you particularly appealing to air and water signs who are drawn to your ability to bring out their own inner light while maintaining your magnificent presence."
            : "Born in late Leo (August 14-22), your fire energy is refined and wise. You've mastered the art of confident humility - you know your worth without diminishing others. Your mature Leo energy attracts partners who seek someone with both strength and heart, drama and depth. You're particularly magnetic to earth signs who are drawn to your stability combined with your natural flair for making life more beautiful and exciting.",
      },
      Virgo: {
        preview: isEarlySign
          ? "Early Virgo precision is your dating advantage. Your attention to detail and genuine care for others' wellbeing is attracting partners who value thoughtfulness and reliability. Your practical approach to love is refreshingly authentic."
          : isMidSign
            ? "Mid-Virgo energy balances analytical gifts with intuitive understanding. Your ability to see and appreciate the real person behind the surface is drawing quality partners who feel truly seen and valued."
            : "Late Virgo combines practical wisdom with refined intuition. Your mature approach to relationships - seeing potential while accepting reality - is magnetic to those seeking genuine partnership.",
        full: isEarlySign
          ? "Born August 23-September 2, your Mercury energy manifests as pure, caring attention to detail. Your ability to notice and appreciate the small things that matter is incredibly attractive to partners who feel overlooked by others. Your practical approach to love - showing care through actions rather than just words - is drawing in individuals who value substance over flash. Plan dates that showcase your thoughtfulness - picnics you've carefully planned, walks in beautiful natural settings, or activities where your attention to creating perfect moments can shine."
          : isMidSign
            ? "Born in mid-Virgo (September 3-13), you balance analytical gifts with growing emotional intelligence. Your Mercury energy is enhanced by your ability to see both the details and the bigger picture in relationships. You're attracting partners who appreciate your ability to be both practical and romantic, grounded and dreamy. Your evolved Virgo traits make you particularly appealing to water and fire signs who are drawn to your ability to bring order to chaos while remaining flexible and caring."
            : "Born in late Virgo (September 14-22), your earth energy is refined and intuitive. You've learned to trust both your analytical mind and your heart's wisdom, creating an irresistible combination of practical intelligence and emotional depth. Your mature Virgo energy attracts partners who seek someone who can both dream and plan, love and think clearly. You're particularly magnetic to those who appreciate that true love requires both passion and practical compatibility.",
      },
      Libra: {
        preview: isEarlySign
          ? "Early Libra charm is irresistible right now! Your natural diplomacy and eye for beauty are drawing partners who appreciate harmony and elegance. Your ability to make everyone feel valued is your greatest romantic asset."
          : isMidSign
            ? "Mid-Libra energy balances your need for partnership with healthy independence. Your refined social skills and fair-minded approach to relationships are attracting mature partners who value equality and mutual respect."
            : "Late Libra combines natural charm with decisive wisdom. Your ability to create harmony while maintaining your own identity is magnetic to those seeking balanced, beautiful partnerships.",
        full: isEarlySign
          ? "Born September 23-October 3, your Venus energy manifests as pure charm and social grace. Your natural ability to create harmony and beauty in every interaction is incredibly attractive to potential partners. Your diplomatic skills and genuine interest in fairness make you appealing to individuals who value emotional intelligence and social awareness. Plan dates that highlight your aesthetic sense and social skills - art gallery openings, wine tastings, elegant dinners, or cultural events where your natural grace can shine while you focus on creating beautiful shared experiences."
          : isMidSign
            ? "Born in mid-Libra (October 4-14), you've learned to balance your natural desire for partnership with healthy independence. Your Venus energy is enhanced by your growing ability to maintain your identity while creating beautiful connections with others. You're attracting partners who appreciate both your social grace and your personal strength. Your evolved Libra traits make you particularly appealing to fire and earth signs who are drawn to your ability to bring beauty and balance to their lives while maintaining your own center."
            : "Born in late Libra (October 15-22), your air energy is refined and decisive. You've mastered the art of creating harmony without losing yourself, making you incredibly attractive to partners who seek both beauty and authenticity in relationships. Your mature Libra energy attracts individuals who appreciate that true partnership requires two whole people choosing to create something beautiful together. You're particularly magnetic to those who have learned that the most beautiful relationships are built on mutual respect and genuine equality.",
      },
      Scorpio: {
        preview: isEarlySign
          ? "Early Scorpio intensity is magnetically powerful right now. Your ability to see beneath surfaces and connect on soul-deep levels is drawing partners who crave authentic, transformative intimacy. Your mysterious allure is irresistible."
          : isMidSign
            ? "Mid-Scorpio energy balances passionate depth with emotional wisdom. Your ability to create safe spaces for vulnerability while maintaining your magnetic mystery is attracting quality partners who aren't afraid of real intimacy."
            : "Late Scorpio combines intuitive gifts with emotional mastery. Your mature approach to passion and intimacy is magnetic to those seeking transformative love with someone who understands the depths of the human heart.",
        full: isEarlySign
          ? "Born October 23-November 2, your Pluto energy is pure and transformative. Your natural ability to see through facades and connect with people's authentic selves is incredibly attractive to partners seeking real intimacy. Your mysterious allure and emotional depth draw in individuals who are ready for the kind of love that changes them. Your intensity isn't overwhelming - it's magnetic to those who understand that shallow connections will never satisfy them. Plan dates that allow for deep connection - intimate dinners, meaningful conversations under the stars, or shared experiences that reveal character."
          : isMidSign
            ? "Born in mid-Scorpio (November 3-13), you balance passionate intensity with emotional intelligence. Your Pluto energy is enhanced by your ability to create safety within intensity, making you incredibly appealing to partners who want depth without drama. Your evolved Scorpio traits attract individuals who appreciate both your passionate nature and your emotional maturity. You're particularly magnetic to air and earth signs who are drawn to your ability to help them access their own emotional depths while feeling completely safe and accepted."
            : "Born in late Scorpio (November 14-21), your water energy is deep and wise. You've learned to channel your natural intensity into creating profound, healing connections with others. Your mature Scorpio energy attracts partners who seek transformative love - the kind that helps both people become their best selves. You're particularly appealing to those who understand that real intimacy requires courage and that the most beautiful relationships are forged in the depths of authentic emotional connection.",
      },
      Sagittarius: {
        preview: isEarlySign
          ? "Early Sagittarius adventure energy is infectious! Your optimistic spirit and love of exploration are drawing partners who share your enthusiasm for life's possibilities. Your philosophical nature makes every conversation an adventure."
          : isMidSign
            ? "Mid-Sagittarius balances wanderlust with wisdom. Your ability to find meaning in experiences while staying open to new adventures is attracting partners who value both growth and stability in relationships."
            : "Late Sagittarius combines adventurous spirit with mature wisdom. Your refined approach to exploration - both external and internal - is magnetic to those seeking meaningful connections with depth and excitement.",
        full: isEarlySign
          ? "Born November 22-December 2, your Jupiter energy is pure expansion and optimism. Your natural enthusiasm for life and genuine curiosity about the world are incredibly attractive to partners who share your love of growth and adventure. Your philosophical approach to life draws in individuals who want a partner who can expand their horizons. You're not just fun - you're meaningfully fun, which is irresistible to those seeking both excitement and depth. Plan dates that involve exploration and learning - travel, cultural events, outdoor adventures, or deep conversations about life's big questions."
          : isMidSign
            ? "Born in mid-Sagittarius (December 3-13), you balance your love of adventure with growing wisdom about what truly matters. Your Jupiter energy is enhanced by your ability to find meaning in both grand adventures and quiet moments. You're attracting partners who appreciate both your expansive spirit and your deepening understanding of life. Your evolved Sagittarius traits make you particularly appealing to water and earth signs who are drawn to your ability to bring excitement and meaning to their lives while remaining grounded in what's real."
            : "Born in late Sagittarius (December 14-21), your fire energy is refined and purposeful. You've learned to channel your natural wanderlust into meaningful exploration of both the world and the depths of human connection. Your mature Sagittarius energy attracts partners who seek adventure with substance, excitement with meaning. You're particularly magnetic to those who understand that the greatest adventures are often the internal journeys we take together with someone we love.",
      },
      Capricorn: {
        preview: isEarlySign
          ? "Early Capricorn determination is incredibly attractive right now. Your ambitious nature and practical approach to building lasting connections are drawing partners who value stability and long-term potential. Your quiet confidence is magnetic."
          : isMidSign
            ? "Mid-Capricorn energy balances ambition with emotional warmth. Your ability to build solid foundations while remaining open to love's surprises is attracting quality partners who appreciate both strength and tenderness."
            : "Late Capricorn combines practical wisdom with refined sensitivity. Your mature approach to love - building slowly but surely - is magnetic to those seeking partnerships that can weather any storm.",
        full: isEarlySign
          ? "Born December 22-January 1, your Saturn energy manifests as pure determination and practical wisdom. Your ability to build lasting foundations in all areas of life, including love, is incredibly attractive to partners seeking stability and long-term potential. Your quiet confidence and steady reliability draw in individuals who are tired of uncertainty and ready for someone they can count on. Your approach to dating is refreshingly honest and goal-oriented. Plan dates that showcase your reliability and taste - well-planned dinners, cultural events, or activities that demonstrate your ability to create quality experiences."
          : isMidSign
            ? "Born in mid-Capricorn (January 2-12), you balance your natural ambition with growing emotional openness. Your Saturn energy is enhanced by your ability to be both strong and vulnerable, practical and romantic. You're attracting partners who appreciate your ability to build security while remaining open to love's magic. Your evolved Capricorn traits make you particularly appealing to water and air signs who are drawn to your grounding presence and your capacity for both achievement and deep emotional connection."
            : "Born in late Capricorn (January 13-19), your earth energy is refined and emotionally intelligent. You've learned that true success includes love and that the strongest foundations are built with both practical wisdom and emotional courage. Your mature Capricorn energy attracts partners who seek someone who can both dream and achieve, love and build lasting security together. You're particularly magnetic to those who understand that the most beautiful relationships are those that grow stronger and more valuable over time.",
      },
      Aquarius: {
        preview: isEarlySign
          ? "Early Aquarius innovation is electrifying your love life! Your unique perspective and humanitarian heart are drawing partners who appreciate your originality and vision. Your friendship-first approach to romance is refreshingly authentic."
          : isMidSign
            ? "Mid-Aquarius energy balances independence with connection. Your ability to maintain your individuality while creating meaningful bonds is attracting partners who value both freedom and commitment in relationships."
            : "Late Aquarius combines visionary thinking with emotional wisdom. Your mature approach to love - honoring both independence and intimacy - is magnetic to those seeking evolved, conscious partnerships.",
        full: isEarlySign
          ? "Born January 20-30, your Uranus energy is pure innovation and humanitarian vision. Your unique approach to life and love is incredibly attractive to partners who appreciate originality and authenticity. Your ability to see people for who they truly are, beyond social conventions, draws in individuals who feel misunderstood by others. Your friendship-first approach to romance creates the strongest foundations for lasting love. Plan dates that reflect your values and interests - volunteering together, attending progressive events, exploring new ideas, or engaging in activities that make the world a better place."
          : isMidSign
            ? "Born in mid-Aquarius (January 31-February 9), you balance your need for independence with your capacity for deep connection. Your Uranus energy is enhanced by your growing understanding of how to maintain your individuality while building meaningful relationships. You're attracting partners who appreciate both your freedom-loving nature and your loyalty to those you care about. Your evolved Aquarius traits make you particularly appealing to fire and earth signs who are drawn to your ability to bring fresh perspectives to their lives while respecting their need for stability."
            : "Born in late Aquarius (February 10-18), your air energy is refined and emotionally intelligent. You've learned to balance your visionary nature with practical relationship skills, making you incredibly attractive to partners seeking both excitement and stability. Your mature Aquarius energy attracts individuals who want a partner who can both inspire them to grow and provide a secure foundation for that growth. You're particularly magnetic to those who understand that the most revolutionary act is creating conscious, loving relationships.",
      },
      Pisces: {
        preview: isEarlySign
          ? "Early Pisces intuition is your romantic superpower! Your compassionate nature and artistic soul are drawing partners who appreciate depth, creativity, and emotional intelligence. Your ability to love unconditionally is magnetic."
          : isMidSign
            ? "Mid-Pisces energy balances dreamy romance with practical wisdom. Your ability to see the best in people while maintaining healthy boundaries is attracting quality partners who value both imagination and emotional maturity."
            : "Late Pisces combines intuitive gifts with grounded wisdom. Your mature approach to love - dreaming big while staying rooted in reality - is magnetic to those seeking both magic and stability in relationships.",
        full: isEarlySign
          ? "Born February 19-29, your Neptune energy is pure compassion and intuitive understanding. Your ability to love unconditionally and see the divine in others is incredibly attractive to partners seeking deep, spiritual connection. Your artistic nature and emotional intelligence draw in individuals who appreciate both creativity and emotional depth. Your empathetic approach to love creates healing spaces where people can be their most authentic selves. Plan dates that honor your sensitive nature - art galleries, quiet beaches, intimate concerts, or spiritual spaces where your natural empathy can create beautiful connections."
          : isMidSign
            ? "Born in mid-Pisces (March 1-10), you balance your dreamy nature with growing practical wisdom. Your Neptune energy is enhanced by your ability to maintain healthy boundaries while remaining open to love's magic. You're attracting partners who appreciate both your imaginative spirit and your emotional intelligence. Your evolved Pisces traits make you particularly appealing to earth and fire signs who are drawn to your ability to bring magic and meaning to their lives while remaining grounded in reality."
            : "Born in late Pisces (March 11-20), your water energy is deep and wise. You've learned to channel your natural empathy and intuition into creating beautiful, healing relationships that honor both dreams and reality. Your mature Pisces energy attracts partners who seek both magic and substance, romance and practical compatibility. You're particularly magnetic to those who understand that the most beautiful love stories are those that help both people become their most authentic, creative, and compassionate selves.",
      },
    }
    return horoscopes[sign] || horoscopes["Leo"]
  }

  const generateChart = () => {
    setShowChart(true)
  }

  const suggestZodiacUsers = () => {
    const userZodiac = calculateZodiacSign(birthData.date)

    // Send message to parent app to show zodiac matches
    if (window.parent) {
      window.parent.postMessage(
        {
          type: "SUGGEST_ZODIAC_USERS",
          payload: {
            zodiacSign: userZodiac,
            userId: currentUser.id,
          },
        },
        "*",
      )
    }

    // Also switch to search tab locally
    const searchTab = document.querySelector('[value="search"]') as HTMLElement
    if (searchTab) searchTab.click()
  }

  const userZodiac = calculateZodiacSign(birthData.date)
  const datingHoroscope = getDatingHoroscope(userZodiac, birthData.date)
  const dailyTip = getDailyLoveTip(userZodiac)
  const luckyColors = getLuckyColors(userZodiac)

  return (
    <div className="p-4 space-y-4 h-[calc(100vh-120px)] overflow-y-auto">
      {/* Daily Love Tip */}
      <Card className="bg-gradient-to-r from-pink-800 to-purple-800 border-pink-600">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💡</span>
            <h3 className="text-white font-semibold">Today's Love Tip</h3>
          </div>
          <p className="text-pink-100 text-sm">{dailyTip}</p>
        </CardContent>
      </Card>

      {/* Lucky Colors */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            Today's Lucky Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-600"
                style={{ backgroundColor: luckyColors.primary.toLowerCase() }}
              ></div>
              <p className="text-white text-xs font-medium">Primary</p>
              <p className="text-gray-400 text-xs">{luckyColors.primary}</p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-600"
                style={{ backgroundColor: luckyColors.secondary.toLowerCase() }}
              ></div>
              <p className="text-white text-xs font-medium">Secondary</p>
              <p className="text-gray-400 text-xs">{luckyColors.secondary}</p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-600"
                style={{ backgroundColor: luckyColors.accent.toLowerCase() }}
              ></div>
              <p className="text-white text-xs font-medium">Accent</p>
              <p className="text-gray-400 text-xs">{luckyColors.accent}</p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-gray-300 text-xs">
              💫 Wear these colors on dates or incorporate them into your outfit for extra cosmic confidence!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Birth Chart Calculator */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            Birth Chart Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="date" className="text-gray-300">
              Date of Birth
            </Label>
            <Input
              id="date"
              type="date"
              value={birthData.date}
              onChange={(e) => setBirthData({ ...birthData, date: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="time" className="text-gray-300">
              Time of Birth
            </Label>
            <Input
              id="time"
              type="time"
              value={birthData.time}
              onChange={(e) => setBirthData({ ...birthData, time: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label htmlFor="place" className="text-gray-300">
              Birth Place
            </Label>
            <Input
              id="place"
              value={birthData.place}
              onChange={(e) => setBirthData({ ...birthData, place: e.target.value })}
              placeholder="Enter city, country"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <Button
            onClick={generateChart}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Calculate Birth Chart
          </Button>
        </CardContent>
      </Card>

      {/* Current Zodiac Info */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4 text-center">
          <div className="text-6xl mb-2">{getZodiacEmoji(userZodiac)}</div>
          <h3 className="text-xl font-semibold text-white mb-1">Your Sign: {userZodiac}</h3>
          <p className="text-gray-400 text-sm mb-3">Born: {new Date(birthData.date).toLocaleDateString()}</p>
          <Badge className="bg-orange-500 hover:bg-orange-600">
            {getZodiacEmoji(userZodiac)} {userZodiac}
          </Badge>
        </CardContent>
      </Card>

      {/* Dating Horoscope */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span className="text-2xl">💕</span>
            Your Love Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">{userZodiac} Dating Energy</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {showFullHoroscope ? datingHoroscope.full : datingHoroscope.preview}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullHoroscope(!showFullHoroscope)}
              className="text-purple-400 hover:text-purple-300 mt-3 p-0 h-auto"
            >
              {showFullHoroscope ? "Show Less" : "Read More"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Birth Chart Results */}
      {showChart && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Birth Chart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Simulated birth chart wheel */}
            <div className="relative w-48 h-48 mx-auto bg-gradient-to-br from-blue-900 to-purple-900 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-4xl">{getZodiacEmoji(userZodiac)}</span>
              </div>
              {/* Zodiac positions around the wheel */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs">♈</div>
              <div className="absolute top-6 right-6 text-white text-xs">♉</div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs">♊</div>
              <div className="absolute bottom-6 right-6 text-white text-xs">♋</div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs">♌</div>
              <div className="absolute bottom-6 left-6 text-white text-xs">♍</div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs">♎</div>
              <div className="absolute top-6 left-6 text-white text-xs">♏</div>
            </div>

            {/* Planetary positions */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Planetary Positions</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-300">☉ Sun: {userZodiac}</div>
                <div className="text-gray-300">☽ Moon: Cancer</div>
                <div className="text-gray-300">☿ Mercury: Virgo</div>
                <div className="text-gray-300">♀ Venus: Libra</div>
                <div className="text-gray-300">♂ Mars: Aries</div>
                <div className="text-gray-300">♃ Jupiter: Sagittarius</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zodiac Match Suggestion */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4 text-center">
          <h4 className="text-white font-semibold mb-2">Find Your Zodiac Twin</h4>
          <p className="text-gray-300 text-sm mb-3">
            Want to connect with other {userZodiac}s? Discover people who share your zodiac sign!
          </p>
          <Button
            onClick={suggestZodiacUsers}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600"
          >
            Suggest users with the same zodiac as you?
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
