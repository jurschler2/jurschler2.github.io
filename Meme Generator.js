let button, memeURL, topTextInput, bottomTextInput, memeArea, newMeme, topText, bottomDiv, image, deleteMeme;

window.onload = function() {
    button = document.getElementById("generate-button");
    button.addEventListener ("click", function() {
        memeURL = document.getElementById("meme-url").value;
        document.getElementById("meme-url").value = "";
        topTextInput = document.getElementById("top-text").value;
        document.getElementById("top-text").value="";
        bottomTextInput = document.getElementById("bottom-text").value;
        document.getElementById("bottom-text").value = "";
        createMeme(memeURL, topTextInput, bottomTextInput);
    })
}

function createMeme(memeURL, topTextInput, bottomTextInput) {
    memeArea = document.getElementById("meme-area");
    newMeme = document.createElement("div");
    newMeme.className = "meme";
    topText = document.createElement("div");
    topText.className = "meme-text-top";
    topText.innerText = topTextInput;
    bottomText = document.createElement("div");
    bottomText.className = "meme-text-bottom";
    bottomText.innerText = bottomTextInput;
    image = document.createElement("img");
    image.src = memeURL;
    deleteMeme = document.createElement("div");
    deleteMeme.className = "deleteMeme";
    deleteMeme.innerText = "X"
    newMeme.appendChild(image);
    newMeme.appendChild(topText);
    newMeme.appendChild(bottomText);
    newMeme.appendChild(deleteMeme);
    memeArea.appendChild(newMeme);
    deleteMeme.addEventListener("click", function(){
        event.target.parentNode.remove();
    })
};