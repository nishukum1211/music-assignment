import type { Song } from './types';

export const sortBy = (songs: Song[], key: keyof Song) =>
  [...songs].sort((a, b) => String(a[key]).localeCompare(String(b[key])));

export const groupBy = (songs: Song[], key: keyof Song) =>
  songs.reduce<Record<string, Song[]>>((acc, s) => {
    const k = String(s[key]);
    acc[k] = acc[k] ? [...acc[k], s] : [s];
    return acc;
  }, {});
