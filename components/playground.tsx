"use client"

import * as React from "react"
import { 
  SendIcon, 
  RotateCcwIcon,
  DownloadIcon,
  SettingsIcon,
  BotIcon,
  MessageSquareIcon,
  PenToolIcon,
  XIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'

const userProjects = [
  { id: 1, name: "Customer Support Bot", description: "Handles customer inquiries" },
  { id: 2, name: "Sales Assistant", description: "Helps with sales processes" },
  { id: 3, name: "Content Creator", description: "Generates marketing content" },
  { id: 4, name: "Code Helper", description: "Assists with programming tasks" },
]

export function Playground() {
  const [userInput, setUserInput] = React.useState("We is going to the market.")
  const [instructions, setInstructions] = React.useState("Fix the grammar.")
  const [selectedProject, setSelectedProject] = React.useState("")
  const [mode, setMode] = React.useState<"chat" | "complete" | "edit">("complete")
  const [showMobileConfig, setShowMobileConfig] = React.useState(false)

  // Personality inputs
  const [personality, setPersonality] = React.useState("helpful and friendly assistant")
  const [tone, setTone] = React.useState("professional")
  const [expertise, setExpertise] = React.useState("")
  const [responseStyle, setResponseStyle] = React.useState("detailed")
  
  // Settings toggles
  const [useEmojis, setUseEmojis] = React.useState(false)
  const [includeExamples, setIncludeExamples] = React.useState(true)
  const [factualMode, setFactualMode] = React.useState(false)

  const handleSubmit = () => {
    console.log("Submitting:", { 
      userInput, 
      instructions, 
      selectedProject, 
      mode,
      personality,
      tone,
      expertise,
      responseStyle,
      useEmojis,
      includeExamples,
      factualMode
    })
  }

  const handleReset = () => {
    setUserInput("")
    setInstructions("")
  }

  const getModeIcon = (modeType: string) => {
    switch (modeType) {
      case "chat":
        return <MessageSquareIcon className="h-4 w-4" />
      case "complete":
        return <BotIcon className="h-4 w-4" />
      case "edit":
        return <PenToolIcon className="h-4 w-4" />
      default:
        return <BotIcon className="h-4 w-4" />
    }
  }

  const getModeDescription = () => {
    switch (mode) {
      case "chat":
        return "Have a conversation with your AI assistant"
      case "complete":
        return "Complete text or generate content based on your input"
      case "edit":
        return "Edit and improve existing text"
      default:
        return "Complete text or generate content based on your input"
    }
  }

  const ConfigurationContent = () => (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="space-y-3">
        <Label className="text-sidebar-foreground font-medium">Mode</Label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-sidebar-accent rounded-lg">
          {[
            { key: "complete", label: "Complete", icon: BotIcon },
            { key: "chat", label: "Chat", icon: MessageSquareIcon },
            { key: "edit", label: "Edit", icon: PenToolIcon }
          ].map((modeOption) => (
            <Button
              key={modeOption.key}
              variant={mode === modeOption.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode(modeOption.key as any)}
              className={`flex items-center gap-2 ${
                mode === modeOption.key
                  ? "bg-sidebar-foreground text-sidebar"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <modeOption.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{modeOption.label}</span>
            </Button>
          ))}
        </div>
        <p className="text-xs text-sidebar-foreground/60">{getModeDescription()}</p>
      </div>

      {/* Project Selection */}
      <div className="space-y-3">
        <Label htmlFor="project" className="text-sidebar-foreground font-medium">
          Project
        </Label>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
            <SelectValue placeholder="Select a project..." />
          </SelectTrigger>
          <SelectContent>
            {userProjects.map((project) => (
              <SelectItem key={project.id} value={project.id.toString()}>
                <div className="flex flex-col">
                  <span>{project.name}</span>
                  <span className="text-xs text-muted-foreground">{project.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Personality Configuration */}
      <div className="space-y-4">
        <h3 className="text-sidebar-foreground font-medium">Personality</h3>
        
        <div className="space-y-3">
          <Label htmlFor="personality" className="text-sidebar-foreground text-sm">
            You are a:
          </Label>
          <Input
            id="personality"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="helpful and friendly assistant"
            className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="tone" className="text-sidebar-foreground text-sm">
            Tone
          </Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              <SelectItem value="empathetic">Empathetic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="expertise" className="text-sidebar-foreground text-sm">
            Area of Expertise
          </Label>
          <Input
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="e.g., customer service, technical support, sales"
            className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="responseStyle" className="text-sidebar-foreground text-sm">
            Response Style
          </Label>
          <Select value={responseStyle} onValueChange={setResponseStyle}>
            <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="step-by-step">Step-by-step</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Behavior Settings */}
      <div className="space-y-4">
        <h3 className="text-sidebar-foreground font-medium">Behavior</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sidebar-foreground text-sm">Use Emojis</Label>
            <p className="text-xs text-sidebar-foreground/60">Include emojis in responses</p>
          </div>
          <Switch
            checked={useEmojis}
            onCheckedChange={setUseEmojis}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sidebar-foreground text-sm">Include Examples</Label>
            <p className="text-xs text-sidebar-foreground/60">Provide examples when helpful</p>
          </div>
          <Switch
            checked={includeExamples}
            onCheckedChange={setIncludeExamples}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sidebar-foreground text-sm">Factual Mode</Label>
            <p className="text-xs text-sidebar-foreground/60">Focus on facts and accuracy</p>
          </div>
          <Switch
            checked={factualMode}
            onCheckedChange={setFactualMode}
          />
        </div>
      </div>

      {/* Additional Controls */}
      <div className="pt-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            Advanced
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-full w-full max-w-full overflow-hidden bg-background">
      {/* Left Panel - Input Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
          {/* Mode indicator for mobile */}
          <div className="lg:hidden">
            <div className="flex items-center gap-2 mb-4">
              {getModeIcon(mode)}
              <span className="text-sm font-medium text-sidebar-foreground capitalize">{mode}</span>
              <Sheet open={showMobileConfig} onOpenChange={setShowMobileConfig}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-full sm:max-w-md bg-sidebar border-sidebar-border overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle className="text-sidebar-foreground">Configuration</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <ConfigurationContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Main Input Area */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="input" className="text-sidebar-foreground font-medium mb-2 block">
                {mode === "chat" ? "Message" : mode === "edit" ? "Text to Edit" : "Input"}
              </Label>
              <Textarea
                id="input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  mode === "chat" 
                    ? "Type your message here..." 
                    : mode === "edit" 
                    ? "Enter text to edit..." 
                    : "Enter your text here..."
                }
                className="min-h-[200px] lg:min-h-[300px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-sidebar-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-3">
            <Label htmlFor="instructions" className="text-sidebar-foreground font-medium">
              {mode === "chat" ? "System Instructions" : "Instructions"}
            </Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={
                mode === "chat"
                  ? "Set the context and behavior for the conversation..."
                  : mode === "edit"
                  ? "Describe how you want the text to be edited..."
                  : "Enter instructions for the AI..."
              }
              className="min-h-[100px] lg:min-h-[120px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-sidebar-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="border-t border-sidebar-border p-4 bg-sidebar-accent/50">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSubmit}
              className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90 font-medium"
            >
              <SendIcon className="h-4 w-4 mr-2" />
              {mode === "chat" ? "Send" : "Submit"}
            </Button>
            <Button
              onClick={handleReset}
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <RotateCcwIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Configuration (Desktop only) */}
      <div className="hidden lg:flex w-80 xl:w-96 flex-col bg-sidebar-accent/30 min-h-0 border-l border-sidebar-border">
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-sidebar-foreground">Configuration</h2>
          </div>
          <ConfigurationContent />
        </div>
      </div>
    </div>
  )
}