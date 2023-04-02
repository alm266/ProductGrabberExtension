/**
 * Listens for clicks on the popup menu and runs selected option
 */
function listenForClicks() {
    document.addEventListener('click', (e) => {

        browser.tabs.query({active: true, currentWindow: true})
            .then(grabber)
            .catch(reportError);
        
    })
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/content_scripts/grabber.js" })
  .then(listenForClicks)