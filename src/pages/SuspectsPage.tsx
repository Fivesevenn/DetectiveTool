import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { characters, cars } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Users, 
  Search, 
  ArrowLeft, 
  FileText, 
  User,
  Phone,
  MapPin,
  Car,
  Fingerprint
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SuspectsPage() {
  const { selectedCase } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null);

  // Filter characters by current case
  const caseCharacters = characters.filter(c => c.caseId === selectedCase?.id);
  
  // Filter by search (case sensitive as requested)
  const filteredCharacters = caseCharacters.filter(c => 
    searchQuery === '' || 
    c.fullName.includes(searchQuery) ||
    c.alias?.includes(searchQuery) ||
    c.phoneNumber.includes(searchQuery)
  );

  const getCarForCharacter = (carId?: string) => {
    if (!carId) return null;
    return cars.find(c => c.id === carId);
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-widest terminal-glow">
                SUSPECT DATABASE
              </h1>
              <p className="text-xs text-muted-foreground">
                {caseCharacters.length} RECORDS FOUND FOR THIS CASE
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, alias, or phone... (CASE SENSITIVE)"
              className="pl-10 bg-input border-border text-primary font-terminal"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>NO RECORDS MATCH YOUR SEARCH</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCharacters.map((character) => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(character)}
                className="text-left p-4 border border-border bg-card hover:border-primary hover:box-glow transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-muted border border-border flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary tracking-wider truncate">
                      {character.fullName}
                    </h3>
                    {character.alias && (
                      <p className="text-xs text-muted-foreground">
                        AKA: "{character.alias}"
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {character.phoneNumber}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Character Detail Dialog */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="bg-card border-primary box-glow max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary tracking-wider flex items-center gap-2">
              <User className="w-5 h-5" />
              PERSONNEL FILE
            </DialogTitle>
          </DialogHeader>
          
          {selectedCharacter && (
            <div className="space-y-6">
              {/* Mugshot & Basic Info */}
              <div className="flex gap-6">
                <div className="w-32 h-40 bg-muted border border-border flex items-center justify-center flex-shrink-0">
                  <User className="w-16 h-16 text-muted-foreground" />
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-xs text-muted-foreground">FULL NAME</p>
                    <p className="text-primary font-bold">{selectedCharacter.fullName}</p>
                  </div>
                  {selectedCharacter.alias && (
                    <div>
                      <p className="text-xs text-muted-foreground">KNOWN ALIAS</p>
                      <p className="text-primary">"{selectedCharacter.alias}"</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">SUBJECT ID</p>
                    <p className="font-terminal text-sm">{selectedCharacter.id}</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Contact Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">LAST KNOWN ADDRESS</p>
                    <p className="text-sm">{selectedCharacter.lastKnownAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">PHONE NUMBER</p>
                    <p className="text-sm">{selectedCharacter.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle */}
              {selectedCharacter.carId && (
                <>
                  <div className="h-px bg-border" />
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Car className="w-4 h-4 text-primary" />
                      <p className="text-xs text-muted-foreground tracking-wider">REGISTERED VEHICLE</p>
                    </div>
                    {(() => {
                      const car = getCarForCharacter(selectedCharacter.carId);
                      if (!car) return <p className="text-sm text-muted-foreground">No vehicle on record</p>;
                      return (
                        <div className="bg-background/50 border border-border p-4">
                          <div className="grid gap-2 sm:grid-cols-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Plate:</span>{' '}
                              <span className="text-primary font-bold">{car.licensePlate}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Make/Model:</span>{' '}
                              {car.year} {car.make} {car.model}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Color:</span> {car.color}
                            </div>
                            <div>
                              <span className="text-muted-foreground">VIN:</span>{' '}
                              <span className="font-terminal text-xs">{car.vinNumber}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </>
              )}

              {/* Fingerprint */}
              <div className="h-px bg-border" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Fingerprint className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground tracking-wider">FINGERPRINT ON FILE</p>
                </div>
                <div className="w-24 h-24 bg-muted border border-border flex items-center justify-center">
                  <Fingerprint className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>

              {/* Notes */}
              {selectedCharacter.notes && (
                <>
                  <div className="h-px bg-border" />
                  <div>
                    <p className="text-xs text-muted-foreground tracking-wider mb-2">INVESTIGATOR NOTES</p>
                    <p className="text-sm bg-background/50 border border-border p-3">
                      {selectedCharacter.notes}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
