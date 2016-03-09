(ns cljs-minesweeper.components)

(defn mine [row col square]
  [:div {:data-qa "board-square" :key (str "mine-" row "-" col)} "im a mine"])

(defn row [row squares]
  [:div {:data-qa "board-row" :key (str "row-" row)}
    (map-indexed (fn [col square] [mine row col square]) squares)])

(defn board [{:keys [squares width height mines] :as board}]
  (let [rows (partition width squares)]
    [:div {:data-qa "board"}
      (map-indexed row rows)]))
