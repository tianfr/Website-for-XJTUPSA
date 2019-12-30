$(function() {

  info = {};

  var step = $("#myStep").step({
    animate: true,
    initStep: 1,
    speed: 1000
  });
  $("#preBtn").click(function(event) {
    var yes = step.preStep();
  });
  $("#applyBtn").click(function(event) {
    let name = $.trim($("#name").val());
    let sex = $.trim($("#sex").val());
    let age = $.trim($("#age").val());
    let classnum = $.trim($("#classnum").val());
    let college = $.trim($("#college").val());
    let studentID = $.trim($("#studentID").val());
    info.name = name;
    info.sex = sex;
    info.age = age;
    info.classnum = classnum;
    info.college = college;
    info.studentID = studentID;

    if (name == "") {
      Tip('姓名未填写！');
      $("#name").focus();
      return;
    }
  
    if (sex == "") {
      Tip('性别未填写！');
      $("#name").focus();
      return;
    }
    if (age == "") {
      Tip('年龄未填写！');
      $("#name").focus();
      return;
    }
    if (classnum == "") {
      Tip('班级未填写！');
      $("#name").focus();
      return;
    }
    if (college == "") {
      Tip('学院未填写！');
      $("#name").focus();
      return;
    }
    if (studentID == "") {
      Tip('学号未填写！');
      $("#name").focus();
      return;
    }
    var yes = step.nextStep();
    return;
  });
  $("#submitBtn").click(function(event) {
    var phonetemp =/[1][3-9][0-9]{9,9}/;
    var phones = $.trim($("#phone").val());
    if ($.trim(phones) == "") {
      Tips('请填写手机号码！');
      $("#phone").focus();
      return;
    }
    if(!phonetemp.exec(phones)){
      Tips('手机输入格式不正确,请重新输入');
      $("#phones").focus();
      return;
    }

    let phone = $.trim($("#phone").val());
    let qq = $.trim($("#qq").val());
    let wechat = $.trim($("#wechat").val());
    let suit = $.trim($("#suit").val());


    info.phone = phone;

    info.qq = qq;
    info.wechat = wechat;
    info.suit = suit;


    if (qq == "") {
      Tips('qq号码未填写！');
      $("#qq").focus();
      return;
    }
    if (wechat == "") {
      Tips('微信号码未填写！');
      $("#wechat").focus();
      return;
    }
    if (suit == "") {
      Tips('是否有正装未填写！');
      $("#suit").focus();
      return;
    }

    setInfo(info);

    var yes = step.nextStep();

  });
  $("#goBtn").click(function(event) {
      
    var yes = step.goStep(3);
  });
  $("#gobackFirst").click(function(event) {
    step.goStep(1);
  })

  // 设置信息
  function setInfo(info) {
    $("#name-verify").val(info.name);
    $("#sex-verify").val(info.sex);
    $("#age-verify").val(info.age);
    $("#classnum-verify").val(info.classnum);
    $("#college-verify").val(info.college);
    $("#studentID-verify").val(info.studentID);
    $("#phone-verify").val(info.phone);

    $("#qq-verify").val(info.qq);
    $("#wechat-verify").val(info.wechat);
    $("#suit-verify").val(info.suit);

  }
});

(function(factory) {
  "use strict";
  if (typeof define === "function") {
    // using CMD; register as anon module
    define.cmd &&
      define("jquery-step", ["jquery"], function(require, exports, moudles) {
        var $ = require("jquery");
        factory($);
        return $;
      });
    define.amd && define(["jquery"], factory);
  } else {
    // no CMD; invoke directly
    factory(typeof jQuery != "undefined" ? jQuery : window.Zepto);
  }
})(function($) {
  $.fn.step = function(options) {
    var opts = $.extend({}, $.fn.step.defaults, options);
    var size = this.find(".step-header li").length;
    var barWidth =
      opts.initStep < size
        ? 100 / (2 * size) + (100 * (opts.initStep - 1)) / size
        : 100;
    var curPage = opts.initStep;

    this.find(".step-header").prepend(
      '<div class="step-bar"><div class="step-bar-active"></div></div>'
    );
    this.find(".step-list")
      .eq(opts.initStep - 1)
      .show();
    if (size < opts.initStep) {
      opts.initStep = size;
    }
    if (opts.animate == false) {
      opts.speed = 0;
    }
    this.find(".step-header li").each(function(i, li) {
      if (i < opts.initStep) {
        $(li).addClass("step-active");
      }
      //$(li).prepend("<span>"+(i+1)+"</span>");
      $(li).append("<span>" + (i + 1) + "</span>");
    });
    this.find(".step-header li").css({
      width: 100 / size + "%"
    });
    this.find(".step-header").show();
    this.find(".step-bar-active").animate(
      {
        width: barWidth + "%"
      },
      opts.speed,
      function() {}
    );

    this.nextStep = function() {
      if (curPage >= size) {
        return false;
      }
      return this.goStep(curPage + 1);
    };

    this.preStep = function() {
      if (curPage <= 1) {
        return false;
      }
      return this.goStep(curPage - 1);
    };

    this.goStep = function(page) {
      if (page == undefined || isNaN(page) || page < 0) {
        if (window.console && window.console.error) {
          console.error("the method goStep has a error,page:" + page);
        }
        return false;
      }
      curPage = page;
      this.find(".step-list").hide();
      this.find(".step-list")
        .eq(curPage - 1)
        .show();
      this.find(".step-header li").each(function(i, li) {
        $li = $(li);
        $li.removeClass("step-active");
        if (i < page) {
          $li.addClass("step-active");
          if (opts.scrollTop) {
            $("html,body").animate({ scrollTop: 0 }, "slow");
          }
        }
      });
      barWidth =
        page < size ? 100 / (2 * size) + (100 * (page - 1)) / size : 100;
      this.find(".step-bar-active").animate(
        {
          width: barWidth + "%"
        },
        opts.speed,
        function() {}
      );
      return true;
    };
    return this;
  };

  $.fn.step.defaults = {
    animate: true,
    speed: 500,
    initStep: 1,
    scrollTop: true
  };
});

