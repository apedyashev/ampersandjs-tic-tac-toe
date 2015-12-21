(function() {
module.exports["body"] = function(data) {
var __t, __p = '';
__p += '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">Tic-Tac-Toe</a></div><ul class="nav navbar-nav"><li><a href="/">home</a></li><li><a href="/past-games">past games</a></li></ul></div></nav><div class="container"><main data-hook="page-container"></main><footer><div class="text-center">&copy; Alexey Pedyashev 2015</div></footer></div></body>';
return __p
}})();
(function() {
module.exports["head"] = function(data) {
var __t, __p = '';
__p += '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
return __p
}})();
(function() {
module.exports["includes/finished-game"] = function(data) {
var __t, __p = '';
__p += '<tr><td class="player-name"><span data-hook="left-user-name left-user-win-class" class="label pull-right"></span></td><td class="player-name"><span data-hook="right-user-name right-user-win-class" class="label pull-left"></span></td></tr>';
return __p
}})();
(function() {
module.exports["includes/formInput"] = function(data) {
var __t, __p = '';
__p += '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
return __p
}})();
(function() {
module.exports["includes/person"] = function(data) {
var __t, __p = '';
__p += '<li class="person list-group-item container"><img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><span class="btn-group pull-right"> <a data-hook="action-edit" class="btn btn-default">edit </a><a href="#" data-hook="action-delete" class="btn btn-danger">delete</a></span></li>';
return __p
}})();
(function() {
module.exports["includes/user-panel"] = function(data) {
var __t, __p = '';
__p += '<div data-hook="player-is-initialized my-turn" class="panel panel-default player-panel"><div class="panel-heading"><div class="panel-title"><i class="fa fa-circle-o pull-left symbol-icon"></i><i class="fa fa-times pull-left symbol-icon"></i> <div data-hook="show-if-initialized"><div data-hook="player-name"></div></div><div data-hook="hide-if-initialized">Please eneter your name</div></div></div><div class="panel-body"><div data-hook="show-if-player-won"><h4 class="text-success text-center">You are the winner! Congratulations!</h4><div class="text-center"><i class="fa fa-trophy fa-5x winner-icon"></i></div></div><div data-hook="hide-if-player-won"><div data-hook="show-if-initialized"><div data-hook="my-turn-visible" class="text-success text-center"><h4>Your turn!</h4><div><i class="fa fa-commenting fa-5x"></i></div></div></div></div><div data-hook="show-if-initialized"><div data-hook="show-if-not-my-turn" class="text-center"><h4>Wait and relax...</h4><i class="fa fa-coffee fa-5x"></i></div></div><form data-hook="hide-if-initialized"><fieldset data-hook="field-container"></fieldset><button type="submit" class="btn btn-default pull-right">Submit</button></form></div></div>';
return __p
}})();
(function() {
module.exports["pages/home"] = function(data) {
var __t, __p = '';
__p += '<section class="page home"><h2>Welcome to Tic-Tac-Toe game written in AmpersandJS</h2><div class="row"><div class="col-md-4"><div id="left-player"></div></div><div id="game-board-container" class="col-md-4"><div class="toolbar"><span data-hook="show-if-game-is-over" class="label label-success">Game Over</span><span class="pull-right"><a href="/past-games" class="btn btn-link">Past Games</a><button data-hook="new-game" class="btn btn-small btn-default"><i class="fa fa-refresh"></i> New Game</button></span></div><canvas id="game-board"></canvas></div><div class="col-md-4"><div id="right-player"></div></div></div></section>';
return __p
}})();
(function() {
module.exports["pages/info"] = function(data) {
var __t, __p = '';
__p += '<section class="page pageTwo"><h2>Simple Page Example</h2><p>This page was rendered by a simple page view file at client/pages/info.js.</p></section>';
return __p
}})();
(function() {
module.exports["pages/past-games"] = function(data) {
var __t, __p = '';
__p += '<section class="page past-games"><h2>Past games</h2><table class="table table-striped table-condensed"><thead><tr><th class="left-side-user"><span class="pull-right"><i class="fa fa-circle-o"></i> Left-side player</span></th><th class="right-side-user"><span></span><i class="fa fa-times"></i> Right-side player</th></tr></thead><tbody data-hook="past-games-list"><tr data-hook="collection-is-empty"><td colspan="2" class="text-center"><h4>No winners yet</h4></td></tr></tbody></table></section>';
return __p
}})();
(function() {
module.exports["pages/personAdd"] = function(data) {
var __t, __p = '';
__p += '<section class="page add-person"><h2>Add Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
return __p
}})();
(function() {
module.exports["pages/personEdit"] = function(data) {
var __t, __p = '';
__p += '<section class="page edit-person"><h2>Edit Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
return __p
}})();
(function() {
module.exports["pages/personView"] = function(data) {
var __t, __p = '';
__p += '<section class="page view-person"><h2 data-hook="name"></h2><img data-hook="avatar" width="80" height="80"/><div class="buttons"><a data-hook="edit" class="btn">Edit</a><button data-hook="delete" class="btn">Delete</button></div></section>';
return __p
}})();