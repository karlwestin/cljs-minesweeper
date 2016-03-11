(ns cljs-minesweeper.core
  (:require [cljs-minesweeper.game :as game]
            [reagent.core :as reagent]
            [cljs-minesweeper.components :as components]))

(enable-console-print!)

(defonce app-state (atom {:text "Hello Chestnut!"}))

(defonce state
  (reagent/atom
    (game/board 10 10 10)))

(defn click [row col]
  (println "clicking" row col)
  (let [currentboard @state]
    (reset! state (game/click currentboard col row))))

(defn mark [row col]
  (println "marking" row col)
  (let [currentboard @state]
    (reset! state (game/mark currentboard col row))))

(defn new-game []
  (reset! state (game/board 10 10 10)))

(defn game []
  (let [board @state
        won (game/won? board)
        lost (game/lost? board)
        ended (or won lost)
        click-fn (if ended #() click)
        mark-fn (if ended #() mark)
        title (cond
                won "You Swept the Commies! Freedom!!$$$"
                lost "The Commies Won!!"
                :else "Fight Communism with ClojureScript!")]
    [:div
      [:h1 title]
      [components/board @state click-fn mark-fn]
      (when ended
        [:button {:on-click new-game} "lets try to beat them again"])]))

(reagent/render
  [game]
  (.getElementById js/document "app"))


