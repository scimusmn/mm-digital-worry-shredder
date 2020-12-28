let form = document.querySelector("form");
let step2 = document.querySelector(".step2");

document.querySelector("button").addEventListener("click", () => {
    let worry = document.querySelector("textarea").value;
    let worryCard = document.querySelector(".worry-card");

    worryCard.innerHTML += '<div class="worry-card-user-text">' + worry + '</div>';

    // @todo require a value before moving on
    form.style.display = "none";
    step2.style.display = "inline-block";

    // Turn on the shredder
    let shredder = document.querySelector(".shredder");
    let light = document.querySelector(".power");

    document.querySelector(".turn-on").addEventListener("click", () => {
        light.classList.remove('off');
        light.classList.add("on", "animate__animated", "animate__flash");
        shredder.classList.add("animate__animated", "animate__shakeX");
    });

    // Shred the worry card
    document.querySelector(".shred").addEventListener("click", () => {
        worryCard.classList.add("animate__animated", "animate__fadeOutDown");
    });

});