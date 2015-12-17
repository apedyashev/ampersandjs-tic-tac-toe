(function() {
module.exports["body"] = function(data) {
var __t, __p = '';
__p += '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">AmpersandJS Tic-Tac-Toe implementation </a></div><ul class="nav navbar-nav"><li><a href="/">home</a></li><li><a href="/collections">collection demo</a></li><li><a href="/info">more info</a></li></ul></div></nav><div class="container"><main data-hook="page-container"></main><footer class="footer-main"><nav class="nav-footer cf"><div><a href="http://ampersandjs.com/learn" class="nav-item external">Learn</a><a href="http://ampersandjs.com/docs" class="nav-item external">Docs</a><a href="http://tools.ampersandjs.com" class="nav-item external">Modules</a></div><div><a href="https://gitter.im/AmpersandJS/AmpersandJS" class="nav-item external">Chatroom</a><a href="https://trello.com/b/UxylNzHr/ampersand-js-roadmap" class="nav-item external">Roadmap</a><a href="http://ampersandjs.com/contribute" class="nav-item external">Contribute</a></div><div><a href="http://ampersandjs.com/security" class="nav-item external">Security</a><a href="https://github.com/ampersandjs" class="nav-item external">Github</a><a href="https://twitter.com/ampersandjs" class="nav-item external">Twitter</a></div></nav><p>Sponsored by <a href="https://andyet.com">&amp;yet </a><br/>with the help of our <a href="http://ampersandjs.com/contribute">contributors</a></p><a href="http://ampersandjs.com" class="logo logo-ampersand-pink">&amp;</a></footer></div></body>';
return __p
}})();
(function() {
module.exports["head"] = function(data) {
var __t, __p = '';
__p += '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
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
__p += '<div data-hook="player-is-initialized my-turn" class="panel panel-default"><div class="panel-heading"><div class="panel-title"><div data-hook="show-if-initialized"><div data-hook="player-name"></div></div><div data-hook="hide-if-initialized">Please eneter your name</div></div></div><div class="panel-body"><p data-hook="player-won" class="text-success">You are the winner! Congratulations!</p><p data-hook="show-if-initialized"><span data-hook="my-turn-visible" class="label label-success">Your turn!</span></p><form data-hook="hide-if-initialized"><fieldset data-hook="field-container"></fieldset><button data-hook="reset" type="submit" class="btn">Submit</button></form></div></div>';
return __p
}})();
(function() {
module.exports["pages/collectionDemo"] = function(data) {
var __t, __p = '';
__p += '<section class="page pageOne"><h2>Collection demo</h2><p>Intelligently rendering collections can be a bit tricky. </p><p><a href="https://github.com/ampersandjs/ampersand-view">ampersand-view\'s</a> <code>renderCollection()</code> method makes it simple.</p><p>The only code required to manage the collection is:</p><pre><code>this.renderCollection(\n   this.collection, \n   PersonView, \n   this.queryByHook(\'people-list\')\n);</code></pre><h3>People container:</h3><ul data-hook="people-list" class="list-group"></ul><p>Try it by clicking the buttons</p><div class="buttons btn-group"><button data-hook="reset" class="btn btn-default">.reset() </button><button data-hook="fetch" class="btn btn-default">.fetch() </button><button data-hook="shuffle" class="btn btn-default">.shuffle() </button><button data-hook="add" class="btn btn-default">.addRandom()</button><a href="/person/add" class="btn btn-default">Add Person</a></div><p>Events are always managed so you don\'t get any leaks.</p></section>';
return __p
}})();
(function() {
module.exports["pages/home"] = function(data) {
var __t, __p = '';
__p += '<section class="page home"><h2>Welcome to a skeleton for AmpersandJS Tic-Tac-Toe implementation</h2><p>If you "view source" you\'ll see it\'s 100% client rendered.</p><p>Click around the site using the nav bar at the top.</p><div class="row"><div class="col-md-4"><div id="left-player"></div></div><div class="col-md-4"><canvas id="game-board"></canvas></div><div class="col-md-4"><div id="right-player"></div></div></div></section>';
return __p
}})();
(function() {
module.exports["pages/info"] = function(data) {
var __t, __p = '';
__p += '<section class="page pageTwo"><h2>Simple Page Example</h2><p>This page was rendered by a simple page view file at client/pages/info.js.</p></section>';
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