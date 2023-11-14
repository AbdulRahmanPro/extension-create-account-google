document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('start');
    var stopButton = document.getElementById('stop');

    if (startButton) {
        startButton.addEventListener('click', function() {
            chrome.tabs.create({ url: 'https://accounts.google.com/signup/v2' });
            // هنا يمكنك إرسال رسالة لبدء السكريبت إذا كان مطلوبًا
        });
    }

    if (stopButton) {
        stopButton.addEventListener('click', function() {
            console.log("Bad")
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "stopScript"});
            });
        });
    }
});

