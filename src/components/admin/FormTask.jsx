import { useState } from "react"

const FormTask = () => {

    let [open, setOpen] = useState(false)
    let [about, setAbout] = useState('')
    const [servico, setServico] = useState('')

    return (
        <form className="form-new" action="">
            <label htmlFor="service">Serviço</label>
            <select id="service" name="service" className="admin-form-select admin-mb-3" defaultValue={'Organização contabilística'} onChange={e => setServico(e.target.value)}>
                <option value={'Organização contabilística'}>Organização contabilística</option>
                <option value={'Constituição e legalização de empresa'}>Constituição e legalização de empresa</option>
                <option value={'Consultoria fiscal'}>Consultoria fiscal</option>
                <option value={'Gestão de recursos humanos'}>Gestão de recursos humanos</option>
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
    )
}

export {open, setOpen, about, setAbout, FormTask}