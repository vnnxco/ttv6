"use client"

import * as React from "react"
import { 
  SendIcon, 
  BotIcon,
  UserIcon,
  RotateCcwIcon,
  PlayIcon,
  SaveIcon,
  SparklesIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function Playground() {
  const [chatbotPersonality, setChatbotPersonality] = React.useState(
    "You are a helpful customer support agent for an e-commerce platform. You're friendly, professional, and always try to solve customer problems efficiently. You can help with orders, returns, product questions, and account issues."
  )
  const [testMessage, setTestMessage] = React.useState("")
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your customer support chatbot. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSendMessage = async () => {
    if (!testMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: testMessage,
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, userMessage])
    setTestMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand your question. Let me help you with that right away. Based on your inquiry, here's what I can do for you...",
        timestamp: new Date()
      }
      setChatHistory(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setChatHistory([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your customer support chatbot. How can I help you today?",
        timestamp: new Date()
      }
    ])
    setTestMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full w-full max-w-full overflow-hidden bg-background">
      {/* Left Panel - Chatbot Configuration */}
      <div className="w-96 flex flex-col bg-sidebar-accent/30 border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BotIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Chatbot Workshop</h2>
              <p className="text-sm text-sidebar-foreground/70">Build and test your AI assistant</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Chatbot Personality */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sidebar-foreground font-medium">Chatbot Personality & Instructions</Label>
              <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                <SparklesIcon className="h-3 w-3 mr-1" />
                Core
              </Badge>
            </div>
            <Textarea
              value={chatbotPersonality}
              onChange={(e) => setChatbotPersonality(e.target.value)}
              placeholder="Describe your chatbot's role, personality, and capabilities in detail..."
              className="min-h-[200px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-sidebar-foreground/60">
              This is your chatbot's "job description." Be specific about its role, tone, and what it can help with.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Label className="text-sidebar-foreground font-medium">Quick Actions</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
              >
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Bot
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
              >
                <RotateCcwIcon className="h-4 w-4 mr-2" />
                Reset Chat
              </Button>
            </div>
          </div>

          {/* Example Scenarios */}
          <div className="space-y-3">
            <Label className="text-sidebar-foreground font-medium">Test Scenarios</Label>
            <div className="space-y-2">
              {[
                "I need help with my recent order",
                "How do I return an item?",
                "What's your refund policy?",
                "My account is locked, can you help?"
              ].map((scenario, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTestMessage(scenario)}
                  className="w-full justify-start text-left text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent text-xs"
                >
                  "{scenario}"
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat Interface */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-sidebar-border bg-sidebar-accent/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <BotIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-sidebar-foreground">Customer Support Bot</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-sidebar-foreground/70">Online</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
            >
              <PlayIcon className="h-4 w-4 mr-2" />
              Deploy Bot
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BotIcon className="h-5 w-5 text-white" />
                </div>
              )}
              <Card className={`max-w-[70%] p-3 ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-sidebar-accent border-sidebar-border'
              }`}>
                <p className={`text-sm ${
                  message.role === 'user' ? 'text-white' : 'text-sidebar-foreground'
                }`}>
                  {message.content}
                </p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-sidebar-foreground/60'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <BotIcon className="h-5 w-5 text-white" />
              </div>
              <Card className="bg-sidebar-accent border-sidebar-border p-3">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-sidebar-foreground/60">Thinking...</span>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="border-t border-sidebar-border p-4 bg-sidebar-accent/50">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a test message to see how your chatbot responds..."
                className="min-h-[60px] max-h-[120px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!testMessage.trim() || isLoading}
                size="icon"
                className="absolute bottom-2 right-2 h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-sidebar-foreground/60 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}