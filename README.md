# pile-dialog

堆叠式对话框，可直接使用`dist`中的发布版本，也可以使用`front-custos`编译`src`中的源码。

[front-custos](https://github.com/Moonshell/front-custos)

![basic-intro](https://github.com/Moonshell/pile-dialog/raw/master/basic-intro.png)

## new PileDialog(options)

```javascript
var dialog = new PileDialog({
    prop: {
        skin: 'default',
        cover: false,
        closeBtn: false,
        lock: false
    },
    content: [
        'Hello world!'
    ]
});
```

### options
Type: `Object`

实例化对话框的参数。

#### options.prop
Type: `Object`

对话框的基本属性。
主要包括`skin`、`cover`、`closeBtn`和`lock`四个字段，分别是`对话框皮肤`、`是否显示遮罩`、`是否显示关闭按键`和`是否锁定（点击遮罩不关闭）`。

#### options.content
Type: `Object`

对话框的内容。是一个一维数组，数组成员可以是`PileDialog.Para`、`PileDialog.Button`、`String`（将自动转换成`PileDialog.Para`）、`Object`（将尝试转换成`PileDialog.Button`）。

## PileDialog.setTitle(title)
设置对话框的标题。

```javascript
dialog.setTitle('I am title');
```

### title
Type: `String`

标题文本。

## PileDialog.hideTitle() / PileDialog.showTitle()
隐藏/显示对话框的标题

## PileDialog.open([e]) / PileDialog.close([e])
打开/关闭对话框。

### e
Type: `Object`

事件对象，可缺省。

## PileDialog.append(thing)

向对话框追加内容。

### thing
Type: `PileDialog.Para` or `PileDialog.Button` or `String`（将自动转换成`PileDialog.Para`） or `Object`（将尝试转换成`PileDialog.Button`）

需要追加的内容，可以是字符串也可以是按键对象。

## PileDialog.prepend(thing[, index])

```javascript
// 追加一段文本
dialog.append('New content 1');
dialog.append(new PileDialog.Para({
    text: 'New content 2',
    style: 'color: red;'
});

// 追加一个按键
dialog.append({
    text: 'New Button 1',
    click: function () {
        this.close();   // 点击后关闭对话框
    }
});
dialog.append(new PileDialog.Button({
    text: 'New Button 1',
    click: function () {
        this.close();   // 点击后关闭对话框
    }
}));
```

向对话框插入内容。

### index

需要插入的位置序号，默认为0（即第一个成员之前）。

```javascript
dialog.prepend('New content 3', 1);
```

## PileDialog.find(thing/index)

寻找对话框内容中的某个成员，参数可以是需要寻找的成员本身，也可以是成员的序号。

```javascript
console.log(dialog.find(1));
```

## PileDialog.remove(thing/index)

移除对话框内容中的某个成员，参数可以是需要移除的成员本身，也可以是成员的序号。

```javascript
dialog.remove(1);
```

## PileDialog.clear()

清空对话框中的所有内容。

## PileDialog.setProp(prop)

设置对话框的属性。

### prop
Type: `Object`

属性对象，同构造函数参数中的`options.prop`。

## PileDialog.setContent(content)

设置对话框中的内容（覆盖原有内容）。

### content
Type: `Array`

内容成员数组，同构造函数参数中的`options.content`。

## PileDialog.on(type, callback)

为对话框增加事件监听器。

### type
Type: `String`

事件类型，目前提供`open`、`close`两个事件。

### callback
Type: `Function`

事件监听的回调函数，在函数中`return false`能阻止事件继续向后面的监听器传播，以及阻止事件的默认行为（如阻止对话框打开/关闭）。

```javascript
dialog.on('open', function (e) {
    console.log('Dialog opened:', this, e);
});
```

## PileDialog.trigger(type)

触发对话框的某种事件。
