import { useEffect, useState } from "react";
import { DetailOptions } from "../constants";
import axios from "axios";
import formatDate from "../utils/formatDate";
import { setPath } from "../redux/slices/flightSlice";
import { useDispatch } from "react-redux";
import c from "../utils/checkValid";

const Modal = ({ detailId, close }) => {
  const dispatch = useDispatch();

  const [d, setDetail] = useState(null);

  useEffect(() => {
    // onceki ucusun stateini sifirla
    setDetail(null);

    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        DetailOptions
      )
      .then((res) => {
        // state'i guncelle
        setDetail(res.data);
        //harita sayfasinda kullanabilmek icin ucus yolunu slice'a aktar
        dispatch(setPath(res.data.trail));
      })
      .catch((error) => console.error("Error fetching flight details:", error));
  }, [detailId]);

  console.log(d);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <div className="close-wrapper">
          <button onClick={close}>X</button>
        </div>

        {!d ? (
          <div className="loader-wrapper">
            <div className="loader">
              <span></span>
            </div>
          </div>
        ) : (
          <>
            <h2>{c(d.aircraft.model?.text)}</h2>
            <h2>{c(d.aircraft.model?.code)}</h2>

            <p>
              <span>Tail Number: </span>
              <span>{c(d.aircraft.registration)}</span>
            </p>

            {d.aircraft.images ? (
              <img
                src={
                  d.aircraft.images?.large
                    ? d.aircraft.images.large[0].src
                    : d.aircraft.images?.thumbnails[0]?.src
                }
                alt="Aircraft"
              />
            ) : (
              <p> "No Images"</p>
            )}

            <p>
              <span>Company: </span>
              <span>{c(d.airline?.short)}</span>
            </p>
            <p>
              <span>Departure: </span>
              <a target="_blank" href={d.airport?.origin?.website}>
                {c(d.airport?.origin?.name)}
              </a>
            </p>
            <p>
              <span>Arrival: </span>
              <a target="_blank" href={d.airport?.destination?.website}>
                {c(d.airport?.destination?.name)}
              </a>
            </p>
            <p>
              <span>Deparature Time </span>
              <span>
                {d.time.scheduled.departure > 0
                  ? formatDate(d.time.scheduled.departure)
                  : "Unknown"}{" "}
              </span>
            </p>
            <p>
              <span>Arrival Time </span>
              <span>
                {d.time.scheduled.arrival > 0
                  ? formatDate(d.time.scheduled.arrival)
                  : "Unknown"}{" "}
              </span>
            </p>
            <p className={d.status?.icon}>
              <span>{c(d.status.text)}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
