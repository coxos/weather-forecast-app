# 🌤️ Weather Forecast App

Modern időjárás előrejelző alkalmazás React, TypeScript és Tailwind CSS technológiákkal.

## 📋 Projekt áttekintés

Ez az alkalmazás egy teljes funkcionalitású időjárás előrejelző, amely lehetővé teszi a felhasználók számára:

- Város keresése és kiválasztása
- Aktuális időjárás megtekintése
- 7 napos előrejelzés böngészése
- Interaktív hőmérséklet grafikon
- Responsive design (desktop és mobile)

## ✨ Funkciók

### 🏙️ Város kiválasztása

- **Intelligens keresés**: Város neve alapján keresés az Open Meteo Geocoding API segítségével
- **Többszörös találatok**: Ha több város is megfelel, listában megjelenítés kiválasztáshoz
- **Automatikus modal**: Első használatnál automatikusan megnyílik a város választó
- **Perzisztálás**: Kiválasztott város tárolása a böngészőben (localStorage)

### 🌡️ Időjárás megjelenítés

- **Aktuális időjárás**: Hőmérséklet, időjárási állapot ikonokkal
- **7 napos előrejelzés**: Nap neve, időjárás ikon, csapadék valószínűség, min/max hőmérséklet
- **Real-time adatok**: Open Meteo Weather API integrációval

### 📊 Interaktív grafikon

- **Hőmérséklet trend**: 7 napos maximum hőmérséklet grafikon
- **Responsive chart**: Recharts könyvtár használatával
- **Hover tooltips**: Részletes információk grafikon elemeken

### 📱 Responsive Design

- **Mobile-first**: Optimalizált mobil élmény
- **Desktop layout**: Kétoszlopos elrendezés nagyobb képernyőkön
- **Modern UI**: Glassmorphism effektekkel és smooth animációkkal

## 🚀 Technológiai stack

### Frontend

- **React 19** - Modern hooks és funkcionalitás
- **TypeScript** - Type safety és fejlesztői élmény
- **Vite** - Gyors build tool és hot reload
- **Tailwind CSS v4** - Utility-first CSS framework

### State Management & Data Fetching

- **TanStack React Query v5** - Server state management és caching
- **Custom hooks** - Újrafelhasználható state logika

### UI Komponensek

- **Radix UI** - Accessible headless komponensek
- **Recharts** - Interaktív grafikonok
- **Emoji ikonok** - Weather és UI state ikonok

### API Integráció

- **Open Meteo Weather API** - Időjárás adatok
- **Open Meteo Geocoding API** - Város keresés

## 📦 Telepítés és futtatás

### Előfeltételek

- v22.17.0 (lásd .nvmrc fájl)
- npm vagy yarn

### Telepítés

```bash
# Repository klónozása
git clone https://github.com/coxos/weather-forecast-app.git
cd weather-forecast-app

# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Build készítése
npm run build

# Preview a build-ből
npm run preview
```

### Első használat

1. Alkalmazás betöltésekor automatikusan megnyílik a város választó modal
2. Írja be a kívánt város nevét a keresőmezőbe
3. Kattintson a "Keresés" gombra
4. Válassza ki a megfelelő várost a találatok közül

### Város váltása

1. Kattintson a város nevére a felső részen
2. Új keresést indíthat a modalban
3. A kiválasztott város automatikusan mentésre kerül

### Időjárás információk

- **Aktuális időjárás**: Nagy hőmérséklet kijelzés, időjárás ikon és leírás
- **7 napos előrejelzés**: Napok listája részletes információkkal
- **Hőmérséklet grafikon**: Interaktív chart a hőmérséklet alakulásáról

## 🎨 Design

Az alkalmazás a modern glassmorphism design trendeket követi:

Figma design: [Időjárás App Design](https://www.figma.com/file/zMVbPAOqbBfJ7vPwZct9WX/Id%C5%91j%C3%A1r%C3%A1s)

## 🤝 Közreműködés

Ez egy bemutató projekt, de javaslatokat és fejlesztéseket szívesen fogadok:

1. Fork a repository
2. Feature branch létrehozása (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Pull Request létrehozása

## 📄 Licenc

Ez a projekt bemutató célokra készült.

## 👨‍💻 Szerző

**Görbe János**

- GitHub: [@coxos](https://github.com/coxos)

---

_Készítve React ❤️ és TypeScript ⚡ technológiákkal_
