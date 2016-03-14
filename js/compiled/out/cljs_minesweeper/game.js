// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs_minesweeper.game');
goog.require('cljs.core');
/**
 * checks if a square is a mine
 */
cljs_minesweeper.game.is_mine_QMARK_ = (function cljs_minesweeper$game$is_mine_QMARK_(square){
return cljs.core._EQ_.call(null,(-1),new cljs.core.Keyword(null,"number","number",1570378438).cljs$core$IFn$_invoke$arity$1(square));
});
/**
 * checks if a square is a zero
 */
cljs_minesweeper.game.is_empty_QMARK_ = (function cljs_minesweeper$game$is_empty_QMARK_(square){
return cljs.core._EQ_.call(null,(0),new cljs.core.Keyword(null,"number","number",1570378438).cljs$core$IFn$_invoke$arity$1(square));
});
cljs_minesweeper.game.touches = new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"NW","NW",-651979397),(function (index,width){
return ((index - width) - (1));
}),new cljs.core.Keyword(null,"N","N",-640629860),(function (index,width){
return (index - width);
}),new cljs.core.Keyword(null,"NE","NE",-923032613),(function (index,width){
return ((index - width) + (1));
}),new cljs.core.Keyword(null,"W","W",-2035370425),(function (index,width){
return (index - (1));
}),new cljs.core.Keyword(null,"E","E",230849842),(function (index,width){
return (index + (1));
}),new cljs.core.Keyword(null,"SW","SW",-766913394),(function (index,width){
return ((index + width) - (1));
}),new cljs.core.Keyword(null,"S","S",1267293308),(function (index,width){
return (index + width);
}),new cljs.core.Keyword(null,"SE","SE",-1876230652),(function (index,width){
return ((index + width) + (1));
})], null);
/**
 * gets the index of all the squares touching the supplied index
 */
cljs_minesweeper.game.get_all_touches = (function cljs_minesweeper$game$get_all_touches(index,width,height){
var isTop = (index < width);
var isBottom = cljs.core._EQ_.call(null,(height - (1)),((index / width) | (0)));
var isLeft = cljs.core._EQ_.call(null,(0),cljs.core.mod.call(null,index,width));
var isRight = cljs.core._EQ_.call(null,(width - (1)),cljs.core.mod.call(null,index,width));
var directions = ((isTop)?cljs.core.dissoc.call(null,cljs_minesweeper.game.touches,new cljs.core.Keyword(null,"N","N",-640629860),new cljs.core.Keyword(null,"NW","NW",-651979397),new cljs.core.Keyword(null,"NE","NE",-923032613)):cljs_minesweeper.game.touches);
var directions__$1 = ((isBottom)?cljs.core.dissoc.call(null,directions,new cljs.core.Keyword(null,"SW","SW",-766913394),new cljs.core.Keyword(null,"S","S",1267293308),new cljs.core.Keyword(null,"SE","SE",-1876230652)):directions);
var directions__$2 = ((isLeft)?cljs.core.dissoc.call(null,directions__$1,new cljs.core.Keyword(null,"NW","NW",-651979397),new cljs.core.Keyword(null,"W","W",-2035370425),new cljs.core.Keyword(null,"SW","SW",-766913394)):directions__$1);
var directions__$3 = ((isRight)?cljs.core.dissoc.call(null,directions__$2,new cljs.core.Keyword(null,"NE","NE",-923032613),new cljs.core.Keyword(null,"E","E",230849842),new cljs.core.Keyword(null,"SE","SE",-1876230652)):directions__$2);
var length = (width * height);
return cljs.core.filter.call(null,((function (isTop,isBottom,isLeft,isRight,directions,directions__$1,directions__$2,directions__$3,length){
return (function (p1__22864_SHARP_){
return (length > p1__22864_SHARP_);
});})(isTop,isBottom,isLeft,isRight,directions,directions__$1,directions__$2,directions__$3,length))
,cljs.core.filter.call(null,((function (isTop,isBottom,isLeft,isRight,directions,directions__$1,directions__$2,directions__$3,length){
return (function (p1__22863_SHARP_){
return ((0) <= p1__22863_SHARP_);
});})(isTop,isBottom,isLeft,isRight,directions,directions__$1,directions__$2,directions__$3,length))
,cljs.core.map.call(null,((function (isTop,isBottom,isLeft,isRight,directions,directions__$1,directions__$2,directions__$3,length){
return (function (calc){
return calc.call(null,index,width);
});})(isTop,isBottom,isLeft,isRight,directions,directions__$1,directions__$2,directions__$3,length))
,cljs.core.vals.call(null,directions__$3))));
});
cljs_minesweeper.game.square = (function cljs_minesweeper$game$square(index,width,height,mines){
var number = (((mines > index))?(-1):(0));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"number","number",1570378438),number,new cljs.core.Keyword(null,"show","show",-576705889),false,new cljs.core.Keyword(null,"marked","marked",1403026280),false], null);
});
/**
 * find all touching zeros and other non-mine squares recursively
 */
cljs_minesweeper.game.find_all_neighbors = (function cljs_minesweeper$game$find_all_neighbors(squares,index,width,height){
var index_to_check = index;
var indices_to_mark = cljs.core.PersistentHashSet.EMPTY;
var indices_to_check = cljs.core.PersistentVector.EMPTY;
var indices_checked = cljs.core.PersistentHashSet.EMPTY;
while(true){
if((index_to_check == null)){
return indices_to_mark;
} else {
var directions = cljs_minesweeper.game.get_all_touches.call(null,index_to_check,width,height);
var new_empties = cljs.core.filter.call(null,((function (index_to_check,indices_to_mark,indices_to_check,indices_checked,directions){
return (function (p1__22866_SHARP_){
return cljs.core.not.call(null,indices_checked.call(null,p1__22866_SHARP_));
});})(index_to_check,indices_to_mark,indices_to_check,indices_checked,directions))
,cljs.core.filter.call(null,((function (index_to_check,indices_to_mark,indices_to_check,indices_checked,directions){
return (function (p1__22865_SHARP_){
return cljs_minesweeper.game.is_empty_QMARK_.call(null,cljs.core.nth.call(null,squares,p1__22865_SHARP_));
});})(index_to_check,indices_to_mark,indices_to_check,indices_checked,directions))
,directions));
var new_indices_to_check = cljs.core.seq.call(null,cljs.core.set.call(null,cljs.core.concat.call(null,indices_to_check,new_empties)));
var G__22867 = cljs.core.first.call(null,new_indices_to_check);
var G__22868 = cljs.core.apply.call(null,cljs.core.conj,indices_to_mark,index_to_check,directions);
var G__22869 = cljs.core.rest.call(null,new_indices_to_check);
var G__22870 = cljs.core.conj.call(null,indices_checked,index_to_check);
index_to_check = G__22867;
indices_to_mark = G__22868;
indices_to_check = G__22869;
indices_checked = G__22870;
continue;
}
break;
}
});
cljs_minesweeper.game.mark_shown = (function cljs_minesweeper$game$mark_shown(square){

return cljs.core.assoc.call(null,square,new cljs.core.Keyword(null,"show","show",-576705889),true,new cljs.core.Keyword(null,"marked","marked",1403026280),false);
});
cljs_minesweeper.game.mark_squares = (function cljs_minesweeper$game$mark_squares(squares,index,width,height){
var current = cljs.core.nth.call(null,squares,index);
var indices_to_mark = (cljs.core.truth_(cljs_minesweeper.game.is_empty_QMARK_.call(null,current))?cljs_minesweeper.game.find_all_neighbors.call(null,squares,index,width,height):cljs.core.PersistentHashSet.fromArray([index], true));
return cljs.core.map_indexed.call(null,((function (current,indices_to_mark){
return (function (index__$1,item){
if(cljs.core.truth_(indices_to_mark.call(null,index__$1))){
return cljs_minesweeper.game.mark_shown.call(null,item);
} else {
return item;
}
});})(current,indices_to_mark))
,squares);
});
cljs_minesweeper.game.get_index = (function cljs_minesweeper$game$get_index(x,y,width){
return ((y * width) + x);
});
/**
 * marks a square as shown, if square is zero, marks the touching zeros and squares
 */
cljs_minesweeper.game.click = (function cljs_minesweeper$game$click(p__22871,x,y){
var map__22874 = p__22871;
var map__22874__$1 = ((((!((map__22874 == null)))?((((map__22874.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22874.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22874):map__22874);
var board = map__22874__$1;
var width = cljs.core.get.call(null,map__22874__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var height = cljs.core.get.call(null,map__22874__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var squares = cljs.core.get.call(null,map__22874__$1,new cljs.core.Keyword(null,"squares","squares",-888257629));
var index = cljs_minesweeper.game.get_index.call(null,x,y,width);
var marked = new cljs.core.Keyword(null,"marked","marked",1403026280).cljs$core$IFn$_invoke$arity$1(cljs.core.nth.call(null,squares,index));
if(cljs.core.truth_((function (){var or__21670__auto__ = marked;
if(cljs.core.truth_(or__21670__auto__)){
return or__21670__auto__;
} else {
return (index > cljs.core.count.call(null,squares));
}
})())){
return board;
} else {
return cljs.core.assoc.call(null,board,new cljs.core.Keyword(null,"squares","squares",-888257629),cljs_minesweeper.game.mark_squares.call(null,squares,index,width,height));
}
});
cljs_minesweeper.game.mark_marked = (function cljs_minesweeper$game$mark_marked(square){
return cljs.core.assoc.call(null,square,new cljs.core.Keyword(null,"marked","marked",1403026280),cljs.core.not.call(null,new cljs.core.Keyword(null,"marked","marked",1403026280).cljs$core$IFn$_invoke$arity$1(square)));
});
/**
 * lets the user mark a square as suspected mine, stops from clicking on it
 */
cljs_minesweeper.game.mark = (function cljs_minesweeper$game$mark(p__22876,x,y){
var map__22879 = p__22876;
var map__22879__$1 = ((((!((map__22879 == null)))?((((map__22879.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22879.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22879):map__22879);
var board = map__22879__$1;
var width = cljs.core.get.call(null,map__22879__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var height = cljs.core.get.call(null,map__22879__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var squares = cljs.core.get.call(null,map__22879__$1,new cljs.core.Keyword(null,"squares","squares",-888257629));
var index = cljs_minesweeper.game.get_index.call(null,x,y,width);
var current = cljs.core.nth.call(null,squares,index);
var new_squares = cljs.core.assoc.call(null,cljs.core.vec.call(null,squares),index,cljs_minesweeper.game.mark_marked.call(null,current));
return cljs.core.assoc.call(null,board,new cljs.core.Keyword(null,"squares","squares",-888257629),cljs.core.seq.call(null,new_squares));
});
/**
 * check if the user has 'click':ed any mines
 */
cljs_minesweeper.game.lost_QMARK_ = (function cljs_minesweeper$game$lost_QMARK_(p__22881){
var map__22884 = p__22881;
var map__22884__$1 = ((((!((map__22884 == null)))?((((map__22884.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22884.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22884):map__22884);
var squares = cljs.core.get.call(null,map__22884__$1,new cljs.core.Keyword(null,"squares","squares",-888257629));
return cljs.core.some.call(null,cljs.core.identity,cljs.core.map.call(null,new cljs.core.Keyword(null,"show","show",-576705889),cljs.core.filter.call(null,cljs_minesweeper.game.is_mine_QMARK_,squares)));
});
/**
 * check if the user has 'click':ed all non-mines, without hitting any mines
 */
cljs_minesweeper.game.won_QMARK_ = (function cljs_minesweeper$game$won_QMARK_(p__22887){
var map__22890 = p__22887;
var map__22890__$1 = ((((!((map__22890 == null)))?((((map__22890.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22890.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22890):map__22890);
var board = map__22890__$1;
var squares = cljs.core.get.call(null,map__22890__$1,new cljs.core.Keyword(null,"squares","squares",-888257629));
return (cljs.core.not.call(null,cljs_minesweeper.game.lost_QMARK_.call(null,board))) && (cljs.core.every_QMARK_.call(null,cljs.core.identity,cljs.core.map.call(null,new cljs.core.Keyword(null,"show","show",-576705889),cljs.core.filter.call(null,((function (map__22890,map__22890__$1,board,squares){
return (function (p1__22886_SHARP_){
return cljs.core.not.call(null,cljs_minesweeper.game.is_mine_QMARK_.call(null,p1__22886_SHARP_));
});})(map__22890,map__22890__$1,board,squares))
,squares))));
});
cljs_minesweeper.game.mark_touches = (function cljs_minesweeper$game$mark_touches(idx,item,width,height,all){
if(cljs.core._EQ_.call(null,(-1),new cljs.core.Keyword(null,"number","number",1570378438).cljs$core$IFn$_invoke$arity$1(item))){
return item;
} else {
var mine_count = cljs.core.count.call(null,cljs.core.filter.call(null,cljs_minesweeper.game.is_mine_QMARK_,cljs.core.map.call(null,(function (p1__22892_SHARP_){
return cljs.core.nth.call(null,all,p1__22892_SHARP_);
}),cljs_minesweeper.game.get_all_touches.call(null,idx,width,height))));
return cljs.core.assoc.call(null,item,new cljs.core.Keyword(null,"number","number",1570378438),mine_count);
}
});
cljs_minesweeper.game.gen_squares = (function cljs_minesweeper$game$gen_squares(width,height,mines){
var length = (width * height);
var squares = cljs.core.map.call(null,((function (length){
return (function (p1__22893_SHARP_){
return cljs_minesweeper.game.square.call(null,p1__22893_SHARP_,width,height,mines);
});})(length))
,cljs.core.range.call(null,length));
var squares__$1 = cljs.core.shuffle.call(null,squares);
return cljs.core.map_indexed.call(null,((function (length,squares,squares__$1){
return (function (idx,item){
return cljs_minesweeper.game.mark_touches.call(null,idx,item,width,height,squares__$1);
});})(length,squares,squares__$1))
,squares__$1);
});
/**
 * generates a board for play
 */
cljs_minesweeper.game.board = (function cljs_minesweeper$game$board(width,height,mines){
var squares = cljs_minesweeper.game.gen_squares.call(null,width,height,mines);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),width,new cljs.core.Keyword(null,"height","height",1025178622),height,new cljs.core.Keyword(null,"mines","mines",-1960796490),mines,new cljs.core.Keyword(null,"squares","squares",-888257629),squares], null);
});
/**
 * helper function to draw a board on the repl when developing
 */
cljs_minesweeper.game.draw_board = (function cljs_minesweeper$game$draw_board(board){
var width = new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(board);
var squares = new cljs.core.Keyword(null,"squares","squares",-888257629).cljs$core$IFn$_invoke$arity$1(board);
while(true){
if(cljs.core.empty_QMARK_.call(null,squares)){
return null;
} else {
cljs.core.println.call(null,cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,((function (squares,width){
return (function (p1__22894_SHARP_){
if(cljs.core._EQ_.call(null,(-1),p1__22894_SHARP_)){
return "X";
} else {
return p1__22894_SHARP_;
}
});})(squares,width))
,cljs.core.map.call(null,new cljs.core.Keyword(null,"number","number",1570378438),cljs.core.take.call(null,width,squares)))));

var G__22895 = cljs.core.drop.call(null,width,squares);
squares = G__22895;
continue;
}
break;
}
});

//# sourceMappingURL=game.js.map?rel=1457989969849