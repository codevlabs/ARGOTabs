(function(){define(["jquery","B64","cookies","opencontroller","alertcontroller","tournament","backends","localbackend","routes/routes","util","round","components","angular"],function(t,e,n,r,o,i,a,s,l,u,c){var d;return d=function(){function d(){var e,n=this;this.app=e=angular.module("argotabs",["components"]),e.controller("LoadingCtrl",["$scope",function(t){return t.loaded=!0}]),e.controller("RoutesList",["$scope","$location",function(t,e){return t.addRound=function(){var t;return t=n.tournament,t.rounds.push(new c(t))},t.removeRound=function(r){return new o({buttons:["Cancel","Delete"],cancelButtonIndex:0,primaryButtonIndex:1,title:"Delete Round "+(r+1),width:400,htmlMessage:"<p>Are you sure you want to delete Round "+(r+1)+"?</p><p>This will remove the pairing, all ballots and all scores associated with this round. Most mistakes can be corrected without deleting the whole round.</p>",onClick:function(o,i){return 1===i?t.$apply(function(){var t,i;return e.path().match(/^\/round/)&&e.path("/"),i=n.tournament,t=i.rounds[r],i.rounds.splice(r,1),t.destroy(),o.modal("hide")}):void 0}})}}]),l(this),this.injector=angular.bootstrap(document,["argotabs"]),t(document).ready(function(){return n.loadSession(function(){return new r(n)}),t(".fixed-menu").mouseover(function(){var e,n,r,o;return r=t(this).offset().left+325,o=t(window).width(),n=t(this).offset().left+t(this).width(),e=t(this).offset().left-t(this).width(),t(this).find("ul").offset({left:r>o?e:n})}),t(".action-open").click(function(){return n.open()}),t(".action-download").click(function(){return n.download()}),t(".action-saveaslocal").click(function(){return n.saveaslocal()}),t(".action-save").click(function(){return n.save()})}),this.autosaveStopped=0,setInterval(function(){return n.autosaveStopped?void 0:n.save(function(){},!0)},5e3)}return d.prototype.open=function(){var t=this;return this.save(function(){return new r(t)})},d.prototype.loadSession=function(t){var e,r,o,s,l,c,d,h=this;if(s=n.get("lastBackend"),l=n.get("lastFileName"),o=!1,s&&l)for(c=0,d=a.length;d>c;c++)if(e=a[c],u.getClass(e)===s){try{e.listFiles(function(t){return-1!==t.indexOf(l)?(h.setTournament(new i(new e(l))),o=!0):void 0})}catch(f){r=f,console.log(r.message)}break}return o?void 0:t()},d.prototype.save=function(e,n){var r,i,a,s,l=this;if(null==n&&(n=!1),null==e&&(e=function(){}),!this.tournament)return e();r=t(".action-save"),i=t(".view-save"),r.button("loading"),clearTimeout(this._saveTimer),this.autosaveStopped++;try{if(a=function(){return l.autosaveStopped--,r.button("saved"),i.addClass("btn-success"),i.removeClass("btn-info"),l._saveTimer=setTimeout(function(){return r.button("reset"),i.addClass("btn-info"),i.removeClass("btn-success")},1e3),e()},!n)return this.tournament.save(a);if(!this.tournament.saveIfRequired(a))return this.autosaveStopped--,r.button("reset")}catch(u){return s=u,new o({title:"Saving error",message:s.message,buttons:s.canForce?[s.canForce,"OK"]:["OK"],cancelButtonIndex:s.canForce?1:0,onClick:function(t,n){var r,o;if(s.canForce&&0===n){r=t.find(".modal-footer").children().first(),r[0].dataset.loading-(o="Saving..."),r.button("loading");try{return l.tournament.save(function(){return t.modal("hide"),e()},!0)}catch(i){return s=i,s.canForce?(r.show(),r.html(s.canForce)):r.hide(),r.button("reset"),t.find(".modal-body").html("<p>"+s.message+"</p>")}}},onDismissed:function(){return r.button("reset"),l.autosaveStopped--}})}},d.prototype.download=function(){var n,r;if(this.tournament)return n=e.encode(this.tournament.toFile()),t("body").append('<a id="downloader" download="'+this.tournament.name+'.atab" href="data:application/octet-stream;base64,'+n+'"></a>'),r=t("#downloader"),r[0].click(),r.remove()},d.prototype.saveaslocal=function(){var t,e=this;return t={},s.listFiles(function(e){var n,r,o,i;for(i=[],r=0,o=e.length;o>r;r++)n=e[r],i.push(t[n]=!0);return i}),new o({title:"Save as",htmlMessage:templates.saveAs({value:this.tournament.backend.fileName()+" (2)"}),buttons:["Cancel","Save"],cancelButtonIndex:0,width:400,onShow:function(e){var n,r;return r=e.find(".saveas-text"),n=e.find(".saveas-control-group"),r.bind("input propertychange",function(){var e;return e=r[0].value,t[e]?n.addClass("error"):n.removeClass("error")}),t[r[0].value]&&n.addClass("error"),r.keypress(function(t){return 13===t.which?e.find(".btn-primary").click():void 0})},onShown:function(t){var e;return e=t.find(".saveas-text"),e.focus()},onClick:function(n,r,o,i){var a,l,u,c,d,h,f;if(null==i&&(i=!1),1===r&&(f=arguments.callee,d=n.find(".saveas-text")[0].value,!t[d])){i||n.find(".btn-primary").button("loading");try{return a=new s(d),u=e.tournament.toFile,a.save(u,function(){return n.modal("hide")},i)}catch(p){if(c=p,n.find(".btn-primary").button("reset"),n.find(".saveas-error").remove(),n.find(".modal-body").append(templates.alert({classes:"saveas-error alert-error"+(c.canForce?" alert-block":void 0),title:"Error while saving file:",message:c.message,button:c.canForce,buttonClass:"btn-danger"})),c.canForce)return l=n.find(".btn-danger"),l[0].dataset.loading-(h="Saving..."),l.click(function(){return l.button("loading"),f(n,r,null,!0)})}}}})},d.prototype.getTournament=function(){return this.tournament},d.prototype.setTournament=function(t){var e=this;return this.tournament=t,t?t.load(function(){return n.set("lastBackend",u.getObjectClass(t.backend)),n.set("lastFileName",t.backend.fileName()),e.injector.invoke(["$rootScope",function(e){return e.$apply(function(){return e.tournament=t})}])}):(n.expire("lastBackend"),n.expire("lastFileName"),this.injector.invoke(["$rootScope",function(t){return t.$apply(function(){return t.tournament=nil})}]))},d}()})}).call(this);