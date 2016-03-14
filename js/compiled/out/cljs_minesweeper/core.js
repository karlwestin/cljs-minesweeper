// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs_minesweeper.core');
goog.require('cljs.core');
goog.require('cljs_minesweeper.game');
goog.require('reagent.core');
goog.require('cljs_minesweeper.components');
cljs.core.enable_console_print_BANG_.call(null);
cljs_minesweeper.core.boardsize = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(10),(10),(20)], null);
if(typeof cljs_minesweeper.core.state !== 'undefined'){
} else {
cljs_minesweeper.core.state = reagent.core.atom.call(null,cljs.core.apply.call(null,cljs_minesweeper.game.board,cljs_minesweeper.core.boardsize));
}
/**
 * Clicking action:
 *   Creates a new board where the coordinates of square have been clicked,
 *   and sets application state to that new board.
 */
cljs_minesweeper.core.click = (function cljs_minesweeper$core$click(row,col){
cljs.core.println.call(null,"clicking",row,col);

var currentboard = cljs.core.deref.call(null,cljs_minesweeper.core.state);
return cljs.core.reset_BANG_.call(null,cljs_minesweeper.core.state,cljs_minesweeper.game.click.call(null,currentboard,col,row));
});
/**
 * Marking action:
 *   Creates a new board where the coordinates
 *   of square have been marked, sets application state.
 */
cljs_minesweeper.core.mark = (function cljs_minesweeper$core$mark(row,col){
cljs.core.println.call(null,"marking",row,col);

var currentboard = cljs.core.deref.call(null,cljs_minesweeper.core.state);
return cljs.core.reset_BANG_.call(null,cljs_minesweeper.core.state,cljs_minesweeper.game.mark.call(null,currentboard,col,row));
});
/**
 * New game action.
 *   Generates a new board and sets application state
 */
cljs_minesweeper.core.new_game = (function cljs_minesweeper$core$new_game(){
return cljs.core.reset_BANG_.call(null,cljs_minesweeper.core.state,cljs.core.apply.call(null,cljs_minesweeper.game.board,cljs_minesweeper.core.boardsize));
});
/**
 * Game boilerplate/ui
 *   Decides whether the game has ended or not
 *   and attached messages/click handlers based on that
 */
cljs_minesweeper.core.game = (function cljs_minesweeper$core$game(){
var board = cljs.core.deref.call(null,cljs_minesweeper.core.state);
var won = cljs_minesweeper.game.won_QMARK_.call(null,board);
var lost = cljs_minesweeper.game.lost_QMARK_.call(null,board);
var ended = (function (){var or__21670__auto__ = won;
if(cljs.core.truth_(or__21670__auto__)){
return or__21670__auto__;
} else {
return lost;
}
})();
var click_fn = (cljs.core.truth_(ended)?((function (board,won,lost,ended){
return (function (){
return cljs.core.List.EMPTY;
});})(board,won,lost,ended))
:cljs_minesweeper.core.click);
var mark_fn = (cljs.core.truth_(ended)?((function (board,won,lost,ended,click_fn){
return (function (){
return cljs.core.List.EMPTY;
});})(board,won,lost,ended,click_fn))
:cljs_minesweeper.core.mark);
var title = (cljs.core.truth_(won)?"You Swept the Commies! Freedom!!$$$":(cljs.core.truth_(lost)?"The Commies Won!!":"Fight Communism with ClojureScript!"
));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),title], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_minesweeper.components.board,cljs.core.deref.call(null,cljs_minesweeper.core.state),click_fn,mark_fn], null),(cljs.core.truth_(ended)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs_minesweeper.core.new_game], null),"lets try to beat them again"], null):null)], null);
});
reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_minesweeper.core.game], null),document.getElementById("app"));
cljs_minesweeper.core.testboard = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"squares","squares",-888257629),cljs.core.concat.call(null,cljs.core.map.call(null,(function (p1__23376_SHARP_){
return cljs.core.assoc.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),true], null),new cljs.core.Keyword(null,"number","number",1570378438),p1__23376_SHARP_);
}),cljs.core.range.call(null,(0),(9))),cljs.core.list(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"number","number",1570378438),(-1),new cljs.core.Keyword(null,"show","show",-576705889),true], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"number","number",1570378438),(-1),new cljs.core.Keyword(null,"show","show",-576705889),false], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"number","number",1570378438),(-1),new cljs.core.Keyword(null,"show","show",-576705889),false,new cljs.core.Keyword(null,"marked","marked",1403026280),true], null))),new cljs.core.Keyword(null,"width","width",-384071477),(12),new cljs.core.Keyword(null,"height","height",1025178622),(1),new cljs.core.Keyword(null,"mines","mines",-1960796490),(0)], null);

//# sourceMappingURL=core.js.map?rel=1457989971847