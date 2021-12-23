这里实际上是有threejs的世界和物理世界，threejs每一帧从物理世界取得所有对象的状态，显示在threejs世界里。物理世界是会不断变化的，也是我们看不见的

这里面最难的是组织code

threejs先有geometry，phisic里先有shape

两个世界的物体size最好是一样的

cannon body可以由多个shape组成，多用于复杂且固体的对象上。

cannon plane默认面对着camera


可以使用物理世界的material和contactMaterial改变物理行为。
物理世界的material需要一个名字和一个相关的body。它的思想就是为threejs 世界里的每个material设置一个物理世界的material
contactMaterial会包含多个material，以及material对应的对象撞击的时候的行为属性

多个不同的materials和为每一种组合创建ContactMaterial是非常让人迷惑的


有多种方式在Body上用力：
1. applyForce 
    从空间特定的点，向body用力，从而造成body的速度变化
2. applyImpulse
    不会造成速度变化，直接作用在速度上
3. applyLocalForce
    body内在的力，(0,0,0)是Body的中心

4. applyLocalImpulse


优化的方法
不要重复创建同一个material或者geometry

Cannon的box的width height depth是从box 的中心点开始算的

CPU处理碰撞
即便使用了SAPBroadphase,所有的body还是会进行检测的。此时需要使用sleep，让特别慢的Body睡觉


物理Body上一般有事件，比如collide, sleep, wakeup



物理计算比较耗时，且是CPU处理。当前demo使用的CPU上同一个线程做所有的事情
，容易掉帧，正确的方案是使用worker做一些物理计算



