import { useState } from "react";
export const ClientList = ({ filteredClients, selectedClient, handleClientSelect, getStatusBadge }) => {
      const [searchTerm, setSearchTerm] = useState('');
    return (
        <div style={{overflowY: 'scroll', maxHeight: '81vh'}}>
                        <div className="mb-3">
                          <input 
                            type="search" 
                            className="form-control" 
                            placeholder="Search clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        
                        <div className="list-group">
                          {filteredClients.map(client => (
                            <div 
                              key={client.id}
                              className={`list-group-item list-group-item-action ${
                                selectedClient?.id === client.id ? 'active' : ''
                              }`}
                              onClick={() => handleClientSelect(client)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1">{client.name}</h6>
                                <span className={getStatusBadge(client.status)}>
                                  {client.status}
                                </span>
                              </div>
                              <p className="mb-1 text-muted">{client.contact}</p>
                              <small className="text-muted">{client.address}</small>
                            </div>
                          ))}
                        </div>
                      </div>
    )
}