import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import CaseArchivePage from "./pages/CaseArchivePage";
import DashboardPage from "./pages/DashboardPage";
import SuspectsPage from "./pages/SuspectsPage";
import RegistryPage from "./pages/RegistryPage";
import EvidencePage from "./pages/EvidencePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route guard for authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Route guard for case selection
function CaseProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, selectedCase } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!selectedCase) {
    return <Navigate to="/archive" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, selectedCase } = useAuth();

  return (
    <Routes>
      {/* Redirect root based on auth state */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? selectedCase 
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/archive" replace />
            : <Navigate to="/login" replace />
        } 
      />
      
      {/* Login */}
      <Route 
        path="/login" 
        element={
          isAuthenticated 
            ? <Navigate to={selectedCase ? "/dashboard" : "/archive"} replace />
            : <LoginPage />
        } 
      />
      
      {/* Case Archive (requires login) */}
      <Route 
        path="/archive" 
        element={
          <ProtectedRoute>
            {selectedCase ? <Navigate to="/dashboard" replace /> : <CaseArchivePage />}
          </ProtectedRoute>
        } 
      />
      
      {/* Dashboard (requires login + case) */}
      <Route 
        path="/dashboard" 
        element={
          <CaseProtectedRoute>
            <DashboardPage />
          </CaseProtectedRoute>
        } 
      />
      
      {/* Suspects (requires login + case) */}
      <Route 
        path="/suspects" 
        element={
          <CaseProtectedRoute>
            <SuspectsPage />
          </CaseProtectedRoute>
        } 
      />
      
      {/* Registry (requires login + case) */}
      <Route 
        path="/registry" 
        element={
          <CaseProtectedRoute>
            <RegistryPage />
          </CaseProtectedRoute>
        } 
      />
      
      {/* Evidence (requires login + case) */}
      <Route 
        path="/evidence" 
        element={
          <CaseProtectedRoute>
            <EvidencePage />
          </CaseProtectedRoute>
        } 
      />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
