# 📚 Rythovius WON Onderzoekshulp

> **Een digitale begeleider voor het maken van een werkstuk - Rythovius College**

Een educatieve Next.js applicatie die leerlingen stap voor stap begeleidt bij het maken van een werkstuk. De app volgt een gestructureerd 5-stappen plan en biedt AI-ondersteuning voor vragen en begeleiding.

## ✨ Functionaliteiten

### 📋 **5-Stappen Werkstuk Begeleiding**
- **Stap 1**: Het onderwerp bepalen - Specifiek, tastbaar en 'dichtbij'
- **Stap 2**: Handelingsdeel - Doelstellingen opstellen
- **Stap 3**: Kennisdeel - Deelvragen met 1-2-3 beoordelingssysteem
- **Stap 4**: Informatie zoeken - Bronnen verzamelen en evalueren
- **Stap 5**: Uitvoering & Eindverslag - Plan uitvoeren en verslag schrijven

### 🤖 **AI Assistent**
- Context-bewuste AI begeleiding per stap
- Streaming responses voor real-time feedback
- Hulp bij brainstormen en probleemoplossing
- Educatieve en motiverende reacties

### 📄 **Export Functionaliteiten**
- **PDF Export**: Volledig werkstuk overzicht met professionele opmaak
- Automatische paginering en structurering
- Datum en paginanummering
- Alle stappen netjes geformatteerd

### 💾 **Automatische Opslag**
- Lokale opslag van alle voortgang
- Geen data verlies bij browser refresh
- Stap-voor-stap voortgang tracking
- Hervatten waar je gebleven bent

### 🎯 **Gebruiksvriendelijk Design**
- Intuïtieve stap-voor-stap interface
- Visuele voortgangsindicatoren
- Responsive design voor alle apparaten
- Educatieve tips en voorbeelden per stap

## 🚀 Quick Start

### Lokale Development
```bash
# Clone het project
git clone [repository-url]
cd rythovius-won-onderzoekshulp

# Dependencies installeren
npm install

# Environment variables (optioneel voor AI functionaliteit)
cp .env.example .env.local
# Voeg je Gemini API key toe voor AI assistent

# Development server starten
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
# Build voor productie
npm run build

# Start productie server
npm start
```

## 🛠️ Technische Details

### Tech Stack
- **Framework**: Next.js 15.3.3
- **Styling**: Tailwind CSS
- **TypeScript**: Volledig type-safe
- **AI**: Google Gemini API (optioneel)
- **PDF**: jsPDF voor export functionaliteit
- **Storage**: Browser localStorage

### Project Structuur
```
src/
├── app/
│   ├── layout.tsx          # App layout & metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styling
│   └── api/
│       └── chat-stream/    # AI streaming endpoint
├── components/
│   ├── EducationalApp.tsx  # Main app component
│   ├── PDFExport.tsx       # PDF export functionality
│   ├── AIChat.tsx          # AI assistant chat
│   └── steps/
│       ├── Step1.tsx       # Onderwerp bepalen
│       ├── Step2.tsx       # Handelingsdeel
│       ├── Step3.tsx       # Kennisdeel
│       ├── Step4.tsx       # Informatie zoeken
│       └── Step5.tsx       # Uitvoering & verslag
```

### Environment Variables (Optioneel)
```env
# Voor AI assistent functionaliteit
GEMINI_API_KEY=your_gemini_api_key_here
```

## 📚 Gebruikshandleiding

### Voor Leerlingen
1. **Start bij Stap 1** en werk systematisch door alle stappen
2. **Gebruik de tips** in de sidebar voor hulp per stap
3. **Stel vragen** aan de AI assistent als je vastloopt
4. **Exporteer je werk** als PDF wanneer je klaar bent
5. **Je voortgang wordt automatisch opgeslagen**

### Voor Docenten
- Leerlingen kunnen hun PDF export inleveren
- Alle stappen zijn duidelijk gestructureerd volgens onderwijsstandaarden
- AI assistent geeft educatieve, geen directe antwoorden
- Geschikt voor WON (Wetenschapsoriëntatie en Onderzoeksvaardigheden)

## 🎓 Educatieve Doelen

### Onderzoeksvaardigheden
- **Onderwerp formuleren**: Van breed naar specifiek
- **Doelen stellen**: SMART doelstellingen
- **Informatie evalueren**: Betrouwbare bronnen herkennen
- **Bronvermelding**: Correcte academische bronvermelding
- **Reflectie**: Kritisch nadenken over het proces

### 21e Eeuwse Vaardigheden
- **Digitale geletterdheid**: Werken met online tools
- **Zelfstandig leren**: Eigen tempo en planning
- **Kritisch denken**: Informatie beoordelen en analyseren
- **Communicatie**: Helder verslag schrijven

## 🔧 Deployment

### Vercel (Aanbevolen)
```bash
# Automatische deployment via GitHub
1. Push naar GitHub repository
2. Connect met Vercel
3. Automatische builds bij elke push
4. Environment variables instellen in Vercel dashboard
```

### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: .next
Node version: 18.x
```

### Andere Platforms
De app is een standaard Next.js applicatie en kan op elke platform draaien die Node.js ondersteunt.

## 🤝 Contributing

### Development Guidelines
- Gebruik TypeScript voor alle nieuwe code
- Volg de bestaande component structuur
- Test alle functionaliteiten voor commit
- Houd de educatieve focus in gedachten

### Bug Reports
Voor bugs of feature requests, maak een issue aan met:
- Beschrijving van het probleem
- Stappen om te reproduceren
- Browser en OS informatie
- Screenshots indien relevant

## 📞 Support

### Voor Docenten
- Implementatie hulp beschikbaar
- Training sessies mogelijk
- Aanpassingen voor specifieke behoeften

### Voor Leerlingen
- Ingebouwde AI assistent voor directe hulp
- Duidelijke instructies per stap
- Tips en voorbeelden in de interface

## 🏫 Over Rythovius College

Deze applicatie is ontwikkeld voor het Rythovius College om leerlingen te ondersteunen bij het maken van werkstukken binnen het vak WON (Wetenschapsoriëntatie en Onderzoeksvaardigheden).

**Missie**: Leerlingen begeleiden naar zelfstandig en kritisch onderzoek doen.

---

## 🎉 **Klaar om te Beginnen?**

Start je werkstuk vandaag nog met deze digitale begeleider. Van onderwerp kiezen tot eindverslag schrijven - alles wat je nodig hebt in één overzichtelijke tool!

**📚 Veel succes met je werkstuk!**

---

*Rythovius WON Onderzoekshulp v1.0*  
*Rythovius College - Digitaal Onderwijs*