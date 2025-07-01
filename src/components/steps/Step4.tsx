'use client'

interface BronData {
  url: string
  waarom: string
  samenvatting: string
}

interface Step4Data {
  [key: string]: BronData // Allow dynamic bron keys
}

interface Step4Props {
  data: Step4Data
  onUpdate: (data: Partial<Step4Data>) => void
}

export default function Step4({ data, onUpdate }: Step4Props) {
  // Get all bron keys and sort them numerically
  const getBronKeys = () => {
    return Object.keys(data)
      .filter(key => key.startsWith('bron'))
      .sort((a, b) => {
        const numA = parseInt(a.replace('bron', ''))
        const numB = parseInt(b.replace('bron', ''))
        return numA - numB
      })
  }

  const updateBron = (bronKey: string, field: keyof BronData, value: string) => {
    onUpdate({
      [bronKey]: {
        ...data[bronKey],
        [field]: value
      }
    })
  }

  const addNewBron = () => {
    const bronKeys = getBronKeys()
    const lastBronNumber = bronKeys.length > 0 
      ? Math.max(...bronKeys.map(key => parseInt(key.replace('bron', ''))))
      : 0
    const newBronKey = `bron${lastBronNumber + 1}`
    
    onUpdate({
      [newBronKey]: { url: '', waarom: '', samenvatting: '' }
    })
  }

  const removeBron = (bronKey: string) => {
    const newData = { ...data }
    delete newData[bronKey]
    onUpdate(newData)
  }

  const getCompletedBronnen = () => {
    return getBronKeys().filter(key => {
      const bron = data[key]
      return bron.url && bron.waarom && bron.samenvatting
    }).length
  }

  const bronKeys = getBronKeys()

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

      {/* Bronnen header met add button */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Bronnen ({bronKeys.length})
        </h3>
        <button
          onClick={addNewBron}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Bron toevoegen</span>
        </button>
      </div>

      {/* Bronnen */}
      <div className="space-y-8">
        {bronKeys.map((bronKey) => {
          const bronNumber = parseInt(bronKey.replace('bron', ''))
          const bron = data[bronKey]
          const isCompleted = bron.url && bron.waarom && bron.samenvatting

          return (
            <div key={bronKey} className={`border rounded-lg p-6 ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Bron {bronNumber}
                </h3>
                <div className="flex items-center space-x-2">
                  {isCompleted && (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Voltooid
                    </span>
                  )}
                  {bronKeys.length > 6 && (
                    <button
                      onClick={() => removeBron(bronKey)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                      title="Bron verwijderen"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
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

        {/* Empty state */}
        {bronKeys.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-lg font-medium">Nog geen bronnen toegevoegd</p>
              <p className="text-sm">Klik op "Bron toevoegen" om te beginnen</p>
            </div>
          </div>
        )}
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
                <li>• Oude informatie (meer dan 5 jaar)</li>
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
            {bronKeys.slice(0, 8).map((bronKey) => {
              const bron = data[bronKey]
              const isCompleted = bron.url && bron.waarom && bron.samenvatting
              return (
                <div key={bronKey} className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
              )
            })}
            {bronKeys.length > 8 && (
              <span className="text-xs text-gray-500">+{bronKeys.length - 8}</span>
            )}
            <span className="text-sm text-gray-600 ml-2">
              {getCompletedBronnen()}/{bronKeys.length} bronnen voltooid
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}