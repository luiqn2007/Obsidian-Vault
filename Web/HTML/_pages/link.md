#单标签 

用于引入一个外部资源，可以是 CSS 样式表，网站图标等。

属性
- href：外部资源的[[资源路径]]
- crossorigin：跨域访问策略
	- `anonymous`：发起跨域请求时，不发送任何认证信息
	- `use-credentials`：发起跨域请求时，附带认证信息
- rel：外部资源与当前文档之间的关系，可以是一种或多种[[链接类型]]并用空格分割
	- 浏览器小图标要同时设置 `icon shortcut`
	- CSS 使用 `stylesheet`
- as：当 `ref` 为 `preload` 或 `prefetch` 时，在这里指定外部资源类型