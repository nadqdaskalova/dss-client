import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routePaths from './config/RoutePaths'
import HomePage from './pages/HomePage'
import RouterPublicRoutes from './RouterPublicRoutes'

const Router: React.FC = () => (
  <AnimatePresence initial={false}>
    <BrowserRouter>
      <Routes>
        <Route path={routePaths.entry} element={<HomePage />} />
        {RouterPublicRoutes.map(({ component: Component, path }) => (
          <Route path={path} key={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  </AnimatePresence>
)

export default React.memo(Router)
