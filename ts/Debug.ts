const debugActive: boolean = true;

export default function Debug(msg, force: boolean = false, element?: boolean) {
    if(!debugActive || force) return;

    if(element)
        document.getElementById("debug").innerText = msg;
    else
        console.log(msg);
}