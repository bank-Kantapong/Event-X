import { StaticImageData } from "next/image";
import concertImage from "@/assets/images/concert.png";
import runningImage from "@/assets/images/running.png";
import fireworksImage from "@/assets/images/fireworks.png";
import artImage from "@/assets/images/art.jpg";
import foodImage from "@/assets/images/food.jpg";
import techImage from "@/assets/images/tech.jpg";
import learningImage from "@/assets/images/learning.jpg";
import cultureImage from "@/assets/images/culture.jpg";
import charityImage from "@/assets/images/charity.jpg";
import competitionImage from "@/assets/images/competition.jpg";
import heroImage from "@/assets/images/hero_illustration.png";

export const imageMap: Record<string, StaticImageData> = {
    concert: concertImage,
    running: runningImage,
    fireworks: fireworksImage,
    art: artImage,
    food: foodImage,
    tech: techImage,
    learning: learningImage,
    culture: cultureImage,
    charity: charityImage,
    competition: competitionImage,
    // Gallery mappings
    crowd: fireworksImage, // Crowd at fireworks
    stage: techImage, // Stage lights/tech
    medal: competitionImage, // Winning
    startpoint: charityImage, // Gathering
    beach: runningImage, // Outdoor
    night: concertImage, // Night life
    painting: learningImage, // Workshop
    sculpture: cultureImage, // Cultural art
    robot: heroImage, // Future
    coding: learningImage, // Learning code
    truck: charityImage, // Outdoor stall
    burger: foodImage, // Food
    saxophone: artImage, // Art of music
    jazz: concertImage, // Music
    run: competitionImage, // Race
    donation: heroImage, // Helping
    river: cultureImage, // Scenic
    countdown: concertImage, // Party
    pottery: artImage, // Craft
    clay: learningImage, // Material
    forest: cultureImage, // Nature
    mountain: runningImage, // Trail
    lantern: fireworksImage, // Lights
    violin: artImage, // Instrument
    orchestra: cultureImage, // Classical
    mud: runningImage, // Dirty run
    obstacle: techImage, // Structure
    water: heroImage, // Splash
    songkran: foodImage, // Festival vibe
};

export const getImage = (key: string): StaticImageData => {
    return imageMap[key] || concertImage;
};
