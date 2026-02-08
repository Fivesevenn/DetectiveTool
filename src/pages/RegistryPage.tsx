import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { cars, characters } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Car, 
  Search, 
  ArrowLeft, 
  FileText, 
  User,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegistryPage() {
  const { selectedCase } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<typeof cars[0] | null>(null);
  const [searched, setSearched] = useState(false);

  // Filter cars by current case
  const caseCars = cars.filter(c => c.caseId === selectedCase?.id);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    
    // Case-sensitive search as requested
    const result = caseCars.find(c => c.licensePlate === searchQuery);
    setSearchResult(result || null);
  };

  const getOwner = (ownerId?: string) => {
    if (!ownerId) return null;
    return characters.find(c => c.id === ownerId);
  };

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
          </div>
          <Link to="/dashboard">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Car className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-widest terminal-glow">
                VEHICLE REGISTRY
              </h1>
              <p className="text-xs text-muted-foreground">
                LICENSE PLATE LOOKUP SYSTEM
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value.toUpperCase());
                  setSearched(false);
                }}
                placeholder="ENTER LICENSE PLATE (CASE SENSITIVE)"
                className="pl-10 bg-input border-border text-primary font-terminal tracking-widest uppercase text-lg"
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-primary text-primary-foreground font-terminal tracking-widest"
            >
              [ SEARCH DATABASE ]
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-6">
        {searched && (
          <>
            {searchResult ? (
              <div className="border border-primary bg-card p-6 box-glow">
                <div className="flex items-center gap-2 mb-4">
                  <Car className="w-5 h-5 text-primary" />
                  <h2 className="font-bold tracking-wider text-primary">
                    VEHICLE RECORD FOUND
                  </h2>
                </div>
                <div className="h-px bg-border mb-6" />

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Vehicle Details */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">LICENSE PLATE</p>
                      <p className="text-2xl text-primary font-bold tracking-widest">
                        {searchResult.licensePlate}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">MAKE</p>
                        <p className="text-sm">{searchResult.make}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">MODEL</p>
                        <p className="text-sm">{searchResult.model}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">YEAR</p>
                        <p className="text-sm">{searchResult.year}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">COLOR</p>
                        <p className="text-sm">{searchResult.color}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">VIN NUMBER</p>
                      <p className="font-terminal text-sm bg-background/50 p-2 border border-border">
                        {searchResult.vinNumber}
                      </p>
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div className="border border-border bg-background/50 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground tracking-wider">
                        REGISTERED OWNER
                      </p>
                    </div>
                    {(() => {
                      const owner = getOwner(searchResult.ownerId);
                      if (!owner) {
                        return (
                          <p className="text-muted-foreground text-sm">
                            No owner on record
                          </p>
                        );
                      }
                      return (
                        <div className="space-y-2">
                          <p className="text-primary font-bold">{owner.fullName}</p>
                          {owner.alias && (
                            <p className="text-sm text-muted-foreground">
                              AKA: "{owner.alias}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {owner.lastKnownAddress}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tel: {owner.phoneNumber}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-destructive/50 bg-card p-6 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
                <h2 className="font-bold tracking-wider text-destructive mb-2">
                  NO RECORD FOUND
                </h2>
                <p className="text-sm text-muted-foreground">
                  License plate "{searchQuery}" not found in database.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: Search is case-sensitive. Verify exact plate format.
                </p>
              </div>
            )}
          </>
        )}

        {/* All Vehicles List */}
        <div className="mt-8">
          <h3 className="text-sm font-bold tracking-wider text-muted-foreground mb-4">
            ALL VEHICLES IN CASE FILE ({caseCars.length})
          </h3>
          <div className="space-y-2">
            {caseCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between p-3 border border-border bg-card text-sm"
              >
                <div className="flex items-center gap-4">
                  <Car className="w-4 h-4 text-primary" />
                  <span className="font-terminal text-primary">{car.licensePlate}</span>
                </div>
                <span className="text-muted-foreground">
                  {car.year} {car.make} {car.model} - {car.color}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
