export interface LocationData {
  [province: string]: string[];
}

export interface CountryLocations {
  PL: LocationData;
  US: LocationData;
}

export const locations: CountryLocations = {
  PL: {
    'Dolnośląskie': ['Wrocław', 'Wałbrzych', 'Legnica', 'Jelenia Góra'],
    'Kujawsko-Pomorskie': ['Bydgoszcz', 'Toruń', 'Włocławek', 'Grudziądz'],
    'Lubelskie': ['Lublin', 'Zamość', 'Chełm', 'Biała Podlaska'],
    'Lubuskie': ['Zielona Góra', 'Gorzów Wielkopolski'],
    'Łódzkie': ['Łódź', 'Piotrków Trybunalski', 'Pabianice', 'Tomaszów Mazowiecki'],
    'Małopolskie': ['Kraków', 'Tarnów', 'Nowy Sącz', 'Oświęcim'],
    'Mazowieckie': ['Warszawa', 'Radom', 'Płock', 'Siedlce', 'Pruszków'],
    'Opolskie': ['Opole', 'Kędzierzyn-Koźle', 'Nysa'],
    'Podkarpackie': ['Rzeszów', 'Przemyśl', 'Stalowa Wola', 'Mielec'],
    'Podlaskie': ['Białystok', 'Suwałki', 'Łomża'],
    'Pomorskie': ['Gdańsk', 'Gdynia', 'Sopot', 'Słupsk', 'Tczew'],
    'Śląskie': ['Katowice', 'Częstochowa', 'Sosnowiec', 'Gliwice', 'Zabrze', 'Bytom', 'Bielsko-Biała'],
    'Świętokrzyskie': ['Kielce', 'Ostrowiec Świętokrzyski', 'Starachowice'],
    'Warmińsko-Mazurskie': ['Olsztyn', 'Elbląg', 'Ełk'],
    'Wielkopolskie': ['Poznań', 'Kalisz', 'Konin', 'Piła', 'Gniezno'],
    'Zachodniopomorskie': ['Szczecin', 'Koszalin', 'Stargard', 'Świnoujście'],
  },
  US: {
    'California': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
    'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
    'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
    'Illinois': ['Chicago', 'Springfield', 'Naperville'],
    'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown'],
    'Ohio': ['Columbus', 'Cleveland', 'Cincinnati'],
    'Georgia': ['Atlanta', 'Savannah', 'Augusta'],
    'North Carolina': ['Charlotte', 'Raleigh', 'Durham'],
    'Michigan': ['Detroit', 'Grand Rapids', 'Ann Arbor'],
    'New Jersey': ['Newark', 'Jersey City', 'Trenton'],
    'Virginia': ['Virginia Beach', 'Richmond', 'Norfolk'],
    'Washington': ['Seattle', 'Tacoma', 'Spokane'],
    'Arizona': ['Phoenix', 'Tucson', 'Mesa'],
    'Massachusetts': ['Boston', 'Worcester', 'Cambridge'],
    'Tennessee': ['Nashville', 'Memphis', 'Knoxville'],
    'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville'],
    'Missouri': ['Kansas City', 'St. Louis', 'Springfield'],
    'Maryland': ['Baltimore', 'Annapolis', 'Rockville'],
    'Colorado': ['Denver', 'Colorado Springs', 'Aurora'],
  },
};

export type CountryCode = keyof CountryLocations;

export function getProvinces(country: CountryCode): string[] {
  return Object.keys(locations[country]).sort();
}

export function getCities(country: CountryCode, province: string): string[] {
  return locations[country][province] ?? [];
}

export function filterCities(country: CountryCode, province: string, query: string): string[] {
  const cities = getCities(country, province);
  if (!query) return cities;
  const lower = query.toLowerCase();
  return cities.filter((city) => city.toLowerCase().includes(lower));
}
