'use client'

interface BronData {
  url: string
  waarom: string
  samenvatting: string
}

interface Step4Data {
  bron1: BronData
  bron2: BronData
  bron3: BronData
  bron4: BronData
  bron5: BronData
  bron6: BronData
}

interface Step4Props {
  data: Step4Data
  onUpdate: (data: Partial<Step4Data>) => void
}

export default function Step4({ data, onUpdate }: Step4Props) {
  const updateBron = (bronKey: keyof Step4Data, field: keyof BronData, value: string) => {
    onUpdate({
      [bronKey]: {
        ...data[bronKey],
        [field]: value
      }
    })
  }

  const getCompletedBronnen = () => {
    return Object.values(data).filter(bron => bron.url && bron.waarom && bron.samenvatting).length
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white text-sm">
            4
          </span>
          Stap 4: Informatie zoeken
        </h2>
        <p className="text-gray-600">
          Verzamel informatie voor de vragen waarop je nog geen antwoord hebt. Zoek betrouwbare bronnen en maak samenvattingen.
        </p>
      </div>

      {/* Uitleg */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Hoe zoek je goede informatie?</h3>
        <div className="text-blue-700 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">🎤 Interviews</h4>
              <ul className="text-sm space-y-1">
                <li>• Leg contact met experts</li>
                <li>• Bedenk van tevoren goede vragen</li>
                <li>• Werk antwoorden netjes uit</li>
                <li>• Sla alles op in een Word-bestand</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🌐 Internet onderzoek</h4>
              <ul className="text-sm space-y-1">
                <li>• Bedenk eerst goede zoektermen</li>
                <li>• Kies betrouwbare bronnen</li>
                <li>• Bewaar altijd de URL</li>
                <li>• Maak korte samenvattingen</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mt-4">
            <p className="text-yellow-800 text-sm">
              <strong>⚠️ Belangrijk:</strong> Voor het opslaan van informatie mag je knippen en plakken. 
              In je uiteindelijke werkstuk mag dit niet - dan moet je alles in eigen woorden schrijven!
            </p>
          </div>
        </div>
      </div>

      {/* Bronnen */}
      <div className="space-y-8">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const bronKey = `bron${num}` as keyof Step4Data
          const bron = data[bronKey]
          const isCompleted = bron.url && bron.waarom && bron.samenvatting

          return (
            <div key={num} className={`border rounded-lg p-6 ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Bron {num}
                </h3>
                {isCompleted && (
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Voltooid
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL van de bron:
                  </label>
                  <input
                    type="url"
                    value={bron.url}
                    onChange={(e) => updateBron(bronKey, 'url', e.target.value)}
                    placeholder="https://www.voorbeeld.nl/artikel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waarom heb je deze bron gekozen?
                  </label>
                  <div className="text-xs text-gray-500 mb-2">
                    Denk aan: Past goed bij het onderwerp • Is betrouwbaar, want...
                  </div>
                  <textarea
                    value={bron.waarom}
                    onChange={(e) => updateBron(bronKey, 'waarom', e.target.value)}
                    placeholder="Leg uit waarom deze bron geschikt en betrouwbaar is voor jullie onderwerp..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Korte samenvatting van de bron:
                  </label>
                  <div className="text-xs text-gray-500 mb-2">
                    Wat staat er in de bron dat je kunt gebruiken? Maak een heel korte samenvatting.
                  </div>
                  <textarea
                    value={bron.samenvatting}
                    onChange={(e) => updateBron(bronKey, 'samenvatting', e.target.value)}
                    placeholder="Vat de belangrijkste informatie uit deze bron samen..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {bron.samenvatting.length} karakters
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tips voor betrouwbare bronnen */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">🔍 Tips voor betrouwbare bronnen</h3>
        <div className="text-green-700 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">✅ Betrouwbare bronnen:</h4>
              <ul className="text-sm space-y-1">
                <li>• Overheidswebsites (.gov.nl)</li>
                <li>• Onderwijsinstellingen (.edu)</li>
                <li>• Wetenschappelijke artikelen</li>
                <li>• Bekende nieuwsorganisaties</li>
                <li>• Officiële organisaties</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">❌ Minder betrouwbaar:</h4>
              <ul className="text-sm space-y-1">
                <li>• Wikipedia (wel goed voor eerste oriëntatie)</li>
                <li>• Blogs zonder bronvermelding</li>
                <li>• Social media posts</li>
                <li>• Commerciële websites met belangen</li>
                <li>• Oude informatie (>5 jaar)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Voortgang indicator */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Voortgang Stap 4:</span>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const bronKey = `bron${num}` as keyof Step4Data
              const bron = data[bronKey]
              const isCompleted = bron.url && bron.waarom && bron.samenvatting
              return (
                <div key={num} className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
              )
            })}
            <span className="text-sm text-gray-600 ml-2">
              {getCompletedBronnen()}/6 bronnen voltooid
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}