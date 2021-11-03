const text = document.getElementById("debug");
const VERSION = "4";
text.setAttribute("value", "Loading.... " + VERSION);

const doLog = (message) => {
    console.log(message);
    text.setAttribute("value", message);
}

AFRAME.registerComponent('thumbstick-logging', {
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.logThumbstick);
        this.el.addEventListener("triggerdown", this.triggerPressed);
    },
    logThumbstick: function (evt) {
        if (evt.detail.y > 0.95) { text.setAttribute("value","DOWN"); }
        if (evt.detail.y < -0.95) { text.setAttribute("value","UP"); }
        if (evt.detail.x < -0.95) { text.setAttribute("value","LEFT"); }
        if (evt.detail.x > 0.95) { text.setAttribute("value","RIGHT"); }
    },
    triggerPressed: function (evt) {
        text.setAttribute("value", "Trigger");
    }
});

setTimeout(() => {
    doLog("Ready!" + VERSION);
}, 1000);

