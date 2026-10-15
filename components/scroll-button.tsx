'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollButton() {
  const [visible, setVisible] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100)
      setAtBottom(window.scrollY > 300)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToggle = () => {
    window.scrollTo({ top: atBottom ? 0 : document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleScrollToggle}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.3 }}
          aria-label={atBottom ? 'Voltar ao topo' : 'Ir para o final da página'}
          className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full border border-primary/50 bg-background/80 text-primary shadow-[0_0_25px_rgba(255,45,177,0.45)] backdrop-blur-xl transition hover:border-primary hover:shadow-[0_0_35px_rgba(255,45,177,0.65)] lg:bottom-8 lg:right-8 lg:size-14"
        >
          <AnimatePresence mode="wait" initial={false}>
            {atBottom ? (
              <motion.span
                key="up"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                <ArrowUp className="size-5 lg:size-6" />
              </motion.span>
            ) : (
              <motion.span
                key="down"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                <ArrowDown className="size-5 lg:size-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
