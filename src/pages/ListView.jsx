import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useState } from "react";

const ListView = ({ setDetailId }) => {
  const { flights } = useSelector((store) => store.flight);

  //slice methodunda kullanilacak ilk elemanin state'i
  const [itemOffset, setItemOffset] = useState(0);
  //sayfa basina eleman sayisi
  const itemsPerPage = 10;
  //slice methodunda kullanilacak son elemanin state'i
  const endOffset = itemOffset + itemsPerPage;

  //mevcut sayfadaki elemanlari alma
  const currentItems = flights.slice(itemOffset, endOffset);

  //maksimum sayfa sayisi
  const pageCount = Math.ceil(flights.length / itemsPerPage);

  // yeni sayfaya tiklaninca state'i gunceller
  const handlePageClick = (event) => {
    //yeni sayfadaki ilk elemanin dizideki sirasini belirler.
    const newOffset = (event.selected * itemsPerPage) % flights.length;

    //state'i guncelle
    setItemOffset(newOffset);
  };
  return (
    <div className="p-4">
      <table className="table table-dark table-striped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Tail Number</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => setDetailId(flight.id)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        className="pagination justify-content-center my-5"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        activeClassName="active"
        pageLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        breakClassName="page-link"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ListView;
