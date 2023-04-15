import { BiSearch } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import loginZustand from '../../zustand/login'
import api from '../../axios/api'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'
import memberIMG from '../../assets/admin/img/avatars/avatar-2.jpg'
import clientIMG from '../../assets/admin/img/icons/client-02.jpeg'


import './AdminModal.css'

const AdminModal = ({ open, setOpen, about, setIdResponsavel, setIdCliente }) => {
    const [members, setMembers] = useState([])
    const [clients, setClients] = useState([])
    const [hasPhoto, setHasPhoto] = useState(userNoPhoto)

    const { loading, changeLoading } = loginZustand(state => state)

    const handleonClickMember = (index) => {
        let aux = [...members]
        aux[index].select = !aux[index].select
        if (aux[index].select === true) {
            setIdResponsavel(aux[index]._id)

            const aux2 = aux.map(value => {
                if (value !== aux[index]) value.select = false
                return value
            })

            aux = [...aux2]
        }
        setMembers(aux)
    }

    const handleonClickClient = (index) => {
        let aux = [...clients]
        aux[index].select = !aux[index].select
        if (aux[index].select === true) {
            setIdCliente(aux[index]._id)

            const aux2 = aux.map(value => {
                if (value !== aux[index]) value.select = false
                return value
            })

            aux = [...aux2]
        }
        setClients(aux)
    }

    const getMembers = async (api_url) => {
        const res = await api.get(api_url)
        const dados = res.data

        if (dados.foto_url) setHasPhoto(dados.foto_url)

        const auxDados = []

        dados.forEach(value => {
            if (value.nome !== 'Phericcontas'
                && value.cargo !== 'PCA'
                && value.cargo !== 'Gerente') auxDados.unshift({ ...value, select: false })
        })

        setMembers(auxDados)
    }

    const getClients = async (api_url) => {
        const res = await api.get(api_url)
        const dados = res.data

        // if (dados.foto_url) setHasPhoto(dados.foto_url)

        const auxDados = []

        dados.forEach(value => {
            auxDados.unshift({ ...value, select: false })
        })

        setClients(auxDados)
    }

    useEffect(() => {
        const api_url_member = import.meta.env.VITE_API_URL_MEMBERS
        getMembers(api_url_member)

        const api_url_client = import.meta.env.VITE_API_URL_CLIENTE
        getClients(api_url_client)
    }, [])

    return (
        <div id="admin-modal" className={open ? "admin-modal admin-d-block" : "admin-modal"}>
            {/* Modal content */}
            <div className="admin-modal-content">
                {/* <span class="close">&times;</span> */}
                <div className="admin-bar-modal">
                    <form action="" className="admin-w-100">
                        <input
                            type="search"
                            id="search"
                            name="search"
                            className="admin-form-control admin-d-inline-block"
                            placeholder="Pesquisar funcionário"
                        />
                        <button
                            type="submit"
                            id="btn-search"
                            className="admin-btn-input admin-btn admin-button-select"
                        >
                            <BiSearch />
                        </button>
                    </form>
                    <span onClick={() => {setOpen(!open)}} className="admin-close">x</span>
                </div>
                <main className="admin-content">
                    <div className="admin-row">
                        <div className="admin-col-12 admin-title-btn">
                            <h1 className="admin-h3 admin-mb-3">
                                Seleciona um {about}
                            </h1>
                        </div>
                        <div className="admin-col-12 admin-d-flex">
                            <div className="admin-row">
                                {(about === 'Funcionário') ?
                                    (members.map((member, index) => (
                                        <div onClick={() => handleonClickMember(index)}
                                            key={member._id}
                                            className={
                                                member.select ?
                                                    "admin-card-selected admin-card admin-card-member admin-col-12 admin-col-md-3 admin-col-lg-4 admin-min-card" :
                                                    "admin-card admin-card-member admin-col-12 admin-col-md-3 admin-col-lg-4 admin-min-card"
                                            }>
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-member"
                                                    src={hasPhoto}
                                                    alt="Unsplash"
                                                    width="276"
                                                    height="276"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{member.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{member.cargo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))) :
                                    (clients.map((client, index) => (
                                        <div onClick={() => handleonClickClient(index)}
                                            key={client._id}
                                            className={
                                                client.select ? "admin-card-selected admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card" :
                                                    "admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                                            }
                                        >
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-client"
                                                    src={clientIMG}
                                                    alt="Unsplash"
                                                    max-width="276"
                                                    height="138"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{client.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{client.area_negocio}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminModal