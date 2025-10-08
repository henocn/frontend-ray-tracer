import React, { useState } from "react"
import Scene from "./components/scene"
import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"

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

      {/* --- Contenu principal (Sidebar + Scene) --- */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixe à gauche */}
        <Sidebar darkMode={darkMode} />

        {/* Scène 3D qui prend tout l’espace restant */}
        <div className="flex-1 h-full">
          <Scene />
        </div>
      </div>
    </div>
  )
}

export default App
