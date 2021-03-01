import Vue from "vue";
import ErrorMsg from "@/components/errorMsg/error-msg";

const messageBox = Vue.extend(ErrorMsg);

let instance = null;

ErrorMsg.install = function (code, msg, type) {
  if (!instance || !instance.visible) {
    const options = {};
    options.code = code;
    options.msg = msg;
    options.type = type;
    if (!instance) {
      instance = new messageBox({
        data: options
      }).$mount();
    } else {
      instance.code = code;
      instance.msg = msg;
      instance.type = type;
    }
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  }
};

export default ErrorMsg;
