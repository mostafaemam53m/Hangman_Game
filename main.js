const letters = "abcdefghijklmnopqrstuvwxyz";
//  set number of correct and  worng chose let it 0 by defalut and with every worng chose increase it by one
// constants
let worng_chose = 0;
let correct_chosen = 0;
////////
let letters_array = Array.from(letters);
letters_array.forEach(letters => {
    let letters_container = document.querySelector(".letters");
    let span = document.createElement("span");
    span.innerHTML = letters;
    span.className = "letter_box";
    letters_container.appendChild(span);


});

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    Arab_country: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
let allkeys = Object.keys(words);
//to get random number from words object length
let randomPropNumber = Math.floor(Math.random() * allkeys.length);
// used random number to get random key
let randomPropKey = allkeys[randomPropNumber];
// to get value of random key
let randomArray = words[randomPropKey];
// to get random number of array is lenght from array random key 
let randomValueNumber = Math.floor(Math.random() * randomArray.length);
//  to get random value from array 
let randomWord = randomArray[randomValueNumber];

// print words key in category
document.querySelector(".category span").innerHTML = randomPropKey;

///to creat numbers of span resulte to number of letters of chosen word
let chosen_word_array = Array.from(randomWord);
// console.log(chosen_word_array)
chosen_word_array.forEach((letter) => {
    let lettersGuess = document.querySelector(".letters-guess");
    let span = document.createElement("span");
    span.className = "letters";
    if (letter === " ") {
        span.className = "letters-space";
        // in case space increse correct_chosen by one 
        correct_chosen++;

    }
    lettersGuess.appendChild(span);

})



document.addEventListener("click", (e) => {
    // status of chosen correct letters let it wrong as a default
    let chosen_status = false;

    if (e.target.className === "letter_box") {
        // console.log(e.target);
        let clicked_letter = e.target;
        clicked_letter.classList.add("clicked");

        chosen_word_array.forEach((ele, index) => {
            if (ele.toLowerCase() === clicked_letter.innerHTML.toLowerCase()) {
                /*
                 * if the chose letter is in letters or random word in crease correct_chosen by +1 
                 * to used it to print Congratulation message

                 */

                correct_chosen++;


                let clicked_letter = ele.toLowerCase();
                let index_of_clicked_letters = index;

                // convert chosen status from false to true because the chosen letters = one or more letters from chosen word
                chosen_status = true;

                loop_gusse_span(clicked_letter, index_of_clicked_letters);



            }
        })
        slect_numbers_of_worngs_chose(chosen_status);
    }


})

/// function to loop in guss span
function loop_gusse_span(clicked_letter, index_of_clicked_letters) {
    // to get array from letters-guess span
    let guess_letters = document.querySelectorAll(".letters-guess span");
    guess_letters.forEach((ele, index) => {
        // loop in letters-guess span array if index of span = index of chosen letters print letter in it is index
        if (index === index_of_clicked_letters) {
            // console.log(" from function index " + index);
            // console.log("from func ele " + ele)
            ele.innerHTML = clicked_letter;
        }
    })


}



function slect_numbers_of_worngs_chose(chosen_status) {

    if (chosen_status !== true) {
        worng_chose++;

        let hangman_draw = document.querySelector(".hangman-draw");
        hangman_draw.classList.add(`worng-${worng_chose}`);
        // if number of worng reach to 8 stop press on any letters
        if (worng_chose === 8) {
            let game_over = document.createElement("div");
            game_over.className = "game-over";
            game_over.innerHTML = `Game over, you made 8 mistakes the correct word is ${randomWord}`;
            document.body.appendChild(game_over);
            // function prevent click on keys 
            prevent_cliked_on_keys();

        }
    } else {

        // condition chosen keys equal correct word ...stop clike on keys and show popup massege
        if (+correct_chosen === chosen_word_array.length) {
            prevent_cliked_on_keys();
            let massege = document.createElement("div");
            let span = document.createElement("span");
            massege.className = "good";
            span.innerHTML = "Congratulations";
            massege.innerHTML = ` you've already done it. The correct word is ${randomWord} and the number of the worngs is ${worng_chose} `;
            massege.appendChild(span);
            document.body.appendChild(massege);


        }
    }
}

// function to prevent click on keys after numbers of worngs or after numbers of ture keys

function prevent_cliked_on_keys() {
    // get the all letters 
    let all_letters = document.querySelectorAll(".letter_box");
    all_letters.forEach((e) => {
        e.classList.add("prevent");

    })

}