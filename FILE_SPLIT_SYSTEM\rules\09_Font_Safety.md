# 09 字体安全与转曲规则

本文件是 WEB_MANUAL 字体检查与 createOutline() 门禁的权威规则。

## 1. 原 PDF 只读预检

记录原 PDF 声明的 PostScript 字体名称；去除 ABCDEF+FontName 形式的嵌入子集前缀；记录是否嵌入、是否子集及 Unicode 映射异常。字体嵌入不等于 Illustrator 能安全编辑和转曲。

## 2. Illustrator 转曲前门禁

打开工作副本后，且在任何 createOutline() 前，检查全部保留页 TextFrame：

- 实际 PostScript 字体名称及其是否存在于 app.textFonts；
- 是否与原 PDF 声明字体合理一致；
- 是否缺失、替代、身份无法确认或出现异常字重；
- 是否出现打开 PDF 的字体警告或 Invalid Font Weight 类异常；
- createOutline 是否可能改变文字边界或排版。

以下任一情况必须停止，设 needs_review，且禁止转曲和导出：缺失字体、替代字体、字体身份无法确认、与原 PDF 明显不一致、异常字重/字体警告，或转曲可能改变排版。报告准确字体名称、语言、逻辑页面和受影响对象；不得用相近字体替代，也不得宣称外观未变。

## 3. 有条件转曲与几何验证

字体门禁全部通过后，只转曲保留页面群组内尚未转曲的文字；不得转曲将删除页/章节或完整总稿全部文字，已转曲对象保持不变。

检查前过滤空 TextFrame、只含空格/换行/制表符和其他无可见字形的 TextFrame；它们不得触发 `source_needs_review`。记录可见文字内容与页面级文字对象联合 `visibleBounds`，转曲后记录对应轮廓联合 `visibleBounds`。不得要求单个文字框和字形轮廓边界完全相等。

容差取 0.25 mm 与页面短边 0.2% 中较大值。只把明显换行、整体位移、页面越界或内容丢失视为失败；正常字体度量和轮廓边界变化不得失败。风险页最多选择 3 页做最终定向视觉比较。确认失败时设 `source_needs_review`，记录逻辑页面并禁止发布最终 PDF。

最终字体计数必须为：missing_fonts=0、substituted_fonts=0、unresolved_fonts=0、unoutlined_text_frames=0、outline_geometry_failures=0。
