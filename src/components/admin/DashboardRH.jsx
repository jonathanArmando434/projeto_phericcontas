import ChartPieAgeGroup from './ChartPieAgeGroup'
import ChartColumnTurnover from './ChartColumnTurnover'
import ChartColumnAddRemove from './ChartColumnaddRemove'
import ChartColumnCompanyTime from './ChartColumnCompanyTime'
import ChartBarEscolaridade from './ChartBarEscolaridade'

const DashboardRH = () => {
    return (

        <div className="admin-row">
            <div className="admin-col-4 admin-card">
                <div className="admin-card-content admin-p-20">
                    <div className="admin-card-body admin-p-0">
                        <div className="admin-row">
                            <div className={`admin-col admin-p-0 admin-mt-0`}>
                                <h5 className="admin-card-title">Total ativo</h5>
                            </div>

                            <div className="admin-col-auto">

                            </div>
                        </div>
                        <span className="admin-h3 admin-mt-1 admin-mb-3">537</span>
                        <div className="admin-mb-0">
                            <span className="admin-text-success" style={{ display: 'hidden' }}> <i
                                className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                100% </span>
                            <span className="admin-text-muted">dos colaboradores</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin-col-4 admin-card">
                <div className="admin-card-content admin-p-20">
                    <div className="admin-card-body admin-p-0">
                        <div className="admin-row">
                            <div className={`admin-col admin-p-0 admin-mt-0`}>
                                <h5 className="admin-card-title">Masculino</h5>
                            </div>

                            <div className="admin-col-auto">

                            </div>
                        </div>
                        <span className="admin-h3 admin-mt-1 admin-mb-3">456</span>
                        <div className="admin-mb-0">
                            <span className="admin-text-danger"> <i
                                className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                45% </span>
                            <span className="admin-text-muted">dos colaboradores</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin-col-4 admin-card">
                <div className="admin-card-content admin-p-20">
                    <div className="admin-card-body admin-p-0">
                        <div className="admin-row">
                            <div className={`admin-col admin-p-0 admin-mt-0`}>
                                <h5 className="admin-card-title">Feminino</h5>
                            </div>

                            <div className="admin-col-auto">

                            </div>
                        </div>
                        <span className="admin-h3 admin-mt-1 admin-mb-3">436</span>
                        <div className="admin-mb-0">
                            <span className="admin-text-danger"> <i
                                className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                55% </span>
                            <span className="admin-text-muted">dos colaboradores</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-col-12">
                <div className="admin-row">
                    <div className="admin-col-5 admin-card admin-flex-fill" style={{ padding: 'auto' }}>
                        <div className="admin-card-content admin-chart">
                            <ChartPieAgeGroup />
                        </div>
                    </div>

                    <div className="admin-col-7 admin-card admin-flex-fill">
                        <div className="admin-card-content admin-chart">
                            <div className="admin-row" style={{ height: '50%' }}>
                                <div className="admin-col-2 admin-d-flex" style={{ flexDirection: 'column' }}>
                                    <div style={{ width: '100%' }}>
                                        <label className='admin-form-label admin-d-block' htmlFor="startContract">
                                            Ano
                                        </label>
                                        <input
                                            type="text"
                                            className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                                            id="startContract"
                                            name="startContract"
                                            placeholder='Ano'
                                        />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <label className='admin-form-label admin-d-block'>
                                            Turnover
                                        </label>
                                        <div style={{
                                            paddingTop: '.48rem',
                                            paddingBottom: '.48rem',
                                            paddingLeft: '1.36rem',
                                            paddingRight: '1.36rem',
                                            border: '0.1rem solid #ced4da',
                                            borderRadius: '.5rem'
                                        }}>
                                            12,5%
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-col-10">
                                    <ChartColumnTurnover />
                                </div>
                            </div>
                            <div className="admin-row" style={{ height: '48%', marginTop: '2%' }}>
                                <ChartColumnAddRemove />
                            </div>
                        </div>
                    </div>

                    <div className="admin-col-12">
                        <div className="admin-row">
                            <div className="admin-col-7 admin-card admin-flex-fill" style={{ padding: 'auto' }}>
                                <div style={{height: '25rem', padding: '1rem'}} className="admin-card-content">
                                    <ChartBarEscolaridade />
                                </div>
                            </div>

                            <div className="admin-col-5 admin-card admin-flex-fill">
                                <div style={{height: '25rem', padding: '1rem'}} className="admin-card-content">
                                    <ChartColumnCompanyTime />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardRH