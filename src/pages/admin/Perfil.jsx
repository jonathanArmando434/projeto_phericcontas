import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaRegAddressCard } from 'react-icons/fa'
import { MdOutlineDateRange, MdOutlineCameraAlt, MdOutlineSchool, MdOutlinePlace, MdOutlineVpnKey } from 'react-icons/md'
import { RiBankLine } from 'react-icons/ri'
import { TbPhone, TbLanguage, TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { HiOutlineMail } from 'react-icons/hi'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'

import './Perfil.css'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'

import MinLoading from '../../components/admin/MinLoading'
import AdminModalUpdatePhoto from '/src/components/admin/AdminModalUpdatePhoto'

const Perfil = () => {
    const apiUrl = import.meta.env.VITE_API_URL

    const [navPerfil, setNavPerfil] = useState('geral')
    const [member, setMember] = useState({})
    const [contato, setContato] = useState({})
    const [open, setOpen] = useState(false)

    let { id } = useParams()

    let isUser = true
    if (id) isUser = false

    const { loading, userLogado, changeLoading } = loginZustand(state => state)

    if (!id) id = userLogado.id_colaborador

    const getMember = async () => {
        const res = await api.get('/colaborador/' + id)
        const dados = res.data

        const aux = { ...dados }
        aux.data_nasc = (new Date(dados.data_nasc.split('T')[0]).toLocaleDateString())

        setMember(aux)
    }

    const getContato = async () => {
        const res = await api.get('/contato-colaborador/' + id)
        const dados = res.data

        setContato(dados)
    }

    useEffect(() => {
        getMember()
        getContato()
    }, [])

    return (loading ? <MinLoading /> : (
        <main className="admin-member admin-content admin-bg-fff">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-perfil admin-row">
                    <div className="admin-col-12 admin-p-0">
                        <div className="admin-container-fluid">
                            <div className="admin-row admin-perfil admin-align-items-center admin-justify-content-center">
                                <div className="admin-col-4 mb-4">
                                    <div className="admin-card">
                                        <div className="card-body text-center">
                                            <div className="admin-image-container">
                                                <img
                                                    src={member.foto_url ? `${apiUrl}/${member.foto_url}` : userNoPhoto}
                                                    alt={member.nome}
                                                    className="admin-perfil-photo admin-rounded-circle admin-mb-2 admin-no-photo" width="248"
                                                    height="248"
                                                />
                                                <a onClick={() => setOpen(!open)} className="admin-update-photo-btn"><MdOutlineCameraAlt /></a>
                                            </div>
                                            <h5 className="admin-card-title admin-mb-0 admin-mt-3">{member.nome || 'Nome'}</h5>
                                            <div className="admin-text-muted admin-mb-2">{member.cargo || 'Cargo'}</div>

                                            <div>
                                                <Link to={`/admin/membro/editar/${id}`} className="admin-btn admin-me-2 admin-main-btn admin-mt-3"><BiEdit /> Editar</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-col-9 admin-bg-fff">
                                    <div className="admin-row">
                                        <div className="admin-col-4 admin-perfil-menu admin-p-4">
                                            <nav id="" className="">
                                                <div className="">

                                                    <h5 className="admin-perfil-h5 admin-mb-0">Dados</h5>

                                                    <ul className="admin-perfilbar-item">
                                                        <li className="">
                                                            <a className="admin-perfilbar-link" onClick={(() => setNavPerfil('geral'))}>
                                                                <span className="admin-align-middle">Vista Geral</span>
                                                            </a>
                                                        </li>
                                                        <li className="admin-perfilbar-item">
                                                            <a className="admin-perfilbar-link" onClick={(() => setNavPerfil('contato'))}>
                                                                <span className="admin-align-middle">Informações Básicas de Contato</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </nav>
                                        </div>
                                        <div className="admin-col-8 admin-p-4">
                                            <div className="admin-row">
                                                <div className={navPerfil === 'geral' ? "admin-col-12" : "admin-col-12 admin-d-none"}>
                                                    <div className="admin-perfil-item">
                                                        <div className="admin-d-flex">
                                                            <MdOutlineVpnKey />
                                                            <div>
                                                                <span className="admin-perfil-dado">{member._id || 'ID'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">ID</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="admin-perfil-item">
                                                        <div className="admin-d-flex">
                                                            <FaRegAddressCard />
                                                            <div>
                                                                <span className="admin-perfil-dado">{member.num_bi || '000000000LA000'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">Bilhete de Idenditade</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="admin-perfil-item">
                                                        <div className="admin-d-flex">
                                                            <MdOutlineDateRange />
                                                            <div>
                                                                <span className="admin-perfil-dado">{member.data_nasc || 'dd/mm/aaaa'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">Data de Nascimento</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="admin-perfil-item admin-m-0">
                                                        <div className="admin-d-flex">
                                                            <RiBankLine />
                                                            <div>
                                                                <span className="admin-perfil-dado">{member.num_iban || '0000000000000000000000000'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">IBAN</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="admin-perfil-item admin-m-0">
                                                        <div className="admin-d-flex">
                                                            <MdOutlineSchool />
                                                            <div>
                                                                <span className="admin-perfil-dado">{member.nivel_academico || 'Ensino médio'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">Nível académico</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={navPerfil === 'contato' ? "admin-col-12" : "admin-col-12 admin-d-none"}>
                                                    <div className="admin-perfil-item">
                                                        <h4 className="admin-mb-0">Informações de Contacto</h4>
                                                    </div>
                                                    {contato.telefone && contato.telefone.map((tel, index) => (
                                                        <div key={index} className="admin-perfil-item">
                                                            <div className="admin-d-flex">
                                                                <TbPhone />
                                                                <div>
                                                                    <span className="admin-perfil-dado">+244{tel}</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">Telefone</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="admin-perfil-item">
                                                        <div className="admin-d-flex">
                                                            <HiOutlineMail />
                                                            <div>
                                                                <span className="admin-perfil-dado">{contato.email || 'E-mail'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">E-mail</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr />

                                                    <div className="admin-perfil-item">
                                                        <h4 className="admin-mb-0">Informações Básicas</h4>
                                                    </div>

                                                    {member.idioma && member.idioma.map((lang, index) => (
                                                        <div key={index} className="admin-perfil-item admin-m-0">
                                                            <div className="admin-d-flex">
                                                                <TbLanguage />
                                                                <div>
                                                                    <span className="admin-perfil-dado">{lang}</span>
                                                                    <span className="admin-small admin-d-block admin-perfil-title">Idioma</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="admin-perfil-item admin-m-0">
                                                        <div className="admin-d-flex">
                                                            {member.genero === 'Feminino' ? <TbGenderFemale /> : <TbGenderMale />}
                                                            <div>
                                                                <span className="admin-perfil-dado">{member.genero || 'Género'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">Género</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="admin-perfil-item">
                                                        <div className="admin-d-flex">
                                                            <MdOutlinePlace />
                                                            <div>
                                                                <span className="admin-perfil-dado">{contato.endereco || 'Endereco'}</span>
                                                                <span className="admin-small admin-d-block admin-perfil-title">Endereço</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <AdminModalUpdatePhoto
                                    open={open}
                                    setOpen={setOpen}
                                    id={id}
                                    getAssociateUpdated={getMember}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    ))
}

export default Perfil