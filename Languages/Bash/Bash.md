# 基础语法

```bash
command [-options] [parameters]
```
# 通用

- `clear`：清屏，实际是将窗口光标滚动到第一行
- 管道运算符：`|`，可以将前一个命令的结果作为后一个命令的输入，自左向右运行
- 重定向符：将命令输出的内容导出到某文件中，而不是在控制台输出
	- `>`：将左侧命令结果覆盖到右侧指定文件中
	- `>>`：将左侧命令结果追加到右侧指定文件中
- 各种参数之间可以组合使用，如 `ls` 的 `a`、`l`、`h` 可以随意排列组合：`ls -l -a`，`ls -la`，`ls -al` 作用相同
- ctrl+c 可以用于中断当前正在运行的程序、命令
# 命令

- [[Bash 目录与文件]]
- [[Bash 用户与权限]]
- [[Bash 系统配置]]
- [[Bash 常用工具]]