import React, { useState } from "react"
import Scene from "./components/Scene"
import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"
import Test from "./components/Test"

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const handleToggleTheme = () => setDarkMode(!darkMode)
  const handleChangeLang = () => alert("Langue changée !")

  return (
    <div
      className={`flex flex-col w-screen h-screen overflow-hidden 
      ${darkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"}`}
    >
      <Topbar
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onChangeLang={handleChangeLang}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar darkMode={darkMode} />
        <div className="flex-1 h-full">
          {/* <Scene /> */}
          <Test />
        </div>
      </div>
    </div>
  )
}

export default App
