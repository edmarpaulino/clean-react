/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/pages/login/login-factory'

const domNode = document.getElementById('main')
const root = createRoot(domNode!)

root.render(<Router makeLogin={makeLogin} />)
