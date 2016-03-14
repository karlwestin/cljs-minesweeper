// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs_minesweeper.components');
goog.require('cljs.core');
cljs_minesweeper.components.mine = (function cljs_minesweeper$components$mine(row,col,p__23362,click,right_click){
var map__23366 = p__23362;
var map__23366__$1 = ((((!((map__23366 == null)))?((((map__23366.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23366.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23366):map__23366);
var square = map__23366__$1;
var number = cljs.core.get.call(null,map__23366__$1,new cljs.core.Keyword(null,"number","number",1570378438));
var show = cljs.core.get.call(null,map__23366__$1,new cljs.core.Keyword(null,"show","show",-576705889));
var marked = cljs.core.get.call(null,map__23366__$1,new cljs.core.Keyword(null,"marked","marked",1403026280));
var vec__23368 = (cljs.core.truth_((function (){var and__21658__auto__ = show;
if(cljs.core.truth_(and__21658__auto__)){
return cljs.core._EQ_.call(null,(-1),number);
} else {
return and__21658__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["mine-mine","\u262D"], null):(cljs.core.truth_((function (){var and__21658__auto__ = show;
if(cljs.core.truth_(and__21658__auto__)){
return ((0) < number);
} else {
return and__21658__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("mine-show "),cljs.core.str("mine-number-"),cljs.core.str(number)].join(''),number], null):(cljs.core.truth_(show)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["mine-show",""], null):(cljs.core.truth_((function (){var and__21658__auto__ = cljs.core.not.call(null,show);
if(and__21658__auto__){
return marked;
} else {
return and__21658__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["mine-marked","$"], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["mine-blank",""], null)
))));
var mine_class = cljs.core.nth.call(null,vec__23368,(0),null);
var content = cljs.core.nth.call(null,vec__23368,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"data-qa","data-qa",421420542),"board-square",new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (vec__23368,mine_class,content,map__23366,map__23366__$1,square,number,show,marked){
return (function (e){
e.preventDefault();

return click.call(null,row,col);
});})(vec__23368,mine_class,content,map__23366,map__23366__$1,square,number,show,marked))
,new cljs.core.Keyword(null,"on-context-menu","on-context-menu",-1330744340),((function (vec__23368,mine_class,content,map__23366,map__23366__$1,square,number,show,marked){
return (function (e){
e.preventDefault();

return right_click.call(null,row,col);
});})(vec__23368,mine_class,content,map__23366,map__23366__$1,square,number,show,marked))
,new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str("mine "),cljs.core.str(mine_class)].join(''),new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str("mine-"),cljs.core.str(row),cljs.core.str("-"),cljs.core.str(col)].join('')], null),content], null);
});
cljs_minesweeper.components.row = (function cljs_minesweeper$components$row(row__$1,squares,click,right_click){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"data-qa","data-qa",421420542),"board-row",new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str("row-"),cljs.core.str(row__$1)].join(''),new cljs.core.Keyword(null,"class","class",-2030961996),"horizontal-flex"], null),cljs.core.map_indexed.call(null,(function (col,square){
return cljs_minesweeper.components.mine.call(null,row__$1,col,square,click,right_click);
}),squares)], null);
});
cljs_minesweeper.components.board = (function cljs_minesweeper$components$board(p__23369,click,right_click){
var map__23372 = p__23369;
var map__23372__$1 = ((((!((map__23372 == null)))?((((map__23372.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23372.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23372):map__23372);
var board__$1 = map__23372__$1;
var squares = cljs.core.get.call(null,map__23372__$1,new cljs.core.Keyword(null,"squares","squares",-888257629));
var width = cljs.core.get.call(null,map__23372__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var height = cljs.core.get.call(null,map__23372__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var mines = cljs.core.get.call(null,map__23372__$1,new cljs.core.Keyword(null,"mines","mines",-1960796490));
var rows = cljs.core.partition.call(null,width,squares);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data-qa","data-qa",421420542),"board",new cljs.core.Keyword(null,"class","class",-2030961996),"vertical-flex"], null),cljs.core.map_indexed.call(null,((function (rows,map__23372,map__23372__$1,board__$1,squares,width,height,mines){
return (function (rownumber,squares__$1){
return cljs_minesweeper.components.row.call(null,rownumber,squares__$1,click,right_click);
});})(rows,map__23372,map__23372__$1,board__$1,squares,width,height,mines))
,rows)], null);
});

//# sourceMappingURL=components.js.map?rel=1457989971804