<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="visible"
               width="30%">
      <el-form label-position="left"
               label-width="90px"
               size="mini">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="getErrorCodeLabel()">
              {{code}} {{tip}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="getErrorMsgLabel()"
                          style="overflow:auto">
              <span style="width:100%;display:block;word-break:break-all;">
                {{msg}}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   class="copy_btn"
                   :data-clipboard-text="msg"
                   data-clipboard-action="copy">{{getCopyButton()}}</el-button>
        <el-button size="mini"
                   @click="visible = false">{{getCancelButton()}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  data() {
    return {
      title: window.i18n_vm.t("component.error_tip"),
      tip: window.i18n_vm.t("component.system_error"),
      msg: "",
      code: "",
      time: 3000,
      visible: false,
      type: "info",
      hasClose: false
    };
  },
  mounted() {
    let clipboard = new Clipboard(".copy_btn");
    clipboard.on("success", e => {
      this.visible = false;
    });
    clipboard.on("error", e => {
      this.visible = false;
    });
  },
  methods: {
    getErrorCodeLabel() {
      return window.i18n_vm.t("component.error_code") + ":";
    },
    getErrorTipLabel() {
      return window.i18n_vm.t("component.system_error") + ":";
    },
    getErrorMsgLabel() {
      return window.i18n_vm.t("component.error_msg") + ":";
    },
    getCopyButton() {
      return window.i18n_vm.t("component.copy_button");
    },
    getCancelButton() {
      return window.i18n_vm.t("component.cancel_button");
    }
  }
};
</script>
