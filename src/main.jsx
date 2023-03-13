import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App'
import './index.css'

import Home from './pages/Home'
import Login from './pages/admin/Login'
import Dashboar from './pages/admin/Dashboard'
import Tasks from './pages/admin/Tasks'
import Members from './pages/admin/Members'
import Clients from './pages/admin/Clients'
import AddMember from './pages/admin/AddMember'
import AddClient from './pages/admin/AddClient'
import AddTask from './pages/admin/AddTask'
import Client from './pages/admin/Client'
import Perfil from './pages/admin/Perfil'
import Financas from './pages/admin/Financas'
import InfoRH from './pages/admin/InfoRH'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin' element={<Dashboar />} />
          <Route path='/admin/tarefas' element={<Tasks />} />
          <Route path='/admin/membros' element={<Members />} />
          <Route path='/admin/clientes' element={<Clients />} /> 
          <Route path='/admin/clientes' element={<Clients />} />          
          <Route path='/admin/novo-membro' element={<AddMember />} />
          <Route path='/admin/nova-tarefa' element={<AddTask />} />
          <Route path='/admin/cliente' element={<Client />} />
          <Route path='/admin/novo-cliente' element={<AddClient />} />
          <Route path='/admin/perfil' element={<Perfil />} />
          <Route path='/admin/controle-de-financas' element={<Financas />} />
          <Route path='/admin/info-RH' element={<InfoRH />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
