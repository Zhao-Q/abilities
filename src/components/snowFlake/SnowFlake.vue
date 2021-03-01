<template>
  <div id="snowbox">
    <slot></slot>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "SnowFlake",
  data() {
    return {
      flakeOptions: {
        minSize: 5,
        maxSize: 30,
        newOn: 50,
        speed: 10,
      },
      bgWidth: 1000,
      bgHeight: 500,
    };
  },
  mounted() {
    this.bgWidth = $(document).width();
    this.bgHeight = $(document).height();
    $("#snowbox").css({
      width: this.bgWidth,
      height: this.bgHeight,
      "background-color": "#000",
      "z-index": 0,
    });
    this.snow(this.flakeOptions);
  },
  methods: {
    snow(options) {
      var $flake = $("<span />").css({ position: "absolute" }).html("&#10052;");

      var defaults = {
        minSize: 10,
        maxSize: 30,
        newOn: 500,
        speed: 10,
        flakeColor: "#FFFFFF",
      };
      options = $.extend({}, defaults, options);

      setInterval(() => {
        var startPositionLeft = Math.random() * this.bgWidth - 100,
          startOpacity = 0.5 + Math.random(),
          size = options.minSize + Math.random() * options.maxSize,
          endPositionTop = this.bgHeight - options.maxSize,
          endPositionLeft = startPositionLeft - 10 + Math.random() * 10,
          speed = (this.bgHeight * 10) / options.speed + Math.random() * 5000;
        $flake
          .clone()
          .appendTo("#snowbox")
          .css({
            left: startPositionLeft,
            opacity: startOpacity,
            "font-size": size,
            "line-height": 0,
            color: options.flakeColor,
          })
          .animate(
            { top: endPositionTop, left: endPositionLeft, opacity: 0.2 },
            speed,
            "linear",
            function () {
              $(this).remove();
            }
          );
      }, options.newOn);
    },
  },
};
</script>

<style scoped>
#snowbox {
  height: 100%;
  background-color: black;
}
</style>

