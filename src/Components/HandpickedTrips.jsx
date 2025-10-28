import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDestination } from "../Context/DestinationContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

const HandpickedTrips = () => {
  const navigate = useNavigate();
  const { getHandpickedTrips, categories } = useDestination();

  // We have the handpicked data from the context
  const handpickedTrips = getHandpickedTrips();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const tripsPerPage = 8;

  // Calculate where the current page ends
  // If we're on page 1 with 8 trips per page: 1 × 8 = 8 (ends at position 8)
  // If we're on page 2 with 8 trips per page: 2 × 8 = 16 (ends at position 16)
  const indexOfLastTrip = currentPage * tripsPerPage;

  // Calculate where the current page starts
  // If we're on page 1: 8 - 8 = 0 (starts at position 0)
  // If we're on page 2: 16 - 8 = 8 (starts at position 8)
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;

  // Get only the trips that belong on the current page
  // slice() cuts out a piece of the array from start position to end position
  // For page 1: get items from position 0 to 8 (first 8 trips)
  // For page 2: get items from position 8 to 16 (next 8 trips)
  const currentTrips = handpickedTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  // Calculate how many pages we need in total
  // If we have 25 trips and show 8 per page: 25 ÷ 8 = 3.125
  // Math.ceil() rounds up, so 3.125 becomes 4 pages (we need 4 pages to show all 25 trips)
  const totalPages = Math.ceil(handpickedTrips.length / tripsPerPage);

  const handleCardClick = (tripId) => {
    navigate(`/destination/${tripId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render categories
  const renderCategoryTags = (tripCategories) => {
    if (!tripCategories || tripCategories.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {tripCategories.map((category, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              categories[category]?.color || "bg-gray-100 text-gray-800"
            }`}
          >
            {category}
          </span>
        ))}
      </div>
    );
  };

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between gap-4 mt-12">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <FaChevronLeft className="w-4 h-4" /> <span>Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-10 h-10 rounded-lg transition-all ${
                currentPage === number
                  ? "bg-[#256FF1] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:text-[#256FF1]"
          }`}
        >
          <span>Next</span>
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <section className="py-20 px-32 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="font-bold text-4xl leading-8 mb-3">
            Handpicked Trips
          </h2>
          <p className="text-lg leading-6 text-[#7F7E83]">
            Browse well-planned trips designed for different travel styles and
            interests{" "}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {currentTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleCardClick(trip.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                  <span className="text-sm font-bold text-gray-900">
                    $ {trip.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-500 transition-colors">
                  {trip.name}
                </h3>

                <div className="flex items-center gap-2 text-gray-600 mb-3 mt-5">
                  <FaMapMarkerAlt className="w-4 h-4" />{" "}
                  <span>{trip.location}</span>
                </div>

                {/* categories */}
                {renderCategoryTags(trip.categories)}
              </div>
            </div>
          ))}
        </div>

        {renderPagination()}
      </div>
    </section>
  );
};

export default HandpickedTrips;
