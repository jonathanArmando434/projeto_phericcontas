const TaskIndicator = ({ title, about, col }) => {
    return (
        <div className={`admin-col-${col} admin-card`}>
            <div className="admin-card-content admin-p-20">
                <div className="admin-card-body admin-p-0">
                    <div className="admin-row">
                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                            <h5 className="admin-card-title">{title}</h5>
                        </div>

                    </div>
                    <span className="admin-h3 admin-mt-1 admin-mb-3">{about.qnt || 0}</span>
                    <div className="admin-mb-0">
                        <span 
                            className={
                                ((about.percent && about.percent > 0)
                                    ? "admin-badge admin-status-success"
                                    : (about.percent && about.percent < 0)
                                        ? "admin-badge admin-status-danger"
                                        : 'admin-badge admin-status-info'
                                )}
                        > <i
                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                            {about.percent || 0}% </span>
                        <span className="admin-text-muted">{'desde o último ano'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskIndicator