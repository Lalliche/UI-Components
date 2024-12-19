"use client";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Pagination from "@/components/Pagination";
import Row from "./Row";
import Spinner from "@/components/Spinner";
import "react-circular-progressbar/dist/styles.css";
import { Filter } from "./Filter";

const headers = [
  { id: 0, name: "Recruteur", width: "w-[25%]", field: "hunter.first_name" },
  {
    id: 1,
    name: "Secteur d'activité",
    width: "w-[20%]",
    field: "hunter.personal_profile.activity_field.name",
  },
  { id: 2, name: "Date de demande ", width: "w-[20%]", field: "apply_date" },
  { id: 3, name: "Statut", width: "w-[12.5%]", field: "status" },
  { id: 4, name: "Actions", width: "w-[22.5%]" },
];

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((value, key) => value?.[key], obj) || "";
};
const TableCol = ({
  id,
  name,
  field,
  width,
  isClicked,
  handleClick,
  sortDirection,
}) => {
  let arrowClass =
    "transform transition-transform duration-300 text-[0.6em] font-extrabold text-[#667085]";

  if (isClicked) {
    arrowClass += sortDirection === "asc" ? " -rotate-90" : " rotate-90";
  }

  return (
    <div
      className={`flex flex-row items-center justify-start gap-[1em] cursor-pointer ${width}`}
      onClick={() => handleClick(id, field)}
    >
      <p className="text-[0.8em] font-bold text-[#8A92A6]">{name}</p>
      {field ? <FaArrowRight className={arrowClass} /> : null}
    </div>
  );
};

const DataTable = ({ offerId }) => {
  const [statusType, setStatusType] = useState("");
  const [clickedId, setClickedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortingApplied, setIsSortingApplied] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [refuseModal, setRefuseModal] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [error, setError] = useState("");
  const [rowData, setRowData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const rowsPerPage = 5;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleClick = (id, field) => {
    if (clickedId === id) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
      setClickedId(id);
    }
    setIsSortingApplied(true);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  let sortedData = [];
  if (rowData.length > 0) {
    sortedData = [...rowData].sort((a, b) => {
      if (!sortField) return 0;

      const aValue = getNestedValue(a, sortField);

      const bValue = getNestedValue(b, sortField);

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }

  const filteredData = sortedData.filter((item) => {
    if (!debouncedSearchTerm) return true;
    const term = debouncedSearchTerm.toLowerCase();
    return (
      item?.hunter?.first_name?.toLowerCase().includes(term) ||
      item?.hunter?.last_name?.toLowerCase().includes(term) ||
      item?.hunter?.email?.toLowerCase().includes(term) ||
      item?.hunter?.personal_profile?.activity_field?.name
        ?.toLowerCase()
        .includes(term)
      //item.Category.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    if (!refuseModal && selectedUser) {
      setModalOpen(true);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedUser]);

  return (
    <div className="flex flex-col gap-[1.5em] py-[2em] ">
      <div className="w-full flex flex-row items-center justify-start gap-[1em] ">
        <div className="border border-[#2D60FF] rounded-xl flex flex-row justify-center items-center text-[#667085]  px-[0.75em] py-[0.5em] gap-2 bg-white xl:w-[35%] lg:w-[40%]  md:w-[45%] xs:w-[55%] w-[60%]        ">
          <FiSearch className="text-[1.2em]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input bg-transparent placeholder-[#667085]"
            placeholder="Rechercher "
          />
        </div>
        {(searchTerm || isSortingApplied) && (
          <button
            onClick={() => {
              setClickedId(null);
              setSortField(null);
              setSortDirection("asc");
              setIsSortingApplied(false);
              setSearchTerm("");
              setDebouncedSearchTerm("");
              setCurrentPage(1);
            }}
            className="px-[14px] py-2 bg-red-500 text-white rounded-xl text-[1em] "
          >
            Réinitialiser
          </button>
        )}
      </div>

      <Filter Status={setStatusType} />
      <div className="bg-white rounded-2xl center flex-col   w-full">
        <div
          className="flex flex-row items-center gap-[0.5em] bg-[#F9FAFB] w-full border rounded-tr-2xl rounded-tl-2xl border[#EAECF0]  px-[1em] py-[1em]  "
          style={{ borderBottom: "2px solid #EAECF0" }}
        >
          {headers.map((header) => (
            <TableCol
              key={header.id}
              id={header.id}
              name={header.name}
              field={header.field}
              width={header.width}
              isClicked={clickedId === header.id}
              sortDirection={sortDirection}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="w-full flex items-center flex-col min-h-[18em] relative">
          {tableLoading ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                <Spinner />
              </div>
            </div>
          ) : paginatedData.length === 0 ? (
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 font-bold">
              Aucune donnée disponible
            </p>
          ) : (
            paginatedData.map((row, index) => (
              <Row key={index} data={row} setUser={setSelectedUser} />
            ))
          )}
        </div>

        <div
          className="center w-full px-[1em] "
          style={{ borderTop: "2px solid rgba(0, 0, 0, 0.1)" }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
