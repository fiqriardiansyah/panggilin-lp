$('.jumbotron').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
});

const getLang = () => {
    const availableLang = ["en", "id"];
    const memoLang = localStorage.getItem("lang");
    const browserLang = navigator.language || navigator.userLanguage;

    if(memoLang) return memoLang;
    return availableLang.find((lang) => browserLang.includes(lang));
};
const setLang = (lang) => localStorage.setItem("lang", lang);

const getDictionary = async (lang) => {
    const req = await fetch(`/lang/${lang}.json`);
    const json = await req.json();
    return json;
}

const setDictionary = async () => {
    try {
        const dictionary = await getDictionary(getLang())
        Object.keys(dictionary || {}).forEach((key) => {
            const elements = document.querySelectorAll("." + key);
            elements.forEach((element) => {
                if(element) {
                    element.innerHTML = dictionary[key];
                }
            })
        })
    } catch (e) {
        setLang("en");
        setDictionary();
    }
}

const setLangText = () => {
    const langText = document.querySelector("#switch-lang span");
    if(langText) {
        langText.innerHTML = getLang();
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const checkboxLang = document.querySelector("#switch-lang input");

    if(getLang() === "en") checkboxLang.checked = true
    else checkboxLang.checked = false

    setLangText();

    setDictionary();

    checkboxLang.addEventListener("click", () => {
        setLang(checkboxLang.checked ? "en" : "id");
        setDictionary();
        setLangText();
    });

});