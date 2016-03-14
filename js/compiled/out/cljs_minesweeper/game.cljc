(ns cljs-minesweeper.game)

(defn is-mine?
  "checks if a square is a mine"
  [square]
  (= -1 (:number square)))

(defn is-empty?
  "checks if a square is a zero"
  [square]
  (= 0 (:number square)))

(def ^{:private true} touches {:NW (fn [index width] (- index width 1))
                               :N (fn [index width] (- index width))
                               :NE (fn [index width] (+ (- index width) 1))
                               :W (fn [index width] (- index 1))
                               :E (fn [index width] (+ index 1))
                               :SW (fn [index width] (- (+ index width) 1))
                               :S (fn [index width] (+ index width))
                               :SE (fn [index width] (+ index width 1))})

(defn get-all-touches
  "gets the index of all the squares touching the supplied index"
  [index width height]
  (let [isTop (< index width)
        isBottom (= (- height 1) (int (/ index width)))
        isLeft (= 0 (mod index width))
        isRight (= (- width 1) (mod index width))
        directions (if isTop
                     (dissoc touches :N :NW :NE)
                     touches)
        directions (if isBottom
                     (dissoc directions :SW :S :SE)
                     directions)
        directions (if isLeft
                    (dissoc directions :NW :W :SW)
                    directions)
        directions (if isRight
                     (dissoc directions :NE :E :SE)
                     directions)
        length (* width height)]
    (->> (map (fn [calc] (calc index width)) (vals directions))
        (filter #(<= 0 %))
        (filter #(> length %)))))

(defn- square [index width height mines]
  (let [number (if (> mines index) -1 0)]
   {:number number
    :show false
    :marked false}))

(defn- find-all-neighbors
  "find all touching zeros and other non-mine squares recursively"
  [squares index width height]
  (loop [index-to-check index
         indices-to-mark #{}
         indices-to-check []
         indices-checked #{}]
    (if (nil? index-to-check)
      indices-to-mark
      (let [directions (get-all-touches index-to-check width height)
            new-empties (->> (filter #(is-empty? (nth squares %)) directions)
                             (filter #(not (indices-checked %))))
            new-indices-to-check (-> (concat indices-to-check new-empties)
                                     set
                                     seq)]
        (recur ;; next index to check
               (first new-indices-to-check)
               ;; next set of indices to mark
               (apply conj indices-to-mark index-to-check directions)
               ;; new list of documents to check
               (rest new-indices-to-check)
               ;; new list of checked documents to filter empties against
               (conj indices-checked index-to-check))))))

(defn- mark-shown [square]
  "include marked: false here to make sure 0:s shown by clicking neighbouring 0:s are unmarked"
  (assoc square :show true :marked false))

(defn- mark-squares [squares index width height]
  (let [current (nth squares index)
        indices-to-mark (if (is-empty? current)
                          (find-all-neighbors squares index width height)
                          #{index})]
    (map-indexed (fn [index item]
           (if (indices-to-mark index)
             (mark-shown item)
             item )) squares)))

(defn- get-index [x y width]
  (+ (* y width) x))

(defn click
  "marks a square as shown, if square is zero, marks the touching zeros and squares"
  [{:keys [width height squares] :as board} x y]
  (let [index (get-index x y width)
        marked (:marked (nth squares index))]
    (if (or marked
            (> index (count squares)))
      board
      (assoc board :squares (mark-squares squares index width height)))))

(defn mark-marked [square]
  (assoc square :marked (not (:marked square))))

(defn mark
  "lets the user mark a square as suspected mine, stops from clicking on it"
  [{:keys [width height squares] :as board} x y]
  (let [index (get-index x y width)
        current (nth squares index)
        new-squares (assoc (vec squares) index (mark-marked current))]
    (assoc board :squares (seq new-squares))))

(defn lost?
  "check if the user has 'click':ed any mines"
  [{:keys [squares]}]
  (->> (filter is-mine? squares)
       (map :show)
       (some identity)))

(defn won?
  "check if the user has 'click':ed all non-mines, without hitting any mines"
  [{:keys [squares] :as board}]
  (and (not (lost? board))
       (->> (filter #(not (is-mine? %)) squares)
            (map :show)
            (every? identity))))

(defn- mark-touches [idx item width height all]
  (if (= -1 (:number item))
    item
    (let [mine-count (->> (get-all-touches idx width height)
                          (map #(nth all %))
                          (filter is-mine?)
                          count)]
      (assoc item :number mine-count))))

(defn- gen-squares [width height mines]
  (let [length (* width height)
        squares (map #(square % width height mines) (range length))
        squares (shuffle squares)]
    (map-indexed (fn [idx item] (mark-touches idx item width height squares)) squares)))

(defn board
  "generates a board for play"
  [width height mines]
  (let [squares (gen-squares width height mines)]
    {:width width
    :height height
    :mines mines
    :squares squares}))

(defn draw-board
  "helper function to draw a board on the repl when developing"
  [board]
  (let [width (:width board)]
    (loop [squares (:squares board)]
      (when-not (empty? squares)
        (println (->> (map :number (take width squares))
                      (map #(if (= -1 %) "X" %))
                      (apply str)))
        (recur (drop width squares))))))

