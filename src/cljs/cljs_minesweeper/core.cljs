(ns cljs-minesweeper.core
  (:require [cljs-minesweeper.game :as game]
            [reagent.core :as reagent]
            [cljs-minesweeper.components :as components]))

(enable-console-print!)

;; Default board size
(def boardsize [10 10 20])

;; Application state holder
(defonce state
  (reagent/atom
    (apply game/board boardsize)))

(defn click
  "Clicking action:
  Creates a new board where the coordinates of square have been clicked,
  and sets application state to that new board."
  [row col]
  (println "clicking" row col)
  (let [currentboard @state]
    (reset! state (game/click currentboard col row))))

(defn mark
  "Marking action:
  Creates a new board where the coordinates
  of square have been marked, sets application state."
  [row col]
  (println "marking" row col)
  (let [currentboard @state]
    (reset! state (game/mark currentboard col row))))

(defn new-game
  "New game action.
  Generates a new board and sets application state"
  []
  (reset! state (apply game/board boardsize)))

(defn game
  "Game boilerplate/ui
  Decides whether the game has ended or not
  and attached messages/click handlers based on that"
  []
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

;; Render the app
(reagent/render
  [game]
  (.getElementById js/document "app"))

;; This is a test board i used when developing
;; When rendering this into a component
;; (reagent/render
;;   [components/board testboard #() #()]
;;   (.getElementById js/document "app"))
;; it renders one square of each square type
(def testboard
  {:squares (-> (map #(assoc {:show true} :number %) (range 0 9))
                (concat '({:number -1 :show true}
                          {:number -1 :show false}
                          {:number -1 :show false :marked true})))
   :width 12
   :height 1
   :mines 0 })
