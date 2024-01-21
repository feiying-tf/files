// 创建动画曲线的函数
export function createAnimation(
  scrollStart: number,
  scrollEnd: number,
  startValue: number,
  endValue: number
) {
  return function (x: number) {
    if (x < scrollStart) {
      return startValue;
    }
    if (x > scrollEnd) {
      return endValue;
    }

    // 根据公式得出 x 对应的 y 的值
    return (
      ((endValue - startValue) * (x - scrollStart)) /
        (scrollEnd - scrollStart) +
      startValue
    );
  };
}
