export interface MeditationType {
    id: number;
    title: string;
    image: string;
    audio: string;
}

export const MEDITATION_DATA: MeditationType[] = [
    {
        id: 1,
        title: "Mountains",
        image: "mountainSix",
        audio: "MountainMusic.mp3",
    },
    {
        id: 2,
        title: "Beaches",
        image: "beachFive",
        audio: "BeachMusic.mp3",
    },
    {
        id: 3,
        title: "Night Sky",
        image: "nightOne",
        audio: "NightMusic.mp3",
    },
    {
        id: 4,
        title: "Forest",
        image: "forestFive",
        audio: "ForestMusic.mp3",
    },
    {
        id: 5,
        title: "Fantasy",
        image: "fantasyOne",
        audio: "FantasyMusic.mp3",
    },
];
export const AUDIO_FILES: { [key: string]: any } = {
    "MountainMusic.mp3": require("../assets/Music/MountainMusic.mp3"),
    "BeachMusic.mp3": require("../assets/Music/BeachMusic.mp3"),
    "NightMusic.mp3": require("../assets/Music/NightMusic.mp3"),
    "ForestMusic.mp3": require("../assets/Music/ForestMusic.mp3"),
    "FantasyMusic.mp3": require("../assets/Music/FantasyMusic.mp3"),
};
