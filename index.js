"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    // 获取cookie
    getCookie: function getCookie(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return null;
    },

    // 设置cookie
    setCookie: function setCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    // 删除cookie
    deleteCookie: function deleteCookie(name) {
        setCookie(name, "", -1);
    },

    // 获取url参数
    getUrl: function getUrl() {
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    // 深拷贝
    deepClone: function (_deepClone) {
        function deepClone(_x) {
            return _deepClone.apply(this, arguments);
        }

        deepClone.toString = function () {
            return _deepClone.toString();
        };

        return deepClone;
    }(function (source) {
        if (!source || (typeof source === "undefined" ? "undefined" : _typeof(source)) !== 'object') {
            throw new Error('error arguments', 'shallowClone');
        }
        var targetObj = source.constructor === Array ? [] : {};
        for (var keys in source) {
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && _typeof(source[keys]) === 'object') {
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = deepClone(source[keys]);
                } else {
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    }),

    // 获取字符串长度，中文等于两个字节，英文等于一个
    getLength: function getLength(str) {
        if (str == null) return 0;
        if (typeof str != "string") {
            str += "";
        }
        return str.replace(/[^\x00-\xff]/g, "01").length;
    }
};