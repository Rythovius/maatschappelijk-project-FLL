'use client'

interface QuestionData {
  text: string
  score: number
}

interface Step3Data {
  hulp: QuestionData
  tijd: QuestionData
  afspraken: QuestionData
  materialen: QuestionData
  technischeZaken: QuestionData
  doelgroep: QuestionData
  doel: QuestionData
  realistisch: QuestionData
  eigenVraag1: QuestionData
  eigenVraag2: QuestionData
  eigenVraag3: QuestionData
  eigenVraag4: QuestionData
}

interface Step3Props {
  data: Step3Data
  onUpdate: (data: Partial<Step3Data>) => void
}

const questions = [
  { key: 'hulp', label: 'Van wie heb ik hulp nodig?' },
  { key: 'tijd', label: 'Wanneer is er tijd om dingen te doen en wanneer moet iets af?' },
  { key: 'afspraken', label: 'Met wie moet ik afspraken maken?' },
  { key: 'materialen', label: 'Welke materialen heb ik nodig?' },
  { key: 'technischeZaken', label: 'Hoe werken technische zaken, die ik nodig heb?' },
  { key: 'doelgroep', label: 'Voor welke doelgroep ga ik iets organiseren of maken?' },
  { key: 'doel', label: 'Is mijn doel realistisch?' },
  { key: 'realistisch', label: 'Wat doe ik als blijkt dat mijn doel niet realistisch is?' }
]

export default function Step3({ data, onUpdate }: Step3Props) {
  const updateQuestion = (key: keyof Step3Data, field: 'text' | 'score', value: string | number) => {
    onUpdate({
      [key]: {
        ...data[key],
        [field]: value
      }
    })
  }

  const getScoreColor = (score: number) => {
    switch (score) {
      case 1: return 'bg-green-100 text-green-800 border-green-300'
      case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 3: return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getScoreStats = () => {
    const allQuestions = [...questions, 
      { key: 'eigenVraag1', label: 'Eigen deelvraag 1' },
      { key: 'eigenVraag2', label: 'Eigen deelvraag 2' },
      { key: 'eigenVraag3', label: 'Eigen deelvraag 3' },
      { key: 'eigenVraag4', label: 'Eigen deelvraag 4' }
    ]
    
    const scores = allQuestions.map(q => data[q.key as keyof Step3Data].score).filter(s => s > 0)
    const score1 = scores.filter(s => s === 1).length
    const score2 = scores.filter(s => s === 2).length
    const score3 = scores.filter(s => s === 3).length
    
    return { score1, score2, score3, total: scores.length }
  }

  const stats = getScoreStats()

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-white text-sm">
            3
          </span>
          Stap 3: Kennisdeel
        </h2>
        <p className="text-gray-600">
          Denk na over welke informatie je nodig hebt voor je werkstuk. Beoordeel je kennis met het 1-2-3 systeem.
        </p>
      </div>

      {/* Uitleg */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Het 1-2-3 beoordelingssysteem</h3>
        <div className="text-blue-700 space-y-3">
          <p className="font-medium">
            Hoofdvraag: <em>"Wat moet ik te weten komen om te kunnen doen wat ik van plan ben?"</em>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-100 border border-green-300 rounded-lg p-3">
              <div className="font-bold text-green-800 mb-1">1 = Ik weet het al</div>
              <div className="text-sm text-green-700">Je hebt al voldoende kennis over dit onderwerp</div>
            </div>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
              <div className="font-bold text-yellow-800 mb-1">2 = Ik weet het deels</div>
              <div className="text-sm text-yellow-700">Je hebt wat kennis, maar moet nog meer uitzoeken</div>
            </div>
            <div className="bg-red-100 border border-red-300 rounded-lg p-3">
              <div className="font-bold text-red-800 mb-1">3 = Ik weet het nog niet</div>
              <div className="text-sm text-red-700">Je moet dit nog volledig uitzoeken</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistieken */}
      {stats.total > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Jouw kennisoverzicht:</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{stats.score1} vragen weet je al</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>{stats.score2} vragen weet je deels</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>{stats.score3} vragen moet je nog uitzoeken</span>
            </div>
          </div>
        </div>
      )}

      {/* Vaste vragen */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800">Standaard deelvragen</h3>
        {questions.map((question) => (
          <div key={question.key} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 flex-1">
                {question.label}
              </label>
              <div className="flex items-center space-x-2 ml-4">
                {[1, 2, 3].map((score) => (
                  <button
                    key={score}
                    onClick={() => updateQuestion(question.key as keyof Step3Data, 'score', score)}
                    className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors ${
                      data[question.key as keyof Step3Data].score === score
                        ? getScoreColor(score)
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={data[question.key as keyof Step3Data].text}
              onChange={(e) => updateQuestion(question.key as keyof Step3Data, 'text', e.target.value)}
              placeholder="Schrijf hier je antwoord of plan van aanpak..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Eigen vragen */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Eigen deelvragen</h3>
        <p className="text-sm text-gray-600">
          Bedenk zelf nog vragen die specifiek voor jullie project belangrijk zijn.
        </p>
        
        {[1, 2, 3, 4].map((num) => {
          const key = `eigenVraag${num}` as keyof Step3Data
          return (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 flex-1">
                  Eigen deelvraag {num}
                </label>
                <div className="flex items-center space-x-2 ml-4">
                  {[1, 2, 3].map((score) => (
                    <button
                      key={score}
                      onClick={() => updateQuestion(key, 'score', score)}
                      className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors ${
                        data[key].score === score
                          ? getScoreColor(score)
                          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={data[key].text}
                onChange={(e) => updateQuestion(key, 'text', e.target.value)}
                placeholder={`Formuleer hier je eigen deelvraag ${num} en je antwoord...`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
            </div>
          )
        })}
      </div>

      {/* Plan van aanpak tip */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">📋 Plan van aanpak maken</h3>
        <div className="text-green-700 space-y-2">
          <p className="font-medium">Na het invullen van alle vragen:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Geef eerst antwoord op de vragen met een <strong>1</strong> erbij</li>
            <li>Geef daarna zo goed mogelijk antwoord op de vragen met een <strong>2</strong> erbij</li>
            <li>Beschrijf wat je gaat doen om te achterhalen wat je moet weten voor de vragen met een <strong>3</strong> erbij</li>
          </ol>
          <p className="text-sm mt-3">
            💡 <em>Focus eerst op de rode vragen (3) - die hebben de meeste aandacht nodig!</em>
          </p>
        </div>
      </div>

      {/* Voortgang indicator */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Voortgang Stap 3:</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {stats.total}/12 vragen beoordeeld
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}