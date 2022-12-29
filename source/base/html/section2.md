# 2 meta标签
## 2.1 meta标签的作用
meta标签是标记HEAD区的一个关键标签，提供文档字符集、使用语言、作者等基本信息，以及对关键词和网页等级的设定等，最大的作用是能够做搜索引擎优化（SEO）。

## 2.2 http-equiv属性
http-equiv相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助浏览器正确地显示网页内容。
下面会说几个经常用到的属性：

### X-UA-Compatible	
说明：IE的专用标记，用来指定IE浏览器去模拟某个特定版本的IE浏览器的渲染方式，以此来解决部分兼容问题。	
```html
<meta http-equiv="X-UA-Compatible" content="IE=7">  
<!-- 以上代码告诉IE浏览器，无论是否用DTD声明文档标准，IE8/9都会以IE7引擎来渲染页面，同样可以用IE8、IE9等值   -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">  
<!-- 以上代码告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面。     -->
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<!-- 以上代码IE=edge告诉IE使用最新的引擎渲染网页，chrome=1则可以激活Chrome Frame.   -->

```
** PS：IE插件：Google Chrome Frame（谷歌内嵌浏览器框架GCF），可以让用户的IE浏览器外不变，但用户在浏览网页时，实际上使用的是Google Chrome浏览器内核，而且支持IE6、7、8等多个版本的IE浏览器。 **

### Refresh
说明：自动刷新并指向新页面。
```html
<!-- 2代表页面停留2秒后跳转到URL网址上 -->
＜meta http-equiv="Refresh" content="2"；URL=http://www.net.cn/"＞
```
### windows-target	
说明：强制页面在当前窗口中以独立页面显示，可以防止自己的网页被别人当作一个frame页调用	
```html
<meta http-equiv="Window-target" content="_top">
```

### cache-control	
说明：控制http协议head中的中cache-control
```html
<meta http-equiv="cache-control" content="no-cache">
```
**注意**
- Public：指示响应可被任何缓存区缓存。
- Private：指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。
- no-cache：指示请求或响应消息不能缓存。
- no-store：用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
- max-age：指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。
- min-fresh：指示客户机可以接收响应时间小于当前时间加上指定时间的响应。
- max-stale：指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

### Pragma(cache模式)
说明： 是用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出。
```html
＜meta http-equiv="Pragma" content="no-cache"＞ 
```

### expires	
说明：设定网页缓存的过期时间。	
```html
<meta http-equiv="expires"content="Fri,12Jan200118:18:18GMT">
```
**PS：必须使用GMT的时间格式**

### set-cookie	
说明：如果网页过期，那么自动删除本地cookie。
```html
<meta http-equiv="Set-Cookie"content="cookie value=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">
```
**PS：必须使用GMT的时间格式。**


## 2.3 viewport
移动端开发中最常用的meat属性，一般都会如上设置。其实，手机浏览器装载页面是放在一个中间件里面，而这个中间件就是viewport，一开始是ios提出的，后来Android一起统一规范。

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

`viewport`有以下几个概念：
1.	可视区(visual area)：就是我们设备上能看到的页面的区域
2.	设备宽度(device-width)：这个就是DPI的值，即是设备的独立像素，由硬件本身决定，如：iPhone4S 是 320， iPhone6 plus 是 414， 魅蓝 是 432

### viewport涉及的单位

- 分辨率：指设备显示器所能显示的像素有多少 
- 物理分辨率：指设备显示器所能显示最高的像素数 
- DPI （Dots Per Inch）：每英寸的点数密度 
- PPI（Pixels Per Inch）：每英寸的像素点 
- DIP/DP（device independent pixels）: 设备独立像素, 这个由设备硬件决定。 
- devicePixelRatio ： 设备像素比 （ window.devicePixelRatio = 物理分辨率 / dip ） 

**PS：在计算机或移动屏幕中提到ppi和dpi其实都一样， 越高的PPI所呈现的内容越清晰。**
### viewport属性
在设置大小的，可参考这句话：可视区大小=width/initial-scale，可视区越小，字体看起来越大，反之则越小。

- width：viewport 的宽度，width与initial-scale是组合设置，会相互影响到
- height：viewport的高度 （很少使用）
- initial-scale：设置页面的初始缩放值，在android上大部分无法使用，值为0~1，最大为1，越小值放大越大
- minimum-scale：允许用户的最小缩放值
- maximum-scale：允许用户的最大缩放值
- user-scalable：是否允许用户进行缩放
- target-densitydpi（android才生效）：设备的密度等级，等同于initial-scale，可设置为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi；

## 2.4 网站描述
name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

### author、keywords、description

- author：标注网页的作者
- keywords	页面关键词，用于被搜索引擎收录	
- description	页面描述，用于搜索引擎收录	

```html
<meta name="author" content="dashen" />
<meta name="keywords" content="新闻,新闻中心, 新闻频道">
<meta name="description" content="新闻中心,包含有时政新闻、国内新闻、国际新闻、社会新闻、时事评论、新闻图片、新闻专题、新闻论坛、军事、历史、的专业时事报道门户网站">
```
