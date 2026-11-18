export const amenityCategories = ['Business','Social','Wellness','Outdoors'] as const;
export type AmenitySpace = {id:string;title:string;category:typeof amenityCategories[number];image:string;video?:string;description:string};
export const amenitySpaces:readonly AmenitySpace[] = [
 {id:'mini-golf',title:'Mini-Golf',category:'Outdoors',image:'v2/mini-golf.webp',description:'A little friendly competition, a change of pace.'},
 {id:'prestige-fitness',title:'Prestige Fitness',category:'Wellness',image:'v2/Fitness-Studio.webp',description:'Make movement part of your working day.'},
 {id:'podcast-studio',title:'Podcast Studio',category:'Business',image:'v2/Podcast-Studio.webp',description:'A dedicated setting for ideas worth sharing.'},
 {id:'wellness-area',title:'Wellness Area',category:'Wellness',image:'v2/Wellness-Area.webp',description:'Pause, reset and return with a fresh perspective.'},
 {id:'open-air-theatre',title:'Open Air Theatre',category:'Outdoors',image:'v2/Open-Air-Theatre.webp',description:'A different setting for inspiration and entertainment.'},
 {id:'foosball',title:'Foosball',category:'Social',image:'v2/Games-Lounge.webp',description:'Step away from the desk and connect through play.'},
 {id:'pool-table',title:'Pool Table',category:'Social',image:'v2/Games-Area.webp',description:'Take a break with a little friendly competition.'},
 {id:'garden-terrace',title:'Garden Terrace',category:'Outdoors',image:'v2/Garden-Terrace.webp',description:'Fresh air and room for a wider perspective.'},
 {id:'aqua-vista',title:'Aqua Vista',category:'Outdoors',image:'v2/Aqua-Vista.webp',description:'A refreshing perspective, above the everyday.'},
 {id:'grill-pavilion',title:'Grill Pavilion',category:'Outdoors',image:'v2/Grill-Pavilion.webp',description:'Open-air dining, shared with good company.'},
 {id:'open-air-fitness-deck',title:'Open-Air Fitness Deck',category:'Outdoors',image:'v2/Open-Air_Fitness_Deck.webp',description:'An open-air space for movement and balance.'},
];