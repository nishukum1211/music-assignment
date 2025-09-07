import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Filter,
  Grid3x3,
  List,
  Clock,
  Disc,
  Mic2,
  Music,
  Play,
  Pause,
  ChevronDown,
  X,
  Sparkles,
} from 'lucide-react';
import './styles.css';
import type { Role, Song } from './types';
import { seedSongs } from './data';
import { groupBy, sortBy } from './utils';

type Props = { role: Role; token?: string };

export default function MusicContainer({ role }: Props) {
  const [songs, setSongs] = useState<Song[]>(seedSongs);
  const [q, setQ] = useState('');
  const [by, setBy] = useState<'title' | 'artist' | 'album'>('title');
  const [group, setGroup] = useState<'none' | 'artist' | 'album'>('none');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const base = q
      ? songs.filter((s) =>
          [s.title, s.artist, s.album].some((v) =>
            v.toLowerCase().includes(q.toLowerCase())
          )
        )
      : songs;
    return sortBy(base, by);
  }, [songs, q, by]);

  const grouped = useMemo(() => {
    if (group === 'none') return { 'All Songs': filtered };
    return groupBy(filtered, group);
  }, [filtered, group]);

  const stats = useMemo(() => {
    const totalDuration = filtered.reduce(
      (acc, song) => acc + song.duration,
      0
    );
    const uniqueArtists = new Set(songs.map((s) => s.artist)).size;
    const uniqueAlbums = new Set(songs.map((s) => s.album)).size;
    return {
      totalSongs: filtered.length,
      totalDuration,
      uniqueArtists,
      uniqueAlbums,
    };
  }, [filtered, songs]);

  const addSong = (s: Song) => {
    setSongs((list) => [s, ...list]);
  };

  const deleteSong = (id: string) => {
    setSongs((list) => list.filter((s) => s.id !== id));
    if (selectedSong === id) setSelectedSong(null);
    if (playingId === id) setPlayingId(null);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6 bg-black ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {stats.totalSongs}
                </p>
                <p className="text-sm text-gray-400">Total Songs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {formatDuration(stats.totalDuration)}
                </p>
                <p className="text-sm text-gray-400">Total Duration</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-green-500/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {stats.uniqueArtists}
                </p>
                <p className="text-sm text-gray-400">Artists</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-orange-500/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl">
                <Disc className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {stats.uniqueAlbums}
                </p>
                <p className="text-sm text-gray-400">Albums</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <label htmlFor="search" className="sr-only">
              Search songs
            </label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
            <input
              id="search"
              type="text"
              placeholder="Search title, artist, or album..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all"
              aria-label="Search songs"
            />
            {q && (
              <button
                onClick={() => setQ('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <div className="relative group">
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                id="sort"
                className="appearance-none pl-9 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-white/10 transition-all cursor-pointer"
                value={by}
                onChange={(e) => setBy(e.target.value as any)}
                aria-label="Sort songs"
              >
                <option value="title" className="bg-gray-900">
                  Sort: Title
                </option>
                <option value="artist" className="bg-gray-900">
                  Sort: Artist
                </option>
                <option value="album" className="bg-gray-900">
                  Sort: Album
                </option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative group">
              <label htmlFor="group" className="sr-only">
                Group by
              </label>
              <Grid3x3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                id="group"
                className="appearance-none pl-9 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-white/10 transition-all cursor-pointer"
                value={group}
                onChange={(e) => setGroup(e.target.value as any)}
                aria-label="Group songs"
              >
                <option value="none" className="bg-gray-900">
                  Group: None
                </option>
                <option value="artist" className="bg-gray-900">
                  Group: Artist
                </option>
                <option value="album" className="bg-gray-900">
                  Group: Album
                </option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={() => setView(view === 'list' ? 'grid' : 'list')}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={`Switch to ${view === 'list' ? 'grid' : 'list'} view`}
            >
              {view === 'list' ? (
                <Grid3x3 className="w-5 h-5" />
              ) : (
                <List className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {role === 'admin' && <AdminAdd onAdd={addSong} />}
      </div>

      <div className="overflow-y-scroll h-auto ">
        {Object.entries(grouped).map(([label, items]) => (
          <div
            key={label}
            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden py-2"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {group === 'artist' && (
                  <Mic2 className="w-5 h-5 text-purple-400" />
                )}
                {group === 'album' && (
                  <Disc className="w-5 h-5 text-blue-400" />
                )}
                {group === 'none' && (
                  <Sparkles className="w-5 h-5 text-green-400" />
                )}
                {label}
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({items.length})
                </span>
              </h2>
            </div>

            {view === 'list' ? (
              <ul className="divide-y divide-white/5" role="list">
                {items.map((s) => (
                  <li
                    key={s.id}
                    className={`group hover:bg-white/5 transition-all ${
                      selectedSong === s.id ? 'bg-purple-600/10' : ''
                    }`}
                    role="listitem"
                  >
                    <div className="flex items-center px-6 py-4">
                      {/* <button
                        onClick={() => togglePlay(s.id)}
                        className="p-2 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all mr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 group"
                        aria-label={
                          playingId === s.id
                            ? `Pause ${s.title}`
                            : `Play ${s.title}`
                        }
                      >
                        {playingId === s.id ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white group-hover:text-white" />
                        )}
                      </button> */}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {s.title}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                          {s.artist} • {s.album}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className="text-sm text-gray-500"
                          aria-label={`Duration: ${formatDuration(s.duration)}`}
                        >
                          {formatDuration(s.duration)}
                        </span>

                        {role === 'admin' && (
                          <button
                            onClick={() => deleteSong(s.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label={`Delete ${s.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {items.map((s) => (
                  <div
                    key={s.id}
                    className={`group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur rounded-xl p-4 hover:from-purple-600/20 hover:to-pink-600/20 border border-white/10 hover:border-purple-500/50 transition-all ${
                      selectedSong === s.id
                        ? 'ring-2 ring-purple-500 border-purple-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <button
                        onClick={() => togglePlay(s.id)}
                        className="p-2 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label={
                          playingId === s.id
                            ? `Pause ${s.title}`
                            : `Play ${s.title}`
                        }
                      >
                        {playingId === s.id ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </button>
                      {role === 'admin' && (
                        <button
                          onClick={() => deleteSong(s.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 bg-red-600/10 rounded-full hover:bg-red-600/20 text-red-400 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                          aria-label={`Delete ${s.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="font-semibold text-white truncate mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate mb-1">
                      {s.artist}
                    </p>
                    <p className="text-xs text-gray-500 truncate mb-3">
                      {s.album}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(s.duration)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
          <Music className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No songs found matching your search.</p>
        </div>
      )}
    </div>
  );
}

const AdminAdd = ({ onAdd }: { onAdd: (s: Song) => void }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [duration, setDuration] = useState<number>(180);

  const add = () => {
    if (!title.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      artist: artist.trim() || 'Unknown',
      album: album.trim() || 'Single',
      duration: Number(duration) || 180,
    });
    setTitle('');
    setArtist('');
    setAlbum('');
    setDuration(180);
  };

  return (
    <div className="mt-3 grid md:grid-cols-5 gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border rounded-xl px-3 py-2 bg-gray-200"
      />
      <input
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
        className="border rounded-xl px-3 py-2 bg-gray-200"
      />
      <input
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        placeholder="Album"
        className="border rounded-xl px-3 py-2 bg-gray-200"
      />
      <input
        value={duration}
        type="number"
        min={10}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="border rounded-xl px-3 py-2 bg-gray-200"
      />
      <button
        onClick={add}
        className="px-4 py-2 rounded-2xl border bg-black text-white "
      >
        Add
      </button>
    </div>
  );
};
