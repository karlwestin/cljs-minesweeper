(ns cljs-minesweeper.test-helpers
  (:require [cljs.test]
            [cljsjs.react :as react]
            [reagent.core :as reagent]))

(def test-utils js/React.addons.TestUtils)

;; event types are passed in as keywords
;; :click, :mouseOver, :touchStart
;; see list of events here
;; https://facebook.github.io/react/docs/events.html#mouse-events
(defn simulate [key component-or-node & [event-data]]
  (let [simulate-obj (.-Simulate test-utils)]
    (.call (aget simulate-obj (name key)) simulate-obj component-or-node event-data)))

;; test helper functions taken from reagent source
;; https://github.com/reagent-project/reagent/blob/master/test/reagenttest/testreagent.cljs
(defn add-test-div [name]
  (let [body (.-body js/document)
        div (.createElement js/document "div")]
    (.appendChild body div)
    div))

(defn with-mounted-component [comp f]
  (let [div (add-test-div "_testreagent")]
        (let [comp (reagent/render-component comp div #(f comp div))]
          (reagent/unmount-component-at-node div)
          (reagent/flush)
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

(defn spy []
  (let [callcount (atom 0)]
    {:called? #(> @callcount 0)
     :spy #(swap! callcount inc)}))

;; match regex example
;; (is (re-find #"hello world" text))

