(function(){define(["jquery"],function(n){var t;return t=function(){function t(t){var o,e,s;this.opts=t,null==this.opts&&(this.opts={}),s=this.opts,null==s.buttons&&(s.buttons=[]),null==s.cancelButtonIndex&&(s.cancelButtonIndex=-1),null==s.primaryButtonIndex&&(s.primaryButtonIndex=s.buttons.length-1),null==s.title&&(s.title="Alert"),null==s.closeable&&(s.closeable=!0),null==s.cssClass&&(s.cssClass=""),null==s.animated&&(s.animated=!0),null==s.id&&(s.id="modalid"+Math.round(1e4*Math.random())),s.animated&&(s.cssClass="fade "+s.cssClass),o=n(templates.modal({o:s})),o.find(".modal-title").append(s.title),e=o.find(".modal-body"),s.message&&e.append("<p>"+s.message+"</p>"),s.htmlMessage&&e.append(s.htmlMessage),n("body").append(o),o.find(".modal-button").click(function(){var n,t;return n=parseInt(this.dataset.count),t=s.buttons[n],s.onClick?s.onClick(o,n,t):void 0}),o.find(".modal-cancel").click(function(){return s.onCancel&&s.onCancel(o),o.modal("hide")}),o.on("hidden",function(){return o.remove(),s.onDismissed?s.onDismissed(o):void 0}),o.on("hide",function(){return s.onDismiss?s.onDismiss(o):void 0}),o.on("shown",function(){return s.onShown?s.onShown(o):void 0}),o.on("show",function(){return s.onShow?s.onShow(o):void 0}),o.modal(s.closeable?null:{keyboard:!1,backdrop:"static"})}return t}()})}).call(this);