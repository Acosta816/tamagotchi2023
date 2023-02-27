"use strict";

console.log("linked ⚡");

const log = (string) => console.log(string);

/*🔴//lets create the class

class Pet {
  // setup a constructor
  constructor(name, guardian) {
    this.name = name;
    this.guardian = guardian;
  }
} //end of class

//test one: Lets see if our pet exists!
const myPet = new Pet("Lobo", "David");
log(myPet);
🔴*/

//---------------------------------------
//Step:2 'Lets add the pet's other properties like boredom, hunger, and sleepiness levels

const state = {
  hungerInterval: null,
  ageInterval: null,
  boredomInterval: null,
  sleepinessInterval: null,
};

let myPet;

//-----------------Visual Elements on screen <HTML/>----------------------

const fishTank = document.querySelector(".fishTank");
const boombox = document.querySelector(".boombox");
const pet = document.querySelector(".pet");
const fridge = document.querySelector(".fridge");
const light = document.querySelector(".light");

const screen = document.querySelector(".screen");
const overlay = document.querySelector(".overlay");
const petSays = document.querySelector(".petSays");
const hungerStat = document.querySelector(".hungerStat");
const sleepinessStat = document.querySelector(".sleepinessStat");
const funStat = document.querySelector(".funStat");
const petNameStat = document.querySelector(".petNameStat");

const startButton = document.querySelector(".startButton");
const restartButton = document.querySelector(".restartButton");

const musicButton = document.querySelector("#musicButton");
const audio = document.querySelector("audio");

musicButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.1;
    audio.play();
    musicButton.innerText = "🔊";
  } else {
    audio.pause();
    musicButton.innerText = "🔈";
  }
});

//-------startGame function-----------------------
function startGame() {
  overlay.classList.toggle("hidden"); //hide the overlay
  startButton.classList.toggle("hidden"); //hide start button
  const petName = prompt("Give your pet a proper name", "type name"); //grabs users input
  myPet = new Pet(petName); //creating our pet
  petNameStat.innerText = myPet.name; //updates the chat box with new name
  audio.volume = 0.1;
  audio.play();
  console.log(`${myPet.name} has been instantiated`);
  myPet.hatching(); //hatch egg

  overlay.classList.toggle("hidden");
  overlay.classList.toggle("darken");
  overlay.classList.toggle("confetti");
  setTimeout(() => {
    overlay.classList.toggle("hidden");
    overlay.classList.toggle("darken");
    overlay.classList.toggle("confetti");
  }, 3000);

  //----connect event listeners
  fishTank.addEventListener("click", myPet.tapFishBowl);
  boombox.addEventListener("click", myPet.dance);
  fridge.addEventListener("click", myPet.feedPet);
  light.addEventListener("click", myPet.sleep);

  //--------filling the html stats with initial values
  hungerStat.innerText = myPet.hunger; //showing initial value on hunger stats
  funStat.innerText = myPet.fun; //showing initial value on boredom stats
  sleepinessStat.innerText = myPet.sleepiness; //showing initial value on sleepiness stats
  petSays.innerText = "BEHOLD...I am hatched, therefore I am";
}
//----------------end of startGame function------------

//------startOver function------🔁
function startOver() {
  window.location.reload();
}
//------startOver function END------

class Pet {
  // setup a constructor
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hunger = 0; //⭐
    this.sleepiness = 0; //⭐
    this.fun = 5; //⭐
    this.isBusy = false;
  }

  hatching = () => {
    this.isBusy = true;
    log("Your pet is hatching! 🥚");
    pet.classList.remove("hidden"); //make pet eat

    setTimeout(() => {
      pet.classList.remove("hatching"); //make pet eat
      pet.classList.add("static");
      this.isBusy = false;

      //================= ⏰ starting all intervals (that live inside my state object)======================
      state.ageInterval = setInterval(this.ageUp, 20000); //starts aging after 4 seconds of being hatched
      state.hungerInterval = setInterval(this.getsHungry, 10000); //hunger starts increasing
      state.boredomInterval = setInterval(this.getsBored, 12000); //boredom starts increasing
      state.sleepinessInterval = setInterval(this.getSleepy, 15000); //sleepiness starts increasing
    }, 3000);
  };

  //-----------------------interval methods-------------------
  ageUp = () => {
    this.age += 1;
    log(this.age);
    petSays.innerText = `🎂  I just turned ${this.age} !! `;

    if (this.age === 5) {
      log("evolve!!");
    }
  };
  //--------------ageUp END

  getsHungry = () => {
    this.hunger += 1;

    hungerStat.innerText = this.hunger; //updating hunger stats
    console.log(`HUNGER: ${this.hunger}`);

    if (this.hunger === 10) {
      petSays.innerText = "I passed out from hunger 💀";
      log(`Death by hunger 💀`);
      audio.src = "./music/sad_song.mp3";
      audio.play();

      pet.removeAttribute("class"); //so it doesnt matter what EGG is doing, it will be removed once it dies
      // pet.classList.toggle("eggdied"); //TURN ON EGG DYING

      boombox.removeEventListener("click", myPet.dance);
      fridge.removeEventListener("click", myPet.feedPet);
      clearInterval(state.ageInterval); //stop ALL the counting (Intervals) once it dies
      clearInterval(state.hungerInterval);
      clearInterval(state.boredomInterval);
      clearInterval(state.sleepinessInterval);

      restartButton.classList.toggle("hidden");
    } else if (this.hunger >= 4) {
      petSays.innerText = "😋🍖 FEED ME, FEEED MEEEE!!!!";
      log(`FEED ME, FEED MEEEEE!!!`);
    }
  }; //-------------- getsHungry

  getsBored = () => {
    this.fun -= 1;

    funStat.innerText = this.fun; //updating hunger stats
    console.log(`Boredom: ${this.fun}`);

    if (this.fun === 0) {
      petSays.innerText = "I passed out from boredom 💀";
      log(`Death by boredom 💀`);
      audio.src = "./music/sad_song.mp3";
      audio.play();

      pet.removeAttribute("class"); //so it doesnt matter what pet is doing, it will be removed once it faints

      boombox.removeEventListener("click", myPet.dance);
      fridge.removeEventListener("click", myPet.feedPet);
      clearInterval(state.ageInterval); //stop ALL the counting (Intervals) once it dies
      clearInterval(state.hungerInterval);
      clearInterval(state.boredomInterval);
      clearInterval(state.sleepinessInterval);

      restartButton.classList.toggle("hidden");
    } else if (this.fun <= 3) {
      petSays.innerText = "🛝🧸PLAY WITH ME, PLAAAY WIIITH MEEE AAAAH!!!";
    }
  }; //-------------- getsHungry

  //-----user action methods-----

  getSleepy = () => {
    this.sleepiness += 1;

    sleepinessStat.innerText = this.sleepiness; //updating sleepiness stats
    console.log(`SLEEPINESS: ${this.sleepiness}`);

    if (this.sleepiness === 10) {
      petSays.innerText = "I died of sleepiness 💀";
      console.log(`Death by sleepiness 💀`);
      audio.src = "./music/sad_song.mp3";
      audio.play();

      petSays.innerText = ""; //so PET chat clears once is it dies, and all it does after is let us know it is dead.

      this.isDead = true;

      pet.removeAttribute("class"); //so it doesnt matter what EGG is doing, it will be removed once it dies

      boombox.removeEventListener("click", myPet.dance);
      fridge.removeEventListener("click", myPet.feedPet);
      clearInterval(state.ageInterval); //stop ALL the counting (Intervals) once it dies
      clearInterval(state.hungerInterval);
      clearInterval(state.boredomInterval);
      clearInterval(state.sleepinessInterval);
    } else if (this.sleepiness >= 6) {
      petSays.innerText = "YAAAAAAAAWWWWWWNNNN!!! 🥱";
      console.log(`YAAAAAAAAWWWWWWNNNN 🥱`);
    }
  }; //---------getsSleepy() FUNCTIONS ENDS

  feedPet = () => {
    if (!this.isBusy && this.hunger >= 2) {
      this.isBusy = true; //setting isBusy to true so no other actions can be called.
      // log("Lunch time! 🍖");
      myPet.hunger -= 2;
      hungerStat.innerText = this.hunger;
      pet.classList.toggle("eating"); //make pet eat

      setTimeout(() => {
        pet.classList.toggle("eating");
        this.isBusy = false;
      }, 5000);
    }
  };

  dance = () => {
    if (!this.isBusy && this.fun <= 8) {
      this.isBusy = true; //setting isBusy to true so no other actions can be called.
      log("MUSIC 🎧🎶🎵🎹🎼");
      this.fun += 2;
      funStat.innerText = this.fun;
      boombox.classList.toggle("boomboxOn"); //turn boombox on
      pet.classList.toggle("dancing"); //make pet dance

      setTimeout(() => {
        boombox.classList.toggle("boomboxOn"); //after 5seconds we turn it off
        pet.classList.toggle("dancing");
        this.isBusy = false;
      }, 5000);
    }
  };

  sleep = () => {
    if (!this.isBusy && this.sleepiness >= 2) {
      this.isBusy = true; //setting isBusy to true so no other actions can be called.

      this.sleepiness -= 2;
      sleepinessStat.innerText = this.sleepiness;

      log("Bed time 💤😴");
      light.classList.toggle("lightOff"); //turn light off
      pet.classList.toggle("sleeping"); //make pet sleep
      overlay.classList.toggle("hidden");

      setTimeout(() => {
        light.classList.toggle("lightOff");
        pet.classList.toggle("sleeping");
        overlay.classList.toggle("hidden");
        this.isBusy = false;
      }, 5000);
    }
  };

  tapFishBowl = () => {
    if (!this.isBusy) {
      this.isBusy = true;
      screen.classList.toggle("shake");

      setTimeout(() => {
        screen.classList.toggle("shake");
        this.isBusy = false;
      }, 100);
    }
  };
} //-----------------------------------end of class--------------------------

//test 2: Lets see if our pet exists!
// myPet = new Pet("Spike");
// setTimeout(() => {
//   myPet.hatching();
// }, 500);
