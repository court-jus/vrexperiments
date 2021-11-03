const text = document.getElementById("debug");
const player = document.getElementById("player");
const newPosition = new THREE.Vector3();
const oldPosition = new THREE.Vector3();
const oldOrientation = new THREE.Quaternion();
const newOrientation = new THREE.Quaternion();
const VERSION = "25";
const velocity = {
    forward: 0,
    lateral: 0,
    vertical: 0
};
let playerAngle = 0;

text.setAttribute("value", "Loading.... " + VERSION);

const doLog = (message) => {
    console.log(message);
    text.setAttribute("value", message);
}

AFRAME.registerComponent('thumbstick-moving', {
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.handleThumbstick);
    },
    handleThumbstick: function (evt) {
        velocity.forward = evt.detail.y / 10;
        velocity.lateral = evt.detail.x / 10;
    },
    tick: function () {
        this.updatePlayerPosition();
    },
    updatePlayerPosition: (function () {
        return function () {
            player.object3D.position.x += velocity.lateral;
            player.object3D.position.z += velocity.forward;
        };
    })()
});

AFRAME.registerComponent('thumbstick-rotating', {
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.handleThumbstick);
    },
    handleThumbstick: function (evt) {
        playerAngle -= evt.detail.x / 10;
    },
    tick: function () {
        this.updatePlayerDirection();
    },
    updatePlayerDirection: (function () {
        return function () {
            player.object3D.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), playerAngle);
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

