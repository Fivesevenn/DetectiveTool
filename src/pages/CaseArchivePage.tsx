import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { cases } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FolderLock, FolderOpen, LogOut, AlertTriangle, Key } from 'lucide-react';

export default function CaseArchivePage() {
  const { detective, logout, selectCase } = useAuth();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showRestricted, setShowRestricted] = useState(false);

  const handleCaseClick = (caseId: string) => {
    const caseFile = cases.find(c => c.id === caseId);
    if (caseFile?.status === 'Closed') {
      setShowRestricted(true);
      return;
    }
    setSelectedCaseId(caseId);
    setAccessCode('');
    setError(null);
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseId) return;

    const result = selectCase(selectedCaseId, accessCode.toUpperCase());
    if (!result.success) {
      setError(result.error || 'Access Denied');
    }
  };

  return (
    <div className="min-h-screen bg-background crt-effect crt-flicker">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-widest terminal-glow">
              CASE ARCHIVE
            </h1>
            <p className="text-xs text-muted-foreground">
              LOGGED IN: {detective?.name} | BADGE #{detective?.badgeNumber}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={logout}
            className="border-border text-muted-foreground hover:text-primary hover:border-primary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            LOGOUT
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            SELECT A CASE FILE TO ACCESS. CLOSED CASES ARE RESTRICTED BY COURT ORDER.
          </p>
          <div className="mt-2 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {/* Case Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseFile) => (
            <button
              key={caseFile.id}
              onClick={() => handleCaseClick(caseFile.id)}
              disabled={caseFile.status === 'Closed'}
              className={`
                text-left p-6 border transition-all duration-200
                ${caseFile.status === 'Closed' 
                  ? 'border-muted bg-muted/20 opacity-50 cursor-not-allowed' 
                  : 'border-border bg-card hover:border-primary hover:box-glow cursor-pointer'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {caseFile.status === 'Closed' ? (
                  <FolderLock className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                ) : (
                  <FolderOpen className="w-8 h-8 text-primary flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold tracking-wider ${caseFile.status === 'Open' ? 'text-primary' : 'text-muted-foreground'}`}>
                    {caseFile.caseName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    ID: {caseFile.id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    OPENED: {caseFile.dateOpened}
                  </p>
                  <div className={`
                    mt-2 inline-block px-2 py-0.5 text-xs tracking-wider
                    ${caseFile.status === 'Open' 
                      ? 'bg-primary/20 text-primary border border-primary/50' 
                      : 'bg-muted text-muted-foreground border border-muted'
                    }
                  `}>
                    {caseFile.status.toUpperCase()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
                    {caseFile.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Access Code Dialog */}
      <Dialog open={!!selectedCaseId} onOpenChange={() => setSelectedCaseId(null)}>
        <DialogContent className="bg-card border-primary box-glow">
          <DialogHeader>
            <DialogTitle className="text-primary tracking-wider flex items-center gap-2">
              <Key className="w-5 h-5" />
              CASE ACCESS REQUIRED
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter the case access code from your physical kit to proceed.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAccessSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs tracking-wider text-muted-foreground">
                ACCESS CODE
              </label>
              <Input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="ENTER CODE"
                className="bg-input border-border text-primary font-terminal tracking-widest uppercase"
                autoFocus
              />
              {error && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setSelectedCaseId(null)}
                className="flex-1 border-border"
              >
                CANCEL
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-primary text-primary-foreground"
              >
                ACCESS FILE
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Restricted Access Dialog */}
      <Dialog open={showRestricted} onOpenChange={setShowRestricted}>
        <DialogContent className="bg-card border-destructive">
          <div className="text-center py-4">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-bold text-destructive tracking-wider mb-2">
              ACCESS DENIED
            </h2>
            <p className="text-muted-foreground text-sm">
              RESTRICTED: Case File Sealed by Court Order
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Contact Internal Affairs for access requests.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
