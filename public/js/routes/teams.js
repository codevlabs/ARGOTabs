(function(){define(["team"],function(t){return function(e,n){return n.when("/teams",{templateUrl:"partials/teams.html",controller:["$scope",function(n){return n.addTeam=function(){var n,r;return r=e.tournament,n=new t(r),r.teams.push(n)},n.removeTeam=function(t){var n;return n=e.tournament.teams,n[t].destroy(),n.splice(t,1)},n.initRepeat=function(t){return t.$watch(function(){return t.o.club},function(e,n){var r;if(e!==n)return r=t.o,n&&n.removeTeam(r),e?e.addTeam(r):void 0})},n.eliminateNil=function(t){return null==t?"":t}}]})}})}).call(this);