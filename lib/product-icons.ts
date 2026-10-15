import { Flower2, Gift, KeyRound, Layers3, Lightbulb, PawPrint, Type, Wand2, type LucideIcon } from 'lucide-react'
import type { ProductIcon } from '@/lib/types'

/** Converte o nome do ícone (vindo dos dados) no componente do lucide. */
export const productIcons: Record<ProductIcon, LucideIcon> = {
  'key-round': KeyRound,
  'paw-print': PawPrint,
  flower: Flower2,
  lightbulb: Lightbulb,
  layers: Layers3,
  gift: Gift,
  type: Type,
  wand: Wand2,
}
