const text = document.getElementById("debug");
const player = document.getElementById("player");
const newPosition = new THREE.Vector3();
const oldPosition = new THREE.Vector3();
const oldOrientation = new THREE.Quaternion();
const newOrientation = new THREE.Quaternion();
const VERSION = "32";
const velocity = new THREE.Vector3(0, 0, 0);
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
        velocity.z = evt.detail.y / 20;
        velocity.x = evt.detail.x / 20;
    },
    tick: function () {
        this.updatePlayerPosition();
    },
    updatePlayerPosition: (function () {
        return function () {
            const rotatedVelocity = new THREE.Vector3();
            rotatedVelocity.copy(velocity);
            rotatedVelocity.applyAxisAngle(new THREE.Vector3(0,1,0), playerAngle);
            player.object3D.position.x += rotatedVelocity.x;
            player.object3D.position.z += rotatedVelocity.z;
        };
    })()
});

AFRAME.registerComponent('y-reloads', {
    init: function () {
        this.el.addEventListener('ybuttondown', this.handleybuttondown);
    },
    handleybuttondown: function (evt) {
        window.location.reload();
    }
});

AFRAME.registerComponent('thumbstick-rotating', {
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.handleThumbstick);
    },
    handleThumbstick: function (evt) {
        playerAngle -= evt.detail.x / 20;
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

