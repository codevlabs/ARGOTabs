(function(){define([],function(){var e;return e=function(){function e(e,t){this.tournament=e,null==t&&(t=[]),null!=t.criteria&&(t=t.criteria),this.criteria=t}return e.prototype.isCompatible=function(e,t,n){return compatibilityFactor(e,t,n)<=0},e.prototype.compatibilityFactor=function(e,t){var n,r;return n=0,r=function(t){return null==t?!0:t.club===e.club?!1:"ARGO A"===t.name&&"Central"===e.club.name?!1:"WSDC"===t.name&&"Central"===e.club.name?!1:"WSDC"===t.name&&"Banat"===e.club.name?!1:"ARGO-Central"===t.name&&"Central"===e.club.name?!1:!0},null!=e.club&&(r(t.teams[0])||n++,r(t.teams[1])||n++),n},e.prototype.errorMessage=function(e){return e.name+" is allowed to judge this match"},e.prototype.toJSON=function(){return{criteria:this.criteria}},e.mainRules=function(t,n){return new e(t,null!=n?n:[])},e}()})}).call(this);