(ns cljs-minesweeper.test-runner
  (:require
   [doo.runner :refer-macros [doo-tests]]
   [cljs-minesweeper.core-test]))

(enable-console-print!)

(doo-tests 'cljs-minesweeper.core-test)
