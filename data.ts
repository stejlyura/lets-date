const profilesArray = [
    {
        "id": "f4b82d31-9c1a-4f5e-a67b-12d98c3e4b7a",
        "name": "Emma",
        "age": 22,
        "dateOfBirth": "2004-03-15",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" },
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" }
        ],
        "about": "Life is too short for bad coffee. I love spending weekends finding hidden gems in the city.",
        "Country": "USA",
        "city": "Chicago",
        "timezone": "America/Chicago"
    },
    {
        "id": "a1c9e8f7-6b5d-4a3c-8f2e-9d8c7b6a5f4e",
        "name": "Olivia",
        "age": 25,
        "dateOfBirth": "2001-11-02",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" },
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" },
            { "typeId": "h6", "name": "Cooking", "iconClass": "fas fa-utensils" }
        ],
        "about": "Animal lover and outdoor enthusiast. Nature is my happy place.",
        "Country": "Canada",
        "city": "Vancouver",
        "timezone": "America/Vancouver"
    },
    {
        "id": "7b6c5d4e-3f2a-1b0c-9d8e-7f6a5b4c3d2e",
        "name": "Ava",
        "age": 19,
        "dateOfBirth": "2007-07-21",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h8", "name": "Music", "iconClass": "fas fa-music" },
            { "typeId": "h10", "name": "Art & Design", "iconClass": "fas fa-palette" }
        ],
        "about": "Creative soul with a love for aesthetics. When I'm not working, you can find me sketching or at a gallery.",
        "Country": "UK",
        "city": "London",
        "timezone": "Europe/London"
    },
    {
        "id": "2e3d4c5b-a6f7-8e9d-0c1b-2a3f4e5d6c7b",
        "name": "Isabella",
        "age": 27,
        "dateOfBirth": "1999-01-10",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" },
            { "typeId": "h5", "name": "Photography", "iconClass": "fas fa-camera" },
            { "typeId": "h2", "name": "Yoga", "iconClass": "fas fa-om" }
        ],
        "about": "Passionate about exploring new places and trying new cuisines. Always looking for the next adventure.",
        "Country": "Australia",
        "city": "Sydney",
        "timezone": "Australia/Sydney"
    },
    {
        "id": "c5b4a3f2-1e0d-9c8b-7a6f-5e4d3c2b1a0f",
        "name": "Sophia",
        "age": 21,
        "dateOfBirth": "2005-09-05",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h9", "name": "Gaming", "iconClass": "fas fa-gamepad" },
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" }
        ],
        "about": "Tech geek by day, avid gamer by night. Always up for a co-op session.",
        "Country": "USA",
        "city": "Austin",
        "timezone": "America/Chicago"
    },
    {
        "id": "9d8e7f6a-5b4c-3d2e-1f0a-9b8c7d6e5f4a",
        "name": "Mia",
        "age": 24,
        "dateOfBirth": "2002-05-18",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h2", "name": "Yoga", "iconClass": "fas fa-om" },
            { "typeId": "h6", "name": "Cooking", "iconClass": "fas fa-utensils" }
        ],
        "about": "Health and wellness advocate. Finding balance between hitting the gym and baking sweet treats.",
        "Country": "Germany",
        "city": "Berlin",
        "timezone": "Europe/Berlin"
    },
    {
        "id": "3a2b1c0d-9e8f-7a6b-5c4d-3e2f1a0b9c8d",
        "name": "Amelia",
        "age": 26,
        "dateOfBirth": "2000-12-30",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" },
            { "typeId": "h8", "name": "Music", "iconClass": "fas fa-music" }
        ],
        "about": "Driven and ambitious. Believes in continuous learning and pushing boundaries. Let's build something great.",
        "Country": "Spain",
        "city": "Barcelona",
        "timezone": "Europe/Madrid"
    },
    {
        "id": "f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6",
        "name": "Harper",
        "age": 18,
        "dateOfBirth": "2008-04-12",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" },
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" }
        ],
        "about": "Friendly, outgoing, and always ready for a good conversation over drinks.",
        "Country": "USA",
        "city": "Los Angeles",
        "timezone": "America/Los_Angeles"
    },
    {
        "id": "d1c2b3a4-9f8e-7d6c-5b4a-3f2e1d0c9b8a",
        "name": "Evelyn",
        "age": 23,
        "dateOfBirth": "2003-08-25",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" },
            { "typeId": "h5", "name": "Photography", "iconClass": "fas fa-camera" }
        ],
        "about": "Bookworm who loves getting lost in different worlds. Currently reading 3 books at once.",
        "Country": "France",
        "city": "Paris",
        "timezone": "Europe/Paris"
    },
    {
        "id": "b9a8c7d6-e5f4-a3b2-c1d0-e9f8a7b6c5d4",
        "name": "Abigail",
        "age": 20,
        "dateOfBirth": "2006-02-14",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h8", "name": "Music", "iconClass": "fas fa-music" },
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" }
        ],
        "about": "Music is my therapy. Frequent concert-goer and vinyl collector.",
        "Country": "UK",
        "city": "Manchester",
        "timezone": "Europe/London"
    },
    {
        "id": "a0b1c2d3-e4f5-a6b7-c8d9-e0f1a2b3c4d5",
        "name": "Emily",
        "age": 25,
        "dateOfBirth": "2001-06-08",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h6", "name": "Cooking", "iconClass": "fas fa-utensils" },
            { "typeId": "h10", "name": "Art & Design", "iconClass": "fas fa-palette" }
        ],
        "about": "Life is too short for bad coffee. I love spending weekends finding hidden gems in the city.",
        "Country": "Canada",
        "city": "Toronto",
        "timezone": "America/Toronto"
    },
    {
        "id": "f5e4d3c2-b1a0-f9e8-d7c6-b5a4f3e2d1c0",
        "name": "Elizabeth",
        "age": 27,
        "dateOfBirth": "1999-10-22",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" },
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" }
        ],
        "about": "Driven and ambitious. Believes in continuous learning and pushing boundaries. Let's build something great.",
        "Country": "USA",
        "city": "New York",
        "timezone": "America/New_York"
    },
    {
        "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        "name": "Mila",
        "age": 22,
        "dateOfBirth": "2004-01-05",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" },
            { "typeId": "h9", "name": "Gaming", "iconClass": "fas fa-gamepad" }
        ],
        "about": "Animal lover and outdoor enthusiast. Nature is my happy place.",
        "Country": "Australia",
        "city": "Melbourne",
        "timezone": "Australia/Melbourne"
    },
    {
        "id": "9f8e7d6c-5b4a-3f2e-1d0c-9b8a7f6e5d4c",
        "name": "Ella",
        "age": 19,
        "dateOfBirth": "2007-09-17",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h2", "name": "Yoga", "iconClass": "fas fa-om" },
            { "typeId": "h5", "name": "Photography", "iconClass": "fas fa-camera" }
        ],
        "about": "Creative soul with a love for aesthetics. When I'm not working, you can find me sketching or at a gallery.",
        "Country": "Germany",
        "city": "Munich",
        "timezone": "Europe/Berlin"
    },
    {
        "id": "3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b",
        "name": "Avery",
        "age": 24,
        "dateOfBirth": "2002-12-03",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" },
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" }
        ],
        "about": "Passionate about exploring new places and trying new cuisines. Always looking for the next adventure.",
        "Country": "Spain",
        "city": "Madrid",
        "timezone": "Europe/Madrid"
    },
    {
        "id": "d4c3b2a1-e5f6-a7b8-c9d0-e1f2a3b4c5d6",
        "name": "Sofia",
        "age": 21,
        "dateOfBirth": "2005-04-28",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h8", "name": "Music", "iconClass": "fas fa-music" },
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" }
        ],
        "about": "Health and wellness advocate. Finding balance between hitting the gym and baking sweet treats.",
        "Country": "France",
        "city": "Lyon",
        "timezone": "Europe/Paris"
    },
    {
        "id": "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        "name": "Camila",
        "age": 26,
        "dateOfBirth": "2000-07-11",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h6", "name": "Cooking", "iconClass": "fas fa-utensils" },
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" }
        ],
        "about": "Friendly, outgoing, and always ready for a good conversation over drinks.",
        "Country": "USA",
        "city": "Miami",
        "timezone": "America/New_York"
    },
    {
        "id": "c2b1a0f9-e8d7-c6b5-a4f3-e2d1c0b9a8f7",
        "name": "Aria",
        "age": 23,
        "dateOfBirth": "2003-03-29",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h10", "name": "Art & Design", "iconClass": "fas fa-palette" },
            { "typeId": "h9", "name": "Gaming", "iconClass": "fas fa-gamepad" }
        ],
        "about": "Tech geek by day, avid gamer by night. Always up for a co-op session.",
        "Country": "UK",
        "city": "Birmingham",
        "timezone": "Europe/London"
    },
    {
        "id": "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        "name": "Scarlett",
        "age": 18,
        "dateOfBirth": "2008-11-14",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" },
            { "typeId": "h5", "name": "Photography", "iconClass": "fas fa-camera" }
        ],
        "about": "Bookworm who loves getting lost in different worlds. Currently reading 3 books at once.",
        "Country": "Canada",
        "city": "Montreal",
        "timezone": "America/Toronto"
    },
    {
        "id": "a9b8c7d6-e5f4-a3b2-c1d0-e9f8a7b6c5d4",
        "name": "Victoria",
        "age": 25,
        "dateOfBirth": "2001-08-01",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" },
            { "typeId": "h2", "name": "Yoga", "iconClass": "fas fa-om" }
        ],
        "about": "Life is too short for bad coffee. I love spending weekends finding hidden gems in the city.",
        "Country": "Australia",
        "city": "Brisbane",
        "timezone": "Australia/Brisbane"
    },
    {
        "id": "1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
        "name": "Madison",
        "age": 20,
        "dateOfBirth": "2006-05-19",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h8", "name": "Music", "iconClass": "fas fa-music" },
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" },
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" }
        ],
        "about": "Music is my therapy. Frequent concert-goer and vinyl collector.",
        "Country": "Germany",
        "city": "Hamburg",
        "timezone": "Europe/Berlin"
    },
    {
        "id": "f8e7d6c5-b4a3-f2e1-d0c9-b8a7f6e5d4c3",
        "name": "Luna",
        "age": 22,
        "dateOfBirth": "2004-10-07",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" },
            { "typeId": "h6", "name": "Cooking", "iconClass": "fas fa-utensils" }
        ],
        "about": "Animal lover and outdoor enthusiast. Nature is my happy place.",
        "Country": "Spain",
        "city": "Valencia",
        "timezone": "Europe/Madrid"
    },
    {
        "id": "4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e",
        "name": "Grace",
        "age": 27,
        "dateOfBirth": "1999-02-23",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h5", "name": "Photography", "iconClass": "fas fa-camera" },
            { "typeId": "h10", "name": "Art & Design", "iconClass": "fas fa-palette" }
        ],
        "about": "Creative soul with a love for aesthetics. When I'm not working, you can find me sketching or at a gallery.",
        "Country": "France",
        "city": "Marseille",
        "timezone": "Europe/Paris"
    },
    {
        "id": "c6d5e4f3-a2b1-c0d9-e8f7-a6b5c4d3e2f1",
        "name": "Chloe",
        "age": 24,
        "dateOfBirth": "2002-06-12",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h9", "name": "Gaming", "iconClass": "fas fa-gamepad" },
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" }
        ],
        "about": "Driven and ambitious. Believes in continuous learning and pushing boundaries. Let's build something great.",
        "Country": "USA",
        "city": "New York",
        "timezone": "America/New_York"
    },
    {
        "id": "7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
        "name": "Penelope",
        "age": 19,
        "dateOfBirth": "2007-01-28",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h2", "name": "Yoga", "iconClass": "fas fa-om" },
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" }
        ],
        "about": "Passionate about exploring new places and trying new cuisines. Always looking for the next adventure.",
        "Country": "UK",
        "city": "Edinburgh",
        "timezone": "Europe/London"
    },
    {
        "id": "e3f2a1b0-c9d8-e7f6-a5b4-c3d2e1f0a9b8",
        "name": "Layla",
        "age": 26,
        "dateOfBirth": "2000-09-09",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" },
            { "typeId": "h8", "name": "Music", "iconClass": "fas fa-music" }
        ],
        "about": "Health and wellness advocate. Finding balance between hitting the gym and baking sweet treats.",
        "Country": "Canada",
        "city": "Calgary",
        "timezone": "America/Edmonton"
    },
    {
        "id": "0b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e",
        "name": "Riley",
        "age": 21,
        "dateOfBirth": "2005-12-16",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h6", "name": "Cooking", "iconClass": "fas fa-utensils" },
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" },
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" }
        ],
        "about": "Friendly, outgoing, and always ready for a good conversation over drinks.",
        "Country": "Australia",
        "city": "Perth",
        "timezone": "Australia/Perth"
    },
    {
        "id": "a4b5c6d7-e8f9-a0b1-c2d3-e4f5a6b7c8d9",
        "name": "Zoey",
        "age": 23,
        "dateOfBirth": "2003-07-04",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h5", "name": "Photography", "iconClass": "fas fa-camera" },
            { "typeId": "h10", "name": "Art & Design", "iconClass": "fas fa-palette" }
        ],
        "about": "Tech geek by day, avid gamer by night. Always up for a co-op session.",
        "Country": "Germany",
        "city": "Frankfurt",
        "timezone": "Europe/Berlin"
    },
    {
        "id": "d7c6b5a4-f3e2-d1c0-b9a8-f7e6d5c4b3a2",
        "name": "Nora",
        "age": 18,
        "dateOfBirth": "2008-03-22",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" },
            { "typeId": "h9", "name": "Gaming", "iconClass": "fas fa-gamepad" }
        ],
        "about": "Bookworm who loves getting lost in different worlds. Currently reading 3 books at once.",
        "Country": "Spain",
        "city": "Seville",
        "timezone": "Europe/Madrid"
    },
    {
        "id": "2e3f4a5b-6c7d-8e9f-0a1b-2c3d4e5f6a7b",
        "name": "Lily",
        "age": 25,
        "dateOfBirth": "2001-05-11",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" },
            { "typeId": "h2", "name": "Yoga", "iconClass": "fas fa-om" }
        ],
        "about": "Life is too short for bad coffee. I love spending weekends finding hidden gems in the city.",
        "Country": "France",
        "city": "Toulouse",
        "timezone": "Europe/Paris"
    },
    {
        "id": "b6a5f4e3-d2c1-b0a9-f8e7-d6c5b4a3f2e1",
        "name": "Eleanor",
        "age": 20,
        "dateOfBirth": "2006-10-26",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" },
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" }
        ],
        "about": "Music is my therapy. Frequent concert-goer and vinyl collector.",
        "Country": "USA",
        "city": "Chicago",
        "timezone": "America/Chicago"
    },
    {
        "id": "5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c",
        "name": "Hannah",
        "age": 27,
        "dateOfBirth": "1999-04-18",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h8", "name": "Music", "iconClass": "fas fa-music" },
            { "typeId": "h6", "name": "Cooking", "iconClass": "fas fa-utensils" }
        ],
        "about": "Driven and ambitious. Believes in continuous learning and pushing boundaries. Let's build something great.",
        "Country": "UK",
        "city": "Bristol",
        "timezone": "Europe/London"
    },
    {
        "id": "e1d2c3b4-a5f6-e7d8-c9b0-a1f2e3d4c5b6",
        "name": "Lillian",
        "age": 22,
        "dateOfBirth": "2004-08-09",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h5", "name": "Photography", "iconClass": "fas fa-camera" },
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" },
            { "typeId": "h10", "name": "Art & Design", "iconClass": "fas fa-palette" }
        ],
        "about": "Creative soul with a love for aesthetics. When I'm not working, you can find me sketching or at a gallery.",
        "Country": "Canada",
        "city": "Ottawa",
        "timezone": "America/Toronto"
    },
    {
        "id": "8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
        "name": "Addison",
        "age": 24,
        "dateOfBirth": "2002-02-27",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h9", "name": "Gaming", "iconClass": "fas fa-gamepad" },
            { "typeId": "h7", "name": "Reading", "iconClass": "fas fa-book" }
        ],
        "about": "Animal lover and outdoor enthusiast. Nature is my happy place.",
        "Country": "Australia",
        "city": "Adelaide",
        "timezone": "Australia/Adelaide"
    },
    {
        "id": "c4b5a6f7-e8d9-c0b1-a2f3-e4d5c6b7a8f9",
        "name": "Aubrey",
        "age": 19,
        "dateOfBirth": "2007-06-15",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h2", "name": "Yoga", "iconClass": "fas fa-om" },
            { "typeId": "h1", "name": "Fitness & Sport", "iconClass": "fas fa-dumbbell" }
        ],
        "about": "Passionate about exploring new places and trying new cuisines. Always looking for the next adventure.",
        "Country": "Germany",
        "city": "Cologne",
        "timezone": "Europe/Berlin"
    },
    {
        "id": "1f2e3d4c-5b6a-7f8e-9d0c-1b2a3f4e5d6c",
        "name": "Ellie",
        "age": 26,
        "dateOfBirth": "2000-11-05",
        "isVerified": true,
        "hobbies": [
            { "typeId": "h4", "name": "Traveling", "iconClass": "fas fa-plane-departure" },
            { "typeId": "h3", "name": "Pets", "iconClass": "fas fa-paw" }
        ],
        "about": "Health and wellness advocate. Finding balance between hitting the gym and baking sweet treats.",
        "Country": "Spain",
        "city": "Zaragoza",
        "timezone": "Europe/Madrid"
    }
];