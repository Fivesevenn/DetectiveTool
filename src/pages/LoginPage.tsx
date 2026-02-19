import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [badgeNumber, setBadgeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [bootText, setBootText] = useState('');

  const bootSequence = [
    'INITIALIZING REDFILEMYSTERIES DATABASE...',
    'LOADING SECURITY PROTOCOLS...',
    'ESTABLISHING ENCRYPTED CONNECTION...',
    'SYSTEM READY - AWAITING CREDENTIALS'
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        if (currentChar <= bootSequence[currentLine].length) {
          setBootText(
            bootSequence.slice(0, currentLine).join('\n') + 
            (currentLine > 0 ? '\n' : '') +
            bootSequence[currentLine].slice(0, currentChar)
          );
          currentChar++;
        } else {
          currentLine++;
          currentChar = 0;
        }
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = login(badgeNumber.toUpperCase(), password);
    
    if (!result.success) {
      setError(result.error || 'Access Denied');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background crt-effect crt-flicker flex flex-col items-center justify-center p-4">
      {/* Security Alert Overlay */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-destructive/20 animate-pulse">
          <div className="border-2 border-destructive bg-background p-8 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <p className="text-destructive text-xl font-bold tracking-wider">{error}</p>
          </div>
        </div>
      )}

      {/* Boot Sequence */}
      <div className="w-full max-w-2xl mb-8">
        <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-terminal">
          {bootText}
          <span className="animate-pulse">█</span>
        </pre>
      </div>

      {/* Main Login Terminal */}
      <div className="w-full max-w-md border border-border bg-card p-8 box-glow">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-primary terminal-glow" />
          </div>
          <h1 className="text-2xl font-bold tracking-widest terminal-glow mb-2">
            Mississauga PD DATABASE
          </h1>
          <p className="text-xs text-muted-foreground tracking-wider">
            RESTRICTED ACCESS - AUTHORIZED PERSONNEL ONLY
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs tracking-wider text-muted-foreground">
              BADGE NUMBER
            </label>
            <Input
              type="text"
              value={badgeNumber}
              onChange={(e) => setBadgeNumber(e.target.value.toUpperCase())}
              placeholder="ENTER BADGE #"
              className="bg-input border-border text-primary font-terminal tracking-widest uppercase placeholder:text-muted-foreground/50"
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs tracking-wider text-muted-foreground">
              SECURE PIN
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="bg-input border-border text-primary font-terminal tracking-widest placeholder:text-muted-foreground/50"
              maxLength={10}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-terminal tracking-widest"
          >
            [ AUTHENTICATE ]
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            ══════════════════════════════
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE
          </p>
          <p className="text-xs text-muted-foreground">
            ALL ACTIVITIES ARE MONITORED AND LOGGED
          </p>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-8 text-xs text-muted-foreground text-center font-terminal">
        <p>SYSTEM v2.4.1 | NODE: Mississauga PD-MAIN</p>
        <p>LAST SECURITY UPDATE: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
