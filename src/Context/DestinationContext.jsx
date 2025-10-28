import { createContext, useContext, useEffect, useState } from "react";
import {
  categories,
  featuredDestinations,
  handpickedTrips,
} from "../data/mockData";

const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {
  // Destination states
  const [destinations, setDestinations] = useState([]);

  // Searched destinations
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  // Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // Category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState([]);

  // Initialize destination on mount
  useEffect(() => {
    const allDestinations = [...featuredDestinations, ...handpickedTrips];

    setDestinations(allDestinations);

    setFilteredDestinations(allDestinations);
  }, []);

  // Get all destinations
  const getAllDestinations = () => {
    return destinations;
  };

  // Get featured destinations only
  const getFeaturedDestinations = () => {
    return featuredDestinations;
  };

  // Get handpicked trips
  const getHandpickedTrips = () => {
    return handpickedTrips;
  };

  // Get destinations by id
  const getDestinationById = (id) => {
    return destinations.find((dest) => dest.id === parseInt(id));
  };

  // Filter destinations by category
  const getDestinationsByCategory = (category) => {
    // if(!category) return destinations
    if (!category) {
      return destinations;
    }

    return destinations.filter(
      (dest) =>
        dest.categories?.includes(category) || dest.category === category
    );
  };

  // Search Destinations
  const searchDestinations = (query) => {
    // if user did not supply any query to this function
    if (!query.trim()) {
      setFilteredDestinations(destinations);

      return destinations;
    }

    // make sure the query is lowercase
    const lowercaseQuery = query.toLowerCase();

    // the result of that query or search keyword
    const results = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(lowercaseQuery) ||
        dest.location.toLowerCase().includes(lowercaseQuery) ||
        dest.description.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredDestinations(results);

    return results;
  };

  // Filter destinations by price
  const getDestinationByPriceRange = (minPrice, maxPrice) => {
    return destinations.filter(
      (dest) => dest.price >= minPrice && dest.price <= maxPrice
    );
  };

  // Filter destination by rating
  const getDestinationByRating = (minRating) => {
    return destinations.filter((dest) => dest.rating >= minRating);
  };

  // get destinations by duration
  const getDestinationByDuration = (duration) => {
    return destinations.filter((dest) => dest.duration === duration);
  };

  // Advanced filter fucntion
  const filterDestinations = (filters) => {
    let results = destinations;

    if (filters.category) {
      results = results.filter(
        (dest) =>
          dest.categories?.includes(filters.category) ||
          dest.category === filters.category
      );
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      results = results.filter(
        (dest) =>
          dest.price >= filters.minPrice && dest.price <= filters.maxPrice
      );
    }

    if (filters.minRating) {
      results = results.filter((dest) => dest.rating >= filters.minRating);
    }

    if (filters.duration) {
      results = results.filter((dest) => dest.duration === filters.duration);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.location.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query)
      );
    }

    setFilteredDestinations(results);

    return results;
  };

  // Favorites adder
  const addToFavorites = (destinationId) => {
    setFavorites((prev) => {
      if (!prev.includes(destinationId)) {
        return [...prev, destinationId];
      }
      return prev;
    });
  };

  const removeFromFavorites = (destinationId) => {
    setFavorites((prev) => prev.filter((id) => id !== destinationId));
  };

  const isFavorite = (destinationId) => {
    return favorites.includes(destinationId);
  };

  const getFavoriteByDestinations = () => {
    return destinations.filter((dest) => favorites.includes(dest.id));
  };

  const value = {
    // Data
    categories,
    destinations,
    filteredDestinations,
    isLoading,
    selectedCategory,
    searchQuery,

    //setters
    setSearchQuery,
    setSelectedCategory,
    setIsLoading,

    // Core functions
    getAllDestinations,
    getFeaturedDestinations,
    getHandpickedTrips,
    getDestinationById,

    // Filter
    getDestinationsByCategory,
  };

  return (
    <DestinationContext.Provider value={value}>
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestination = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error(
      "useDestination must be used within a Destination Provider"
    );
  }
  return context;
};
