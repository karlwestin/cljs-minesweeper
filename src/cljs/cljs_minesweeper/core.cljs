(ns cljs-minesweeper.core
  (:require [reagent.core :as reagent]))

(enable-console-print!)

(defonce app-state (atom {:text "Hello Chestnut!"}))

(defn menu []
  [:ul
   [:li "the real list here"]
   [:li "another item here"]
   ])

(reagent/render [:div [menu]] (.getElementById js/document "app"))


