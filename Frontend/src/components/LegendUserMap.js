// src/Legend.js
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

function Legend() {
  const map = useMap();

  useEffect(() => {
    // Create a new Leaflet control for the legend
    const legend = new L.Control({ position: 'topright' });

    // This function is called when the control is added to the map
    legend.onAdd = function () {
      // Create a div element for the legend
      const div = L.DomUtil.create('div', 'info legend');
      
      const grades = [
        { color: '#d32f2f', label: 'High Risk' },
        { color: '#fbc02d', label: 'Moderate Risk' },
        { color: '#388e3c', label: 'Minor Risk' },
      ];

      let legendHtml = '<h4>Severity</h4>';
      // Loop through our severity grades and generate a label with a colored square for each
      for (let i = 0; i < grades.length; i++) {
        legendHtml += 
          '<i style="background:' + grades[i].color + '"></i> ' +
          grades[i].label + '<br>';
      }

      div.innerHTML = legendHtml;
      return div;
    };

    // Add the legend control to the map
    legend.addTo(map);

    // Cleanup function to remove the control when the component unmounts
    return () => {
      legend.remove();
    };
  }, [map]); // Rerun the effect if the map instance changes

  return null; // This component does not render anything itself
}

export default Legend;