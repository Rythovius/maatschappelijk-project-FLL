'use client'

interface Step1Data {
  onderwerp: string
  waarom: string
}

interface Step1Props {
  data: Step1Data
  onUpdate: (data: Partial<Step1Data>) => void
}

export default function Step1({ data, onUpdate }: Step1Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white text-sm">
            1
          </span>
          Stap 1: Het onderwerp bepalen
        </h2>
        <p className="text-gray-600">
          Bepaal samen het onderwerp van jullie werkstuk. Kies iets dat specifiek, tastbaar en 'dichtbij' is.
        </p>
      </div>

      {/* Uitleg en voorbeelden */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Hoe kies je een goed onderwerp?</h3>
        <div className="text-blue-700 space-y-3">
          <p>
            Waar gaat jullie belangstelling naar uit? Denk aan onderwerpen die bij het thema passen, 
            maar die wel <strong>specifiek, tastbaar en 'dichtbij'</strong> zijn.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>In plaats van iets over de hele wereld → kijk naar Nederland of Eersel</li>
            <li>In plaats van alle Nederlanders → kijk naar leerlingen van het Rythovius</li>
            <li>In plaats van een algemeen onderwerp → focus op een specifiek aspect</li>
          </ul>
          <p className="font-medium">
            Denk ook na over het <strong>praktische component</strong>: wat kun je 'maken' of 'doen' 
            wat aansluit bij jullie onderwerp?
          </p>
        </div>
      </div>

      {/* Voorbeelden */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Voorbeelden uit het thema 'Gezonde voeding'</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Voorbeeld 1: Van breed naar specifiek</h4>
            <div className="text-sm text-green-700">
              Gezonde voeding → Voeding voor een gezond lichaam → Tussendoortjes en snacks → Chips als snack → 
              Zoutgehalte in chips → Effect van overmatige zoutconsumptie → 
              <strong>"Hoe kunnen we onze zoutconsumptie verminderen om gezondheidsrisico's te vermijden?"</strong>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Voorbeeld 2: Focus op school</h4>
            <div className="text-sm text-green-700">
              Gezonde voeding → Eten op school → Gezonde lunchopties → Brood in de schoolkantine → 
              Volkoren vs wit brood → Invloed op concentratie → 
              <strong>"Onderzoek naar hoe volkoren brood de energieniveaus van leerlingen beïnvloedt"</strong>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Voorbeeld 3: Schoolautomaten</h4>
            <div className="text-sm text-green-700">
              Gezonde voeding → Eten op school → Snacks op school → Schoolautomaten → 
              Gezonde vs ongezonde snacks → Suikergehalte → Effect op schoolprestaties → 
              <strong>"Hoe kunnen scholen gezonde alternatieven aanbieden om energiecrashes te voorkomen?"</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Input velden */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Geef hieronder een korte omschrijving van het door jullie gekozen onderwerp:
          </label>
          <textarea
            value={data.onderwerp}
            onChange={(e) => onUpdate({ onderwerp: e.target.value })}
            placeholder="Beschrijf jullie onderwerp hier..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={6}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.onderwerp.length} karakters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leg uit waarom jullie voor dit onderwerp hebben gekozen:
          </label>
          <textarea
            value={data.waarom}
            onChange={(e) => onUpdate({ waarom: e.target.value })}
            placeholder="Waarom hebben jullie dit onderwerp gekozen? Wat maakt het interessant?"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={6}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.waarom.length} karakters
          </div>
        </div>
      </div>

      {/* Voortgang indicator */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Voortgang Stap 1:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${data.onderwerp ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.waarom ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-600 ml-2">
              {[data.onderwerp, data.waarom].filter(Boolean).length}/2 voltooid
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}