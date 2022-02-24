const disneyMovies = [
    "Lilo and Stitch", 
    "Beauty and the Beast" , 
    "Lion King", 
    "Toy Story", 
    "Tarzan",
    "Hercules",
    "Peter Pan",
    "Treasure Planet",
    "Tangled",
    "Frozen",
    "Black Couldron",
    "Robin Hood",
    "Snow White",
    "Aladin",
    "Sleeping Beauty",
    "Monsters Inc",
    "Moana",
    "Emperors New Groove",
    "Encanto",
    ]

function pickMovie(){
   return disneyMovies[Math.floor(Math.random()*(disneyMovies.length))];
}



console.log(pickMovie());
