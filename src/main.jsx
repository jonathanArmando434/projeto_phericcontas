import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom'

import PrivateRoute from './routes/PrivateRoute'

import App from './App'
import './index.css'

import Home from './pages/Home'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Tasks from './pages/admin/Tasks'
import SearchMembers from './pages/admin/SearchMembers'
import Members from './pages/admin/Members'
import Clients from './pages/admin/Clients'
import SearchClients from './pages/admin/SearchClients'
import FormClient from './pages/admin/FormClient'
import FormTask from './pages/admin/FormTask'
import Client from './pages/admin/Client'
import Perfil from './pages/admin/Perfil'
import Financas from './pages/admin/Financas'
import InfoRH from './pages/admin/InfoRH'
import DashboardClient from './pages/admin/DashboardClient'
import SignUp from './pages/admin/SignUp'
import Page404 from './components/Page404'
import FormMember from './pages/admin/FormMember'
import Index from './pages/admin/Index'
import DashboardMember from './pages/admin/DashboardMember'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/admin/entrar',
        element: <Login />
      },
      {
        path: '/admin/cadastrar',
        element: <SignUp />
      },
      {
        path: '/admin',
        element: <Index />,
        children: [
          {
            path: '/admin',
            element: <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          },
          {
            path: '/admin/tarefas',
            element: <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          },
          {
            path: '/admin/membros',
            element: <PrivateRoute>
              <Members />
            </PrivateRoute>
          },
          {
            path: '/admin/membros/pesquisar/:query',
            element: <PrivateRoute>
              <SearchMembers />
            </PrivateRoute>
          },
          {
            path: '/admin/clientes',
            element: <PrivateRoute>
              <Clients />
            </PrivateRoute>
          },
          {
            path: '/admin/clientes/pesquisar/:query',
            element: <PrivateRoute>
              <SearchClients />
            </PrivateRoute>
          },
          {
            path: '/admin/membro/cadastrar',
            element: <PrivateRoute>
              <FormMember />
            </PrivateRoute>
          },
          {
            path: '/admin/membro/editar/:id',
            element: <PrivateRoute>
              <FormMember />
            </PrivateRoute>
          },
          {
            path: '/admin/tarefa/adicionar',
            element: <PrivateRoute>
              <FormTask />
            </PrivateRoute>
          },
          {
            path: '/admin/tarefa/editar/:id',
            element: <PrivateRoute>
              <FormTask />
            </PrivateRoute>
          },
          {
            path: '/admin/cliente',
            element: <PrivateRoute>
              <Client />
            </PrivateRoute>
          },
          {
            path: '/admin/cliente/cadastrar',
            element: <PrivateRoute>
              <FormClient />
            </PrivateRoute>
          },
          {
            path: '/admin/cliente/editar/:id',
            element: <PrivateRoute>
              <FormClient />
            </PrivateRoute>
          },
          {
            path: '/admin/perfil',
            element: <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          },
          {
            path: '/admin/perfil/:id',
            element: <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          },
          {
            path: '/admin/controle-de-financas',
            element: <PrivateRoute>
              <Financas />
            </PrivateRoute>
          },
          {
            path: '/admin/info-RH',
            element: <PrivateRoute>
              <InfoRH />
            </PrivateRoute>
          },
          {
            path: '/admin/info/membro/:id',
            element: <PrivateRoute>
              <DashboardMember />
            </PrivateRoute>
          },
          {
            path: '/admin/info/cliente/:id',
            element: <PrivateRoute>
              <DashboardClient />
            </PrivateRoute>
          },
        ]
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
