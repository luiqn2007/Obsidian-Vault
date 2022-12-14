Python 函数通过 `def` 定义

```python
def 函数名(形参列表)[ -> 返回类型]:
    # do something

```

其中，返回类型可以省略

# 文档字符串

函数内第一行语句是字符串时，该字符串即文档字符串，在生成文档时自动使用该串。

文档字符串作为简短的摘要，不需要包含对象名或类型，这些东西可以通过其他方式获取。

文档字符串为多行时，第二行通常应当为空行，在视觉上将摘要与详细描述分隔开

# 参数

Python 的参数总是传递对象的引用

## 默认参数

函数形参可以有默认值

```python
def fun(a, b=10)
```

注意：默认值只计算一次，因此在对于可变对象可能会产生累计调用的副作用

```python
def f(a, L=[]):
    L.append(a)
    return L

print(f(1)) # [1]
print(f(2)) # [1, 2]
print(f(3)) # [1, 2, 3]
```

可使用 `None` 避免

```python
def f(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L

```

## 关键字参数

每个参数都有个名字，使用时可通过其名称定位，打乱参数顺序

```python
def fun(a, b, c):
    print(f"a={a}, b={b}, c={c}")

fun(a = 4, c = 5, b = 6) # a=4, b=6, c=5
```

该种调用方式对带有默认参数的参数也有效，但要注意：
- 关键字参数必须在位置参数之后
- 关键字参数必须有对应的参数
- 不能重复赋值

默认情况下，参数可以按位置或关键字传入；但也可以指定传递方式

```python
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2)
    # do something

```
- `/`：该符号之后的参数可以按关键字或位置传入，之前只能按位置传入
- `*`：该符号之后的参数只能按关键字传入

## 可变参数

在形参最后可以包含 `*argName` 或 `**argName` 形式的参数，`*` 必须在 `**` 之前。前者匹配一个元组，后者匹配一个字典，其值的顺序与输入顺序一致

```python
def fun(*arguments, **keywords):  
    # do something  
    print(arguments)  
    print(keywords)  


# (1, 2, 3)
# {'a': 'a', 'b': 'b', 'c': 'c'}
fun(1, 2, 3, a="a", b="b", c="c")
```

# 返回值

任何函数都有返回值，没有返回值的函数隐含返回 `None`

# lambda 表达式

`lambda` 表达式可作为匿名函数使用，格式为 `lambda 参数列表: 函数体`

```python
def make_add(n):
    return lambda x: x + n

f = make_add(10)
f(0) # 10
f(1) # 11
```

# 注解

注解是用户自定义函数类型的元信息，以字典形式保存于 `__annotations__` 属性中，包含了函数每个参数的类型和返回值类型等

```
def f(ham: str, eggs: str = 'eggs') -> str:
...     print("Annotations:", f.__annotations__)
...     print("Arguments:", ham, eggs)
...     return ham + ' and ' + eggs
...
>>> f('spam')
Annotations: {'ham': <class 'str'>, 'return': <class 'str'>, 'eggs': <class 'str'>}
Arguments: spam eggs
'spam and eggs'
```
