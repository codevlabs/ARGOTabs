!function(){function attrs(e,t){var a=[],n=e.terse;delete e.terse;var l=Object.keys(e),i=l.length;if(i){a.push("");for(var s=0;i>s;++s){var o=l[s],d=e[o];"boolean"==typeof d||null==d?d&&(n?a.push(o):a.push(o+'="'+o+'"')):0==o.indexOf("data")&&"string"!=typeof d?a.push(o+"='"+JSON.stringify(d)+"'"):"class"==o&&Array.isArray(d)?a.push(o+'="'+escape(d.join(" "))+'"'):t&&t[o]?a.push(o+'="'+escape(d)+'"'):a.push(o+'="'+d+'"')}}return a.join(" ")}function escape(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}window.templates=window.templates||{};var jade={attrs:attrs,escape:escape};templates.alert=function anonymous(locals){var buf=[];with(locals||{})buf.push("<div"+jade.attrs({"class":""+classes+" "+"alert"+" "+"fade"+" "+"in"},{})+"><p><strong>"+(null==(jade.interp=title)?"":jade.interp)+"</strong>"+(null==(jade.interp=" "+message)?"":jade.interp)+"</p>"),button&&buf.push("<p><button"+jade.attrs({type:"button","class":""+buttonClass+" "+"btn"+" "+"alert-button"},{type:!0})+">"+jade.escape(null==(jade.interp=button)?"":jade.interp)+"</button></p>"),buf.push("</div>");return buf.join("")},templates.ballotSheet=function anonymous(locals){function sideCells(e){for(var t=0;4>t;t++)buf.push("<td"+jade.attrs({"class":"valid-{{valid"+e+t+"}}"},{"class":!0})+"><text-edit-cell"+jade.attrs({bind:"o.scores["+e+"]["+t+"]",valid:"valid"+e+t,"input-width":"17",pattern:"[0-9.]*",setter:"parseFloat(o)",getter:"truncFloat(o, 2)","soft-validator":"validateMinMax(o, "+(3==t?30:60)+", "+(3==t?40:80)+")"},{bind:!0,valid:!0,"input-width":!0,pattern:!0,setter:!0,getter:!0,"soft-validator":!0})+"></text-edit-cell></td>")}function sideTotal(e){buf.push("<td>{{truncFloat(o.scores["+jade.escape(null==(jade.interp=e)?"":jade.interp)+"][0] + o.scores["+jade.escape(null==(jade.interp=e)?"":jade.interp)+"][1] + o.scores["+jade.escape(null==(jade.interp=e)?"":jade.interp)+"][2] + o.scores["+jade.escape(null==(jade.interp=e)?"":jade.interp)+"][3])}}</td>")}var buf=[];with(locals||{})buf.push('<p>Cute ballot sheet</p><p>{{votes}}</p><table editable-table="editable-table" reorders="reorders" show-gear="false" model="votes" id="votes-table"><thead><tr><th data-auto-index=\'5\'>#</th><th data-auto-index=\'1\'>Judge</th><th data-auto-index=\'3\' class="prop">P1</th><th data-auto-index=\'3\' class="prop">P2</th><th data-auto-index=\'3\' class="prop">P3</th><th data-auto-index=\'3\' class="prop">PR</th><th data-auto-index=\'4\' class="prop">Prop</th><th data-auto-index=\'2\'>vs.</th><th data-auto-index=\'4\' class="opp">Opp</th><th data-auto-index=\'3\' class="opp">O1</th><th data-auto-index=\'3\' class="opp">O2</th><th data-auto-index=\'3\' class="opp">O3</th><th data-auto-index=\'3\' class="opp">OR</th></tr></thead><tbody editable-tbody="editable-tbody"><script type="text/html"><td>{{$index + 1}}</td><td>{{o.judge.name}}</td>'),sideCells(0),sideTotal(0),buf.push('<td><span>{{o.prop}} </span><i class="icon-trophy"></i><span> {{o.opp}}</span></td>'),sideTotal(1),sideCells(1),buf.push('</script></tbody></table><style type="text/css">#votes-table th:nth-child(1) {\n  width: 20px;\n}\n#votes-table th:nth-child(2) {\n  width: 100px;\n}\n#votes-table th:nth-child(3),\n#votes-table th:nth-child(4),\n#votes-table th:nth-child(5),\n#votes-table th:nth-child(6),\n#votes-table th:nth-child(10),\n#votes-table th:nth-child(11),\n#votes-table th:nth-child(12),\n#votes-table th:nth-child(13) {\n  width: 20px;\n}\n#votes-table th:nth-child(7),\n#votes-table th:nth-child(9) {\n  width: 30px;\n}\n#votes-table th:nth-child(8) {\n  width: 40px;\n}\n#votes-table td.valid-false {\n  background-color: #b94a48;\n}\n#votes-table td.valid-false .textedit-cell.invalid .textedit-label {\n  color: #fff;\n}\n</style>');return buf.join("")},templates.editableTable=function anonymous(locals){var buf=[];with(locals||{})buf.push('<table editable-head-transclude="editable-head-transclude" class="{{tableId}} {{tableClass}} editable-table"></table>');return buf.join("")},templates.editableTbody=function anonymous(locals){var buf=[];with(locals||{})buf.push('<tr ng-repeat="o in getScope().model" ng-init="hover = false; initRepeatScope(this)" ng-mouseenter="mouseEnter()" ng-mouseleave="mouseLeave()" ng-click="rowClicked($index)" editable-script-transclude="editable-script-transclude"></tr><tr ng-show="addLabel" class="dont-print dont-export"><td colspan="100"><a tabindex="0" href="" ng-click="addItem()"><i class="icon-plus"></i> {{addLabel}}</a></td></tr>');return buf.join("")},templates.editableTcontext=function anonymous(locals){var buf=[];with(locals||{}){buf.push("<div"+jade.attrs({"class":"context-menu-"+id+" "+"context-menu"},{})+'><ul role="menu" class="dropdown-menu">');for(var i=0;n>i;i++)buf.push("<li"+jade.attrs({"data-index":""+i,"class":"hide-row"},{"data-index":!0})+'><a tabindex="-1"><i class="icon-check"></i><span>&nbsp;</span><span class="item-label">Row '+jade.escape(null==(jade.interp=i)?"":jade.interp)+"</span></a></li>");buf.push('<li class="divider"></li><li class="export-csv"><a tabindex="-1">Export to CSV</a></li></ul></div>')}return buf.join("")},templates.editableTd=function anonymous(locals){var buf=[];with(locals||{})buf.push("<td"+jade.attrs({id:""+id,"class":"controls dont-print dont-export"},{id:!0})+'><i class="close icon-remove"></i><style>table.'+jade.escape(null==(jade.interp=tableId)?"":jade.interp)+" td.squeezedElement,\ntable."+jade.escape(null==(jade.interp=tableId)?"":jade.interp)+" th.squeezedElement\n{\n  width: "+jade.escape(null==(jade.interp=width-15-8-8-1)?"":jade.interp)+"px !important;\n}</style></td>");return buf.join("")},templates.editableTh=function anonymous(locals){var buf=[];with(locals||{})buf.push("<th"+jade.attrs({id:""+id,"class":"controls dont-print dont-export"},{id:!0})+'><i class="close icon-cog"></i><style>table.'+jade.escape(null==(jade.interp=tableId)?"":jade.interp)+" td.squeezedElement,\ntable."+jade.escape(null==(jade.interp=tableId)?"":jade.interp)+" th.squeezedElement\n{\n  width: "+jade.escape(null==(jade.interp=width-15-8-8-1)?"":jade.interp)+"px !important;\n}</style></th>");return buf.join("")},templates.errorAlert=function anonymous(locals){var buf=[];with(locals||{})buf.push('<div class="alert alert-error"><button type="button" data-dismiss="alert" class="close">&times;</button><strong>Error! </strong><span class="error-text">'+jade.escape(null==(jade.interp=error)?"":jade.interp)+"</span></div>");return buf.join("")},templates.hlistCell=function anonymous(locals){var buf=[];with(locals||{})buf.push('<div class="hlist inline"><div ng-repeat="hlo in model" class="moveable-{{reorders && edit && model.length > 1}} inline item valign-middle"><div class="enabled-{{edit}} item-controls valign-middle"><i ng-click="remove($index)" class="icon-remove-sign highlight-button"></i></div><div ng-transclude="ng-transclude" class="inline valign-middle"></div><span ng-show="!$last">{{separator}}&nbsp;</span></div><div class="inline valign-middle"><a ng-click="add()" href="" tabindex="0" class="pre-space-{{!!model.length}} dont-print unstyled-link valign-middle"><i class="icon-plus-sign highlight-button"></i></a><i ng-click="edit = !edit" ng-show="model.length &amp;&amp; (!editHidden || edit)" class="edit-{{edit}} icon-edit-sign highlight-button dont-print edit-button pre-space valign-middle"></i></div></div>');return buf.join("")},templates.modal=function anonymous(locals){var buf=[];with(locals||{})buf.push("<div"+jade.attrs({id:o.id,"class":o.cssClass+" "+"modal"+" "+"hide"},{id:!0})+'><div class="modal-header">'),o.closeable&&buf.push('<button type="button" data-dismiss="modal" aria-hidden="true" class="close modal-cancel">&times;</button>'),buf.push('<h3 class="modal-title"></h3></div><div class="modal-body"></div>'),o.buttons.length&&(buf.push('<div class="modal-footer">'),function(){var e=o.buttons;if("number"==typeof e.length)for(var t=0,a=e.length;a>t;t++){var n=e[t];buf.push("<a"+jade.attrs({"data-count":""+t,"class":""+(t==o.cancelButtonIndex?"modal-cancel ":"")+(t==o.primaryButtonIndex?"btn-primary ":"")+" "+"btn"+" "+"modal-button"},{"data-count":!0})+">"+jade.escape(null==(jade.interp=n)?"":jade.interp)+"</a>")}else{var a=0;for(var t in e)if(a++,e.hasOwnProperty(t)){var n=e[t];buf.push("<a"+jade.attrs({"data-count":""+t,"class":""+(t==o.cancelButtonIndex?"modal-cancel ":"")+(t==o.primaryButtonIndex?"btn-primary ":"")+" "+"btn"+" "+"modal-button"},{"data-count":!0})+">"+jade.escape(null==(jade.interp=n)?"":jade.interp)+"</a>")}}}.call(this),buf.push("</div>")),o.width&&buf.push("<style>@media (min-width: 767px) {\n  #"+jade.escape(null==(jade.interp=o.id)?"":jade.interp)+" {\n    width: "+jade.escape(null==(jade.interp=o.width)?"":jade.interp)+"px;\n    margin-left: "+jade.escape(null==(jade.interp=-o.width/2)?"":jade.interp)+"px;\n  }\n}</style>"),buf.push("<style>@media (min-width: 767px) {\n  .modal.fade {\n    top: 20px;\n  }\n  </style></div>");return buf.join("")},templates.multiCell=function anonymous(locals){var buf=[];with(locals||{})buf.push('<div ng-transclude="ng-transclude" ng-click="beginEdit()" class="inline"><span ng-show="!editing" tabindex="0" class="muted-{{value == null || value == undefined}} multi-label">{{getChoiceName(value)}}</span><select ng-show="editing" ng-model="value" ng-options="choiceName({o: o}) for o in choices" class="multi-input"><option value="">{{allowNil}}</option></select></div>');return buf.join("")},templates.navLi=function anonymous(locals){var buf=[];with(locals||{})buf.push('<li class="{{class}}"><a href="{{\'#\' + href}}" ng-transclude="ng-transclude"></a></li>');return buf.join("")},templates.openModal=function anonymous(locals){var buf=[];with(locals||{})buf.push('<table id="open-modal-table" class="table table-hover"><tr id="open-modal-add-tr"><td class="omodal-add-td"><div class="omodal-add-div"><div id="omodal-add-page1" class="omodal-add-page"><div class="omodal-add-padding"><a id="omodal-add-a1"> <i class="icon-plus"></i> Add tournament</a></div></div><div id="omodal-add-page2" class="omodal-add-page"><table class="center-table"><td><div class="omodal-btn-padding"><button type="button" id="omodal-btn-new" class="btn"><i class="icon-file"></i> New file</button></div></td><td><div class="omodal-btn-padding"><button type="file" id="omodal-btn-upload" class="btn"><i class="icon-upload-alt"></i> Upload</button></div></td></table><input type="file" class="omodal-file"/><button class="close pull-right omodal-btn-close"><i class="icon-remove"></i></button></div><div id="omodal-add-page3" class="omodal-add-page"></div></div></td></tr></table><style type="text/css">#open-modal-table td {\n  border-top: 0px;\n  padding: 0px !important;\n}\n.omodal-add-padding {\n  padding: 10px;\n}\n.omodal-btn-padding {\n  padding: 0px 0px 0px 10px;\n  display: inline-block;\n}\n.omodal-btn-close {\n  position: absolute;\n  right: 13px;\n  top: 13px;\n  margin: 0px;\n  line-height: 0;\n  font-size: 110%;\n}\n.center-table.text-table {\n  width: 100%;\n}\n#open-modal .center-table.text-table td {\n  padding-right: 60px !important;\n}\n.omodal-text {\n  margin: 0px !important;\n  width: 100%;\n}\n.omodal-control-group {\n  display: inline-block;\n  margin: 0px;\n  width: 100%;\n  padding-left: 5px;\n  height: auto;\n}\n.omodal-file-btn {\n  display: none;\n  margin: 0px 3px;\n  font-size: 110%;\n}\n.omodal-btn-edit {\n  font-size: 100%;\n  position: relative;\n  top: 1px;\n}\n.omodal-btn-remove {\n  font-size: 110%;\n}\ntd:hover .omodal-file-btn {\n  display: inline-block;\n}\n.omodal-edit-td {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.omodal-add-td {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.omodal-edit-div {\n  width: 200%;\n  height: 42px;\n}\n.omodal-add-div {\n  width: 300%;\n  height: 42px;\n}\n.omodal-edit-page {\n  width: 50%;\n  height: 100%;\n  display: inline-block;\n  vertical-align: middle;\n  position: relative;\n}\n.omodal-add-page {\n  width: 33.33%;\n  height: 100%;\n  display: inline-block;\n  vertical-align: middle;\n  position: relative;\n}\n.omodal-file {\n  visibility: hidden;\n  position: absolute;\n  top: -50;\n  left: -50;\n}\ntable.center-table {\n  height: 100%;\n}\ntable.center-table td {\n  vertical-align: middle;\n}\n#omodal-local {\n  height: 100%;\n}\n</style>');return buf.join("")},templates.openModalAddItem=function anonymous(locals){var buf=[];with(locals||{}){if("LocalBackend"==backend.name)var icon="<i class='icon-file'/>";buf.push('<tr><td class="omodal-edit-td"><div class="omodal-edit-div"><div class="omodal-edit-page"><div class="omodal-add-padding"><a href="#" class="omodal-a">'+(null==(jade.interp=icon+" ")?"":jade.interp)+'<span class="omodal-label">'+jade.escape(null==(jade.interp=name)?"":jade.interp)+'</span></a><button class="close pull-right omodal-file-btn omodal-btn-delete"><i class="icon-remove"></i></button><button class="close pull-right omodal-file-btn omodal-btn-edit"><i class="icon-edit"></i></button></div></div><div class="omodal-edit-page"><table class="center-table text-table"><td><div class="control-group omodal-control-group"><input type="text" placeholder="File name" class="omodal-text"/></div></td></table><button class="close pull-right omodal-btn-close"><i class="icon-remove"></i></button></div></div></td></tr>')}return buf.join("")},templates.openModalAddLocal=function anonymous(locals){var buf=[];with(locals||{})buf.push('<div id="omodal-local"><table class="center-table text-table"><td><div class="control-group omodal-control-group"><input type="text" placeholder="File name" class="omodal-text"/></div></td></table><button class="close pull-right omodal-btn-close"><i class="icon-remove"></i></button></div>');return buf.join("")},templates.pairModal=function anonymous(locals){var buf=[];with(locals||{})buf.push('<div class="alert alert-block"><strong>Warning!</strong> Once you create a pairing, you can only undo it by deleting the round. You also can\'t remove teams that have been paired or judges that filled in at least a ballot sheet from the tournament.</div><div class="settings-group"><div><div class="small-margin inline">Algorithm:&nbsp;</div><select ng-model="pairOpts.algorithm" ng-options="algoName[algo] for algo in pairAlgorithms"></select></div><label ng-show="pairOpts.algorithm != 0" class="checkbox">Randomize room order<input type="checkbox" ng-model="pairOpts.shuffleRooms"/></label><label ng-show="pairOpts.algorithm == 1" class="checkbox">Randomize sides<input type="checkbox" ng-model="pairOpts.shuffleSides"/></label><label ng-show="(pairOpts.algorithm != 1 || pairOpts.shuffleSides) &amp;&amp; prevRounds.length" class="checkbox">Balance sides<input type="checkbox" ng-model="pairOpts.balanceSides"/></label><div ng-show="pairOpts.algorithm == 2"><span>Number of brackets: </span><text-edit-cell bind="pairOpts.brackets" editing="editing" input-width="50" pattern="[0-9]*" setter="parseInt(o)"></text-edit-cell></div><div class="error-placeholder"></div><div ng-show="pairOpts.algorithm == 1" class="manual-pairings"><div class="row-fluid">     <div class="span8"><div ng-show="!manualPairing.length" class="alert alert-info nopairs"><strong>No pairs defined! </strong><span>To create the manual pairing, pick teams from </span><span><span class="hidden-phone">the right.</span><span class="visible-phone">below.</span></span><i class="icon-arrow-right hidden-phone"></i><i class="icon-arrow-down visible-phone"></i></div><div ng-repeat="pair in manualPairing" class="pairing rounded-bullets"><span ng-show="pair.prop &amp;&amp; !pairOpts.shuffleSides" class="prop">{{pair.prop.name}}</span><span ng-show="pair.prop &amp;&amp; pairOpts.shuffleSides" class="prop-opp">{{pair.prop.name}}</span><span ng-show="!pair.prop">Bail</span><span>&nbsp;vs.&nbsp;</span><span ng-show="!pair.opp">Bail</span><span ng-show="pair.opp &amp;&amp; !pairOpts.shuffleSides" class="opp">{{pair.opp.name}}</span><span ng-show="pair.opp &amp;&amp; pairOpts.shuffleSides" class="prop-opp">{{pair.opp.name}}</span><i ng-click="reverseSidesInManualPairing(pair)" ng-show="!pairOpts.shuffleSides" class="icon-exchange"></i><i ng-click="removePairFromManualPairing(pair, $index)" class="icon-remove-sign"></i></div></div><div class="span4"><div ng-repeat="o in pairingTeams" ng-click="addTeamToManualPairing(o, $index)" class="rounded-bullets red pushable">{{o.name}}</div></div></div></div></div>');return buf.join("")},templates.saveAs=function anonymous(locals){var buf=[];with(locals||{})buf.push('<p>Please enter the new file name</p><div class="control-group saveas-control-group"><input'+jade.attrs({type:"text",placeholder:"File name",value:""+value,"class":"saveas-text"},{type:!0,placeholder:!0,value:!0})+'/></div><style type="text/css">.saveas-text {\n  width: 350px;\n}\n</style>');return buf.join("")},templates.sortArrow=function anonymous(locals){var buf=[];with(locals||{})buf.push('<div ng-click="toggleSort()" class="sortarrow inline"><span ng-transclude="ng-transclude" class="sortarrow-content"></span><span ng-show="!hideArrows">&nbsp;</span><i ng-show="!hideArrows &amp;&amp; ascending" ng-click="toggleSort()" class="arrow icon-sort-up dont-print"></i><i ng-show="!hideArrows &amp;&amp; !ascending" ng-click="toggleSort()" class="arrow icon-sort-down dont-print"></i></div>');return buf.join("")},templates.textEditCell=function anonymous(locals){var buf=[];with(locals||{})buf.push('<div ng-transclude="ng-transclude" ng-click="beginEdit_()" class="{{labelClass}} inline textedit-cell"><div ng-show="!editing" tabindex="0" class="inline textedit-label">{{valueParsed}}</div><div ng-show="editing" class="{{inputClass}} control-group"><input type="text" ng-model="valueParsed" class="textedit-input"/></div><div class="inline textedit-extra">{{extra}}</div></div>');return buf.join("")}}();