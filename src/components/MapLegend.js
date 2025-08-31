export const MapLegend = () => {
    return (
        <div 
              className="position-absolute bg-white p-3 m-3 rounded shadow-sm"
              style={{ top: 0, right: 0, zIndex: 1000 }}
            >
              <h6 className="mb-2">Client Status</h6>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle me-2" 
                    style={{ width: 12, height: 12, backgroundColor: 'green' }}
                  />
                  <small>Active</small>
                </div>
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle me-2" 
                    style={{ width: 12, height: 12, backgroundColor: 'orange' }}
                  />
                  <small>Pending</small>
                </div>
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle me-2" 
                    style={{ width: 12, height: 12, backgroundColor: 'red' }}
                  />
                  <small>Inactive</small>
                </div>
              </div>
            </div>
    )
}