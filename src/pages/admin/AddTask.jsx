import { useState } from 'react'

import './AddTask.css'

import Index from "./Index"

import AdminModal from '/src/components/admin/AdminModal'
import PageTitle from '../../components/admin/PageTitle'
//import { open, setOpen, about, setAbout, FormTask } from '../../components/admin/FormTask'

const AddTask = () => {
    let [open, setOpen] = useState(false)
    let [about, setAbout] = useState('')

    return (
        <Index>
            <main className="admin admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Nova Tarefa'} />

                        <div className="admin-col-12 admin-col-lg-6 admin-bg-fff admin-br-5 admin-mx-auto div-form">
                            <form className="form-new" action="">
                                <label htmlFor="service">Serviço</label>
                                <select id="service" name="service" className="admin-form-select admin-mb-3">
                                    <option selected="">One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                                <label htmlFor="data-inicio">Data de Início</label>
                                <input
                                    type="date"
                                    className="admin-form-control admin-mb-3"
                                    id="data-inicio"
                                    name="dataInicio"
                                    placeholder=""
                                />
                                <label htmlFor="func-res" className="admin-d-block">Funcionário Responsável</label>
                                <input
                                    className="admin-form-control admin-mb-3 admin-w-me-80 admin-d-inline-block"
                                    type="text"
                                    placeholder="Seleciona um funcionário"
                                    id="func-res"
                                    name="func-res"
                                    readOnly
                                />
                                <button
                                    onClick={() => {
                                        setOpen(!open)
                                        setAbout('Funcionário')
                                    }}
                                    type="button"
                                    id=""
                                    className="admin-btn-select admin-btn admin-btn-input admin-button-select"
                                >
                                    Selecionar
                                </button>
                                <label htmlFor="client" className="admin-d-block">
                                    Cliente
                                </label>
                                <input
                                    className="admin-form-control admin-mb-3 admin-w-me-80 admin-d-inline-block"
                                    type="text"
                                    placeholder="Seleciona o cliente"
                                    id="client"
                                    name="client"
                                    readOnly
                                />
                                <button
                                    onClick={() => {
                                        setOpen(!open)
                                        setAbout('Cliente')
                                    }}
                                    type="button"
                                    id=""
                                    className="admin-btn-select admin-btn admin-btn-input admin-button-select"
                                >
                                    Selecionar
                                </button>
                                <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                                    Adicionar
                                </button>
                            </form>
                        </div>
                        {/* The Modal */}
                        <AdminModal open={open} setOpen={setOpen} about={about} setAbout={setAbout} />
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default AddTask