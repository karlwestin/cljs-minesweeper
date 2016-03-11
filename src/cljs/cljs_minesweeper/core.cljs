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

(defn game []
  (let [board @state
        won (game/won? board)
        lost (game/lost? board)
        title (cond
                won "You Swept the Commies!"
                lost "The Commies Won!!"
                :else "ClojureScript Commie Sweeper")]
    [:div
      [:h1 title]
      [components/board @state click mark]]))

(reagent/render
  [game]
  (.getElementById js/document "app"))


