import React from 'react'
import { createRoot } from 'react-dom/client'

import Router from '@/main/routes/router'

import '@/presentation/styles/global.scss'

const domNode = document.getElementById('main')

if (!domNode) {
  throw new Error('Falha ao gerar a página')
}

const root = createRoot(domNode)

root.render(<Router />)
