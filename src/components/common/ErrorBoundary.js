/**
 * @fileoverview Error boundary component for catching and displaying errors in the component tree.
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * Error Boundary component - Catches errors in child components and displays a fallback UI.
 *
 * @component
 * @extends React.Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with error handling
 * @param {React.ReactElement|Function} props.fallback - Fallback UI to display on error
 * @returns {React.ReactElement} Either the children or fallback UI
 *
 * @description
 * Implements React's Error Boundary pattern to catch JavaScript errors anywhere in the
 * child component tree, log those errors, and display a fallback UI instead of crashing.
 */
class ErrorBoundary extends React.Component {
  /**
   * Initialize error boundary state
   * @param {Object} props - Component props
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Update state so the next render will show the fallback UI
   * @static
   * @param {Error} error - The error that was thrown
   * @returns {Object} Updated state object
   */
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  /**
   * Log error details to console
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Additional error information
   */
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error("Error caught by boundary:", error, errorInfo);
  }

  /**
   * Render method
   * @returns {React.ReactElement} Fallback UI or children based on error state
   */
  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (React.isValidElement(fallback)) {
        return fallback;
      }
      return <h2>Something went wrongs.</h2>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

ErrorBoundary.defaultProps = {
  children: null,
  fallback: null,
};

export default ErrorBoundary;
