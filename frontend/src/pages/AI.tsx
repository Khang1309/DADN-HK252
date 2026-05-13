import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import axiosClient from '@/apis/api'
import toast from 'react-hot-toast'

interface AiResponse {
  status: 'SUCCESS' | 'AMBIGUOUS' | 'NOT_FOUND' | 'ERROR' | 'NOT_SUPPORTED'
  responseMessage: string
}

export default function AI() {
  const [command, setCommand] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lastResponse, setLastResponse] = useState<AiResponse | null>(null)

  const handleSendCommand = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!command.trim()) return

    setIsLoading(true)
    try {
      const response = await axiosClient.post('/api/ai/control', { command })
      setLastResponse(response as unknown as AiResponse)
      if ((response as any).status === 'SUCCESS') {
        toast.success('Command executed successfully')
      } else {
        toast.error((response as any).responseMessage || 'Action required')
      }
      setCommand('')
    } catch (error: any) {
      console.error('AI Command Error:', error)
      setLastResponse({
        status: 'ERROR',
        responseMessage: 'Failed to connect to AI service. Please try again later.',
      })
      toast.error('Failed to send command')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: AiResponse['status']) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'AMBIGUOUS':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'NOT_FOUND':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'ERROR':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    }
  }

  const getStatusIcon = (status: AiResponse['status']) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle2 className="h-5 w-5" />
      case 'AMBIGUOUS':
        return <Info className="h-5 w-5" />
      case 'NOT_FOUND':
        return <AlertCircle className="h-5 w-5" />
      case 'ERROR':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Bot className="h-5 w-5" />
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Control</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Control your smart home using natural language commands.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {/* Command Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Sparkles className="h-24 w-24 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">What would you like to do?</CardTitle>
              <CardDescription>
                Try "Turn on the living room light" or "Turn off everything in the bedroom".
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendCommand} className="flex flex-col gap-4">
                <div className="flex items-end gap-3 p-2 bg-background/50 border border-input rounded-2xl focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/30 transition-all shadow-sm group">
                  <textarea
                    value={command}
                    onChange={(e) => {
                      setCommand(e.target.value)
                      e.target.style.height = 'inherit'
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendCommand()
                      }
                    }}
                    placeholder="Type your command here..."
                    className="flex-1 bg-transparent border-none px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none resize-none min-h-[80px] max-h-[200px]"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="h-12 w-12 rounded-xl shrink-0 transition-all hover:scale-105 bg-primary shadow-md hover:shadow-primary/20"
                    disabled={isLoading || !command.trim()}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-[11px] text-muted-foreground/60 font-medium flex items-center gap-1.5">
                    <Info className="h-3 w-3" />
                    Press Enter to send, Shift + Enter for new line
                  </span>
                  <Badge variant="ghost" className="text-[10px] opacity-50 uppercase tracking-widest">
                    Natural Language
                  </Badge>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Response Section */}
        <AnimatePresence mode="wait">
          {lastResponse && (
            <motion.div
              key={lastResponse.responseMessage}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`border-2 ${getStatusColor(lastResponse.status).split(' ')[2]}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-full ${getStatusColor(lastResponse.status).split(' ')[0]}`}>
                        {getStatusIcon(lastResponse.status)}
                      </div>
                      <span className="font-semibold capitalize">{lastResponse.status.toLowerCase().replace('_', ' ')}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(lastResponse.status)}>
                      AI Response
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-foreground/90 leading-relaxed">
                    {lastResponse.responseMessage}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['Bật đèn phòng khách', 'Tắt hết tất cả thiết bị', 'Tắt quạt phòng khách', 'Bật toàn bộ thiết bị phòng ngủ'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20"
                onClick={() => {
                  setCommand(suggestion)
                }}
              >
                "{suggestion}"
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
