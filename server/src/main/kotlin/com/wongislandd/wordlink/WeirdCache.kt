package com.wongislandd.wordlink

/**
 * Caches a max of two values at any given time, gets rid of the oldest ones.
 */
class WeirdCache<K, V> {
    private val map: LinkedHashMap<K, V> = linkedMapOf()

    val entries: Map<K, V>
        get() = map.toMap()

    fun put(key: K, value: V) {
        if (map.size >= 2 && !map.containsKey(key)) {
            // Remove the oldest entry if the map is at max capacity and the key is new
            val oldestKey = map.keys.first()
            map.remove(oldestKey)
        }
        map[key] = value
    }

    fun get(key: K): V? = map[key]

    fun remove(key: K): V? = map.remove(key)

    fun clear() = map.clear()

    override fun toString(): String = map.toString()
}