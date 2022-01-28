<template>
  <div class="container">
    <ul ref="wrap">
      <li
        v-for="(item, index) in contentList"
        :key="item"
        :style="{
          transform: translateFn(index),
          backgroundColor: `#${222 * item}`,
          'z-index':
            activeType === 'right'
              ? contentList.length - getNewIndex(index)
              : getNewIndex(index),
        }"
        :class="{
          'is-animate': animateList.includes(index),
        }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
  <button @click="handleLeft">left</button>
  <button @click="handleRight">right</button>
</template>
<script>
import { ref, onMounted, nextTick } from "vue";
export default {
  setup() {
    const wrap = ref(null);
    const animateList = ref([]);
    const itemWidth = ref(0);
    // const offsetIndex = ref(0);
    const contentList = ref([1, 2, 3, 4]);
    // const currentIndex = ref(getNewIndex(0));
    const indexQueue = ref([]);
    const activeIndex = ref(1); // 显示以indexQueue中索引为1对应的值为索引的item
    const activeType = ref("left");
    contentList.value.forEach((item, index) => {
      indexQueue.value.push(index);
    });
    animate("left");

    onMounted(() => {
      itemWidth.value = parseInt(wrap.value.offsetWidth);
      nextTick(() => {
        contentList.value.forEach((item, index) => {
          animateList.value.push(index);
        });
      });
    });
    function animate(type) {
      // const offset = type === "left" ? -1 : 1;
      // offsetIndex.value =
      //   (offsetIndex.value + offset) % contentList.value.length;

      // currentIndex.value =
      //   (currentIndex.value - offset + contentList.value.length) %
      //   contentList.value.length;

      activeType.value = type;
      if (type === "right") {
        let temp = indexQueue.value.shift();
        indexQueue.value.push(temp);
      } else if (type === "left") {
        let temp = indexQueue.value.pop(temp);
        indexQueue.value.unshift(temp);
      }
    }
    function handleLeft() {
      animate("left");
    }
    function handleRight() {
      animate("right");
    }
    function getNewIndex(index) {
      // let newIndex = (index + 1) % contentList.value.length;
      // newIndex =
      //   (newIndex + offsetIndex.value + contentList.value.length) %
      //   contentList.value.length;
      // return newIndex;
      // console.log("indexQueue", indexQueue);
      let newIndex = indexQueue?.value?.findIndex((item) => {
        return index == item;
      });

      return newIndex;
    }
    // 生成偏移量的函数
    function translateFn(index) {
      // let newIndex = getNewIndex(index);
      // return `translateX(${(newIndex - 1) * itemWidth.value}px)`;

      let newIndex = getNewIndex(index);
      return `translateX(${
        (newIndex - activeIndex.value) * itemWidth.value
      }px)`;
    }

    return {
      wrap,
      animateList,
      itemWidth,
      // changeAnimate,
      // offsetIndex,
      handleLeft,
      handleRight,
      translateFn,
      contentList,
      // currentIndex,
      getNewIndex,
      activeIndex,
      activeType,
    };
  },
};
</script>
<style lang="scss" scoped>
ul {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
}

li {
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  &.is-animate {
    transition: transform 0.4s ease-in-out;
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
