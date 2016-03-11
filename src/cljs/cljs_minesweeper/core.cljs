(ns cljs-minesweeper.core
  (:require [reagent.core :as reagent]
            [cljs-minesweeper.components :as components]))

(enable-console-print!)

(defonce app-state (atom {:text "Hello Chestnut!"}))

(def state
  (reagent/atom
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
                {:number 1, :show false, :marked false})}))

(defn click [row col]
  (println "clicking" row col))

(defn mark [row col]
  (println "marking" row col))

(reagent/render
  [components/board @state click mark]
  (.getElementById js/document "app"))


