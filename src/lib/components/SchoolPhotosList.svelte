<script>
  import { Carousel, CarouselTransition } from 'flowbite-svelte'
  // ./imageData/+server.js has the followint
  const images = [
  {
    id: 0,
    name: 'Cosmic timetraveler',
    attribution: 'cosmic-timetraveler-pYyOZ8q7AII-unsplash.com',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/cosmic-timetraveler-pYyOZ8q7AII-unsplash.webp'
  },
  {
    id: 1,
    name: 'Cristina Gottardi',
    attribution: 'cristina-gottardi-CSpjU6hYo_0-unsplash.com',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/cristina-gottardi-CSpjU6hYo_0-unsplash.webp'
  },
  {
    id: 2,
    name: 'Johannes Plenio',
    attribution: 'johannes-plenio-RwHv7LgeC7s-unsplash.com',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/johannes-plenio-RwHv7LgeC7s-unsplash.webp'
  },
  {
    id: 3,
    name: 'Jonatan Pie',
    attribution: 'jonatan-pie-3l3RwQdHRHg-unsplash.com',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/jonatan-pie-3l3RwQdHRHg-unsplash.webp'
  },
  {
    id: 4,
    name: 'Mark Harpur',
    attribution: 'mark-harpur-K2s_YE031CA-unsplash',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/mark-harpur-K2s_YE031CA-unsplash.webp'
  },
  {
    id: 5,
    name: 'Pietro De Grandi',
    attribution: 'pietro-de-grandi-T7K4aEPoGGk-unsplash',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/pietro-de-grandi-T7K4aEPoGGk-unsplash.webp'
  },
  {
    id: 6,
    name: 'Sergey Pesterev',
    attribution: 'sergey-pesterev-tMvuB9se2uQ-unsplash',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/sergey-pesterev-tMvuB9se2uQ-unsplash.webp'
  },
  {
    id: 7,
    name: 'Solo travel goals',
    attribution: 'solotravelgoals-7kLufxYoqWk-unsplash',
    imgUrl: 'https://flowbite-svelte.com/images/carousel/solotravelgoals-7kLufxYoqWk-unsplash.webp'
  }
];

  // const images = imagesRaw.map(item=>{
  //   const data = {
  //     id:item.id,
  //     name:item.name,
  //     attribution:item.attribution,
  //     imgUrl:`https://flowbite-svelte.com${item.imgurl}`
  //   }
  //   return data
  // })
  // console.log(images)
  
  // import { Carousel } from 'flowbite-svelte'
  // import { images } from './imageData/+server.js';
  let showThumbs=false
  let showCaptions=false
</script>

<div class="max-w-4xl">
  <Carousel {images} loop {showCaptions} {showThumbs} duration="3000"/>
</div>