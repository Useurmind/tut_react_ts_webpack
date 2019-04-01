// fetch("https://raw.githubusercontent.com/Useurmind/tut_react_ts_webpack/master/README.md")
fetch("README.md")
.then(response => response.text())
.then(text => {
    var sourceArea = document.getElementById("source");
    sourceArea.textContent = text;
    var slideshow = remark.create();
});