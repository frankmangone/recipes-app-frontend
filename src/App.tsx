import { lazy } from "solid-js"
import { Routes, Route } from 'solid-app-router'
import { CurrentUserProvider } from "@context/CurrentUserContext"
import type { Component } from "solid-js"

import logo from "./logo.svg"
import styles from "./App.module.css"

const CollectionPage = lazy(() => import('@pages/Collection'))
const IngredientsPage = lazy(() => import('@pages/Ingredients'))
const LoginPage = lazy(() => import('@pages/Login'))
const PlanningPage = lazy(() => import('@pages/Planning'))
const RecipesPage = lazy(() => import('@pages/Recipes'))
const RecipePage = lazy(() => import('@pages/Recipe'))

const App: Component = () => {
  return (
    <CurrentUserProvider>
      <Routes>
        <Route path='/collection' element={<CollectionPage />} />
        <Route path='/ingredients' element={<IngredientsPage />} />
        <Route path='/planning' element={<PlanningPage />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/recipe/:id' element={<RecipePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </CurrentUserProvider>
  )
}

export default App
