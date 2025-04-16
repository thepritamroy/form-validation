
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.tsx'
createRoot(document.getElementById('root')!).render(
    
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route element={<App/>} path="/*" />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
    
  
)
