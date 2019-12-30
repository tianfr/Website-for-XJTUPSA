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
    let chineseName = $.trim($("#chineseName").val());
    let englishName = $.trim($("#englishName").val());
    let sex = $.trim($("#sex").val());
    let school = $.trim($("#school").val());
    let grade = $.trim($("#grade").val());
    let organization = $.trim($("#organization").val());
    let identity = $.trim($("#identity").val());
    let leader = $.trim($("#leader").val());
    info.chineseName = chineseName;
    info.englishName = englishName;
    info.sex = sex;
    info.school = school;
    info.grade = grade;
    info.organization = organization;
    info.identity = identity;
    info.leader = leader;

    if (chineseName == "") {
      Tip('中文姓名未填写！');
      $("#name").focus();
      return;
    }
    if (englishName == "") {
      Tip('英文姓名未填写！');
      $("#name").focus();
      return;
    }
    if (sex == "") {
      Tip('性别未填写！');
      $("#name").focus();
      return;
    }
    if (school == "") {
      Tip('学校未填写！');
      $("#name").focus();
      return;
    }
    if (grade == "") {
      Tip('年级未填写！');
      $("#name").focus();
      return;
    }
    if (organization == "") {
      Tip('代表团和组织未填写！');
      $("#name").focus();
      return;
    }
    if (identity == "") {
      Tip('本次大会身份未填写！');
      $("#name").focus();
      return;
    }
    if (leader == "") {
      Tip('是否担任本次领队未填写！');
      $("#name").focus();
      return;
    }
    var yes = step.nextStep();
    return;
  });
  $("#submitBtn").click(function(event) {
    var phonetemp = /[1][3-9][0-9]{9,9}/;
    var phones = $.trim($("#phonenum").val());
    var idtemp=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var idcardnumber=$.trim($("#idCard").val());
    let idcardType = $.trim($("#idcardType").val());
    var emailtemp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if ($.trim(phones) == "") {
      Tip('请填写手机号码！');
      $("#phonenum").focus();
      return;
    }
    if(!phonetemp.exec(phones)){
      Tip('手机输入格式不正确,请重新输入');
      $("#phonenum").focus();
      return;
    }
    if ($.trim(idcardnumber) == "") {
      Tip('请填写证件号码！');
      $("#idCard").focus();
      return;
    }
    if(($.trim(idcardType) == "中华人民共和国居民身份证")&&(!idtemp.exec(idcardnumber))){
      Tip('身份证号输入格式不正确,请重新输入');
      $("#idCard").focus();
      return;
    }

    let phonenum = $.trim($("#phonenum").val());
    //let idcardType = $.trim($("#idcardType").val());
    let idCard = $.trim($("#idCard").val());
    let qq = $.trim($("#qq").val());
    let wechat = $.trim($("#wechat").val());
    let email = $.trim($("#email").val());
    let note = $.trim($("#note").val());

    info.phonenum = phonenum;
    info.idcardType = idcardType;
    info.idCard = idCard;
    info.qq = qq;
    info.wechat = wechat;
    info.email = email;
    info.note = note;

    if (qq == "") {
      Tip('qq号码未填写！');
      $("#qq").focus();
      return;
    }
    if (wechat == "") {
      Tip('微信号码未填写！');
      $("#wechat").focus();
      return;
    }
    if (email == "") {
      Tip('邮箱未填写！');
      $("#email").focus();
      return;
    }
    if(!emailtemp.exec(email)){
      Tip('邮箱输入格式不正确,请重新输入');
      $("#email").focus();
      return;
    }

    if (note == "") {
      Tip('备注未填写！');
      $("#note").focus();
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
    $("#chineseName-verify").val(info.chineseName);
    $("#englishName-verify").val(info.englishName);
    $("#sex-verify").val(info.sex);
    $("#school-verify").val(info.school);
    $("#grade-verify").val(info.grade);
    $("#organization-verify").val(info.organization);
    $("#identify-verify").val(info.identity);
    $("#leader-verify").val(info.leader);
    $("#phonenum-verify").val(info.phonenum);
    $("#idcardType-verify").val(info.idcardType);
    $("#idCard-verify").val(info.idCard);
    $("#qq-verify").val(info.qq);
    $("#wechat-verify").val(info.wechat);
    $("#email-verify").val(info.email);
    $("#note-verify").val(info.note);
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

