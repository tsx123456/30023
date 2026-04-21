System.register(["./application.76b62.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, application;

  function topLevelImport(url) {
    return System["import"](url);
  }

  return {
    setters: [function (_application76b62Js) {
      Application = _application76b62Js.Application;
    }],
    execute: function () {
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      application = new Application();
      topLevelImport('cc').then(function (engine) {
        return application.init(engine);
      }).then(function () {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        function adjustCocosSizing() {
          if (!isMobile && window.innerWidth >= 768) {
              const container = document.getElementById('GameDiv');
              const canvas = document.getElementById('GameCanvas');
              
              // 确保canvas正确渲染
              if (window.cc && cc.game) {
                  cc.game.container = container;
                  cc.game.canvas = canvas;
                  cc.game.frame = container;
                  
                  // 通知Cocos重新计算大小
                  if (cc.view) {
                      cc.view.setDesignResolutionSize(
                          760,
                          1334,
                          cc.ResolutionPolicy.SHOW_ALL
                      );
                  }
              }
          }
        }
        if (!isMobile){
          // 监听事件
          window.addEventListener('load', adjustCocosSizing);
          window.addEventListener('resize', adjustCocosSizing);
          
          // 如果使用了cc.game.onStart，在其中也调用
          if (window.cc && cc.game) {
            const originalOnStart = cc.game.onStart;
            cc.game.onStart = function() {
                if (originalOnStart) {
                    originalOnStart.apply(this, arguments);
                }
                adjustCocosSizing();
            };
          }
        }

return application.start();
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
});