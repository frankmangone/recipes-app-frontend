import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

import FirstComponent from "./components/FirstComponent"

const App: Component = () => {
  return (
    <FirstComponent name="Solid" />
  )
}

export default App
