function cLog(text, subtext = "") {
    subtext = subtext.trim() === "" ? "" : `(${subtext})`;
    console.log(`[Yt Monetization Check] ${text} ${subtext}`);
}

function isChannelHomePage(){
    let urlObject = new URL(window.location.href);
    const pathname = urlObject.pathname;
    const e = new RegExp(/\/(user|channel|c|@)?\/?[0-9a-zA-Z-_]+/);
    return e.test(pathname) ? true : false
}

const waitForElement = (selector) => {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
  
        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
  
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
};

function createMonetizeButton(){
    let style = `<style>
    #yt-monetize-div {
        color: #ffffff !important;
        font-size: 2.1rem !important;
        line-height: 1.8rem !important;
        padding: 10px 15px;
        border-radius: 50%;
    }
    .monetized-text {
        background: #4CBB17;
    }
    .unmonetized-text {
        background: #FF0000;
    }
    </style>`;
    let monetizeDiv = document.getElementById("yt-monetize-div"),
        is_monetize = getIsMonetized() == 'true' ? "monetized" : "unmonetized";
    if(!monetizeDiv){
        document.head.insertAdjacentHTML("beforeend", style);
        document.getElementById('inner-header-container').childNodes[0].insertAdjacentHTML(
            "afterend",
            `
            <div id="yt-monetize-div" class="meta-item ytd-c4-tabbed-header-renderer ${is_monetize}-text">
                <span aria-label="Channel is Monetized">$</span>
            </span>
            `
        );
    } else {
        monetizeDiv.setAttribute('class', 'meta-item ytd-c4-tabbed-header-renderer '+is_monetize+'-text')
    }
}

function getIsMonetized(){
    var currentURL = window.location.href.split("?")[0].split("#")[0]
    var req = new XMLHttpRequest();
    req.open('GET', currentURL, false);
    req.send(null);
    let res = req.responseText
    let isMonetized = res.split(`{"key":"is_monetization_enabled","value":"`)[1].split(`"},`)[0];
    return isMonetized;
}

function setEventListeners(evt){
    let jsInitChecktimer;
    function checkForJS_Finish() {
        if (isChannelHomePage()){
            waitForElement('#meta').then(() => {
                createMonetizeButton();
            });
        }
        clearInterval(jsInitChecktimer);
        jsInitChecktimer = null;
    }
    jsInitChecktimer = setInterval(checkForJS_Finish, 250);
}

(function () {
  "use strict";
  window.addEventListener("yt-navigate-finish", setEventListeners, true);
  setEventListeners();
})();