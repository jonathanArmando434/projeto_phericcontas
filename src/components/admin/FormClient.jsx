import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlinePicture } from 'react-icons/ai'

import userNoPhoto from '/src/assets/admin/img/avatars/form-update-img.png'

import './FormClient.css'


const FormClient = () => {
    return (
        <form className="form-new" action="">
            <div className="admin-update-img admin-mb-3">
                <label className='admin-form-label' htmlFor="img">
                    <AiOutlinePicture />
                    <label className='admin-form-label admin-d-block'>Seleciona uma imagem</label>
                    <input type="file" accept='image/*' id='img' name='img' />
                </label>
            </div>
            <label className='admin-form-label' htmlFor="name">Nome</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="name"
                name="name"
                placeholder="Informe o nome do novo cliente"
            />
            <label className='admin-form-label' htmlFor="nif">NIF</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="nif"
                name="nif"
                placeholder="Informe o NIF do novo cliente"
            />
            <label className='admin-form-label' htmlFor="email">E-mail</label>
            <input
                type="email"
                className="admin-form-control admin-mb-3"
                id="email"
                name="email"
                placeholder="Informe o E-mail principal do novo cliente"
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
            <label className='admin-form-label' htmlFor="data-criacao">Data de Criação</label>
            <input
                type="date"
                className="admin-form-control admin-mb-3"
                id="data-criacao"
                name="dataCriacao"
                placeholder=""
            />
            <label className='admin-form-label' htmlFor="area-negocio">Área de Negócio</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="area-negocio"
                name="area-negocio"
                placeholder="Informe a área de negócio novo cliente"
            />
            <label className='admin-form-label' htmlFor="localizacao">Localização</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block"
                id="localizacao"
                name="localizacao"
                placeholder="Informe a Localização do novo cliente"
            />
            <a href="#">
                <IoMdAddCircleOutline />
            </a>
            <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                Adicionar
            </button>
        </form>
    )
}

export default FormClient