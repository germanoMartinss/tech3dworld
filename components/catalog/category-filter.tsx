'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { isProductCategory, type ProductCategory } from '@/lib/types'

export const categoryLabels: Record<ProductCategory, string> = {
  chaveiros: 'Chaveiros',
  decor: 'Decor',
  personalizados: 'Personalizados',
}

const ALL = 'todos'

const options = [
  { value: ALL, label: 'Todos' },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
]

type CategoryFilterProps = {
  /** Categoria selecionada; `undefined` = "Todos". */
  value?: ProductCategory
  onChange?: (categoria: ProductCategory | undefined) => void
  disabled?: boolean
}

/**
 * Filtro de seleção única. O ToggleGroup (Base UI) entrega role="group", aria-pressed
 * em cada item e navegação pelas setas (roving tabindex).
 */
export function CategoryFilter({ value, onChange, disabled }: CategoryFilterProps) {
  return (
    <ToggleGroup
      aria-label="Filtrar produtos por categoria"
      value={[value ?? ALL]}
      onValueChange={([selected]) => {
        // Clicar no item já selecionado o "desmarca" (array vazio): ignoramos, sempre há uma opção ativa.
        if (!selected) return
        onChange?.(isProductCategory(selected) ? selected : undefined)
      }}
      disabled={disabled}
      className="flex-wrap"
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="h-auto rounded-full border border-white/20 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white/70 hover:border-white/40 hover:bg-transparent hover:text-white aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary lg:px-5 lg:py-2.5 lg:text-sm"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
