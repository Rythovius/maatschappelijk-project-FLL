'use client'

interface Step5Data {
  inleiding: string
  aanpak: string
  uitvoering: string
  conclusie: string
  bronnenlijst: string
}

interface Step5Props {
  data: Step5Data
  onUpdate: (data: Partial<Step5Data>) => void
}

export default function Step5({ data, onUpdate }: Step5Props) {
  const getCompletedSections = () => {
    return Object.values(data).filter(section => section.trim().length > 0).length
  }

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
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            🎯 Conclusie
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-2">Je conclusie bevat:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Wat het doel was</li>
                <li>Wat er niet goed ging</li>
                <li>Welke oplossing je hiervoor hebt geprobeerd</li>
                <li>Hoe je verder bent gegaan als het niet op te lossen was</li>
                <li>Wat je de volgende keer anders zou willen doen</li>
              </ul>
            </div>
          </div>
          <textarea
            value={data.conclusie}
            onChange={(e) => onUpdate({ conclusie: e.target.value })}
            placeholder="Evalueer jullie project: zijn de doelen behaald? Wat ging goed en wat niet? Wat zouden jullie anders doen?"
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