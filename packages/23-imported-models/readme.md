threesjs可以创建基本的图形，但是创建复杂的形状需要使用专门的3D软件，也就是models

model有很多种格式，每种对应着一个问题。比如model里嵌入什么数据，weight，compression，兼容性等
常见的格式：
OBJ
FBX
STL
PLY
COLLADA
3DS
GLTF


GLTF支持不同的数据集。但不要所有情况都使用GLTF，项目如何检测使用哪种格式：
1. 看看是否需要所有数据
2. 看看文件是否太重
3. 解压需要多久
。。

可以这里找models
https://github.com/KhronosGroup/glTF-Sample-Models

gltf的格式：
 1. glTF(gltf,bin,png)
    JSON，包含不同的信息比如cameras, lights, scenes, materials, objects transformations, 
    但是 不包含geometries 和 textures。bin文件里通常是geometry和vertices相关的信息。png是纹理。
    加载时，只需要加载gltf文件，其他文件会自动加载。
 2. glTF-Binary
    所有文件放到一个文件里，不能修改数据
 3. glTF-Draco
    和gltf的默认模式很像，但是buffer数据被压缩了
 4. glTF-Embedded
    只是可编辑的JSON文件


从model里获得想要的数据的几种方式：
1. 添加整个scene，整个scene实际上是group
2. 添加scene的children
3. 过滤一些chidlren
4. 3D软件打开，移除一些对象


从model的scene里拿出一个对象，加到threejs的scene里的时候，对象将会从model的scene里移除，他后面的元素
则会移动到第一个对象的位置，也就是，model的scene里总有剩余对象。
解决的办法是：
1. 循环scene孩子的长度，每次都加第一个
2. 浅拷贝scene的孩子
3. 直接添加整个scene

draco decoder是原生js，也可以是web assembly，可以运行在worker里，这两个特性就可以
很大改善性能，但是它们也是很大的独立code


Dracoloader只在需要的时候，才会被加载，对于非压缩的gltf是不会加载的

什么时候使用Draco compression？
缺点：
1. 必须加载Dracoloader类和decoder
2. 即便使用worker和assembly，解压也可能会导致卡住

所以对于小文件(Geometry等)不建议使用，对于MB级别的models和不注重卡住的可以使用

处理Model里的Animations
animations通常包含多个AnimationClip。为了使用AnimationClip，需要使用AnimationMixer，
它类似播放器，和包含多个AnimationClip的对象相关。原理就是创建需要动画的对象。


threejs editor可以查看model能否正常工作；添加一些light测试等



