(ns cljs-minesweeper.game-test
  (:require [clojure.test :refer :all]
            [cljs-minesweeper.game :as game]
            [clojure.set :as set-helpers]))

;; 0 1 2
;; 3 4 5
;; 6 7 8
(deftest get-all-touches-helper
  (is (= '(1 3 4) (game/get-all-touches 0 3 3)))
  (is (= '(0 2 3 4 5) (game/get-all-touches 1 3 3)))
  (is (= '(1 4 5) (game/get-all-touches 2 3 3)))
  (is (= '(0 1 4 6 7) (game/get-all-touches 3 3 3)))
  (is (= '(0 1 2 3 5 6 7 8) (game/get-all-touches 4 3 3)))
  (is (= '(1 2 4 7 8) (game/get-all-touches 5 3 3)))
  (is (= '(3 4 7) (game/get-all-touches 6 3 3)))
  (is (= '(3 4 5 6 8) (game/get-all-touches 7 3 3)))
  (is (= '(4 5 7) (game/get-all-touches 8 3 3))))

(deftest board-structure
  (let [width 10
        height 10
        mines 10
        board (game/board width height mines)
        mine-squares (filter #(= -1 (:number %)) (:squares board))
        indices (filter #(< -1 %)
                  (map-indexed (fn [index item]
                    (if (game/is-mine? item) index -1))
                    (:squares board)))
        _ (game/draw-board board)
        touches (map :number (:squares board))]
    (is (= (:width board) width))
    (is (= (:height board) height))
    (is (= (:mines board) mines))
    (is (= (count (:squares board)) (* width height))
        "squares are created")
    (is (= mines (count mine-squares))
        "mines are placed")
    (is (not (= (range 10) indices))
        "mines are not just after each other")
    (is (some pos? touches)
        "squares are marked with how many mines they touch")))

(def testboard
  {:width 5,
   :height 5,
   :mines 5,
   :squares '({:number -1, :show false, :marked false}
              {:number 1, :show false, :marked false}
              {:number 0, :show false, :marked false}
              {:number 0, :show false, :marked false}
              {:number 0, :show false, :marked false}
              {:number 1, :show false, :marked false}
              {:number 1, :show false, :marked false}
              {:number 1, :show false, :marked false}
              {:number 2, :show false, :marked false}
              {:number 2, :show false, :marked false}
              {:number 0, :show false, :marked false}
              {:number 0, :show false, :marked false}
              {:number 2, :show false, :marked false}
              {:number -1, :show false, :marked false}
              {:number -1, :show false, :marked false}
              {:number 0, :show false, :marked false}
              {:number 1, :show false, :marked false}
              {:number 3, :show false, :marked false}
              {:number -1, :show false, :marked false}
              {:number 3, :show false, :marked false}
              {:number 0, :show false, :marked false}
              {:number 1, :show false, :marked false}
              {:number -1, :show false, :marked false}
              {:number 2, :show false, :marked false}
              {:number 1, :show false, :marked false})})
;; X1000
;; 11122
;; 002XX
;; 013X3
;; 01X21
(deftest click-squares
  (let [clicked1 (game/click testboard 1 1)
        clicked2 (game/click testboard 0 2)
        clicked3 (game/click clicked1 1 1)
        to-be-marked #{5 6 7
                       10 11 12
                       15 16 17
                       20 21}
        not-to-be-marked (set-helpers/difference (set (range 25)) to-be-marked)]
    (is (= true (-> clicked1 :squares (nth 6) :show))
        "sets 'show' to 'true' for the clicked field")
    (is (->> (map #(nth (:squares clicked2) %) to-be-marked)
            (map :show)
            (every? identity))
        "sets 'show' on all neighbor non-mine elements when you click a 0")
    (is (->> (map #(nth (:squares clicked2) %) not-to-be-marked)
            (map :show)
            (not-any? identity))
        "doesnt set 'show' on elements that shouldnt be marked")
    (is (= clicked1 clicked3) "returns the same board if clicking already clicked element")))

(deftest mark-squares
  (let [marked (game/mark testboard 0 0)
        unmarked (game/mark marked 0 0)
        ]
    (is (-> marked :squares (nth 0) :marked) "marks a square as marked")
    (is (= -1 (-> marked :squares (nth 0) :number))  "marks a square as marked")
    (is (= marked (game/click marked 0 0)) "doesnt click marked squares")
    (is (-> unmarked :squares (nth 0) :marked not) "unmarks a square that was marked")))

(deftest lost
  (let [lostboard (game/click testboard 3 3)]
    (is (game/lost? lostboard) "returns true on a board where a mine is clicked")
    (is (not (game/lost? testboard)) "returns false on a board where no mine is clicked")))

(deftest won
  (let [lostboard (game/click testboard 3 3)
        wonboard (reduce
                   (fn [board click] (apply game/click board click))
                   testboard
                   [[2 0] [0 2] [4 3] [4 4] [3 4]])]
    (is (game/won? wonboard) "returns won for a cleared board")
    (is (not (game/won? lostboard)) "returns not won for a lost board")
    (is (not (game/won? testboard)) "returns not won for a not started board")))
