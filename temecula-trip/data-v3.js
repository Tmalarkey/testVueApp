const HOME_ADDRESS = '35298 Calle Campo, Temecula, CA';
const googleDirections = destination => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
const CUSTOM_KEY = 'temecula-custom-plans-v1';
const COUNTER_URL = 'https://api.counterapi.dev/v1/temecula-family-trip-2026/wine-bottles';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=33.4936&longitude=-117.1484&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles&forecast_days=2';

const IMG = {
  pennypickle: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill%2Cq_75/https%3A//vacationidea.com/pix/img25Hy8R/california/best-things-to-do-in-temecula_g16_mobi.jpg',
  ponte: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill%2Cq_75/https%3A//vacationidea.com/pix/img25Hy8R/california/t-t5_ponte_family_estate_winery_16608_mobi.jpg',
  danza: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill%2Cq_75/https%3A//vacationidea.com/pix/img25Hy8R/california/best-things-to-do-in-temecula_g25_mobi.jpg',
  wiens: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill%2Cq_75/https%3A//vacationidea.com/pix/img25Hy8R/california/t-t6_wiens_family_cellars_16608_mobi.jpg',
  lorenzi: 'https://hips.hearstapps.com/hmg-prod/images/vineyard-pic-1200px-1655832976.jpg?crop=0.6625xw%3A1xh%3Bcenter%2Ctop',
  longshadow: 'https://hips.hearstapps.com/hmg-prod/images/682060c8-50b6-4e1e-ad18-8a771d8102ad-1655827081.jpeg?crop=1.00xw%3A0.891xh%3B0%2C0.0625xh',
  peltzer: 'https://www.temeculawines.org/images/members/37/gallery/jr6a1386.jpg',
  duck: 'https://live.staticflickr.com/65535/51284128264_1d2a988d4f_b.jpg',
  harveston: 'https://live.staticflickr.com/65535/51284760830_d0a1e2f3d6_h.jpg'
};

const tripDays = [
  {
    id: 'sun', weekday: 'Sunday', shortDay: 'SUN', date: 'August 2', dateShort: 'Aug 2', number: '2', accent: '#df7664',
    summary: 'Arrival and an easy evening settling into the house.',
    events: [
      { time: '4:00 PM', start: 960, end: 1320, title: 'Arrive at the house', location: HOME_ADDRESS, note: 'Settle in, unpack and enjoy an easy first evening.', icon: '🏡', dateTime: '2026-08-02T16:00:00', directions: HOME_ADDRESS }
    ],
    slots: [
      { start: 480, end: 960, title: 'Travel day', detail: 'Make your way to Temecula and enjoy an unhurried arrival.', icon: '🚗' },
      { start: 960, end: 1320, title: 'Arrive and settle in', detail: 'Check in at 4:00 PM, unpack and relax at the house.', icon: '🏡' }
    ]
  },
  {
    id: 'mon', weekday: 'Monday', shortDay: 'MON', date: 'August 3', dateShort: 'Aug 3', number: '3', accent: '#e18b6c',
    summary: 'Free time at the house, then dinner at Ponte.', status: 'Dinner confirmed',
    events: [
      { time: 'Morning', start: 480, end: 1020, title: 'Hang out at the house / free time', location: 'Temecula home base', note: 'A deliberately relaxed start to the trip.', icon: '☀️' },
      { time: '5:30 PM', start: 1050, end: 1200, title: 'Dinner reservation', location: 'Ponte Winery', note: 'About a 5 minute drive.', icon: '🍷', confirmed: true, dateTime: '2026-08-03T17:30:00', directions: 'Ponte Winery Temecula CA', image: IMG.ponte, imageAlt: 'Ponte Winery in Temecula wine country', photoSource: 'Visit Temecula Valley', photoSourceUrl: 'https://www.visittemeculavalley.com/articles/post/25-best-things-to-do-in-temecula-california/' }
    ],
    slots: [
      { start: 480, end: 1020, title: 'Free time at the house', detail: 'Pool, games, snacks and an easy family day.', icon: '☀️' },
      { start: 1020, end: 1050, title: 'Get ready for dinner', detail: 'Ponte is only about a 5 minute drive.', icon: '✨' },
      { start: 1050, end: 1200, title: 'Dinner at Ponte', detail: 'Reservation confirmed for 5:30 PM.', icon: '🍷' },
      { start: 1200, end: 1320, title: 'Relax at the house', detail: 'Wind down after dinner.', icon: '🌙' }
    ]
  },
  {
    id: 'tue', weekday: 'Tuesday', shortDay: 'TUE', date: 'August 4', dateShort: 'Aug 4', number: '4', accent: '#d99a52',
    summary: "Pennypickle's, naps, games and a family wine-tasting evening.",
    events: [
      { time: '10:00 AM–12:00 PM', start: 600, end: 720, title: "Pennypickle's Workshop", location: "Pennypickle's Workshop, Old Town Temecula", note: 'About a 17 minute drive. Entry runs in sessions; 10–12 is the first session.', icon: '🎨', directions: "Pennypickle's Workshop Temecula CA", image: IMG.pennypickle, imageAlt: "Inside Pennypickle's Workshop children's museum", photoSource: 'Visit Temecula Valley', photoSourceUrl: 'https://www.visittemeculavalley.com/articles/post/25-best-things-to-do-in-temecula-california/' },
      { time: '11:45 AM', start: 705, end: 870, title: 'Home for naps', location: 'Temecula home base', note: 'Dad & I can taste at Palumbo or Doffo during nap time.', icon: '😴' },
      { time: '3:00 PM', start: 900, end: 1050, title: 'Play games at home', location: 'Temecula home base', icon: '🎲' },
      { time: '6:00 PM', start: 1080, end: 1320, title: 'Takeout dinner', location: 'Temecula home base', note: 'Family wine tasting evening.', icon: '🍕' }
    ],
    slots: [
      { start: 480, end: 585, title: 'Easy morning at the house', detail: 'Breakfast and time to get ready for Old Town.', icon: '🥐' },
      { start: 585, end: 720, title: "Pennypickle's Workshop", detail: '10:00 AM–12:00 PM in Old Town. First session of the day.', icon: '🎨' },
      { start: 720, end: 870, title: 'Naps + parent wine tasting', detail: 'Home for naps; Palumbo or Doffo are the tasting options.', icon: '😴' },
      { start: 870, end: 1050, title: 'Games at the house', detail: 'Planned game time starts around 3:00 PM.', icon: '🎲' },
      { start: 1050, end: 1320, title: 'Takeout + family tasting', detail: 'Dinner around 6:00 PM with a family wine-tasting evening.', icon: '🍕' }
    ]
  },
  {
    id: 'wed', weekday: 'Wednesday', shortDay: 'WED', date: 'August 5', dateShort: 'Aug 5', number: '5', accent: '#b65a74',
    summary: 'A relaxed morning, Danza Del Sol tasting and dinner at 1909.', status: 'Driver + dinner confirmed',
    events: [
      { time: 'Morning', start: 480, end: 690, title: 'Hang out at the house / free time', location: 'Temecula home base', icon: '☀️' },
      { time: '11:30 AM', start: 690, end: 920, title: 'Home for naps', location: 'Temecula home base', icon: '😴' },
      { time: '3:20 PM', start: 920, end: 930, title: 'Driver pickup', location: 'Temecula home base', note: 'Driver is booked.', icon: '🚙', confirmed: true, dateTime: '2026-08-05T15:20:00' },
      { time: '3:30–5:00 PM', start: 930, end: 1020, title: 'Wine tasting', location: 'Danza Del Sol Winery', icon: '🍇', directions: 'Danza Del Sol Winery Temecula CA', image: IMG.danza, imageAlt: 'Danza Del Sol Winery in Temecula', photoSource: 'Visit Temecula Valley', photoSourceUrl: 'https://www.visittemeculavalley.com/articles/post/25-best-things-to-do-in-temecula-california/' },
      { time: '5:30 PM', start: 1050, end: 1200, title: 'Dinner reservation', location: '1909 Temecula', note: 'About a 22 minute drive. Reservation confirmed.', icon: '🍽️', confirmed: true, dateTime: '2026-08-05T17:30:00', directions: '1909 Temecula CA' }
    ],
    slots: [
      { start: 480, end: 690, title: 'Free time at the house', detail: 'A slow morning before naps and the winery outing.', icon: '☀️' },
      { start: 690, end: 920, title: 'Nap time', detail: 'Home for naps beginning around 11:30 AM.', icon: '😴' },
      { start: 920, end: 930, title: 'Driver pickup', detail: 'The booked driver arrives at 3:20 PM.', icon: '🚙' },
      { start: 930, end: 1020, title: 'Danza Del Sol tasting', detail: 'Wine tasting from 3:30–5:00 PM.', icon: '🍇' },
      { start: 1020, end: 1050, title: 'Ride to dinner', detail: 'Head to Old Town for the 5:30 PM reservation.', icon: '🚙' },
      { start: 1050, end: 1200, title: 'Dinner at 1909 Temecula', detail: 'Reservation confirmed for 5:30 PM.', icon: '🍽️' },
      { start: 1200, end: 1320, title: 'Back to the house', detail: 'Relax after the full wine-country afternoon.', icon: '🌙' }
    ]
  },
  {
    id: 'thu', weekday: 'Thursday', shortDay: 'THU', date: 'August 6', dateShort: 'Aug 6', number: '6', accent: '#769160',
    summary: 'Sugarplum Zoo, naps, a Weins tasting and chef dinner.', status: 'Chef confirmed',
    events: [
      { time: '9:00 AM', start: 540, end: 660, title: 'Sugarplum Zoo', location: 'Sugarplum Farm', note: 'About a 6 minute drive. Opens at 9:00 AM.', icon: '🐾', directions: 'Sugarplum Farm Temecula CA' },
      { time: '11:00 AM', start: 660, end: 900, title: 'Home for naps', location: 'Temecula home base', note: 'Dad & I have a Weins wine tasting reservation at 12:00 PM.', icon: '😴' },
      { time: '12:00 PM', start: 720, end: 840, title: 'Dad & I wine tasting', location: 'Weins Cellars', icon: '🍷', directions: 'Weins Cellars Temecula CA', image: IMG.wiens, imageAlt: 'Weins Family Cellars tasting room', photoSource: 'Visit Temecula Valley', photoSourceUrl: 'https://www.visittemeculavalley.com/articles/post/25-best-things-to-do-in-temecula-california/' },
      { time: '6:00 PM', start: 1080, end: 1320, title: 'Chef dinner', location: 'Temecula home base', note: 'Confirmed.', icon: '👩‍🍳', confirmed: true, dateTime: '2026-08-06T18:00:00' }
    ],
    slots: [
      { start: 480, end: 540, title: 'Breakfast + get ready', detail: 'A quick morning before the zoo opens.', icon: '🥐' },
      { start: 540, end: 660, title: 'Sugarplum Zoo', detail: 'Planned for 9:00 AM; it is about a 6 minute drive.', icon: '🐾' },
      { start: 660, end: 720, title: 'Home for naps', detail: 'Nap time starts around 11:00 AM.', icon: '😴' },
      { start: 720, end: 840, title: 'Weins wine tasting', detail: 'Dad & I have a reservation at noon while the family is home for naps.', icon: '🍷' },
      { start: 840, end: 1080, title: 'Free afternoon at the house', detail: 'Pool, rest and time to get ready for dinner.', icon: '🕶️' },
      { start: 1080, end: 1320, title: 'Chef dinner at the house', detail: 'Confirmed for 6:00 PM.', icon: '👩‍🍳' }
    ]
  },
  {
    id: 'fri', weekday: 'Friday', shortDay: 'FRI', date: 'August 7', dateShort: 'Aug 7', number: '7', accent: '#8b6aa2',
    summary: 'Free time, Lorenzi Estate and dinner at Oscar’s.', status: 'Both reservations confirmed',
    events: [
      { time: 'Morning', start: 480, end: 660, title: 'Free time', location: 'Temecula home base', icon: '🕶️' },
      { time: '11:00 AM', start: 660, end: 840, title: 'Dad & I wine tasting', location: 'Lorenzi Estate Vineyards', note: 'Reservation confirmed.', icon: '🍷', confirmed: true, dateTime: '2026-08-07T11:00:00', directions: 'Lorenzi Estate Vineyards Temecula CA', image: IMG.lorenzi, imageAlt: 'Lorenzi Estate Vineyards in Temecula', photoSource: 'Veranda', photoSourceUrl: 'https://www.veranda.com/travel/g40360634/best-wineries-temecula/' },
      { time: '5:00 PM', start: 1020, end: 1200, title: 'Dinner reservation', location: "Oscar's Brewing Company", note: 'About a 15 minute drive. Reservation confirmed.', icon: '🍺', confirmed: true, dateTime: '2026-08-07T17:00:00', directions: "Oscar's Brewing Company Temecula CA" }
    ],
    slots: [
      { start: 480, end: 660, title: 'Free morning', detail: 'A relaxed start at the house.', icon: '🕶️' },
      { start: 660, end: 840, title: 'Lorenzi Estate tasting', detail: 'Dad & I have a confirmed reservation at 11:00 AM.', icon: '🍷' },
      { start: 840, end: 1020, title: 'Free afternoon', detail: 'Relax at the house before dinner.', icon: '☀️' },
      { start: 1020, end: 1200, title: "Dinner at Oscar's", detail: 'Reservation confirmed for 5:00 PM.', icon: '🍺' },
      { start: 1200, end: 1320, title: 'Last full evening', detail: 'Enjoy a relaxed night back at the house.', icon: '🌙' }
    ]
  },
  {
    id: 'sat', weekday: 'Saturday', shortDay: 'SAT', date: 'August 8', dateShort: 'Aug 8', number: '8', accent: '#dd8c76',
    summary: 'A relaxed final morning at Annie’s Café and Old Town.',
    events: [
      { time: '11:00 AM', start: 660, end: 780, title: "Annie's Café", location: "Annie's Cafe Temecula", note: 'Check the waitlist and call ahead. Brit-themed café.', icon: '☕', phone: '9512960107', directions: "Annie's Cafe Temecula CA" },
      { time: 'After brunch', start: 780, end: 1320, title: 'Explore Old Town / head home', location: 'Old Town Temecula', note: 'Keep the final day easy and flexible.', icon: '🌸', directions: 'Old Town Temecula CA' }
    ],
    slots: [
      { start: 480, end: 660, title: 'Easy final morning', detail: 'Pack up and take your time before brunch.', icon: '🧳' },
      { start: 660, end: 780, title: "Annie's Café", detail: 'Planned for 11:00 AM. Check the waitlist and call ahead.', icon: '☕' },
      { start: 780, end: 1320, title: 'Old Town + travel home', detail: 'A flexible finish to the family trip.', icon: '🌸' }
    ]
  }
];

const nearbyOptions = [
  { icon: '🐴', title: 'Longshadow Ranch', detail: 'Opens at 12:00 PM · about a 7 minute drive', destination: 'Longshadow Ranch Winery Temecula CA', image: IMG.longshadow, imageAlt: 'Longshadow Ranch Winery and vineyard', photoSource: 'Veranda', photoSourceUrl: 'https://www.veranda.com/travel/g40360634/best-wineries-temecula/' },
  { icon: '🚜', title: 'Peltzer', detail: 'Opens at 1:00 PM · farm animals · about a 6 minute drive', destination: 'Peltzer Winery Temecula CA', image: IMG.peltzer, imageAlt: 'Peltzer Family Cellars farm and winery', photoSource: 'Temecula Valley Winegrowers', photoSourceUrl: 'https://www.temeculawines.org/winery/peltzer-family-cellars/' },
  { icon: '🦆', title: 'Temecula Duck Pond', detail: 'Easy walk option · about a 14 minute drive', destination: 'Temecula Duck Pond Temecula CA', image: IMG.duck, imageAlt: 'Temecula Duck Pond', photoSource: 'City of Temecula / Flickr', photoSourceUrl: 'https://www.flickr.com/photos/cityoftemecula/sets/72157606340778543/' },
  { icon: '🛝', title: 'Harveston Community Park', detail: 'Playground and lake · about a 20 minute drive', destination: 'Harveston Community Park Temecula CA', image: IMG.harveston, imageAlt: 'Harveston Community Park', photoSource: 'City of Temecula / Flickr', photoSourceUrl: 'https://www.flickr.com/photos/cityoftemecula/sets/72157611342093378' }
];

const confirmations = [
  'Ponte dinner reservation · Monday at 5:30 PM',
  'Driver pickup · Wednesday at 3:20 PM',
  '1909 Temecula dinner reservation · Wednesday at 5:30 PM',
  'Chef dinner at the house · Thursday at 6:00 PM',
  'Lorenzi Estate Vineyards · Friday at 11:00 AM',
  "Oscar's Brewing Company · Friday at 5:00 PM"
];

const wheelTimes = Array.from({ length: 29 }, (_, index) => 480 + index * 30);
let explorerDayIndex = 0;
let selectedWheelIndex = 8;
let scrollTimer;
let customPlans = [];
let wineCount = 0;

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const minuteLabel = minutes => {
  const hour24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour = hour24 % 12 || 12;
  return `${hour}:${String(mins).padStart(2, '0')} ${suffix}`;
};
const timeToMinutes = value => {
  const [hour, minute] = value.split(':').map(Number);
  return hour * 60 + minute;
};
