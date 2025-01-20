import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const SearchResults = () => {
    const location = useLocation();
    const { store, actions } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginatedResults, setPaginatedResults] = useState([]);
    const [filters, setFilters] = useState({
        priceRange: { min: "", max: "" },
        timeRange: { start: "", end: "" },
        dateRange: { start: "", end: "" },
    });

    const itemsPerPage = 9;
    const query = new URLSearchParams(location.search).get("query");

    // Apply the filters whenever they or the events change
    useEffect(() => {
        if (query) {
            if (!store.events.length) {
                actions.getEvents();
            } else {
                let filtered = store.events.filter((event) =>
                    event?.title?.toLowerCase().includes(query.toLowerCase())
                );

                // Apply price filter
                if (filters.priceRange.min) {
                    filtered = filtered.filter(
                        (event) =>
                            parseFloat(event.price) >= parseFloat(filters.priceRange.min)
                    );
                }
                if (filters.priceRange.max) {
                    filtered = filtered.filter(
                        (event) =>
                            parseFloat(event.price) <= parseFloat(filters.priceRange.max)
                    );
                }

                // Apply time filter
                if (filters.timeRange.start && filters.timeRange.end) {
                    filtered = filtered.filter(
                        (event) =>
                            event.time >= filters.timeRange.start &&
                            event.time <= filters.timeRange.end
                    );
                }

                // Apply date filter
                if (filters.dateRange.start && filters.dateRange.end) {
                    filtered = filtered.filter(
                        (event) =>
                            new Date(event.date) >= new Date(filters.dateRange.start) &&
                            new Date(event.date) <= new Date(filters.dateRange.end)
                    );
                }

                setPaginatedResults(filtered);
                setCurrentPage(0); // Reset to the first page after filtering
            }
        }
    }, [query, store.events, actions, filters]);

    const startIndex = currentPage * itemsPerPage;
    const currentItems = paginatedResults.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if ((currentPage + 1) * itemsPerPage < paginatedResults.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Filter Change Handlers
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

    return (
        <section className="pt-5 pb-5">
            <div className="container">
                <div className="row">
                    {/* Filters Section */}
                    <div className="col-lg-4 mb-3">
                        <div className="filter-by">
                            <h4>Filter By</h4>

                            {/* Price Filter */}
                            <div className="filter-group">
                                <label>Price Range</label>
                                <input
                                    type="number"
                                    placeholder="Min"
                                    name="min"
                                    value={filters.priceRange.min}
                                    onChange={handlePriceChange}
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    name="max"
                                    value={filters.priceRange.max}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            {/* Time Filter */}
                            <div className="filter-group">
                                <label>Time Range</label>
                                <input
                                    type="time"
                                    name="start"
                                    value={filters.timeRange.start}
                                    onChange={handleTimeChange}
                                />
                                <input
                                    type="time"
                                    name="end"
                                    value={filters.timeRange.end}
                                    onChange={handleTimeChange}
                                />
                            </div>

                            {/* Date Filter */}
                            <div className="filter-group">
                                <label>Date Range</label>
                                <input
                                    type="date"
                                    name="start"
                                    value={filters.dateRange.start}
                                    onChange={handleDateChange}
                                />
                                <input
                                    type="date"
                                    name="end"
                                    value={filters.dateRange.end}
                                    onChange={handleDateChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="col-lg-8">
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <h3 className="mb-3">Search Results for "{query}"</h3>
                            </div>
                            <div className="col-6 text-right">
                                <button
                                    className="btn btn-primary mb-3 mr-1"
                                    onClick={handlePrevious}
                                    disabled={currentPage === 0}
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                                <button
                                    className="btn btn-primary mb-3"
                                    onClick={handleNext}
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
                                        <div className="card">
                                            <img
                                                className="img-fluid"
                                                alt={event.title}
                                                src={
                                                    event.image ||
                                                    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                                                }
                                            />
                                            <div className="card-body">
                                                <h4 className="card-title">{event.title}</h4>
                                                <p>
                                                    On the {event.date} at {event.time}
                                                </p>
                                            </div>
                                            <Link to={`/events/${event.id}`} className="btn btn-primary">
                                                Details
                                            </Link>
                                            {store.favorites.some((fav) => fav.id === event.id) ? (
                                                <i
                                                    onClick={() => actions.removeFavorite(event.id)}
                                                    className="fa-solid fa-star text-warning"
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                            ) : (
                                                <i
                                                    onClick={() => actions.addFavorite({ id: event.id })}
                                                    className="fa-regular fa-star"
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                            )}
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
