import type { Product } from '@/lib/types'

export const products: Product[] = [
  { id: 'chaveiro-personalizado', title: 'Chaveiro Personalizado', category: 'chaveiros', description: 'Nome, frase ou logo em resina resistente.', priceFrom: 25, color: 'pink', icon: 'key-round' },
  { id: 'chaveiro-pet', title: 'Chaveiro Pet', category: 'chaveiros', description: 'O focinho do seu companheiro em 3D.', priceFrom: 30, color: 'orange', icon: 'paw-print' },
  { id: 'vaso-decorativo', title: 'Vaso Decorativo', category: 'decor', description: 'Geometrias únicas pra dar vida à estante.', priceFrom: 45, color: 'blue', icon: 'flower' },
  { id: 'luminaria-3d', title: 'Luminária 3D', category: 'decor', description: 'Luz e design em uma peça só.', priceFrom: 89, color: 'pink', icon: 'lightbulb' },
  { id: 'enfeite-de-mesa', title: 'Enfeite de Mesa', category: 'decor', description: 'Detalhes que assinam o seu espaço.', priceFrom: 40, color: 'orange', icon: 'layers' },
  { id: 'presente-personalizado', title: 'Presente Personalizado', category: 'personalizados', description: 'Uma ideia, transformada em objeto único.', priceFrom: 60, color: 'blue', icon: 'gift' },
  { id: 'placa-com-nome', title: 'Placa com Nome', category: 'personalizados', description: 'Identifique ambientes com estilo autoral.', priceFrom: 35, color: 'pink', icon: 'type' },
  { id: 'miniatura-sob-encomenda', title: 'Miniatura Sob Encomenda', category: 'personalizados', description: 'Transformamos referências em miniaturas exclusivas.', priceFrom: 120, color: 'orange', icon: 'wand' },
]
