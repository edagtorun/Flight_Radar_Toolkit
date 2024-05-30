import { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions";
import Modal from "./components/Modal";

const App = () => {
  //harita gorunumu aktif mi?
  const [isMapView, setisMapView] = useState(true);

  // detayi gosterilecek elemanin id'si
  const [detailId, setDetailId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());
  }, []);

  return (
    <div>
      <Header />

      <div className="view-buttons">
        <button
          className={isMapView ? "active" : ""}
          onClick={() => setisMapView(true)}
        >
          Map View
        </button>
        <button
          className={isMapView ? "" : "active"}
          onClick={() => setisMapView(false)}
        >
          List View
        </button>
      </div>

      {isMapView ? (
        <MapView setDetailId={setDetailId} />
      ) : (
        <ListView setDetailId={setDetailId} />
      )}

      {detailId && (
        <Modal detailId={detailId} close={() => setDetailId(null)} />
      )}
    </div>
  );
};

export default App;
