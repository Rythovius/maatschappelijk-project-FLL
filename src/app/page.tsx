import EducationalApp from '@/components/EducationalApp'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Werkstuk Stappenplan
          </h1>
          
          <p className="text-xl text-blue-700 font-medium mb-2">
            Jouw digitale begeleider voor het maken van een werkstuk
          </p>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Volg de 5 stappen om systematisch je werkstuk voor te bereiden en uit te voeren. 
            Je voortgang wordt automatisch opgeslagen.
          </p>
        </div>

        {/* Main App */}
        <EducationalApp />

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 text-blue-600">
            <span>📚</span>
            <span>Veel succes met je werkstuk!</span>
            <span>📚</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            WON onderzoekshulp Rythovius College
          </p>
        </div>
      </div>
    </div>
  )
}