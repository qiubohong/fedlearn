# 3 canvas相关
`canvas`是HTML5新增的标签，一个可以使用JavaScript脚本在其中绘制图像的HTML元素，配合其高度和宽度属性而定义出的可绘制区域。

JavaScript代码可以访问`canvas`该区域，利用浏览器提供的API，通过一套完整的绘图函数来动态生成图形。

## 3.1 基本使用

```html
<canvas width="300" height="300">你的浏览器不支持 canvas，请升级你的浏览器。</canvas>
```
上面代码说明：

- 只有两个可选的属性 width、heigth 属性，而没有 src、alt 属性, 默认 width为300、height 为 150，单位都是 px。 
- 可以使用 css 属性来设置宽高，但是如宽高属性和初始比例不一致，会出现扭曲。
- 自身为二维网格覆盖，网格中的一单元为1像素，默认起点为左上角，坐标为(0, 0)，如下图所示：

![canvas坐标图](http://ww1.sinaimg.cn/large/68c990d9gy1g6ozdyiag7j204l04lq2t.jpg)

图中蓝色方形左上角的坐标为
- 距离左边（X 轴）x 像素
- 距离上边（Y 轴）y 像素，
- 坐标为 (x,y)

### 渲染上下文(Thre Rending Context)

`canvas` 会创建一个固定大小的画布，会公开一个或多个渲染上下文(画笔Context对象)，使用渲染上下文来绘制和处理要展示的内容。

```js
var canvas = document.getElementById('tutorial'); //获得 2d 上下文对象 
if (canvas.getContext){ //判断是否支持canvas
var ctx = canvas.getContext('2d'); // drawing code here 
} 
```


## 3.2 绘制API
### 绘制矩形
canvas唯一原生绘制图形的方法，其他都需要path去绘制。具体如下：

1. fillRect(x, y, width, height)：绘制一个填充的矩形。 
2. strokeRect(x, y, width, height)：绘制一个矩形的边框。 
3. clearRect(x, y, widh, height)：清除指定的矩形区域，然后这块区域会变的完全透

**说明：这 3 个方法具有相同的参数。**
> x, y：指的是矩形的左上角的坐标。(相对于canvas的坐标原点) 
> width, height：指的是绘制的矩形的宽和高。

## 绘制路径
在二维世界中，每一个图形都是由不同路径组成的，路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。使用路径绘制图形需要一些额外的步骤：

1. beginPath() 新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径 
2. moveTo(x, y) 把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标。 
3. closePath() 闭合路径之后，图形绘制命令又重新指向到上下文中 
4. stroke() 通过线条来绘制图形轮廓 
5. fill() 通过填充路径的内容区域生成实心的图形

```js
function draw(){ 
    var canvas = document.getElementById('tutorial'); 
    if (!canvas.getContext) return; 
    var ctx = canvas.getContext("2d"); 
    ctx.beginPath(); ctx.moveTo(50, 50); 
    ctx.lineTo(200, 50); 
    ctx.lineTo(200, 200); 
    ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形 
    ctx.stroke(); //描边。stroke不会自动closePath() 
} draw();
```
代码效果图如下：

![代码效果图](http://ww1.sinaimg.cn/large/68c990d9gy1g6ozll6fk0j207v06ojr8.jpg)

### 绘制圆弧

#### arc(x, y, r, startAngle, endAngle, anticlockwise)
以(x, y)为圆心，以r为半径，从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针(默认是顺时针)。
> 注意：这里的度数都是弧度(startAngle、endAngle)，角度转换公式为：弧度 = (Math.PI / 180) * 角度

#### arcTo(x1, y1, x2, y2, radius)
根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。

这个方法可以这样理解。绘制的弧形是由两条切线所决定。 

- 第 1 条切线：起始点和控制点1决定的直线。 
- 第 2 条切线：控制点1 和控制点2决定的直线。 

> 注意：其实绘制的圆弧就是与这两条直线相切的圆弧。

![效果图](http://ww1.sinaimg.cn/large/68c990d9gy1g6ozo04el9j208s08tjrr.jpg)

```js
function draw(){ 
    var canvas = document.getElementById('tutorial'); 
    var ctx = canvas.getContext("2d"); 
    ctx.beginPath(); 
    //起始点
    ctx.moveTo(50, 50); 
    //参数1、2：控制点1坐标与起始点坐标成一条执行 参数3、4：控制点2坐标与控制点1成直线 参数4：圆弧半径 
    ctx.arcTo(200, 50, 200, 200, 100); 
    ctx.lineTo(200, 200) 
    ctx.stroke();
} draw();
```

## 3.3 绘制贝塞尔曲线

### 什么是贝塞尔曲线?
贝兹曲线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋，我们在绘图工具上看到的钢笔工具就是来做这种矢量曲线的。

一次贝塞尔曲线其实是一条直线，如下图所示：
![一次贝塞尔曲线](http://ww1.sinaimg.cn/large/68c990d9gy1g6ozpylb77j206k036q2s.jpg)
 
二次贝塞尔曲线：从P0 和P1出发Q0 和Q1，连成一条直线，以P0到P1为终点，P1到P2为终点，以直线作为切线，不停画圆。
![二次贝塞尔曲线](http://ww1.sinaimg.cn/large/68c990d9gy1g6ozqa71lkj206h0353yh.jpg) 

三次贝塞尔曲线
![三次贝塞尔曲线](http://ww1.sinaimg.cn/large/68c990d9gy1g6ozqo7tu9j207w03gmx9.jpg)

### 绘制贝塞尔曲线

#### quadraticCurveTo(cp1x, cp1y, x, y)
2次贝塞尔曲线函数
```js
//参数 1 和 2：控制点坐标  参数 3 和 4：结束点坐标
function draw(){ 
    var canvas = document.getElementById('tutorial'); 
    if (!canvas.getContext) return; 
    var ctx = canvas.getContext("2d"); 
    ctx.beginPath(); 
    ctx.moveTo(10, 200); //起始点 
    var cp1x = 40, cp1y = 100; //控制点 
    var x = 200, y = 200; // 结束点 
    //绘制二次贝塞尔曲线 
    ctx.quadraticCurveTo(cp1x, cp1y, x, y); 
    ctx.stroke(); 
    //下面是标志位置实例代码
    ctx.beginPath(); ctx.rect(10, 200, 10, 10); ctx.rect(cp1x, cp1y, 10, 10); ctx.rect(x, y, 10, 10); 
    ctx.fill(); 
} draw();
```


#### bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
绘制三次贝塞尔曲线，代码忽略。


## 3.4 添加样式和颜色
如果想要给图形上色，有两个重要的属性可以做到。 
1.	fillStyle = color 设置图形的填充颜色 
2.	strokeStyle = color 设置图形轮廓的颜色

注意：
- color可以是css的颜色值，渐变对象或图案对象
- 默认情况下，都是黑色
- 一旦设置了，后续的都以修改的颜色为默认值，如需针对不同图案，则需设置不同颜色

## 3.5 Transparency(透明度)
globalAlpha = transparencyValue: 这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。  
globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为使用rgba()设置透明度更加好一些。

## 3.6 line设置

### lineWidth
设置线宽。只能是正值。默认是 1.0。
起始点和终点的连线为中心，上下各占线宽的一半。

```js
ctx.lineWidth = 10;
```

### lineCap
线条末端样式。

1. butt：线段末端以方形结束
2. round：线段末端以圆形结束
3. square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

```js
lineCaps = ['butt','round','square']
ctx.lineCap = lineCaps[i];
```
代码效果图：

![代码效果图](http://ww1.sinaimg.cn/large/68c990d9gy1g6p014qmr2j203603at8i.jpg)