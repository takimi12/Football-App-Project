# About The Project

**Sports Statistics Application** is a comprehensive platform designed to manage sports teams, players, and game statistics. This application offers a user-friendly interface to track team performance, manage player rosters, and analyze game statistics with dynamic visualizations. It's built to streamline team management and data analysis for sports enthusiasts, coaches, and analysts.

## Features

- **Player Database Management** with full CRUD operations for adding, updating, viewing, and deleting players.
- **Team Management System** to assign players to teams, track team details, and manage rosters.
- **Game Records** with detailed statistics such as match scores, durations, and locations.
- **Interactive Statistics Dashboard** with interactive charts for easy visualization of data trends.
- **Light/Dark Theme Support** for a customizable user experience.
- **Real-Time Data Validation** ensuring correct data input with live feedback.
- **Responsive Design** for seamless use on any device, including desktops, tablets, and smartphones.

## Architecture

graph TD
    A[Frontend React App] --> B[React Query]
    B --> C[JSON Server API]
    C --> D[(JSON Database)]
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#dfd,stroke:#333,stroke-width:2px
    style D fill:#fdd,stroke:#333,stroke-width:2px
# Tech Stack

| Technology           | Purpose                                      |
|----------------------|----------------------------------------------|
| React                | Frontend framework                           |
| React Query          | Data fetching and cache management           |
| Styled Components    | Styling and theming                          |
| JSON Server          | Backend mock API                             |
| ESLint               | Code quality and style enforcement           |
| Husky                | Git hooks for code quality                   |

## Local Development

Prerequisites: Node.js v20.

git clone https://github.com/your-username/car-configurator
cd vite-project

# Install dependencies

npm install

# Start JSON server (in a separate terminal)

json-server --watch db.json --port 3000

# Start development server

npm run start
    ```

# Available Scripts

| Script               | Description                                  |
|----------------------|----------------------------------------------|
| `npm run dev`         | Starts development server                    |
| `npm run build`       | Creates production build                     |
| `npm run server`      | Starts JSON Server                           |
| `npm run lint`        | Runs ESLint to check code quality            |
| `npm run lint:fix`    | Automatically fixes fixable ESLint issues    |
| `npm test`            | Runs test suite                              |
| `npm run format`      | Formats code with Prettier                   |

# Implementation Details

## Completed Features

### Database Structure
- **Players** collection with fields: name, surname, team relation.
- **Teams** collection with fields: name, founding year, location.
- **Games** collection with fields: date, title, location, duration, and scores.

### User Interface
- Four main tabs: Players, Teams, Games, and Statistics.
- Full CRUD operations for players and teams.
- Game Management system for tracking match details.
- Statistics Dashboard that visualizes data with interactive charts.

### Data Validation
- **Form Validation**: Ensures that all input fields adhere to correct data formats and constraints.
- **Business Logic Validation**: Prevents actions like deleting players from active teams or assigning invalid data.

### UI/UX
- **Light/Dark Theme Implementation**: Users can toggle between light and dark themes for a personalized experience.
- **Responsive Design**: The layout adapts to any screen size, ensuring a great experience on all devices.
- **Interactive Data Tables**: Users can sort, filter, and interact with player and game data.
- **Confirmation Dialogs**: Critical actions such as deleting players or teams require user confirmation to prevent accidental actions.

## Future Plans

### Enhanced Statistics
- **Advanced Analytics Dashboard**: To provide deeper insights into team and player performance.
- **Player Performance Metrics**: Track and display individual player statistics like goals, assists, and other key performance indicators.
- **Team Ranking System**: Introduce rankings based on various performance metrics.
- **Historical Trend Analysis**: Visualize how team or player performance has evolved over time.

### Feature Additions
- **Export Functionality**: Allow users to export game and player data into CSV, PDF, or Excel formats.
- **Player Transfer History**: Track player transfers between teams and store transfer details.
- **Tournament Management**: Create and manage tournaments with teams, game schedules, and results.
- **Mobile Application**: Build a mobile version of the app for iOS and Android platforms.

### Technical Improvements
- **Real-Time Updates**: Implement WebSockets or similar technologies for real-time updates when game stats are modified.
- **Performance Optimizations**: Improve app performance, especially in loading times and responsiveness.
- **Automated Testing**: Set up unit, integration, and end-to-end tests to ensure app stability.
- **CI/CD Pipeline**: Implement Continuous Integration and Continuous Deployment pipelines for automated builds and deployments.

# Live Demo
[Coming Soon]

# Author Contact
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]
- GitHub: [Your GitHub]



# O projekcie

**Aplikacja do statystyk sportowych** to kompleksowa platforma zaprojektowana do zarządzania drużynami sportowymi, zawodnikami i statystykami meczów. Aplikacja oferuje intuicyjny interfejs do śledzenia wyników drużyn, zarządzania listami zawodników oraz analizy statystyk meczów za pomocą dynamicznych wizualizacji. Została stworzona, aby uprościć zarządzanie drużynami i analizę danych dla miłośników sportu, trenerów i analityków.

## Funkcje

- **Zarządzanie bazą zawodników** z pełną funkcjonalnością CRUD do dodawania, aktualizowania, przeglądania i usuwania zawodników.
- **System zarządzania drużynami** umożliwiający przypisywanie zawodników do drużyn, śledzenie szczegółów drużyny i zarządzanie składami.
- **Rejestry meczów** z szczegółowymi statystykami, takimi jak wyniki meczów, czas trwania i lokalizacja.
- **Interaktywna tablica statystyk** z interaktywnymi wykresami do łatwego wizualizowania trendów danych.
- **Wsparcie dla trybu jasnego/ciemnego** dla spersonalizowanego doświadczenia użytkownika.
- **Walidacja danych w czasie rzeczywistym** zapewniająca poprawność danych przy wprowadzaniu z natychmiastową informacją zwrotną.
- **Responsywny design** umożliwiający płynne korzystanie z aplikacji na różnych urządzeniach, w tym na komputerach, tabletach i smartfonach.

## Architektura

# Dostępne skrypty

| Skrypt               | Opis                                                       |
|----------------------|------------------------------------------------------------|
| `npm run dev`         | Uruchamia serwer deweloperski                               |
| `npm run build`       | Tworzy wersję produkcyjną                                   |
| `npm run server`      | Uruchamia JSON Server                                      |
| `npm run lint`        | Uruchamia ESLint do sprawdzenia jakości kodu               |
| `npm run lint:fix`    | Automatycznie naprawia napotkane problemy ESLint           |
| `npm test`            | Uruchamia zestaw testów                                    |
| `npm run format`      | Formatuje kod za pomocą Prettiera                          |

# Szczegóły implementacji

## Zrealizowane funkcje

### Struktura bazy danych
- **Kolekcja Players** z polami: imię, nazwisko, powiązanie z drużyną.
- **Kolekcja Teams** z polami: nazwa, rok założenia, lokalizacja.
- **Kolekcja Games** z polami: data, tytuł, lokalizacja, czas trwania, wyniki.

### Interfejs użytkownika
- Cztery główne zakładki: **Zawodnicy**, **Drużyny**, **Mecze** i **Statystyki**.
- Pełne operacje CRUD dla zawodników i drużyn.
- System zarządzania meczami do śledzenia szczegółów spotkań.
- Tablica statystyk wizualizująca dane za pomocą interaktywnych wykresów.

### Walidacja danych
- **Walidacja formularzy**: Zapewnienie, że wszystkie pola wejściowe są zgodne z odpowiednimi formatami danych i ograniczeniami.
- **Walidacja logiki biznesowej**: Zapobieganie akcjom takim jak usuwanie zawodników z aktywnych drużyn lub przypisywanie nieprawidłowych danych.

### UI/UX
- **Implementacja trybu jasnego/ciemnego**: Użytkownicy mogą przełączać się między jasnym a ciemnym trybem dla spersonalizowanego doświadczenia.
- **Responsywny design**: Układ dopasowuje się do rozmiaru ekranu, zapewniając świetne wrażenia na wszystkich urządzeniach.
- **Interaktywne tabele danych**: Użytkownicy mogą sortować, filtrować i wchodzić w interakcję z danymi zawodników i meczów.
- **Dialogi potwierdzenia**: Krytyczne akcje, takie jak usuwanie zawodników lub drużyn, wymagają potwierdzenia użytkownika, aby zapobiec przypadkowym działaniom.

# Plany na przyszłość

## Rozszerzone statystyki
- **Zaawansowana tablica statystyk**: Dostarczanie głębszych wglądów w wyniki drużyn i zawodników.
- **Metryki wyników zawodników**: Śledzenie i wyświetlanie indywidualnych statystyk zawodników, takich jak bramki, asysty i inne wskaźniki wydajności.
- **System rankingowy drużyn**: Wprowadzenie rankingów opartych na różnych wskaźnikach wydajności.
- **Analiza trendów historycznych**: Wizualizacja, jak wydajność drużyn lub zawodników zmieniała się w czasie.

## Dodanie funkcji
- **Funkcjonalność eksportu**: Pozwoli użytkownikom eksportować dane o meczach i zawodnikach do formatów CSV, PDF lub Excel.
- **Historia transferów zawodników**: Śledzenie transferów zawodników między drużynami i przechowywanie szczegółów transferów.
- **Zarządzanie turniejami**: Tworzenie i zarządzanie turniejami z drużynami, harmonogramami meczów i wynikami.
- **Aplikacja mobilna**: Stworzenie mobilnej wersji aplikacji na platformy iOS i Android.

## Poprawki techniczne
- **Aktualizacje w czasie rzeczywistym**: Wprowadzenie WebSocketów lub podobnych technologii dla aktualizacji w czasie rzeczywistym, gdy dane o meczach są zmieniane.
- **Optymalizacja wydajności**: Poprawa wydajności aplikacji, szczególnie w zakresie czasów ładowania i responsywności.
- **Automatyczne testowanie**: Ustawienie testów jednostkowych, integracyjnych i end-to-end, aby zapewnić stabilność aplikacji.
- **Pipeline CI/CD**: Implementacja pipeline'u Continuous Integration i Continuous Deployment dla zautomatyzowanych buildów i wdrożeń.

# Demo na żywo
[Wkrótce]

# Kontakt z autorem
- **LinkedIn**: [Twój LinkedIn]
- **Email**: [Twój Email]
- **GitHub**: [Twój GitHub]
