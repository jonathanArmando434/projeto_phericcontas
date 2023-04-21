const CardIndicatorThree = ({ title, value}) => {
    return (
        <div className="admin-col-4 admin-card">
            <div className="admin-card-content admin-p-20">
                <div className="admin-card-body admin-p-0">
                    <div className="admin-row">
                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                            <h5 className="admin-card-title">{title}</h5>
                        </div>

                        <div className="admin-col-auto">

                        </div>
                    </div>
                    <span className="admin-h3 admin-mt-1 admin-mb-3">{value.qtd}</span>
                    <div className="admin-mb-0">
                        <span className="admin-text-success" style={{ display: 'hidden' }}> <i
                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                            {value.percent}% </span>
                        <span className="admin-text-muted">das tarefas</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardIndicatorThree