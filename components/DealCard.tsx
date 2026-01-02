'use client'

import { motion } from 'framer-motion'
import { Star, Leaf, ExternalLink } from 'lucide-react'
import { ElectricityDeal } from '@/lib/mockData'

interface DealCardProps {
  deal: ElectricityDeal
  index?: number
}

export default function DealCard({ deal, index = 0 }: DealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
            {deal.supplier}
          </h3>
          {deal.renewable && (
            <div className="flex items-center gap-1 text-primary text-sm">
              <Leaf size={14} />
              <span>Uusiutuva energia</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Star size={18} className="text-accent fill-accent" />
          <span className="text-sm font-semibold">{deal.rating}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-display font-bold text-primary mb-1">
          {deal.basePrice}
        </div>
        <div className="text-sm text-gray-600">
          Perusmaksu: {deal.monthlyFee}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {deal.type} • {deal.duration}
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="text-sm text-gray-700">
          <span className="font-semibold text-green-700">Säästöarvio: </span>
          <span className="text-green-700 font-bold">{deal.savings}</span>
        </div>
      </div>
      
      <a
        href={deal.affiliateLink}
        className="btn-primary w-full flex items-center justify-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Valitse sopimus
        <ExternalLink size={16} />
      </a>
    </motion.div>
  )
}
