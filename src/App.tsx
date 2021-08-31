import { Router } from 'solid-app-router'
import type { Component } from "solid-js"

import logo from "./logo.svg"
import styles from "./App.module.css"

import IngredientList from "./components/IngredientList"

const App: Component = () => {
  return (
    <Router>
      <IngredientList />
    </Router>
  )
}

export default App
