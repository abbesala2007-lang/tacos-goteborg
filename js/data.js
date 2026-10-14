/* TacO's — all site content. Edit prices, dishes and facts here. */
window.TACOS = {
  business: {
    name: 'TacO’s',
    street: 'Lindholmsallén 8A',
    city: '417 55 Göteborg',
    days: 'Alla dagar',
    hours: '11:00 – 20:00',
    rating: '4,8',
    reviews: '175',
    price: '100–200 kr per person',
    founded: '2023',
    instagram: '', // e.g. https://www.instagram.com/tacos.goteborg/
    facebook: '',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Lindholmsall%C3%A9n+8A%2C+417+55+G%C3%B6teborg',
    mapsEmbed: 'https://maps.google.com/maps?q=Lindholmsall%C3%A9n%208A%2C%20417%2055%20G%C3%B6teborg&z=16&output=embed'
  },

  // Where catering inquiries + newsletter signups are POSTed (e.g. a Google Apps Script web app URL).
  formEndpoint: '',

  images: {
    spread: { src: 'img/tacos-spread.webp', alt: 'Birriatacos, nachos, majs och salsa på bordet hos TacO’s' },
    consomme: { src: 'img/birria-consomme.png', alt: 'Krispiga birriatacos med consommé och nachos' },
    bowl: { src: 'img/bowl-nachos.png', alt: 'Bowl med långkokt nötkött, färska örter och lime' },
    baguette: { src: 'img/birria-baguette.png', alt: 'O’s Birria Baguette med jalapeñomajonnäs och persilja' },
    storefront: { src: 'img/storefront.png', alt: 'TacO’s entré på Lindholmsallén i Göteborg' }
  },

  categories: ['Tacos', 'Burritos', 'Bowls', 'Nachos', 'Baguette', 'Tillbehör', 'Såser', 'Dryck'],

  // Which photo shows next to each menu tab
  categoryPhoto: {
    'Tacos': 'consomme', 'Burritos': 'spread', 'Bowls': 'bowl', 'Nachos': 'spread',
    'Baguette': 'baguette', 'Tillbehör': 'spread', 'Såser': 'consomme', 'Dryck': 'spread'
  },

  dishes: [
    // Tacos — every portion is 2 birria tacos
    { c: 'Tacos', name: 'Birriavič', price: '139', desc: 'Tortilla, nötkött, mozzarella, kajmak, ajvar, lök & persilja', tags: ['2 st'], popular: true },
    { c: 'Tacos', name: 'O’s Special', price: '139', desc: 'Tortilla, nötkött, mozzarella, chili & honung, rödlök & persilja', tags: ['2 st'] },
    { c: 'Tacos', name: 'Spicy Candy', price: '139', desc: 'Tortilla, nötkött, mozzarella, kanderade jalapeños, söt adobo, lök & koriander', tags: ['2 st'] },
    { c: 'Tacos', name: 'The Mesopotamian', price: '139', desc: 'Tortilla, nötkött, mozzarella, picklad gurka, harissa & tahini, vitlöksmajonnäs, granatäppelsirap, sumaklök & persilja', tags: ['2 st'] },
    { c: 'Tacos', name: 'El Pollo', price: '139', desc: 'Tortilla, kyckling, mozzarella, chipotlemajonnäs, rödlök, picklad gurka', tags: ['2 st'] },
    { c: 'Tacos', name: 'Extra taco', price: '49', desc: 'Lägg till en extra taco till din portion', tags: [] },

    { c: 'Burritos', name: 'Pollo Supremo', price: '139', desc: 'Burritotortilla, kyckling, smaksatt ris, mozzarella, svarta bönor, chipotlemajonnäs, chipotlemajs, guacamole, rödlök, jalaverde-majonnäs, sallad, hot honey & koriander', tags: [], popular: true },
    { c: 'Burritos', name: 'Beef Bandido', price: '139', desc: 'Burritotortilla, nötkött, smaksatt ris, mozzarella, svarta bönor, rödlök, guacamole, krossade nachos, jalaverde-majonnäs, koriander & persilja', tags: [] },

    { c: 'Bowls', name: 'Birriavič', price: '129', desc: 'Sallad, nötkött, mozzarella, kajmak, ajvar, lök & persilja', tags: [], popular: true },
    { c: 'Bowls', name: 'O’s Special', price: '129', desc: 'Sallad, nötkött, mozzarella, chili & honung, rödlök & persilja', tags: [] },
    { c: 'Bowls', name: 'Spicy Candy', price: '129', desc: 'Sallad, nötkött, mozzarella, kanderade jalapeños, söt adobo, lök & koriander', tags: [] },
    { c: 'Bowls', name: 'The Mesopotamian', price: '129', desc: 'Sallad, nötkött, mozzarella, picklad gurka, harissa & tahini, vitlöksmajonnäs, granatäppelsirap, sumaklök & persilja', tags: [] },
    { c: 'Bowls', name: 'El Pollo', price: '129', desc: 'Sallad, kyckling, mozzarella, chipotlemajonnäs, rödlök, picklad gurka', tags: [] },

    { c: 'Nachos', name: 'Original', price: '119', desc: 'Långkokt högrev, nachos, ostsås, lök, persilja eller koriander', tags: ['Salt eller chili'] },
    { c: 'Nachos', name: 'Birriavič', price: '139', desc: 'Långkokt högrev, nachos, ostsås, lök, ajvar, kajmak, persilja eller koriander', tags: ['Salt eller chili'] },
    { c: 'Nachos', name: 'O’s Special', price: '149', desc: 'Långkokt högrev, nachos, ostsås, rödlök, chili- & honungsmajonnäs, persilja eller koriander', tags: ['Salt eller chili'] },
    { c: 'Nachos', name: 'Spicy Candy', price: '149', desc: 'Långkokt högrev, nachos, ostsås, lök, söt adobomajonnäs, persilja eller koriander', tags: ['Salt eller chili'] },
    { c: 'Nachos', name: 'The Mesopotamian', price: '149', desc: 'Långkokt högrev, nachos, ostsås, sumaklök, picklad gurka, vitlöksmajonnäs, granatäppelsirap, harissa-tahini, persilja eller koriander', tags: ['Salt eller chili'] },

    { c: 'Baguette', name: 'O’s Birria Baguette', price: '139', desc: 'Baguette, långkokt högrev, söt grön jalapeñomajonnäs, lök, persilja eller koriander', tags: [], popular: true },

    { c: 'Tillbehör', name: 'O’s Creamy Corn', price: '49', desc: 'Krämig majs med smör och salt, toppad med jalaverde-majonnäs och gräslök', tags: ['Varm'] },
    { c: 'Tillbehör', name: 'O’s Chipotle Corn', price: '49', desc: 'Chipotlesmaksatt majs toppad med fetaost och gräslök', tags: [] },
    { c: 'Tillbehör', name: 'O’s Garlic Corn', price: '49', desc: 'Vitlökssmaksatt majs toppad med fetaost och gräslök', tags: [] },
    { c: 'Tillbehör', name: 'O’s Guac', price: '49', desc: 'Vår hemgjorda guacamole', tags: [] },
    { c: 'Tillbehör', name: 'Nachochips', price: '29', desc: 'Klassiska nachochips', tags: ['Salt eller chili'] },

    { c: 'Såser', name: 'Cheddar', price: '19', desc: '', tags: [] },
    { c: 'Såser', name: 'Honung & chili', price: '19', desc: '', tags: [] },
    { c: 'Såser', name: 'Söt adobo', price: '19', desc: '', tags: [] },
    { c: 'Såser', name: 'Vitlöksmajonnäs', price: '19', desc: '', tags: [] },
    { c: 'Såser', name: 'Salsa picante', price: '19', desc: '', tags: ['Kall'] },
    { c: 'Såser', name: 'Harissa & tahini', price: '19', desc: '', tags: [] },
    { c: 'Såser', name: 'Söt jalapeño', price: '19', desc: '', tags: [] },
    { c: 'Såser', name: 'Ajvar', price: '19', desc: '', tags: ['Kall'] },
    { c: 'Såser', name: 'Kajmakmajonnäs', price: '19', desc: '', tags: [] },

    { c: 'Dryck', name: 'Läsk', price: '25', desc: '', tags: [] },
    { c: 'Dryck', name: 'Kaffe', price: '25', desc: '', tags: [] },
    { c: 'Dryck', name: 'Blue Lemonade', price: '45', desc: 'Sparkling pop soda', tags: [] },
    { c: 'Dryck', name: 'Pomegranate Blast', price: '45', desc: 'Sparkling pop soda med granatäpple', tags: [] },
    { c: 'Dryck', name: 'Peach On The Beach', price: '45', desc: 'Sparkling pop soda med persika', tags: [] }
  ],

  gallery: [
    { img: 'consomme', name: 'Birria att doppa', type: 'Mat' },
    { img: 'spread', name: 'Allt på bordet', type: 'Mat' },
    { img: 'bowl', name: 'Bowl med allt', type: 'Mat' },
    { img: 'baguette', name: 'O’s Birria Baguette', type: 'Mat' },
    { img: 'storefront', name: 'Välkommen till Lindholmen', type: 'Lokalen' }
  ]
};
