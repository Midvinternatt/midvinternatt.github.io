const debugActive = true;
export default function Debug(msg, force = false, element) {
    if (!debugActive || force)
        return;
    if (element)
        document.getElementById("debug").innerText = msg;
    else
        console.log(msg);
}
//# sourceMappingURL=Debug.js.map