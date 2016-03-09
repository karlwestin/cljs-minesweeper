(ns cljs-minesweeper.core-test
  (:require-macros [cljs.test :refer (is deftest testing)])
  (:require [cljs-minesweeper.components :as components]
            [cljs.test]
            [cljs-minesweeper.test-helpers :as helpers]))

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

(deftest example-component-test
  (helpers/with-mounted-component
    [components/board testboard]
    (fn [c div]
      (is (= 25 (count (helpers/qa-find div "board-square")))))))
