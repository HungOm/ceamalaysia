export const seoConfig = {
  default: {
    title: "K'Cho Ethnic Association Malaysia | CEAM",
    titleTemplate: "%s | CEAM",
    description: "CEAM empowers K'Cho refugees from Myanmar's Chin State through education, shelter services, cultural preservation, and community support programs in Malaysia. Supporting families from Mindat, Kanpetlet, Matupi, Paletwa, and Yaw regions.",
    keywords: [
      // Primary Keywords
      "K'Cho refugees Malaysia",
      "Chin refugees Malaysia",
      "CEAM Malaysia",
      "K'Cho Ethnic Association",
      "Myanmar refugees Malaysia",
      "Burma refugees Malaysia",

      // Ethnic Groups & Dialects
      "Mün Chin",
      "Mün dialect",
      "Dai Chin",
      "Daai Chin",
      "M'Kaang Chin",
      "Daa Yindu",
      "Uppu Chin",
      "Ngagra Chin",
      "Matu Chin",
      "Zotung Chin",
      "Mara Chin",
      "Lautu Chin",
      "Senthang Chin",

      // Regional Keywords
      "Mindat K'Cho community",
      "Kanpetlet Chin refugees",
      "Matupi K'Cho Malaysia",
      "Paletwa Chin community",
      "Yaw region refugees",
      "Southern Chin State",

      // Service Keywords
      "refugee education Malaysia",
      "refugee shelter services",
      "refugee community support",
      "refugee children education",
      "vulnerable refugee assistance",
      "Chin refugee community center",

      // Cultural Keywords
      "K'Cho cultural preservation",
      "Chin language programs",
      "Myanmar ethnic minorities",
      "Chin State heritage",
      "K'Cho traditional culture",
      "Chin festivals Malaysia",

      // Support Keywords
      "refugee volunteer opportunities",
      "donate refugee organization",
      "support Myanmar refugees",
      "refugee NGO Malaysia",
      "humanitarian aid Malaysia",
      "community-based organization Malaysia",

      // Related Organizations & Partners
      "Alliance of Chin Refugees (ACR)",
      "Chin Refugee Committee (CRC)",
      "UNHCR Malaysia",
      "Coalition of Burma Ethnics Malaysia (COBEM)",
      "Zomi Association of Malaysia (ZAM)",
      "Chin Student Organization (CSO)",
      "Independent Chin Community (ICC)",
      "Refuge for The Refugees (RFTR)",
      "Myanmar Ethnic Women Refugee Organisation (MEWRO)",
      "Myanmar Ethnics Organization (MEO)",
      "Kachin Refugee Committee (KRC)",
      "Mon Refugee Organization (MRO)",
      "Shan Refugee Committee (SRC)",
      "Arakan Refugee Relief Committee (ARRC)",
      "Organization of Karenni Development (OKD)",
      "Asylum Access Malaysia",
      "Tenaganita",
      "International Catholic Migration Commission (ICMC)",
      "Refugee community organizations Malaysia",
      "Chin community leaders Malaysia"
    ].join(", "),
    openGraph: {
      type: 'website',
      locale: 'en_MY',
      site_name: "K'Cho Ethnic Association Malaysia",
      images: [{
        url: 'https://ceamalaysia.org/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: "CEAM - Empowering K'Cho Refugee Communities"
      }]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ceamalaysia',
      creator: '@ceamalaysia'
    }
  },

  pages: {
    home: {
      title: "Empowering K'Cho Refugee Communities",
      description: "CEAM provides comprehensive support for K'Cho refugees in Malaysia through education, shelter, healthcare, and cultural programs. Join us in building resilient communities.",
      keywords: [
        "K'Cho refugee support",
        "Myanmar refugee assistance",
        "Chin community Malaysia",
        "Mün Dai M'Kaang Daa Yindu communities",
        "Mindat Kanpetlet Matupi Paletwa refugees",
        "refugee education programs",
        "humanitarian organization Malaysia",
        "K'Cho cultural preservation",
        "refugee children support",
        "community-based organization",
        "Chin refugee shelter"
      ].join(", "),
      openGraph: {
        title: "K'Cho Ethnic Association Malaysia - Empowering Communities",
        description: "Supporting 8,000+ K'Cho refugees through education, shelter, and community programs",
        images: [{
          url: 'https://ceamalaysia.org/images/og-home.jpg',
          width: 1200,
          height: 630
        }]
      }
    },

    about: {
      title: "About K'Cho People & Our Mission",
      description: "Learn about the K'Cho ethnic group from Myanmar's Chin State, their journey as refugees, and CEAM's mission to support community resilience and cultural preservation in Malaysia.",
      keywords: [
        "K'Cho people history",
        "Chin State Myanmar",
        "K'Cho culture traditions",
        "Myanmar ethnic minorities",
        "refugee community Malaysia",
        "CEAM mission vision",
        "K'Cho heritage preservation",
        "Mindat Kanpetlet Matupi"
      ].join(", "),
      openGraph: {
        title: "About K'Cho People - Heritage, History & Hope",
        description: "Discover the rich heritage of K'Cho people and CEAM's mission to support refugee communities",
        images: [{
          url: 'https://ceamalaysia.org/images/og-about.jpg',
          width: 1200,
          height: 630
        }]
      }
    },

    initiatives: {
      title: "Community Programs & Initiatives",
      description: "Explore CEAM's comprehensive initiatives supporting K'Cho refugees including emergency aid, healthcare navigation, cultural programs, and integration support services.",
      keywords: [
        "refugee support programs",
        "community initiatives Malaysia",
        "K'Cho cultural events",
        "refugee healthcare support",
        "emergency aid services",
        "integration programs",
        "UNHCR registration help",
        "refugee advocacy Malaysia"
      ].join(", "),
      openGraph: {
        title: "CEAM Initiatives - Comprehensive Refugee Support",
        description: "Discover our programs empowering K'Cho refugees through education, healthcare, and community services",
        images: [{
          url: 'https://ceamalaysia.org/images/og-initiatives.jpg',
          width: 1200,
          height: 630
        }]
      }
    },

    learningCenters: {
      title: "Education for K'Cho Refugee Children",
      description: "CEAM Learning Centers provide quality education for 500+ refugee children, offering primary education, language programs, and cultural studies to bridge educational gaps.",
      keywords: [
        "refugee education Malaysia",
        "K'Cho learning centers",
        "refugee children school",
        "community-based education",
        "primary education refugees",
        "K'Cho language classes",
        "mother tongue education",
        "informal education Malaysia",
        "refugee literacy programs",
        "educational support services"
      ].join(", "),
      openGraph: {
        title: "CEAM Learning Centers - Education for Refugee Children",
        description: "Quality education for 500+ K'Cho refugee children through community-based learning centers",
        images: [{
          url: 'https://ceamalaysia.org/images/og-education.jpg',
          width: 1200,
          height: 630
        }]
      }
    },

    shelter: {
      title: "Shelter & Care for Vulnerable Refugees",
      description: "CEAM Shelter Services provide safe housing, healthcare, and rehabilitation for vulnerable K'Cho refugees including elderly, disabled, and those with mental health needs.",
      keywords: [
        "refugee shelter Malaysia",
        "vulnerable refugee support",
        "emergency housing refugees",
        "mental health services",
        "disability support refugees",
        "elderly refugee care",
        "humanitarian shelter",
        "refugee rehabilitation",
        "crisis accommodation",
        "refugee healthcare support"
      ].join(", "),
      openGraph: {
        title: "CEAM Shelter Services - Safe Haven for Vulnerable Refugees",
        description: "Providing dignity and care for vulnerable K'Cho refugees through comprehensive shelter services",
        images: [{
          url: 'https://ceamalaysia.org/images/og-shelter.jpg',
          width: 1200,
          height: 630
        }]
      }
    },

    contact: {
      title: "Contact CEAM - Get Involved",
      description: "Connect with K'Cho Ethnic Association Malaysia. Learn how to volunteer, donate, or partner with us to support refugee communities. Together, we can make a difference.",
      keywords: [
        "contact CEAM",
        "volunteer refugee organization",
        "donate refugee cause",
        "partner NGO Malaysia",
        "support K'Cho refugees",
        "refugee assistance Malaysia",
        "humanitarian contact",
        "help refugees Malaysia"
      ].join(", "),
      openGraph: {
        title: "Contact CEAM - Join Our Mission",
        description: "Get involved in supporting K'Cho refugee communities through volunteering, donations, or partnerships",
        images: [{
          url: 'https://ceamalaysia.org/images/og-contact.jpg',
          width: 1200,
          height: 630
        }]
      }
    },

    donate: {
      title: "Support K'Cho Refugees - Donate Today",
      description: "Your donation helps provide education, shelter, healthcare, and hope for K'Cho refugee families. Every contribution makes a real difference in building resilient communities.",
      keywords: [
        "donate refugee cause",
        "support Myanmar refugees",
        "refugee donation Malaysia",
        "humanitarian aid donation",
        "sponsor refugee education",
        "K'Cho community support",
        "refugee charity Malaysia",
        "help Chin refugees"
      ].join(", "),
      openGraph: {
        title: "Donate to CEAM - Transform Lives Today",
        description: "Support 8,000+ K'Cho refugees through education, shelter, and community programs",
        images: [{
          url: 'https://ceamalaysia.org/images/og-donate.jpg',
          width: 1200,
          height: 630
        }]
      }
    },

    volunteer: {
      title: "Volunteer with K'Cho Refugees",
      description: "Make a meaningful impact by volunteering with CEAM. Opportunities in education, healthcare, administration, and community programs for K'Cho refugees in Malaysia.",
      keywords: [
        "volunteer refugee Malaysia",
        "teach refugee children",
        "humanitarian volunteer",
        "refugee support volunteer",
        "NGO volunteer Malaysia",
        "community service Malaysia",
        "help Myanmar refugees",
        "volunteer opportunities KL"
      ].join(", "),
      openGraph: {
        title: "Volunteer with CEAM - Make a Difference",
        description: "Join 50+ volunteers supporting K'Cho refugee communities through education and services",
        images: [{
          url: 'https://ceamalaysia.org/images/og-volunteer.jpg',
          width: 1200,
          height: 630
        }]
      }
    }
  },

  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "NGO",
      "name": "K'Cho Ethnic Association Malaysia",
      "alternateName": "CEAM",
      "url": "https://ceamalaysia.org",
      "logo": "https://ceamalaysia.org/images/logo.png",
      "description": "Community-based organization supporting K'Cho refugees from Myanmar in Malaysia",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kuala Lumpur",
        "addressCountry": "MY"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+60-11-6812-8634",
        "contactType": "customer service",
        "email": "contact@ceamalaysia.org",
        "availableLanguage": ["English", "Malay", "K'Cho", "Chin"]
      },
      "sameAs": [
        "https://facebook.com/ceamalaysia",
        "https://twitter.com/ceamalaysia",
        "https://instagram.com/ceamalaysia",
        "https://linkedin.com/company/ceamalaysia"
      ],
      "foundingDate": "2014",
      "keywords": "refugee support, K'Cho community, humanitarian aid, education, shelter services",
      "nonprofitStatus": "Community-Based Organization"
    }
  }
}