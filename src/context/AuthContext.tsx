import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Detective, Case, detectives, cases } from '@/lib/data';

interface AuthState {
  isAuthenticated: boolean;
  detective: Detective | null;
  selectedCase: Case | null;
}

interface AuthContextType extends AuthState {
  login: (badgeNumber: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  selectCase: (caseId: string, accessCode: string) => { success: boolean; error?: string };
  exitCase: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    detective: null,
    selectedCase: null,
  });

  const login = (badgeNumber: string, password: string): { success: boolean; error?: string } => {
    const detective = detectives.find(
      d => d.badgeNumber === badgeNumber && d.password === password
    );

    if (detective) {
      setAuthState({
        isAuthenticated: true,
        detective,
        selectedCase: null,
      });
      return { success: true };
    }

    return { 
      success: false, 
      error: 'SECURITY ALERT: UNAUTHORIZED ACCESS RECORDED' 
    };
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      detective: null,
      selectedCase: null,
    });
  };

  const selectCase = (caseId: string, accessCode: string): { success: boolean; error?: string } => {
    const caseFile = cases.find(c => c.id === caseId);
    
    if (!caseFile) {
      return { success: false, error: 'Case file not found' };
    }

    if (caseFile.status === 'Closed') {
      return { success: false, error: 'RESTRICTED: Case File Sealed by Court Order' };
    }

    if (caseFile.accessCode !== accessCode) {
      return { success: false, error: 'ACCESS DENIED: Invalid Case Access Code' };
    }

    setAuthState(prev => ({
      ...prev,
      selectedCase: caseFile,
    }));

    return { success: true };
  };

  const exitCase = () => {
    setAuthState(prev => ({
      ...prev,
      selectedCase: null,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, selectCase, exitCase }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
