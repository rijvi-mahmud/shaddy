'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Index } from '@/__registry__'
import { Icons } from '@/components/icons'
import { useInterval } from '@/registry/default/hooks/use-interval'

// Featured components to showcase
const featuredComponents = [
  {
    name: 'text-field-example',
    title: 'Text Field',
    category: 'Form',
    description: 'Type-safe form inputs',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: 'logo' as const,
  },
  {
    name: 'use-boolean-example',
    title: 'useBoolean',
    category: 'Hook',
    description: 'Toggle state management',
    gradient: 'from-purple-500/20 to-pink-500/20',
    icon: 'logo' as const,
  },
  {
    name: 'switch-field-example',
    title: 'Switch Field',
    category: 'Form',
    description: 'Beautiful toggle switches',
    gradient: 'from-green-500/20 to-emerald-500/20',
    icon: 'logo' as const,
  },
  {
    name: 'select-field-example',
    title: 'Select Field',
    category: 'Form',
    description: 'Dropdown selections',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    icon: 'chevronDown' as const,
  },
  {
    name: 'use-clipboard-copy-example',
    title: 'useClipboardCopy',
    category: 'Hook',
    description: 'One-click copy utility',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    icon: 'copy' as const,
  },
  {
    name: 'date-picker-field-example',
    title: 'Date Picker',
    category: 'Form',
    description: 'Calendar date selection',
    gradient: 'from-rose-500/20 to-red-500/20',
    icon: 'calendar' as const,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const BenefitsSection = () => {
  const [selectedComponent, setSelectedComponent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const currentComponent = featuredComponents[selectedComponent]!

  const PreviewComponent = Index['default'][currentComponent.name]?.component

  // Auto-rotate examples every 5 seconds (pause on hover)
  useInterval(
    () => {
      setSelectedComponent((prev) => (prev + 1) % featuredComponents.length)
    },
    isPaused ? null : 5000
  )

  return (
    <section
      id="benefits"
      className="container py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Badge variant="outline" className="mb-4">
            Component Library
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            50+ Production-Ready Components
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Type-safe, accessible, and beautifully designed. From form fields to
            custom hooks, everything you need to build modern applications.
          </p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {featuredComponents.map((component, index) => {
              const IconComponent = Icons[component.icon as keyof typeof Icons]
              return (
                <motion.div key={component.name} variants={item}>
                  <motion.button
                    onClick={() => setSelectedComponent(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                      selectedComponent === index
                        ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10'
                        : 'border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm'
                    }`}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${component.gradient} opacity-0 hover:opacity-100 transition-opacity duration-200`}
                    />

                    <div className="relative z-10">
                      <div className="mb-2 flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 text-primary" />
                        )}
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 h-4"
                        >
                          {component.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {component.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {component.description}
                      </p>
                    </div>
                  </motion.button>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Right side - Live Preview */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Card className="relative p-8 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-xl border-primary/20 shadow-2xl shadow-primary/10">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-50" />

            {/* Component info header */}
            <motion.div className="mb-6 pb-4 border-b border-border/50" layout>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentComponent.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${currentComponent.gradient} flex items-center justify-center backdrop-blur-sm`}
                  >
                    {(() => {
                      const IconComponent =
                        Icons[currentComponent.icon as keyof typeof Icons]
                      return IconComponent ? (
                        <IconComponent className="h-6 w-6 text-foreground" />
                      ) : null
                    })()}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {currentComponent.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentComponent.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Live component preview */}
            <div className="relative min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentComponent.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  {PreviewComponent ? (
                    <div className="flex items-center justify-center">
                      <div className="max-w-md">
                        <PreviewComponent />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Preview not available
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
