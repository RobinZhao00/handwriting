1. flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
2. flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
3. flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

flex: none =>  flex: 0 0 none;
flex；auto => flex: 1 1 auto;
flex: 1    => flex: 1 1 0%;
