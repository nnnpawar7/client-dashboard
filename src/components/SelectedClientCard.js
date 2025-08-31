export const SelectedClientCard = ({ client: selectedClient, getStatusBadge }) => {
    return (
        <div className="card">
                            <div className="card-header">
                              <h5 className="card-title mb-0">{selectedClient.name}</h5>
                            </div>
                            <div className="card-body">
                              <div className="mb-3">
                                <label className="form-label fw-bold">Contact Person</label>
                                <p className="mb-0">{selectedClient.contact}</p>
                              </div>
                              <div className="mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <p className="mb-0">
                                  <a href={`mailto:${selectedClient.email}`}>
                                    {selectedClient.email}
                                  </a>
                                </p>
                              </div>
                              <div className="mb-3">
                                <label className="form-label fw-bold">Phone</label>
                                <p className="mb-0">
                                  <a href={`tel:${selectedClient.phone}`}>
                                    {selectedClient.phone}
                                  </a>
                                </p>
                              </div>
                              <div className="mb-3">
                                <label className="form-label fw-bold">Address</label>
                                <p className="mb-0">{selectedClient.address}</p>
                              </div>
                              <div className="mb-3">
                                <label className="form-label fw-bold">Status</label>
                                <div>
                                  <span className={getStatusBadge(selectedClient.status)}>
                                    {selectedClient.status}
                                  </span>
                                </div>
                              </div>
                              <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-sm">
                                  ✏️ Edit Client
                                </button>
                                <button className="btn btn-outline-primary btn-sm">
                                  📧 Send Email
                                </button>
                              </div>
                            </div>
                          </div>
    )
}