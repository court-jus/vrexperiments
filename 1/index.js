const text = document.getElementById("debug");
const camera = document.getElementById("camera");
const VERSION = "11";
const velocity = {
    forward: 0,
    lateral: 0,
    vertical: 0
};

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
        if (evt.detail.y > 0.95) {
            velocity.forward += evt.detail.y;
            doLog("DOWN " + velocity.forward.toString());
        }
        if (evt.detail.y < -0.95) {
            velocity.forward += evt.detail.y;
            doLog("UP " + velocity.forward.toString());
        }
        if (evt.detail.x < -0.95) {
            velocity.lateral += evt.detail.y;
            doLog("LEFT " + velocity.lateral.toString());
        }
        if (evt.detail.x > 0.95) {
            velocity.lateral += evt.detail.y;
            doLog("RIGHT " + velocity.lateral.toString());
        }
    },
    triggerPressed: function (evt) {
        doLog( "Trigger");
        velocity.forward = 0;
        velocity.lateral = 0;
        velocity.vertical = 0;
    }
});

setTimeout(() => {
    doLog("Ready!" + VERSION);
}, 1000);


setTimeout(() => {
    doLog("Still there!" + VERSION);
}, 10000);


setTimeout(() => {
    doLog("Not dead!" + VERSION);
}, 30000);

