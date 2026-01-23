export interface OfferData {
  hero: {
    overline: string;
    title: string;
    description: string;
    buttonText: string;
  };
  services: {
    title: string;
    description: string;
    services: Array<{ title: string; description: string }>;
    ctaText?: string;
    ctaPhone?: boolean;
  };
  pricing: {
    title: string;
    price: string;
    linkText: string;
    linkHref: string;
    additionalInfo: string;
    benefits: string[];
    buttonText: string;
  };
  process: {
    title: string;
    description: string;
    steps: Array<{ title: string; description: string }>;
  };
  form: {
    title: string;
    description: string;
  };
}

export const offerData = {
  obslugaKsiegowa: {
    hero: {
      overline: "Profesjonalna obsługa księgowa",
      title: "Twoje finanse w rękach ekspertów",
      description:
        "Skup się na rozwoju swojego biznesu, a nam zostaw formalności. Zapewniamy rzetelne prowadzenie ksiąg, bezpieczeństwo podatkowe i terminowość, której możesz ufać.",
      buttonText: "Sprawdź zakres usług",
    },
    services: {
      title: "Co obejmuje nasza obsługa księgowa?",
      description:
        "Dopasowujemy model współpracy do formy prawnej i skali Twojej działalności.",
      services: [
        {
          title: "Księgi Handlowe (Pełna Księgowość)",
          description:
            "Kompleksowe prowadzenie ksiąg dla spółek, sporządzanie sprawozdań finansowych oraz bieżąca kontrola wyniku finansowego.",
        },
        {
          title: "KPiR / Ryczałt",
          description:
            "Sprawna obsługa uproszczonych form księgowości dla JDG. Optymalizacja kosztów i precyzyjne wyliczanie podatków (PIT, VAT).",
        },
        {
          title: "Rachunkowość Zarządcza",
          description:
            "Dostarczamy raporty i analizy, które pomogą Ci podejmować trafne decyzje biznesowe w oparciu o twarde dane liczbowe.",
        },
        {
          title: "Obsługa Kadrowo-Płacowa",
          description:
            "Pełne administrowanie aktami osobowymi, naliczanie wynagrodzeń, obsługa ZUS oraz rozliczenia z PFRON.",
        },
      ],
      ctaText: "Masz pytania o księgowość? Zadzwoń do nas",
      ctaPhone: true,
    },
    pricing: {
      title: "Transparentne zasady rozliczeń",
      price: "Koszt obsługi już od XXX zł netto / mies.",
      linkText: "Zobacz pełny cennik usług księgowych",
      linkHref: "/cennik/",
      additionalInfo:
        "Ostateczna cena zależy od liczby dokumentów w miesiącu, formy opodatkowania oraz liczby zatrudnionych pracowników.",
      benefits: [
        "Dostęp do nowoczesnego systemu online.",
        "Reprezentacja przed US i ZUS.",
        "Wsparcie dedykowanego księgowego.",
      ],
      buttonText: "Poproś o indywidualną wycenę",
    },
    process: {
      title: "Jak zaczynamy współpracę?",
      description:
        "Wdrożenie Twojej firmy do naszego biura odbywa się w trzech prostych krokach.",
      steps: [
        {
          title: "Analiza potrzeb",
          description:
            "Rozmawiamy o Twoim biznesie, specyfice branży i wybieramy optymalny pakiet usług.",
        },
        {
          title: "Przekazanie dokumentacji",
          description:
            "Podpisujemy umowę i pełnomocnictwa, a Ty dostarczasz nam dokumenty za poprzednie okresy (lub zakładamy nową ewidencję).",
        },
        {
          title: "Bieżąca obsługa",
          description:
            "Ty przesyłasz dokumenty (również online), a my zajmujemy się resztą, informując Cię o wynikach i podatkach.",
        },
      ],
    },
    form: {
      title: "Przenieś swoją księgowość na wyższy poziom",
      description:
        "Zostaw swoje dane — oddzwonimy w ciągu 24h, aby porozmawiać o tym, jak możemy odciążyć Cię w Twojej codziennej pracy.",
    },
  } as OfferData,

  doradztwoPodatkowe: {
    hero: {
      overline: "Skuteczne doradztwo podatkowe",
      title: "Inteligentne strategie podatkowe dla Twojego biznesu",
      description:
        "Przepisy podatkowe zmieniają się dynamicznie. Pomagamy odnaleźć się w gąszczu regulacji, minimalizować ryzyko i legalnie optymalizować obciążenia fiskalne Twojej firmy.",
      buttonText: "Umów konsultację",
    },
    services: {
      title: "W czym możemy Ci pomóc?",
      description:
        "Oferujemy wsparcie doradcze na każdym etapie prowadzenia biznesu — od doraźnych opinii po kompleksowe audyty.",
      services: [
        {
          title: "Optymalizacja podatkowa",
          description:
            "Analizujemy Twoją sytuację finansową i wskazujemy bezpieczne sposoby na obniżenie podatków, wykorzystując dostępne ulgi i odliczenia.",
        },
        {
          title: "Opinie i interpretacje",
          description:
            "Przygotowujemy pisemne opinie prawne oraz wnioski o wydanie wiążących interpretacji indywidualnych do organów skarbowych.",
        },
        {
          title: "Audyt podatkowy",
          description:
            "Weryfikujemy poprawność dotychczasowych rozliczeń, identyfikujemy ewentualne nieprawidłowości i pomagamy je skutecznie skorygować.",
        },
      ],
      ctaText: "Potrzebujesz szybkiej porady? Zapytaj eksperta",
    },
    pricing: {
      title: "Koszt doradztwa podatkowego",
      price: "Konsultacja już od XXX zł netto.",
      linkText: "Pełna lista usług doradczych",
      linkHref: "/cennik/",
      additionalInfo:
        "Cena usługi zależy od stopnia skomplikowania problemu oraz czasu potrzebnego na przygotowanie analizy lub opinii.",
      benefits: [
        "Indywidualne podejście do każdego przypadku.",
        "Gwarancja poufności i bezpieczeństwa danych.",
        "Praktyczne rozwiązania, a nie tylko sucha teoria.",
      ],
      buttonText: "Zapytaj o wycenę analizy",
    },
    process: {
      title: "Jak wygląda doradztwo w praktyce?",
      description:
        "Skupiamy się na konkretnych rozwiązaniach, które przynoszą realne korzyści.",
      steps: [
        {
          title: "Przedstawienie problemu",
          description:
            "Opisujesz nam swoją sytuację lub pytanie podczas krótkiej rozmowy wstępnej.",
        },
        {
          title: "Analiza prawno-podatkowa",
          description:
            "Nasz zespół analizuje aktualne przepisy i orzecznictwo pod kątem Twojego przypadku.",
        },
        {
          title: "Rekomendacje",
          description:
            "Otrzymujesz konkretną odpowiedź, opinię lub plan działania z jasnymi wytycznymi, co należy zrobić.",
        },
      ],
    },
    form: {
      title: "Nie ryzykuj — postaw na wiedzę ekspertów",
      description:
        "Masz wątpliwości dotyczące podatków? Wypełnij formularz. Przeanalizujemy Twoją sprawę i zaproponujemy najlepsze rozwiązanie.",
    },
  } as OfferData,

  sprzedazGotowychSpolek: {
    hero: {
      overline: "Sprzedaż gotowych spółek",
      title: "Kup gotową spółkę i zacznij działać jeszcze dziś",
      description:
        "Omiń biurokrację i długie procesy rejestracyjne. Oferujemy w pełni zarejestrowane, czyste spółki z ograniczoną odpowiedzialnością, gotowe do podjęcia operacji biznesowych w 24 godziny.",
      buttonText: "Zobacz dostępne spółki",
    },
    services: {
      title: "Co otrzymujesz kupując gotową spółkę?",
      description:
        "Nasze spółki są starannie przygotowane pod kątem prawnym i formalnym, aby zapewnić Ci bezpieczny start.",
      services: [
        {
          title: "Komplet numerów (KRS, NIP, REGON)",
          description:
            "Spółka posiada wszystkie niezbędne numery identyfikacyjne oraz jest zarejestrowana jako czynny podatnik VAT/VAT-UE.",
        },
        {
          title: "Gwarancja braku zadłużenia",
          description:
            "Każdy podmiot posiada notarialne potwierdzenie czystej historii finansowej – brak operacji gospodarczych, brak długów i zobowiązań.",
        },
        {
          title: "Szerokie PKD i adres",
          description:
            "Spółki mają szeroki zakres kodów PKD, co pozwala na prowadzenie niemal każdej działalności, oraz posiadają już nadany adres siedziby.",
        },
      ],
      ctaText: "Potrzebujesz spółki w 24h? Zadzwoń teraz",
      ctaPhone: true,
    },
    pricing: {
      title: "Ile kosztuje zakup gotowej spółki?",
      price: "Gotowa spółka z o.o. już od XXX zł.",
      linkText: "Sprawdź listę dostępnych podmiotów",
      linkHref: "/cennik/",
      additionalInfo:
        "Cena obejmuje przekazanie pełnej dokumentacji spółki. Koszty notarialne związane z umową sprzedaży udziałów są ustalane indywidualnie.",
      benefits: [
        "Wszystkie opłaty sądowe i rejestracyjne.",
        "Pełna dokumentacja prawna spółki.",
        "Szybka ścieżka notarialna.",
      ],
      buttonText: "Zapytaj o listę dostępnych spółek",
    },
    process: {
      title: "Jak wygląda proces zakupu?",
      description:
        "Całą procedurę ograniczyliśmy do niezbędnego minimum, abyś mógł skupić się na zarabianiu.",
      steps: [
        {
          title: "Wybór spółki",
          description:
            "Wybierasz podmiot z naszej listy, który najlepiej odpowiada Twoim potrzebom.",
        },
        {
          title: "Wizyta u notariusza",
          description:
            "Podpisujemy umowę sprzedaży udziałów oraz dokonujemy zmian w zarządzie.",
        },
        {
          title: "Przejęcie dokumentów",
          description:
            "Od momentu podpisania umowy możesz wystawiać faktury i zawierać kontrakty w imieniu nowej spółki.",
        },
      ],
    },
    form: {
      title: "Rozpocznij działalność bez zbędnej zwłoki",
      description:
        "Chcesz wiedzieć, jakie spółki mamy obecnie w ofercie? Napisz do nas — prześlemy aktualną listę wraz z numerami KRS do weryfikacji.",
    },
  } as OfferData,

  rejestracjaFirmy: {
    hero: {
      overline: "Bezpieczna rejestracja firmy",
      title: "Założymy Twoją firmę za Ciebie — szybko i bezbłędnie",
      description:
        "Marzysz o własnym biznesie, ale przerażają Cię formalności? Pomożemy Ci przejść przez proces rejestracji, doradzimy w wyborze formy opodatkowania i dopilnujemy, aby Twoja firma od pierwszego dnia działała zgodnie z przepisami.",
      buttonText: "Załóż firmę z nami",
    },
    services: {
      title: "Kompleksowe wsparcie przy zakładaniu działalności",
      description:
        "Rejestracja to coś więcej niż wypełnienie wniosku. To strategiczne decyzje, które wpłyną na Twoje finanse w przyszłości.",
      services: [
        {
          title: "Wybór formy prawnej i opodatkowania",
          description:
            "Analizujemy Twoje planowane przychody i koszty, aby doradzić, czy lepiej wybrać JDG, czy spółkę oraz która forma opodatkowania (Ryczałt, Skala, Podatek Liniowy) będzie najkorzystniejsza.",
        },
        {
          title: "Przygotowanie wniosków (CEIDG/KRS)",
          description:
            "Wypełniamy za Ciebie wszystkie formularze rejestracyjne, dbając o poprawne kody PKD i zgłoszenia do odpowiednich urzędów.",
        },
        {
          title: "Zgłoszenia do VAT i ZUS",
          description:
            "Rejestrujemy Cię jako podatnika VAT (jeśli to konieczne) oraz dopełniamy formalności w ZUS, abyś mógł skorzystać z dostępnych ulg na start (np. Ulga na start, Mały ZUS Plus).",
        },
      ],
      ctaText: "Pierwsza konsultacja przed założeniem firmy? Umów się",
    },
    pricing: {
      title: "Ile kosztuje pomoc w rejestracji?",
      price: "Rejestracja firmy już od XXX zł",
      linkText: "Sprawdź pakiety na start dla nowych firm",
      linkHref: "/cennik/",
      additionalInfo:
        "Koszt zależy od formy prawnej (JDG vs. Spółka z o.o.). Często oferujemy rejestrację w cenie, jeśli zdecydujesz się na dłuższą współpracę księgową.",
      benefits: [
        "Analiza optymalizacji podatkowej na start.",
        "Pomoc w wyborze kodów PKD.",
        "Wsparcie techniczne przy składaniu podpisu elektronicznego/Profilu Zaufanego.",
      ],
      buttonText: "Zapytaj o darmową rejestrację",
    },
    process: {
      title: "Droga do własnej firmy w 3 krokach",
      description:
        "Oszczędzamy Twój czas — większość formalności załatwimy zdalnie.",
      steps: [
        {
          title: "Konsultacja wstępna",
          description:
            "Ustalamy profil działalności, wybieramy formę opodatkowania i zbieramy niezbędne dane do wniosków.",
        },
        {
          title: "Przygotowanie i wysyłka dokumentów",
          description:
            "Przygotowujemy kompletną dokumentację. Ty zatwierdzasz ją Profilem Zaufanym lub podpisem kwalifikowanym.",
        },
        {
          title: "Start biznesu",
          description:
            "Twoja firma zostaje wpisana do rejestru. Otrzymujesz od nas potwierdzenia nadania NIP i REGON — możesz legalnie działać!",
        },
      ],
    },
    form: {
      title: "Gotowy na otwarcie własnego biznesu?",
      description:
        "Nie trać czasu na wertowanie poradników w internecie. Wypełnij formularz, a nasz doradca skontaktuje się z Tobą i przeprowadzi Cię przez cały proces krok po kroku.",
    },
  } as OfferData,
};
