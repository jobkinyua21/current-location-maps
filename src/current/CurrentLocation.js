import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import './style.css';
import 'leaflet/dist/leaflet.css';
// import Routing1 from "../components/RoutingMachine1";

const defaultCenter = [  -1.29129,236.824672];
const defaultZoom = 16;


function CurrentLocation() {
   
   
  const mapRef = useRef();

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    // Commenting this out to avoid blocked location requests
    // when embedded on the Egghead lesson page. To give this
    // a try, simply uncomment out the function call below

    map.locate({
      setView: true,
    });
   
      

    map.on('locationfound', handleOnLocationFound);

    // Additional event handler for listening for
    // errors in finding someone's location

    map.on('locationerror', handleOnLocationError);

    return () => {
      map.off('locationfound', handleOnLocationFound);
      map.off('locationerror', handleOnLocationError);
    }
  }, []);

  /**
   * handleOnLocationFound
   * @param {object} event Leaflet LocationEvent object
   */

  function handleOnLocationFound(event) {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    const latlng = event.latlng;
    const radius = event.accuracy;
    const circle = L.circle(latlng, radius);

    circle.addTo(map);
  }

  /**
   * handleOnLocationError
   * @param {object} error Leaflet ErrorEvent object
   */

  function handleOnLocationError(error) {
    alert(`Unable to determine location: ${error.message}`);
  }
 
  return (
    <div className="App">
      <Map ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" /> */}
         <TileLayer  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
      </Map>
    </div>
  );
}

export default CurrentLocation;
