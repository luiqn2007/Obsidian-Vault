# 注释

以 `#` 开头的当前行剩余部分均为注释内容，通常来说注释内容不会影响到文档的内容。但有例外：

- `shebang`：若脚本作为 Unix 可执行脚本使用，则第一行应当以以下内容开头：

```Python
#!/usr/bin/env python3
```

该行注释指定了 Python 解释器的地址。为了与 Python 2 解释器加以区分，Python 3 的解释器名为 `python3`

- 默认情况下，Python 脚本使用 UTF-8 文件编码。若使用了其他编码，应当在第一行增加以下注释；若存在 `shebang` 注释，则应当在第二行

```python
# -*- coding: encoding -*-
```

其中，`encoding` 为 Python 支持的任何一种编码，如 Windows-1252 编码为 `cp1252`

# 语句规则

- Python 每一行语句末尾不需要 `;` 等任何标记。一条语句中若需要换行，在一行结尾使用 `\`
- 缩进是 Python 的语句组织方式，通过缩进来区分多个不同的代码块作用域，相同缩进相当于 C 的同一个代码块 `{}`
- 变量直接用，不需要声明（即没有声明语句）
	- 多重赋值：可以同时为多个变量进行赋值，使用 `,` 分隔：`a, b = b, a+b`（类似于模式匹配）

# 类型注解

Python 是动态类型语言，理论上来说，Python 变量本身是没有类型限制的，只是存储的值有类型。类型注解则用于标记某种情况下我们需要变量要符合哪些类型。

类型注解：变量可以标注一个所需类型，多用于方法和类，但该注解作用于 IDE 或者说仅会给出提示，不会在运行时检查或报错。

## 变量

变量的类型注解方式有两种：

1. 在变量之后使用 `: 类型` 注解

![[Pasted image 20230718101402.png]]

2. 使用注释的 `type: 类型` 注解

![[Pasted image 20230718101626.png]]

而函数参数只能使用第一种。

## 返回值

对函数返回值则使用 `->` 进行注解

```python
def fun() -> int:
    return 10
```

## Union

当支持传入多种类型均可时，可使用 Union 类型，该类型位于 `typing` 包中。

```python
from typing import Union

# my_list 中可以接收 str int 或 float 类型
my_list: list[Union[str, int, float]] = []
```
