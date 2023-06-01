import { BiSearch } from 'react-icons/bi'
import { useState, useEffect, useRef } from 'react'
import api from '../../axios/api'
import searchZustand from '../../zustand/search'
import taskZustand from '../../zustand/task'
import loginZustand from "../../zustand/login"

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'
import clientIMG from '../../assets/admin/img/icons/client-02.jpeg'

import './AdminModal.css'

import ModalLoading from './ModalLoading'

const AdminModal = () => {
    const [search, setSearch] = useState('')
    const [hasPhoto, setHasPhoto] = useState(userNoPhoto)
    const [hasLogo, setHasLogo] = useState(clientIMG)
    const [loadingToModal, setLoadingToModal] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

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

    const { loading, handleLogin, changeLoading } = loginZustand(state => state)

    const { searchContent, result, ok, cleanSearch, handleSearchColaborador, handleSearchCliente } = searchZustand(state => state)

    const principalRef = useRef(null)
    const secundaryRef = useRef(null)

    const handleSearch = async (e) => {
        try {
            setLoadingToModal(true)

            e.preventDefault()

            if (about === 'Funcionário') {
                await handleSearchColaborador(search)
                setTitle(`${result.length} resultado (s) para "${searchContent}"`)
                cleanSearch()
            }
            else {
                await handleSearchCliente(search)
                setTitle(`${result.length} resultado (s) para "${searchContent}"`)
                cleanSearch()
            }

            setSearch('')
            setIsSearch(true)

            setLoadingToModal(false)
        } catch (error) {
            console.log(error)
            alert('A pesquisa falhou, tente novamente!')
        }
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
        if (!loadingToModal && isSearch) {
            principalRef.current.classList.add('admin-d-none')
            secundaryRef.current.classList.remove('admin-d-none')
        }
    }, [loadingToModal])

    useEffect(() => {
        setTitle(`Seleciona um ${about}`)
    }, [about])

    useEffect(() => {
        const api_url_member = import.meta.env.VITE_API_URL_MEMBERS
        getMembers(api_url_member)

        const api_url_client = import.meta.env.VITE_API_URL_CLIENTE
        getClients(api_url_client)
    }, [])

    return (
        <div id="admin-modal" className={open ? "admin-modal admin-d-block" : "admin-modal"}>
            {loadingToModal ? <ModalLoading /> : (
                <>
                    {/* Modal content */}
                    <div id='modal-content' className="admin-modal-content">
                        <div className="admin-bar-modal">
                            <form onSubmit={handleSearch} className="admin-w-100">
                                <input
                                    type="search"
                                    id="search"
                                    name="search"
                                    className="admin-form-control admin-d-inline-block"
                                    placeholder={`Pesquisar ${about}`}
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
                            <span
                                onClick={() => {
                                    setOpen(!open)
                                    setIsSearch(false)
                                    principalRef.current.classList.remove('admin-d-none')
                                    secundaryRef.current.classList.add('admin-d-none')
                                }}
                                className="admin-close"
                            >
                                x
                            </span>
                        </div>
                        {/* <span class="close">&times;</span> */}
                        <main className="admin-content">
                            <div className="admin-row">
                                <div className="admin-col-12 admin-title-btn">
                                    <h1 className="admin-h3 admin-mb-3">
                                        {title}
                                    </h1>
                                </div>
                                <div className="admin-col-12 admin-d-flex">
                                    <div id='principal' ref={principalRef} className="admin-row">
                                        {(about === 'funcionário') ?
                                            (members.map((member, index) => {
                                                return (
                                                    <div onClick={() => handleonClickMember(index)}
                                                        key={member._id}
                                                        style={{ minWidth: '20.5em' }}
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
                                                        style={{ minWidth: '21rem' }}
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
                                    <div id='secundary' ref={secundaryRef} className="admin-row admin-d-none">
                                        {(about === 'funcionário') ?
                                            (result.map((member, index) => {
                                                return (
                                                    <div onClick={() => handleonClickMember(index)}
                                                        key={member._id}
                                                        style={{ minWidth: '20.5em' }}
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
                                            (result.map((client, index) => {
                                                // if (client._id === id_cliente) handleonClickClient(index)
                                                return (
                                                    <div onClick={() => handleonClickClient(index)}
                                                        key={client._id}
                                                        style={{ minWidth: '21rem' }}
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
                </>
            )}
        </div>
    )
}

export default AdminModal