'use client'

import { useState, useEffect } from 'react'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import AIChat from './AIChat'

interface AppData {
  step1: {
    onderwerp: string
    waarom: string
  }
  step2: {
    doel: string
    ideaalSituatie: string
    tevreden: string
    nietTevreden: string
  }
  step3: {
    hulp: { text: string; score: number }
    tijd: { text: string; score: number }
    afspraken: { text: string; score: number }
    materialen: { text: string; score: number }
    technischeZaken: { text: string; score: number }
    doelgroep: { text: string; score: number }
    doel: { text: string; score: number }
    realistisch: { text: string; score: number }
    eigenVraag1: { text: string; score: number }
    eigenVraag2: { text: string; score: number }
    eigenVraag3: { text: string; score: number }
    eigenVraag4: { text: string; score: number }
  }
  step4: {
    bron1: { url: string; waarom: string; samenvatting: string }
    bron2: { url: string; waarom: string; samenvatting: string }
    bron3: { url: string; waarom: string; samenvatting: string }
    bron4: { url: string; waarom: string; samenvatting: string }
    bron5: { url: string; waarom: string; samenvatting: string }
    bron6: { url: string; waarom: string; samenvatting: string }
  }
  step5: {
    inleiding: string
    aanpak: string
    uitvoering: string
    conclusie: string
    bronnenlijst: string
  }
}

const initialData: AppData = {
  step1: { onderwerp: '', waarom: '' },
  step2: { doel: '', ideaalSituatie: '', tevreden: '', nietTevreden: '' },
  step3: {
    hulp: { text: '', score: 0 },
    tijd: { text: '', score: 0 },
    afspraken: { text: '', score: 0 },
    materialen: { text: '', score: 0 },
    technischeZaken: { text: '', score: 0 },
    doelgroep: { text: '', score: 0 },
    doel: { text: '', score: 0 },
    realistisch: { text: '', score: 0 },
    eigenVraag1: { text: '', score: 0 },
    eigenVraag2: { text: '', score: 0 },
    eigenVraag3: { text: '', score: 0 },
    eigenVraag4: { text: '', score: 0 }
  },
  step4: {
    bron1: { url: '', waarom: '', samenvatting: '' },
    bron2: { url: '', waarom: '', samenvatting: '' },
    bron3: { url: '', waarom: '', samenvatting: '' },
    bron4: { url: '', waarom: '', samenvatting: '' },
    bron5: { url: '', waarom: '', samenvatting: '' },
    bron6: { url: '', waarom: '', samenvatting: '' }
  },
  step5: { inleiding: '', aanpak: '', uitvoering: '', conclusie: '', bronnenlijst: '' }
}

export default function EducationalApp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [appData, setAppData] = useState<AppData>(initialData)
  const [showAIChat, setShowAIChat] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('werkstuk-data')
    const savedStep = localStorage.getItem('werkstuk-current-step')
    
    if (savedData) {
      try {
        setAppData(JSON.parse(savedData))
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep))
    }
  }, [])

  // Save data to localStorage whenever appData changes
  useEffect(() => {
    localStorage.setItem('werkstuk-data', JSON.stringify(appData))
  }, [appData])

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem('werkstuk-current-step', currentStep.toString())
  }, [currentStep])

  const updateStepData = (step: keyof AppData, data: any) => {
    setAppData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }))
  }

  const getStepProgress = () => {
    const steps = [
      { step: 1, completed: appData.step1.onderwerp && appData.step1.waarom },
      { step: 2, completed: appData.step2.doel && appData.step2.ideaalSituatie },
      { step: 3, completed: Object.values(appData.step3).some(item => item.text) },
      { step: 4, completed: Object.values(appData.step4).some(bron => bron.url) },
      { step: 5, completed: appData.step5.inleiding || appData.step5.aanpak }
    ]
    return steps
  }

  const getCurrentStepContext = () => {
    const contexts = {
      1: `De leerling werkt aan Stap 1: Het onderwerp bepalen. Ze moeten een specifiek, tastbaar en haalbaar onderwerp kiezen dat bij het thema past, en nadenken over het praktische component.`,
      2: `De leerling werkt aan Stap 2: Handelingsdeel. Ze stellen doelstellingen op en denken na over wat ze willen bereiken met hun werkstuk.`,
      3: `De leerling werkt aan Stap 3: Kennisdeel. Ze bepalen welke informatie ze nodig hebben en beoordelen hun kennis met een 1-2-3 systeem.`,
      4: `De leerling werkt aan Stap 4: Informatie zoeken. Ze zoeken bronnen, voeren interviews en verzamelen de benodigde informatie.`,
      5: `De leerling werkt aan Stap 5: Uitvoering en eindverslag. Ze voeren hun plan uit en schrijven het eindverslag.`
    }
    return contexts[currentStep as keyof typeof contexts] || ''
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 data={appData.step1} onUpdate={(data) => updateStepData('step1', data)} />
      case 2:
        return <Step2 data={appData.step2} onUpdate={(data) => updateStepData('step2', data)} />
      case 3:
        return <Step3 data={appData.step3} onUpdate={(data) => updateStepData('step3', data)} />
      case 4:
        return <Step4 data={appData.step4} onUpdate={(data) => updateStepData('step4', data)} />
      case 5:
        return <Step5 data={appData.step5} onUpdate={(data) => updateStepData('step5', data)} />
      default:
        return <Step1 data={appData.step1} onUpdate={(data) => updateStepData('step1', data)} />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Voortgang</h2>
        <div className="flex items-center space-x-4">
          {getStepProgress().map(({ step, completed }) => (
            <div key={step} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {completed && currentStep !== step ? '✓' : step}
              </button>
              {step < 5 && (
                <div className={`w-8 h-1 mx-2 ${completed ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Onderwerp</span>
          <span>Doelen</span>
          <span>Kennis</span>
          <span>Bronnen</span>
          <span>Verslag</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {renderCurrentStep()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Assistant */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                  🤖
                </span>
                AI Assistent
              </h3>
              <button
                onClick={() => setShowAIChat(!showAIChat)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  showAIChat
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700'
                }`}
              >
                {showAIChat ? 'Verberg' : 'Toon'}
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Stel vragen over je werkstuk of brainstorm over ideeën. De AI kent het stappenplan en kan je helpen.
            </p>

            {showAIChat && (
              <AIChat context={getCurrentStepContext()} currentData={appData} />
            )}
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
              💡 Tips voor deze stap
            </h3>
            <div className="text-sm text-yellow-700">
              {currentStep === 1 && (
                <ul className="space-y-2">
                  <li>• Kies een onderwerp dat dichtbij en specifiek is</li>
                  <li>• Denk aan Nederland, je school, of je eigen groep</li>
                  <li>• Bedenk wat je praktisch kunt maken of doen</li>
                </ul>
              )}
              {currentStep === 2 && (
                <ul className="space-y-2">
                  <li>• Stel realistische en meetbare doelen</li>
                  <li>• Denk na over wat succes betekent voor jou</li>
                  <li>• Heb een plan B als niet alles lukt</li>
                </ul>
              )}
              {currentStep === 3 && (
                <ul className="space-y-2">
                  <li>• 1 = Je weet het al</li>
                  <li>• 2 = Je weet het deels</li>
                  <li>• 3 = Je weet het nog niet</li>
                  <li>• Focus eerst op de 3'en</li>
                </ul>
              )}
              {currentStep === 4 && (
                <ul className="space-y-2">
                  <li>• Zoek betrouwbare bronnen</li>
                  <li>• Noteer altijd de URL</li>
                  <li>• Maak korte samenvattingen</li>
                  <li>• Denk aan interviews met experts</li>
                </ul>
              )}
              {currentStep === 5 && (
                <ul className="space-y-2">
                  <li>• Beschrijf wat je hebt gedaan</li>
                  <li>• Gebruik foto's om te illustreren</li>
                  <li>• Evalueer of je doelen zijn behaald</li>
                  <li>• Vergeet de bronnenlijst niet</li>
                </ul>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigatie</h3>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Vorige stap
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                disabled={currentStep === 5}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Volgende stap →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}