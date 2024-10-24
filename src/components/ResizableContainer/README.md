# ResizableContainer

## スタイリングについて

このコンポーネントは `components/article/CodeBlock/LiveContainer` で iframe の中に配置される `components/ComponentPreview/ProductWrapper` コンポーネント内で利用されています。

そのため、CSS Modules への移行は使わずに引き続き styled-components を利用しています。

もし、CSS Modules や Tailwind CSS への移行を実施する場合は、iframe 内へのスタイルの適用方法を検討する必要があります。
