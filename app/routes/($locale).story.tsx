import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData } from 'react-router';
import {
  MessageSquare,
  Star,
  Send,
  Play,
  Pause,
  Upload,
  X,
  Image as ImageIcon,
  Video,
  Gem,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Route } from './+types/($locale).story';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Gem Mine | Stories & Feedback' }];
};

export async function loader({ context }: Route.LoaderArgs) {
  return { ok: true };
}

// ─── Types ──────────────────────────────────────────────────────────────────────
interface StoryMessage {
  id: string;
  name: string;
  rating: number;
  content: string;
  timestamp: string;
  photoDataUrl?: string;   // base64 from FileReader
  videoDataUrl?: string;   // base64 from FileReader
}

// ─── Seed Data ──────────────────────────────────────────────────────────────────
const SEED_MESSAGES: StoryMessage[] = [
  {
    id: 'seed-1',
    name: 'Arthur Pendelton',
    rating: 5,
    content:
      'Bought a custom pendant for my wedding anniversary. Absolute masterpiece — my wife was moved to tears. Thank you Gem Mine!',
    timestamp: '2026-08-10T14:32:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'Nora Al-Mansoori',
    rating: 5,
    content:
      'Fast international delivery to Dubai. Packaged securely with all certifications. The emerald is incredibly vibrant.',
    timestamp: '2026-08-15T09:12:00.000Z',
  },
  {
    id: 'seed-3',
    name: 'David Chen',
    rating: 4,
    content:
      'Stunning craftsmanship. Looking forward to adding another piece to my collection soon!',
    timestamp: '2026-08-18T18:45:00.000Z',
  },
];

const LS_KEY = 'gemmine_story_messages_v2';

// ─── Star Rating Component ───────────────────────────────────────────────────────
function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md';
}) {
  const cls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(s)}
          className={`transition-transform ${!readonly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            className={`${cls} ${s <= value ? 'fill-[#d4a89a] text-[#d4a89a]' : 'text-gray-300'}`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Video Player Component ──────────────────────────────────────────────────────
function InlineVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black group cursor-pointer" onClick={toggle}>
      <video
        ref={ref}
        src={src}
        loop
        playsInline
        className="w-full max-h-72 object-cover"
        onEnded={() => setPlaying(false)}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        } bg-black/30`}
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
          {playing ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </div>
      </div>
    </div>
  );
}

// ─── Message Card Component ──────────────────────────────────────────────────────
function MessageCard({ msg, index }: { msg: StoryMessage; index: number }) {
  const hasPhoto = !!msg.photoDataUrl;
  const hasVideo = !!msg.videoDataUrl;
  const hasMedia = hasPhoto || hasVideo;

  const initials = msg.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e2a47] to-[#2d3e6a] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#1e2a47] text-sm truncate">{msg.name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating value={msg.rating} readonly size="sm" />
            <span className="text-[10px] text-gray-400 font-light">
              {new Date(msg.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Message text */}
      <p className="px-5 pb-4 text-gray-600 text-sm font-light leading-relaxed whitespace-pre-line">
        {msg.content}
      </p>

      {/* Photo */}
      {hasPhoto && (
        <div className="px-5 pb-4">
          <div className="rounded-2xl overflow-hidden border border-gray-100">
            <img
              src={msg.photoDataUrl}
              alt={`${msg.name}'s photo`}
              className="w-full object-cover max-h-72 transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      )}

      {/* Video */}
      {hasVideo && (
        <div className="px-5 pb-5">
          <InlineVideo src={msg.videoDataUrl!} />
        </div>
      )}
    </motion.article>
  );
}

// ─── File Upload Preview ─────────────────────────────────────────────────────────
function MediaPreview({
  dataUrl,
  type,
  onRemove,
}: {
  dataUrl: string;
  type: 'photo' | 'video';
  onRemove: () => void;
}) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
      {type === 'photo' ? (
        <img src={dataUrl} alt="Preview" className="w-full h-32 object-cover" />
      ) : (
        <video src={dataUrl} className="w-full h-32 object-cover" muted />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/50 text-white text-[10px] font-medium uppercase tracking-wider">
        {type}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────────
export default function Story() {
  useLoaderData<typeof loader>();

  const [messages, setMessages] = useState<StoryMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form state
  const [nameInput, setNameInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [messageInput, setMessageInput] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>();
  const [videoDataUrl, setVideoDataUrl] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(true);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored) as StoryMessage[]);
      } catch {
        setMessages(SEED_MESSAGES);
      }
    } else {
      setMessages(SEED_MESSAGES);
    }
    setIsLoaded(true);
  }, []);

  // Read file as base64
  const readFile = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Photo must be smaller than 5 MB.');
      return;
    }
    const dataUrl = await readFile(file);
    setPhotoDataUrl(dataUrl);
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 30 * 1024 * 1024) {
      toast.error('Video must be smaller than 30 MB.');
      return;
    }
    const dataUrl = await readFile(file);
    setVideoDataUrl(dataUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !messageInput.trim()) {
      toast.error('Please enter your name and message.');
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      const newMsg: StoryMessage = {
        id: `msg-${Date.now()}`,
        name: nameInput.trim(),
        rating: ratingInput,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
        photoDataUrl,
        videoDataUrl,
      };

      const updated = [newMsg, ...messages];
      setMessages(updated);

      // Store without large media blobs exceeding LS quota gracefully
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
      } catch {
        // If over quota, store without media
        const slim = updated.map(({ photoDataUrl: p, videoDataUrl: v, ...rest }) => rest);
        localStorage.setItem(LS_KEY, JSON.stringify(slim));
        toast.info('Media was not saved to storage due to size limits, but your message is visible.');
      }

      setNameInput('');
      setRatingInput(5);
      setMessageInput('');
      setPhotoDataUrl(undefined);
      setVideoDataUrl(undefined);
      setIsSubmitting(false);

      toast.success('Your story has been added to the board!');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {/* ── Page Header ── */}
      <div className="bg-[#1e2a47] pt-32 pb-16 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4a89a]/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a89a]/15 border border-[#d4a89a]/20 text-[#d4a89a] text-xs font-semibold tracking-widest uppercase mb-5">
            <Gem className="w-3.5 h-3.5" />
            Community Stories
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white font-light leading-tight">
            Our <span className="italic text-[#d4a89a]">Story</span> Board
          </h1>
          <p className="text-blue-100/60 mt-4 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Real moments from our clients — messages, photos, and video clips shared from around the world.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── Left: Form ── */}
          <div className="lg:col-span-4 xl:col-span-4">
            <div className="sticky top-24">
              {/* Form toggle header */}
              <button
                type="button"
                onClick={() => setFormOpen(!formOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#1e2a47] text-white rounded-2xl mb-3 hover:bg-[#2d3e6a] transition-colors"
              >
                <span className="font-medium text-sm tracking-wide flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#d4a89a]" />
                  Share Your Story
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#d4a89a] transition-transform duration-300 ${formOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {formOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5"
                    >
                      {/* Name */}
                      <div>
                        <label htmlFor="story-name" className="block text-[11px] font-semibold uppercase tracking-widest text-[#1e2a47] mb-1.5">
                          Your Name
                        </label>
                        <input
                          id="story-name"
                          type="text"
                          placeholder="e.g. Katherine Miller"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-xl focus:outline-none focus:border-[#d4a89a] focus:ring-1 focus:ring-[#d4a89a]/30 text-sm transition-all"
                        />
                      </div>

                      {/* Rating */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#1e2a47] mb-1.5">
                          Rating
                        </label>
                        <StarRating value={ratingInput} onChange={setRatingInput} />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="story-msg" className="block text-[11px] font-semibold uppercase tracking-widest text-[#1e2a47] mb-1.5">
                          Your Message
                        </label>
                        <textarea
                          id="story-msg"
                          rows={4}
                          placeholder="Share your experience — the unboxing, the gem's sparkle, a custom design story..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          className="w-full px-4 py-3 bg-[#f8f5f0] border border-transparent rounded-xl focus:outline-none focus:border-[#d4a89a] focus:ring-1 focus:ring-[#d4a89a]/30 text-sm resize-none transition-all"
                        />
                      </div>

                      {/* Media uploads */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#1e2a47] mb-2">
                          Attach Media <span className="text-gray-400 font-light normal-case tracking-normal">(optional)</span>
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            className="flex-1 py-2.5 rounded-xl border border-dashed border-[#d4a89a]/50 hover:border-[#d4a89a] hover:bg-[#d4a89a]/5 text-[#d4a89a] text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => videoInputRef.current?.click()}
                            className="flex-1 py-2.5 rounded-xl border border-dashed border-[#d4a89a]/50 hover:border-[#d4a89a] hover:bg-[#d4a89a]/5 text-[#d4a89a] text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Video className="w-3.5 h-3.5" />
                            Video
                          </button>
                        </div>

                        {/* Hidden file inputs */}
                        <input
                          ref={photoInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleVideoChange}
                        />

                        {/* Media previews */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {photoDataUrl && (
                            <MediaPreview
                              dataUrl={photoDataUrl}
                              type="photo"
                              onRemove={() => setPhotoDataUrl(undefined)}
                            />
                          )}
                          {videoDataUrl && (
                            <MediaPreview
                              dataUrl={videoDataUrl}
                              type="video"
                              onRemove={() => setVideoDataUrl(undefined)}
                            />
                          )}
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-[#1e2a47] hover:bg-[#2d3e6a] text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Post Story
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats bar */}
              <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#d4a89a]/15 flex items-center justify-center text-[#d4a89a]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <p className="text-xs text-gray-500 font-light">
                  <span className="font-semibold text-[#1e2a47]">{messages.length}</span>{' '}
                  {messages.length === 1 ? 'story' : 'stories'} shared by the Gem Mine community
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Message Board ── */}
          <div className="lg:col-span-8 xl:col-span-8">
            {!isLoaded ? (
              /* Skeleton while loading */
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-[1.5rem] border border-gray-100 p-5 animate-pulse">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-gray-200 rounded-full w-1/3" />
                        <div className="h-2.5 bg-gray-100 rounded-full w-1/4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                      <div className="h-2.5 bg-gray-100 rounded-full w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-sm font-light">No stories yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 gap-5 space-y-5">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <div key={msg.id} className="break-inside-avoid mb-5">
                      <MessageCard msg={msg} index={i} />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
