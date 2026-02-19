import { useAuth } from '@/context/AuthContext';
import { activityLog } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Car, 
  Film, 
  FileText, 
  ArrowLeft, 
  Activity,
  Shield,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { detective, selectedCase, exitCase } = useAuth();

  return (
    <div className="min-h-screen bg-background crt-effect crt-flicker">
      {/* Active Case Banner */}
      <div className="bg-primary/10 border-b border-primary px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm tracking-wider">
              ACTIVE FILE: <span className="text-primary font-bold">{selectedCase?.caseName}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              | ID: {selectedCase?.id}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={exitCase}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Return to Archive
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-widest terminal-glow">
                Mississauga PD DASHBOARD
              </h1>
              <p className="text-xs text-muted-foreground">
                {detective?.rank} | {detective?.name}
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p>SYSTEM STATUS: <span className="text-primary">● ONLINE</span></p>
            <p className="flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" />
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Navigation Cards */}
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            <Link 
              to="/suspects"
              className="group p-6 border border-border bg-card hover:border-primary hover:box-glow transition-all"
            >
              <Users className="w-10 h-10 text-primary mb-4 group-hover:terminal-glow" />
              <h2 className="text-lg font-bold tracking-wider text-primary mb-2">
                SUSPECT DATABASE
              </h2>
              <p className="text-sm text-muted-foreground">
                Access personnel files, mugshots, fingerprints, and known associates.
              </p>
            </Link>

            <Link 
              to="/registry"
              className="group p-6 border border-border bg-card hover:border-primary hover:box-glow transition-all"
            >
              <Car className="w-10 h-10 text-primary mb-4 group-hover:terminal-glow" />
              <h2 className="text-lg font-bold tracking-wider text-primary mb-2">
                REGISTRY SEARCH
              </h2>
              <p className="text-sm text-muted-foreground">
                License plate lookup, VIN verification, and vehicle ownership records.
              </p>
            </Link>

            <Link 
              to="/evidence"
              className="group p-6 border border-border bg-card hover:border-primary hover:box-glow transition-all sm:col-span-2"
            >
              <Film className="w-10 h-10 text-primary mb-4 group-hover:terminal-glow" />
              <h2 className="text-lg font-bold tracking-wider text-primary mb-2">
                EVIDENCE ROOM
              </h2>
              <p className="text-sm text-muted-foreground">
                Review witness statements, CCTV footage, and audio recordings associated with this case.
              </p>
            </Link>
          </div>

          {/* Activity Log */}
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-bold tracking-wider text-sm">RECENT ACTIVITY</h3>
            </div>
            <div className="h-px bg-border mb-4" />
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {activityLog.map((log, index) => (
                <div 
                  key={index} 
                  className="text-xs font-terminal p-2 bg-background/50 border border-border/50"
                >
                  <span className="text-muted-foreground">[{log.timestamp}]</span>
                  <br />
                  <span className={
                    log.message.startsWith('ALERT') 
                      ? 'text-destructive' 
                      : log.message.startsWith('ACCESS')
                        ? 'text-primary'
                        : 'text-muted-foreground'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Summary */}
        <div className="mt-6 border border-border bg-card p-6">
          <h3 className="font-bold tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            CASE BRIEF
          </h3>
          <div className="h-px bg-border mb-4" />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">CASE NAME</p>
              <p className="text-primary">{selectedCase?.caseName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">DATE OPENED</p>
              <p className="text-primary">{selectedCase?.dateOpened}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground mb-1">DESCRIPTION</p>
              <p className="text-sm">{selectedCase?.description}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-xs text-muted-foreground">
          <p>CLASSIFIED SYSTEM - ALL ACCESS LOGGED</p>
          <p>UNAUTHORIZED DISCLOSURE IS PUNISHABLE BY LAW</p>
        </div>
      </footer>
    </div>
  );
}
