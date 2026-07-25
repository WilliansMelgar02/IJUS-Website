import { supabase } from './supabase';

export const PLACEHOLDER_IMAGE = '/ijus-noticias-eventos-placeholder.jpg';

const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export interface NovedadItem {
  id: string;
  type: 'evento' | 'noticia' | 'info';
  category: string;
  title: string;
  /** Ej: "Domingo - 19:00" (eventos) | "Actualidad" (noticias) */
  meta: string;
  /** Ej: "5 Jul - 19:00" (eventos) | "" (noticias) */
  dateFormatted: string;
  location: string;
  description: string;
  image: string;
  sortDate: number;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function mapEvent(evt: any): NovedadItem {
  const d = new Date(evt.date);
  return {
    id: `evt-${evt.id}`,
    type: 'evento',
    category: 'Evento',
    title: evt.title,
    meta: `${DAYS_ES[d.getDay()]} - ${formatTime(d)}`,
    dateFormatted: `${d.getDate()} ${MONTHS_ES[d.getMonth()]} - ${formatTime(d)}`,
    location: evt.location || 'Constantino 104',
    description: evt.description || '',
    image: evt.image_url || PLACEHOLDER_IMAGE,
    sortDate: d.getTime(),
  };
}

export function mapNotice(not: any): NovedadItem {
  const isNews = not.type === 'news';
  return {
    id: `not-${not.id}`,
    type: isNews ? 'noticia' : 'info',
    category: isNews ? 'Noticia' : 'Información',
    title: not.title,
    meta: 'Actualidad',
    dateFormatted: '',
    location: '',
    description: not.content || '',
    image: not.image_url || PLACEHOLDER_IMAGE,
    sortDate: new Date(not.published_at).getTime(),
  };
}

/** Eventos más recientes primero. */
export async function fetchEvents(limit?: number): Promise<NovedadItem[]> {
  let query = supabase.from('event').select('*').order('date', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return (data || []).map(mapEvent);
}

/** Noticias más recientes primero. */
export async function fetchNotices(limit?: number): Promise<NovedadItem[]> {
  let query = supabase.from('notice').select('*').order('published_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
  return (data || []).map(mapNotice);
}
