import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { setPath } from "../redux/slices/flightSlice";

const MapView = ({ setDetailId }) => {
  const { flights, path } = useSelector((store) => store.flight);

  const dispatch = useDispatch();
  //marker iicn kendi iconumuzu olusturalim

  const planeIcon = icon({
    iconUrl: "plane-icon.png",
    iconSize: [30, 30],
  });
  return (
    <MapContainer
      center={[38.564829, 35.284074]}
      zoom={7}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {flights.map((flight) => (
        <Marker
          key={flight.id}
          icon={planeIcon}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="d-flex flex-column gap-2">
              <span>Code: {flight.code}</span>
              <button onClick={() => setDetailId(flight.id)} className="w-100">
                Detail
              </button>

              {path.length > 0 && (
                <button onClick={() => dispatch(setPath([]))}>
                  Clear Route
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      <Polyline positions={path} />
    </MapContainer>
  );
};

export default MapView;