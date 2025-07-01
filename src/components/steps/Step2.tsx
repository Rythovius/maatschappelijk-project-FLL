'use client'

interface Step2Data {
  doel: string
  ideaalSituatie: string
  tevreden: string
  nietTevreden: string
}

interface Step2Props {
  data: Step2Data
  onUpdate: (data: Partial<Step2Data>) => void
}

export default function Step2({ data, onUpdate }: Step2Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white text-sm">
            2
          </span>
          Stap 2: Handelingsdeel
        </h2>
        <p className="text-gray-600">
          Stel je doelstellingen op. Dit zorgt ervoor dat jullie gestructureerd te werk kunnen gaan.
        </p>
      </div>

      {/* Uitleg */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Waarom doelstellingen belangrijk zijn</h3>
        <div className="text-blue-700 space-y-3">
          <p>
            Je hebt een onderwerp gekozen en je hebt nagedacht over wat je daarmee wilt doen. 
            Om ervoor te zorgen dat jullie niet blindelings aan de slag gaan, gaan jullie eerst 
            kijken naar jullie doelstellingen.
          </p>
          <p className="font-medium">
            Dit zorgt ervoor dat jullie:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Gestructureerd te werk kunnen gaan</li>
            <li>Straks kunnen terugkijken in hoeverre jullie doelen bereikt zijn</li>
            <li>Weten wanneer jullie tevreden mogen zijn</li>
            <li>Een plan B hebben als niet alles lukt</li>
          </ul>
        </div>
      </div>

      {/* Input velden */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leg hieronder in het kort uit wat je wil gaan bereiken:
          </label>
          <textarea
            value={data.doel}
            onChange={(e) => onUpdate({ doel: e.target.value })}
            placeholder="Wat is jullie hoofddoel met dit werkstuk? Wat willen jullie bereiken?"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={5}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.doel.length} karakters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Omschrijf de ideale situatie. Wat hebben we of wat gebeurt er als alles lukt?
          </label>
          <textarea
            value={data.ideaalSituatie}
            onChange={(e) => onUpdate({ ideaalSituatie: e.target.value })}
            placeholder="Beschrijf het beste scenario: wat gebeurt er als alles perfect verloopt?"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={5}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.ideaalSituatie.length} karakters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schrijf op wat er gebeurt als niet alles lukt, maar wanneer je wel tevreden bent:
          </label>
          <textarea
            value={data.tevreden}
            onChange={(e) => onUpdate({ tevreden: e.target.value })}
            placeholder="Wat is het minimum dat jullie willen bereiken om tevreden te zijn?"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={5}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.tevreden.length} karakters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wanneer ben je niet tevreden?
          </label>
          <textarea
            value={data.nietTevreden}
            onChange={(e) => onUpdate({ nietTevreden: e.target.value })}
            placeholder="Onder welke omstandigheden zouden jullie niet tevreden zijn met het resultaat?"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={5}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.nietTevreden.length} karakters
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">💡 Tips voor goede doelstellingen</h3>
        <div className="text-green-700 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Specifiek:</strong> Maak je doelen zo concreet mogelijk</li>
            <li><strong>Meetbaar:</strong> Hoe weet je of je het doel hebt behaald?</li>
            <li><strong>Acceptabel:</strong> Zijn alle teamleden het eens met het doel?</li>
            <li><strong>Realistisch:</strong> Is het doel haalbaar binnen de tijd en middelen?</li>
            <li><strong>Tijdgebonden:</strong> Wanneer moet het doel bereikt zijn?</li>
          </ul>
        </div>
      </div>

      {/* Voortgang indicator */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Voortgang Stap 2:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${data.doel ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.ideaalSituatie ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.tevreden ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${data.nietTevreden ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-600 ml-2">
              {[data.doel, data.ideaalSituatie, data.tevreden, data.nietTevreden].filter(Boolean).length}/4 voltooid
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}