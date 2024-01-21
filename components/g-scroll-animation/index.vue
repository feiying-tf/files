<template>
  <div class="wrapper">
    <div class="box1">part1</div>
    <div class="box2">
      <div class="content">
        <div class="item-list">
          <div class="item" data-order="0">1</div>
          <div class="item" data-order="1">2</div>
          <div class="item" data-order="2">3</div>
          <div class="item" data-order="3">4</div>
          <div class="item" data-order="4">5</div>
          <div class="item" data-order="0">6</div>
          <div class="item" data-order="1">7</div>
          <div class="item" data-order="2">8</div>
          <div class="item" data-order="3">9</div>
          <div class="item" data-order="4">10</div>
        </div>
      </div>
    </div>
    <div class="box3">part3</div>
    <div class="box4">part4</div>
  </div>
</template>
<script setup lang="ts">
// import { YForm } from "@yige/ui";
import { onMounted } from "vue";
import { createAnimation } from "./utils";
const animationMap = new Map();
let listWrap = null;
let contentEle = null;

function getDomAnimation(
  scrollStart: number,
  scrollEnd: number,
  dom?: HTMLElement
) {
  const offsetStart = dom.dataset.order * 50;
  const opacityAnimation = createAnimation(
    scrollStart + offsetStart,
    scrollEnd,
    0,
    1
  );
  const scaleAnimation = createAnimation(
    scrollStart + offsetStart,
    scrollEnd,
    0.5,
    1
  );

  const { clientWidth, clientHeight, offsetTop, offsetLeft } = dom;
  if (!contentEle) {
    contentEle = document.querySelector(".content");
  }

  const rect = contentEle.getBoundingClientRect();

  const xAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    rect.width / 2 - clientWidth / 2 - offsetLeft,
    0
  );
  const yAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    rect.height / 2 - clientHeight / 2 - offsetTop,
    0
  );

  const opacity = function (x) {
    return opacityAnimation(x);
  };
  const transform = function (x) {
    return `translate(${xAnimation(x)}px, ${yAnimation(
      x
    )}px) scale(${scaleAnimation(x)})`;
  };
  return {
    opacity,
    transform,
  };
}

// 设置（更新）动画映射
function udpateMap() {
  const items = document.querySelectorAll(".item");
  const box1Ele: HTMLElement = document.querySelector(".box1")!;
  const box2Ele: HTMLElement = document.querySelector(".box2")!;
  // 自定义滚动开始的位置
  const scrollStart = box1Ele.offsetHeight - 100;
  // 自定义滚动结束的位置
  const scrollEnd = scrollStart + box2Ele.offsetHeight / 2;
  for (const item of items) {
    animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item));
  }
}

// 将map结构中的动画应用到元素上
function updateStyles() {
  const scrollY = window.scrollY;
  // 遍历所有的 map
  for (const [dom, animations] of animationMap) {
    // 遍历所有的dom要产生动画的属性
    for (const prop in animations) {
      // 将 scrollY 传进去，产生新的value
      const value = animations[prop](scrollY);
      dom.style[prop] = value;
    }
  }
}

onMounted(() => {
  udpateMap();
  updateStyles();
  window.addEventListener("scroll", () => {
    updateStyles();
  });
});
</script>

<style scoped lang="scss">
.wrapper {
  color: #fff;
  .box1 {
    height: 500px;
    background-color: pink;
  }
  .box2 {
    // position: relative;
    height: 800px;
    background-color: green;
    .content {
      height: 500px;
      position: sticky;
      top: 0;
      background-color: orange;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .item-list {
        // width: 600px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        justify-items: center;
        align-items: center;
        .item {
          display: inline-block;
          width: 50px;
          height: 50px;
          margin: 10px;
          background-color: purple;
        }
      }
    }
  }
  .box3 {
    height: 500px;
    background-color: blue;
  }
  .box4 {
    height: 500px;
    background-color: green;
  }
}
</style>
