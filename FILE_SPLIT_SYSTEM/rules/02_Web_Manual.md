# 02 WEB_MANUAL 说明书拆分规则

本文件是 WEB_MANUAL 业务规则。真实对象拆分与字体安全分别以 rules/08_Real_Object_Splitting.md 和 rules/09_Font_Safety.md 为硬性补充。

## 1. 页面识别与记录

原稿可能是单个超大 PDF 页面，也可能已有多个物理页或画板。必须依据页面框、重复尺寸、正文区、页码、语言序列、封面/封底、二维码和阅读连续性识别逻辑页；不得套用案例固定页数或尺寸。每页记录原边界、尺寸、语言、页码、阅读顺序、保留状态及目标画板。

## 2. 章节与空白页删除

删除所有语言版本的 CUSTOMER SERVICE、WARRANTY CERTIFICATE、WARRANTY TERMS & CONDITIONS，包括标题、正文、表格、填写线和仅服务于这些章节的图形。删除原空白页和处理后空白页；只剩页码、页面外框或辅助标记的页视为空白。Logo、二维码、正文或有效图形使页面非空白。边界不明确时 needs_review，不得猜测删除。

## 3. 页面内容

每个保留页必须由属于该页的真实 Illustrator 对象组成独立群组。只允许以原页面边界为定位基准整体平移；禁止缩放、旋转、镜像、翻译、换字体、重排或按删除后的可见外接框重新居中。

严格禁止：

- 将完整总稿制成 Symbol 后逐页重复；
- 每个画板放置完整总稿副本；
- 使用 SymbolItem、PlacedItem、完整总稿 Form XObject 或页面级完整总稿剪切蒙版分页；
- 仅视觉隐藏页面外对象，或让页面群组实际边界仍接近完整总稿；
- 逐页裁切 PDF 后重新导入 Illustrator 组装；
- 逐页栅格化或截图。

原稿内容内部已有的剪切组可作为原子对象保留，但不得新建“完整总稿分页蒙版”。

## 4. 画板

画板按阅读顺序 1..n 单行排列，尺寸等于原页面，间距严格 0 mm。调用主脚本前必须按 rules/08_Real_Object_Splitting.md 计算居中起点并验证坐标范围。超限即 needs_review；不得进入 Illustrator 后再改坐标、缩小页面、换行或改变间距。

## 5. 文字、清理与导出

任何 createOutline() 前必须通过 rules/09_Font_Safety.md。只转曲保留页内未转曲文字；不处理将删除页面的文字。删除无效页对象、页面外框、尺寸线、外围辅助标记、空群组、未使用 Symbol、脚本未使用资源和全部目标画板外无效对象。

最终只保存目标画板为一个多页矢量 PDF。preserveEditability=false、generateThumbnails=false、optimization=true、viewAfterSaving=false；不保留工作副本编辑信息。禁止共享完整总稿 XObject、页面级完整总稿剪切组、截图、整页栅格化、超长单页或逐页输出后外部组装。
