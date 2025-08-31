import React, { useState, useEffect, useRef, useCallback } from 'react';
import {MapControls} from "./MapControls"
import {SelectedClientCard} from "./SelectedClientCard"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import {MapLegend} from "./MapLegend"
import { ClientList } from './ClientList';
import {clientList} from "../constants"
import L from 'leaflet';

const ClientDashboard = () => {
  const [clients] = useState(clientList);

  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
const addMarkersToMap = useCallback((mapInstance) => {
    // Clear existing markers first
    markers.forEach(({ marker }) => {
      mapInstance.removeLayer(marker);
    });

    const newMarkers = clients.map(client => {
      const color = client.status === 'Active' ? 'green' : 
                   client.status === 'Pending' ? 'orange' : 'red';
      
      const marker = L.circleMarker([client.lat, client.lng], {
        radius: 8,
        fillColor: color,
        color: 'white',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapInstance);

      marker.bindPopup(`
        <div>
          <h6>${client.name}</h6>
          <p><strong>Contact:</strong> ${client.contact}</p>
          <p><strong>Status:</strong> ${client.status}</p>
          <p><strong>Address:</strong> ${client.address}</p>
        </div>
      `);

      marker.on('click', () => {
        setSelectedClient(client);
        setActiveTab('details');
      });

      return { marker, client };
    });

    setMarkers(newMarkers);
  }, [clients, markers]);
  useEffect(() => {
  if (mapRef.current && !map) {
    // Destroy any existing map instance
    if (mapRef.current._leaflet_id) {
      mapRef.current._leaflet_id = null;
    }

    const newMap = L.map(mapRef.current).setView([0,0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(newMap);

    setMap(newMap);
    addMarkersToMap(newMap);
  }

  // Cleanup when component unmounts
  return () => {
    if (map) {
      map.remove();
    }
  };
}, [mapRef, map, addMarkersToMap]);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    if (map) {
      map.setView([client.lat, client.lng], 10);
      markers.forEach(({ marker, client: markerClient }) => {
        if (markerClient.id === client.id) {
          marker.openPopup();
        }
      });
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = status === 'Active' ? 'success' : 
                      status === 'Pending' ? 'warning' : status === 'Inactive' ? 'danger' : 'secondary';
    return `badge bg-${badgeClass}`;
  };

  const resetMapView = () => {
    if (map) {
      map.setView([0, 0], 2);
    }
  };

  const fitAllMarkers = () => {
    if (map && markers.length > 0) {
      const group = new L.featureGroup(markers.map(m => m.marker));
      map.fitBounds(group.getBounds().pad(0.1));
    }
  };

  return (
    <div className="container-fluid p-0" style={{ height: '100vh' }}>
      {/* Header */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            👥 Client Dashboard
          </span>
          <div className="d-flex">
            <span className="badge bg-light text-dark me-2">
              Total: {clients.length}
            </span>
            <span className="badge bg-success me-2">
              Active: {clients.filter(c => c.status === 'Active').length}
            </span>
          </div>
        </div>
      </nav>

      <div className="row g-0" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Sidebar */}
        <div className="col-md-4 bg-light border-end">
          <div className="p-3">
            {/* Tab Navigation */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                  onClick={() => setActiveTab('list')}
                >
                  📋 Client List
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  ℹ️ Details
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            {activeTab === 'list' && (
              <ClientList clients={filteredClients} onClientSelect={handleClientSelect} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredClients={filteredClients} selectedClient={selectedClient} handleClientSelect={handleClientSelect} getStatusBadge={getStatusBadge} />
            )}

            {activeTab === 'details' && (
              <div>
                {selectedClient ? (
                  <SelectedClientCard client={selectedClient} getStatusBadge={getStatusBadge} />
                ) : (
                  <div className="text-center text-muted p-4">
                    <div style={{ fontSize: '3rem' }}>🖱️</div>
                    <p>Select a client from the list to view details</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="col-md-8">
          <div className="h-100 position-relative">
            <div 
              ref={mapRef} 
              style={{ height: '100%', width: '100%' }}
            />
            
            {/* Map Legend */}
            <MapLegend />

            {/* Map Controls */}
            <MapControls resetMapView={resetMapView} fitAllMarkers={fitAllMarkers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;