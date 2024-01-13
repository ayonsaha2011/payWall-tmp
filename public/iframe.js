
var visitorId = localStorage.getItem('visitorId');

function createIframe(visitorId) {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "http://ec2-54-219-91-186.us-west-1.compute.amazonaws.com:8085/?visitorId=" + visitorId);
    ifrm.title = "MetaBloom";
    ifrm.classList.add("metaBloomFrame");
    document.body.appendChild(ifrm);
}

function init() {
    if (visitorId && visitorId !== 'undefined') {
        return createIframe(visitorId);
    } else {
        ThumbmarkJS.getFingerprint()
            .then(fp => {
                // This is the visitor identifier:
                visitorId = fp
                console.log('visitorId ==', visitorId);
                localStorage.setItem('visitorId', visitorId)
                createIframe(visitorId);
            })
            .catch(err => {
                console.log('err ==', err)
            });
    }

}

const style = document.createElement('style');
style.innerHTML = `
      * {
            padding: 0;
            margin: 0;
        }

        body {
            padding: 0;
            margin: 0;
            height: 100%;
            background: #161f29;
        }

        body iframe.metaBloomFrame {
            border: none;
            vertical-align: middle;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh !important;
            width: 100%;
        }

        body.iphone iframe.metaBloomFrame {
            height: calc(100vh - 80px) !important;
        }

        body.android iframe.metaBloomFrame {
            height: calc(100vh - 58px) !important;
        }
    `;
document.head.appendChild(style);
document.addEventListener("DOMContentLoaded", function () {
    // Check if the user agent contains "iPhone"
    if (/iPhone/i.test(navigator.userAgent)) {
        // If it's an iPhone, add a class to the body
        document.body.classList.add("iphone");
    }
    // Check if the user agent contains "android"
    if (/android/i.test(navigator.userAgent)) {
        // If it's an android, add a class to the body
        document.body.classList.add("android");
    }

    init();
});