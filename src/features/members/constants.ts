import type { Member } from "./types/member";

export const MOCK_MEMBERS: Member[] = [
  {
    id: 1,
    fullName: "Andrea Romero",
    profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
    location: "CABA, Argentina",
    joinedAt: new Date(2022, 3, 12).getTime(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 2,
    fullName: "Martín Pérez",
    profilePhoto: "https://randomuser.me/api/portraits/men/72.jpg",
    location: "La Plata, Argentina",
    joinedAt: new Date(2021, 9, 1).getTime(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 3,
    fullName: "Lucía Gómez",
    profilePhoto: "https://randomuser.me/api/portraits/women/12.jpg",
    location: "Córdoba, Argentina",
    joinedAt: new Date(2023, 1, 20).getTime(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
