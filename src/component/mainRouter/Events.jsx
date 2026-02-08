import { useDispatch, useSelector } from "react-redux";
import EBox from "./eBox";
import "./RStyle/Events.css";
import "./RStyle/anim.css"
import { FaPlus } from "react-icons/fa";
import { selectProfile } from "../../Store/ProfileSlice";
import CreateEventForm from "./createEvent";
import { useEffect, useState } from "react";
import { fetchEvents } from "../../Store/eventSlice";


const Events = () => {
  const ProfileData = useSelector(selectProfile);
  const [closer, onClose] = useState(false);
  const dispatch = useDispatch();
  const { list, page, totalPages, loading, total } = useSelector((state) => state.events);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Debounced search effect with filter
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchEvents({ page: 1, lite: true, search: searchTerm, filter }));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filter, dispatch]);

  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Finished", value: "finished" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <div className="events">
      <div className="controls-container" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginBottom: "20px", zIndex: "10" }}>

        {/* Search Bar */}
        <div className="search-container" style={{ margin: 0 }}>
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`filter-btn ${filter === f.value ? "active" : ""}`}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                background: filter === f.value ? "#00eaff" : "rgba(255, 255, 255, 0.1)",
                color: filter === f.value ? "#000" : "#fff",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(5px)"
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {
        closer && <CreateEventForm onClose={onClose} />
      }
      {
        list.map((event, index) => {
          return (
            <EBox key={index} event={event} />
          )
        })
      }
      {ProfileData?.role === "admin" && (
        <div className="eBox new-event" onClick={() => onClose(true)}>
          <div className="anim"></div>
          <div className="plus-icon">
            <FaPlus />
          </div>
          <div className="new-event-text">Add New Event</div>
        </div>
      )}
    </div>
  );
};

export default Events;
