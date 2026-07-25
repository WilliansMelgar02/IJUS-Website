import { useState } from 'react';
import { NovedadItem } from '../lib/novedades';

const DAY_LABELS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

interface EventsCalendarProps {
  items: NovedadItem[];
  onSelectEvent?: (id: string) => void;
}

export const EventsCalendar = ({ items, onSelectEvent }: EventsCalendarProps) => {
  const today = new Date();
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();

  // Mapa día -> id del evento (el primero de ese día)
  const eventsByDay = new Map<string, string>();
  items
    .filter((i) => i.type === 'evento' && i.sortDate > 0)
    .forEach((i) => {
      const d = new Date(i.sortDate);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!eventsByDay.has(key)) eventsByDay.set(key, i.id);
    });

  // Celdas del mes (semana empieza en lunes)
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Siempre 6 filas (42 celdas) para que el calendario no cambie de altura entre meses
  while (cells.length < 42) cells.push(null);

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8">
      {/* Header: navegación de mes */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setView(new Date(year, month - 1, 1))}
          aria-label="Mes anterior"
          className="flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:bg-white hover:text-primary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span className="text-lg font-medium tracking-wide">{MONTHS_ES[month]} {year}</span>
        <button
          onClick={() => setView(new Date(year, month + 1, 1))}
          aria-label="Mes siguiente"
          className="flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:bg-white hover:text-primary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-center text-xs uppercase tracking-wider opacity-50 mb-3">
        {DAY_LABELS.map((l) => (
          <div key={l} className="py-1">{l}</div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 text-center text-base gap-y-2">
        {cells.map((d, i) => {
          if (d === null) return <div key={`empty-${i}`} />;
          const eventId = eventsByDay.get(`${year}-${month}-${d}`);
          return (
            <div key={d} className="flex items-center justify-center">
              <button
                onClick={eventId && onSelectEvent ? () => onSelectEvent(eventId) : undefined}
                tabIndex={eventId ? 0 : -1}
                aria-label={eventId ? `Ver evento del ${d}` : undefined}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                  eventId
                    ? 'bg-white text-primary font-semibold hover:bg-light cursor-pointer shadow-md'
                    : 'text-white/80 cursor-default'
                } ${isToday(d) && !eventId ? 'ring-1 ring-white/60' : ''}`}
              >
                {d}
              </button>
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-5 mt-6 text-sm opacity-70">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
          Día con evento
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/60 inline-block" />
          Hoy
        </span>
      </div>
    </div>
  );
};
