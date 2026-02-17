/**
 * @fileoverview Main App component that sets up routing for the application.
 * Contains routes for the dashboard and tabbed views.
 */

import { Index } from "./pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TabsView from "./pages/TabsView";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/common/ErrorBoundary";

/**
 * App component - Main application entry point with routing setup.
 *
 * @component
 * @returns {React.ReactElement} The root application component with routes
 *
 * @description
 * Sets up the React Router with the following routes:
 * - "/" - Dashboard view (Index component)
 * - "/tabs" - Tabbed rewards view (TabsView component)
 * Both routes are wrapped in the Layout component for consistent UI
 */
function App() {
  return (
    <ErrorBoundary fallback={<h2>Something went wrong.</h2>}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/tabs" element={<TabsView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
