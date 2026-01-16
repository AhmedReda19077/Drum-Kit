var audioVolume = 0.6;

const addAnimation = (key) => {
    const currentKey = document.querySelector(`.${key}`);
    currentKey.classList.add("pressed")
    setTimeout(() => {
        currentKey.classList.remove("pressed");
    }, 250)
}

function playMusic(path) {
    const audio = new Audio(path);
    audio.volume = audioVolume;
    audio.play();
}

document.addEventListener("keypress", function (event) {
    const triggerdKey = event.key;
    makeSound(triggerdKey);
    addAnimation(triggerdKey)
})

const makeSound = (key) => {
    switch (key) {
        case ("w"):
            playMusic("Sounds/sound-1.mp3");
            break;
        case ("a"):
            playMusic("Sounds/sound-2.mp3");
            break;
        case ("s"):
            playMusic("Sounds/sound-3.mp3");
            break;
        case ("d"):
            playMusic("Sounds/sound-4.mp3");
            break;
        case ("j"):
            playMusic("Sounds/sound-5.mp3");
            break;
        case ("k"):
            playMusic("Sounds/sound-6.mp3");
            break;
        case ("l"):
            playMusic("Sounds/sound-7.mp3");
            break;
        default:
            console.log("Wrong !!!")
    }
}

const handleDrumClick = (event) => {
    var innerHTML = event.target.innerHTML;
    addAnimation(innerHTML);
    makeSound(innerHTML)
}
var drums = document.querySelectorAll(".drum");
for (let i = 0; i < drums.length; i++) {
    drums[i].addEventListener("click", handleDrumClick)
}

const slider = document.getElementById("volume-slider");
slider.oninput = (event) => {
    audioVolume = event.target.value / 100;
}

var autoMusicId;
let autoMusicOn = false;

const startAutoMusic = () => {
    const letters = ["w", "a", "s", "d", "j", "k", "l"];
    autoMusicId = setInterval(() => {
        const currentKey = letters[Math.floor(Math.random() * letters.length)];
        makeSound(currentKey);
        addAnimation(currentKey);
    }, 200)
}

const autoMusicBtn = document.getElementById("util-button-auto")
autoMusicBtn.addEventListener("click", function () {
    if (autoMusicOn) {
        clearInterval(autoMusicId)
        autoMusicOn = false;
        autoMusicBtn.innerHTML = "Start Auto Music"
        autoMusicBtn.classList.remove("auto-music-on")
    }
    else {
        startAutoMusic();
        autoMusicOn = true;
        autoMusicBtn.innerHTML = "Stop Auto Music"
        autoMusicBtn.classList.add("auto-music-on")
    }
})

// Theme One

const themeOneBackground = "#091921"
const themeOneBackgroundOpacity = "rgba(9,25,33,0.8)"
const themeOneText = "#00fff1"


// Theme Two

const themeTwoBackground = "#f7c340"
const themeTwoBackgroundOpacity = "rgba(247,195,64,0.85)"
const themeTwoText = "#2d2d2d"


function changeTheme(theme) {
    themeChanger.classList.add("change-theme")
    setTimeout(() => {
        themeChanger.classList.remove("change-theme")
    }, 100)
    let root = document.documentElement;
    if (theme == "themeOne") {
        root.style.setProperty("--background", themeOneBackground);
        root.style.setProperty("--background_low", themeOneBackgroundOpacity);
        root.style.setProperty("--text", themeOneText);
    }
    else {
        root.style.setProperty("--background", themeTwoBackground);
        root.style.setProperty("--background_low", themeTwoBackgroundOpacity);
        root.style.setProperty("--text", themeTwoText);
    }
}

var currentTheme = "themeOne"
const themeChanger = document.getElementById("util-button-theme")
themeChanger.addEventListener("click", function (e) {
    if (currentTheme == "themeOne") {
        changeTheme("themeTwo");
        currentTheme = "themeTwo";
        changeBackground()
    }
    else {
        changeTheme("themeOne");
        currentTheme = "themeOne";
        changeBackground()
        callApi()
    }
})

// Call API
var imgUrl;
// const callApi = () => {
//     const url = "https://api.unsplash.com/photos/random?query=drum"
//     fetch(url, {
//         headers: {
//             "Authorization": "Client-ID XOd-6TiyLtolPvJe1KT9s8t--ciPjFxQRz5KyybPxFo"
//         }
//     }).then(res => res.json())
//         .then(res => {
//             imgUrl = res.urls.small
//             changeBackground(imgUrl)
//         })
//         .catch(error => console.log(error))
// }

var images = [];

const callApi = () => {
    if (images.length > 0) {
        changeBackground(images.pop());
        return;
    }

    fetch("https://api.unsplash.com/photos/random?query=drum&count=5", {
        headers: {
            "Authorization": "Client-ID XOd-6TiyLtolPvJe1KT9s8t--ciPjFxQRz5KyybPxFo"
        }
    })
        .then(res => res.json())
        .then(res => {
            for (var i = 0; i < res.length; i++) {
                images.push(res[i].urls.small);
            }
            changeBackground(images.pop());
        });
}



callApi()

function changeBackground(src) {
    let containerStyle = document.getElementsByClassName("container")[0].style;
    let bgColor = getComputedStyle(document.documentElement).getPropertyValue("--background_low")
    containerStyle.background = `linear-gradient(300deg , ${bgColor} , ${bgColor}),url(${src})`;
    containerStyle.backgroundSize = "cover"
    containerStyle.backgroundPosition = "center"
}

const bgChanger = document.getElementById("util-button-background");
bgChanger.addEventListener("click", function () {
    callApi()
})