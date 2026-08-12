/*
    TODO:
    - Overlay that tracks certain variables and updates every frame
    - Overlay view is togglable
*/
const debugActive = true;
export default function Debug(msg, force = false, element) {
    if (debugActive) {
        console.log(msg);
    }
}
//# sourceMappingURL=Debug.js.map