import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import LoginPage from './pages/LoginPage'
import HubPage from './pages/HubPage'
import LabPage from './pages/LabPage'
import GamePage from './pages/GamePage'
import ResultsPage from './pages/ResultsPage'
import CongratulationsPage from './pages/CongratulationsPage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = useAppStore((s) => s.token)
  return token ? <>{children}</> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<RequireAuth><HubPage /></RequireAuth>} />
        <Route path="/lab/:lab" element={<RequireAuth><LabPage /></RequireAuth>} />
        <Route path="/lab/:lab/week/:week" element={<RequireAuth><GamePage /></RequireAuth>} />
        <Route path="/lab/:lab/results" element={<RequireAuth><ResultsPage /></RequireAuth>} />
        <Route path="/congratulations" element={<RequireAuth><CongratulationsPage /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
