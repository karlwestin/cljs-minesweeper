(ns cljs-minesweeper.test-helpers
  (:require [cljs.test]
            [reagent.core :as r]))

;; test helper functions taken from reagent source
;; https://github.com/reagent-project/reagent/blob/master/test/reagenttest/testreagent.cljs
(defn add-test-div [name]
  (let [body (.-body js/document)
        div (.createElement js/document "div")]
    (.appendChild body div)
    div))

(defn with-mounted-component [comp f]
  (let [div (add-test-div "_testreagent")]
        (let [comp (r/render-component comp div #(f comp div))]
          (r/unmount-component-at-node div)
          (r/flush)
          (.removeChild (.-body js/document) div))))


;; some common test operations
(defn text [el]
  (.-textContent el))

(defn qa-find [el qa-name]
  ;; convert to ISeqable so we can work with the NodeList
  ;; https://groups.google.com/d/msg/clojurescript/bMoFWh7VYGg/MV7xexnXTzgJ
  (array-seq
    (.querySelectorAll
      el
      (str "[data-qa="  qa-name "]"))))

;; match regex example
;; (is (re-find #"hello world" text))

