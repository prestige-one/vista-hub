export const amenityCategories = ['Business','Social','Wellness','Outdoors'] as const;
export type AmenitySpace = {id:string;title:string;category:typeof amenityCategories[number];image:string;video?:string;description:string};
export const amenitySpaces:readonly AmenitySpace[] = [
 {id:'mini-golf',title:'Mini-Golf',category:'Outdoors',image:'mini-golf.webp',description:'A little friendly competition, a change of pace.'},
 {id:'prestige-fitness',title:'Prestige Fitness',category:'Wellness',image:'fitness.webp',description:'Make movement part of your working day.'},
 {id:'podcast-studio',title:'Podcast Studio',category:'Business',image:'podcast.webp',description:'A dedicated setting for ideas worth sharing.'},
 {id:'wellness-area',title:'Wellness Area',category:'Wellness',image:'wellness-area.webp',description:'Pause, reset and return with a fresh perspective.'},
 {id:'open-air-theatre',title:'Open Air Theatre',category:'Outdoors',image:'Open-Air Theatre.webp',description:'A different setting for inspiration and entertainment.'},
 {id:'foosball',title:'Foosball',category:'Social',image:'games-launge.webp',description:'Step away from the desk and connect through play.'},
 {id:'pool-table',title:'Pool Table',category:'Social',image:'game-area.webp',description:'Take a break with a little friendly competition.'},
 {id:'garden-terrace',title:'Garden Terrace',category:'Outdoors',image:'garden-terrace.webp',description:'Fresh air and room for a wider perspective.'},
];
