import { BiSearch } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import api from '../../axios/api'
import searchZustand from '../../zustand/search'
import taskZustand from '../../zustand/task'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'
import clientIMG from '../../assets/admin/img/icons/client-02.jpeg'

import './AdminModal.css'

const AdminModal = () => {
    const [search, setSearch] = useState('')
    const [hasPhoto, setHasPhoto] = useState(userNoPhoto)
    const [hasLogo, setHasLogo] = useState(clientIMG)

    const {
        open,
        setOpen,
        about,
        id_responsavel,
        setIdResponsavel,
        id_cliente,
        setIdCliente,
        members,
        setMembers,
        clients,
        setClients
    } = taskZustand(state => state)

    const [title, setTitle] = useState('')


    const { searchContent, result, ok, cleanSearch, handleSearchColaborador, handleSearchCliente } = searchZustand(state => state)

    const handleSearch = async (e) => {
        e.preventDefault()

        if (about === 'Funcionário') {
            await handleSearchColaborador(search)
            setMembers(result)
            setTitle(`${result.length} resultado (s) para "${searchContent}"`)
            cleanSearch()
        }
        else {
            await handleSearchCliente(search)
            setClients(result)
            setTitle(`${result.length} resultado (s) para "${searchContent}"`)
            cleanSearch()
        }

        setSearch('')
    }

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
        else setIdResponsavel('')

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
        else setIdCliente('')

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

        auxDados.forEach((value, index) => {
            if (value._id === id_responsavel) handleonClickMember(index)
        })

        setMembers(auxDados)
    }

    const getClients = async (api_url) => {
        const res = await api.get(api_url)
        const dados = res.data

        if (dados.foto_url) setHasLogo(dados.foto_url)

        const auxDados = []

        dados.forEach(value => {
            auxDados.unshift({ ...value, select: false })
        })

        auxDados.forEach((value, index) => {
            if (value._id === id_cliente) handleonClickMember(index)
        })

        setClients(auxDados)
    }

    useEffect(() => {
        const api_url_member = import.meta.env.VITE_API_URL_MEMBERS
        getMembers(api_url_member)

        const api_url_client = import.meta.env.VITE_API_URL_CLIENTE
        getClients(api_url_client)

        setTitle(`Seleciona um ${about}`)
    }, [])

    return (
        <div id="admin-modal" className={open ? "admin-modal admin-d-block" : "admin-modal"}>
            {/* Modal content */}
            <div id='modal-content' className="admin-modal-content">
                {/* <span class="close">&times;</span> */}
                <div className="admin-bar-modal">
                    <form onSubmit={handleSearch} className="admin-w-100">
                        <input
                            type="search"
                            id="search"
                            name="search"
                            className="admin-form-control admin-d-inline-block"
                            placeholder="Pesquisar funcionário"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            id="btn-search"
                            className="admin-btn-input admin-btn admin-button-select inside"
                        >
                            <BiSearch />
                        </button>
                    </form>
                    <span onClick={() => { setOpen(!open) }} className="admin-close">x</span>
                </div>
                <main className="admin-content">
                    <div className="admin-row">
                        <div className="admin-col-12 admin-title-btn">
                            <h1 className="admin-h3 admin-mb-3">
                                {title}
                            </h1>
                        </div>
                        <div className="admin-col-12 admin-d-flex">
                            <div className="admin-row">
                                {(about === 'Funcionário') ?
                                    (members.map((member, index) => {
                                        return (
                                            <div onClick={() => handleonClickMember(index)}
                                                key={member._id}
                                                style={{minWidth: '20.5em'}}
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
                                        )
                                    })) :
                                    (clients.map((client, index) => {
                                        // if (client._id === id_cliente) handleonClickClient(index)
                                        return (
                                            <div onClick={() => handleonClickClient(index)}
                                                key={client._id}
                                                style={{minWidth: '21rem'}}
                                                className={
                                                    client.select ? "admin-card-selected admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card" :
                                                        "admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                                                }
                                            >
                                                <div className="admin-card-content">
                                                    <img
                                                        className="admin-card-img-top admin-card-img-client"
                                                        src={hasLogo}
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
                                        )
                                    }))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminModal