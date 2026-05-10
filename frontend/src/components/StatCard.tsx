import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  name: string
  total: number
  icon: LucideIcon
  color: string
}

export default function StatCard({ name, total, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{name}</p>
              <p className="text-3xl font-bold tracking-tight" style={{ color }}>
                {total}
              </p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
