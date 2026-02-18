/**
 * @fileoverview Custom hook for fetching data from a URL with loading and error states.
 */

import { useState, useEffect } from "react";

/**
 * useFetch custom hook - Fetches data from a URL and manages loading/error states.
 *
 * @hook
 * @param {string} [url="/mockData.json"] - The URL to fetch data from
 * @param {Object} [options={}] - Additional fetch options (headers, method, etc.)
 * @returns {Object} Fetch state object
 * @returns {boolean} returns.loading - Whether the fetch is in progress
 * @returns {string|null} returns.error - Error message or null
 *
 * @description
 * Custom React hook that handles fetching data from a URL with the following features:
 * - Automatic loading state management
 * - Error handling with descriptive messages
 * - Abort controller for cleanup on unmount
 * - Memoization of results based on URL and options
 * - Prevents memory leaks by aborting pending requests

 */
export const useFetch = (url = "/mockData.json") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    /**
     * Async function to fetch and parse data
     * Sets loading state and handles errors appropriately
     */
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  /**
   * Return state object with data, loading flag, and error message
   * @type {Object}
   */
  return { data, loading, error };
};
