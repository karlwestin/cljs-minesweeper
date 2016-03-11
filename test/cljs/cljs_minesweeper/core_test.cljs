(ns cljs-minesweeper.core-test
  (:require-macros [cljs.test :refer (is deftest testing)])
  (:require [cljs-minesweeper.components :as components]
            [cljs.test]
            [cljs-minesweeper.test-helpers :as helpers]
            [dommy.core :as dommy :refer-macros [sel sel1]]))

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

(deftest render-board
  (helpers/with-mounted-component
    [components/board testboard #() #()]
    (fn [c div]
      (is (= 25 (count (helpers/qa-find div "board-square")))))))

(defn test-mine [mine class-check content]
 (helpers/with-mounted-component
    [components/mine 1 0 mine #() #()]
    (fn [c el]
      (let [test-el (first (helpers/qa-find el "board-square"))]
        (is
          (re-find class-check (dommy/class test-el))
          "adds classname to mine")
        (is (= content (dommy/text test-el)) "adds the right content")))))

(deftest render-not-shown
  (test-mine
    {:number 0 :show false}
    #"mine-blank"
    ""))

(deftest render-not-exploded-mine
  (test-mine
    {:number -1 :show false}
    #"mine-blank"
    ""))

(deftest render-exploded-mine
  (test-mine
    {:number -1 :show true}
    #"mine-mine"
    "☭"))

(deftest render-number
  (test-mine
    {:number 1 :show true}
    #"mine-show"
    "1"))

(deftest render-number-marked
  (test-mine
    {:number 1 :show true :marked true}
    #"mine-show"
    "1"))

(deftest render-marked
  (test-mine
    {:number 1 :show false :marked true}
    #"mine-marked"
    "☮"))

(deftest click-mine
  (let [{:keys [called? spy]} (helpers/spy)]
   (helpers/with-mounted-component
     ;; Note spy is passed as 1st handler arg
     [components/mine 1 0 {:value 1 :show false} spy #()]
     (fn [c el]
      (let [test-el (first (helpers/qa-find el "board-square"))]
        (helpers/simulate :click test-el)
        (is (called?) "click spy got called"))))))

(deftest mark-mine
  (let [{:keys [called? spy]} (helpers/spy)]
   (helpers/with-mounted-component
     ;; Note spy is passed as 2nd handler arg
     [components/mine 1 0 {:value 1 :show false} #() spy]
     (fn [c el]
      (let [test-el (first (helpers/qa-find el "board-square"))]
        (helpers/simulate :contextMenu test-el)
        (is (called?) "right click spy got called"))))))
