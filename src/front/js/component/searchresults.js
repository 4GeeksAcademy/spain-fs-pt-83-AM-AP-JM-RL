import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/searchresults.css";

export const SearchResults = () => {
    const location = useLocation();
    const { store, actions } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginatedResults, setPaginatedResults] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filters, setFilters] = useState({
        priceRange: { min: "", max: "" },
        timeRange: { start: "", end: "" },
        dateRange: { start: "", end: "" },
    });

    const itemsPerPage = 9;
    const query = new URLSearchParams(location.search).get("query");
    const types = ["fiesta", "concierto", "cultural", "empresarial", "otros"];


    const reformatDate = (dateString) => {
        const [day, month, year] = dateString.split("-");
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        if (store.events.length === 0) {
            actions.getEvents();
        } else {
            let filtered = store.events;


            if (query && query.trim() !== "") {
                filtered = store.events.filter((event) =>
                    event?.title?.toLowerCase().includes(query.toLowerCase()) ||
                    event?.location?.toLowerCase().includes(query.toLowerCase()) ||
                    event?.description?.toLowerCase().includes(query.toLowerCase()) ||
                    event?.type?.toLowerCase().includes(query.toLowerCase())
                );
            }


            if (filters.priceRange.min) {
                filtered = filtered.filter(event =>
                    parseFloat(event.price) >= parseFloat(filters.priceRange.min)
                );
            }
            if (filters.priceRange.max) {
                filtered = filtered.filter(event =>
                    parseFloat(event.price) <= parseFloat(filters.priceRange.max)
                );
            }
            if (filters.timeRange.start && filters.timeRange.end) {
                filtered = filtered.filter(event =>
                    event.time >= filters.timeRange.start &&
                    event.time <= filters.timeRange.end
                );
            }
            if (filters.dateRange.start && filters.dateRange.end) {
                filtered = filtered.filter(event =>
                    new Date(event.date) >= new Date(filters.dateRange.start) &&
                    new Date(event.date) <= new Date(filters.dateRange.end)
                );
            }
            if (selectedType) {
                filtered = filtered.filter(event =>
                    event.type && event.type.toLowerCase() === selectedType.toLowerCase()
                );
            }

            if (sortOption === "most_recent") {

                filtered.sort((a, b) => new Date(reformatDate(b.created_at) - new Date(a.created_at)));
                console.log("Sorting by created_at:", store.events.map(event => event.created_at));
            } else if (sortOption === "upcoming") {

                filtered.sort((a, b) => new Date(reformatDate(a.date) - new Date(b.date)));
                console.log("Sorted Events by created_at:", filtered);
            } else if (sortOption === "price_asc") {
                filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            } else if (sortOption === "price_desc") {
                filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }
            console.log("Events after sorting:", filtered);
            setPaginatedResults(filtered);
            setCurrentPage(0);
        }
    }, [query, store.events, actions, filters, selectedType, sortOption]);
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };



    const handleTypeSelect = (type) => {
        console.log("Type selected:", type, "Previous selectedType:", selectedType);
        setSelectedType((prev) => {
            const newType = prev === type ? "" : type;
            actions.searchEvents({ type: newType, filters });
            return newType;
        });
    };


    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            priceRange: { ...prev.priceRange, [name]: value },
        }));
    };

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            timeRange: { ...prev.timeRange, [name]: value },
        }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            dateRange: { ...prev.dateRange, [name]: value },
        }));
    };

    const startIndex = currentPage * itemsPerPage;
    const currentItems = paginatedResults.slice(startIndex, startIndex + itemsPerPage);


    return (
        <section className="pt-5 pb-5 results-body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-3">
                        <div className="filter-by">
                            <h4>Filter By</h4>

                            <div className="filter-group">

                                <div className="row">
                                    <label>Sort By</label>
                                    <select className="form-control" value={sortOption} onChange={handleSortChange}>
                                        <option value="">Select</option>
                                        <option value="most_recent">Most Recent</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="price_asc">Price: Low to High</option>
                                        <option value="price_desc">Price: High to Low</option>
                                    </select>

                                </div>
                                <div className="row">
                                    <label>Price Range</label>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            name="min"
                                            value={filters.priceRange.min}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            name="max"
                                            value={filters.priceRange.max}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="filter-group">
                                <div className="row">
                                    <label>Time Range</label>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input
                                            type="time"
                                            name="start"
                                            value={filters.timeRange.start}
                                            onChange={handleTimeChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="time"
                                            name="end"
                                            value={filters.timeRange.end}
                                            onChange={handleTimeChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row filter-group">
                                <div className="row">
                                    <label>Date Range</label>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input
                                            type="date"
                                            name="start"
                                            value={filters.dateRange.start}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="date"
                                            name="end"
                                            value={filters.dateRange.end}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <label>Tipo</label>
                            </div>
                            <div className="filter-buttons">

                                {types.map((type) => (
                                    <button
                                        key={type}
                                        className={`type-button ${selectedType === type ? "active" : ""} ${type.toLowerCase()}`}
                                        onClick={() => handleTypeSelect(type)}
                                    >
                                        {type.charAt(0).toLowerCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>

                        </div>


                    </div>
                    <div className="col-lg-8">
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <h3 className="mb-3">
                                    {query ? `Search Results for "${query}"` : "All Events"}
                                </h3>
                            </div>

                            <div className="col-3 text-left justify-content-end">
                                <button
                                    className="arrow-left btn btn-primary mb-3 mr-1"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                                    disabled={currentPage === 0}
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                                <button
                                    className="arrow-right btn btn-primary mb-3"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            (prev + 1) * itemsPerPage < paginatedResults.length
                                                ? prev + 1
                                                : prev
                                        )
                                    }
                                    disabled={(currentPage + 1) * itemsPerPage >= paginatedResults.length}
                                >
                                    <i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            {currentItems.length > 0 ? (
                                currentItems.map((event) => (
                                    <div key={event.id} className="col-md-4 mb-3">
                                        <div className="search-card">
                                            <div className="date-time">
                                                {event.date && event.time
                                                    ? (() => {
                                                        const dateParts = event.date.split('-');
                                                        const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                                                        const formattedTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                                        return (
                                                            <>
                                                                <div>{dateObject.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</div>
                                                                <div>{formattedTime}</div>
                                                            </>
                                                        );
                                                    })()
                                                    : 'Invalid Date or Time'}
                                            </div>
                                            <img
                                                className="img-fluid"
                                                alt={event.title}
                                                src={
                                                    event.image ||
                                                    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                                                }
                                            />
                                            <div className="search-card-body">
                                                <h4 className="search-card-title">{event.title}</h4>
                                                <div className="d-flex justify-content-between">
                                                    <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
                                                        Details
                                                    </Link>
                                                    <i
                                                        onClick={() => {
                                                            const isFavorite = store.favorites.some((fav) => fav.event_id === event.id);
                                                            isFavorite ? actions.removeFavorite(event.id) : actions.addFavorite(event.id);
                                                        }}
                                                        className={`fa-${store.favorites.some((fav) => fav.event_id === event.id) ? "solid text-warning" : "regular"} fa-star`}
                                                        style={{ cursor: "pointer" }}
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <p>No results found for "{query}".</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};