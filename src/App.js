/**
 * @fileoverview Main App component that sets up routing for the application.
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Alert } from "@mui/material";

import ErrorBoundary from "./components/common/ErrorBoundary";
import Layout from "./components/Layout";
import { DashboardView } from "./pages/DashboardView";
import NotFound from "./pages/NotFound";

/**
 * App component - Main application entry point with routing setup.
 *
 * @component
 * @returns {React.ReactElement} The root application component with routes
 */
function App() {
  return (
    <ErrorBoundary
      fallback={<Alert severity="error">Something went wrong.</Alert>}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardView />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
