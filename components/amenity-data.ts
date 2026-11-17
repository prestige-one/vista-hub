export const amenityCategories = ['Business','Social','Wellness','Outdoors'] as const;
export type AmenitySpace = {id:string;title:string;category:typeof amenityCategories[number];image:string;video?:string;description:string};
export const amenitySpaces:readonly AmenitySpace[] = [
 {id:'executive-gathering-suite',title:'Executive Gathering Suite',category:'Social',image:'executive-gathering-area.webp',description:'Spaces for conversations and shared occasions.'},
 {id:'aqua-vista',title:'Aqua Vista',category:'Social',image:'aqua-vista.webp',description:'A refreshing perspective, above the everyday.'},
 {id:'podcast-studio',title:'Podcast Studio',category:'Business',image:'podcast.webp',description:'A dedicated setting for ideas worth sharing.'},
 {id:'business-lounge',title:'Business Lounge',category:'Business',image:'business-lounge.webp',description:'A considered space to meet, connect and recharge.'},
 {id:'meeting-room',title:'Meeting Room',category:'Business',image:'meeting-room-1.webp',description:'Make room for your next important conversation.'},
 {id:'collaborative-work-lounge',title:'Collaborative Work Lounge',category:'Business',image:'Collaborative Work Lounge.webp',description:'Bring people and new perspectives together.'},
 {id:'prestige-one-fitness',title:'Prestige One Fitness',category:'Wellness',image:'fitness.webp',description:'Make movement part of your working day.'},
 {id:'wellness-area',title:'Wellness Area',category:'Wellness',image:'wellness-area.webp',description:'Pause, reset and return with a fresh perspective.'},
 {id:'relaxation-lounge',title:'Relaxation Lounge',category:'Wellness',image:'Relaxation Lounge.webp',description:'A quiet moment, thoughtfully considered.'},
 {id:'fitness-deck',title:'Fitness Deck',category:'Wellness',image:'fitness-deck.webp',description:'An open-air space for movement and balance.'},
 {id:'grill-pavilion',title:'Grill Pavilion',category:'Social',image:'grill-pavillion.webp',description:'Open-air dining, shared with good company.'},
 {id:'games-corner',title:'Games Corner',category:'Social',image:'game-area.webp',description:'Step away from the desk and connect through play.'},
 {id:'open-air-theatre',title:'Open-Air Theatre',category:'Outdoors',image:'Open-Air Theatre.webp',description:'A different setting for inspiration and entertainment.'},
 {id:'mini-golf',title:'Mini Golf',category:'Outdoors',image:'mini-golf.webp',description:'A little friendly competition, a change of pace.'},
 {id:'garden-lounge',title:'Garden Lounge',category:'Outdoors',image:'garden-launge.webp',description:'A green retreat for the moments between meetings.'},
 {id:'garden-terrace',title:'Garden Terrace',category:'Outdoors',image:'garden-terrace.webp',description:'Fresh air and room for a wider perspective.'},
];
