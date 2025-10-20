import React, { useState } from "react"
import Scene from "./components/Scene"
import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"
import Test from "./components/Test"

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const handleToggleTheme = () => setDarkMode(!darkMode)
  const handleChangeLang = () => alert("Langue changée !")
  const [sceneConfig, setSceneConfig] = useState({ scene: { geometries: [] }, source: { params: { position: [0, 0, 0] } }, rays: [] });

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
        {/* Passe un callback à Sidebar pour mettre à jour l'état */}
        <Sidebar darkMode={darkMode} onApplyConfig={setSceneConfig} />

        <div className="flex-1 h-full">
          {/* Passe le JSON comme prop à Scene */}
          <Scene sceneData={sceneConfig} />
          {/* <Test /> */}
        </div>
      </div>
    </div>
  );
}

export default App
