如何使用一个light去进行真实渲染？要使用environment map以及模拟light bounce

默认threejs光强度是基于任意比例单位的不反应现实世界，但是最好是基于实际的标准值，
threejs 里可以使用物理上正确的值，这样不同软件不会有兼容问题。


environmentMap就是一个环绕的图片，他可能是360度的图片或者就像是六张图组在一起形成的一个方块盒子；
可以由不同的Textureloader加载。

获取显示渲染的重要特点就是将环境Map点亮模型

使用envMap属性，将环境映射到material上


将environment map应用到所有的对象上的方法：
1. scene.environment = environmentMap ,简单但是不能够直接改变每一个material的environment map intensity
2. 单独在每一个material上应用

像renderer的outputEncoding一样，environment map texture默认使用的也是THREE.linearEncoding
所有的能直接看到的texture都应该是THREE.sRGBEncoding的，其他的比如normal map应该使用Three.LinearEncoding

GLTFLoader 加载的所有texture都会自动带有正确的encoding。

THREE.GammaEncoding的一个特长是可以处理一个gammaFactor像是在处理亮度一样。GammaEncoding是存储颜色的
一种方式，同时可以根据人眼的敏感度优化黑白色值的储存方式，sRGBEnconding不同于GammEncoding，在于它的gamma factor
是2.2。

tone mapping 
将高动态范围(HDR)的值映射为低动态值范围(LDR)，可以理解为色值高于1的图片。它用来储存光信息特别有用，光没有强度的限制。

toneMappingExposure 理解为多少光要进行tonemapping处理


threejs的反锯齿化要在构造器里设置，其他设置目前不生效

锯齿化是什么意思？
就是一个边，不会精准的对应像素的水平边和垂直边，导致的色差。

锯齿化的解决办法？
1. supersampling，简单但是有性能问题，每个像素平均为四个像素扩展
2. multisampling，每个像素渲染多个值，像supersampling，但是只针对边
新的GPU使用多重采样

锯齿化最佳实践？
反锯齿化会消耗一些资源，对于像素比高于1的不需要反锯齿化，应该只对小于2的进行处理

启用shadow的步骤
1. renderer启用shadowMap，并设置类型
2. 激活光进行投影，进行参数设置
3. 具体的mesh接收和投射shadow


shadow 粉刺问题
因为精度原因发生在光滑的表面，在计算表面是否在shadow里的时候。
也就是mesh表面的像素会在自己的表面上产生投影。一般使用bias和normalBias修复粉刺

bias有助于修复平滑表面的；normalbias用于修复环形表面的

修复的原理都是将表面向下推进，以至于外表面不进行shadow，所以bias不要设置的太大




