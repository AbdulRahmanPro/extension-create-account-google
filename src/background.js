chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Message received:", message);
    if (message.greeting === "hello") {
        // Handle the message
        sendResponse({farewell: "goodbye"});
    }
});
