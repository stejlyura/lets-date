import type { userData } from "../types/type-user";

import Anna from '@/assets/img/Anna.webp';
import Anfa from '@/assets/img/Anfa.jpg'
import Angel from '@/assets/img/Angel.jpg'
import Alla from '@/assets/img/Alla.jpg'
import Eliza from '@/assets/img/Eliza.webp'
import Karina from '@/assets/img/Karina.jpg'
import Kittie from '@/assets/img/Kittie.jpg'
import Ksysha from '@/assets/img/Ksysha.webp'
import Nastya from '@/assets/img/Nastya.jpg'
import Vlada from '@/assets/img/Vlada.jpg'
import Yana from '@/assets/img/Yana.jpg'
import Lee from "@/assets/img/Lee.jpg"
import Nora from '@/assets/img/Nora.jpg'
import DanaAlice from '@/assets/img/Dana & Alice.jpg'
import Diana from '@/assets/img/Diana.jpg'
import Marina from '@/assets/img/Marina.jpg'


export const projectBD: userData[] = [
  { data_id: 13, fname: "Nora", age: 20, isLike: true, mainImg: Nora, isActive: false, range: 78, additionalInfo: { ocupation: "UX/UI Designer", isSmoking: false, isDrinking: true, aboutMe: "I love minimalism, night walks, and good playlists. Looking for someone with a sense of humor.", isDogs: true, isCats: false, hobbies: ["design", "photography", "coffee", "travel"] } },
  { data_id: 1, fname: "Anna", age: 24, isLike: false, mainImg: Anna, isActive: true, range: 35, additionalInfo: { ocupation: "Marketing Manager", isSmoking: false, isDrinking: true, aboutMe: "I love events, new places, and spontaneous trips. I value honesty and respect.", isDogs: false, isCats: true, hobbies: ["marketing", "events", "reading", "yoga"] } },
  { data_id: 2, fname: "Anfa", age: 23, isLike: true, mainImg: Anfa, isActive: true, range: 62, additionalInfo: { ocupation: "Front-end Developer", isSmoking: false, isDrinking: false, aboutMe: "Code by day, series/sport by night. I like people who can communicate directly.", isDogs: true, isCats: true, hobbies: ["coding", "gym", "movies", "music"] } },
  { data_id: 3, fname: "Angel", age: 22, isLike: false, mainImg: Angel, isActive: false, range: 90, additionalInfo: { ocupation: "Model", isSmoking: true, isDrinking: true, aboutMe: "I’m into aesthetics in everything: photos, outfits, mood. If you are too — we’ll match.", isDogs: false, isCats: true, hobbies: ["fashion", "photoshoots", "makeup", "art"] } },
  { data_id: 4, fname: "Alla", age: 25, isLike: true, mainImg: Alla, isActive: true, range: 41, additionalInfo: { ocupation: "Project Manager", isSmoking: false, isDrinking: true, aboutMe: "I like order, but not boredom. I need someone mature and calm рядом.", isDogs: true, isCats: false, hobbies: ["planning", "travel", "running", "podcasts"] } },
  { data_id: 5, fname: "Eliza", age: 21, isLike: false, mainImg: Eliza, isActive: true, range: 55, additionalInfo: { ocupation: "Student", isSmoking: false, isDrinking: false, aboutMe: "I study, work, and dream big. I love a cozy vibe and people without toxicity.", isDogs: false, isCats: true, hobbies: ["studying", "books", "cooking", "drawing"] } },
  { data_id: 6, fname: "Karina", age: 24, isLike: true, mainImg: Karina, isActive: false, range: 28, additionalInfo: { ocupation: "Fitness Trainer", isSmoking: false, isDrinking: true, aboutMe: "Sport is my vibe. I don’t expect perfection, but I love when someone keeps their word.", isDogs: true, isCats: false, hobbies: ["fitness", "nutrition", "hiking", "dance"] } },
  { data_id: 7, fname: "Kittie", age: 23, isLike: false, mainImg: Kittie, isActive: true, range: 66, additionalInfo: { ocupation: "Content Creator", isSmoking: true, isDrinking: false, aboutMe: "I create content and love creativity and lightness. If you’re not a buzzkill — welcome 🙂", isDogs: true, isCats: true, hobbies: ["content", "tiktok", "photo", "travel"] } },
  { data_id: 8, fname: "Ksysha", age: 22, isLike: true, mainImg: Ksysha, isActive: false, range: 73, additionalInfo: { ocupation: "Barista", isSmoking: false, isDrinking: true, aboutMe: "Coffee is my love. I want simple relationships with support and real conversations.", isDogs: false, isCats: true, hobbies: ["coffee", "music", "walks", "cinema"] } },
  { data_id: 9, fname: "Nastya", age: 26, isLike: false, mainImg: Nastya, isActive: true, range: 47, additionalInfo: { ocupation: "HR Specialist", isSmoking: false, isDrinking: true, aboutMe: "I value smart and kind people. I love travel, cozy evenings, and ambitious vibes.", isDogs: true, isCats: true, hobbies: ["psychology", "travel", "books", "yoga"] } },
  { data_id: 10, fname: "Vlada", age: 24, isLike: true, mainImg: Vlada, isActive: true, range: 39, additionalInfo: { ocupation: "Photographer", isSmoking: false, isDrinking: false, aboutMe: "I capture moments in photos and value sincerity in life. I love nature and silence.", isDogs: true, isCats: false, hobbies: ["photography", "nature", "editing", "travel"] } },
  { data_id: 11, fname: "Yana", age: 23, isLike: false, mainImg: Yana, isActive: false, range: 82, additionalInfo: { ocupation: "SMM Manager", isSmoking: true, isDrinking: true, aboutMe: "It’s important that it feels easy. I love movement, concerts, and spontaneity.", isDogs: false, isCats: true, hobbies: ["smm", "concerts", "fashion", "travel"] } },
  { data_id: 12, fname: "Lee", age: 19, isLike: true, mainImg: Lee, isActive: true, range: 24, additionalInfo: { ocupation: "Illustrator", isSmoking: false, isDrinking: false, aboutMe: "I draw every day and enjoy creativity. I want someone who supports big dreams.", isDogs: true, isCats: true, hobbies: ["drawing", "art", "music", "anime"] } },
  { data_id: 14, fname: "Dana & Alice", age: 20, isLike: false, mainImg: DanaAlice, isActive: false, range: 58, additionalInfo: { ocupation: "Event Hosts", isSmoking: false, isDrinking: true, aboutMe: "Two friends in one profile 😄 We love traveling, parties, and kind people around.", isDogs: false, isCats: true, hobbies: ["events", "travel", "music", "photo"] } },
  { data_id: 15, fname: "Diana", age: 19, isLike: true, mainImg: Diana, isActive: false, range: 70, additionalInfo: { ocupation: "Makeup Artist", isSmoking: false, isDrinking: true, aboutMe: "I love beauty and people who aren’t afraid to be themselves. No games, no toxicity.", isDogs: true, isCats: false, hobbies: ["makeup", "beauty", "shopping", "movies"] } },
  { data_id: 16, fname: "Marina", age: 19, isLike: false, mainImg: Marina, isActive: true, range: 31, additionalInfo: { ocupation: "Nail Technician", isSmoking: true, isDrinking: false, aboutMe: "I’m all for calm vibes, humor, and real care. I love cozy places and tasty food.", isDogs: false, isCats: true, hobbies: ["nails", "cooking", "walks", "series"] } },
]