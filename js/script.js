/**
 * Full-Stack Fetch Sandbox Core Script
 */

// --- GLOBAL DEVELOPMENT SETTINGS ---
// Modes available: "console" (quiet logging) or "screen" (renders error box in UI)
const ERROR_MODE = "screen"; 

// Typography configuration rules
const fonts = ["Qwitcher Grypen", "Tulpen One", "Shadows Into Light"];
var rotating = 0; // Tracks which font index to apply next


document.getElementById("fetchData").addEventListener("click", getRandomQuote);

function getRandomQuote() {
  // Clear out any stale errors from a previous click attempt

  clearDisplayErrors();
  // OLD LOCAL WAY: fetch("random_quotes.php")
  // NEW REMOTE API WAY:
  fetch("https://newmanix.com/classes/it102/random_quotes.php")
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP Error! Status: ${response.status}`);
          }
          return response.text();
      })
      .then(data => {
          const quoteContainer = document.getElementById("result");
          quoteContainer.innerHTML = data;
          
          // Font rotation mechanics continue as normal...
          // --- TYPOGRAPHY LOOP ROTATION ---
          // 1. Set the element's inline font-family to the current font index matching our counter
          quoteContainer.style.fontFamily = fonts[rotating];
          
          // 2. Add 1 to counter. The % remainder operator forces it to cycle back to 0 when it hits the limit!
          rotating = (rotating + 1) % fonts.length; 
          
          // Transition animation execution
          quoteContainer.classList.remove("fade-in");
          void quoteContainer.offsetWidth; 
          quoteContainer.classList.add("fade-in"); 
      })

      .catch(error => {
          handleError("API Fetch Failure: " + error.message);
      });
  };
  
function handleRoutingError(error) {
  const errorMessage = `⚠️ FETCH FAILURE DETAILS:\n-------------------------\nMessage: ${error.message}\nType: ${error.name}`;
  
  if (ERROR_MODE === "screen") {
    const errorBox = document.getElementById("error-display");
    errorBox.textContent = errorMessage;
    errorBox.style.display = "block";
  } else {
    console.error("❌ AJAX Routing Error:", error);
  }
}

/**
 * Resets the visual layout state before firing a clean request
 */
function clearDisplayErrors() {
  const errorBox = document.getElementById("error-display");
  errorBox.textContent = "";
  errorBox.style.display = "none";
}

// --- AUTOMATION ENGINE ---
// 1. Run the function immediately when the DOM layout is loaded stable
document.addEventListener("DOMContentLoaded", () => {
    getRandomQuote(); 
    
    // 2. Set an infinite recurring timer loop (5000ms = 5 seconds)
    setInterval(getRandomQuote, 5000);
});