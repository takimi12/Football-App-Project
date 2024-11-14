// Typ dla zawodników
export interface Player {
	id: string
	firstName: string
	lastName: string
	teamId: string | null
}

//   // Typ dla meczów
//   interface Game {
//     id: string;
//     title: string;
//     date: string;  // Data meczu w formacie ISO 8601
//     location: string;
//     duration: number;  // Czas trwania meczu w minutach
//     result: string;  // Wynik meczu w formacie 'x-y'
//     team1Id: string;
//     team2Id: string;
//   }

//   // Typ główny dla bazy danych
//   interface Database {
//     players: Player[];
//     teams: Team[];
//     games: Game[];
//   }
