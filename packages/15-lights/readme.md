
减少material的roughness(粗糙度)可以看光的反射


ambientLight
它的效果和MeshBasicMaterial一样，几何体所有的面接收同样的光

现实中，光照在一个对象上，与光相对的物体的那一面不是完全黑的，因为
光会在周边其他物体上进行光反弹。trheejs因为性能的原因不支持光反弹，但是
可以使用AmbientLight进行模拟光反弹。

directionalLight
它的光像太阳光一样，是平行的

directionalLight的光是从正上面向下


HemisphereLight
和ambientLight一样，但是天空色和地面色是不一样的

pointLight
像是打火机，始于一个小的点，然后在各个方向统一延伸. 默认光的强度是不会变弱的，
但是可以控制变弱的距离和速度


RectAreaLight
像是照相馆里的大矩形灯，是directional和diffuse光的结合。只作用于MeshStandardMaterial和
MeshPhysicalMaterial，可以被移动和旋转，可以使用lookat取消旋转。

SpotLight像是手电筒
旋转SpotLight需要使用实例上的target属性，光总是看着这个target对象


光的性能
尽可能使用较少的光而且试着去使用哪些消耗较少的光
Minimal cost:
    AmbientLight
    HemisphereLight

Moderate cost:
    DirectionalLight
    PointLight

High cost:
    SpotLight
    RectAreaLight


Baking
在你使用了很多的光和lighthouse之类的，光的效果才好的话。可能需要另外的方案
就是把利用3d软件将光拷进texture里，但是不能移动光，因为需要更多的textures


定位光的位置和方向需要使用helper


