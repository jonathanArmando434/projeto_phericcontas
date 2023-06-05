import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlinePicture } from 'react-icons/ai'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'

import './AdminModal.css'

import ModalLoading from './ModalLoading'

const AdminModal = ({ open, setOpen, id, getAssociateUpdated }) => {
    const [photo, setPhoto] = useState('')
    const [file, setFile] = useState('')
    const [loadingToModal, setLoadingToModal] = useState(false)
    const [title, setTitle] = useState()
    const [msg, setMsg] = useState('')
    const [ok, setOk] = useState(false)

    const location = useLocation()
    const url = location.pathname

    const handleUpdate = async (e) => {
        e.preventDefault()

        setOk(false)
        setMsg('')

        if (!photo) return

        try {
            setLoadingToModal(true)

            if (url.startsWith('/admin/info/membro/') || url.startsWith('/admin/perfil/')) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await api.patch('/colaborador/update-photo/' + id, formData)
                const data = res.data
                const { message } = data

                if (message === "Foto do colaborador atualizado com sucesso!") {
                    getAssociateUpdated()
                    setMsg(message)
                    setOk(true)
                }

                else setMsg('A foto do colaborador não foi atualizada!')
            }

            else if (url.startsWith('/admin/info/cliente/')) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await api.patch('/cliente/update-logo/' + id, formData)
                const data = res.data
                const { message } = data

                if (message === "Logotipo do cliente foi atualizado com sucesso!") {
                    getAssociateUpdated()
                    setMsg(message)
                    setOk(true)
                }

                else setMsg('O logotipo do cliente não foi atualizado, tente novamente!')
            }
        } catch (error) {
            console.log(error)
            setMsg('Houve um erro, tente novamente!')
        } finally {
            setLoadingToModal(false)
        }
    }

    const closeModal = async () => {
        setFile('')
        setOpen(!open)
        setOk(false)
        setMsg('')
    }

    const handleOnChangeFile = e => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                setFile({})
                return
            }

            setFile(e.target.files[0])
        } catch (error) {
            console.log(error)
        } finally {
            setMsg('')
        }
    }

    useEffect(() => {
        try {
            if (!file) {
                setPhoto('')
                return
            }

            const objectUrl = URL.createObjectURL(file)
            setPhoto(objectUrl)

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl)
        } catch (error) {
            console.log(error)
        }
    }, [file])

    useEffect(() => {
        if (url.startsWith('/admin/info/membro/') || url.startsWith('/admin/perfil/')) {
            setTitle('Atualizar foto do colaborador')
        }
        else if (url.startsWith('/admin/info/cliente/')) {
            setTitle('Atualizar logo do cliente')
        }
    }, [])

    return (
        <div id="admin-modal" className={open ? "admin-modal admin-d-block" : "admin-modal"}>
            {loadingToModal ? <ModalLoading /> : (
                <>
                    {/* Modal content */}
                    <div id='modal-content' className="admin-modal-content">
                        <div className="admin-bar-modal">
                            <div className="admin-title-btn">
                                <h1 className="admin-h3 admin-mb-3">
                                    {title}
                                </h1>
                            </div>
                            <span
                                onClick={closeModal}
                                className="admin-close"
                            >
                                x
                            </span>
                        </div>
                        {/* <span class="close">&times;</span> */}
                        <main className="admin-content-update-photo">
                            <div style={{ height: '100%' }} className="admin-row admin-d-flex">
                                {
                                    msg && <div style={{ maxHeight: '6%', display: 'flex', alignItems: 'center' }} className={(ok ? 'admin-msg-success m-0' : 'admin-msg-danger m-0')}>
                                        {msg}
                                    </div>
                                }
                                <div style={{ height: '85%' }} className={'admin-col-12 admin-update-img'}>
                                    <label style={{ height: '100%' }} className='admin-form-label' htmlFor="picture">
                                        {
                                            photo ?
                                                <img src={photo} alt="logo do cliente" className='admin-photo' /> :
                                                <AiOutlinePicture />
                                        }
                                        <span style={{ marginTop: '1rem', marginBottom: 0, cursor: 'pointer' }} className='admin-form-label admin-d-block'>{file ? 'Selecionar outra imagem' : 'Seleciona uma imagem'}</span>
                                        <input type="file" accept='image/*' id='picture' name='picture' onChange={handleOnChangeFile} />
                                    </label>
                                </div>
                                {!msg && <div style={{ display: 'flex', justifyContent: 'end', height: 'content' }} className='admin-col-12 admin-mt-4'>
                                    <div className="admin-d-inline-block">
                                        <a onClick={closeModal} className="btn-cancel admin-btn admin-me-2 admin-main-btn">
                                            Cancelar
                                        </a>
                                        <a onClick={handleUpdate} className="btn-update admin-btn admin-me-2 admin-main-btn">
                                            Atualizar
                                        </a>
                                    </div>
                                </div>}
                            </div>
                        </main>
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminModal
