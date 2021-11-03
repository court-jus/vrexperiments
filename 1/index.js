const text = document.getElementById("debug");
const velocity = {
    forward: 0,
    lateral: 0,
    vertical: 0
};
text.setAttribute("value", "Loading....");

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
        if (evt.detail.y > 0.95) { doLog("DOWN"); }
        if (evt.detail.y < -0.95) { doLog("UP"); }
        if (evt.detail.x < -0.95) { doLog("LEFT"); }
        if (evt.detail.x > 0.95) { doLog("RIGHT"); }
    },
    triggerPressed: function (evt) {
        doLog("trigger");
    }
});
/*
AFRAME.registerComponent('thumbstick-move', {
    init: function() {
        this.el.addEventListener('thumbstickmoved', this.thumbstickMoved);
        doLog(JSON.stringify(velocity));
    },
    thumbstickMoved: function(evt) {
        if (evt.detail.y > 0.95) {
            velocity.forward -= 1;
            doLog(JSON.stringify(velocity));
        }
        if (evt.detail.y < -0.95) {
            velocity.forward += 1;
            doLog(JSON.stringify(velocity));
        }
        if (evt.detail.x < -0.95) {
            velocity.lateral -= 1;
            doLog(JSON.stringify(velocity));
        }
        if (evt.detail.x > 0.95) {
            velocity.lateral += 1;
            doLog(JSON.stringify(velocity));
        }
    }
})
*/

setTimeout(() => {
    doLog("Ready!");
}, 1000);

setTimeout(() => {
    doLog("Still there!");
}, 10000);

setTimeout(() => {
    doLog("Not dead!");
}, 30000);

/*
      <a-entity oculus-touch-controls="hand: left" thumbstick-move></a-entity>
*/
