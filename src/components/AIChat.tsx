'use client'

import { useState, useRef, useEffect } from 'react'

interface AIChatProps {
  context: string
  currentData: any
}

export default function AIChat({ context, currentData }: AIChatProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'assistant', content: string}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingResponse, setStreamingResponse] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingResponse])

  const sendMessage = async () => {
    if (!message.trim() || isLoading || isStreaming) return

    const userMessage = message.trim()
    setMessage('')
    
    // Add user message
    const userMessageObj = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: userMessage
    }
    setMessages(prev => [...prev, userMessageObj])

    setIsLoading(true)
    setIsStreaming(false)
    setStreamingResponse('')

    // Create abort controller for this request
    abortControllerRef.current = new AbortController()

    try {
      // Create context-aware prompt
      const contextPrompt = `${context}

Huidige voortgang van de leerling:
${JSON.stringify(currentData, null, 2)}

Leerling vraag: ${userMessage}

Geef een behulpzame, educatieve reactie die aansluit bij het stappenplan voor werkstukken. Houd je antwoord praktisch en motiverend. Verwijs naar specifieke stappen als dat relevant is.`

      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: contextPrompt,
          aiModel: 'smart'
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setIsLoading(false)
      setIsStreaming(true)

      // Process streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No readable stream available')
      }

      let buffer = ''
      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.error) {
                throw new Error(data.message || 'Streaming error')
              }
              
              if (data.done) {
                setIsStreaming(false)
                // Add final assistant message
                const assistantMessage = {
                  id: (Date.now() + 1).toString(),
                  role: 'assistant' as const,
                  content: fullResponse
                }
                setMessages(prev => [...prev, assistantMessage])
                setStreamingResponse('')
                return
              }
              
              if (data.token) {
                fullResponse += data.token
                setStreamingResponse(fullResponse)
              }
            } catch (parseError) {
              console.error('Error parsing streaming data:', parseError)
            }
          }
        }
      }

    } catch (error: any) {
      console.error('AI Chat error:', error)
      setIsLoading(false)
      setIsStreaming(false)
      
      if (error.name !== 'AbortError') {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: 'Sorry, er is een fout opgetreden. Probeer het opnieuw.'
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } finally {
      abortControllerRef.current = null
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
    setStreamingResponse('')
  }

  return (
    <div className="flex flex-col h-96 border border-gray-200 rounded-lg bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isStreaming && (
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">👋 Hallo! Ik ben je AI-assistent.</p>
            <p>Stel gerust vragen over je werkstuk of brainstorm over ideeën!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {/* Streaming response */}
        {isStreaming && streamingResponse && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
              <div className="text-sm whitespace-pre-wrap">
                {streamingResponse}
                <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1 align-text-bottom"></span>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-600">AI denkt na...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Stel een vraag over je werkstuk..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            rows={2}
            disabled={isLoading || isStreaming}
          />
          <div className="flex flex-col space-y-1">
            <button
              onClick={sendMessage}
              disabled={!message.trim() || isLoading || isStreaming}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isLoading || isStreaming ? '⏳' : '📤'}
            </button>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-xs"
                title="Chat wissen"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}