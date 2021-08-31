import { lazy } from "solid-js"
import { Routes, Route } from 'solid-app-router'
import type { Component } from "solid-js"

import logo from "./logo.svg"
import styles from "./App.module.css"

const LoginPage = lazy(() => import('./pages/Login'))
const IngredientsPage = lazy(() => import('./pages/Ingredients'))

const App: Component = () => {
  return (
    <Routes>
      <Route path='/ingredients' element={<IngredientsPage />} />
      <Route path='/' element={<LoginPage />} />
    </Routes>
  )
}

export default App
