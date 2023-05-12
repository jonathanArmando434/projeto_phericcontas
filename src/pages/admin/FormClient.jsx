import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlinePicture } from 'react-icons/ai'
import clienteZustand from '../../zustand/cliente'
import loginZustand from '../../zustand/login'
import api from '../../axios/api'

import './FormClient.css'

import PageTitle from '../../components/admin/PageTitle'

const FormClient = () => {
    const [data_inicio, setData_inicio] = useState('')
    const [data_fim, setData_fim] = useState('')
    const [nome, setNome] = useState('')
    const [nif, setNif] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState([''])
    const [area_negocio, setArea_negocio] = useState('')
    const [local, setLocal] = useState([''])
    const [photo, setPhoto] = useState('')
    const [file, setFile] = useState('')
    const [btn, setBtn] = useState('Adicionar')
    const [noDisplayed, setDisplayed] = useState('')
    const [titlePage, setTitlePage] = useState('Adicionar cliente')
    const [method, setMethod] = useState('post')
    const [backup, setBackup] = useState({})

    const { id } = useParams()

    const pageTopRef = useRef(null);

    const { message, allRight, createCliente, editCliente, cleanMessage, cleanAllRight } = clienteZustand(state => state)

    const { loading, changeLoading } = loginZustand(state => state)

    let localAux = []
    let telefoneAux = []

    const scrollToTop = () => {
        pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const PreparingDatas = async () => {
        try {
            const resCliente = await api.get(`/cliente/${id}`)
            const cliente = resCliente.data

            const resContato = await api.get(`/contato-cliente/${id}`)
            const contato = resContato.data

            const resContrato = await api.get(`/contrato/${id}`)
            const contrato = resContrato.data

            const auxBackup = {
                cliente,
                contato,
                contrato,
            }

            setBackup(auxBackup)

            setNif(cliente.nif)
            setNome(cliente.nome)
            setArea_negocio(cliente.area_negocio)
            setTelefone(contato.telefone)
            setEmail(contato.email)
            setData_inicio(contrato.data_inicio.split('T')[0])
            setData_fim(contrato.data_fim.split('T')[0])

            const localAux = []
            for (const loc of contato.localizacao) {
                localAux.push(loc.endereco)
            }
            setLocal(localAux)
        } catch (error) {
            console.log(error)
            alert('Erro no servidor, recarregue a página!')
        }
    }

    const handleOnChangeFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile({})
            return
        }

        setFile(e.target.files[0])
    }

    const cleanDatas = () => {
        setNif('')
        setNome('')
        setArea_negocio('')
        setTelefone([''])
        setEmail('')
        setData_inicio('')
        setData_fim('')
        setLocal([''])
    }

    const removeEmptyValue = (array) => {
        array = removeSamevalue(array)
        const aux = array.filter(value => value !== '')
        return aux
    }

    const removeSamevalue = (array) => {
        array.forEach((value, index) => {
            for (let i = index + 1; i < array.length; i++)
                if (array[i] === value) array[i] = ''
        })

        return array
    }

    const generateLocal = () => {
        const aux_1 = removeEmptyValue(local)

        const aux_2 = aux_1.map((local, index) => {
            let localizacao = {}
            if (index === 0) {
                localizacao = {
                    endereco: local,
                    isPrincipal: true
                }
            }
            else {
                localizacao = {
                    endereco: local,
                    isPrincipal: false
                }
            }
            return localizacao
        })
        
        return aux_2
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const auxTelefone = removeEmptyValue(telefone)
        setTelefone(auxTelefone)

        const localizacao = generateLocal()

        cleanMessage()
        cleanAllRight()

        let client = {
            file,
            nif,
            nome,
            telefone,
            email,
            area_negocio,
            data_inicio,
            data_fim,
            localizacao,
            status: true
        }

        if (method === 'post') await createCliente(client)
        else await editCliente(client, backup, id)

        if (allRight && method === 'post') cleanDatas()

        if (auxTelefone.length === 0) setTelefone([''])

        if (localizacao.length === 0) setLocal([''])

        scrollToTop()
    }

    useEffect(() => {
        if (!file) {
            setPhoto('')
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPhoto(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])


    useEffect(() => {
        cleanAllRight()
        cleanMessage()
        if (id) {
            setBtn('Editar')
            setDisplayed('admin-d-none')
            setTitlePage('Editar cliente')
            setMethod('patch')
            PreparingDatas()
        }
    }, [])

    return (
        <main className="admin-content" ref={pageTopRef}>
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={titlePage} />

                    <div className="admin-col-12 admin-col-lg-6 admin-bg-fff admin-br-5 admin-mx-auto admin-p-3 div-form">
                        <form className="form-new" onSubmit={handleSubmit}>
                            {
                                message && <div className={(allRight ? 'admin-msg-success' : 'admin-msg-danger')}>
                                    {message}
                                </div>
                            }
                            <div className={noDisplayed ? noDisplayed : "admin-update-img admin-mb-3"}>
                                <label className='admin-form-label' htmlFor="picture">
                                    {
                                        photo ?
                                            <img src={photo} alt="logo do cliente" className='admin-logo-cliente' /> :
                                            <AiOutlinePicture />
                                    }
                                    <label className='admin-form-label admin-d-block'>Seleciona uma imagem</label>
                                    <input type="file" accept='image/*' id='picture' name='picture' onChange={handleOnChangeFile} />
                                </label>
                            </div>
                            <label className='admin-form-label' htmlFor="nif">NIF</label>
                            <input
                                type="text"
                                minLength="9"
                                maxLength="9"
                                className="admin-form-control admin-mb-3"
                                id="nif"
                                name="nif"
                                placeholder="Informe o NIF do novo cliente"
                                value={nif}
                                onChange={e => setNif(e.target.value)}
                                readOnly={method !== 'post' ? true : false}
                            />
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
                            <label className='admin-form-label' htmlFor="area-negocio">Área de Negócio</label>
                            <input
                                type="text"
                                className="admin-form-control admin-mb-3"
                                id="area-negocio"
                                name="area-negocio"
                                placeholder="Informe a área de negócio novo cliente"
                                value={area_negocio}
                                onChange={e => setArea_negocio(e.target.value)}
                            />
                            <div>
                                <label className='admin-form-label' htmlFor={`phone${telefone.length}`}>Telefone / WhatsApp</label>
                                {
                                    telefone && (telefone.map((value, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            minLength="9"
                                            maxLength="9"
                                            className={
                                                (index === (telefone.length - 1)) ? "admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block" :
                                                    "admin-form-control admin-mb-3"
                                            }
                                            id={`phone${(index + 1)}`}
                                            name={`phone${(index + 1)}`}
                                            placeholder="Informe um número de telefone / WhatsApp"
                                            value={value}
                                            onChange={e => {
                                                telefoneAux = telefone.map((value, i) => (index === i ? e.target.value : value))
                                                setTelefone(telefoneAux)
                                            }}
                                        />
                                    )))
                                }

                                <a href="#" onClick={(e) => {
                                    e.preventDefault()
                                    setTelefone([...telefone, ''])
                                }}>
                                    <IoMdAddCircleOutline />
                                </a>
                            </div>
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
                                        min={data_inicio || (new Date().toISOString().split('T')[0])}
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
                                        min={data_fim || (new Date().toISOString().split('T')[0])}
                                        className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                                        id="endContract"
                                        name="endContract"
                                        value={data_fim || ''}
                                        onChange={e => setData_fim(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='admin-form-label' htmlFor={`local${local.length}`}>Localização</label>
                                {
                                    local && (local.map((value, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className={
                                                (index === (local.length - 1)) ? "admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block" :
                                                    "admin-form-control admin-mb-3"
                                            }
                                            id={`lacal${(index + 1)}`}
                                            name={`lacal${(index + 1)}`}
                                            placeholder="Informe uma localização"
                                            value={value}
                                            onChange={e => {
                                                localAux = local.map((value, i) => (index === i ? e.target.value : value))
                                                setLocal(localAux)
                                            }}
                                        />
                                    )))
                                }

                                <a onClick={(e) => {
                                    e.preventDefault()
                                    setLocal([...local, ''])
                                }}>
                                    <IoMdAddCircleOutline />
                                </a>
                            </div>
                            <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                                {btn}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default FormClient