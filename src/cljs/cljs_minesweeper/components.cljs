(ns cljs-minesweeper.components)

(defn mine [row col {:keys [number show marked] :as square} click right-click]
  (let [[mine-class content] (cond
                    (and show (= -1 number)) ["mine-mine"  "☭"]
                    show ["mine-show" number]
                    (and (not show) marked) ["mine-marked" "☮"]
                    :else ["mine-blank" ""])]
   [:div
     {:data-qa "board-square"
      :on-click (fn [e] (.preventDefault e) (click row col))
      :on-context-menu (fn [e] (.preventDefault e) (right-click row col))
      :class (str "mine " mine-class)
      :key (str "mine-" row "-" col)}
      content]))

(defn row [row squares click right-click]
  [:div
   {:data-qa "board-row"
    :key (str "row-" row)
    :class "horizontal-flex"}
    (map-indexed (fn [col square] (mine row col square click right-click)) squares)])

(defn board [{:keys [squares width height mines] :as board} click right-click]
  (let [rows (partition width squares)]
    [:div
      {:data-qa "board"
       :class "vertical-flex"}
      (map-indexed (fn [rownumber squares] (row rownumber squares click right-click)) rows)]))
