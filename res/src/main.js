const mainLander = document.querySelector('#main-lander');
const scrollButton = document.querySelector('#scroll-button');
const scrollableRegion = document.querySelector('#showcase-scrollable-region');
const taskbar = document.querySelector('#taskbar');
const timeEl = document.querySelector('#time');
const startButton = document.querySelector('#start-button');
const floatingWindow = document.querySelector('#floating-window');
const floatingWindowText = document.querySelector("#floating-window .text");
const part1 = document.querySelector(".part1");
const part2 = document.querySelector(".part2");
const part3 = document.querySelector(".part3");
const part4 = document.querySelector(".part4");
const part5 = document.querySelector(".part5");

let showcaseVisible = false;
let currentStage = 0;

scrollButton.onclick = () => {
    scrollableRegion.scrollIntoView({ behavior: 'smooth' });
};

const hasScrolledPast = (elm, offset = 0) => {
    return window.scrollY + offset >= elm.offsetTop + elm.offsetHeight;
}

const setShowcaseVisible = (visible) => {
    if(visible == showcaseVisible) return;

    showcaseVisible = visible;

    if(visible) show();
    else hide();
}

const show = () => {
    taskbar.classList.remove('hide');
    taskbar.classList.add('popout');
};

const hide = () => {
    taskbar.classList.add('hide');
    taskbar.classList.remove('popout');
    setStage(0);
};

const setStage = (stage) => {
    if(stage == currentStage) return;
    currentStage = stage;

    const taskmanagerEl = document.querySelector(".taskmanager .item.tm-"+currentStage);
    if(taskmanagerEl) {
        document.querySelectorAll('.taskmanager .item').forEach(el => {
            el.classList.remove("selected");
        })
        taskmanagerEl.classList.add("selected");
    }
    

    switch(currentStage) {
        case 1:
            floatingWindow.classList = ["window"];
            floatingWindow.classList.add("p1");
            floatingWindowText.innerHTML = "Löytyy n. 6 vuotta kokemusta ohjelmoinnin saralta, joista n. 1.5 on työkokemusta. Kokemusta on kertynyt enimmäkseen web-kehityksen piiristä, mutta mukaan on mahtunut myös mobiilikehitystä, pelikehitystä ja VR-kehitystä. Parhaiten hallussa olevat ohjelmointikielet ovat JavaScript, PHP, SQL, C# ja C++.";
            break;
        case 2:
            floatingWindow.classList = ["window"];
            floatingWindow.classList.add("p2");
            floatingWindowText.innerHTML = "Teknologioita, joita olen käyttänyt työympäristössä ovat mm. Xamarin, ASP.NET, C#, Visual Basic .NET, C++, SQL-tietokannat, PHP sekä JavaScript. Omalla ajalla kokemusta on kertynyt näiden lisäksi myös teknologioista Node.js, express, React ja websockets.";
            part3.classList.remove("current");
            break;

        case 3:
            floatingWindow.classList = ["window"];
            part3.classList.add("current");
            part4.classList.remove("current");
            break;

        case 4:
            floatingWindow.classList = ["window"];
            part4.classList.add("current");
            break;
        
        case 5:
            floatingWindow.classList = ["window"];
            floatingWindow.classList.add("p1");
            floatingWindowText.innerHTML = "Olen tällä hetkellä avoinna kaikenlaisille työmahdollisuuksille, ota rohkeasti yhteyttä!";
            break;

        case 6:
            floatingWindow.classList.add("flip");
            break;
            
        default:
            floatingWindow.classList = ["window"];
            break;
    }

}

window.onscroll = (e) => {
    if (!hasScrolledPast(mainLander)) {
        setShowcaseVisible(false);
        setStage(0);
        return;
    } 

    setShowcaseVisible(true);
    
    if(window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight) {
        setStage(6);
        return
    }
    
    if(hasScrolledPast(part4)) {
        setShowcaseVisible(true);
        setStage(5);
        return
    }
    
    if(hasScrolledPast(part3, 260)) {
        setStage(4);
        setShowcaseVisible(false);
        return
    }

    if(hasScrolledPast(part2)) {
        setStage(3);
        setShowcaseVisible(false);
        return
    }

    if(hasScrolledPast(part1, 150)) {
        setStage(2);
        setShowcaseVisible(true);
        return
    }

    setStage(1);
};

startButton.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

const updateTime = () => {
    const now = new Date();
    timeEl.innerHTML = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
};

updateTime();
setInterval(updateTime, 5000);
