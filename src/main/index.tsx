/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from '@/presentation/pages'

const domNode = document.getElementById('main')
const root = createRoot(domNode!)

root.render(<Login />)
