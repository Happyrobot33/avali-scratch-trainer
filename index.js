// radio button
var radioButtons = document.getElementById("customOrRandom");
// Custom text input
var customText = document.getElementById("customText");
//continually update the text
var outputText = document.getElementById("outputText");

var percentageSlider = document.getElementById("percentage");
var percentagePreview = document.getElementById("percentageValue");
percentagePreview.innerHTML = percentageSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
percentageSlider.oninput = function() {
    percentagePreview.innerHTML = this.value;
}

// font size
var fontSizeSlider = document.getElementById("fontSize");
var fontSizePreview = document.getElementById("fontSizeValue");
fontSizePreview.innerHTML = fontSizeSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
fontSizeSlider.oninput = function() {
    fontSizePreview.innerHTML = this.value;
    outputText.style.fontSize = fontSizeSlider.value + "px";
}


//run update when any custom text changes, the slider changes, or the radio buttons change
customText.addEventListener("input", update);
percentageSlider.addEventListener("input", update);
radioButtons.addEventListener("change", update);

function update() {
    var radioButtons = document.querySelector('input[name="customOrRandom"]:checked');
    if (radioButtons.value == "custom") {
        outputText.innerHTML = customText.value;
    } else if (radioButtons.value == "random") {
        //outputText.innerHTML = generateRandomText();
        outputText.innerHTML = "Should be random text here. Coming soon!";
    }
    scratchifyText(outputText);
    outputText.style.fontSize = fontSizeSlider.value + "px";
}

// Takes in a html element and randomly turns words in it to the scratch font
function scratchifyText(element) {
    //add a space before every new line so words get split properly
    element.innerHTML = element.innerHTML.replace(/\n/g, " \n");
    var words = element.innerHTML.split(" ");
    var newWords = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var newWord = "";
        
        // Randomly decide if the word should be scratch
        var shouldScratch = Math.random() < percentageSlider.value / 100;
        if (shouldScratch) {
            newWord += "<span class='scratch'>" + word + "</span>";
        } else {
            newWord = word;
        }
        
        newWords.push(newWord);
    }
    element.innerHTML = newWords.join(" ");
    //properly account for new lines
    element.innerHTML = element.innerHTML.replace(/\n/g, "<br>");
}
