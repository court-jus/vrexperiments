const text = document.getElementById("debug");
const camera = document.getElementById("cameraRig");
const newPosition = new THREE.Vector3();
const oldPosition = new THREE.Vector3();
const oldOrientation = new THREE.Quaternion();
console.log("cam", camera);
const VERSION = "19";
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
        velocity.forward = evt.detail.y / 4;
        velocity.lateral = evt.detail.x / 4;
    },
    triggerPressed: function (evt) {
        doLog( "Trigger");
        velocity.forward = 0;
        velocity.lateral = 0;
        velocity.vertical = 0;
    },
    tick: function () {
        this.updateCameraPosition();
    },
    updateCameraPosition: (function () {
        return function () {
            camera.object3D.getWorldPosition(oldPosition);
            camera.object3D.getWorldQuaternion(oldOrientation);
            oldPosition.copy(newPosition);
            newPosition.x += velocity.lateral;
            newPosition.z += velocity.forward;
            camera.setAttribute("position", newPosition);
        };
    })()
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

