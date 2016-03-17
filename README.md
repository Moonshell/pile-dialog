# pile-dialog

堆叠式对话框。

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

对话框的内容。是一个一维数组，数组成员可以是`PileDialog.Para`、`PileDialog.Btn`、`String`（将自动转换成`PileDialog.Para`）、`Object`（将尝试转换成`PileDialog.Btn`）。

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
Type: `PileDialog.Para` or `PileDialog.Btn` or `String`（将自动转换成`PileDialog.Para`） or `Object`（将尝试转换成`PileDialog.Btn`）

需要追加的内容，可以是字符串也可以是按键对象。

## PileDialog.prepend(thing[, index])

向对话框插入内容。

### index

需要插入的位置序号，默认为0（即第一个成员之前）。

## PileDialog.find(thing/index)

寻找对话框内容中的某个成员，参数可以是需要寻找的成员本身，也可以是成员的序号。

## PileDialog.remove(thing/index)

移除对话框内容中的某个成员，参数可以是需要移除的成员本身，也可以是成员的序号。

## PileDialog.clear()

清空对话框中的所有内容。

## PileDialog.setContent(content)

设置对话框中的内容（覆盖原有内容）。

### content
Type: `Array`

内容成员数组。