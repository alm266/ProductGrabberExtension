(() => {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    console.log('running')

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "beastify") {
            insertBeast(message.beastURL);
        } else if (message.command === "reset") {
            removeExistingBeasts();
        }
    });
})();