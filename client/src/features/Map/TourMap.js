import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./TourMap.css";
import { Icon } from "leaflet";

const KEY = process.env.REACT_APP_MAP_KEY_NEW;

const URL = `https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=${KEY}`;

function getMapData(tourLocations) {
  let mapData = [];

  tourLocations.forEach((location) => {
    mapData.push({
      place: location.description,
      coordinates: location.coordinates,
      day: location.day,
    });
  });

  return mapData;
}

const TourMap = ({ tourMap }) => {
  const mapData = getMapData(tourMap);

  const bounds = [];

  mapData.forEach((location) => {
    bounds.push([location.coordinates[1], location.coordinates[0]]);
  });

  const customIcon = new Icon({
    iconUrl: require("../../assets/marker.png"),
    iconSize: [36, 36],
  });

  return (
    <section className="map">
      <MapContainer
        bounds={bounds}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
      >
        <TileLayer
          url={URL}
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        ></TileLayer>
        {mapData.map((location) => (
          <Marker
            position={[location.coordinates[1], location.coordinates[0]]}
            icon={customIcon}
            key={location.coordinates[0]}
          >
            <Tooltip permanent opacity={1}>
              <span>
                <p className="popupText">{`Day ${location.day}: ${location.place}`}</p>
              </span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default TourMap;
