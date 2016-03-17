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

#### options.content
Type: `Object`

对话框的内容。

## PileDialog.setTitle(title)
设置对话框的标题。

```javascript
dialog.setTitle('I am title');
```

### title
Type: `String`

标题文本

## PileDialog.hideTitle() / PileDialog.showTitle()
隐藏/显示对话框的标题

## PileDialog.open([e]) / PileDialog.close([e])
打开/关闭对话框。

### e
Type: `Object`

事件对象，可缺省。


