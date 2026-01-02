import { Shield, CheckCircle, Users, Zap } from 'lucide-react'

export default function TrustBadges() {
  const badges = [
    {
      icon: CheckCircle,
      text: 'Ilmainen vertailu',
      color: 'text-primary',
    },
    {
      icon: Shield,
      text: 'Turvallinen',
      color: 'text-primary',
    },
    {
      icon: Users,
      text: 'Yli 50 000 tyytyväistä asiakasta',
      color: 'text-primary',
    },
    {
      icon: Zap,
      text: 'Riippumaton',
      color: 'text-primary',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
      {badges.map((badge, index) => {
        const Icon = badge.icon
        return (
          <div key={index} className="flex flex-col items-center text-center">
            <Icon size={32} className={`${badge.color} mb-2`} />
            <span className="text-sm font-medium text-gray-700">{badge.text}</span>
          </div>
        )
      })}
    </div>
  )
}
