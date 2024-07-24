> BFC 的定义

格式化上下文（Block Formatting Context）是块级盒子的布局发生的区域，也是浮动元素与其他元素交互的区域。


> 产生`BFC`的条件

1. html
2. float 不为none
3: position： absolute，fixed
4：display: inline-block、table-cells、flex
5: over-flow: 除了visible(hidden、auto、scroll)


> `BFC` 特性
1. margin collapse
2. 可以包含浮动的元素（高度坍塌）
3. 隔离的独立容器
4. 计算BFC高度时，float 元素会参加
5. 浮动元素不会叠加到BFC上

> `BFC` 应用
1. 清除浮动
   父元素： over-flow: auto;
   父元素： 伪元素，clear: both;
   兄弟元素：clear: both;
   
2. margin collapsing
