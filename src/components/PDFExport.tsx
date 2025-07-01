'use client'

import { useState } from 'react'
import jsPDF from 'jspdf'

interface PDFExportProps {
  data: any
  className?: string
}

export default function PDFExport({ data, className = '' }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const lineHeight = 7
      let yPosition = margin

      // Helper function to add text with word wrapping
      const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
        if (!text) return

        pdf.setFontSize(fontSize)
        if (isBold) {
          pdf.setFont('helvetica', 'bold')
        } else {
          pdf.setFont('helvetica', 'normal')
        }

        const textWidth = pageWidth - (margin * 2)
        const lines = pdf.splitTextToSize(text, textWidth)
        
        // Check if we need a new page
        if (yPosition + (lines.length * lineHeight) > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.text(lines, margin, yPosition)
        yPosition += lines.length * lineHeight + 5
      }

      // Helper function to add a section header
      const addSectionHeader = (title: string) => {
        yPosition += 10
        addText(title, 16, true)
        yPosition += 5
      }

      // Title page
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Werkstuk Stappenplan', pageWidth / 2, 40, { align: 'center' })
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Volledig overzicht van je werkstuk', pageWidth / 2, 55, { align: 'center' })
      
      pdf.setFontSize(12)
      const currentDate = new Date().toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      pdf.text(`Gegenereerd op: ${currentDate}`, pageWidth / 2, 70, { align: 'center' })

      yPosition = 100

      // Step 1: Onderwerp
      if (data.step1?.onderwerp || data.step1?.waarom) {
        addSectionHeader('STAP 1: HET ONDERWERP BEPALEN')
        
        if (data.step1.onderwerp) {
          addText('Onderwerp:', 12, true)
          addText(data.step1.onderwerp)
          yPosition += 5
        }
        
        if (data.step1.waarom) {
          addText('Waarom dit onderwerp:', 12, true)
          addText(data.step1.waarom)
        }
      }

      // Step 2: Doelen
      if (data.step2?.doel || data.step2?.ideaalSituatie || data.step2?.tevreden || data.step2?.nietTevreden) {
        addSectionHeader('STAP 2: HANDELINGSDEEL - DOELSTELLINGEN')
        
        if (data.step2.doel) {
          addText('Hoofddoel:', 12, true)
          addText(data.step2.doel)
          yPosition += 5
        }
        
        if (data.step2.ideaalSituatie) {
          addText('Ideale situatie:', 12, true)
          addText(data.step2.ideaalSituatie)
          yPosition += 5
        }
        
        if (data.step2.tevreden) {
          addText('Tevreden wanneer:', 12, true)
          addText(data.step2.tevreden)
          yPosition += 5
        }
        
        if (data.step2.nietTevreden) {
          addText('Niet tevreden wanneer:', 12, true)
          addText(data.step2.nietTevreden)
        }
      }

      // Step 3: Kennisdeel
      if (data.step3) {
        const hasStep3Data = Object.values(data.step3).some((item: any) => item.text)
        
        if (hasStep3Data) {
          addSectionHeader('STAP 3: KENNISDEEL - DEELVRAGEN')
          
          const questions = [
            { key: 'hulp', label: 'Van wie heb ik hulp nodig?' },
            { key: 'tijd', label: 'Wanneer is er tijd om dingen te doen en wanneer moet iets af?' },
            { key: 'afspraken', label: 'Met wie moet ik afspraken maken?' },
            { key: 'materialen', label: 'Welke materialen heb ik nodig?' },
            { key: 'technischeZaken', label: 'Hoe werken technische zaken, die ik nodig heb?' },
            { key: 'doelgroep', label: 'Voor welke doelgroep ga ik iets organiseren of maken?' },
            { key: 'doel', label: 'Is mijn doel realistisch?' },
            { key: 'realistisch', label: 'Wat doe ik als blijkt dat mijn doel niet realistisch is?' },
            { key: 'eigenVraag1', label: 'Eigen deelvraag 1' },
            { key: 'eigenVraag2', label: 'Eigen deelvraag 2' },
            { key: 'eigenVraag3', label: 'Eigen deelvraag 3' },
            { key: 'eigenVraag4', label: 'Eigen deelvraag 4' }
          ]

          questions.forEach(question => {
            const questionData = data.step3[question.key]
            if (questionData?.text) {
              const scoreText = questionData.score ? ` (Score: ${questionData.score})` : ''
              addText(`${question.label}${scoreText}`, 12, true)
              addText(questionData.text)
              yPosition += 3
            }
          })
        }
      }

      // Step 4: Bronnen
      if (data.step4) {
        const bronKeys = Object.keys(data.step4).filter(key => key.startsWith('bron'))
        const hasBronData = bronKeys.some(key => data.step4[key]?.url || data.step4[key]?.samenvatting)
        
        if (hasBronData) {
          addSectionHeader('STAP 4: INFORMATIE ZOEKEN - BRONNEN')
          
          bronKeys.forEach((bronKey, index) => {
            const bron = data.step4[bronKey]
            if (bron?.url || bron?.samenvatting) {
              addText(`Bron ${index + 1}:`, 12, true)
              
              if (bron.url) {
                addText(`URL: ${bron.url}`)
              }
              
              if (bron.waarom) {
                addText(`Waarom gekozen: ${bron.waarom}`)
              }
              
              if (bron.samenvatting) {
                addText(`Samenvatting: ${bron.samenvatting}`)
              }
              
              yPosition += 5
            }
          })
        }
      }

      // Step 5: Eindverslag
      if (data.step5) {
        const hasStep5Data = Object.values(data.step5).some((section: any) => section)
        
        if (hasStep5Data) {
          addSectionHeader('STAP 5: UITVOERING & EINDVERSLAG')
          
          if (data.step5.inleiding) {
            addText('Inleiding:', 14, true)
            addText(data.step5.inleiding)
            yPosition += 5
          }
          
          if (data.step5.aanpak) {
            addText('Aanpak:', 14, true)
            addText(data.step5.aanpak)
            yPosition += 5
          }
          
          if (data.step5.uitvoering) {
            addText('Uitvoering:', 14, true)
            addText(data.step5.uitvoering)
            yPosition += 5
          }
          
          if (data.step5.conclusie) {
            addText('Conclusie:', 14, true)
            addText(data.step5.conclusie)
            yPosition += 5
          }
          
          if (data.step5.bronnenlijst) {
            addText('Bronnenlijst:', 14, true)
            addText(data.step5.bronnenlijst)
          }
        }
      }

      // Footer on last page
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        pdf.text(
          `Pagina ${i} van ${totalPages} - Werkstuk Stappenplan - WON onderzoekshulp Rythovius College`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        )
      }

      // Generate filename with current date
      const filename = `Werkstuk_Stappenplan_${new Date().toISOString().slice(0, 10)}.pdf`
      
      // Save the PDF
      pdf.save(filename)
      
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('Er is een fout opgetreden bij het genereren van de PDF. Probeer het opnieuw.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Check if there's any data to export
  const hasData = () => {
    return (
      (data.step1?.onderwerp || data.step1?.waarom) ||
      (data.step2?.doel || data.step2?.ideaalSituatie) ||
      Object.values(data.step3 || {}).some((item: any) => item.text) ||
      Object.values(data.step4 || {}).some((bron: any) => bron.url || bron.samenvatting) ||
      Object.values(data.step5 || {}).some((section: any) => section)
    )
  }

  if (!hasData()) {
    return (
      <div className={`${className}`}>
        <button
          disabled
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
          title="Vul eerst wat gegevens in om te kunnen exporteren"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Exporteer als PDF</span>
        </button>
        <p className="text-xs text-gray-500 mt-1">
          Vul eerst wat gegevens in om te kunnen exporteren
        </p>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isGenerating
            ? 'bg-blue-100 text-blue-700 cursor-wait'
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
        title="Download je werkstuk als PDF"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>{isGenerating ? 'PDF wordt gegenereerd...' : 'Exporteer als PDF'}</span>
      </button>
      <p className="text-xs text-gray-500 mt-1">
        Download een volledig overzicht van je werkstuk
      </p>
    </div>
  )
}