# 多个函数作为参数的调用顺序

C++17 之前并未规定函数嵌套调用时的运行的顺序。详见下面的例子：

```c++
string s = "but I have heard it works even if you don't believe in it";
s.replace(0, 4, "")
 .replace(s.find("even"), 4, "only")
 .replace(s.find(" don't"), 6, "");
```

在 C++17 前，可能被正确解析为：

```c++
int tmp;
string s = "but I have heard it works even if you don't believe in it";
s.replace(0, 4, "");
tmp = s.find("even");
s.replace(tmp, 4, "only");
tmp = s.find(" don't");
s.replace(tmp, 6, "");
```

也可能被错误解析为：（GCC5.4）

```c++
string s = "but I have heard it works even if you don't believe in it";
int tmp1 = s.find("even");
int tmp2 = s.find(" don't");
s.replace(0, 4, "");
s.replace(tmp1, 4, "only");
s.replace(tmp2, 6, "");
```

C++17 要求函数表达式一定会在参数之前求值，即 `foo(a, b, c)` 中 `a`，`b`，`c` 一定在 `foo` 之前求值，但 `a`，`b`，`c` 求值的顺序不确定。