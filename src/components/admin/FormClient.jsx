import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlinePicture } from 'react-icons/ai'
import { useState } from 'react'

import userNoPhoto from '/src/assets/admin/img/avatars/form-update-img.png'

import './FormClient.css'


const FormClient = () => {
    const [data_inicio, setData_inicio] = useState('')
    const [data_fim, setData_fim] = useState('')
    const [picture, setPicture] = useState('')
    const [nome, setNome] = useState('')
    const [nif, setNif] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [area_de_negocio, setArea_de_negocio] = useState('')
    const [localizacao, setContrato] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
    }

    return (
        <form className="form-new" onSubmit={handleSubmit}>
            <div className="admin-update-img admin-mb-3">
                <label className='admin-form-label' htmlFor="img">
                    <AiOutlinePicture />
                    <label className='admin-form-label admin-d-block'>Seleciona uma imagem</label>
                    <input type="file" accept='image/*' id='img' name='img' value={picture} onChange={e => setPicture(e.target.value)} />
                </label>
            </div>
            <label className='admin-form-label' htmlFor="name">Nome</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="name"
                name="name"
                placeholder="Informe o nome do novo cliente"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="nif">NIF</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="nif"
                name="nif"
                placeholder="Informe o NIF do novo cliente"
                value={nif}
                onChange={e => setNif(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="email">E-mail</label>
            <input
                type="email"
                className="admin-form-control admin-mb-3"
                id="email"
                name="email"
                placeholder="Informe o E-mail principal do novo cliente"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="phone">Telefone / WhatsApp</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block"
                id="phone"
                name="phone"
                placeholder="Informe o telefone do novo cliente"
            />
            <a href="#">
                <IoMdAddCircleOutline />
            </a>
            <label className='admin-form-label' htmlFor="area-negocio">Área de Negócio</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="area-negocio"
                name="area-negocio"
                placeholder="Informe a área de negócio novo cliente"
                value={area_de_negocio}
                onChange={e => setArea_de_negocio(e.target.value)}
            />
            <label className='admin-form-label' htmlFor="localizacao">Localização</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block"
                id="localizacao"
                name="localizacao"
                placeholder="Informe a Localização do novo cliente"
                value={localizacao}
                onChange={e => setLocalizacao(e.target.value)}
            />
            <a href="#">
                <IoMdAddCircleOutline />
            </a>
            <label className='admin-form-label admin-d-block' htmlFor="">
                Contrato
            </label>
            <div className="admin-d-flex admin-justify-content-between">
                <div style={{ width: '49.5%' }}>
                    <label className='admin-form-label admin-d-block' htmlFor="startContract">
                        Início
                    </label>
                    <input
                        type="date"
                        className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                        id="startContract"
                        name="startContract"
                        value={data_inicio || ''}
                        onChange={e => setData_inicio(e.target.value)}
                    />
                </div>
                <div style={{ width: '49.5%' }}>
                    <label className='admin-form-label admin-d-block' htmlFor="endContract">
                        Fim
                    </label>
                    <input
                        type="date"
                        className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                        id="endContract"
                        name="endContract"
                        value={data_fim || ''}
                        onChange={e => setData_fim(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                Adicionar
            </button>
        </form>
    )
}

export default FormClient