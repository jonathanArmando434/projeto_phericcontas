import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import { useState, useEffect } from 'react'
import api from '../../axios/api'

import PageTitle from '../../components/admin/PageTitle'

const Financas = () => {
    const [desc, setDesc] = useState('')
    const [valor, setValor] = useState('')
    const [tipo, setTipo] = useState('Entrada')
    const [dados, setDados] = useState([])
    const [message, setMessage] = useState('')
    const [allRight, setAllRight] = useState(false)

    const handleDelete = async (id, index) => {
        const res = await api.delete(`/financas/${id}`)
        const msg = res.data.message
        if (msg === 'Dado de finança removido com sucesso!') {
            const aux = [...dados]
            aux.splice(index, 1)
            setDados(aux)
            alert('Dado de finança removido com sucesso!')
        }
        else alert('Houve um erro no servidor, tente novamente!')
    }

    const verifyDatas = async (dados) => {
        const { desc, valor, tipo } = dados

        if (!desc) {
            setMessage('Preencha o campo da descrição')
            return false
        }

        if (!valor) {
            setMessage('Preencha o campo do valor')
            return false
        }

        if (!tipo) {
            setMessage('Seleciona um tipo')
            return false
        }

        return true
    }

    const cleanDatas = () => {
        setDesc('')
        setValor('')
        setTipo('Entrada')
    }

    const handleSubmit = async e => {
        e.preventDefault()

        setMessage('')
        setAllRight(false)

        const dado = {
            desc,
            valor,
            tipo
        }

        const canPost = await verifyDatas(dado)

        if (canPost) {
            const res = await api.post('/financas', dado)
            const msg = res.data.message

            if (msg === 'Dado de Finança inserido no sistema com sucesso!') {
                setMessage(msg)
                setAllRight(true)
                getDados()
                cleanDatas()
            }
        }
    }

    const getDados = async () => {
        const res = await api.get('/financas')
        const data = res.data
        setDados(data)
        console.log(data)
    }

    useEffect(() => {
        getDados()
    }, [])

    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={'Controle de Finanças'} btnText={'Filtrar'} BtnIcon={MdOutlineFilterList} />

                    <div className="admin-row">
                        <div className="admin-col-4 admin-card">
                            <div className="admin-card-content admin-p-20">
                                <div className="admin-card-body admin-p-0">
                                    <div className="admin-row">
                                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                                            <h5 className="admin-card-title">Entrada: KZ</h5>
                                        </div>

                                        <div className="admin-col-auto">

                                        </div>
                                    </div>
                                    <span className="admin-h3 admin-mt-1 admin-mb-3">1.000.000,00</span>
                                    <div className="admin-mb-0">
                                        <span className="admin-text-success"> <i
                                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                            +3.65% </span>
                                        <span className="admin-text-muted">Desde a última semana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-col-4 admin-card">
                            <div className="admin-card-content admin-p-20">
                                <div className="admin-card-body admin-p-0">
                                    <div className="admin-row">
                                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                                            <h5 className="admin-card-title">Saída: KZ</h5>
                                        </div>

                                        <div className="admin-col-auto">

                                        </div>
                                    </div>
                                    <span className="admin-h3 admin-mt-1 admin-mb-3">600.000,00</span>
                                    <div className="admin-mb-0">
                                        <span className="admin-text-danger"> <i
                                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                            -3.65% </span>
                                        <span className="admin-text-muted">Desde a última semana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-col-4 admin-card">
                            <div className="admin-card-content admin-p-20">
                                <div className="admin-card-body admin-p-0">
                                    <div className="admin-row">
                                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                                            <h5 className="admin-card-title">Total: KZ</h5>
                                        </div>

                                        <div className="admin-col-auto">

                                        </div>
                                    </div>
                                    <span className="admin-h3 admin-mt-1 admin-mb-3">400.000,00</span>
                                    <div className="admin-mb-0">
                                        <span className="admin-text-danger"> <i
                                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                            -3.65% </span>
                                        <span className="admin-text-muted">Desde a última semana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-col-12">
                            <div className="admin-col-12 admin-d-flex">
                                <div className="admin-card admin-flex-fill admin-bg-fff" style={{ padding: '2.2rem' }}>
                                    <form onSubmit={handleSubmit}>
                                        {
                                            message && <div className={(allRight ? 'admin-msg-success' : 'admin-msg-danger')}>
                                                {message}
                                            </div>
                                        }
                                        <div className="admin-d-flex admin-justify-content-between">
                                            <div style={{ width: '30%' }}>
                                                <label className='admin-form-label admin-d-block' htmlFor="startContract">
                                                    Descrição
                                                </label>
                                                <input
                                                    type="text"
                                                    className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                                                    id="startContract"
                                                    name="startContract"
                                                    placeholder='Descrição'
                                                    value={desc}
                                                    onChange={e => setDesc(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ width: '30%' }}>
                                                <label className='admin-form-label admin-d-block' htmlFor="endContract">
                                                    Valor
                                                </label>
                                                <input
                                                    type="text"
                                                    className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                                                    id="endContract"
                                                    name="endContract"
                                                    placeholder='Valor'
                                                    value={valor}
                                                    onChange={e => setValor(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ width: '19%' }}>
                                                <label className='admin-form-label admin-d-block' htmlFor="endContract">
                                                    Tipo
                                                </label>
                                                <select id="salario" className="admin-form-select admin-mb-3" value={tipo} onChange={e => setTipo(e.target.value)}>
                                                    <option value="Entrada">Entrada</option>
                                                    <option value="Saída">Saída</option>
                                                </select>
                                            </div>
                                            <div style={{ width: '19%', marginTop: '3.4%' }}>
                                                <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                                                    Adicionar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="admin-col-12 admin-d-flex">
                                <div className="admin-card admin-flex-fill admin-bg-fff">
                                    <table className="admin-table admin-table-hover admin-my-0">
                                        <thead>
                                            <tr>
                                                <th className="admin-d-none admin-d-xl-table-cell" style={{ paddingLeft: '1.2rem' }}>Descrição</th>
                                                <th className="admin-d-none admin-d-xl-table-cell" style={{ paddingLeft: 0 }}>Data</th>
                                                <th className="admin-d-none admin-d-xl-table-cell" style={{ paddingLeft: 0 }}>Valor</th>
                                                <th className="admin-d-none admin-d-xl-table-cell" style={{ paddingLeft: 0 }}>
                                                    Tipo
                                                </th>
                                                <th className="admin-d-none admin-d-md-table-cell" style={{ paddingLeft: 0 }}>
                                                    Eliminar
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dados && dados.map((dado, index) => (
                                                    <tr key={dado._id}>
                                                        <td style={{ paddingLeft: '1.2rem' }}>{dado.desc || 'Salário'}</td>
                                                        <td className="admin-d-none admin-d-xl-table-cell">{new Date(dado.criado_em).toLocaleDateString().split('T')[0] || '300.00,00 kz'}</td>
                                                        <td className="admin-d-none admin-d-xl-table-cell">{dado.valor || '300.00,00 kz'}</td>
                                                        <td>
                                                            <span className={
                                                                (dado.tipo === 'Entrada'
                                                                    ? "admin-badge admin-status-success"
                                                                    : "admin-badge admin-status-danger"
                                                                )}>{dado.tipo || 'Saída'}</span>
                                                        </td>
                                                        <td className="admin-d-none admin-d-md-table-cell" >
                                                            <a onClick={() => handleDelete(dado._id, index)} className="admin-tab-cancel">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-x-square admin-align-middle"
                                                                >
                                                                    <rect
                                                                        x={3}
                                                                        y={3}
                                                                        width={18}
                                                                        height={18}
                                                                        rx={2}
                                                                        ry={2}
                                                                    />
                                                                    <line x1={9} y1={9} x2={15} y2={15} />
                                                                    <line x1={15} y1={9} x2={9} y2={15} />
                                                                </svg>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Financas