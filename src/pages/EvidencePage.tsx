import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { evidence } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { 
  Film, 
  ArrowLeft, 
  FileText, 
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  Video,
  FileSpreadsheet,
  Clock,
  Image
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EvidencePage() {
  const { selectedCase } = useAuth();
  const [selectedEvidence, setSelectedEvidence] = useState<typeof evidence[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Filter evidence by current case
  const caseEvidence = evidence.filter(e => e.caseId === selectedCase?.id);

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'CCTV':
        return <Video className="w-5 h-5" />;
      case 'Audio Recording':
        return <Mic className="w-5 h-5" />;
      case 'Witness Statement':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'Photo':
        return <Image className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const handlePlayPause = async () => {
    const media = videoRef.current || audioRef.current;
    if (!media) return;
    try {
      if (isPlaying) {
        media.pause();
        setIsPlaying(false);
      } else {
        await media.play();
        setIsPlaying(true);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      media.muted = !isMuted;
      setIsMuted(!isMuted);
    }
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
          <div className="flex items-center gap-4">
            <Film className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-widest terminal-glow">
                EVIDENCE ROOM
              </h1>
              <p className="text-xs text-muted-foreground">
                {caseEvidence.length} ITEMS CATALOGUED
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Evidence List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs text-muted-foreground tracking-wider mb-4">
              EVIDENCE CATALOG
            </h3>
            {caseEvidence.length === 0 ? (
              <p className="text-muted-foreground text-sm">No evidence on file</p>
            ) : (
              caseEvidence.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedEvidence(item);
                    setIsPlaying(false);
                  }}
                  className={`
                    w-full text-left p-4 border transition-all
                    ${selectedEvidence?.id === item.id 
                      ? 'border-primary bg-primary/10 box-glow' 
                      : 'border-border bg-card hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${selectedEvidence?.id === item.id ? 'text-primary' : 'text-muted-foreground'}`}>
                      {getEvidenceIcon(item.evidenceType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-primary truncate">
                        {item.subjectName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.evidenceType}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Media Player */}
          <div className="lg:col-span-2">
            {selectedEvidence ? (
              <div className="border border-primary bg-card box-glow">
                {/* Player Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    {getEvidenceIcon(selectedEvidence.evidenceType)}
                    <h2 className="font-bold tracking-wider text-primary">
                      {selectedEvidence.subjectName}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvidence.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>ID: {selectedEvidence.id}</span>
                    <span>|</span>
                    <span>Type: {selectedEvidence.evidenceType}</span>
                    <span>|</span>
                    <span>Timestamp: {selectedEvidence.timestamp}</span>
                  </div>
                </div>

                {/* Media Content */}
                <div className="p-4">
                  {selectedEvidence.videoUrl ? (
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-black border border-border">
                        <video
                          ref={videoRef}
                          src={selectedEvidence.videoUrl}
                          className="w-full h-full"
                          onEnded={() => setIsPlaying(false)}
                        />
                        {/* Scanline overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center gap-4 p-3 bg-background border border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handlePlayPause}
                          className="text-primary hover:bg-primary/20"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleMuteToggle}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <span className="text-xs text-muted-foreground font-terminal">
                          CCTV PLAYBACK SYSTEM v2.1
                        </span>
                      </div>
                    </div>
                  ) : selectedEvidence.audioUrl ? (
                    <div className="space-y-4">
                      <div className="aspect-[3/1] bg-black border border-border flex items-center justify-center relative overflow-hidden">
                        {/* Audio visualizer placeholder */}
                        <div className="flex items-end gap-1 h-16">
                          {[...Array(32)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 bg-primary transition-all duration-150 ${isPlaying ? 'animate-pulse' : ''}`}
                              style={{ 
                                height: isPlaying ? `${Math.random() * 100}%` : '20%',
                                animationDelay: `${i * 0.05}s`
                              }}
                            />
                          ))}
                        </div>
                        <audio
                          ref={audioRef}
                          src={selectedEvidence.audioUrl}
                          onEnded={() => setIsPlaying(false)}
                          onError={() => setIsPlaying(false)}
                        />
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center gap-4 p-3 bg-background border border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handlePlayPause}
                          className="text-primary hover:bg-primary/20"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleMuteToggle}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <span className="text-xs text-muted-foreground font-terminal">
                          AUDIO PLAYBACK SYSTEM v1.4
                        </span>
                      </div>
                    </div>
                  ) : selectedEvidence.documentUrl ? (
                    <div className="space-y-4">
                      <div className="border border-border bg-background overflow-hidden">
                        <iframe
                          src={selectedEvidence.documentUrl}
                          title="Document evidence"
                          className="w-full aspect-[4/3] min-h-[400px] border-0"
                        />
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-background border border-border">
                        <a
                          href={selectedEvidence.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline font-terminal"
                        >
                          OPEN IN NEW TAB
                        </a>
                        <span className="text-xs text-muted-foreground font-terminal">
                          DOCUMENT VIEWER
                        </span>
                      </div>
                    </div>
                  ) : selectedEvidence.photoUrl ? (
                    <div className="space-y-4">
                      <div className="border border-border bg-background overflow-hidden">
                        <img
                          src={selectedEvidence.photoUrl}
                          alt={selectedEvidence.subjectName}
                          className="w-full max-h-[500px] object-contain bg-muted"
                        />
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-background border border-border">
                        <a
                          href={selectedEvidence.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline font-terminal"
                        >
                          OPEN IN NEW TAB
                        </a>
                        <span className="text-xs text-muted-foreground font-terminal">
                          PHOTO EVIDENCE
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-background border border-border flex flex-col items-center justify-center">
                      <FileSpreadsheet className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        DOCUMENT TYPE EVIDENCE
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Physical copy available in evidence locker
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-border bg-card h-full min-h-[400px] flex flex-col items-center justify-center">
                <Film className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">SELECT EVIDENCE TO REVIEW</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
