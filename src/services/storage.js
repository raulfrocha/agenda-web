const KEY = "agendeweb_db";

export function readDB() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const initial = { bookings: [] };
    localStorage.setItem(KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(raw);
}

export function saveBooking(booking) {
  const db = readDB();
  db.bookings.push(booking);
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function listBookingsForPrestador(prestadorId) {
  const db = readDB();
  return db.bookings.filter(
    (b) => String(b.prestadorId) === String(prestadorId)
  );
}
