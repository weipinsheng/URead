var fun = function(perRem, planWidth) {
    var doc = document,
        win = window;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth >= 1600 ? 1600 : docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = perRem * (clientWidth / planWidth) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
fun(100, 1366);

