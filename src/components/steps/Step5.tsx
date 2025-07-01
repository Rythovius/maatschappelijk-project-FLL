'use client'

import { useState } from 'react'

interface Step5Data {
  inleiding: string
  aanpak: string
  uitvoering: string
  conclusie: string
  bronnenlijst: string
}

interface Step2Data {
  doel: string
  ideaalSituatie: string
  tevreden: string
  nietTevreden: string
}

interface Step5Props {
  data: Step5Data
  onUpdate: (data: Partial<Step5Data>) => void
  step2Data?: Step2Data // Add step2 data as optional prop
}

export default function Step5({ data, onUpdate, step2Data }: Step5Props) {
  const [showGoalsModal, setShowGoalsModal] = useState(false)

  const getCompletedSections = () => {
    return Object.values(data).filter(section => section.trim().length > 0).length
  }

  const hasStep2Data = step2Data && (step2Data.doel || step2Data.ideaalSituatie || step2Data.tevreden || step2Data.nietTevreden)

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white text-sm">
            5
          </span>
          Stap 5: Uitvoering & Het eindverslag
        </h2>
        <p className="text-gray-600">
          Voer je plan uit en schrijf je eindverslag. Het verslag is een beschrijving van wat jullie hebben gedaan.
        </p>
      </div>

      {/* Uitleg */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Van plan naar uitvoering</h3>
        <div className="text-blue-700 space-y-3">
          <p>
            Nu je onderwerp bekend is, je doelen zijn gesteld, en je alle benodigde kennis en informatie hebt opgedaan, 
            kun je je plan gaan uitvoeren. Bij deze stap ga je dus daadwerkelijk <strong>doen</strong> wat je wilde doen, 
            <strong>maken</strong> wat je wilde maken.
          </p>
          <p className="font-medium">
            Het eindverslag is simpelweg een verslag van wat jullie tijdens het project allemaal gedaan hebben.
          </p>
        </div>
      </div>

      {/* Doelen uit Stap 2 - Herinnering */}
      {hasStep2Data && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-purple-800 flex items-center">
              🎯 Vergeet je doelen niet!
            </h3>
            <button
              onClick={() => setShowGoalsModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Bekijk je doelen uit Stap 2</span>
            </button>
          </div>
          <div className="text-purple-700">
            <p className="text-sm">
              Bij het schrijven van je eindverslag is het belangrijk om terug te kijken naar de doelen die je in Stap 2 hebt gesteld. 
              <strong> Gebruik de knop hierboven om je doelen te bekijken</strong> en verwerk deze in je conclusie.
            </p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Zijn je doelen behaald?</li>
              <li>Wat ging anders dan verwacht?</li>
              <li>Ben je tevreden met het resultaat?</li>
            </ul>
          </div>
        </div>
      )}

      {/* Goals Modal */}
      {showGoalsModal && hasStep2Data && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                    2
                  </span>
                  Jouw doelen uit Stap 2
                </h3>
                <button
                  onClick={() => setShowGoalsModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {step2Data?.doel && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Hoofddoel</h4>
                    <p className="text-blue-700 text-sm whitespace-pre-wrap">{step2Data.doel}</p>
                  </div>
                )}

                {step2Data?.ideaalSituatie && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✨ Ideale situatie</h4>
                    <p className="text-green-700 text-sm whitespace-pre-wrap">{step2Data.ideaalSituatie}</p>
                  </div>
                )}

                {step2Data?.tevreden && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">😊 Tevreden wanneer</h4>
                    <p className="text-yellow-700 text-sm whitespace-pre-wrap">{step2Data.tevreden}</p>
                  </div>
                )}

                {step2Data?.nietTevreden && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">😞 Niet tevreden wanneer</h4>
                    <p className="text-red-700 text-sm whitespace-pre-wrap">{step2Data.nietTevreden}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Tip voor je conclusie</h4>
                <p className="text-gray-700 text-sm">
                  Gebruik deze doelen bij het schrijven van je conclusie. Vergelijk wat je wilde bereiken met wat je daadwerkelijk hebt bereikt. 
                  Dit maakt je conclusie veel sterker en persoonlijker!
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowGoalsModal(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verslag secties */}
      <div className="space-y-8">
        {/* Inleiding */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            📝 Inleiding
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Wat schrijf je hier:</strong> Leg uit wat je wilde doen en waarom je dat wilde. 
              Dit komt uit je handelingsdeel (Stap 2).
            </p>
          </div>
          <textarea
            value={data.inleiding}
            onChange={(e) => onUpdate({ inleiding: e.target.value })}
            placeholder="Beschrijf hier wat jullie wilden bereiken en waarom jullie dit project hebben gekozen..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={6}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.inleiding.length} karakters
          </div>
        </div>

        {/* Aanpak */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            🔍 Aanpak
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Wat schrijf je hier:</strong> Leg uit welke bronnen je hebt gebruikt om aan informatie te komen 
              en hoe die informatie je heeft geholpen. Beschrijf je bronnen goed en vermeld geen plagiaat.
            </p>
          </div>
          <textarea
            value={data.aanpak}
            onChange={(e) => onUpdate({ aanpak: e.target.value })}
            placeholder="Beschrijf welke bronnen je hebt gebruikt, hoe je informatie hebt verzameld, en hoe dit je heeft geholpen..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={6}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.aanpak.length} karakters
          </div>
        </div>

        {/* Uitvoering */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            🛠️ Uitvoering
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Wat schrijf je hier:</strong> Leg uit wat je uiteindelijk hebt gedaan. Beschrijf zo gedetailleerd 
              mogelijk wat er allemaal gebeurde of wat je hebt gemaakt. Je kunt foto's gebruiken om te illustreren.
            </p>
          </div>
          <textarea
            value={data.uitvoering}
            onChange={(e) => onUpdate({ uitvoering: e.target.value })}
            placeholder="Beschrijf stap voor stap wat jullie hebben gedaan, welke problemen jullie tegenkwamen, en hoe jullie deze hebben opgelost..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={8}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.uitvoering.length} karakters
          </div>
        </div>

        {/* Conclusie */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              🎯 Conclusie
            </h3>
            {hasStep2Data && (
              <button
                onClick={() => setShowGoalsModal(true)}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center space-x-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Bekijk doelen</span>
              </button>
            )}
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-2">Je conclusie bevat:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Wat het doel was</strong> (gebruik je doelen uit Stap 2!)</li>
                <li>Wat er niet goed ging</li>
                <li>Welke oplossing je hiervoor hebt geprobeerd</li>
                <li>Hoe je verder bent gegaan als het niet op te lossen was</li>
                <li>Wat je de volgende keer anders zou willen doen</li>
                <li><strong>Of je tevreden bent</strong> (vergelijk met je criteria uit Stap 2)</li>
              </ul>
            </div>
          </div>
          <textarea
            value={data.conclusie}
            onChange={(e) => onUpdate({ conclusie: e.target.value })}
            placeholder="Evalueer jullie project: zijn de doelen behaald? Wat ging goed en wat niet? Wat zouden jullie anders doen? Vergeet niet je doelen uit Stap 2 te gebruiken!"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={8}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.conclusie.length} karakters
          </div>
        </div>

        {/* Bronnenlijst */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            📚 Bronnenlijst
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-2">Voorbeelden van bronvermelding:</p>
              <div className="space-y-2 text-xs">
                <div>
                  <strong>Internet:</strong> Achternaam, voorletter(s) (jaar). Titel. Geraadpleegd op dag maand jaar, URL
                </div>
                <div>
                  <strong>Boek:</strong> Achternaam, voorletter(s) (jaar). Titel. Plaats: uitgever
                </div>
                <div>
                  <strong>Artikel:</strong> Achternaam, voorletter(s) (datum). Titel artikel. Naam tijdschrift/krant, p.nummer
                </div>
              </div>
            </div>
          </div>
          <textarea
            value={data.bronnenlijst}
            onChange={(e) => onUpdate({ bronnenlijst: e.target.value })}
            placeholder="Lijst hier alle bronnen op die jullie hebben gebruikt, volgens de juiste bronvermelding..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-sm"
            rows={8}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.bronnenlijst.length} karakters
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">💡 Tips voor een goed eindverslag</h3>
        <div className="text-green-700 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Gebruik je doelen:</strong> Verwijs expliciet naar de doelen die je in Stap 2 hebt gesteld</li>
            <li><strong>Foto's:</strong> Gebruik foto's om te laten zien wat je hebt gedaan, maar leg altijd uit wat de lezer ziet</li>
            <li><strong>Eigen woorden:</strong> Schrijf alles in je eigen woorden, geen copy-paste uit bronnen</li>
            <li><strong>Eerlijk zijn:</strong> Vertel ook wat niet goed ging - dat hoort erbij!</li>
            <li><strong>Reflectie:</strong> Denk na over wat je hebt geleerd en wat je anders zou doen</li>
            <li><strong>Bronnen:</strong> Vermeld alle bronnen correct - dit voorkomt plagiaat</li>
          </ul>
        </div>
      </div>

      {/* Voortgang indicator */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Voortgang Stap 5:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${data.inleiding ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.aanpak ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.uitvoering ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.conclusie ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.bronnenlijst ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-600 ml-2">
              {getCompletedSections()}/5 secties voltooid
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}