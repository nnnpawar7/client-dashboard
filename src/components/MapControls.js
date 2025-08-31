export const MapControls = ({resetMapView, fitAllMarkers})=>{
    return (
        <div 
              className="position-absolute bg-white p-2 m-3 rounded shadow-sm"
              style={{ bottom: 0, left: 0, zIndex: 1000 }}
            >
              <div className="btn-group-vertical" role="group">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={resetMapView}
                  title="Reset View"
                >
                  🏠
                </button>
                <button 
                  className="btn btn-outline-primary btn-sm mt-1"
                  onClick={fitAllMarkers}
                  title="Fit All Markers"
                >
                  🔍
                </button>
              </div>
            </div>
    )
}